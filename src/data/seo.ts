import { Metadata } from "next";

export const siteMetadata = {
  title: "Arthur Renard | AI Researcher & Applied Mathematician",
  name: "Arthur Renard",
  description: 
    "Arthur Renard's portfolio showcasing his work as an AI researcher at Xent Labs and applied mathematician with expertise in large language model reasoning.",
  url: "https://arthurenard.me",
  keywords: [
    "Arthur Renard",
    "AI Researcher",
    "Applied Mathematician",
    "Mathematical Reasoning",
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
    title: "Arthur Renard | AI Researcher & Applied Mathematician",
    description: 
    "Arthur Renard's portfolio showcasing his work as an AI researcher at Xent Labs and applied mathematician with expertise in large language model reasoning.",
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
    icons: {
      icon: [
        { url: "/favicons/favicon.ico" },
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        {
          url: "/favicons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          url: "/favicons/apple-touch-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: "/favicons/apple-touch-icon-120x120.png",
          sizes: "120x120",
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
        {
          rel: "mask-icon",
          url: "/favicons/safari-pinned-tab.svg", 
          color: "#5bbad5"
        },
        {
          rel: "icon",
          url: "/favicons/firefox-icon-16x16.png",
          sizes: "16x16",
        },
        {
          rel: "icon",
          url: "/favicons/firefox-icon-30x30.png",
          sizes: "30x30",
        },
        {
          rel: "icon",
          url: "/favicons/firefox-icon-32x32.png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          url: "/favicons/firefox-icon-48x48.png",
          sizes: "48x48",
        },
        {
          rel: "icon",
          url: "/favicons/firefox-icon-60x60.png",
          sizes: "60x60",
        },
        {
          rel: "icon",
          url: "/favicons/firefox-icon-128x128.png",
          sizes: "128x128",
        },
      ],
    },
    manifest: "/favicons/site.webmanifest",
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#ffffff",
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
      description: "Learn about Arthur Renard's background, education, and skills in AI research and applied mathematics.",
    },
    projects: {
      title: "Projects | Arthur Renard",
      description: "Explore Arthur Renard's research projects in AI, mathematical reasoning, and symbolic regression.",
    },
    experience: {
      title: "Experience | Arthur Renard",
      description: "Arthur Renard's professional experience in AI research and applied mathematics at Xentlabs, EPFL, and ETH Zürich.",
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