"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { skills } from "@/data/skills";
import { education } from "@/data/experience";
import Image from "next/image";
import { GraduationCap } from "lucide-react";

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
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Learn about my background, education, and skills.
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
              Applied Mathematician & AI Researcher
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I&apos;m an innovative applied mathematician and research assistant exploring the frontiers of AI, with expertise in mathematical reasoning and large language models. Currently, I&apos;m working at EPFL&apos;s Chair of Statistical Field Theory under Prof. C. Hongler, investigating the capabilities of Transformers in mathematical reasoning.
              </p>
              <p>
                My academic journey has taken me through EPFL for my Bachelor&apos;s in Mathematics, ETH Zürich for my Master&apos;s in Applied Mathematics, and included an exchange year at KTH Royal Institute of Technology in Stockholm.
              </p>
              <p>
                I&apos;m passionate about cutting-edge research and contributing to transformative advancements in AI. My work includes developing discrete optimization methods in embedding space to minimize cross-entropy loss and exploring their effects on the security and inference processes of LLMs.
              </p>
              <p>
                I&apos;m also proud to have co-authored the &apos;Phase Transition Finder&apos; algorithm to uncover complex behaviors in artificial life, which doubled Lenia&apos;s discovery rate of interesting dynamics in high-dimensional systems.
              </p>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Arthur Renard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20" />
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
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-800 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                      {edu.years}
                    </span>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mt-20"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.4 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Skills & Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <h4 className="text-xl font-medium mb-4 text-gray-800 dark:text-white flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.category}</span>
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div
          className="mt-20"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.6 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Languages
          </h3>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-800 dark:text-white mb-1">French</div>
                <div className="text-indigo-600 dark:text-indigo-400">Native</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-800 dark:text-white mb-1">English</div>
                <div className="text-indigo-600 dark:text-indigo-400">C1 (Cambridge)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-800 dark:text-white mb-1">German</div>
                <div className="text-indigo-600 dark:text-indigo-400">Intermediate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-800 dark:text-white mb-1">Dutch</div>
                <div className="text-indigo-600 dark:text-indigo-400">Basic</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
