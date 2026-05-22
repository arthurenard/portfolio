export const projectCategories = {
  ACADEMIC: "academic",
  PERSONAL: "personal",
  VOLUNTEER: "volunteer",
} as const;

export type ProjectCategory = typeof projectCategories[keyof typeof projectCategories];

export type Project = {
  title: string;
  venue?: string;
  authors?: string;
  institutions?: string[];
  description: string;
  featuredDescription?: string;
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
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const projects: Project[] = [
  {
    title: "Boolformer",
    venue: "AI for Math Workshop, ICML 2025",
    authors:
      "Stéphane d'Ascoli*, Arthur Renard*, Emmanuel Abbé, Clément Hongler, Vassilis Papadopoulos, Josh Susskind, Samy Bengio",
    institutions: ["EPFL", "Apple"],
    description:
      "A Transformer trained end-to-end for symbolic regression of Boolean functions. Predicts compact formulas from truth tables, remains robust to noisy or partial observations, and is competitive with state-of-the-art genetic algorithms on gene regulatory network inference at orders-of-magnitude lower cost.",
    featuredDescription:
      "A Transformer model for symbolic regression of Boolean functions, presented at the AI for Math Workshop at ICML 2025.",
    tech: ["Transformers", "Symbolic Regression", "Interpretable ML"],
    github: "https://github.com/arthurenard/Boolformer",
    image: "/boolformer.png",
    category: projectCategories.ACADEMIC,
    arxiv: "https://arxiv.org/pdf/2309.12207",
  },
  {
    title: "Phase Transition Finder",
    venue: "GECCO Companion 2024",
    authors:
      "Vassilis Papadopoulos, Guilhem Doat, Arthur Renard, Clément Hongler",
    institutions: ["EPFL"],
    description:
      "An algorithm that efficiently locates parameters at the border between phases in high-dimensional dynamical systems. Applied to Lenia, it doubles the frequency of interesting emergent behaviours while remaining tractable for large-scale searches.",
    featuredDescription:
      "An algorithm for finding phase boundaries in continuous cellular automata, presented at GECCO Companion 2024.",
    tech: ["Complex Systems", "Artificial Life", "PyTorch"],
    github: "https://github.com/arthurenard/LeniaPTF",
    arxiv: "https://arxiv.org/abs/2402.17848",
    image: "/ptf.webp",
    category: projectCategories.ACADEMIC,
  },
  {
    title: "Fluxtuning",
    venue: "Personal project",
    description:
      "Fine-tuning FLUX.1-dev with LoRA on 50 captioned photos to generate portraits while preserving the base model's creativity. Includes a write-up of the math behind flow matching and LoRA.",
    featuredDescription:
      "A practical write-up on fine-tuning FLUX.1-dev with LoRA for personalised image generation.",
    tech: ["FLUX.1", "LoRA", "Flow Matching"],
    image: "/jobs_portrait_5.jpeg",
    category: projectCategories.PERSONAL,
    page: "/blog/fluxtuning",
    github: "https://github.com/arthurenard/Fluxtuning",
  },
  {
    title: "Festival Balélec website and app",
    venue: "Volunteer, 2024",
    description:
      "Designed and shipped the official website and mobile app for Europe's largest student festival (15,000+ attendees), with live schedules, maps, and artist information.",
    tech: ["Next.js", "TypeScript", "Strapi"],
    demo: "https://balelec.ch/en",
    image: "/balelec.webp",
    category: projectCategories.VOLUNTEER,
    iframe: "https://balelec.ch/fr",
  },
  {
    title: "DEMECO Workshop",
    venue: "Volunteer, 2025",
    description: "Site for an academic workshop.",
    tech: ["Next.js", "TypeScript"],
    demo: "https://www.dem.eco/",
    category: projectCategories.VOLUNTEER,
    iframe: "https://www.dem.eco/",
  },
];
