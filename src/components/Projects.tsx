"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, FileText, Clock } from "lucide-react";
import Image from "next/image";
import { projects, projectCategories } from "@/data/projects";

// Define the Project type to match the actual structure
interface Project {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  paper?: string;
  arxiv?: string;
  image?: string;
  category: string;
  iframe?: string;
  comingSoon?: string;
}

// Define the Projects component props
interface ProjectsProps {
  isStandalonePage?: boolean;
}

export default function Projects({ isStandalonePage = false }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Skip animations on mobile or standalone page for better performance
  const shouldAnimate = !isMobile && !isStandalonePage;

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-16 ${isStandalonePage ? "" : "min-h-screen"}`}
    >
      {!isStandalonePage && (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Here are some of my recent projects. Click on each for more details.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Academic Research Projects */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white inline-block border-b-2 border-indigo-500 pb-2">
            Academic Research
          </h3>
          <div className="space-y-24">
            {(projects as Project[])
              .filter(project => project.category === projectCategories.ACADEMIC)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={shouldAnimate ? { opacity: 0, y: 50 } : undefined}
                  animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }) : undefined}
                  transition={shouldAnimate ? { duration: 0.6, delay: index * 0.1 } : undefined}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-12`}
                >
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium italic">
                        {project.subtitle}
                      </p>
                    )}
                    <div className="relative">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 dark:text-gray-200"
                        >
                          <Github className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 dark:text-gray-200"
                        >
                          <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Demo</span>
                        </a>
                      )}
                      {project.arxiv && (
                        <a
                          href={project.arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-800 dark:text-gray-200"
                        >
                          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>arXiv</span>
                        </a>
                      )}
                      {project.comingSoon && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-800 dark:text-gray-200">
                          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>{project.comingSoon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 h-[300px] md:h-[400px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl shadow-lg relative overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-400/10 dark:to-purple-400/10" />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Personal/Volunteer Projects */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white inline-block border-b-2 border-indigo-500 pb-2">
            Personal & Volunteer Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(projects as Project[])
              .filter(project => project.category === projectCategories.PERSONAL)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
                  animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }) : undefined}
                  transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : undefined}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                >
                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{project.title}</h4>
                    {project.subtitle && (
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-3">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Project Preview - Image or iFrame */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {project.iframe ? (
                      <iframe
                        src={project.iframe}
                        title={project.title}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30" />
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-6 pt-4 flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {project.description.length > 240
                        ? `${project.description.substring(0, 240)}...`
                        : project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Visit Website</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
