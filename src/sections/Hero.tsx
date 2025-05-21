// src/sections/Hero.tsx
'use client';

import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Spline from '@splinetool/react-spline';

// Placeholder images—replace with your real slide assets
import slide1 from '@/assets/web-1.jpg';
import slide2 from '@/assets/web-2.jpg';
import slide3 from '@/assets/web-3.jpg';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};
const hoverScale = { scale: 1.05, transition: { type: 'spring', stiffness: 300 } };
const tapScale   = { scale: 0.95 };

// Word carousel
const words = ['Accelerate.', 'Optimize.', 'Thrive.'];
const colors = ['text-indigo-600','text-purple-600','text-pink-600'];
const cycleInterval = 3000;

// Word transition variants
const wordVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y:   0, transition: { duration:0.8, ease:'easeInOut' } },
  exit:    { opacity: 0, y: -50, transition: { duration:0.8, ease:'easeInOut' } },
};

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0,1], [0,-100]);
  const splineRef = useRef<any>(null);

  // Word carousel state
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIndex(i=> (i+1)%words.length), cycleInterval);
    return () => clearInterval(t);
  }, []);

  // Slide carousel state
  const slides = [slide1.src, slide2.src, slide3.src];
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i=> (i+1)%slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Optional: spline scroll effects
  useEffect(() => {
    const load = async () => {
      try {
        const { default: SplineModule } = await import('@splinetool/react-spline');
        const handle = () => {
          const app = splineRef.current;
          if (!app) return;
          const obj = app.findObjectByName('FloatingObject');
          if (obj) {
            const s = scrollYProgress.get();
            obj.rotation.y = s * Math.PI*2;
            const scale = 1 + s*0.2;
            obj.scale.set(scale,scale,scale);
            obj.position.z = s*50;
          }
        };
        handle();
        const unsub = scrollYProgress.onChange(handle);
        return () => unsub();
      } catch {
        console.error('Spline load failed');
      }
    };
    load();
  }, [scrollYProgress]);

  return (
    <section
      id="hero"
      className="
        relative min-h-screen flex flex-col align-center lg:flex-row items-center justify-center text-left lg:text-left
        bg-gradient-to-br from-indigo-100 via-white to-purple-100
        dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900
        overflow-hidden pt-24
      "
    >
      {/* Floating blobs */}
      <motion.div
        style={{ y: yRange }}
        className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full blur-xl opacity-50 animate-blob dark:bg-indigo-700"
      />
      <motion.div
        style={{ y: yRange }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-xl opacity-50 animate-blob animation-delay-2000 dark:bg-purple-700"
      />
      <motion.div
        style={{ y: yRange }}
        className="absolute bottom-40 left-40 w-24 h-24 bg-pink-300 rounded-full blur-xl opacity-50 animate-blob animation-delay-4000 dark:bg-pink-700"
      />

      {/* 3D Scene (optional) */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {/* <Spline ref={splineRef} scene="YOUR_SCENE_URL" onLoad={app=>splineRef.current=app} /> */}
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Left: Text & button */}
        <motion.div
          className="flex-1 max-w-xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
        {/* Word carousel */}
        <div className="overflow-hidden h-20 mb-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`${words[wordIndex]}-${wordIndex}`}
              className={`text-4xl md:text-6xl font-extrabold leading-tight text-gray-800 ${colors[wordIndex]}`}
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
          className="text-lg font-azonix md:text-xl text-gray-600 mb-8 dark:text-gray-300"
          variants={fadeIn}
        >
         Your one-stop partner for custom web design, data-driven insights, and agile digital transformation that drives real results. 
        </motion.p>

        {/* Action button */}
        <motion.a
          href="mailto:hello@yourcompany.com"
          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
          variants={fadeIn}
          whileHover={hoverScale}
          whileTap={tapScale}
        >
          Send us a message&nbsp;<Mail className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Right: Slide carousel */}
      <motion.div
          className="flex-1 max-w-max"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
        <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200  dark:border-gray-700">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[slideIndex]}
              src={slides[slideIndex]}
              alt={`Preview ${slideIndex + 1}`}
              className="w-full h-auto object-cover rounded-xl"
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 mt-4">
  {slides.map((_, i) => (
    <button
      key={i}
      onClick={() => setSlideIndex(i)}
      className={`
        transition-all duration-300
        ${i === slideIndex 
          ? 'w-8 h-1 rounded-full bg-indigo-600'    /* active: wide bar */
          : 'w-4 h-1 rounded-full bg-gray-300 dark:bg-gray-600' /* inactive: small bar */
        }
      `}
    />
  ))}
</div>
      </motion.div>
      </div>
      {/* Blob keyframes (if not global) */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </section>
  );
}
