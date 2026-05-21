import Image from "next/image";
import { skills } from "@/data/skills";
import { education } from "@/data/experience";
import { aboutData } from "@/data/about";
import { formatDateToYear } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

interface AboutProps {
  isStandalonePage?: boolean;
}

export default function About({ isStandalonePage = false }: AboutProps) {
  return (
    <section id="about" className="py-2">
      {!isStandalonePage && (
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader title={aboutData.title} description={aboutData.description} />
        </div>
      )}

      <div className={isStandalonePage ? "" : "container mx-auto px-4 max-w-4xl"}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-10 md:gap-14 items-start">
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="order-first md:order-last">
            <div className="relative w-40 h-40 md:w-[220px] md:h-[220px] overflow-hidden rounded-md border border-border">
              <Image
                src={aboutData.profileImage.src}
                alt={aboutData.profileImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 220px, 160px"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              {aboutData.educationTitle}
            </h3>
            <ul className="space-y-6">
              {education.map((edu, index) => (
                <li key={index} className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <div>
                    <div className="text-foreground">{edu.degree}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {edu.institution}
                    </div>
                    {edu.description.trim() && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {formatDateToYear(edu.years)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              {aboutData.skillsTitle}
            </h3>
            <ul className="space-y-6">
              {skills.map((group) => (
                <li key={group.category}>
                  <div className="text-foreground mb-1">{group.category}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {group.items.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
