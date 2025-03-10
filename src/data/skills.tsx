import { Code, Brain, Languages, GitBranch, Wrench } from "lucide-react";
import { ReactNode } from "react";

interface SkillGroup {
  category: string;
  icon: ReactNode;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Programming",
    icon: <Code className="w-5 h-5" />,
    items: ["Python/PyTorch", "C++", "Rust", "Next.js/React Native"],
  },
  {
    category: "Machine Learning",
    icon: <Brain className="w-5 h-5" />,
    items: ["Deep Learning", "Transformers", "Symbolic Regression", "LLMs"],
  },
  {
    category: "Languages",
    icon: <Languages className="w-5 h-5" />,
    items: [
      "French (Native)",
      "English (C1, Cambridge)",
      "German (Intermediate)",
      "Dutch (Basic)",
    ],
  },
  {
    category: "Frameworks & Tools",
    icon: <Wrench className="w-5 h-5" />,
    items: [
      "HuggingFace",
      "GitHub",
      "Docker",
      "Weights & Biases",
    ],
  },
  {
    category: "Research",
    icon: <GitBranch className="w-5 h-5" />,
    items: [
      "Mathematical Reasoning",
      "Discrete Optimization",
      "Complex Systems",
      "Artificial Life",
    ],
  },
];
