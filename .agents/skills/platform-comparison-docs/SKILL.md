---
name: platform-comparison-docs
description: Update and maintain platform-comparison-data.ts in turnout.tools with zero errors, clean hierarchy, complete platform values, concise text/tooltips, and original user language.
---

# Platform Comparison Docs Skill

Guide for updating [`src/config/platform-comparison-data.ts`](../../../src/config/platform-comparison-data.ts).

## Rules

1. **Logical Organization**: Group features and subfeatures logically; eliminate duplicate or redundant questions.
2. **Data Completeness & Handling**: Ensure values exist for all platforms configured in the `platforms` array. For partial user notes, prompt or set default states for remaining platforms.
3. **Conciseness & Optional Tooltips**: Keep `value` short (e.g., "Yes", "No", "5%", "T+3"). Do NOT include subjective quality labels like "Flawed", "Best", or "Worst" in `value` sentiment is already indicated by `status`. `tooltip` is optional—only use it when additional context or explanation is required beyond the value, avoiding redundant text that merely repeats the meaning of the value or feature title.
4. **UI Status**: Assign appropriate `status` (`'positive' | 'negative' | 'neutral' | 'warning'`) to reflect sentiment/impact in comparison views.
5. **Prefer User Phrasing**: Translate freeform text into structured data preserving the user's original words and domain terminology.

## Workflow

1. Read [`src/config/platform-comparison-data.ts`](../../../src/config/platform-comparison-data.ts) for current `platforms` and `comparisonData`.
2. Map input into `FeatureRow` hierarchy without duplicates.
3. Populate `value`, optional `tooltip` (if extra context needed), and `status` for all platforms defined in `platforms`.
4. Run `npm run build` to verify zero type errors.
