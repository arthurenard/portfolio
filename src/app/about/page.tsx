import { Metadata } from "next";
import About from "@/components/About";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";

export const metadata: Metadata = {
  title: "About Me | Arthur Renard",
  description: "Personal background, education journey, skills and expertise of Arthur Renard.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen relative pt-20">
      {/* Scroll restoration */}
      <ScrollRestoration />

      {/* Mouse gradient effect - disabled on mobile */}
      <div className="hidden md:block">
        <MouseGradient />
      </div>

      {/* Global background with subtle gradient and blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary background blobs - more subtle */}
        <div className="absolute top-[5%] -left-[20%] w-[60%] h-[60%] rounded-full bg-purple-200/10 dark:bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[30%] w-[70%] h-[70%] rounded-full bg-indigo-200/10 dark:bg-indigo-900/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-pink-200/10 dark:bg-pink-900/10 blur-[120px]" />

        {/* Secondary accent blobs - more vibrant for light theme, hidden on mobile */}
        <div className="hidden md:block absolute top-[15%] left-[20%] w-[20%] h-[20%] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[80px] animate-pulse-slow" />
        <div className="hidden md:block absolute top-[60%] right-[15%] w-[25%] h-[25%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] animate-pulse-slower" />
        <div className="hidden md:block absolute bottom-[25%] left-[30%] w-[15%] h-[15%] rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-[60px] animate-pulse-slow" />

        {/* Global subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/5 to-transparent dark:via-indigo-900/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
          About Me
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
          Personal background, education journey through EPFL, ETH Zürich, and KTH, skills and expertise.
        </p>
        <About isStandalonePage={true} />
      </div>
    </main>
  );
} 