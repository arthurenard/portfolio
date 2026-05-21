"use client";

import { ReactNode } from "react";
import ScrollRestoration from "@/components/ScrollRestoration";

interface PageShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  prelude?: ReactNode;
}

export default function PageShell({
  title,
  description,
  children,
  prelude,
}: PageShellProps) {
  return (
    <main className="min-h-screen pt-28 md:pt-32">
      <ScrollRestoration />
      {prelude}
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-14 md:mb-20">
          <h1 className="display-serif text-4xl md:text-5xl font-medium text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </main>
  );
}
