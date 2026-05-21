interface SectionHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function SectionHeader({
  title,
  description,
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 md:mb-14">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="display-serif text-3xl md:text-4xl font-medium text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
