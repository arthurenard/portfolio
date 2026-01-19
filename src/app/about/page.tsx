import { Metadata } from "next";
import About from "@/components/About";
import { getPageMetadata } from "@/data/seo";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = getPageMetadata("about");

export default function AboutPage() {
  return (
    <PageShell
      title="About Me"
      description="Personal background, education journey through EPFL, ETH Zürich, and KTH, skills and expertise."
    >
      <About isStandalonePage={true} />
    </PageShell>
  );
} 