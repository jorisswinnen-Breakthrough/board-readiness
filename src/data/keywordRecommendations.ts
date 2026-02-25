import type { AssessmentResult } from "./assessmentData";
import { sections } from "./assessmentData";

export interface KeywordAction {
  action: string;
  example: string;
}

export interface KeywordRecommendation {
  keyword: string;
  dimension: string;
  dimensionLabel: string;
  priority: "high" | "medium";
  currentLevel: number;
  targetLevel: number;
  actions: KeywordAction[];
}

interface KeywordMapping {
  keyword: string;
  questionId: string;
  highActions: KeywordAction[];
  mediumActions: KeywordAction[];
}

const keywordMappings: Record<string, KeywordMapping[]> = {
  gov: [
    {
      keyword: "Fiduciary Duties",
      questionId: "q1_1",
      highActions: [
        { action: "Complete a foundational governance course covering duties of care, loyalty, and obedience", example: "Enrol in the IoD Certificate in Company Direction or INSEAD International Directors Programme" },
        { action: "Study landmark fiduciary duty case law relevant to your jurisdiction", example: "Review cases like the Caremark standard or the UK Companies Act s.172 duties with annotated summaries" },
      ],
      mediumActions: [
        { action: "Apply fiduciary principles to real governance scenarios", example: "Volunteer to review a charity or NFP board's conflict-of-interest register and propose improvements" },
        { action: "Shadow an experienced director during a board cycle to observe fiduciary duty in practice", example: "Arrange a one-quarter shadowing placement with an established board member in your network" },
      ],
    },
    {
      keyword: "Governance Codes",
      questionId: "q1_2",
      highActions: [
        { action: "Study the key governance codes applicable to your target sector", example: "Read the UK Corporate Governance Code, King IV (South Africa), or ASX Principles cover-to-cover" },
        { action: "Attend a governance standards workshop or webinar series", example: "Join the Chartered Governance Institute's introductory governance standards programme" },
      ],
      mediumActions: [
        { action: "Benchmark a real board's practices against the relevant governance code", example: "Obtain a listed company's annual governance statement and map it against code provisions" },
        { action: "Contribute to a governance review or board evaluation exercise", example: "Offer to assist with the annual board effectiveness review at a community or sector organisation" },
      ],
    },
    {
      keyword: "Legal Compliance",
      questionId: "q1_3",
      highActions: [
        { action: "Build awareness of legal obligations for directors in your jurisdiction", example: "Complete a directors' legal duties e-learning module from a professional law body" },
        { action: "Map the regulatory landscape for your preferred sector", example: "Create a one-page summary of the top 10 compliance requirements for financial services, healthcare, or tech boards" },
      ],
      mediumActions: [
        { action: "Deepen compliance knowledge through practical exposure", example: "Sit in on a compliance committee meeting or review a company's regulatory risk register" },
        { action: "Stay current with regulatory changes via structured monitoring", example: "Subscribe to a governance legal update service such as Practical Law or Lexology" },
      ],
    },
  ],
  stratFin: [
    {
      keyword: "Strategic Foresight",
      questionId: "q2_1",
      highActions: [
        { action: "Develop strategic thinking through formal training", example: "Complete a strategy module at a business school such as London Business School's 'Strategy in a Changing World'" },
        { action: "Practice scenario planning and horizon scanning techniques", example: "Facilitate a mini scenario-planning workshop for your current organisation or a peer group" },
      ],
      mediumActions: [
        { action: "Contribute to strategic discussions with structured frameworks", example: "Apply Porter's Five Forces or a PESTEL analysis to a real board strategy paper and present findings" },
        { action: "Engage in cross-sector strategic dialogues", example: "Join a strategy roundtable or think-tank to broaden your foresight beyond your core sector" },
      ],
    },
    {
      keyword: "Financial Literacy",
      questionId: "q2_2",
      highActions: [
        { action: "Build financial statement analysis skills from the ground up", example: "Take the 'Finance for Non-Financial Managers' course from Coursera or a similar platform" },
        { action: "Practice reading and interpreting real annual reports", example: "Analyse the annual reports of three listed companies in your target sector over one quarter" },
      ],
      mediumActions: [
        { action: "Advance beyond basics to board-level financial oversight", example: "Study how audit committees interrogate financial statements by reviewing published audit committee reports" },
        { action: "Develop confidence in challenging financial assumptions", example: "Prepare three probing questions for a set of management accounts and discuss with a CFO mentor" },
      ],
    },
    {
      keyword: "Risk Oversight",
      questionId: "q2_3",
      highActions: [
        { action: "Learn enterprise risk management (ERM) fundamentals", example: "Study the COSO ERM Framework or ISO 31000 risk management standard" },
        { action: "Map risk categories relevant to board-level oversight", example: "Create a risk taxonomy for a target sector covering strategic, operational, financial, and compliance risks" },
      ],
      mediumActions: [
        { action: "Practise risk oversight in a real governance context", example: "Shadow a risk committee for one cycle and review how the risk appetite statement is applied" },
        { action: "Strengthen your ability to challenge risk reports at board level", example: "Review a published risk report and prepare a board-ready memo highlighting three areas for deeper inquiry" },
      ],
    },
    {
      keyword: "Capital Allocation",
      questionId: "q2_4",
      highActions: [
        { action: "Understand capital allocation decision-making frameworks", example: "Study 'The Outsiders' by William Thorndike for real-world capital allocation case studies" },
        { action: "Gain exposure to budgeting and investment decision processes", example: "Participate in a budget review cycle at your current organisation, focusing on capital vs. operational spend" },
      ],
      mediumActions: [
        { action: "Deepen your ability to evaluate competing investment proposals", example: "Practise NPV/IRR analysis on two competing capital projects and present a recommendation" },
        { action: "Engage in discussions about dividend policy and capital structure", example: "Attend an investor relations briefing or AGM to observe how capital allocation decisions are communicated" },
      ],
    },
  ],
  industry: [
    {
      keyword: "Executive Leadership",
      questionId: "q3_1",
      highActions: [
        { action: "Build a track record of leadership impact that translates to board narratives", example: "Document three leadership achievements with measurable outcomes (revenue growth, team scale, market entry)" },
        { action: "Seek stretch roles that develop board-relevant leadership skills", example: "Volunteer to lead a cross-functional transformation programme or a P&L-responsible business unit" },
      ],
      mediumActions: [
        { action: "Articulate your leadership experience in board-ready language", example: "Rewrite your CV summary to emphasise governance, oversight, and strategic impact rather than operational management" },
        { action: "Seek executive mentoring to refine your board leadership positioning", example: "Engage a board career coach to help translate executive experience into non-executive value propositions" },
      ],
    },
    {
      keyword: "Sector Knowledge",
      questionId: "q3_2",
      highActions: [
        { action: "Immerse yourself in a target sector through structured learning", example: "Join the relevant industry association and attend their annual conference and quarterly briefings" },
        { action: "Build sector relationships that demonstrate domain commitment", example: "Write a thought-leadership article or speak at a sector event on a governance-relevant industry topic" },
      ],
      mediumActions: [
        { action: "Deepen sector insight to board-advisory level", example: "Conduct informational interviews with three board directors in your target sector" },
        { action: "Stay current with sector-specific regulatory and market developments", example: "Set up a curated news feed covering your target sector's top 5 strategic issues" },
      ],
    },
    {
      keyword: "Change Management",
      questionId: "q3_3",
      highActions: [
        { action: "Gain experience in organisational change, turnaround, or growth situations", example: "Volunteer for a role in a company restructuring, merger integration, or rapid-growth scale-up" },
        { action: "Study change management at board level", example: "Review Harvard Business Review case studies on board-led transformations and turnarounds" },
      ],
      mediumActions: [
        { action: "Document your change experience in governance-relevant terms", example: "Prepare a case study of a transformation you led, highlighting board-level implications and oversight lessons" },
        { action: "Develop frameworks for evaluating change readiness at board level", example: "Apply Kotter's 8-step model to a past change initiative and identify what the board should have monitored" },
      ],
    },
    {
      keyword: "Board Experience",
      questionId: "q3_4",
      highActions: [
        { action: "Gain initial board or committee exposure", example: "Join a not-for-profit board, school governing body, or industry advisory committee within 6 months" },
        { action: "Participate in a board observer or associate director programme", example: "Apply to the Board Apprentice programme or a similar board-readiness initiative in your region" },
      ],
      mediumActions: [
        { action: "Expand your board portfolio strategically", example: "Seek a second board role in a different sector or governance context to broaden your experience" },
        { action: "Contribute more actively in existing board roles", example: "Volunteer to chair a sub-committee or lead a specific board project such as a governance review" },
      ],
    },
  ],
  character: [
    {
      keyword: "Ethical Standards",
      questionId: "q4_1",
      highActions: [
        { action: "Develop a personal ethical framework for board decision-making", example: "Complete an ethics in governance module, such as those offered by the Ethics Centre or Aspen Institute" },
        { action: "Study ethical dilemma case studies in corporate governance", example: "Analyse the ethical dimensions of three corporate scandals and identify where board oversight failed" },
      ],
      mediumActions: [
        { action: "Apply ethical reasoning to real governance scenarios", example: "Participate in an ethics roundtable or board simulation exercise focused on conflicting stakeholder interests" },
        { action: "Build a reputation for principled decision-making", example: "Proactively raise ethical considerations in current leadership discussions and document the outcomes" },
      ],
    },
    {
      keyword: "Communication",
      questionId: "q4_2",
      highActions: [
        { action: "Develop board-level communication and active listening skills", example: "Enrol in an executive communication or influencing programme, such as those run by Ashridge or CCL" },
        { action: "Practise structured questioning techniques used in boardrooms", example: "Learn the Socratic questioning method and apply it in three senior meetings over the next month" },
      ],
      mediumActions: [
        { action: "Refine your ability to communicate concisely at board level", example: "Practise summarising complex issues in a one-page board memo format using the situation-complication-resolution framework" },
        { action: "Seek feedback on your boardroom communication style", example: "Ask a trusted board director to observe you in a meeting and provide candid feedback on your impact" },
      ],
    },
    {
      keyword: "Constructive Challenge",
      questionId: "q4_3",
      highActions: [
        { action: "Learn the art of constructive challenge in a governance context", example: "Attend a board effectiveness workshop that includes challenge and debate simulations" },
        { action: "Develop confidence in questioning management assumptions respectfully", example: "Role-play challenging a CEO's strategic proposal with a mentor, focusing on tone and evidence-based inquiry" },
      ],
      mediumActions: [
        { action: "Strengthen your challenge skills through practice and reflection", example: "After each senior meeting, note where you could have asked a more probing question and plan to do so next time" },
        { action: "Balance support and challenge in team dynamics", example: "Use the 'support and challenge' matrix to self-assess your contribution in your last three meetings" },
      ],
    },
    {
      keyword: "DEI Leadership",
      questionId: "q4_4",
      highActions: [
        { action: "Build foundational knowledge of diversity, equity, and inclusion in governance", example: "Complete a DEI in leadership programme, such as those offered by the Inclusion Initiative at LSE" },
        { action: "Actively champion inclusive practices in your current roles", example: "Propose and lead a diversity review of recruitment or decision-making processes in your organisation" },
      ],
      mediumActions: [
        { action: "Integrate DEI thinking into board-level oversight", example: "Review a board's diversity policy and succession plan, and propose measurable improvements" },
        { action: "Demonstrate DEI commitment in visible, measurable ways", example: "Mentor two individuals from underrepresented backgrounds and sponsor their progression to leadership roles" },
      ],
    },
    {
      keyword: "Resilience",
      questionId: "q4_5",
      highActions: [
        { action: "Build personal resilience for high-pressure governance environments", example: "Work with an executive coach on stress management and decision-making under uncertainty" },
        { action: "Develop strategies for maintaining composure in adversarial settings", example: "Practise crisis simulation exercises, such as mock media interviews or hostile stakeholder meetings" },
      ],
      mediumActions: [
        { action: "Strengthen resilience through deliberate exposure to high-stakes situations", example: "Volunteer to present a controversial recommendation to a senior leadership team and manage the debate" },
        { action: "Build support networks for sustained performance under pressure", example: "Join a peer support group for board directors or senior leaders to share experiences and coping strategies" },
      ],
    },
  ],
  time: [
    {
      keyword: "Time Commitment",
      questionId: "q5_1",
      highActions: [
        { action: "Audit your current time commitments against realistic board workload expectations", example: "Map a typical board cycle (8-12 meetings/year, prep time, site visits, strategy days) against your diary for the next 12 months" },
        { action: "Create capacity for board work before accepting a role", example: "Identify and delegate or eliminate 5-8 hours per month from current commitments to make space for board duties" },
      ],
      mediumActions: [
        { action: "Stress-test your availability with a trial board workload", example: "Simulate a board member's monthly schedule for one quarter, including reading 200+ pages of board papers" },
        { action: "Discuss board time expectations with experienced directors", example: "Interview three sitting directors about actual (not published) time commitments and compare with your availability" },
      ],
    },
    {
      keyword: "Committee Readiness",
      questionId: "q5_2",
      highActions: [
        { action: "Understand the purpose and workload of key board committees", example: "Research the remit of audit, risk, nomination, and remuneration committees using published terms of reference" },
        { action: "Gain committee-relevant experience in current roles", example: "Volunteer to serve on an internal governance, risk, or people committee in your current organisation" },
      ],
      mediumActions: [
        { action: "Prepare for specific committee appointments", example: "Attend a specialist committee training, such as the Audit Committee Chair programme by KPMG or Deloitte" },
        { action: "Signal committee readiness in your board profile", example: "Add committee experience and relevant qualifications to your board CV and LinkedIn profile" },
      ],
    },
    {
      keyword: "Conflict Management",
      questionId: "q5_3",
      highActions: [
        { action: "Learn how to identify and manage conflicts of interest as a director", example: "Study your jurisdiction's requirements for declaring interests (e.g., Companies Act s.177 in the UK)" },
        { action: "Create a personal conflict-of-interest map", example: "List all your business, financial, and personal relationships that could create perceived or actual conflicts in a board role" },
      ],
      mediumActions: [
        { action: "Strengthen your ability to manage conflicts proactively", example: "Review a board's register of interests and draft a model declaration for a hypothetical scenario" },
        { action: "Practise navigating grey-area conflicts", example: "Discuss three ambiguous conflict-of-interest scenarios with a governance mentor and agree on best-practice responses" },
      ],
    },
  ],
  operational: [
    {
      keyword: "Board CV",
      questionId: "q6_1",
      highActions: [
        { action: "Create a board-focused CV distinct from your executive resume", example: "Restructure your CV to lead with governance experience, committee roles, and strategic oversight contributions" },
        { action: "Get expert feedback on your board CV", example: "Engage a board career specialist or use a service like Nurole or Board Direction for CV review" },
      ],
      mediumActions: [
        { action: "Refine your board CV for specific target roles", example: "Create two versions of your board CV: one for corporate boards and one for NFP/public sector boards" },
        { action: "Include measurable governance achievements", example: "Add specific outcomes from board or committee work, such as 'Led governance review resulting in improved board effectiveness scores'" },
      ],
    },
    {
      keyword: "LinkedIn Presence",
      questionId: "q6_2",
      highActions: [
        { action: "Overhaul your LinkedIn profile to signal board readiness", example: "Rewrite your headline to include 'Board Director | Non-Executive | Governance' and update your summary with board ambitions" },
        { action: "Build a visible governance thought-leadership presence", example: "Publish one LinkedIn article per month on governance topics and engage with board-related content daily for 3 months" },
      ],
      mediumActions: [
        { action: "Optimise your LinkedIn for board search visibility", example: "Add relevant keywords (NED, governance, fiduciary, audit committee) and request recommendations from board peers" },
        { action: "Engage strategically with board networks on LinkedIn", example: "Follow and engage with board appointment platforms, governance institutes, and board diversity organisations" },
      ],
    },
    {
      keyword: "Value Proposition",
      questionId: "q6_3",
      highActions: [
        { action: "Craft a compelling one-page board value proposition", example: "Write a 250-word statement answering: 'What unique combination of skills, experience, and perspective do I bring to a boardroom?'" },
        { action: "Test your value proposition with board stakeholders", example: "Present your board value proposition to three board chairs or recruiters and incorporate their feedback" },
      ],
      mediumActions: [
        { action: "Sharpen your value proposition for different governance contexts", example: "Adapt your value proposition for corporate, NFP, and public-sector boards, emphasising relevant strengths for each" },
        { action: "Integrate your value proposition into all board materials", example: "Ensure your board CV, LinkedIn summary, and cover letter all consistently reflect your core value proposition" },
      ],
    },
    {
      keyword: "Governance Training",
      questionId: "q6_4",
      highActions: [
        { action: "Commit to a recognised governance training programme", example: "Enrol in the Financial Times Board Director Programme, IoD Certificate, or AICD Company Directors Course" },
        { action: "Seek a board mentoring relationship", example: "Apply to a formal board mentoring programme such as those run by Women on Boards, Board Apprentice, or your local governance institute" },
      ],
      mediumActions: [
        { action: "Continue professional development in specialist governance areas", example: "Complete advanced modules in ESG governance, digital transformation oversight, or stakeholder capitalism" },
        { action: "Contribute to governance education as a way to deepen your own expertise", example: "Offer to mentor an aspiring director or speak at a governance event about your board journey" },
      ],
    },
    {
      keyword: "Board Search",
      questionId: "q6_5",
      highActions: [
        { action: "Develop a systematic board opportunity search strategy", example: "Register with board appointment platforms like Nurole, Board Direction, Women on Boards, or your national governance institute" },
        { action: "Build relationships with board search consultants", example: "Identify and meet three executive search firms that specialise in board appointments in your target sectors" },
      ],
      mediumActions: [
        { action: "Refine your board search with a purpose-fit checklist", example: "Create criteria for evaluating board opportunities: sector fit, governance quality, time commitment, values alignment, and development potential" },
        { action: "Expand your board network strategically", example: "Attend two board networking events per quarter and follow up with personalised connection requests" },
      ],
    },
  ],
};

export function getKeywordRecommendations(
  result: AssessmentResult,
  answers: Record<string, number>
): KeywordRecommendation[] {
  const recommendations: KeywordRecommendation[] = [];

  result.dims.forEach((dim) => {
    if (dim.max === 0) return;
    const mappings = keywordMappings[dim.id];
    if (!mappings) return;

    mappings.forEach((mapping) => {
      const response = answers[mapping.questionId];
      if (response === undefined || response === 3) return; // Skip confident or unanswered

      const priority: "high" | "medium" = response === 1 ? "high" : "medium";
      const targetLevel = Math.min(dim.level + (priority === "high" ? 2 : 1), 5);

      recommendations.push({
        keyword: mapping.keyword,
        dimension: dim.id,
        dimensionLabel: dim.label,
        priority,
        currentLevel: dim.level,
        targetLevel,
        actions: priority === "high" ? mapping.highActions : mapping.mediumActions,
      });
    });
  });

  // Sort: high priority first, then by dimension order
  recommendations.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority === "high" ? -1 : 1;
    return 0;
  });

  return recommendations;
}

export function generateKeywordExportText(recommendations: KeywordRecommendation[]): string {
  if (recommendations.length === 0) return "";

  const lines: string[] = ["", "Keyword-Based Recommendations:", ""];

  const high = recommendations.filter((r) => r.priority === "high");
  const medium = recommendations.filter((r) => r.priority === "medium");

  if (high.length > 0) {
    lines.push("HIGH PRIORITY (Current Gaps):");
    high.forEach((r) => {
      lines.push(`  [${r.keyword}] (${r.dimensionLabel}) — Level ${r.currentLevel} → ${r.targetLevel}`);
      r.actions.forEach((a) => {
        lines.push(`    • ${a.action}`);
        lines.push(`      Example: ${a.example}`);
      });
    });
    lines.push("");
  }

  if (medium.length > 0) {
    lines.push("MEDIUM PRIORITY (In Progress):");
    medium.forEach((r) => {
      lines.push(`  [${r.keyword}] (${r.dimensionLabel}) — Level ${r.currentLevel} → ${r.targetLevel}`);
      r.actions.forEach((a) => {
        lines.push(`    • ${a.action}`);
        lines.push(`      Example: ${a.example}`);
      });
    });
  }

  return lines.join("\n");
}
