"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";

export default function MouseGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip mouse tracking on mobile devices
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of viewport
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    // Set initial position to center of screen
    setMousePosition({ x: 0.5, y: 0.5 });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    // Skip gradient effect on mobile devices
    if (isMobile) return;

    // Convert mouse position to percentage values for CSS
    const xPercent = mousePosition.x * 100;
    const yPercent = mousePosition.y * 100;

    // Set the gradient position based on mouse position
    const gradientPosition = `at ${xPercent}% ${yPercent}%`;

    // Light theme colors - smaller blue circle and more intense colors
    if (theme === "light") {
      document.documentElement.style.setProperty(
        "--mouse-gradient",
        `radial-gradient(${gradientPosition}, rgba(79, 70, 229, 1) 0%, rgba(79, 70, 229, 0.9) 20%, rgba(147, 51, 234, 0.95) 40%, rgba(219, 39, 119, 1) 100%)`
      );
    }
    // Dark theme colors - smaller blue circle and more intense colors
    else {
      document.documentElement.style.setProperty(
        "--mouse-gradient",
        `radial-gradient(${gradientPosition}, rgba(129, 140, 248, 1) 0%, rgba(129, 140, 248, 0.9) 20%, rgba(167, 139, 250, 0.95) 40%, rgba(244, 114, 182, 1) 100%)`
      );
    }
  }, [mousePosition, theme, isMobile]);

  return null; // This component doesn't render anything
}
