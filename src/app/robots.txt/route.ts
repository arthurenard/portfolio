import { siteMetadata } from "@/data/seo";

export function GET() {
  const robotsTxt = `
# *
User-agent: *
Allow: /

# Host
Host: ${siteMetadata.url}

# Sitemaps
Sitemap: ${siteMetadata.url}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
} 