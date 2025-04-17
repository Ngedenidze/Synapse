// src/sections/Pricing.tsx
'use client';
import ArrowRight from '@/assets/arrow-right.svg';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// Fade-in variant
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

// Stagger container variant
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// Item variant for staggering
const staggerItemAppear = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Hover scale
const hoverScale = { scale: 1.03, transition: { type: 'spring', stiffness: 300 } };

const pricingTiers = [
  {
    title: 'Basic Website',
    monthlyPrice: 0,
    description: 'Ideal for small businesses or personal projects.',
    buttonText: 'Get started for free',
    popular: false,
    inverse: false,
    features: ['Single-page design', 'Essential features', 'Responsive layout'],
  },
  {
    title: 'Custom Website',
    monthlyPrice: 5000,
    description: 'Full-featured websites with custom design.',
    buttonText: 'Sign up now',
    popular: true,
    inverse: true,
    features: [
      'Custom design',
      'Interactive elements',
      'Tailored user experience',
      'Scalable solutions',
    ],
  },
  {
    title: 'Enterprise',
    monthlyPrice: 15000,
    description: 'Complete digital transformation for your business.',
    buttonText: 'Contact us',
    popular: false,
    inverse: false,
    features: [
      'End-to-end transformation',
      'Software integrations',
      'Advanced security',
      'Dedicated support',
    ],
  },
];

export const Pricing = () => {
  return (
    <motion.section
      id="pricing"
      className="py-24 bg-gray-50 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-6">
        <div className="section-heading text-center mb-12">
          <motion.h2
            className="section-title text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100"
            variants={fadeIn}
          >
            Pricing
          </motion.h2>
          <motion.p
            className="section-des mt-3 text-gray-600 dark:text-gray-300"
            variants={fadeIn}
          >
            Transparent pricing to suit your business needs. Upgrade as you scale.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col gap-6 items-center lg:flex-row lg:items-end lg:justify-center"
          variants={staggerContainer}
        >
          {pricingTiers.map(({ title, monthlyPrice, buttonText, popular, features, inverse }) => (
            <motion.div
              key={title}
              className={twMerge(
                'p-8 rounded-3xl border shadow-lg max-w-xs w-full',
                inverse
                  ? 'bg-black text-white border-white'
                  : 'bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700'
              )}
              variants={staggerItemAppear}
              whileHover={hoverScale}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3
                  className={twMerge(
                    'text-lg font-semibold',
                    inverse
                      ? 'text-white/90'
                      : 'text-gray-800 dark:text-gray-100'
                  )}
                >
                  {title}
                </h3>
                {popular && (
                  <span className="inline-block text-sm px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text font-medium">
                    Popular
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-4">
                <span
                  className={twMerge(
                    'text-4xl font-bold leading-none',
                    inverse
                      ? 'text-white'
                      : 'text-gray-900 dark:text-gray-100'
                  )}
                >
                  {monthlyPrice === 0 ? 'Free' : `$${monthlyPrice}`}
                </span>
                {monthlyPrice !== 0 && (
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    /package
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {monthlyPrice === 0
                  ? 'Everything you need to get started.'
                  : pricingTiers.find((t) => t.title === title)?.description}
              </p>

              {/* Button */}
              <button
                className={twMerge(
                  'btn btn-primary w-full mt-6',
                  inverse
                    ? 'bg-white text-black hover:bg-gray-100'
                    : ''
                )}
              >
                {buttonText}
              </button>

              {/* Features */}
              <ul className="mt-6 space-y-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="h-5 w-5 bg-green-500 rounded-full inline-block" />
                    <span
                      className={twMerge(
                        'text-sm',
                        inverse
                          ? 'text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Pricing;
