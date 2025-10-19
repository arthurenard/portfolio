"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Projects from "@/components/Projects";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";
import { getResearchProjectSchema } from "@/data/structuredData";
import { projects } from "@/data/projects";
import Script from "next/script";
import { Suspense } from 'react';
import BackgroundBlobs from "@/components/BackgroundBlobs";

function ProjectsContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Find the element with this ID
      const element = document.getElementById(hash);
      if (element) {
        // Scroll to the element
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <Projects isStandalonePage={true} />
  );
}

export default function ProjectsPage() {
  // Get structured data for academic projects
  const academicProjects = projects.filter(project => project.category === "academic");
  const projectSchemas = academicProjects.map(project => 
    getResearchProjectSchema({
      title: project.title,
      description: project.description,
      image: project.image,
      url: project.github || project.arxiv || undefined
    })
  );

  return (
    <main className="min-h-screen relative pt-20">
      {/* Structured data */}
      {projectSchemas.map((schema, index) => (
        <Script
          key={`schema-project-${index}`}
          id={`schema-project-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
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
          Projects
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
          Detailed showcase of my work, including technical details and outcomes.
        </p>
        <Suspense fallback={<div>Loading projects...</div>}>
          <ProjectsContent />
        </Suspense>
      </div>
    </main>
  );
} 