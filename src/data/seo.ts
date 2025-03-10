import { Metadata } from "next";

export const siteMetadata = {
  title: "Arthur Renard | AI Researcher & Applied Mathematician",
  name: "Arthur Renard",
  description: 
    "Portfolio of Arthur Renard, an AI researcher and applied mathematician specializing in mathematical reasoning, large language models, and symbolic regression at EPFL.",
  url: "https://arthurrenard.com",
  keywords: [
    "Arthur Renard",
    "AI Researcher",
    "Applied Mathematician",
    "Mathematical Reasoning",
    "Large Language Models",
    "Symbolic Regression",
    "EPFL",
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
    url: "https://arthurrenard.com",
    title: "Arthur Renard | AI Researcher & Applied Mathematician",
    description: "Portfolio of Arthur Renard, an AI researcher and applied mathematician specializing in mathematical reasoning and large language models at EPFL.",
    siteName: "Arthur Renard Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arthur Renard - AI Researcher & Applied Mathematician"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur Renard | AI Researcher & Applied Mathematician",
    description: "Portfolio of Arthur Renard, an AI researcher and applied mathematician specializing in mathematical reasoning and large language models at EPFL.",
    images: ["/og-image.jpg"]
  }
};

export const getMetadata = (): Metadata => {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: siteMetadata.authors,
    creator: siteMetadata.creator,
    openGraph: siteMetadata.openGraph,
    twitter: siteMetadata.twitter,
    metadataBase: new URL(siteMetadata.url),
    icons: {
      icon: [
        { url: "/favicons/favicon.ico" },
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        {
          url: "/favicons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          url: "/favicons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/favicons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    manifest: "/favicons/site.webmanifest",
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
      description: "Learn about Arthur Renard's background, education, and skills in AI research and applied mathematics.",
    },
    projects: {
      title: "Projects | Arthur Renard",
      description: "Explore Arthur Renard's research projects in AI, mathematical reasoning, and symbolic regression.",
    },
    experience: {
      title: "Experience | Arthur Renard",
      description: "Arthur Renard's professional experience in AI research and applied mathematics at EPFL and ETH Zürich.",
    },
    contact: {
      title: "Contact | Arthur Renard",
      description: "Get in touch with Arthur Renard for research collaborations, consulting opportunities, or interesting projects in AI.",
    },
  };
  
  return {
    ...baseMetadata,
    ...pageMetadata[page],
  };
}; 