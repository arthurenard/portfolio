"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/skills";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref} id="about">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center mouse-gradient-text"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 rounded-lg border border-teal-100 dark:border-teal-800/30"
            >
              <h3 className="font-semibold mb-1 text-teal-700 dark:text-teal-400">
                Mathematical Reasoning
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-driven Mathematics
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-100 dark:border-blue-800/30"
            >
              <h3 className="font-semibold mb-1 text-blue-700 dark:text-blue-400">
                LLM Research
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Security & Optimization
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg border border-orange-100 dark:border-orange-800/30"
            >
              <h3 className="font-semibold mb-1 text-orange-700 dark:text-orange-400">
                Web Development
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full Stack Applications
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I am an applied mathematics engineer and Research Assistant at
                EPFL, specializing in Deep Learning and AI-driven Mathematical
                Reasoning. My work focuses on developing innovative solutions to
                complex problems, including advancing the security of large
                language models and pushing the boundaries of mathematical
                problem-solving with AI.{" "}
              </p>{" "}
              <p className="text-lg text-gray-600 dark:text-gray-300">
                With a solid foundation in Machine Learning and a passion for
                cutting-edge research, I am eager to bring my analytical skills
                and research expertise to impactful projects in industry or
                academia. I aim to contribute to transformative advancements in
                AI, solving real-world challenges through rigorous, creative
                approaches.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Last but not least: Avid learner. Multi-cultural and
                international exposure. Fun to work with.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20 rounded-3xl blur-2xl" />
              <motion.div
                className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-bold mb-6 text-xl">Technical Expertise</h3>
                <div className="grid grid-cols-2 gap-6">
                  {skills.map((skillGroup, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 font-medium">
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
