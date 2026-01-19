"use client";

import BackgroundBlobs from "@/components/BackgroundBlobs";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";

export default function PageDecorations() {
  return (
    <>
      <ScrollRestoration />
      <div className="hidden md:block">
        <MouseGradient />
      </div>
      <BackgroundBlobs />
    </>
  );
}
