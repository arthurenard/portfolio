import Link from "next/link";
import { personalInfo } from "@/data/personal";

export default function Hero() {
  return (
    <section className="min-h-[88vh] flex items-center">
      <div className="container mx-auto px-4 max-w-4xl 3xl:max-w-6xl">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
          {personalInfo.location}
        </p>

        <h1 className="display-serif text-5xl md:text-7xl font-medium text-foreground leading-[1.05]">
          {personalInfo.name}
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          {personalInfo.xentLabs.text}
          <Link
            href={personalInfo.xentLabs.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground link-underline"
          >
            {personalInfo.xentLabs.linkText}
          </Link>
          {personalInfo.xentLabs.suffix}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link
            href={personalInfo.links.projects}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Selected work
          </Link>
          <Link
            href={personalInfo.links.contact}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  );
}
