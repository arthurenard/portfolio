"use client";

import { useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export default function CopyEmailButton({
  email,
  className = "",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={copyEmail}
        className={className}
        aria-label={`Copy ${email} to clipboard`}
      >
        {email}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap text-muted-foreground transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        copied to clipboard
      </span>
    </span>
  );
}
