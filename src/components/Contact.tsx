"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { contactInfo } from "@/data/contact";

export default function Contact() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.5, 0.8], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 max-w-3xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mouse-gradient-text">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Feel free to reach out
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
        >
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  {item.icon}
                </div>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-lg"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300 text-lg">
                    {item.label}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
