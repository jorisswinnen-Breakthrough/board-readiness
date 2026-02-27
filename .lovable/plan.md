

## Changes

### 1. Landing Page -- Remove logo, white background
**File:** `src/pages/Landing.tsx`
- Remove the `<img>` tag showing the Joris logo
- The page already uses `bg-background` which is white, so no background change needed

### 2. Assessment Header -- Remove logo
**File:** `src/pages/Assessment.tsx`
- Remove the `<img>` tag from the header (keep the title text and sign-out button)

### 3. Add SVG Spider Chart to Downloadable Report
**File:** `src/utils/generateHtmlReport.ts`

The current HTML report has no chart. We'll generate an inline SVG radar/spider chart using the dimension data, placed between the scores table and the recommendations section.

The SVG will be built with pure math (no library needed since it's a static HTML file):
- A hexagonal polar grid with concentric rings at 20%, 40%, 60%, 80%, 100%
- Axis labels for each dimension name
- A filled polygon representing the dimension scores
- Styled to match the report's blue/teal color scheme

**Technical approach:**
- Add a helper function `generateRadarSvg(dims)` that computes polygon points for N dimensions on a circle and returns an SVG string
- Insert the SVG into the HTML report template after the dimension table

