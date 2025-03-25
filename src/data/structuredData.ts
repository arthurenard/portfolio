// Structured data for SEO
export const getPersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arthur Renard",
    url: "https://arthurenard.me",
    jobTitle: "AI Researcher & Applied Mathematician",
    worksFor: {
      "@type": "Organization",
      name: "EPFL",
      url: "https://www.epfl.ch"
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "ETH Zürich",
        url: "https://ethz.ch"
      },
      {
        "@type": "Organization",
        name: "EPFL",
        url: "https://www.epfl.ch"
      }
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Mathematical Reasoning",
      "Large Language Models",
      "Symbolic Regression",
      "Functional Equations",
      "Interpretable Machine Learning"
    ],
    sameAs: [
      "https://github.com/arthurenard",
      "https://www.linkedin.com/in/arthur-renard-3211471b6/"
    ]
  };
};

export const getWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arthur Renard Portfolio",
    url: "https://arthurenard.me",
    description: "Portfolio of Arthur Renard, an AI researcher and applied mathematician specializing in mathematical reasoning and large language models at EPFL.",
    author: {
      "@type": "Person",
      name: "Arthur Renard"
    }
  };
};

export const getResearchProjectSchema = (project: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: project.title,
    description: project.description,
    ...(project.image && { image: `https://arthurenard.me${project.image}` }),
    ...(project.url && { url: project.url }),
    author: {
      "@type": "Person",
      name: "Arthur Renard",
      url: "https://arthurenard.me"
    }
  };
}; 