import { platformPricingData } from "../../config/platform-comparison-data";
import type { PlatformPricing } from "../../config/platform-comparison-data";

export interface CalculationResult {
    basePrice: number;
    bookingFeeBase: number;
    bookingFeeGst: number;
    bookingFeeTotal: number;
    attendeeTotal: number;
    commissionBase: number;
    commissionGst: number;
    commissionTotal: number;
    organizerNetPayout: number;
    effectiveDeductionPct: number;
    cfg: PlatformPricing;
}

export function formatINR(val: number): string {
    return "₹" + Math.round(val).toLocaleString("en-IN");
}

export function formatPreciseINR(val: number): string {
    return "₹" + val.toFixed(2).replace(/\.00$/, "");
}

export function calculateBreakup(pId: string, basePrice: number, customPricingData?: Record<string, PlatformPricing>): CalculationResult {
    const dataSource = customPricingData || platformPricingData;
    const cfg = dataSource[pId] || {
        commissionPercent: 0,
        commissionFixed: 0,
        bookingFeePercent: 0,
        bookingFeeFixed: 0,
        bookingFeeBorneBy: "attendee" as const,
        gstOnFeesPercent: 18,
        caveats: [],
    };

    if (basePrice === 0) {
        return {
            basePrice: 0,
            bookingFeeBase: 0,
            bookingFeeGst: 0,
            bookingFeeTotal: 0,
            attendeeTotal: 0,
            commissionBase: 0,
            commissionGst: 0,
            commissionTotal: 0,
            organizerNetPayout: 0,
            effectiveDeductionPct: 0,
            cfg,
        };
    }

    // Booking fee calculation
    const bookingFeeBase = (basePrice * (cfg.bookingFeePercent || 0)) / 100 + (cfg.bookingFeeFixed || 0);
    const bookingFeeGst = (bookingFeeBase * (cfg.gstOnFeesPercent || 0)) / 100;
    const bookingFeeTotal = bookingFeeBase + bookingFeeGst;

    // Attendee pays base + booking fee if borne by attendee
    const attendeeTotal = cfg.bookingFeeBorneBy === "attendee" ? basePrice + bookingFeeTotal : basePrice;

    // Commission calculation
    const commissionBase = (basePrice * (cfg.commissionPercent || 0)) / 100 + (cfg.commissionFixed || 0);
    const commissionGst = (commissionBase * (cfg.gstOnFeesPercent || 0)) / 100;
    let commissionTotal = commissionBase + commissionGst;

    // If booking fee is absorbed by organizer, deduct it from payout
    if (cfg.bookingFeeBorneBy === "organizer") {
        commissionTotal += bookingFeeTotal;
    }

    const organizerNetPayout = Math.max(0, basePrice - commissionTotal);
    const effectiveDeductionPct = basePrice > 0 ? (commissionTotal / basePrice) * 100 : 0;

    return {
        basePrice,
        bookingFeeBase,
        bookingFeeGst,
        bookingFeeTotal,
        attendeeTotal,
        commissionBase,
        commissionGst,
        commissionTotal,
        organizerNetPayout,
        effectiveDeductionPct,
        cfg,
    };
}
