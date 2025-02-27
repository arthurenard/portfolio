"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";

// Define the Project type
interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  paper?: string;
}

// Define the ProjectCardProps type
interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.8, 1],
    [1, 1, 1, 1, 0.7]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.8, 1],
    [1, 1, 1, 1, 0.9]
  );

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Add a subtle fade at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center mouse-gradient-text"
        >
          Featured Work
        </motion.h2>
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 md:gap-12`}
    >
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech, i) => (
            <Badge
              key={i}
              variant="outline"
              className="dark:bg-gray-800/80 dark:text-gray-200 backdrop-blur-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/80 backdrop-blur-sm"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/80 backdrop-blur-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </Link>
          )}
          {project.paper && (
            <Link
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/80 backdrop-blur-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Paper
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 h-[300px] md:h-[400px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-400/10 dark:to-purple-400/10" />
        {/* Add your project images here */}
      </div>
    </motion.div>
  );
}
