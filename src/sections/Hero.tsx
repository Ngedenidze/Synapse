// src/sections/Hero.tsx
'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Mail } from 'lucide-react';

import slide1 from '@/assets/web-1.jpg';
import slide2 from '@/assets/web-2.jpg';
import slide3 from '@/assets/web-3.jpg';

// --- Hero content variants & data ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};
const hoverScale = { scale: 1.05, transition: { type: 'spring', stiffness: 300 } };
const tapScale   = { scale: 0.95 };

const words = ['Accelerate.', 'Optimize.', 'Thrive.'];
const colors = ['text-indigo-600','text-purple-600','text-pink-600'];
const cycleInterval = 3000;

// --- Strip‐reveal setup ---
const strips = [
  { height: '8%',  topOffset: '0%'  },
  { height: '10%', topOffset: '8%'  },
  { height: '12%', topOffset: '18%' },
  { height: '10%', topOffset: '30%' },
  { height: '15%', topOffset: '40%' },
  { height: '20%', topOffset: '55%' },
  { height: '15%', topOffset: '75%' },
  { height: '10%', topOffset: '90%' },
];

const stripVariants = {
  // initial: fully covering each slice
  closed: (i: number) => ({
    height: strips[i].height,
    opacity: 1,
  }),
  // animate to zero height, uncovering content
  open: (i: number) => ({
    height: '0%',
    opacity: 0,
    transition: { delay: i * 0.25, duration: 0.8, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(heroRef, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  // start strip‐reveal when Hero enters viewport
  useEffect(() => {
    if (inView) controls.start('open');
  }, [inView, controls]);

  // parallax blobs
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(
    scrollYProgress,
    [0, 0.3],
    shouldReduceMotion ? [0, 0] : [0, -150]
  );

  // word carousel
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    if (shouldReduceMotion) return;
    const t = setInterval(() => setWordIndex(i => (i + 1) % words.length), cycleInterval);
    return () => clearInterval(t);
  }, [shouldReduceMotion]);

  // image carousel
  const slides = [slide1.src, slide2.src, slide3.src];
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    if (shouldReduceMotion) return;
    const t = setInterval(() => setSlideIndex(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [shouldReduceMotion]);

  // word animation variants
  const wordVariants = useMemo(() => (
    shouldReduceMotion
      ? { initial:{opacity:1,y:0}, animate:{opacity:1,y:0}, exit:{opacity:1,y:0} }
      : {
          initial:{ opacity:0, y:50 },
          animate:{ opacity:1, y:0, transition:{ duration:0.8, ease:'easeInOut' } },
          exit:{    opacity:0, y:-50, transition:{ duration:0.8, ease:'easeInOut' } },
        }
  ), [shouldReduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="
        relative min-h-screen flex flex-col lg:flex-row items-center justify-between
        px-6 pt-24 overflow-hidden
        bg-gradient-to-br from-indigo-100 via-white to-purple-100
        dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900
      "
    >
      {/* Floating blobs */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full blur-xl opacity-50 dark:bg-indigo-700 animate-blob"
      />
      <motion.div
        style={{ y: yParallax, animationDelay: '2s' }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-xl opacity-50 dark:bg-purple-700 animate-blob animation-delay-2000"
      />
      <motion.div
        style={{ y: yParallax, animationDelay: '4s' }}
        className="absolute bottom-40 left-40 w-24 h-24 bg-pink-300 rounded-full blur-xl opacity-50 dark:bg-pink-700 animate-blob animation-delay-4000"
      />

      {/* Hero content */}
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Left side */}
        <div className="flex-1 max-w-xl">
          {/* Word carousel */}
          <div className="overflow-hidden h-20 mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`${words[wordIndex]}-${wordIndex}`}
                className={`text-4xl md:text-6xl font-azonix font-extrabold leading-tight text-gray-800 ${colors[wordIndex]}`}
                variants={wordVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {words[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
          {/* Subheading */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg font-azonix md:text-xl text-gray-600 mb-8 dark:text-gray-300"
          >
            Your one-stop partner for custom web design, data-driven insights,
            and agile digital transformation that drives real results.
          </motion.p>
          {/* CTA */}
          <motion.a
            href="mailto:hello@yourcompany.com"
            className="inline-flex font-azonix items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={hoverScale}
            whileTap={tapScale}
          >
            Send us a message&nbsp;<Mail className="w-5 h-5" />
          </motion.a>
        </div>
        {/* Right side */}
        <div className="flex-1 max-w-md">
          <div role="region" aria-live="polite" className="relative w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[slideIndex]}
                src={slides[slideIndex]}
                alt={`Slide ${slideIndex + 1}`}
                className="w-full h-auto object-cover rounded-xl"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`
                  transition-all duration-300
                  ${i === slideIndex
                    ? 'w-6 h-2 rounded-full bg-indigo-600 scale-125'
                    : 'w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 opacity-50 hover:opacity-75'}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Strip‐reveal overlay */}
      {strips.map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 w-full bg-white dark:bg-gray-900 z-20 overflow-hidden"
          style={{ top: strips[i].topOffset }}
          custom={i}
          initial="closed"
          animate={controls}
          variants={stripVariants}
        />
      ))}

      {/* Softer blob keyframes */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes blob {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(15px, -25px) scale(1.05); }
          66%  { transform: translate(-10px, 10px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </section>
  );
}
