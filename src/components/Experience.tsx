import { workExperience, volunteerExperience } from "@/data/experience";
import { formatDateToYear } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUpRight } from "lucide-react";

interface ExperienceProps {
  isStandalonePage?: boolean;
}

interface ExperienceItem {
  position: string;
  company: string;
  location?: string;
  years: string;
  description: string;
  links?: Array<{ label: string; url: string }>;
}

function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((exp, index) => (
        <li key={index} className="py-7 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-8">
            <div>
              <h4 className="display-serif text-xl md:text-2xl font-medium text-foreground">
                {exp.position}
              </h4>
              <p className="mt-1 text-muted-foreground">
                {exp.company}
                {exp.location && (
                  <span className="text-muted-foreground/70"> · {exp.location}</span>
                )}
              </p>
              <p className="mt-3 text-foreground/85 leading-relaxed max-w-2xl">
                {exp.description}
              </p>
              {exp.links && exp.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {exp.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground md:text-right md:pt-2 tabular-nums">
              {formatDateToYear(exp.years)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Experience({ isStandalonePage = false }: ExperienceProps) {
  return (
    <section id="experience">
      {!isStandalonePage && (
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader title="Experience" />
        </div>
      )}

      <div className={isStandalonePage ? "" : "container mx-auto px-4 max-w-4xl"}>
        <div className="mb-16">
          <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Work
          </h3>
          <ExperienceList items={workExperience} />
        </div>

        {volunteerExperience.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              Volunteer
            </h3>
            <ExperienceList items={volunteerExperience} />
          </div>
        )}
      </div>
    </section>
  );
}
