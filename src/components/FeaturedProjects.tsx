import Link from "next/link";
import { ArrowUpRight, Github, FileText } from "lucide-react";
import { getProjectSlug, projects, type Project } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3) as Project[];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-4xl 3xl:max-w-6xl">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="display-serif text-2xl md:text-3xl font-medium text-foreground">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {featured.map((project) => (
            <li key={project.title} className="py-6 md:py-8">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <Link
                      href={`/projects#${getProjectSlug(project.title)}`}
                      className="display-serif text-xl md:text-2xl font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {project.title}
                    </Link>
                    {project.venue && (
                      <span className="text-sm text-muted-foreground">
                        {project.venue}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                    {project.featuredDescription ?? project.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground md:pt-1.5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  )}
                  {project.arxiv && (
                    <a
                      href={project.arxiv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      arXiv
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
