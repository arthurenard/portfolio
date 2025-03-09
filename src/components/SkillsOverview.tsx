"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skills } from "@/data/skills";

export default function SkillsOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Get only the first 3 skill categories
  const featuredSkills = skills.slice(0, 3);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decorative elements - only on desktop */}
      {!isMobile && (
        <>
          <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          animate={isMobile ? { opacity: 1 } : isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mouse-gradient-text inline-block">
            Core Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technical expertise and professional competencies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {featuredSkills.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
            >
              {/* Colored top bar - different color for each card */}
              <div className={`h-2 ${
                index === 0 
                  ? "bg-indigo-500" 
                  : index === 1 
                  ? "bg-purple-500" 
                  : "bg-pink-500"
              }`}></div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${
                    index === 0 
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                      : index === 1 
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" 
                      : "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  } flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {category.category}
                  </h3>
                </div>

                <ul className="space-y-2 mb-4">
                  {category.items.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        index === 0 
                          ? "bg-indigo-500 dark:bg-indigo-400" 
                          : index === 1 
                          ? "bg-purple-500 dark:bg-purple-400" 
                          : "bg-pink-500 dark:bg-pink-400"
                      }`}></div>
                      <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/about"
            className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">
              View All Skills
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 