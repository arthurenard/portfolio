import { Metadata } from "next";
import About from "@/components/About";
import { getPageMetadata } from "@/data/seo";
import PageShell from "@/components/PageShell";
import { aboutData } from "@/data/about";

export const metadata: Metadata = getPageMetadata("about");

export default function AboutPage() {
  return (
    <PageShell title={aboutData.title} description={aboutData.description}>
      <About isStandalonePage={true} />
    </PageShell>
  );
}
