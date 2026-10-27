// MBTI-inspired self-reflection assessment data.
// Rule-based scoring only — no AI, no network. Present as an
// MBTI-inspired self-reflection tool, not a validated assessment.

export type Trait = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface QuizOption {
  text: string;
  trait: Trait;
}

export interface QuizQuestion {
  id: number;
  dimension: Dimension;
  text: string;
  options: [QuizOption, QuizOption];
}

export const TRAIT_LABELS: Record<Trait, string> = {
  E: "Extraversion",
  I: "Introversion",
  S: "Sensing",
  N: "Intuition",
  T: "Thinking",
  F: "Feeling",
  J: "Judging",
  P: "Perceiving",
};

export const QUESTIONS: QuizQuestion[] = [
  // Extraversion vs Introversion
  {
    id: 1,
    dimension: "EI",
    text: "After a long week, how do you prefer to recharge?",
    options: [
      { text: "Spend time with friends or meet new people.", trait: "E" },
      { text: "Relax alone or spend time with one close person.", trait: "I" },
    ],
  },
  {
    id: 2,
    dimension: "EI",
    text: "During team meetings, you usually:",
    options: [
      { text: "Share ideas as soon as they come to mind.", trait: "E" },
      { text: "Think carefully before speaking.", trait: "I" },
    ],
  },
  {
    id: 3,
    dimension: "EI",
    text: "When solving a difficult problem, you prefer:",
    options: [
      { text: "Discussing possible solutions with others.", trait: "E" },
      { text: "Thinking independently before asking for input.", trait: "I" },
    ],
  },
  {
    id: 4,
    dimension: "EI",
    text: "In a new social environment, you usually:",
    options: [
      { text: "Start conversations with different people.", trait: "E" },
      { text: "Observe first and connect with a few people.", trait: "I" },
    ],
  },
  {
    id: 5,
    dimension: "EI",
    text: "Which working style gives you more energy?",
    options: [
      { text: "Frequent interaction and collaboration.", trait: "E" },
      { text: "Quiet, focused, independent work.", trait: "I" },
    ],
  },
  // Sensing vs Intuition
  {
    id: 6,
    dimension: "SN",
    text: "When starting a new project, you focus on:",
    options: [
      { text: "Practical details and immediate requirements.", trait: "S" },
      { text: "The bigger picture and future possibilities.", trait: "N" },
    ],
  },
  {
    id: 7,
    dimension: "SN",
    text: "When learning something new, you prefer:",
    options: [
      { text: "Real examples and step-by-step explanations.", trait: "S" },
      { text: "Understanding theories and exploring ideas.", trait: "N" },
    ],
  },
  {
    id: 8,
    dimension: "SN",
    text: "When solving problems, you trust:",
    options: [
      { text: "Experience, facts, and proven methods.", trait: "S" },
      { text: "Patterns, insights, and creative possibilities.", trait: "N" },
    ],
  },
  {
    id: 9,
    dimension: "SN",
    text: "Which task sounds more interesting?",
    options: [
      { text: "Improving an existing process.", trait: "S" },
      { text: "Inventing a completely new approach.", trait: "N" },
    ],
  },
  {
    id: 10,
    dimension: "SN",
    text: "When receiving information, you naturally notice:",
    options: [
      { text: "Specific facts and details.", trait: "S" },
      { text: "Connections and underlying patterns.", trait: "N" },
    ],
  },
  // Thinking vs Feeling
  {
    id: 11,
    dimension: "TF",
    text: "When making an important decision, you prioritize:",
    options: [
      { text: "Logic and objective evidence.", trait: "T" },
      { text: "Personal values and people's feelings.", trait: "F" },
    ],
  },
  {
    id: 12,
    dimension: "TF",
    text: "When a teammate makes a mistake, you usually:",
    options: [
      { text: "Focus on identifying and fixing the problem.", trait: "T" },
      { text: "First consider how the teammate feels.", trait: "F" },
    ],
  },
  {
    id: 13,
    dimension: "TF",
    text: "During disagreements, you prefer to:",
    options: [
      { text: "Find the most logical solution.", trait: "T" },
      { text: "Find a solution that respects everyone's concerns.", trait: "F" },
    ],
  },
  {
    id: 14,
    dimension: "TF",
    text: "When giving feedback, you tend to:",
    options: [
      { text: "Be direct and focus on improvement.", trait: "T" },
      { text: "Be supportive and consider the person's emotions.", trait: "F" },
    ],
  },
  {
    id: 15,
    dimension: "TF",
    text: "Which is more important when making a team decision?",
    options: [
      { text: "Applying fair and consistent criteria.", trait: "T" },
      { text: "Considering individual circumstances and needs.", trait: "F" },
    ],
  },
  // Judging vs Perceiving
  {
    id: 16,
    dimension: "JP",
    text: "When starting a project, you prefer:",
    options: [
      { text: "Creating a detailed plan with deadlines.", trait: "J" },
      { text: "Starting with a general idea and adapting.", trait: "P" },
    ],
  },
  {
    id: 17,
    dimension: "JP",
    text: "Your preferred work schedule is:",
    options: [
      { text: "Structured and predictable.", trait: "J" },
      { text: "Flexible and open to changes.", trait: "P" },
    ],
  },
  {
    id: 18,
    dimension: "JP",
    text: "When facing a deadline, you usually:",
    options: [
      { text: "Work steadily to finish ahead of time.", trait: "J" },
      { text: "Adjust your approach as the deadline approaches.", trait: "P" },
    ],
  },
  {
    id: 19,
    dimension: "JP",
    text: "When organizing tasks, you prefer:",
    options: [
      { text: "A clear to-do list and defined priorities.", trait: "J" },
      { text: "Freedom to switch between tasks.", trait: "P" },
    ],
  },
  {
    id: 20,
    dimension: "JP",
    text: "When plans suddenly change, you usually:",
    options: [
      { text: "Prefer restoring structure and clarity.", trait: "J" },
      { text: "Enjoy adapting to the new possibilities.", trait: "P" },
    ],
  },
];

export interface PersonalityProfile {
  code: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  bestTeamRole: string;
  teamContribution: string;
  workEnvironment: string;
  conflictStyle: string;
}

export const PERSONALITIES: Record<string, PersonalityProfile> = {
  INTJ: {
    code: "INTJ",
    name: "The Architect",
    description: "Independent, strategic, and focused on long-term improvement.",
    strengths: [
      "Strategic thinker",
      "Independent problem solver",
      "Strong analytical abilities",
      "Long-term planning",
      "Efficient decision-making",
    ],
    challenges: [
      "May appear overly critical",
      "Can struggle with emotional communication",
      "Sometimes dismisses alternative opinions",
      "May become impatient with inefficiency",
    ],
    bestTeamRole: "Strategic Planner / Systems Architect",
    teamContribution: "Creates long-term strategies, identifies problems, and designs efficient systems.",
    workEnvironment: "Independent work with clear goals and intellectual challenges.",
    conflictStyle: "Focuses on logic, evidence, and long-term solutions.",
  },
  INTP: {
    code: "INTP",
    name: "The Logician",
    description: "Curious, analytical, and interested in understanding complex systems.",
    strengths: [
      "Creative problem solver",
      "Analytical",
      "Independent thinker",
      "Open to new ideas",
      "Strong conceptual understanding",
    ],
    challenges: [
      "May overthink decisions",
      "Can struggle with deadlines",
      "Sometimes avoids routine tasks",
      "May appear emotionally distant",
    ],
    bestTeamRole: "Researcher / Problem Solver",
    teamContribution: "Analyzes complicated problems and develops innovative solutions.",
    workEnvironment: "Flexible, intellectually stimulating, and independent.",
    conflictStyle: "Examines arguments objectively and questions assumptions.",
  },
  ENTJ: {
    code: "ENTJ",
    name: "The Commander",
    description: "Decisive, ambitious, and focused on achieving results.",
    strengths: [
      "Strong leadership",
      "Strategic thinking",
      "Confident decision-making",
      "Goal-oriented",
      "Organizational skills",
    ],
    challenges: [
      "May become overly controlling",
      "Can appear impatient",
      "Sometimes overlooks emotions",
      "May prioritize results over relationships",
    ],
    bestTeamRole: "Team Leader / Project Director",
    teamContribution: "Sets direction, makes decisions, and organizes people around goals.",
    workEnvironment: "Challenging, structured, and results-oriented.",
    conflictStyle: "Addresses problems directly and pushes for practical resolutions.",
  },
  ENTP: {
    code: "ENTP",
    name: "The Debater",
    description: "Inventive, curious, and energized by exploring new possibilities.",
    strengths: [
      "Innovative thinking",
      "Strong brainstorming skills",
      "Adaptable",
      "Persuasive communication",
      "Quick problem-solving",
    ],
    challenges: [
      "May lose interest in routine work",
      "Can challenge ideas excessively",
      "Sometimes struggles with follow-through",
      "May overlook implementation details",
    ],
    bestTeamRole: "Innovation Lead / Creative Strategist",
    teamContribution: "Generates ideas, challenges assumptions, and explores alternative solutions.",
    workEnvironment: "Dynamic, creative, and open to experimentation.",
    conflictStyle: "Debates ideas openly and explores multiple perspectives.",
  },
  INFJ: {
    code: "INFJ",
    name: "The Advocate",
    description: "Insightful, thoughtful, and motivated by meaningful goals.",
    strengths: ["Empathetic", "Long-term thinker", "Creative", "Good listener", "Purpose-driven"],
    challenges: [
      "May become overly perfectionistic",
      "Can internalize stress",
      "Sometimes avoids confrontation",
      "May set unrealistic expectations",
    ],
    bestTeamRole: "People Strategist / Mentor",
    teamContribution: "Understands team dynamics and connects individual motivations with shared goals.",
    workEnvironment: "Meaningful, collaborative, and supportive.",
    conflictStyle: "Seeks understanding and a resolution consistent with shared values.",
  },
  INFP: {
    code: "INFP",
    name: "The Mediator",
    description: "Imaginative, compassionate, and guided by personal values.",
    strengths: ["Creative", "Empathetic", "Open-minded", "Strong personal values", "Supportive teammate"],
    challenges: [
      "May avoid difficult conversations",
      "Can take criticism personally",
      "Sometimes struggles with structure",
      "May become overly idealistic",
    ],
    bestTeamRole: "Creative Contributor / Team Supporter",
    teamContribution: "Brings original ideas and helps create a supportive environment.",
    workEnvironment: "Flexible, respectful, and purpose-driven.",
    conflictStyle: "Seeks harmony while staying true to personal values.",
  },
  ENFJ: {
    code: "ENFJ",
    name: "The Protagonist",
    description: "Encouraging, organized, and motivated by helping others succeed.",
    strengths: [
      "Strong communication",
      "Natural mentorship",
      "Empathetic leadership",
      "Team motivation",
      "Relationship building",
    ],
    challenges: [
      "May overcommit",
      "Sometimes prioritizes others too much",
      "Can be sensitive to criticism",
      "May avoid unpopular decisions",
    ],
    bestTeamRole: "Team Coordinator / People Leader",
    teamContribution: "Motivates colleagues, encourages collaboration, and develops team members.",
    workEnvironment: "Collaborative and people-focused.",
    conflictStyle: "Encourages open communication and mutual understanding.",
  },
  ENFP: {
    code: "ENFP",
    name: "The Campaigner",
    description: "Enthusiastic, imaginative, and excited by new possibilities.",
    strengths: ["Creative", "Energetic", "Strong communicator", "Adaptable", "Inspiring teammate"],
    challenges: [
      "May become distracted",
      "Sometimes struggles with routine",
      "Can overcommit",
      "May lose interest in repetitive tasks",
    ],
    bestTeamRole: "Creative Lead / Team Motivator",
    teamContribution: "Generates fresh ideas and brings enthusiasm to collaborative projects.",
    workEnvironment: "Flexible, creative, and socially engaging.",
    conflictStyle: "Uses open discussion and empathy to find solutions.",
  },
  ISTJ: {
    code: "ISTJ",
    name: "The Logistician",
    description: "Reliable, organized, and focused on practical responsibilities.",
    strengths: [
      "Dependable",
      "Detail-oriented",
      "Organized",
      "Disciplined",
      "Practical problem solver",
    ],
    challenges: [
      "May resist sudden changes",
      "Can be overly rigid",
      "Sometimes struggles with ambiguity",
      "May overlook unconventional ideas",
    ],
    bestTeamRole: "Operations Manager / Quality Controller",
    teamContribution: "Maintains standards, manages processes, and ensures work is completed reliably.",
    workEnvironment: "Structured with clear expectations.",
    conflictStyle: "Relies on facts, rules, and established procedures.",
  },
  ISFJ: {
    code: "ISFJ",
    name: "The Defender",
    description: "Supportive, practical, and attentive to the needs of others.",
    strengths: ["Reliable", "Caring", "Detail-oriented", "Patient", "Cooperative"],
    challenges: [
      "May avoid confrontation",
      "Sometimes struggles to say no",
      "Can resist unexpected changes",
      "May undervalue personal contributions",
    ],
    bestTeamRole: "Team Support / Operations Coordinator",
    teamContribution: "Helps teammates stay organized and ensures important details are handled.",
    workEnvironment: "Stable, supportive, and cooperative.",
    conflictStyle: "Seeks peaceful solutions and considers everyone's needs.",
  },
  ESTJ: {
    code: "ESTJ",
    name: "The Executive",
    description: "Organized, decisive, and focused on practical results.",
    strengths: ["Strong organizational skills", "Dependable", "Decisive", "Efficient", "Responsible"],
    challenges: [
      "May become inflexible",
      "Can appear overly direct",
      "Sometimes resists unconventional ideas",
      "May focus excessively on procedures",
    ],
    bestTeamRole: "Project Manager / Operations Lead",
    teamContribution: "Establishes structure, assigns responsibilities, and monitors progress.",
    workEnvironment: "Organized and goal-oriented.",
    conflictStyle: "Addresses issues directly using clear expectations.",
  },
  ESFJ: {
    code: "ESFJ",
    name: "The Consul",
    description: "Friendly, responsible, and focused on cooperation.",
    strengths: ["Strong interpersonal skills", "Supportive", "Organized", "Reliable", "Collaborative"],
    challenges: [
      "May seek excessive approval",
      "Can struggle with criticism",
      "Sometimes avoids disagreement",
      "May prioritize harmony over difficult decisions",
    ],
    bestTeamRole: "Team Coordinator / Client Relations",
    teamContribution: "Maintains relationships and helps teams collaborate effectively.",
    workEnvironment: "Supportive, structured, and socially interactive.",
    conflictStyle: "Encourages cooperation and seeks mutually acceptable solutions.",
  },
  ISTP: {
    code: "ISTP",
    name: "The Virtuoso",
    description: "Practical, independent, and skilled at solving immediate problems.",
    strengths: [
      "Resourceful",
      "Calm under pressure",
      "Adaptable",
      "Analytical",
      "Hands-on problem solver",
    ],
    challenges: [
      "May dislike rigid structures",
      "Can appear emotionally reserved",
      "Sometimes loses interest in long projects",
      "May avoid excessive planning",
    ],
    bestTeamRole: "Technical Specialist / Troubleshooter",
    teamContribution: "Diagnoses problems and develops practical solutions.",
    workEnvironment: "Independent, flexible, and hands-on.",
    conflictStyle: "Focuses on fixing the immediate issue.",
  },
  ISFP: {
    code: "ISFP",
    name: "The Adventurer",
    description: "Creative, adaptable, and attentive to personal values.",
    strengths: ["Creative", "Observant", "Empathetic", "Flexible", "Cooperative"],
    challenges: [
      "May avoid confrontation",
      "Can struggle with long-term planning",
      "Sometimes dislikes rigid deadlines",
      "May be sensitive to criticism",
    ],
    bestTeamRole: "Creative Specialist / Design Contributor",
    teamContribution: "Brings creative perspectives and practical sensitivity to projects.",
    workEnvironment: "Flexible and supportive.",
    conflictStyle: "Prefers calm discussion and practical compromises.",
  },
  ESTP: {
    code: "ESTP",
    name: "The Entrepreneur",
    description: "Energetic, action-oriented, and comfortable adapting quickly.",
    strengths: [
      "Quick decision-making",
      "Confident",
      "Adaptable",
      "Practical",
      "Strong situational awareness",
    ],
    challenges: [
      "May act impulsively",
      "Can overlook long-term consequences",
      "Sometimes dislikes detailed planning",
      "May become impatient with slow processes",
    ],
    bestTeamRole: "Execution Lead / Crisis Solver",
    teamContribution: "Takes action quickly and helps teams respond to unexpected challenges.",
    workEnvironment: "Fast-paced and dynamic.",
    conflictStyle: "Addresses problems directly and seeks immediate solutions.",
  },
  ESFP: {
    code: "ESFP",
    name: "The Entertainer",
    description: "Sociable, enthusiastic, and focused on creating positive experiences.",
    strengths: [
      "Excellent interpersonal skills",
      "Adaptable",
      "Energetic",
      "Supportive",
      "Practical creativity",
    ],
    challenges: [
      "May struggle with repetitive tasks",
      "Can become distracted",
      "Sometimes avoids difficult conversations",
      "May prefer short-term results",
    ],
    bestTeamRole: "Team Engagement / Communications Specialist",
    teamContribution: "Builds enthusiasm, encourages participation, and improves team communication.",
    workEnvironment: "Interactive, energetic, and collaborative.",
    conflictStyle: "Uses direct conversation and interpersonal understanding.",
  },
};

export interface MBTIResult {
  type: string;
  scores: Record<Trait, number>;
}

export type Answers = Record<number, Trait>;

/** Deterministic scoring. Throws on incomplete or invalid answer sets. */
export function calculateMBTI(answers: Answers): MBTIResult {
  const scores: Record<Trait, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const question of QUESTIONS) {
    const trait = answers[question.id];
    const valid = question.options.some((option) => option.trait === trait);
    if (!trait || !valid) {
      throw new Error(`Complete all 20 questions first (missing/invalid answer for question ${question.id}).`);
    }
    scores[trait]++;
  }

  const type =
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P");

  if (!PERSONALITIES[type]) {
    throw new Error(`No personality profile found for type ${type}.`);
  }

  return { type, scores };
}

export interface DimensionResult {
  dimension: Dimension;
  winner: Trait;
  winnerLabel: string;
  winnerPct: number;
  loser: Trait;
  loserLabel: string;
  loserPct: number;
}

const DIMENSION_PAIRS: { dimension: Dimension; pair: [Trait, Trait] }[] = [
  { dimension: "EI", pair: ["E", "I"] },
  { dimension: "SN", pair: ["S", "N"] },
  { dimension: "TF", pair: ["T", "F"] },
  { dimension: "JP", pair: ["J", "P"] },
];

/** Percentages come from the actual answers: trait score / 5 questions * 100. */
export function dimensionPercentages(scores: Record<Trait, number>): DimensionResult[] {
  return DIMENSION_PAIRS.map(({ dimension, pair }) => {
    const [a, b] = pair;
    const aWins = scores[a] >= scores[b];
    const winner = aWins ? a : b;
    const loser = aWins ? b : a;
    return {
      dimension,
      winner,
      winnerLabel: TRAIT_LABELS[winner],
      winnerPct: Math.round((scores[winner] / 5) * 100),
      loser,
      loserLabel: TRAIT_LABELS[loser],
      loserPct: Math.round((scores[loser] / 5) * 100),
    };
  });
}

/** Shuffle question order once per attempt so dimensions are interleaved. */
export function shuffleQuestionOrder(): number[] {
  const ids = QUESTIONS.map((question) => question.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}
