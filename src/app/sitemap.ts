import { siteMetadata } from "@/data/seo";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.url;
  
  // Define routes
  const routes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/contact",
  ];

  // Create sitemap entries
  const sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return sitemap;
} 