"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // If there's no hash in the URL, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
