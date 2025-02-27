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
        className="container mx-auto px-4 max-w-4xl relative z-10"
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
            Let&apos;s discuss your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.label}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all backdrop-blur-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all backdrop-blur-sm"
                  placeholder="Your message"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
