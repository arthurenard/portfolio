"use client";
import { useIsMobile } from "@/lib/useIsMobile";

export default function BackgroundBlobs() {
  const isMobile = useIsMobile();
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[5%] -left-[20%] w-[60%] h-[60%] rounded-full bg-purple-200/10 dark:bg-purple-900/10 blur-[120px]" />
      <div className="absolute top-[40%] -right-[30%] w-[70%] h-[70%] rounded-full bg-indigo-200/10 dark:bg-indigo-900/10 blur-[120px]" />
      <div className="absolute -bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-pink-200/10 dark:bg-pink-900/10 blur-[120px]" />
      {!isMobile && (
        <>
          <div className="hidden md:block absolute top-[15%] left-[20%] w-[20%] h-[20%] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[80px] animate-pulse-slow" />
          <div className="hidden md:block absolute top-[60%] right-[15%] w-[25%] h-[25%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] animate-pulse-slower" />
          <div className="hidden md:block absolute bottom-[25%] left-[30%] w-[15%] h-[15%] rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-[60px] animate-pulse-slow" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/5 to-transparent dark:via-indigo-900/5" />
    </div>
  );
}


