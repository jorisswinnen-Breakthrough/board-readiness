export interface Question {
  id: string;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface MaturityLevel {
  level: number;
  name: string;
  label: string;
  tag: string;
}

export const sections: Section[] = [
  {
    id: "gov",
    title: "Section 1: Governance and Fiduciary Knowledge",
    description: "Assess your understanding of fiduciary duties, governance standards, and legal/compliance expectations for board members.",
    questions: [
      { id: "q1_1", text: "Comprehends the fiduciary responsibilities of care, loyalty, and obedience." },
      { id: "q1_2", text: "Conversant with corporate governance standards and board accountabilities." },
      { id: "q1_3", text: "Awareness of applicable legal and compliance frameworks." },
    ],
  },
  {
    id: "stratFin",
    title: "Section 2: Strategic and Financial Capability",
    description: "Evaluate your contribution to strategic direction, financial oversight, risk management, and capital allocation.",
    questions: [
      { id: "q2_1", text: "Background in strategic foresight and sustainable value generation." },
      { id: "q2_2", text: "Proficient in analyzing and understanding financial reports." },
      { id: "q2_3", text: "Familiar with risk oversight and management frameworks." },
      { id: "q2_4", text: "Has participated in budget planning or capital allocation decisions." },
    ],
  },
  {
    id: "industry",
    title: "Section 3: Industry Expertise and Leadership Background",
    description: "Reflect on the depth of your executive experience, sector knowledge, and prior governance or advisory exposure.",
    questions: [
      { id: "q3_1", text: "Track record in executive or senior management positions." },
      { id: "q3_2", text: "Familiarity with the relevant sector or industry domain." },
      { id: "q3_3", text: "Involvement in organizational change, expansion, or turnaround situations." },
      { id: "q3_4", text: "Prior service on boards, committees, or advisory bodies." },
    ],
  },
  {
    id: "character",
    title: "Section 4: Character and Relational Competencies",
    description: "Consider how your personal integrity, communication style, and inclusive behaviour support effective board dynamics.",
    questions: [
      { id: "q4_1", text: "Exhibits discernment and ethical standards." },
      { id: "q4_2", text: "Effective communicator with strong listening capabilities." },
      { id: "q4_3", text: "Team-oriented approach with capacity to offer constructive challenge." },
      { id: "q4_4", text: "Dedicated to equality, diversity, and inclusive practices." },
      { id: "q4_5", text: "Steady under demanding or high-scrutiny conditions." },
    ],
  },
  {
    id: "time",
    title: "Section 5: Time Investment and Dedication",
    description: "Review your realistic availability and commitment to ongoing board responsibilities and potential conflicts.",
    questions: [
      { id: "q5_1", text: "Able to allocate sufficient time for sessions, preparation, and governance responsibilities." },
      { id: "q5_2", text: "Open to assuming committee assignments when required." },
      { id: "q5_3", text: "Recognizes potential conflicts of interest and their proper management." },
    ],
  },
  {
    id: "operational",
    title: "Section 6: Operational Preparedness",
    description: "Gauge how ready you are to present yourself for board roles and navigate the board opportunity landscape.",
    questions: [
      { id: "q6_1", text: "Resume or board profile customized for non-executive appointments." },
      { id: "q6_2", text: "Current LinkedIn presence that signals board ambitions." },
      { id: "q6_3", text: 'Articulated value statement: "What is my unique contribution to the boardroom?"' },
      { id: "q6_4", text: "Has pursued governance training, mentoring relationships, or board development programs." },
      { id: "q6_5", text: "Capable of identifying and assessing suitable board openings." },
    ],
  },
];

export const maturityLevels: MaturityLevel[] = [
  { level: 1, name: "Nascent", label: "Level 1 · Nascent", tag: "Board readiness exists largely in name; practices are minimal, informal or absent." },
  { level: 2, name: "Emerging", label: "Level 2 · Emerging", tag: "Board readiness is present but reactive; key practices are inconsistent or informal." },
  { level: 3, name: "Developing", label: "Level 3 · Developing", tag: "Board readiness is functional, with awareness of good practice, but application is uneven." },
  { level: 4, name: "Advanced", label: "Level 4 · Advanced", tag: "Board readiness is mature and cohesive, with continuous improvement embedded." },
  { level: 5, name: "Exemplary", label: "Level 5 · Exemplary", tag: "Board readiness is self‑renewing, sets standards, and drives long‑term value." },
];

export type ResponseValue = 3 | 2 | 1;

export const responseOptions: { value: ResponseValue; label: string }[] = [
  { value: 3, label: "Confident" },
  { value: 2, label: "In Progress" },
  { value: 1, label: "Not Yet" },
];

export interface DimensionResult {
  id: string;
  label: string;
  score: number;
  max: number;
  pct: number;
  level: number;
  responses: number[];
}

export interface AssessmentResult {
  dims: DimensionResult[];
  overallScore: number;
  overallMax: number;
  overallPct: number;
  overallLevel: number;
}

export function mapPercentToLevel(pct: number): number {
  if (pct <= 20) return 1;
  if (pct <= 40) return 2;
  if (pct <= 60) return 3;
  if (pct <= 80) return 4;
  return 5;
}

export function calculateResults(answers: Record<string, ResponseValue>): AssessmentResult {
  let overallScore = 0;
  let overallMax = 0;

  const dims: DimensionResult[] = sections.map((section) => {
    let dimScore = 0;
    let dimMax = section.questions.length * 3;
    const responses: number[] = [];

    section.questions.forEach((q) => {
      const val = answers[q.id];
      if (val !== undefined) {
        dimScore += val;
        responses.push(val);
      } else {
        dimMax -= 3;
      }
    });

    const pct = dimMax > 0 ? (dimScore / dimMax) * 100 : 0;
    const level = dimMax > 0 ? mapPercentToLevel(pct) : 0;

    overallScore += dimScore;
    overallMax += dimMax;

    return {
      id: section.id,
      label: section.title.replace(/^Section \d+: /, ""),
      score: dimScore,
      max: dimMax,
      pct,
      level,
      responses,
    };
  });

  const overallPct = overallMax > 0 ? (overallScore / overallMax) * 100 : 0;
  const overallLevel = overallMax > 0 ? mapPercentToLevel(overallPct) : 0;

  return { dims, overallScore, overallMax, overallPct, overallLevel };
}

export function getRecommendations(result: AssessmentResult): string[] {
  const recs: string[] = [];

  const countVal = (responses: number[], target: number) =>
    responses.filter((v) => v === target).length;

  result.dims.forEach((dim) => {
    if (dim.max === 0) return;
    const notYet = countVal(dim.responses, 1);
    const inProgress = countVal(dim.responses, 2);
    if (notYet === 0 && inProgress === 0) return;

    if (dim.id === "gov") {
      if (notYet > 0) {
        recs.push("Deepen your understanding of fiduciary duties and core governance codes; enroll in an accredited director or governance essentials program.");
        recs.push("Schedule time to review key legal and compliance obligations relevant to your preferred sectors.");
      } else {
        recs.push("Consolidate your governance knowledge by applying it to real board scenarios, such as reviewing charters and compliance reports.");
      }
    }
    if (dim.id === "stratFin") {
      if (notYet > 0) {
        recs.push("Build financial statement literacy through targeted training and regular practice with real annual reports.");
        recs.push("Seek observer or committee roles where you can participate in budgeting and risk oversight discussions.");
      } else {
        recs.push("Strengthen strategic impact by contributing to scenario planning, risk appetite discussions, and long-term value creation debates.");
      }
    }
    if (dim.id === "industry") {
      if (notYet > 0) {
        recs.push("Gain sector exposure by joining advisory groups, industry associations, or project boards in your target industry.");
        recs.push("Pursue stretch assignments leading change or turnaround initiatives to build board-relevant leadership stories.");
      } else {
        recs.push("Document your sector insights and change experience in a concise board narrative for nominating committees.");
      }
    }
    if (dim.id === "character") {
      if (notYet > 0) {
        recs.push("Invest in deliberate practice around constructive challenge and listening through board simulations or coaching.");
        recs.push("Actively champion diversity and inclusion in current roles, demonstrating equitable decision-making.");
      } else {
        recs.push("Refine your boardroom presence by practicing concise questioning and managing pressure in high-stakes meetings.");
      }
    }
    if (dim.id === "time") {
      if (notYet > 0) {
        recs.push("Clarify your time budget for board work, including meeting prep and stakeholder engagement, before accepting roles.");
        recs.push("Map and formally disclose potential conflicts of interest to ensure independence as a director.");
      } else {
        recs.push("Pilot a realistic board workload to stress-test your availability before expanding your portfolio.");
      }
    }
    if (dim.id === "operational") {
      if (notYet > 0) {
        recs.push("Develop a board-ready CV and LinkedIn profile emphasising governance experience and strategic contribution.");
        recs.push("Create a clear one-page board value proposition articulating your unique contribution and sector preferences.");
        recs.push("Identify governance programs or board-matching platforms and commit to at least one in the next 3–6 months.");
      } else {
        recs.push("Systematically scan and qualify board opportunities using a checklist for purpose-fit and governance quality.");
      }
    }
  });

  // Overall-level recommendations
  if (result.overallLevel <= 2) {
    recs.push("Prioritise foundation building: complete a recognised governance training, clarify fiduciary responsibilities, and secure at least one committee or advisory exposure.");
  } else if (result.overallLevel === 3) {
    recs.push("Move from functional to mature readiness by closing specific gaps in finance, risk, or stakeholder engagement, and seek structured board evaluations or mentoring.");
  } else if (result.overallLevel === 4) {
    recs.push("Aim for exemplary readiness by mentoring aspiring directors, contributing to governance innovation, and benchmarking against sector-leading boards.");
  } else if (result.overallLevel === 5) {
    recs.push("Leverage your exemplary readiness by taking on complex governance roles, chairing key committees, and sharing good practice across your board ecosystem.");
  }

  return [...new Set(recs)];
}

export function generateTextExport(result: AssessmentResult, recommendations: string[]): string {
  const lvl = maturityLevels.find((l) => l.level === result.overallLevel);
  const lines: string[] = [
    "Board Readiness & Governance Maturity Self-Assessment",
    "====================================================",
    "",
  ];

  if (lvl) {
    lines.push(`Overall maturity: ${lvl.label}`);
    lines.push(`Overall score: ${result.overallScore} / ${result.overallMax} (${result.overallPct.toFixed(1)}%)`);
    lines.push(lvl.tag);
  }
  lines.push("");
  lines.push("Dimension scores:");
  result.dims.forEach((d) => {
    const pct = d.max > 0 ? d.pct.toFixed(1) + "%" : "n/a";
    lines.push(`- ${d.label}: ${d.score} / ${d.max} (${pct}), level ${d.level || "n/a"}`);
  });
  lines.push("");
  lines.push("Recommendations:");
  recommendations.forEach((r) => lines.push(`- ${r}`));

  return lines.join("\n");
}
