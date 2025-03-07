"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

// Define the ProjectCardProps type
interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
}

export default function Projects() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          transition={{ duration: isMobile ? 0.4 : 0.8 }}
          className="text-4xl md:text-5xl font-bold pb-16 text-center mouse-gradient-text"
        >
          Projects
        </motion.h2>
        <div className="space-y-12 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({ project, index, isMobile }: ProjectCardProps) {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isInView = useInView(ref, { 
    once: false, 
    margin: isMobile ? "-50px" : "-100px" 
  });

  // Function to truncate text to 5 lines
  const truncateDescription = (text: string) => {
    const words = text.split(' ');
    const truncated = words.slice(0, 35).join(' '); // Approximately 5 lines
    return truncated + (words.length > 35 ? '...' : '');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ 
        duration: isMobile ? 0.4 : 0.8, 
        delay: isMobile ? 0.05 : 0.1 
      }}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 md:gap-12`}
    >
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
        {project.subtitle && (
          <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium italic">
            {project.subtitle}
          </p>
        )}
        <div className="relative">
          <p className="text-gray-600 dark:text-gray-300">
            {isMobile && !isExpanded 
              ? truncateDescription(project.description)
              : project.description}
          </p>
          {isMobile && project.description.split(' ').length > 35 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2 hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
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
        <div className="flex flex-wrap gap-4 pt-4">
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
                GitHub
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
                <FileText className="w-4 h-4 mr-2" />
                Paper
              </Button>
            </Link>
          )}
          {project.arxiv && (
            <Link
              href={project.arxiv}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/80 backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                arXiv
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 h-[300px] md:h-[400px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl shadow-lg relative overflow-hidden">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-400/10 dark:to-purple-400/10" />
      </div>
    </motion.div>
  );
}
