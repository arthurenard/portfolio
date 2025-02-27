import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Scroll restoration */}
      <ScrollRestoration />

      {/* Mouse gradient effect */}
      <MouseGradient />

      {/* Global background with subtle gradient and blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary background blobs - more subtle */}
        <div className="absolute top-[5%] -left-[20%] w-[60%] h-[60%] rounded-full bg-purple-200/10 dark:bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[30%] w-[70%] h-[70%] rounded-full bg-indigo-200/10 dark:bg-indigo-900/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-pink-200/10 dark:bg-pink-900/10 blur-[120px]" />

        {/* Secondary accent blobs - more vibrant for light theme */}
        <div className="absolute top-[15%] left-[20%] w-[20%] h-[20%] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[80px] animate-pulse-slow" />
        <div className="absolute top-[60%] right-[15%] w-[25%] h-[25%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] animate-pulse-slower" />
        <div className="absolute bottom-[25%] left-[30%] w-[15%] h-[15%] rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-[60px] animate-pulse-slow" />

        {/* Global subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/5 to-transparent dark:via-indigo-900/5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
