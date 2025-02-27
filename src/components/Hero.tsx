"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const profileScale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <motion.div
        style={{ y, opacity, scale }}
        className="container px-4 mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* Profile Image Container */}
          <motion.div style={{ scale: profileScale }} className="mb-8 relative">
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20 rounded-full blur-xl" />
              <Image
                src="/sticker-smile.webp"
                alt="Arthur Renard"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-full relative z-10"
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold pb-8 mouse-gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Arthur Renard
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Innovative mathematician exploring the frontiers of AI,
            <br />
            specializing in mathematical reasoning and LLMs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-8 text-lg"
          >
            <motion.a
              href="#projects"
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gray-900 dark:text-white relative z-10">
                View Projects
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
            </motion.a>
            <motion.a
              href="#contact"
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gray-900 dark:text-white relative z-10">
                Get in Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Remove the hard edge by using a more subtle gradient */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-background/30 via-background/10 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
