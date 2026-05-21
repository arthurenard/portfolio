interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`display-serif text-lg font-medium tracking-tight text-foreground select-none ${className}`}
    >
      Arthur Renard
    </span>
  );
}
