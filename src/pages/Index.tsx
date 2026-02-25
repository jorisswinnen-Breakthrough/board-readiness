import { useState, useRef } from "react";
import AssessmentForm from "@/components/AssessmentForm";
import ResultsSection from "@/components/ResultsSection";
import { calculateResults, type ResponseValue, type AssessmentResult } from "@/data/assessmentData";

const Index = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (answers: Record<string, ResponseValue>) => {
    const res = calculateResults(answers);
    setResult(res);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleReset = () => setResult(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Board Readiness &amp; Governance Maturity
            <span className="text-gradient-gold"> Self‑Assessment</span>
          </h1>
          <p className="text-primary-foreground/80 text-sm md:text-base max-w-2xl">
            Use this checklist to assess your readiness for a board role. For each item, select the option that best represents your current status.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <div className="bg-gold-light rounded-lg border-l-4 border-accent p-4">
          <p className="text-sm text-foreground">
            This self‑assessment aligns with a <strong>five‑level board governance maturity model</strong>{" "}
            (Nascent → Emerging → Developing → Advanced → Exemplary) and covers six dimensions:
            governance knowledge, strategic &amp; financial capability, industry experience, character
            &amp; relational competencies, time dedication, and operational readiness.
          </p>
        </div>

        {/* Form */}
        <AssessmentForm onCalculate={handleCalculate} onReset={handleReset} />

        {/* Results */}
        {result && (
          <div ref={resultsRef}>
            <ResultsSection result={result} />
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Board Governance Maturity Model · Informed by iDeals Board, ICSA/Governance Institute and established frameworks
      </footer>
    </div>
  );
};

export default Index;
