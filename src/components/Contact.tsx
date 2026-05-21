import { contactInfo } from "@/data/contact";
import ContactForm from "./ContactForm";
import SectionHeader from "@/components/SectionHeader";
import CopyEmailButton from "@/components/CopyEmailButton";
import { ArrowUpRight } from "lucide-react";

interface ContactProps {
  isStandalonePage?: boolean;
}

export default function Contact({ isStandalonePage = false }: ContactProps) {
  return (
    <section id="contact">
      {!isStandalonePage && (
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader
            title="Contact"
            description="Open to research collaborations and discussions."
          />
        </div>
      )}

      <div className={isStandalonePage ? "" : "container mx-auto px-4 max-w-4xl"}>
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 md:gap-16">
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              Elsewhere
            </h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    item.href.startsWith("mailto:") ? (
                      <CopyEmailButton
                        email={item.href.replace("mailto:", "")}
                        className="text-foreground hover:text-primary transition-colors"
                      />
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                      >
                        {item.label.replace(" Profile", "")}
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                      </a>
                    )
                  ) : (
                    <span className="text-muted-foreground">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
