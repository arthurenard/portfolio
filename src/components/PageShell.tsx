"use client";

import { ReactNode } from "react";
import PageDecorations from "@/components/PageDecorations";

interface PageShellProps {
  title: string;
  description: string;
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
    <main className="min-h-screen relative pt-20">
      {prelude}
      <PageDecorations />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
          {description}
        </p>
        {children}
      </div>
    </main>
  );
}
