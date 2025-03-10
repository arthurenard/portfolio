"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { workExperience, volunteerExperience } from "@/data/experience";

// Define the Experience component props
interface ExperienceProps {
  isStandalonePage?: boolean;
}

export default function Experience({ isStandalonePage = false }: ExperienceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
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

  // Use the professional and volunteer experiences directly from the data files
  const professionalExperiences = workExperience;
  const volunteerExperiences = volunteerExperience;

  return (
    <section
      id="experience"
      ref={ref}
      className={`py-16 ${isStandalonePage ? "" : "min-h-screen"}`}
    >
      {!isStandalonePage && (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            My professional journey and volunteer work.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Professional Experience */}
        <motion.div
          className="mb-20"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Professional Experience
          </h3>
          
          <div className="space-y-8">
            {professionalExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
                transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : undefined}
                className="relative pl-6 border-l border-indigo-200 dark:border-indigo-800"
              >
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <h4 className="font-medium text-lg text-gray-800 dark:text-white">{exp.position}</h4>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.years}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Volunteer Experience */}
        <motion.div
          className="mb-10"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.2 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Volunteer Experience
          </h3>
          
          <div className="space-y-8">
            {volunteerExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
                transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 + 0.2 } : undefined}
                className="relative pl-6 border-l border-purple-200 dark:border-purple-800"
              >
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400" />
                <h4 className="font-medium text-lg text-gray-800 dark:text-white">{exp.position}</h4>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.years}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
