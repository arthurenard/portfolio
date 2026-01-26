"use client";

import React, { useEffect, useState, useRef } from "react";

type TocItem = {
  id: string;
  label: string;
};

type BlogTocProps = {
  items: TocItem[];
  variant: "inline" | "aside";
};

type TocViewProps = {
  items: TocItem[];
  activeId: string;
  onLinkClick: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
};

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const useActiveToc = (items: TocItem[]) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const isManualScroll = useRef(false);

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updating active state if we are currently scrolling to a target
        if (isManualScroll.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const target = visible[0].target as HTMLElement;
          setActiveId(target.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && items.some((item) => item.id === hash)) {
      setActiveId(hash);
    }
  }, [items]);

  return { activeId, setActiveId, isManualScroll };
};

const DesktopToc = ({ items, activeId, onLinkClick }: TocViewProps) => (
  <aside className="hidden lg:block">
    <div className="sticky top-28">
      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
        On this page
      </p>
      <ul className="mt-4 space-y-3 border-l border-gray-200 dark:border-gray-700 pl-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => onLinkClick(event, item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`block text-sm transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </aside>
);

const MobileToc = ({ items, activeId, onLinkClick }: TocViewProps) => (
  <nav className="mb-10 lg:hidden">
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => onLinkClick(event, item.id)}
            aria-current={isActive ? "true" : undefined}
            className={`inline-flex items-center px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
              isActive
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <span className="text-gray-400 dark:text-gray-500 mr-1.5 text-xs">{index + 1}.</span>
            {item.label}
          </a>
        );
      })}
    </div>
  </nav>
);

export default function BlogToc({ items, variant }: BlogTocProps) {
  const { activeId, setActiveId, isManualScroll } = useActiveToc(items);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isModifiedClick(event)) {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // Lock the observer to prevent flickering active state during scroll
    isManualScroll.current = true;
    
    // Immediately update UI
    setActiveId(id);
    window.history.pushState(null, "", `#${id}`);

    // Smooth scroll
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Unlock observer after animation (approx 1s is usually enough for smooth scroll)
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  if (variant === "aside") {
    return <DesktopToc items={items} activeId={activeId} onLinkClick={handleClick} />;
  }

  return <MobileToc items={items} activeId={activeId} onLinkClick={handleClick} />;
}
