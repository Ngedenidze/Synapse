// src/sections/Experience.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Replace these with your actual image imports
import bankingImg     from '@/assets/it.webp';
import aiImg          from '@/assets/ai.png';
import dtImg          from '@/assets/digital-transformation.webp';
import ecommerceImg   from '@/assets/web-design-dev.webp';

const portfolio = [
  {
    title: 'Banking Sector',
    description:
      'Designed secure, user-friendly platforms that boosted engagement and streamlined banking operations.',
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
      'Guided companies through end-to-end modernization—upgrading legacy systems, optimizing processes, and driving efficiency.',
    image: dtImg.src,
  },
  {
    title: 'E-Commerce',
    description:
      'Built high-converting online stores with seamless checkout flows, personalized experiences, and mobile-first design.',
    image: ecommerceImg.src,
  },
];

// fade-in variant for text & images
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1) Build an array of RefObjects (one per slide)
  const slideRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  if (slideRefs.current.length !== portfolio.length) {
    slideRefs.current = portfolio.map(() => React.createRef<HTMLDivElement>());
  }

  // 2) useInView on each ref object
  const inViews = slideRefs.current.map((r) =>
    useInView(r, { margin: '-50% 0px -50% 0px' })
  );

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const idx = inViews.findIndex(Boolean);
    if (idx >= 0 && idx !== current) {
      setCurrent(idx);
    }
  }, [inViews, current]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="
        relative h-screen
        overflow-y-scroll snap-y snap-mandatory
        bg-white dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900
      "
    >
      {/* Sticky split line with 4 segments + current number */}
      <div className="sticky top-0 z-20 h-screen flex items-center pointer-events-none">
        <div className="relative h-3/4 w-px bg-gray-700 dark:bg-gray-500 mx-auto">
          {portfolio.map((_, i) => (
            <div
              key={i}
              className={`absolute left-0 w-full transition-colors duration-300`}
              style={{
                top: `${(i / portfolio.length) * 100}%`,
                height: `${100 / portfolio.length}%`,
                backgroundColor: i === current ? '#A78BFA' : 'transparent',
              }}
            />
          ))}
          <div
            className="absolute left-4 font-mono text-lg text-indigo-400"
            style={{
              top: `${(current + 0.5) * (100 / portfolio.length)}%`,
              transform: 'translateY(-50%)',
            }}
          >
            {String(current + 1).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Full-screen slides */}
     {portfolio.map((item, i) => (
        <div
          key={i}
          ref={slideRefs.current[i]}         
          className="snap-start h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-12"
        >
          {/* Text */}
          <motion.div
            className="md:w-1/2 max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              {item.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </motion.div>

          {/* Image */}
          <motion.img
            src={item.image}
            alt={item.title}
            className="md:w-1/2 w-full max-h-96 object-cover rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          />
        </div>
      ))}
         <style jsx>{`
        #experience {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        #experience::-webkit-scrollbar {
          display: none;             /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
    
  );
  
}