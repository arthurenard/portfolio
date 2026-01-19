import Experience from "@/components/Experience";
import { getPageMetadata } from "@/data/seo";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = getPageMetadata("experience");

export default function ExperiencePage() {
  return (
    <PageShell
      title="Experience"
      description="Expanded version of my professional experience, including work at Xent Labs, research at EPFL, teaching experience, and industry projects."
    >
      <Experience isStandalonePage={true} />
    </PageShell>
  );
} 