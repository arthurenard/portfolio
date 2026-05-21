import Link from "next/link";
import { contactInfo } from "@/data/contact";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
          <div>
            &copy; {year} Arthur Renard
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {contactInfo
              .filter((item) => item.href)
              .map((item) => (
                item.href!.startsWith("mailto:") ? (
                  <CopyEmailButton
                    key={item.label}
                    email={item.href!.replace("mailto:", "")}
                    className="hover:text-foreground transition-colors"
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label.replace(" Profile", "")}
                  </Link>
                )
              ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
