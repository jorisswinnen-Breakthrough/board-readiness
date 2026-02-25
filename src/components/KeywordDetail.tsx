import { motion, AnimatePresence } from "framer-motion";
import type { KeywordRecommendation } from "@/data/keywordRecommendations";
import { cn } from "@/lib/utils";

interface KeywordDetailProps {
  recommendation: KeywordRecommendation;
  isOpen: boolean;
}

const KeywordDetail = ({ recommendation, isOpen }: KeywordDetailProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4 space-y-3">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">{recommendation.dimensionLabel}</span>
              <span className="text-muted-foreground">·</span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full font-semibold",
                  recommendation.priority === "high"
                    ? "bg-destructive/15 text-destructive"
                    : "bg-accent/20 text-accent-foreground"
                )}
              >
                {recommendation.priority === "high" ? "Gap — Not Yet" : "Developing — In Progress"}
              </span>
            </div>

            {/* Level progression */}
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                Level {recommendation.currentLevel}
              </span>
              <span className="text-accent font-bold">→</span>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                Level {recommendation.targetLevel}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {recommendation.actions.map((action, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-foreground flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">▸</span>
                    {action.action}
                  </p>
                  <p className="text-xs text-muted-foreground ml-5 italic">
                    💡 {action.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeywordDetail;
