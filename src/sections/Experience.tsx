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
export default function Experience() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const paginate = useCallback(
    (newDir: number) =>
      setPage(([prev]) => [
        (prev + newDir + slides.length) % slides.length,
        newDir,
      ]),
    []
  );

  const { title, description, image } = slides[page];

  return (
    <section
      id="experience"
      className="
        relative w-full min-h-screen flex flex-col items-center justify-center
        bg-gradient-to-br from-indigo-50 via-white to-teal-50
        py-12 sm:py-24
        dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900
      "
    >
      {/* Overlaid Title */}
      <div className="md:absolute top-16 sm:top-24 text-center px-4">
        <h2 className="font-azonix text-4xl sm:text-5xl font-bold text-white leading-tight">
          INDUSTRIES<br />
          <span className="text-purple-600 dark:text-purple-400">
            WE TRANSFORM
          </span>
        </h2>
      </div>

      <div className="relative w-full max-w-4xl px-4 sm:px-6 lg:px-8 sm:h-fit">
        {/* Slide Frame */}
       <div
          className="
            relative w-full overflow-hidden rounded-3xl
            bg-white/60 dark:bg-black/40 backdrop-blur-lg shadow-lg
           lg:aspect-video md:aspect-video sm:aspect-square
          "
        >
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="popLayout"
          >
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.7,
              }}
              className="
                absolute inset-0 flex flex-col-reverse md:flex-row items-center
                gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-16 lg:p-20
              "
            >
              {/* Image */}
              <div className="w-full md:w-1/2 h-48 sm:h-52 md:h-auto">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3
                  className="
                    mb-4 font-azonix  sm:text-xl md:text-4xl lg:text-4xl
                    font-bold text-gray-900 dark:text-white leading-tight
                  "
                >
                  {title}
                </h3>
                <p
                  className="
                    font-azonix text-base sm:text-base md:text-xl
                    text-gray-700 dark:text-gray-300 leading-relaxed
                  "
                >
                  {description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows (hidden on mobile) */}
        <button
          onClick={() => paginate(-1)}
          className="
            hidden md:flex absolute left-2 top-1/2 -translate-y-1/2
            rounded-full bg-white p-3 shadow-md hover:scale-110 transition
            dark:bg-gray-800
          "
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="
            hidden md:flex absolute right-2 top-1/2 -translate-y-1/2
            rounded-full bg-white p-3 shadow-md hover:scale-110 transition
            dark:bg-gray-800
          "
        >
          <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="mt-8 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            className={`
              h-3 w-3 rounded-full transition-transform duration-300
              ${
                i === page
                  ? 'scale-125 bg-indigo-500 dark:bg-indigo-300 shadow-lg'
                  : 'bg-gray-400 dark:bg-gray-600'
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}