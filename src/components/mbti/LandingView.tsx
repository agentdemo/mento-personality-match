import { ArrowRight, Brain, Clock, ListChecks, Sparkles, Trophy } from "lucide-react";

interface LandingViewProps {
  lastResult?: string | null;
  onStart: () => void;
}

export default function LandingView({ lastResult, onStart }: LandingViewProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* soft mint glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-mint/50 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/40 blur-3xl"
      />

      <div className="relative w-full max-w-2xl text-center">
        <div className="mb-10 inline-flex items-center gap-3 animate-fade-in">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Brain className="h-6 w-6" />
          </span>
          <span className="text-left">
            <span className="block text-lg font-extrabold tracking-tight text-foreground">Mento AI</span>
            <span className="block text-xs font-medium text-muted-foreground">Mind in sync</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-mint bg-mint/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-mint-foreground animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          Free personality test
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl animate-fade-up">
          Discover Your <span className="text-primary">Personality Type</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground animate-fade-up" style={{ animationDelay: "80ms" }}>
          20 questions. 5 minutes. Discover how you think, make decisions, and work with others.
        </p>

        <div className="mt-9 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40 active:translate-y-0"
          >
            Start Free Personality Test
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-foreground animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-sm">
            <ListChecks className="h-4 w-4 text-primary" />
            20 questions
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-sm">
            <Clock className="h-4 w-4 text-primary" />
            About 5 minutes
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Instant results
          </span>
        </div>

        {lastResult ? (
          <div
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-sun/50 bg-sun/25 px-4 py-2 text-sm font-semibold text-sun-foreground animate-pop"
            data-testid="last-result-chip"
          >
            <Trophy className="h-4 w-4" />
            Your last result was {lastResult} — retake to see if it changed
          </div>
        ) : null}

        <p className="mt-12 text-xs leading-relaxed text-muted-foreground animate-fade-in">
          This is an MBTI-inspired self-reflection tool, not an official or scientifically validated assessment.
        </p>
      </div>
    </div>
  );
}
