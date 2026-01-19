import { Metadata } from "next";

export const siteMetadata = {
  title: "Arthur Renard | ML Researcher & Founding Engineer at Xent Labs",
  name: "Arthur Renard",
  description:
    "ML Researcher & Founding Engineer at Xent Labs. Applied mathematician building practical AI for reasoning.",
  url: "https://arthurenard.me",
  keywords: [
    "Arthur Renard",
    "ML Researcher",
    "Founding Engineer",
    "AI Research",
    "Applied Mathematics",
    "Reasoning",
    "Large Language Models",
    "Symbolic Regression",
    "Xent Labs",
    "Xent Games",
    "ETH Zürich",
    "Deep Learning",
    "Functional Equations",
    "Interpretable ML",
    "Boolformer",
    "Phase Transition Finder",
    "Portfolio",
    "Lausanne",
    "Switzerland"
  ],
  authors: [{ name: "Arthur Renard" }],
  creator: "Arthur Renard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arthurenard.me",
    title: "Arthur Renard | ML Researcher & Founding Engineer at Xent Labs",
    description:
      "ML Researcher & Founding Engineer at Xent Labs. Applied mathematician building practical AI for reasoning.",
    siteName: "Arthur Renard Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Arthur Renard",
      },
    ],
  },
};

export const getMetadata = (): Metadata => {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: siteMetadata.authors,
    creator: siteMetadata.creator,
    openGraph: siteMetadata.openGraph,
    metadataBase: new URL(siteMetadata.url),
    // manifest: "/favicons/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: siteMetadata.title,
      statusBarStyle: "default",
    },
  };
};

// Page-specific metadata
export const getPageMetadata = (page: string): Metadata => {
  const baseMetadata = getMetadata();

  const pageMetadata: Record<string, Metadata> = {
    home: {
      title: siteMetadata.title,
      description: siteMetadata.description,
    },
    about: {
      title: "About | Arthur Renard",
      description:
        "Brief background, education, and core skills in applied mathematics and AI.",
    },
    projects: {
      title: "Projects | Arthur Renard",
      description: "Selected research and engineering projects in AI and mathematics.",
    },
    experience: {
      title: "Experience | Arthur Renard",
      description:
        "Professional experience in ML research and founding engineering at Xent Labs.",
    },
    contact: {
      title: "Contact | Arthur Renard",
      description:
        "Get in touch for collaborations, consulting, or high-impact projects.",
    },
  };

  return {
    ...baseMetadata,
    ...pageMetadata[page],
  };
}; 