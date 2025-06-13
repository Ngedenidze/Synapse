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
  const blobTopY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blobBottomY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900 px-6 py-32"
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

      {/* Parallax blobs */}
      <motion.div
        aria-hidden
        style={{ y: blobTopY }}
        className="absolute left-0 top-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-purple-200/50 blur-3xl dark:bg-purple-900/30"
      />
      <motion.div
        aria-hidden
        style={{ y: blobBottomY }}
        className="absolute bottom-0 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-900/30"
      />

      {/* Main content */}
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-last lg:order-first"
        >
          <img
            src={webImg.src}
            alt="Digital services illustration"
            className="mx-auto max-w-lg rounded-2xl object-cover shadow-2xl min-[1600px]:max-w-2xl min-[2000px]:max-w-4xl"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          className="flex max-w-2xl font-azonix text-white flex-col justify-center text-center lg:text-left px-8 py-2"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold leading-tight text-gray-800 dark:text-gray-200 md:text-6xl"
          >
            We Build Digital Experiences to Help&nbsp;
            <span className="relative block h-28 text-purple-600 dark:text-purple-400 md:inline-block md:h-auto">
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
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-2xl lg:mx-0"
          >
            Your one‑stop partner for custom web design, data‑driven insights, and
            agile digital transformation that drives real results.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap justify-center gap-6 lg:justify-start"
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
