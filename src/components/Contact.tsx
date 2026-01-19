"use client";
import { motion, useInView } from "framer-motion";
import { contactInfo } from "@/data/contact";
import { useRef } from "react";
import ContactForm from "./ContactForm";
import { useIsMobile } from "@/lib/useIsMobile";
import SectionHeader from "@/components/SectionHeader";

// Define the Contact component props
interface ContactProps {
  isStandalonePage?: boolean;
}

export default function Contact({ isStandalonePage = false }: ContactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isMobile = useIsMobile();

  // Skip animations on mobile or standalone page for better performance
  const shouldAnimate = !isMobile && !isStandalonePage;

  return (
    <section 
      id="contact" 
      ref={ref}
      className={`py-16 ${isStandalonePage ? "" : "min-h-screen"} relative overflow-hidden`}
    >
      {!isStandalonePage && (
        <SectionHeader
          title="Contact"
          description="Get in touch with me and connect on professional networks."
        />
      )}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
            animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
            transition={shouldAnimate ? { duration: 0.5 } : undefined}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
              <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Connect With Me
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {item.label}
                        </h4>
                        {item.href && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                          >
                            {item.href.startsWith("mailto:") ? item.href.replace("mailto:", "") : "Visit Link"}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* <div className="mt-10">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                    Availability
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {personalInfo.availability}
                  </p>
                </div> */}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
            animate={shouldAnimate ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
            transition={shouldAnimate ? { duration: 0.5, delay: 0.2 } : undefined}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
