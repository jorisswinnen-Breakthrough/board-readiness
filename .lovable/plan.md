## Restructure Results into Tabbed Layout

### What Changes

Replace the current single-scroll `ResultsSection` with a same Architecture as Project Board Navigator & layout:

**Top: Stage Hero Section** (always visible above tabs)

- Title: "Your Results"
- Overall score displayed as: "Overall Score: 2.8/5 -- Band: Early Leverage Zone" (computed from overallPct mapped to band names)
- "Where do you need to grow?" heading
- Highlight the titles of High Priority gaps in bold/red
- Coaching message: "You'll get more value by strengthening your governance capabilities. Focus on [high priority gap titles]. Once you've got those solid, your board support will have much more leverage."

**3 Clickable Tab Buttons**: Overview | Priority Areas | Detailed Report

---

### Tab 1: Overview

- Spider/radar chart (MaturityRadarChart)
- One focus area callout (the lowest-scoring dimension)
- AI-Powered Recommendations section with clickable keyword chips (high priority only, collapsed by default)

### Tab 2: Priority Areas

- Spider/radar chart
- Priority Focus Areas block (top 2 lowest dimensions with percentages)
- One AI-Powered Recommendation (first high-priority keyword, expanded)

### Tab 3: Detailed Report

- Spider/radar chart
- Full dimension scores table
- All AI-Powered Recommendations (high + medium priority keywords, all highlighted/expandable)
- Download Report button

---

### Technical Details

**Files to edit:**


| Action  | File                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Rewrite | `src/components/ResultsSection.tsx` -- replace with Stage hero + Tabs layout using Radix Tabs component |


**Band mapping** (new helper based on overallPct):

- 0-20%: "Foundation Zone"
- 21-40%: "Early Leverage Zone"  
- 41-60%: "Growth Zone"
- 61-80%: "Momentum Zone"
- 81-100%: "Mastery Zone"

**Implementation approach:**

- Use the existing `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from `src/components/ui/tabs.tsx`
- Keep all existing sub-components (MaturityRadarChart, KeywordDetail, KeywordChip) as-is
- The Stage hero section sits outside the tabs, always visible
- Each tab renders its specific subset of the existing content
- The existing `handleExport` and download button moves into the Detailed Report tab only