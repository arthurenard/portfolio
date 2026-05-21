import { Metadata } from "next";
import Contact from "@/components/Contact";
import { getPageMetadata } from "@/data/seo";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = getPageMetadata("contact");

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Open to research collaborations and discussions."
    >
      <Contact isStandalonePage={true} />
    </PageShell>
  );
}
