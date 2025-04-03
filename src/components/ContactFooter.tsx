"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { contactInfo } from "@/data/contact";

export default function ContactFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  return (
    <section ref={ref} className="py-16 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mouse-gradient-text inline-block">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {contactInfo.map((item, index) => {
            // More explicit check for email href
            let isEmail = false;
            let email = '';
            if (typeof item.href === 'string' && item.href.startsWith('mailto:')) {
              isEmail = true;
              email = item.href.substring(7); // Remove 'mailto:'
            }

            if (isEmail) {
              // We know email is a non-empty string here
              return (
                <button
                  key={index}
                  onClick={() => copyToClipboard(email)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 dark:text-gray-200 relative"
                >
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  <span className="ml-1 text-gray-500">
                    {copiedEmail === email ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </span>
                  
                  {/* Copied notification */}
                  <AnimatePresence>
                    {copiedEmail === email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: -30 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md"
                      >
                        Copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            }
            
            // Handle non-email items normally
            return item.href ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 dark:text-gray-200"
              >
                <span className="text-indigo-600 dark:text-indigo-400">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ) : (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-800 dark:text-gray-200"
              >
                <span className="text-indigo-600 dark:text-indigo-400">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="font-medium">Contact Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 