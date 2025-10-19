"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, FileText, Clock, ScrollText } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";

// Project type imported from data

export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isMobile = useIsMobile();

  // Get only the first 2 projects for the featured section
  const featuredProjects = projects.slice(0, 2) as Project[];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decorative elements - only on desktop */}
      {!isMobile && (
        <>
          <div aria-hidden className="pointer-events-none -z-10 absolute top-40 -right-20 w-80 h-80 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none -z-10 absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          animate={isMobile ? { opacity: 1 } : isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mouse-gradient-text inline-block">
            Research Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exploring AI, mathematical reasoning, and symbolic regression at <span className="text-indigo-600 dark:text-indigo-400 font-medium">EPFL</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16 md:space-y-24"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              {/* Project Image */}
              <div className="w-full md:w-1/2 relative">
                <div className="relative overflow-hidden rounded-xl shadow-xl aspect-video">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  
                  {/* Project title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-sm text-gray-200">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description.length > 200
                    ? `${project.description.substring(0, 200)}...`
                    : project.description}
                </p>

                <Link
                  href={`/projects#${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group mt-2 mb-4 w-fit"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex flex-wrap gap-4 pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.arxiv && (
                    <a
                      href={project.arxiv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>arXiv</span>
                    </a>
                  )}
                  {project.comingSoon && (
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Clock className="w-4 h-4" />
                      <span>{project.comingSoon}</span>
                    </div>
                  )}
                  {project.underReview && (
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <ScrollText className="w-4 h-4" />
                      <span>{project.underReview}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">
              View All Projects
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 