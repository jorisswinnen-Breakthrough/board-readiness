import { useState } from "react";
import { motion } from "framer-motion";
import type { AssessmentResult } from "@/data/assessmentData";
import { maturityLevels, generateTextExport } from "@/data/assessmentData";
import { getKeywordRecommendations, generateKeywordExportText } from "@/data/keywordRecommendations";
import type { KeywordRecommendation } from "@/data/keywordRecommendations";
import MaturityRadarChart from "./MaturityRadarChart";
import KeywordDetail from "./KeywordDetail";
import { cn } from "@/lib/utils";

interface ResultsSectionProps {
  result: AssessmentResult;
  answers: Record<string, number>;
}

const levelColors: Record<number, string> = {
  1: "bg-level-1",
  2: "bg-level-2",
  3: "bg-level-3",
  4: "bg-level-4",
  5: "bg-level-5",
};

const ResultsSection = ({ result, answers }: ResultsSectionProps) => {
  const [openKeywords, setOpenKeywords] = useState<Set<string>>(new Set());
  const lvl = maturityLevels.find((l) => l.level === result.overallLevel);
  const keywordRecs = getKeywordRecommendations(result, answers);

  const toggleKeyword = (keyword: string) => {
    setOpenKeywords((prev) => {
      const next = new Set(prev);
      if (next.has(keyword)) next.delete(keyword);
      else next.add(keyword);
      return next;
    });
  };

  const sorted = result.dims
    .filter((d) => d.max > 0)
    .slice()
    .sort((a, b) => a.pct - b.pct);
  const priorities = sorted.slice(0, 2);

  const handleExport = () => {
    const text = generateTextExport(result, []) + generateKeywordExportText(keywordRecs);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "board_readiness_assessment.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!lvl) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center text-muted-foreground">
        Please answer at least one question to generate your maturity profile.
      </div>
    );
  }

  const highPriority = keywordRecs.filter((r) => r.priority === "high");
  const mediumPriority = keywordRecs.filter((r) => r.priority === "medium");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Overall maturity */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Your Board Readiness Maturity
        </h2>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-sm text-foreground">Overall maturity:</span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-semibold text-primary-foreground",
              levelColors[result.overallLevel]
            )}
          >
            {lvl.label}
          </span>
          <span className="text-sm text-muted-foreground">
            ({result.overallScore}/{result.overallMax} · {result.overallPct.toFixed(1)}%)
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{lvl.tag}</p>
      </div>

      {/* Dimension table */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left px-4 py-2.5 font-semibold text-foreground">Dimension</th>
                <th className="text-center px-3 py-2.5 font-semibold text-foreground">Score</th>
                <th className="text-center px-3 py-2.5 font-semibold text-foreground">Max</th>
                <th className="text-center px-3 py-2.5 font-semibold text-foreground">%</th>
                <th className="text-center px-3 py-2.5 font-semibold text-foreground">Level</th>
              </tr>
            </thead>
            <tbody>
              {result.dims.map((dim) => (
                <tr key={dim.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-2 text-foreground">{dim.label}</td>
                  <td className="text-center px-3 py-2 text-foreground">{dim.score}</td>
                  <td className="text-center px-3 py-2 text-muted-foreground">{dim.max}</td>
                  <td className="text-center px-3 py-2 text-foreground">
                    {dim.max > 0 ? dim.pct.toFixed(1) + "%" : "n/a"}
                  </td>
                  <td className="text-center px-3 py-2">
                    {dim.level > 0 ? (
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-primary-foreground",
                          levelColors[dim.level]
                        )}
                      >
                        {dim.level}
                      </span>
                    ) : (
                      "n/a"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Radar Chart */}
      <MaturityRadarChart result={result} />

      {/* Priority areas */}
      {priorities.length > 0 && (
        <div className="bg-gold-light rounded-lg border-l-4 border-accent p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            🎯 Priority Focus Areas
          </h3>
          <p className="text-sm text-foreground">
            <strong>Focus first on: </strong>
            {priorities.map((d) => `${d.label} (${d.pct.toFixed(1)}%)`).join("; ")}
          </p>
        </div>
      )}

      {/* Keyword-Based Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          💡 AI-Powered Recommendations
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click a keyword to reveal actionable measures and examples for advancing your maturity.
        </p>

        {keywordRecs.length > 0 ? (
          <div className="space-y-5">
            {/* High priority */}
            {highPriority.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-destructive mb-2 uppercase tracking-wide">
                  High Priority — Current Gaps
                </p>
                <div className="flex flex-wrap gap-2">
                  {highPriority.map((rec) => (
                    <KeywordChip
                      key={rec.keyword}
                      rec={rec}
                      isOpen={openKeywords.has(rec.keyword)}
                      onToggle={() => toggleKeyword(rec.keyword)}
                    />
                  ))}
                </div>
                {/* Detail panels for open high-priority keywords */}
                {highPriority
                  .filter((r) => openKeywords.has(r.keyword))
                  .map((rec) => (
                    <KeywordDetail key={rec.keyword} recommendation={rec} isOpen />
                  ))}
              </div>
            )}

            {/* Medium priority */}
            {mediumPriority.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-accent-foreground mb-2 uppercase tracking-wide">
                  Medium Priority — In Progress
                </p>
                <div className="flex flex-wrap gap-2">
                  {mediumPriority.map((rec) => (
                    <KeywordChip
                      key={rec.keyword}
                      rec={rec}
                      isOpen={openKeywords.has(rec.keyword)}
                      onToggle={() => toggleKeyword(rec.keyword)}
                    />
                  ))}
                </div>
                {mediumPriority
                  .filter((r) => openKeywords.has(r.keyword))
                  .map((rec) => (
                    <KeywordDetail key={rec.keyword} recommendation={rec} isOpen />
                  ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Complete the assessment to receive tailored recommendations.
          </p>
        )}
      </div>

      {/* Export */}
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="bg-accent text-accent-foreground px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
        >
          📥 Export Results
        </button>
      </div>
    </motion.div>
  );
};

/* Keyword chip sub-component */
function KeywordChip({
  rec,
  isOpen,
  onToggle,
}: {
  rec: KeywordRecommendation;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border",
        "hover:scale-105 active:scale-95",
        rec.priority === "high"
          ? isOpen
            ? "bg-destructive text-destructive-foreground border-destructive"
            : "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25"
          : isOpen
            ? "bg-accent text-accent-foreground border-accent"
            : "bg-accent/15 text-accent-foreground border-accent/30 hover:bg-accent/25"
      )}
    >
      {rec.keyword}
    </button>
  );
}

export default ResultsSection;
