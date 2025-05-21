// src/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import webDesign from "@/assets/web-design-dev.webp";
import digitalTransformation from "@/assets/digital-transformation.webp";
import ai from "@/assets/ai.png";
import digitalMarketing from "@/assets/digitalMarketing.jpg";
import it from "@/assets/it.webp";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
const staggerItem = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const tapScale = { scale: 0.95 };

// Service definitions
const services = [
  {
    title: "Web Design & Development",
    description:
      "Creating stunning, user-friendly websites tailored to your brand.",
  },
  {
    title: "Digital Transformation",
    description:
      "Guiding your business through modernization and process optimization.",
  },
  {
    title: "AI & Data Solutions",
    description:
      "Leveraging AI and data for smarter decisions and enhanced security.",
  },
  {
    title: "Digital Marketing",
    description:
      "Boosting your online presence through SEO, social media, and campaigns.",
  },
  {
    title: "IT Consulting & Strategy",
    description: "Providing expert guidance for your technology roadmap.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 dark:text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Our{" "}
          <span className="text-indigo-600 dark:text-indigo-400">Services</span>
        </motion.h2>

        {/* Custom masonry grid layout */}
        <motion.div
          className="grid grid-cols-3 grid-rows-3 gap-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Square 1 (row1,col1) */}
          <motion.div
            className="relative row-span-1 col-span-1 bg-white dark:transparent rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={staggerItem}
            whileTap={tapScale}
          >
            <img
              src={webDesign.src}
              alt={services[0].title}
              className="w-full object-scale-down"
            />
    <div className="absolute bottom-0 left-0 h-1/2w-full bg-white bg-opacity-75 p-4 text-center">
              <h1 className="font-semibold text-2xl text-indigo-600 dark:text-gray-900">
                {services[0].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-700 mt-2">
                {services[0].description}
              </p>
            </div>
          </motion.div>

          {/* Square 2 (row1,col2) */}
          <motion.div
            className="relative row-span-1 col-span-1 bg-white dark:transparent rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={staggerItem}
            whileTap={tapScale}
          >
            <img
              src={digitalTransformation.src}
              alt={services[1].title}
              className="w-full object-scale-down"
            />
             <div className="absolute bottom-0 left-0 h-1/2w-full bg-white bg-opacity-75 p-4 text-center">
              <h1 className="font-semibold text-2xl text-indigo-600 dark:text-gray-900">
                {services[1].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-700 mt-2">
                {services[1].description}
              </p>
            </div>
            
          </motion.div>

          {/* Tall Rectangle (row1-2,col3) */}
          <motion.div
            className="relative row-span-2 col-span-1 bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={staggerItem}
            whileTap={tapScale}
          >
            <img
              src={ai.src}
              alt={services[2].title}
              className="w-full h-full object-scale-down"
            />
             <div className="absolute bottom-0 left-0 h-1/2w-full bg-white bg-opacity-75 p-4 text-center">
              <h1 className="font-semibold text-2xl text-indigo-600 dark:text-gray-900">
                {services[2].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-700 mt-2">
                {services[2].description}
              </p>
            </div>
          </motion.div>

          {/* Wide Rectangle (row2,col1-2) */}
          <motion.div
            className="relative row-span-1 col-span-2 asp bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={staggerItem}
            whileTap={tapScale}
          >
            <img
              src={digitalMarketing.src}
              alt={services[3].title}
              className="w-full h-full object-scale-down max-h-96"
            />
            <div className="absolute w-full bottom-0 left-0 h-1/2w-full bg-white bg-opacity-75 p-4 text-center">
              <h1 className="font-semibold text-2xl text-indigo-600 dark:text-gray-900">
                {services[3].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-700 mt-2">
                {services[3].description}
              </p>
            </div>
          </motion.div>

          {/* Square 3 (row3,col1) */}
          <motion.div
            className="relative row-span-1 col-span-1 bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={staggerItem}
            whileTap={tapScale}
          >
            <img
              src={it.src}
              alt={services[4].title}
              className="w-full h-full object-scale-down"
            />
            <div className="absolute bottom-0 left-0 h-1/2w-full bg-white bg-opacity-75 p-4 text-center">
              <h1 className="font-semibold text-2xl text-indigo-600 dark:text-gray-900">
                {services[4].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-700 mt-2">
                {services[4].description}
              </p>
            </div>
          </motion.div>

          {/* CTA Rectangle (row3,col2-3) */}
          <motion.div
            className="relative row-span-1 col-span-2 bg-indigo-600 rounded-xl p-8 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Need help customizing your template? Hire us!
              </h3>
              <a
                href="mailto:hello@yourcompany.com"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-indigo-600 font-semibold px-6 py-3 rounded-full transition-colors duration-200"
              >
                Send us a message
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
