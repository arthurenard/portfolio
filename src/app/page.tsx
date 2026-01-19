import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperienceSnapshot from "@/components/ExperienceSnapshot";
import SkillsOverview from "@/components/SkillsOverview";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPageMetadata } from "@/data/seo";
import type { Metadata } from "next";
import PageDecorations from "@/components/PageDecorations";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <PageDecorations />

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
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">Explore my technical projects including Boolformer and Balelec website/app.</p>
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
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">Discover my professional experience at Xent Labs, at EPFL, and in several associations.</p>
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
      </div>
    </main>
  );
}
