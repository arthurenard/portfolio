import { Github, ExternalLink, FileText, Clock, BookOpen, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProjectSlug, projects, projectCategories, type Project } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";

interface ProjectsProps {
  isStandalonePage?: boolean;
}

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {project.page && (
        <Link href={project.page} className={linkClass}>
          <BookOpen className="w-3.5 h-3.5" />
          Write-up
        </Link>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <Github className="w-3.5 h-3.5" />
          Code
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Live site
        </a>
      )}
      {project.arxiv && (
        <a
          href={project.arxiv}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <FileText className="w-3.5 h-3.5" />
          arXiv
        </a>
      )}
      {project.comingSoon && (
        <span className={`${linkClass} cursor-default`}>
          <Clock className="w-3.5 h-3.5" />
          {project.comingSoon}
        </span>
      )}
      {project.underReview && (
        <span className={`${linkClass} cursor-default`}>
          <Clock className="w-3.5 h-3.5" />
          {project.underReview}
        </span>
      )}
    </div>
  );
}

function AcademicProject({ project }: { project: Project }) {
  return (
    <article
      id={getProjectSlug(project.title)}
      className="scroll-mt-28 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 md:gap-12 items-start"
    >
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="display-serif text-2xl md:text-3xl font-medium text-foreground">
            {project.title}
          </h3>
          {project.venue && (
            <span className="text-sm text-muted-foreground">{project.venue}</span>
          )}
        </div>
        {project.authors && (
          <p className="mt-2 text-sm text-muted-foreground">{project.authors}</p>
        )}
        <p className="mt-4 text-foreground/85 leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs text-muted-foreground border border-border rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <ProjectLinks project={project} />
        </div>
      </div>

      {project.image && (
        <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-md border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 280px, 100vw"
          />
        </div>
      )}
    </article>
  );
}

function PersonalProject({ project }: { project: Project }) {
  const TitleTag = project.page ? Link : "span";
  const titleProps = project.page ? { href: project.page } : {};

  return (
    <article
      id={getProjectSlug(project.title)}
      className="scroll-mt-28 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 md:gap-12 items-start"
    >
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <TitleTag
            {...(titleProps as { href: string })}
            className="display-serif text-2xl md:text-3xl font-medium text-foreground hover:text-primary transition-colors"
          >
            {project.title}
          </TitleTag>
          {project.venue && (
            <span className="text-sm text-muted-foreground">{project.venue}</span>
          )}
        </div>
        <p className="mt-4 text-foreground/85 leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs text-muted-foreground border border-border rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <ProjectLinks project={project} />
        </div>
      </div>

      {project.image && (
        <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-md border border-border">
          {project.page ? (
            <Link href={project.page} className="block w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 280px, 100vw"
              />
            </Link>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 280px, 100vw"
            />
          )}
        </div>
      )}
    </article>
  );
}

function VolunteerProject({ project }: { project: Project }) {
  return (
    <li id={getProjectSlug(project.title)} className="scroll-mt-28 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6">
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="display-serif text-xl font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                {project.title}
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ) : (
              <span className="display-serif text-xl font-medium text-foreground">
                {project.title}
              </span>
            )}
            {project.venue && (
              <span className="text-sm text-muted-foreground">{project.venue}</span>
            )}
          </div>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
        <div className="text-sm text-muted-foreground md:text-right md:pt-1.5">
          {project.tech.slice(0, 3).join(" · ")}
        </div>
      </div>
    </li>
  );
}

export default function Projects({ isStandalonePage = false }: ProjectsProps) {
  const academic = (projects as Project[]).filter(
    (p) => p.category === projectCategories.ACADEMIC
  );
  const personal = (projects as Project[]).filter(
    (p) => p.category === projectCategories.PERSONAL
  );
  const volunteer = (projects as Project[]).filter(
    (p) => p.category === projectCategories.VOLUNTEER
  );

  return (
    <section id="projects">
      {!isStandalonePage && (
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader title="Projects" />
        </div>
      )}

      <div className={isStandalonePage ? "space-y-24" : "container mx-auto px-4 max-w-4xl space-y-24"}>
        {academic.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-10">
              Research
            </h2>
            <div className="space-y-16 md:space-y-20">
              {academic.map((project) => (
                <AcademicProject key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {personal.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-10">
              Personal
            </h2>
            <div className="space-y-16 md:space-y-20">
              {personal.map((project) => (
                <PersonalProject key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {volunteer.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              Other work
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {volunteer.map((project) => (
                <VolunteerProject key={project.title} project={project} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
