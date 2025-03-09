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

  // Get only the first experience item
  const featuredExperience = workExperience[0];
  
  // Get a volunteer experience item
  const volunteerExperience = workExperience.find(exp => 
    exp.company === "Festival Balélec" || exp.company.includes("Balélec")
  ) || workExperience[2]; // Fallback to the third item if not found

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
            Experience Highlights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional and volunteer work
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Professional Role Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {featuredExperience.position}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">
                    {featuredExperience.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                    {featuredExperience.years}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {featuredExperience.description}
              </p>

              {/* Key Achievements */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Investigating the capabilities of Transformers in mathematical reasoning
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Preparing an ICML submission with Prof. E. Abbé and Dr. S. Bengio
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Volunteer Experience Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {volunteerExperience.position}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400">
                    {volunteerExperience.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm">
                    {volunteerExperience.years}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {volunteerExperience.description}
              </p>

              {/* Volunteer Highlights */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Volunteer Highlights
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 mt-2"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Designed and developed website and mobile app for Europe&apos;s largest student festival
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 mt-2"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Served over 15,000 participants with real-time event information
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* View Full Experience Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-6 col-span-1 md:col-span-2"
          >
            <Link
              href="/experience"
              className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                View Full Experience
              </span>
              <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 