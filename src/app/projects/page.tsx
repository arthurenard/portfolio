"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Projects from "@/components/Projects";
import { getResearchProjectSchema } from "@/data/structuredData";
import { projects } from "@/data/projects";
import Script from "next/script";
import { Suspense } from 'react';
import PageShell from "@/components/PageShell";

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
    <PageShell
      title="Projects"
      description="Detailed showcase of my work, including technical details and outcomes."
      prelude={projectSchemas.map((schema, index) => (
        <Script
          key={`schema-project-${index}`}
          id={`schema-project-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    >
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsContent />
      </Suspense>
    </PageShell>
  );
} 