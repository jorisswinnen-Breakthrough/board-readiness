import { motion } from "framer-motion";
import type { AssessmentResult } from "@/data/assessmentData";
import { maturityLevels, getRecommendations, generateTextExport } from "@/data/assessmentData";
import MaturityRadarChart from "./MaturityRadarChart";
import { cn } from "@/lib/utils";

interface ResultsSectionProps {
  result: AssessmentResult;
}

const levelColors: Record<number, string> = {
  1: "bg-level-1",
  2: "bg-level-2",
  3: "bg-level-3",
  4: "bg-level-4",
  5: "bg-level-5",
};

const ResultsSection = ({ result }: ResultsSectionProps) => {
  const lvl = maturityLevels.find((l) => l.level === result.overallLevel);
  const recommendations = getRecommendations(result);

  const sorted = result.dims
    .filter((d) => d.max > 0)
    .slice()
    .sort((a, b) => a.pct - b.pct);
  const priorities = sorted.slice(0, 2);

  const handleExport = () => {
    const text = generateTextExport(result, recommendations);
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

      {/* Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">
          💡 AI-Powered Recommendations
        </h3>
        {recommendations.length > 0 ? (
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-2 text-sm text-foreground"
              >
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                <span>{rec}</span>
              </motion.li>
            ))}
          </ul>
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

export default ResultsSection;
