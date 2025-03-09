import Hero from "@/components/Hero";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperienceSnapshot from "@/components/ExperienceSnapshot";
import SkillsOverview from "@/components/SkillsOverview";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative">
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
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Projects Section */}
        <FeaturedProjects />
        
        {/* Experience Snapshot Section */}
        <ExperienceSnapshot />
        
        {/* Skills Overview Section */}
        <SkillsOverview />
        
        {/* Quick Navigation Cards */}
        <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Explore More
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* About Card */}
              <Link href="/about" className="group">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">About Me</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">Learn about my background, education journey, and skills.</p>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    <span>Read more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              
              {/* Projects Card */}
              <Link href="/projects" className="group">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Projects</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">Explore my technical projects including Phase Transition Finder and Balelec website/app.</p>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    <span>View projects</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              
              {/* Experience Card */}
              <Link href="/experience" className="group">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Experience</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">Discover my professional experience at EPFL and in industry projects.</p>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    <span>See experience</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              
              {/* Contact Card */}
              <Link href="/contact" className="group">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Contact</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">Get in touch with me and connect on professional networks.</p>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    <span>Contact me</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 px-4 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Arthur Renard. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
