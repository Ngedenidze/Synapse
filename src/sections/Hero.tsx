// src/sections/Hero.tsx
'use client';

import { Mail, ArrowRight } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useAnimation,
  Variants,
} from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import webImg from '@/assets/web-design.jpg';

// --- Re‑usable animation variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const strips = [
  { height: '8%', topOffset: '0%' },
  { height: '10%', topOffset: '8%' },
  { height: '12%', topOffset: '18%' },
  { height: '10%', topOffset: '30%' },
  { height: '15%', topOffset: '40%' },
  { height: '20%', topOffset: '55%' },
  { height: '15%', topOffset: '75%' },
  { height: '10%', topOffset: '90%' },
] as const;

const stripVariants: Variants = {
  hidden: { height: '0%', opacity: 0 },
  visible: (i: number) => ({
    height: strips[i].height,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.8, ease: 'easeOut' },
  }),
};

const staggerContainer: Variants = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const words = ['Accelerate', 'Optimize', 'Thrive'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  // Reveal once section scrolls into view
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (sectionInView) controls.start('visible');
  }, [sectionInView, controls]);

  // Word carousel
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((prev) => (prev + 1) % words.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  const wordVariants: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { ease: 'easeInOut' } },
    exit: { opacity: 0, y: 20, transition: { ease: 'easeInOut' } },
  };

  // Subtle parallax blobs
  const { scrollYProgress } = useScroll();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center min-h-screen overflow-visible bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900 px-6 py-32"
    >
      {/* Animated stripes */}
      {strips.map((strip, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute left-0 right-0 -z-20 bg-gradient-to-r from-purple-500/40 to-indigo-500/40"
          custom={i}
          initial="hidden"
          animate={controls}
          variants={stripVariants}
          style={{ top: strip.topOffset }}
        />
      ))}


      {/* Main content */}
     <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
  {/* Image */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="order-last lg:order-first flex justify-center lg:justify-end"
  >
    <img
      src={webImg.src}
      alt="Digital services illustration"
      className="
        w-full max-w-sm sm:max-w-md lg:max-w-lg
        aspect-[4/3] object-cover
        rounded-2xl shadow-2xl
      "
    />
  </motion.div>

  {/* Text */}
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate={sectionInView ? 'visible' : 'hidden'}
    className="flex flex-col justify-center px-4 text-center lg:text-left"
  >
    <motion.h1
      variants={fadeInUp}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 dark:text-gray-200"
    >
      We Build Digital Experiences to Help
      <span className="relative block text-purple-600 dark:text-purple-400">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            variants={wordVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.h1>

    <motion.p
      variants={fadeInUp}
      className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 lg:mx-0"
    >
      Your one‑stop partner for custom web design, data‑driven insights, and agile digital transformation.
    </motion.p>

    <motion.div
      variants={fadeInUp}
      className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
    >
            <motion.a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg text-white shadow-md transition-all hover:bg-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch <Mail className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="#services"
              className="group flex items-center gap-2 rounded-full border border-gray-300 px-8 py-4 text-lg text-gray-800 transition-all hover:border-gray-400 dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
