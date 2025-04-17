// src/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Twitter, Instagram, Facebook } from 'lucide-react';

// Fade-in variant
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

// Stagger container variant
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// Item variant for staggering
const staggerItemAppear = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Hover / tap scales
const hoverScale = { scale: 1.05, transition: { type: 'spring', stiffness: 300 } };
const tapScale = { scale: 0.95 };

const Contact = () => (
  <section
    id="contact"
    className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800"
  >
    <div className="container mx-auto px-6">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 dark:text-gray-100 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        Talk to <span className="text-indigo-600 dark:text-indigo-400">Us!</span>
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Address */}
        <motion.div
          variants={staggerItemAppear}
          className="flex flex-col items-center"
        >
          <MapPin className="w-8 h-8 mb-3 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
            Address
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            123 Anywhere St., Any City
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Caldwell, NJ, USA
          </p>
        </motion.div>

        {/* Phone */}
        <motion.div
          variants={staggerItemAppear}
          className="flex flex-col items-center"
        >
          <Phone className="w-8 h-8 mb-3 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
            Phone
          </h3>
          <a
            href="tel:+995577543353"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            +995 577 54 33 53
          </a>
        </motion.div>

        {/* Email */}
        <motion.div
          variants={staggerItemAppear}
          className="flex flex-col items-center"
        >
          <Mail className="w-8 h-8 mb-3 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
            Email
          </h3>
          <a
            href="mailto:hello@reallygreatsite.com"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            hello@reallygreatsite.com
          </a>
        </motion.div>
      </motion.div>

      {/* Social Media Links */}
      <motion.div
        className="flex justify-center gap-6 mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {[Twitter, Instagram, Facebook].map((Icon, idx) => (
          <motion.a
            key={idx}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={hoverScale}
            whileTap={tapScale}
          >
            <Icon className="w-7 h-7 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Contact;
