'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Image assets – swap with optimised <Image> when ready
import bankingImg from '@/assets/it.webp';
import aiImg from '@/assets/ai.png';
import dtImg from '@/assets/digital-transformation.webp';
import ecommerceImg from '@/assets/web-design-dev.webp';

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------
const slides = [
  {
    title: 'Banking Sector',
    description:
      'Designed secure, user‑friendly platforms that boosted engagement and streamlined banking operations.',
    image: bankingImg.src,
  },
  {
    title: 'AI Solutions',
    description:
      'Implemented intelligent systems that automate workflows, surface insights, and keep your data safe.',
    image: aiImg.src,
  },
  {
    title: 'Digital Transformation',
    description:
      'Guided companies through end‑to‑end modernisation—upgrading legacy systems, optimising processes, and driving efficiency.',
    image: dtImg.src,
  },
  {
    title: 'E‑Commerce',
    description:
      'Built high‑converting online stores with seamless checkout flows, personalised experiences, and mobile‑first design.',
    image: ecommerceImg.src,
  },
] as const;

// -----------------------------------------------------------------------------
// ANIMATION VARIANTS
// -----------------------------------------------------------------------------
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
export default function Experience() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => [
        (prev + newDirection + slides.length) % slides.length,
        newDirection,
      ]);
    },
    [],
  );

  const { title, description, image } = slides[page];

  return (
    <section
      id="experience"
      className="h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-teal-50 py-24 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900"
    >
      {/* Carousel */}
       <div className="absolute font-azonix text-center top-24 text-white font-bold text-5xl sm:text-7xl leading-tight bg-black/50 bg-opacity-80 px-4 py-2 select-none pointer-events-none">
        INDUSTRIES<br /> <span className="text-purple-600 dark:text-purple-400">WE TRANSFORM</span>
      </div>
      <div className="relative w-full max-w-6xl px-6 md:px-12 lg:px-20">
        {/* Slides container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-sm dark:bg-black/35 backdrop-blur-lg shadow-white/5">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.7 }}
              className="absolute inset-0 grid grid-cols-1 items-center gap-12 p-6 md:grid-cols-2 md:p-16 lg:p-20"
            >
              {/* Text */}
              <div className="order-last max-w-lg md:order-first">
                <h2 className="mb-4 font-azonix text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <p className="font-azonix text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl">
                  {description}
                </p>
              </div>

              {/* Image */}
              <img
                src={image}
                alt={title}
                className="h-full w-full rounded-2xl object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:scale-110 dark:bg-gray-800"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:scale-110 dark:bg-gray-800"
        >
          <ChevronRight className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-12 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === page
                ? 'scale-125 bg-indigo-500 shadow-lg dark:bg-indigo-300'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
