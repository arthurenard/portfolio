import { Metadata } from "next";
import Contact from "@/components/Contact";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";
import { getPageMetadata } from "@/data/seo";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = getPageMetadata("contact");

export default function ContactPage() {
  return (
    <main className="min-h-screen relative pt-20">
      {/* Scroll restoration */}
      <ScrollRestoration />

      {/* Mouse gradient effect - disabled on mobile */}
      <div className="hidden md:block">
        <MouseGradient />
      </div>

      <BackgroundBlobs />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
          Contact
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
          Professional contact information and links to professional networks.
        </p>
        <Contact isStandalonePage={true} />
      </div>
    </main>
  );
} 