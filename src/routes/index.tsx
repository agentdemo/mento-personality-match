import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Brain } from "lucide-react";
import {
  PERSONALITIES,
  calculateMBTI,
  shuffleQuestionOrder,
  type Answers,
  type MBTIResult,
  type Trait,
} from "@/data/mbti";
import LandingView from "@/components/mbti/LandingView";
import QuizView from "@/components/mbti/QuizView";
import ResultsView from "@/components/mbti/ResultsView";

type Phase = "landing" | "quiz" | "analyzing" | "results";

const LAST_RESULT_KEY = "mento-mbti-last-result";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MBTI Personality Test | Mento AI" },
      {
        name: "description",
        content:
          "Take a free 20-question MBTI-inspired personality test and discover your type, strengths, challenges, and ideal team role in about 5 minutes.",
      },
      { property: "og:title", content: "MBTI Personality Test | Mento AI" },
      {
        property: "og:description",
        content:
          "20 questions. 5 minutes. Discover how you think, make decisions, and work with others.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [order, setOrder] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);

  // Read the saved result after hydration to avoid SSR mismatches.
  useEffect(() => {
    const saved = window.localStorage.getItem(LAST_RESULT_KEY);
    if (saved && saved in PERSONALITIES) setLastResult(saved);
  }, []);

  const startQuiz = () => {
    setOrder(shuffleQuestionOrder());
    setIndex(0);
    setAnswers({});
    setResult(null);
    setPhase("quiz");
  };

  const finish = (finalAnswers: Answers) => {
    setResult(calculateMBTI(finalAnswers));
    setPhase("analyzing");
  };

  // Brief analyzing animation before revealing results.
  useEffect(() => {
    if (phase !== "analyzing") return;
    const timer = setTimeout(() => {
      if (result) {
        window.localStorage.setItem(LAST_RESULT_KEY, result.type);
        setLastResult(result.type);
      }
      setPhase("results");
      window.scrollTo({ top: 0 });
    }, 1600);
    return () => clearTimeout(timer);
  }, [phase, result]);

  const handleSelect = (questionId: number, trait: Trait) => {
    const next = { ...answers, [questionId]: trait };
    setAnswers(next);
    if (index === order.length - 1) {
      finish(next);
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => setIndex(Math.max(0, index - 1));

  const retake = () => {
    setPhase("landing");
    setResult(null);
    setAnswers({});
    setIndex(0);
    window.scrollTo({ top: 0 });
  };

  const profile = useMemo(
    () => (result ? PERSONALITIES[result.type] : null),
    [result]
  );

  return (
    <main className="min-h-screen">
      {phase === "landing" && <LandingView lastResult={lastResult} onStart={startQuiz} />}

      {phase === "quiz" && order.length > 0 && (
        <QuizView order={order} index={index} answers={answers} onSelect={handleSelect} onBack={handleBack} />
      )}

      {phase === "analyzing" && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 animate-pulse-soft">
            <Brain className="h-10 w-10" />
          </span>
          <div className="animate-fade-in">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">Analyzing your answers…</div>
            <div className="mt-2 text-muted-foreground">Matching you with one of the 16 personality types</div>
          </div>
          <div className="h-2 w-52 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/2 rounded-full bg-primary animate-pulse-soft" />
          </div>
        </div>
      )}

      {phase === "results" && result && profile && (
        <ResultsView result={result} onRetake={retake} />
      )}
    </main>
  );
}
