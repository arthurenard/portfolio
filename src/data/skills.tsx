interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Research",
    items: [
      "Symbolic regression",
      "Mathematical reasoning",
      "Generative models",
      "LLM training and evaluation",
      "Artificial life",
    ],
  },
  {
    category: "Languages",
    items: ["French", "English", "German (intermediate)"],
  },
];
