"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { education, workExperience } from "@/data/experience";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4 max-w-5xl relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center mouse-gradient-text"
        >
          Experience & Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-6 border-l border-indigo-200 dark:border-indigo-800"
                >
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <h4 className="font-medium text-lg">{item.degree}</h4>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>{item.institution}</span>
                    <span>{item.years}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-semibold">Experience</h3>
            </div>
            <div className="space-y-8">
              {workExperience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-6 border-l border-purple-200 dark:border-purple-800"
                >
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400" />
                  <h4 className="font-medium text-lg">{item.position}</h4>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>{item.company}</span>
                    <span>{item.years}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
