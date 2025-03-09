import { Code, Brain, Languages, GitBranch } from "lucide-react";
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
    items: ["Python (PyTorch)", "C++", "Next.js", "Rust"],
  },
  {
    category: "Machine Learning",
    icon: <Brain className="w-5 h-5" />,
    items: ["Deep Learning", "Transformers", "HuggingFace", "PyTorch"],
  },
  {
    category: "Languages",
    icon: <Languages className="w-5 h-5" />,
    items: [
      "French (Native)",
      "English (C1)",
      "German (Intermediate)",
      "Dutch (Basic)",
    ],
  },
  {
    category: "Research",
    icon: <GitBranch className="w-5 h-5" />,
    items: [
      "Mathematical Reasoning",
      "LLMs",
      "Symbolic Regression",
      "Discrete Optimization",
    ],
  },
];
