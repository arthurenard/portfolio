"use client";

interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
        {description}
      </p>
    </div>
  );
}
