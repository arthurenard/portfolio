import { Metadata } from "next";
import Contact from "@/components/Contact";
import { getPageMetadata } from "@/data/seo";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = getPageMetadata("contact");

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Professional contact information and links to professional networks."
    >
      <Contact isStandalonePage={true} />
    </PageShell>
  );
} 