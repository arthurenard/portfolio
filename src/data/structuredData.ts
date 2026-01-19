// Structured data for SEO
export const getPersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arthur Renard",
    url: "https://arthurenard.me",
    jobTitle: "ML Researcher & Founding Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Xent Labs",
      url: "https://www.xentlabs.ai/"
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
    description: 
    "Arthur Renard's portfolio showcasing his work as an AI researcher at Xent Labs and applied mathematician with expertise in large language model reasoning.",
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