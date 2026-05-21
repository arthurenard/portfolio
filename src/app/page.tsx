import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import { getPageMetadata } from "@/data/seo";
import type { Metadata } from "next";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
    </main>
  );
}
