"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-gradient-to-br from-slate-900 to-indigo-900
        dark:from-indigo-950 dark:to-slate-950
        border border-indigo-500/30
        flex items-center justify-center
        font-bold tracking-widest text-white
        shadow-lg shadow-indigo-500/20
        hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300
        select-none
        ${className}
      `}
    >
      AR
    </div>
  );
}
