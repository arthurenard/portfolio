"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { workExperience } from "@/data/experience";

export default function ExperienceSnapshot() {
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

  // Get only the Researcher experience
  const researcherExperience = workExperience[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
      {/* Background decorative elements - only on desktop */}
      {!isMobile && (
        <>
          <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl" />
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
            Experience Highlight
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Current research position
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Researcher Experience Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {researcherExperience.position}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-lg">
                    {researcherExperience.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-md font-medium">
                    {researcherExperience.years}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                {researcherExperience.description}
              </p>

              {/* Key Achievements */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Key Publications & Projects
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Boolformer:</span> End-to-end symbolic regression for Boolean functions 
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Phase Transition Finder:</span> Published at GECCO 2024, doubling discovery rate in Lenia
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Symbolic Math Solver:</span> International Mathematical Olympiad problems solver powered by AI
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">LLM Security:</span> Exploring optimization methods in embedding space for enhanced inference
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* View Full Experience Button */}
              <div className="flex justify-center mt-8">
                <Link
                  href="/experience"
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="font-medium">View Full Experience</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 