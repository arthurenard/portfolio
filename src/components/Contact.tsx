"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { contactInfo } from "@/data/contact";
import { useRef, useState, useEffect } from "react";

// Define the Contact component props
interface ContactProps {
  isStandalonePage?: boolean;
}

export default function Contact({ isStandalonePage = false }: ContactProps) {
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
      id="contact" 
      ref={ref}
      className={`py-16 ${isStandalonePage ? "" : "min-h-screen"} relative overflow-hidden`}
    >
      {!isStandalonePage && (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Contact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Get in touch with me and connect on professional networks.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
          transition={shouldAnimate ? { duration: 0.5 } : undefined}
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Let&apos;s Connect
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactInfo.map((item, index) => (
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="mr-4 text-indigo-600 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {item.label}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg"
                >
                  <div className="mr-4 text-indigo-600 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {item.label}
                    </h4>
                  </div>
                </div>
              )
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
