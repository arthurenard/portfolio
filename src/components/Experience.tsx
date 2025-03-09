"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { education, workExperience } from "@/data/experience";

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
            My professional journey and educational background.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          className="space-y-12"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5 } : undefined}
        >
          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
              <Briefcase className="mr-3 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              Work Experience
            </h3>
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 className="text-xl font-medium text-gray-800 dark:text-white">
                      {job.position}
                    </h4>
                    <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                      {job.years}
                    </span>
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-3">
                    {job.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
              <GraduationCap className="mr-3 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 className="text-xl font-medium text-gray-800 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                      {edu.years}
                    </span>
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-3">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
