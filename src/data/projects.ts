// Define project categories
export const projectCategories = {
  ACADEMIC: "academic",
  PERSONAL: "personal"
} as const;

export type ProjectCategory = typeof projectCategories[keyof typeof projectCategories];

export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  paper?: string;
  arxiv?: string;
  image?: string;
  category: ProjectCategory | string;
  iframe?: string;
  comingSoon?: string;
  page?: string;
  underReview?: string;
};

export const getProjectSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-");

export const projects: Project[] = [
  // {
  //   title: "Symbolic Math Solver",
  //   subtitle: "Master's Thesis - ETH Zürich | Supervised by Clément Hongler - EPFL",
  //   description:
  //     "This research explores the intersection of functional equations, symbolic regression, and deep learning through innovative methods. I developed Symbolic Math Solver (SMS), a novel framework extending Physics-Informed Neural Networks by incorporating functional equations directly into the neural network training process. Combined with transformer-based symbolic regression, this approach successfully solved complex functional equations from International Mathematical Olympiad problems. The work demonstrates how integrating mathematical knowledge into machine learning models can tackle challenging mathematical problems, particularly in domains requiring interpretable solutions and analytical reasoning.",
  //   tech: ["PyTorch", "Transformers", "Symbolic Regression", "Functional Equations", "Interpretable ML"],
  //   image: "/symbolic-reg.webp",
  //   category: projectCategories.ACADEMIC,
  //   comingSoon: "Paper submission in preparation"
  // },  
  {
    title: "Boolformer",
    subtitle: "ICML 2025 | Stéphane d'Ascoli*, Arthur Renard*, Emmanuel Abbé, Clément Hongler, Vassilis Papadopoulos, Josh Susskind, Samy Bengio - APPLE, EPFL",
    description:
      "We introduce Boolformer, a Transformer-based model trained to perform end-to-end symbolic regression of Boolean functions. The model can predict compact formulas for complex functions not seen during training, given their full truth table. Even with incomplete or noisy observations, Boolformer is still able to find good approximate expressions. We evaluate it on real-world binary classification datasets, demonstrating its potential as an interpretable alternative to classic machine learning methods. When applied to modeling gene regulatory networks, Boolformer is competitive with state-of-the-art genetic algorithms, with a speedup of several orders of magnitude. We are currently awaiting the results of our submission.",
    tech: ["PyTorch", "Transformers", "Academic Research","Symbolic Regression", "Interpretable ML"],
    github: "https://github.com/arthurenard/Boolformer",
    image: "/boolformer.png",
    category: projectCategories.ACADEMIC,
    arxiv: "https://arxiv.org/pdf/2309.12207"
    // underReview: "Under review at ICML 2025"
  },
  {
    title: "Phase Transition Finder",
    subtitle: "GECCO 2024 | Vassilis Papadopoulos, Guilhem Doat, Arthur Renard, Clément Hongler - EPFL",
    description:
      "One key challenge in Artificial Life is designing systems that display an emergence of complex behaviors. Many such systems depend on a high-dimensional parameter space, only a small subset of which displays interesting dynamics. We introduce the 'Phase Transition Finder'(PTF) algorithm, which can be used to efficiently generate parameters lying at the border between two phases. We argue that such points are more likely to display complex behaviors, and confirm this by applying PTF to Lenia, showing it increases the frequency of interesting behaviors, while remaining efficient enough for large-scale searches.",
    tech: ["PyTorch", "Academic Research", "Complex Systems", "Artificial Life"],
    github: "https://github.com/arthurenard/LeniaPTF",
    arxiv: "https://arxiv.org/abs/2402.17848",
    image: "/ptf.webp",
    category: projectCategories.ACADEMIC
  },
  {
    title: "Festival Balélec Website & App",
    subtitle: "Volunteer Project | Festival Balélec - Europe's largest student festival",
    description:
      "Designed and developed the official website and mobile app for Europe's largest student festival, serving over 15,000 participants with real-time event information, schedules, maps, and artist details.",
    tech: ["Next.js", "TypeScript", "Strapi"],
    demo: "https://balelec.ch/en",
    image: "/balelec.webp",
    category: projectCategories.PERSONAL,
    iframe: "https://balelec.ch/fr"
  },
  // {
  //   title: "Dental Practice Website",
  //   subtitle: "Freelance Project | Professional Website for Dental Practice",
  //   description:
  //     "Designed and developed a professional website for a dental practice.",
  //   tech: ["HTML/CSS", "JavaScript"],
  //   demo: "https://www.dentiste-wielandts.be/",
  //   category: projectCategories.PERSONAL,
  //   iframe: "https://www.dentiste-wielandts.be/"
  // },
  {
    title: "DEMECO Workshop Website",
    subtitle: "Volunteer Project | Academic Workshop Website",
    description:
      "Created a professional website for an academic workshop.",
    tech: ["Next.js", "TypeScript"],
    demo: "https://www.dem.eco/",
    category: projectCategories.PERSONAL,
    iframe: "https://www.dem.eco/"
  },
  // {
  //   title: "Portfolio Website",
  //   subtitle: "Personal Project | Professional Portfolio",
  //   description:
  //     "Designed and developed this portfolio website to showcase my projects, skills, and professional experience using modern web technologies.",
  //   tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  //   category: projectCategories.PERSONAL
  // }
];
