// src/sections/Pricing.tsx
'use client';

import ArrowRight from '@/assets/arrow-right.svg';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// --- your original tiers, plus a `highlight` flag on the Custom Website ---
const pricingTiers = [
  {
    title: 'Basic Website',
    monthlyPrice: 0,
    description: 'Ideal for small businesses or personal projects.',
    buttonText: 'Get started for free',
    features: ['Single-page design', 'Essential features', 'Responsive layout'],
  },
  {
    title: 'Custom Website',
    monthlyPrice: 5000,
    description: 'Full-featured websites with custom design.',
    buttonText: 'Sign up now',
    features: [
      'Custom design',
      'Interactive elements',
      'Tailored user experience',
      'Scalable solutions',
    ],
    highlight: true, // ← neon glow
  },
  {
    title: 'Enterprise',
    monthlyPrice: 15000,
    description: 'Complete digital transformation for your business.',
    buttonText: 'Contact us',
    features: [
      'End-to-end transformation',
      'Software integrations',
      'Advanced security',
      'Dedicated support',
    ],
  },
];

// same motion variants as before
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};
const hoverScale = { scale: 1.03, transition: { type: 'spring', stiffness: 300 } };

export const Pricing = () => (
  <motion.section
    id="pricing"
    className="flex items-center py-24 sm:py-12 relative w-full overflow-visible min-h-[160vh]
                 bg-gradient-to-b from-black via-gray-900 to-black
                 text-white z-1000 h-fit justify-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeIn}
  >
    <div className="container mx-auto md:px-6 lg:px-0 sm:px-0 sm:mx-0">
      {/* ─────────── Synapse Intro ─────────── */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-4xl sm:text-3xl font-bold text-white font-azonix">
          Transparent, scalable <span className='text-purple-600 dark:text-purple-400'>web solutions</span>  built for growth
        </h2>

        <br />
          <p className="mt-4 text-4xl sm:text-base leading-2 font-azonix sm:text-center text-left text-gray-300">
          At Synapse, we combine creativity, performance, and reliability to craft websites that elevate your brand.
          Choose a plan that aligns with your vision and unlock the power of modern web development.
        </p>
      </div>

      {/* ─────────── Pricing Grid ─────────── */}
      <motion.div
        className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
      >
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.title}
            className={twMerge(
              'relative p-8 font-azonix rounded-3xl border shadow-lg flex flex-col md:h-[600px] sm:h-fit',
              tier.highlight
                ? 'ring-2 ring-indigo-500 animate-pulse bg-black-800 text-white border-indigo-500'
                : 'bg-gray-900 dark:bg-black-700/80 text-gray-100 border-gray-700'
            )}
            variants={staggerItem}
            whileHover={hoverScale}
          >
            {/* Title */}
            <h3 className="lg:text-3xl sm:2xl md:text-3xl  font-semibold text-purple-600 dark:text-purple-400">{tier.title}</h3>

            {/* Price */}
            <div className="mt-4 flex items-baseline">
              <span className="lg:text-5xl md:text-3xl sm:text-xl font-bold">
                {tier.monthlyPrice === 0
                  ? '$0'
                  : `$${tier.monthlyPrice.toLocaleString()}`}
              </span>
              <span className="ml-2 text-lg text-gray-400">/monthly</span>
            </div>

            {/* Description */}
            <p className="mt-2 md:text-lg sm:text-base text-gray-400">{tier.description}</p>

            {/* CTA Button */}
            <button
              className={twMerge(
                'mt-6 md:w-full sm:w-10/12 py-3 rounded-full font-azonix md:text-lg sm:text-sm  transition',
                tier.monthlyPrice === 0
                  ? 'bg-white text-black hover:bg-gray-100'
                  : tier.highlight
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : 'bg-white text-black hover:bg-gray-100'
              )}
            >
              {tier.buttonText}
            </button>

            {/* Features */}
            <ul className="mt-6 space-y-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center md:text-lg sm:text-base">
                  <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* ─────────── Custom Plan CTA ─────────── */}
      <div className="flex mx-auto justify-center flex-col mt-20 text-center px-6 lg:px-0 text-4xl font-azonix max-w-5xl">
        <h2 className="text-6xl sm:text-2xl font-semibold text-white text-center">
          Need Something Custom?
        </h2>
        <p className="mt-4 text-gray-400 sm:text-xl">
          Tell us exactly what you need—advanced integrations, elevated branding, or ongoing maintenance—and we’ll craft a plan just for you.
        </p>
        <a
          href="#contact"
          className="relative inline-flex text-center justify-center mt-5 items-center w-full sm:text-lg text-purple-600 dark:text-purple-400 hover:underline font-medium"
        >
          <ArrowRight className="relative w-5 h-5 mr-2 " />
          Contact us
        </a>
      </div>
    </div>
  </motion.section>
);

export default Pricing;
