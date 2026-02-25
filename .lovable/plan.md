

## Keyword-Based Recommendation Engine

Replace the current static bullet-list recommendations with an interactive keyword/tag-based system. Users see clickable keyword chips derived from their assessment gaps. Clicking a keyword expands to show detailed, actionable measures with concrete examples for moving up the maturity model.

---

### How It Works (User Experience)

1. After completing the assessment, the "AI-Powered Recommendations" section shows **clickable keyword badges** (e.g., "Fiduciary Duties", "Financial Literacy", "Risk Oversight", "Board CV", "DEI Leadership").
2. Keywords are **color-coded by priority**: red for "Not Yet" gaps, amber for "In Progress" areas.
3. Clicking a keyword **expands an actionable detail panel** below it with:
   - Current status indicator (gap level)
   - 2-3 specific actions to move up the maturity ladder
   - Concrete examples (e.g., "Enrol in the IoD Certificate in Company Direction", "Shadow a board audit committee for one cycle")
   - Target maturity level after completing the actions
4. Multiple keywords can be open at once. Clicking again collapses the panel.

---

### Technical Plan

**1. New data structure in `src/data/assessmentData.ts`**

Add a `KeywordRecommendation` interface and a `getKeywordRecommendations()` function that returns keyword objects instead of flat strings:

```text
KeywordRecommendation {
  keyword: string           // e.g. "Fiduciary Duties"
  dimension: string         // dimension id
  priority: "high" | "medium"  // based on Not Yet vs In Progress
  currentLevel: number
  targetLevel: number
  actions: Array<{
    action: string
    example: string
  }>
}
```

Each dimension gets 2-5 keywords mapped to specific questions. The function checks response values to determine which keywords surface and at what priority.

**2. Replace recommendations UI in `src/components/ResultsSection.tsx`**

Remove the current bullet list. Replace with:
- A grid/flex layout of keyword badges (styled chips)
- High priority (Not Yet) chips in red/coral, medium (In Progress) in amber/gold
- Each chip is clickable and toggles an expandable detail card using framer-motion for animation

**3. New component: `src/components/KeywordDetail.tsx`**

A small expandable card component that renders when a keyword is selected:
- Shows the keyword title, dimension context, and priority level
- Lists 2-3 actionable steps with examples in a structured format
- Shows "Current Level X -> Target Level Y" progression indicator
- Smooth expand/collapse animation with framer-motion

**4. Update `generateTextExport` in `assessmentData.ts`**

Update the export function to include keyword-based recommendations with their actions and examples in the text output.

---

### Keyword Mapping (Sample)

| Dimension | Keywords |
|-----------|----------|
| Governance | Fiduciary Duties, Governance Codes, Legal Compliance |
| Strategic/Financial | Strategic Foresight, Financial Literacy, Risk Oversight, Capital Allocation |
| Industry | Executive Leadership, Sector Knowledge, Change Management, Board Experience |
| Character | Ethical Standards, Communication, Constructive Challenge, DEI Leadership, Resilience |
| Time | Time Commitment, Committee Readiness, Conflict Management |
| Operational | Board CV, LinkedIn Presence, Value Proposition, Governance Training, Board Search |

Each keyword gets tailored actions with real-world examples based on whether the response was "Not Yet" (high priority) or "In Progress" (medium priority). "Confident" responses don't generate keywords.

