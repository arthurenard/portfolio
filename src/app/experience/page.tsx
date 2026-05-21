import Experience from "@/components/Experience";
import { getPageMetadata } from "@/data/seo";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = getPageMetadata("experience");

export default function ExperiencePage() {
  return (
    <PageShell title="Experience">
      <Experience isStandalonePage={true} />
    </PageShell>
  );
}
