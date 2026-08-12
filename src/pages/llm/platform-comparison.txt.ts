import type { APIRoute } from 'astro';
import { platforms, comparisonData } from '../../config/platform-comparison-data';
import type { FeatureRow } from '../../config/platform-comparison-data';

function getFeatureScore(row: FeatureRow, platformId: string): { earned: number; max: number } {
  let components: { earned: number; max: number }[] = [];
  const val = row.values ? row.values[platformId] : undefined;
  if (val && val.status && val.status !== "neutral") {
    let score = 0;
    if (val.status === "positive") score = 1.0;
    else if (val.status === "warning") score = 0.5;
    else if (val.status === "negative") score = 0.0;
    components.push({ earned: score, max: 1.0 });
  }

  if (row.subFeatures && row.subFeatures.length > 0) {
    row.subFeatures.forEach((sub) => {
      const subResult = getFeatureScore(sub, platformId);
      if (subResult.max > 0) {
        components.push({ earned: subResult.earned / subResult.max, max: 1.0 });
      }
    });
  }

  if (components.length === 0) return { earned: 0, max: 0 };
  let totalEarned = components.reduce((sum, c) => sum + (c.earned / components.length), 0);
  return { earned: totalEarned, max: 1.0 };
}

interface FlattenedRow {
  name: string;
  description?: string;
  depth: number;
  isCategory: boolean;
  values: Record<string, { value: string; status?: string; tooltip?: string }>;
}

function flattenTree(rows: FeatureRow[], depth = 0): FlattenedRow[] {
  let list: FlattenedRow[] = [];
  rows.forEach((row) => {
    const hasSubs = !!(row.subFeatures && row.subFeatures.length > 0);
    const hasValues = !!(row.values && Object.keys(row.values).length > 0);
    
    list.push({
      name: row.name,
      description: row.description,
      depth,
      isCategory: hasSubs && !hasValues,
      values: row.values || {},
    });

    if (hasSubs) {
      list.push(...flattenTree(row.subFeatures!, depth + 1));
    }
  });
  return list;
}

export const GET: APIRoute = async () => {
  let txt = "TURNOUT TOOLS — INDIAN EVENT TICKETING PLATFORMS FEATURE COMPARISON\n";
  txt += "Source Repository: https://github.com/turnout-tools/turnout.tools/blob/main/src/config/platform-comparison-data.ts\n";
  txt += `Generated At: ${new Date().toISOString()}\n\n`;

  txt += "PLATFORM WEIGHTED SCORES SUMMARY:\n";
  txt += "----------------------------------------------------------------------------------------------------\n";
  const scoresRow: string[] = [];
  platforms.forEach((p) => {
    let catScores: number[] = [];
    comparisonData.forEach((cat) => {
      const res = getFeatureScore(cat, p.id);
      if (res.max > 0) catScores.push(res.earned / res.max);
    });
    const totalEarned = catScores.reduce((a, b) => a + b, 0);
    const totalMax = catScores.length;
    const pct = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
    txt += `  - ${p.name}: ${pct}%\n`;
  });
  txt += "\n";

  // Build Formatted Comparison Matrix Table
  txt += "FEATURE COMPARISON MATRIX:\n";
  txt += "----------------------------------------------------------------------------------------------------\n";

  const pHeaders = platforms.map((p) => p.name);
  const headerLine = `| ${"Feature / Category".padEnd(45)} | ${pHeaders.map((h) => h.padEnd(16)).join(" | ")} |`;
  const sepLine = `|${"-".repeat(47)}|${pHeaders.map(() => "-".repeat(18)).join("|")}|`;

  txt += headerLine + "\n";
  txt += sepLine + "\n";

  const flatRows = flattenTree(comparisonData);
  const detailsNotes: string[] = [];

  flatRows.forEach((r) => {
    if (r.isCategory) {
      const catTitle = `${"  ".repeat(r.depth)}[ ${r.name.toUpperCase()} ]`;
      txt += `| ${catTitle.padEnd(45)} | ${pHeaders.map(() => " ".repeat(16)).join(" | ")} |\n`;
    } else {
      const indent = r.depth > 1 ? "  ".repeat(r.depth - 1) + "↳ " : r.depth === 1 ? "  " : "";
      const featName = (indent + r.name).slice(0, 45).padEnd(45);

      const valCols = platforms.map((p) => {
        const item = r.values[p.id];
        const valStr = item ? item.value : "—";
        if (item && item.tooltip) {
          detailsNotes.push(`- [${r.name}] (${p.name}): ${item.value} — ${item.tooltip}`);
        }
        return valStr.slice(0, 16).padEnd(16);
      });

      txt += `| ${featName} | ${valCols.join(" | ")} |\n`;
    }
  });

  txt += sepLine + "\n\n";

  if (detailsNotes.length > 0) {
    txt += "FEATURE TOOLTIPS & ADDITIONAL DETAILS:\n";
    txt += "----------------------------------------------------------------------------------------------------\n";
    detailsNotes.forEach((note) => {
      txt += `${note}\n`;
    });
    txt += "\n";
  }

  return new Response(txt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
