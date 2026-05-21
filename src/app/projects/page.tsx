"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Projects from "@/components/Projects";
import { getResearchProjectSchema } from "@/data/structuredData";
import { projects } from "@/data/projects";
import Script from "next/script";
import PageShell from "@/components/PageShell";

function ProjectsContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [searchParams]);

  return <Projects isStandalonePage={true} />;
}

export default function ProjectsPage() {
  const academicProjects = projects.filter(
    (project) => project.category === "academic"
  );
  const projectSchemas = academicProjects.map((project) =>
    getResearchProjectSchema({
      title: project.title,
      description: project.description,
      image: project.image,
      url: project.github || project.arxiv || undefined,
    })
  );

  return (
    <PageShell title="Projects">
      {projectSchemas.map((schema, index) => (
        <Script
          key={`schema-project-${index}`}
          id={`schema-project-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Suspense fallback={<div className="text-muted-foreground">Loading…</div>}>
        <ProjectsContent />
      </Suspense>
    </PageShell>
  );
}
