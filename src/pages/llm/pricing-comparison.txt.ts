import type { APIRoute } from 'astro';
import { platforms, platformPricingData } from '../../config/platform-comparison-data';
import { calculateBreakup, formatINR, formatPreciseINR } from '../../components/pricing/pricingUtils';

export const GET: APIRoute = async () => {
  const pricingPlatforms = platforms.filter((p) => p.id in platformPricingData);

  let txt = 'TURNOUT TOOLS — INDIAN EVENT TICKETING PLATFORMS PRICING & FEE BREAKDOWN\n';
  txt += 'Source Repository: https://github.com/turnout-tools/turnout.tools/blob/main/src/config/platform-comparison-data.ts\n';
  txt += 'Report Errors / Suggest Commercial Updates: File an issue on GitHub at https://github.com/turnout-tools/turnout.tools/issues\n';
  txt += `Generated At: ${new Date().toISOString()}\n\n`;

  txt += 'OVERVIEW OF COMMERCIAL TERMS:\n';
  txt += '----------------------------------------------------------------------------------------------------\n';
  pricingPlatforms.forEach((p) => {
    const cfg = platformPricingData[p.id];
    txt += `Platform: ${p.name}\n`;
    txt += `  - Organizer Commission: ${cfg.commissionPercent}%${cfg.commissionFixed ? ` + ₹${cfg.commissionFixed}` : ''} (+ 18% GST)\n`;
    if (cfg.commissionNote) txt += `    Note: ${cfg.commissionNote}\n`;
    txt += `  - Customer Booking Fee: ${cfg.bookingFeePercent}%${cfg.bookingFeeFixed ? ` + ₹${cfg.bookingFeeFixed}` : ''} (+ 18% GST, borne by ${cfg.bookingFeeBorneBy})\n`;
    if (cfg.bookingFeeNote) txt += `    Note: ${cfg.bookingFeeNote}\n`;
    if (cfg.caveats && cfg.caveats.length > 0) {
      txt += `  - Caveats & Terms:\n`;
      cfg.caveats.forEach((c) => {
        txt += `      * ${c}\n`;
      });
    }
    txt += '\n';
  });

  txt += 'SAMPLE TICKET PRICE SCENARIOS (INR):\n';
  txt += '----------------------------------------------------------------------------------------------------\n';

  const samplePrices = [0, 250, 500, 1000, 2500, 5000];

  samplePrices.forEach((price) => {
    txt += `\n=== Base Ticket Price: ${formatINR(price)} ===\n\n`;

    const headers = pricingPlatforms.map((p) => p.name);
    const colWidth = 18;
    const labelWidth = 32;

    const headerLine = `| ${'Metric / Figure'.padEnd(labelWidth)} | ${headers.map((h) => h.padEnd(colWidth)).join(' | ')} |`;
    const sepLine = `|${'-'.repeat(labelWidth + 2)}|${headers.map(() => '-'.repeat(colWidth + 2)).join('|')}|`;

    txt += headerLine + '\n';
    txt += sepLine + '\n';

    const calcs = pricingPlatforms.map((p) => ({
      platform: p,
      result: calculateBreakup(p.id, price),
    }));

    // Row: Customer Pays
    const customerPaysVals = calcs.map((c) => formatPreciseINR(c.result.attendeeTotal).padEnd(colWidth));
    txt += `| ${'Customer Pays (Total)'.padEnd(labelWidth)} | ${customerPaysVals.join(' | ')} |\n`;

    // Row: Booking Fee
    const bookingFeeVals = calcs.map((c) => formatPreciseINR(c.result.bookingFeeTotal).padEnd(colWidth));
    txt += `| ${'  ↳ Buyer Booking Fee'.padEnd(labelWidth)} | ${bookingFeeVals.join(' | ')} |\n`;

    // Row: Platform Commission + GST
    const commissionVals = calcs.map((c) => (`-${formatPreciseINR(c.result.commissionTotal)}`).padEnd(colWidth));
    txt += `| ${'Platform Commission + GST'.padEnd(labelWidth)} | ${commissionVals.join(' | ')} |\n`;

    // Row: Organizer Net Payout
    const payoutVals = calcs.map((c) => formatPreciseINR(c.result.organizerNetPayout).padEnd(colWidth));
    txt += `| ${'Organizer Net Payout'.padEnd(labelWidth)} | ${payoutVals.join(' | ')} |\n`;

    // Row: Effective Deduction %
    const deductionVals = calcs.map((c) => `${c.result.effectiveDeductionPct.toFixed(1)}%`.padEnd(colWidth));
    txt += `| ${'Effective Deduction %'.padEnd(labelWidth)} | ${deductionVals.join(' | ')} |\n`;

    txt += sepLine + '\n';
  });

  return new Response(txt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
