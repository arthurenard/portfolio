import { Code, Brain, Languages, GitBranch, Lightbulb } from "lucide-react";
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
    items: [
      "Python/PyTorch", 
      "C++", 
      "Rust", 
      "Next.js/React Native"
    ],
  },
  {
    category: "Machine Learning",
    icon: <Brain className="w-5 h-5" />,
    items: [
      "Deep Learning", 
      "Transformers", 
      "Symbolic Regression", 
      "LLMs and their applications"
    ],
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
    category: "Soft Skills",
    icon: <Lightbulb className="w-5 h-5" />,
    items: [
      "Analytical Thinking",
      "Complex Problem-Solving",
      "Autonomous",
      "Team Player",
    ],
  },
  {
    category: "Research",
    icon: <GitBranch className="w-5 h-5" />,
    items: [
      "Mathematical Reasoning",
      "Discrete Optimization",
      "Generative AI",
      "Artificial Life",
    ],
  },
];
