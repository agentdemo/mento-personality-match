import { useState } from "react";
import {
  Brain,
  Check,
  ClipboardCopy,
  Heart,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import {
  PERSONALITIES,
  dimensionPercentages,
  type MBTIResult,
} from "@/data/mbti";

interface ResultsViewProps {
  result: MBTIResult;
  onRetake: () => void;
}

export default function ResultsView({ result, onRetake }: ResultsViewProps) {
  const [copied, setCopied] = useState(false);
  const profile = PERSONALITIES[result.type];
  const dimensions = dimensionPercentages(result.scores);

  if (!profile) return null;

  const summaryText = [
    `My personality type is ${profile.code} — ${profile.name}.`,
    profile.description,
    `Strengths: ${profile.strengths.join(", ")}.`,
    `Best team role: ${profile.bestTeamRole}.`,
    "— discovered with the Mento AI personality test",
  ].join("\n");

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      {/* hero */}
      <div className="relative overflow-hidden rounded-4xl border bg-card p-8 text-center shadow-2xl shadow-primary/10 sm:p-12 animate-fade-up">
        <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-mint/40 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint bg-mint/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-mint-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Your personality type
          </span>
          <div className="mt-5 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl animate-pop" data-testid="result-type">
            {profile.code}
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{profile.name}</div>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{profile.description}</p>
        </div>
      </div>

      {/* dimension breakdown */}
      <section className="mt-8 rounded-4xl border bg-card p-7 shadow-lg shadow-primary/5 sm:p-9 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">Personality Breakdown</h3>
        <p className="mt-1 text-sm text-muted-foreground">Based on your answers — not a clinical measurement.</p>
        <div className="mt-7 flex flex-col gap-6">
          {dimensions.map((dim) => (
            <div key={dim.dimension}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-bold text-foreground">{dim.winnerLabel}</span>
                <span className="font-extrabold text-primary" data-testid={`pct-${dim.dimension}`}>{dim.winnerPct}%</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full origin-left rounded-full bg-primary animate-grow-bar"
                  style={{ width: `${dim.winnerPct}%` }}
                />
              </div>
              <div className="mt-1.5 text-xs font-semibold text-muted-foreground">
                {dim.loserLabel} {dim.loserPct}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* strengths */}
      <section className="mt-8 animate-fade-up" style={{ animationDelay: "140ms" }}>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground">
          <Trophy className="h-5 w-5 text-primary" />
          Your Strengths
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.strengths.map((strength) => (
            <div key={strength} className="flex items-center gap-3 rounded-2xl border border-mint/60 bg-mint/25 px-5 py-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
              </span>
              <span className="font-semibold text-foreground">{strength}</span>
            </div>
          ))}
        </div>
      </section>

      {/* challenges */}
      <section className="mt-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground">
          <Lightbulb className="h-5 w-5 text-sun-foreground" />
          Your Challenges
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.challenges.map((challenge) => (
            <div key={challenge} className="flex items-start gap-3 rounded-2xl border border-sun/40 bg-sun/15 px-5 py-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sun text-sun-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-semibold text-foreground">{challenge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* team role */}
      <section className="mt-8 rounded-4xl border border-primary/30 bg-secondary p-7 shadow-lg shadow-primary/10 sm:p-9 animate-fade-up" style={{ animationDelay: "260ms" }}>
        <h3 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground">
          <Users className="h-5 w-5 text-primary" />
          Your Ideal Team Role
        </h3>
        <div className="mt-4 inline-flex rounded-2xl bg-primary px-5 py-2.5 text-lg font-extrabold text-primary-foreground shadow-md shadow-primary/25">
          {profile.bestTeamRole}
        </div>
        <p className="mt-4 leading-relaxed text-foreground/90">{profile.teamContribution}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Team roles are self-reflection prompts, not validated predictions of workplace performance.
        </p>
      </section>

      {/* working style */}
      <section className="mt-8 animate-fade-up" style={{ animationDelay: "320ms" }}>
        <h3 className="mb-4 text-xl font-extrabold tracking-tight text-foreground">How You Work With Others</h3>
        <div className="overflow-hidden rounded-4xl border bg-card shadow-lg shadow-primary/5">
          {[
            { icon: Brain, label: "Team contribution", value: profile.teamContribution },
            { icon: Heart, label: "Handling conflicts", value: profile.conflictStyle },
            { icon: Sparkles, label: "Preferred work environment", value: profile.workEnvironment },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={label} className={`flex items-start gap-4 px-7 py-5 ${i > 0 ? "border-t" : ""}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
                <div className="mt-1 font-semibold text-foreground">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
        <button
          onClick={copyResult}
          data-testid="copy-result"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          <ClipboardCopy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy my result"}
        </button>
        <button
          onClick={onRetake}
          data-testid="retake-test"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-7 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
        >
          <RotateCcw className="h-4 w-4" />
          Retake the test
        </button>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
        This is an MBTI-inspired self-reflection tool, not an official or scientifically validated MBTI assessment.
      </p>
    </div>
  );
}
