

## Align Styling with Board Navigator Project

Update this project's color palette, typography, and design tokens to match the [Board Navigator](/projects/2913174c-aa11-4b6b-9273-a4218fa3e0dd) project's steel blue and teal theme with DM Sans/DM Serif Display fonts.

### What Changes

**Visual differences:**
- **Fonts**: Playfair Display + Inter replaced with **DM Serif Display** (headings) + **DM Sans** (body)
- **Primary color**: Navy (`232 55% 25%`) replaced with steel blue (`213 62% 39%`)
- **Accent/gold color**: Gold (`43 52% 54%`) replaced with teal (`173 97% 27%`)
- **Foreground**: Adjusted to match Navigator's blue-tinted text
- **Border/muted tones**: Shifted from warm gray to cool blue-gray
- **Border radius**: `0.5rem` changed to `0.625rem`
- **Custom tokens**: gold, navy, gradient definitions all updated to teal/blue scheme
- **Dark mode**: Updated to match Navigator's dark palette

### Files to Edit

**1. `src/index.css`**
- Replace Google Fonts import (DM Sans + DM Serif Display instead of Playfair Display + Inter)
- Update all CSS custom properties (light and dark) to match Board Navigator's values
- Update utility classes (font-display, font-body) to use new font families
- Add gradient and shadow custom properties from Navigator
- Remove `text-gradient-gold` utility or update it to use teal

**2. `tailwind.config.ts`**
- Update `fontFamily` to DM Serif Display + DM Sans
- Add `gold.muted`, `slate`, and `cream` color tokens from Navigator
- Remove `level` colors (keep them -- they're used in the assessment) or retain as-is since Navigator doesn't define them
- Add `fade-in` keyframe and animation from Navigator

**3. `src/utils/generateHtmlReport.ts`**
- Update inline CSS colors in the HTML report to match the new palette:
  - Header/footer background: steel blue (`#1e5a96` area) instead of navy (`#1a2456`)
  - Accent/highlight color: teal (`#008b6e`) instead of gold (`#b8963e`)
  - Font family: DM Sans instead of Segoe UI

### What Stays the Same
- All component logic, structure, and layout unchanged
- Level colors (1-5) retained for maturity indicators since they serve a distinct functional purpose
- All Radix UI components and their styling tokens remain compatible
