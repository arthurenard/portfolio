import Experience from "@/components/Experience";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";
import { getPageMetadata } from "@/data/seo";
import type { Metadata } from "next";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = getPageMetadata("experience");

export default function ExperiencePage() {
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
          Experience
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
          Expanded version of my professional experience, including work at Xent Labs, research at EPFL, teaching experience, and industry projects.
        </p>
        <Experience isStandalonePage={true} />
      </div>
    </main>
  );
} 