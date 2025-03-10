"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { skills } from "@/data/skills";
import { education } from "@/data/experience";
import { personalInfo, certifications } from "@/data/contact";
import { aboutData } from "@/data/about";
import Image from "next/image";

// Define the About component props
interface AboutProps {
  isStandalonePage?: boolean;
}

export default function About({ isStandalonePage = false }: AboutProps) {
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
      className={`py-16 ${isStandalonePage ? "" : "min-h-screen"} relative overflow-hidden`} 
      ref={ref} 
      id="about"
    >
      {!isStandalonePage && (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {aboutData.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            {aboutData.description}
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5 } : undefined}
        >
          {/* About Text */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              {aboutData.subtitle}
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                {personalInfo.summary}
              </p>
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <Image
                src={aboutData.profileImage.src}
                alt={aboutData.profileImage.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          className="mt-20"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.2 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            {aboutData.educationTitle}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education Timeline */}
            <div className="relative flex items-center overflow-visible">
              <div className="absolute inset-[10%] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20 rounded-[30px] blur-xl" />
              <motion.div
                className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-bold mb-6 text-xl text-gray-800 dark:text-white">{aboutData.educationSectionTitle}</h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                      animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
                      transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : undefined}
                      className="relative pl-6 border-l border-indigo-200 dark:border-indigo-800"
                    >
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                      <h4 className="font-medium text-lg text-gray-800 dark:text-white">{edu.degree}</h4>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>{edu.institution}</span>
                        <span>{edu.years}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Skills */}
            <div className="relative flex items-center overflow-visible">
              <div className="absolute inset-[10%] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20 rounded-[30px] blur-xl" />
              <motion.div
                className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-bold mb-6 text-xl text-gray-800 dark:text-white">{aboutData.technicalExpertiseTitle}</h3>
                
                {/* Languages Section - Highlighted separately */}
                <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-4 flex items-center">
                    <div className="text-indigo-600 dark:text-indigo-400 mr-2">
                      {skills.find(s => s.category === "Languages")?.icon}
                    </div>
                    {aboutData.languagesTitle}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.find(s => s.category === "Languages")?.items.map((language, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-center"
                      >
                        <div className="font-medium text-gray-800 dark:text-white">{language.split('(')[0].trim()}</div>
                        {language.includes('(') && (
                          <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                            {language.split('(')[1].replace(')', '')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Other Technical Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.filter(skill => skill.category !== "Languages").map((skillGroup, index) => (
                    <motion.div
                      key={index}
                      initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
                      animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
                      transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : undefined}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 font-medium text-gray-800 dark:text-white">
                        <div className="text-indigo-600 dark:text-indigo-400">
                          {skillGroup.icon}
                        </div>
                        <h4>{skillGroup.category}</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {skillGroup.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-indigo-500 dark:bg-indigo-400 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                
                {/* Certifications */}
                {certifications.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-4">{aboutData.certificationsTitle}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="text-indigo-600 dark:text-indigo-400">
                            {cert.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">{cert.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{cert.level} ({cert.year})</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
