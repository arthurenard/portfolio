"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { workExperience, volunteerExperience } from "@/data/experience";
import { formatDateToYear } from "@/lib/utils";

// Define the Experience component props
interface ExperienceProps {
  isStandalonePage?: boolean;
}

export default function Experience({ isStandalonePage = false }: ExperienceProps) {
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

  // Skip animations on mobile or standalone page for better performance
  const shouldAnimate = !isMobile && !isStandalonePage;

  return (
    <section 
      id="experience" 
      ref={ref}
      className={`py-16 ${isStandalonePage ? "" : "min-h-screen"} relative overflow-hidden`}
    >
      {!isStandalonePage && (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            My professional journey and academic background.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Work Experience */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5 } : undefined}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Work Experience
          </h3>
          
          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
                transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : undefined}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                      {exp.position}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                      {formatDateToYear(exp.years)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        
        {/* Volunteer Experience */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.4 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Volunteer Experience
          </h3>
          
          <div className="space-y-8">
            {volunteerExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
                transition={shouldAnimate ? { duration: 0.5, delay: 0.4 + index * 0.1 } : undefined}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                      {exp.position}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                      {formatDateToYear(exp.years)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {exp.description}
                  </p>
                  
                  {/* Links if available */}
                  {exp.links && exp.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {exp.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                        >
                          {link.label}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
