import { ArrowLeft, Check } from "lucide-react";
import { QUESTIONS, type Answers, type Trait } from "@/data/mbti";

interface QuizViewProps {
  order: number[];
  index: number;
  answers: Answers;
  onSelect: (questionId: number, trait: Trait) => void;
  onBack: () => void;
}

const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

export default function QuizView({ order, index, answers, onSelect, onBack }: QuizViewProps) {
  const question = QUESTION_BY_ID.get(order[index]);
  if (!question) return null;

  const current = answers[question.id];
  const progress = ((index + (current ? 1 : 0)) / order.length) * 100;
  const isLast = index === order.length - 1;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-10 sm:py-14">
      {/* progress */}
      <div className="mb-10">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Question {index + 1} of {order.length}
          </span>
          <span className="text-sm font-semibold text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            data-testid="quiz-progress"
          />
        </div>
      </div>

      {/* question card */}
      <div key={question.id} className="animate-fade-up">
        <div className="rounded-4xl border bg-card p-7 shadow-xl shadow-primary/5 sm:p-10">
          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-foreground sm:text-3xl">
            {question.text}
          </h2>

          <div className="mt-8 flex flex-col gap-3.5">
            {question.options.map((option) => {
              const selected = current === option.trait;
              return (
                <button
                  key={option.trait}
                  onClick={() => onSelect(question.id, option.trait)}
                  data-testid={`option-${question.id}-${option.trait}`}
                  aria-pressed={selected}
                  className={`group flex w-full items-center gap-4 rounded-2xl border-2 px-6 py-5 text-left text-base font-semibold transition-all sm:text-lg ${
                    selected
                      ? "border-primary bg-secondary text-foreground shadow-lg shadow-primary/15"
                      : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground group-hover:border-primary/60"
                    }`}
                  >
                    <Check className={`h-4 w-4 transition-opacity ${selected ? "opacity-100" : "opacity-0"}`} />
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onBack}
            disabled={index === 0}
            data-testid="quiz-back"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous question
          </button>
        </div>
      </div>

      <p className="mt-auto pt-10 text-center text-xs text-muted-foreground">
        Pick the option that feels most natural — there are no right or wrong answers.
      </p>
    </div>
  );
}
