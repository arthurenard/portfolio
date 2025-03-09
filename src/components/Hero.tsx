"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const profileScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  
  // Additional transforms for parallax elements
  const parallaxY1 = useTransform(scrollY, [0, 500], [0, -50]);
  const parallaxY2 = useTransform(scrollY, [0, 500], [0, -30]);
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Parallax background elements - only on desktop */}
      {!isMobile && (
        <>
          <motion.div
            style={{ y: parallaxY1 }}
            className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 blur-3xl"
          />
          <motion.div
            style={{ y: parallaxY2 }}
            className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 blur-3xl"
          />
        </>
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className="container px-4 mx-auto relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Profile Image with enhanced styling */}
          <motion.div 
            style={{ scale: profileScale }} 
            className="mb-8 relative"
            variants={itemVariants}
          >
            <div className="w-40 h-40 md:w-64 md:h-64 relative">
              {/* Animated glow effect */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-400/30 dark:to-purple-400/30 rounded-full blur-xl"
              />
              
              {/* Profile image */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/30 dark:border-gray-700/30 shadow-xl">
                <Image
                  src="/sticker-smile.webp"
                  alt="Arthur Renard"
                  fill
                  className="object-cover rounded-full relative z-10"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Name with enhanced typography */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold pb-4 mouse-gradient-text tracking-tight">
              Arthur Renard
            </h1>
            {/* Subtle underline */}
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto opacity-70"></div>
          </motion.div>

          {/* Professional title with enhanced styling */}
          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-4"
          >
            Applied Mathematician & AI Researcher
          </motion.h2>

          {/* Professional introduction */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed"
          >
            Exploring the frontiers of AI with expertise in mathematical reasoning and large language models. 
            Currently researching at <span className="text-indigo-600 dark:text-indigo-400 font-medium">EPFL</span> under Prof. C. Hongler.
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4"
          >
            <motion.a
              href="/projects"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 dark:shadow-indigo-700/20 hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-700/30 transition-all duration-300 font-medium"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="/contact"
              className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </motion.div>

      {/* Enhanced gradient fade at bottom */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
