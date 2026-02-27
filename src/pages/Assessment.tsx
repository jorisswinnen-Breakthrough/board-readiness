import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AssessmentForm from "@/components/AssessmentForm";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";
import { calculateResults, type ResponseValue, type AssessmentResult } from "@/data/assessmentData";
import { LogOut } from "lucide-react";

const Assessment = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [lastAnswers, setLastAnswers] = useState<Record<string, ResponseValue>>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const handleCalculate = (answers: Record<string, ResponseValue>) => {
    const res = calculateResults(answers);
    setResult(res);
    setLastAnswers(answers);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setLastAnswers({});
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl md:text-2xl font-bold">
              Board Readiness &amp; Governance Maturity
              <span className="text-gradient-teal"> Self‑Assessment</span>
            </h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Info banner */}
      <div className="bg-accent text-accent-foreground py-4 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm leading-relaxed">
            Use this checklist to assess your readiness for a board role. For each item, select the option that best represents your current status, covering six dimensions: governance knowledge, strategic &amp; financial capability, industry experience, character &amp; relational competencies, time dedication, and operational readiness.
            <br />
            This self‑assessment aligns with a <strong>five‑level board governance maturity model</strong> (Nascent → Emerging → Developing → Advanced → Exemplary).
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 space-y-8 w-full">
        <AssessmentForm onCalculate={handleCalculate} onReset={handleReset} />
        {result && (
          <div ref={resultsRef}>
            <ResultsSection result={result} answers={lastAnswers} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;
