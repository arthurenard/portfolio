"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

// Define the Project type
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
}

// Define the Projects component props
interface ProjectsProps {
  isStandalonePage?: boolean;
}

// Define the ProjectCard props
interface ProjectCardProps {
  project: Project;
  isMobile: boolean;
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={isStandalonePage ? undefined : { opacity: 0 }}
          animate={isStandalonePage ? undefined : isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={isStandalonePage ? undefined : { staggerChildren: 0.2 }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              isMobile={isMobile}
              isStandalonePage={isStandalonePage}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isMobile, isStandalonePage = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Skip animations on mobile or standalone page for better performance
  const shouldAnimate = !isMobile && !isStandalonePage;

  // Function to truncate description if needed
  const truncateDescription = (text: string) => {
    if (text.length > 150 && !isStandalonePage) {
      return text.substring(0, 150) + "...";
    }
    return text;
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? { y: 50, opacity: 0 } : undefined}
      animate={shouldAnimate ? (isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }) : undefined}
      transition={shouldAnimate ? { type: "spring", damping: 20, stiffness: 100 } : undefined}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 ${
        isStandalonePage ? "p-6" : ""
      }`}
    >
      {/* Project image if available */}
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">
            {project.subtitle}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {truncateDescription(project.description)}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Project links */}
      <div className="px-6 pb-6 flex flex-wrap gap-3">
        {project.github && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </Button>
        )}
        {project.demo && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span>Demo</span>
            </Link>
          </Button>
        )}
        {project.paper && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link href={project.paper} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4" />
              <span>Paper</span>
            </Link>
          </Button>
        )}
        {project.arxiv && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link href={project.arxiv} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4" />
              <span>arXiv</span>
            </Link>
          </Button>
        )}
      </div>
    </motion.div>
  );
}
