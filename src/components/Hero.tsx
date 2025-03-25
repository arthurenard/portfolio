"use client";
import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/personal";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [100, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  // const profileScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  
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

  // Animation variants - speed up animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
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

      <div className="container px-4 mx-auto relative z-10">
        {/* Content affected by scroll animations */}
        <motion.div
          style={{ y, opacity, scale }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Profile Image with enhanced styling */}
            {/* <motion.div 
              style={{ scale: profileScale }} 
              className="mb-8 relative"
              variants={itemVariants}
            >
              <div className="w-40 h-40 md:w-64 md:h-64 relative">
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
                
                <Image
                  src="/sticker-smile.webp"
                  alt="Arthur Renard"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover relative z-10"
                  priority
                />
              </div>
            </motion.div> */}

            {/* Name with enhanced typography */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl font-bold pb-4 mouse-gradient-text tracking-tight">
                {personalInfo.name}
              </h1>
              {/* Subtle underline */}
              <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto opacity-70"></div>
            </motion.div>

            {/* Professional title with enhanced styling */}
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-4"
            >
              {personalInfo.title}
            </motion.h2>

            {/* Professional introduction */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
            >
              {personalInfo.description}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed"
            >
              {personalInfo.currentPosition}{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                {personalInfo.institution}
              </span>{" "}
              {personalInfo.professor}{" "}
              {personalInfo.education}{" "}
              <span className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                {personalInfo.university}
              </span>{" "}
              {personalInfo.degree}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md mx-auto"
            >
              <motion.a
                href={personalInfo.links.projects}
                className="w-full sm:w-auto sm:flex-1 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 dark:shadow-indigo-700/20 hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-700/30 transition-all duration-300 font-medium text-center"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href={personalInfo.links.contact}
                className="w-full sm:w-auto sm:flex-1 px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-center"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
