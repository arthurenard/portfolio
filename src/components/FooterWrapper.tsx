"use client";
import { usePathname } from "next/navigation";
import ContactFooter from "@/components/ContactFooter";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Don't show footer on contact page
  if (pathname === "/contact") {
    return null;
  }
  
  return <ContactFooter />;
} 