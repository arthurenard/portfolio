"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { navigationItems } from "@/data/navigation";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Track scroll position to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the current path matches the navigation item
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== "/" || isOpen
          ? "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - always visible on pages, only visible when scrolled on homepage or mobile menu is open */}
          <Link
            href="/"
            className={`transition-all duration-300 ${
              scrolled || pathname !== "/" || isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <span className="inline-block transition-transform hover:scale-110">
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <span className="inline-flex items-center justify-center transition-transform hover:scale-110">
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gray-300 hover:text-indigo-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
                )}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <span className="inline-flex items-center justify-center transition-transform hover:scale-110">
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gray-300 hover:text-indigo-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
                )}
              </span>
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                isOpen || scrolled || pathname !== "/"
                  ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  : "text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
              aria-label="Toggle menu"
            >
              <span className="inline-block transition-transform hover:scale-110">
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
