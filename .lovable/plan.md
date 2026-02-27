

## HTML Report Export with Branded Header & Footer

### Changes

**1. Copy logo to project**
- Copy `user-uploads://Joris_1.png` to `src/assets/joris-logo.png`

**2. Create HTML report generator: `src/utils/generateHtmlReport.ts`**
- Build a function that generates a self-contained HTML string with inline CSS
- **Header**: Logo (embedded as base64 via import) + spaced title "BOARD MEMBER MATURITY" in navy
- **Body**: Overall maturity level, dimension score table, keyword recommendations (high/medium priority with actions and examples)
- **Footer**: Logo (base64) + bold spaced contact info: `Joris@deltabase.be` / `+32494257825`
- The logo will be converted to base64 at build time using a small utility or imported as a data URL
- Professional styling with the navy/gold color scheme matching the app

**3. Update `ResultsSection.tsx`**
- Replace `handleExport` to generate HTML instead of plain text
- Change blob type to `text/html` and filename to `board_readiness_assessment.html`
- Rename button from "Export Results" to "Download Report"
- Remove the emoji from the button, use a clean download icon or text

**4. Base64 logo approach**
- Import the PNG in the report generator module
- At build time, Vite handles image imports; for embedding in HTML we'll convert the image to a base64 data URI string using a canvas-based helper or a small inline base64 constant generated from the uploaded file

### Report Structure

```text
+------------------------------------------+
|  [Logo]   BOARD MEMBER MATURITY          |  <- Header
+------------------------------------------+
|  Overall Maturity: Level X - Name        |
|  Score: XX/YY (ZZ.Z%)                   |
|  Description tag                         |
+------------------------------------------+
|  Dimension Scores Table                  |
+------------------------------------------+
|  High Priority Recommendations           |
|    [Keyword] actions + examples          |
|  Medium Priority Recommendations         |
|    [Keyword] actions + examples          |
+------------------------------------------+
|  [Logo]                                  |  <- Footer
|  Joris@deltabase.be / +32494257825      |
+------------------------------------------+
```

