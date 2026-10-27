import { describe, expect, it } from "vitest";
import {
  QUESTIONS,
  PERSONALITIES,
  TRAIT_LABELS,
  calculateMBTI,
  dimensionPercentages,
  shuffleQuestionOrder,
  type Answers,
  type Trait,
} from "@/data/mbti";

const DIMENSIONS = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
} as const;

/** Build answers that produce a target type: winning trait on every question of winning dimensions. */
function answersForType(type: string): Answers {
  const letters = type.split("") as Trait[];
  const winners: Record<string, Trait> = {
    EI: letters[0],
    SN: letters[1],
    TF: letters[2],
    JP: letters[3],
  };
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    answers[q.id] = winners[q.dimension];
  }
  return answers;
}

describe("question bank", () => {
  it("has exactly 20 questions with unique ids 1..20", () => {
    expect(QUESTIONS).toHaveLength(20);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(20);
    expect(QUESTIONS.map((q) => q.id).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 20 }, (_, i) => i + 1)
    );
  });

  it("gives each dimension exactly five questions", () => {
    for (const dimension of Object.keys(DIMENSIONS) as (keyof typeof DIMENSIONS)[]) {
      const count = QUESTIONS.filter((q) => q.dimension === dimension).length;
      expect(count, dimension).toBe(5);
    }
  });

  it("maps every question's two options to the exact trait pair of its dimension", () => {
    for (const question of QUESTIONS) {
      const allowed = DIMENSIONS[question.dimension];
      expect(question.options).toHaveLength(2);
      const traits = question.options.map((o) => o.trait);
      expect(new Set(traits).size).toBe(2);
      for (const trait of traits) {
        expect(allowed).toContain(trait);
        expect(TRAIT_LABELS[trait]).toBeTruthy();
      }
    }
  });
});

describe("personality database", () => {
  it("contains all 16 four-letter combinations", () => {
    const letters: Record<number, string[]> = { 0: ["E", "I"], 1: ["S", "N"], 2: ["T", "F"], 3: ["J", "P"] };
    const combos: string[] = [];
    for (const a of letters[0])
      for (const b of letters[1]) for (const c of letters[2]) for (const d of letters[3]) combos.push(a + b + c + d);
    expect(combos).toHaveLength(16);
    for (const code of combos) {
      expect(PERSONALITIES[code], code).toBeTruthy();
    }
  });

  it("every profile has complete strengths, challenges and teamwork data", () => {
    for (const [code, profile] of Object.entries(PERSONALITIES)) {
      expect(profile.code, code).toBe(code);
      expect(profile.strengths).toHaveLength(5);
      expect(profile.challenges).toHaveLength(4);
      expect(profile.bestTeamRole.length).toBeGreaterThan(0);
      expect(profile.teamContribution.length).toBeGreaterThan(0);
      expect(profile.workEnvironment.length).toBeGreaterThan(0);
      expect(profile.conflictStyle.length).toBeGreaterThan(0);
    }
  });
});

describe("scoring", () => {
  /** Build answers that produce a target type: trait "winner" on every question of winning dimensions. */
  function answersForType(type: string): Answers {
    const letters = type.split("") as Trait[];
    const winners: Record<string, Trait> = {
      EI: letters[0],
      SN: letters[1],
      TF: letters[2],
      JP: letters[3],
    };
    const answers: Answers = {};
    for (const q of QUESTIONS) {
      const pair = DIMENSIONS[q.dimension];
      const winner = winners[q.dimension];
      answers[q.id] = winner;
      void pair;
    }
    return answers;
  }

  it("produces all 16 possible types from valid answers", () => {
    const letters: Record<number, string[]> = { 0: ["E", "I"], 1: ["S", "N"], 2: ["T", "F"], 3: ["J", "P"] };
    for (const a of letters[0])
      for (const b of letters[1])
        for (const c of letters[2])
          for (const d of letters[3]) {
            const type = a + b + c + d;
            const result = calculateMBTI(answersForType(type));
            expect(result.type).toBe(type);
          }
  });

  it("is deterministic and counts 5 points per dimension", () => {
    const answers = answersForType("INTP");
    const first = calculateMBTI(answers);
    const second = calculateMBTI(answers);
    expect(first).toEqual(second);
    expect(first.scores.I).toBe(5);
    expect(first.scores.N).toBe(5);
    expect(first.scores.T).toBe(5);
    expect(first.scores.P).toBe(5);
    expect(first.scores.E).toBe(0);
  });

  it("replaces (not stacks) a changed answer", () => {
    const answers = answersForType("INTP");
    // Question 1 is E/I; flip it from I to E.
    const before = calculateMBTI(answers);
    expect(before.scores.I).toBe(5);
    answers[1] = "E";
    const after = calculateMBTI(answers);
    expect(after.scores.E).toBe(1);
    expect(after.scores.I).toBe(4);
    expect(after.type).toBe("INTP"); // 4 vs 1 still favors I
  });

  it("rejects incomplete answer sets", () => {
    const answers = answersForType("INTP");
    delete answers[7];
    expect(() => calculateMBTI(answers)).toThrow(/Complete all 20 questions/);
  });

  it("rejects invalid answers that do not belong to the question", () => {
    const answers = answersForType("INTP");
    answers[1] = "J"; // question 1 is E/I
    expect(() => calculateMBTI(answers)).toThrow(/question 1/);
  });

  it("rejects empty answers", () => {
    expect(() => calculateMBTI({})).toThrow(/Complete all 20 questions/);
  });
});

describe("percentages and ordering", () => {
  it("derives percentages from actual answer counts", () => {
    const answers = answersForType("ENTJ");
    const dims = dimensionPercentages(calculateMBTI(answers).scores);
    const ei = dims.find((d) => d.dimension === "EI")!;
    expect(ei.winner).toBe("E");
    expect(ei.winnerPct).toBe(100);
    expect(ei.loserPct).toBe(0);
    const jp = dims.find((d) => d.dimension === "JP")!;
    expect(jp.winnerPct).toBe(100);
  });

  it("rounds a 3/2 split to 60/40", () => {
    const answers = answersForType("INTP");
    answers[1] = "E"; // I loses one: 4/1 -> 80/20; use TF instead for 3/2
    answers[11] = "F";
    answers[12] = "F";
    const dims = dimensionPercentages(calculateMBTI(answers).scores);
    const tf = dims.find((d) => d.dimension === "TF")!;
    expect(tf.winner).toBe("F");
    expect(tf.winnerPct).toBe(60);
    expect(tf.loserPct).toBe(40);
  });

  it("shuffles produce the same 20 ids", () => {
    const ids = shuffleQuestionOrder();
    expect(ids).toHaveLength(20);
    expect([...ids].sort((a, b) => a - b)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });
});
