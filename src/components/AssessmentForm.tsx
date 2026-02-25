import { useState } from "react";
import { sections, responseOptions, type ResponseValue } from "@/data/assessmentData";
import { cn } from "@/lib/utils";

interface AssessmentFormProps {
  onCalculate: (answers: Record<string, ResponseValue>) => void;
  onReset: () => void;
}

const AssessmentForm = ({ onCalculate, onReset }: AssessmentFormProps) => {
  const [answers, setAnswers] = useState<Record<string, ResponseValue>>({});

  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleSelect = (questionId: string, value: ResponseValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleReset = () => {
    setAnswers({});
    onReset();
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, sIdx) => (
        <div
          key={section.id}
          className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
        >
          <div className="bg-primary px-5 py-3">
            <h3 className="text-primary-foreground font-display text-lg font-semibold">
              {section.title}
            </h3>
          </div>
          <div className="px-5 py-2">
            <p className="text-sm text-muted-foreground py-2 border-b border-border">
              {section.description}
            </p>
            <div className="divide-y divide-border">
              {section.questions.map((q, qIdx) => {
                const globalIdx = sections
                  .slice(0, sIdx)
                  .reduce((s, sec) => s + sec.questions.length, 0) + qIdx + 1;
                const selected = answers[q.id];

                return (
                  <div key={q.id} className="py-3">
                    <p className="text-sm text-foreground mb-2.5">
                      <span className="font-semibold text-muted-foreground mr-1.5">
                        {sIdx + 1}.{qIdx + 1}
                      </span>
                      {q.text}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {responseOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelect(q.id, opt.value)}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                            selected === opt.value
                              ? opt.value === 3
                                ? "bg-level-4 text-primary-foreground border-transparent shadow-md"
                                : opt.value === 2
                                ? "bg-level-2 text-primary-foreground border-transparent shadow-md"
                                : "bg-level-1 text-primary-foreground border-transparent shadow-md"
                              : "bg-muted text-muted-foreground border-border hover:border-accent hover:text-foreground"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          type="button"
          onClick={() => onCalculate(answers)}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
        >
          Calculate Maturity Level
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-muted text-muted-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:text-foreground transition-colors"
        >
          Clear Form
        </button>
        <span className="text-xs text-muted-foreground">
          All fields are optional, but more responses give a more accurate picture.
        </span>
      </div>
    </div>
  );
};

export default AssessmentForm;
