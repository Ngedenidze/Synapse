// src/sections/Services.tsx
'use client';

import { motion } from 'framer-motion';


  const services = [
  {
    title: "Web Design & Development",
    description:
      "We build beautiful, easy-to-use websites that feel like home for your brand. From mobile to desktop, each site we craft is fast, accessible, and designed to turn visitors into loyal customers.",
  },
  {
    title: "Digital Transformation",
    description:
      "Think of us as your digital guides. We’ll modernize your old systems, automate the boring bits, and give you the tools you need to work smarter—not harder—so you can focus on what you love.",
  },
  {
    title: "AI & Data Solutions",
    description:
      "We tap into the power of AI and data to help you see patterns, make smarter decisions, and keep your information locked down tight. It’s like having a digital crystal ball—minus the mystery.",
  },
  {
    title: "Digital Marketing",
    description:
      "Let’s get people talking about you. From SEO that helps you climb search results to social campaigns that spark real conversations, we’ll help you reach the right audience and grow your community.",
  },
  {
    title: "IT Consulting & Strategy",
    description:
      "Not sure which tech moves to make next? We’ll sit down with your team, map out a clear IT roadmap, and guide you step-by-step so your technology works for you—not the other way around.",
  },
];


// simple fade-in variant
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

// positions for the 5 cards (percentages)
const positions = [
  { top: '5%',  left: '15%' },
  { top: '20%', left: '47%' },
  { top: '35%', left: '15%' },
  { top: '50%', left: '47%' },
  { top: '65%', left: '15%' },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full py-24 overflow-visible min-h-[160vh]
                 bg-gradient-to-b from-black via-gray-900 to-black
                 text-white"
    >
      <h2 className="absolute top-8 bg-slate-200/15 p-2 font-azonix right-8 text-5xl md:text-5xl uppercase tracking-widest">
        Our <span className="text-purple-600 dark:text-purple-400">Services</span>
      </h2>

      {/* overlapping cards */}
      {services.map((svc, i) => (
        <motion.div
          key={i}
          className={`
            absolute bg-gray-800 bg-opacity-90
            p-8 rounded-2xl shadow-2xl
            text-white
          `}
          style={{
            width: '35%',
            minHeight: '500px',
            zIndex: i + 10,
            top: positions[i].top,
            left: positions[i].left,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <span className="font-azonix text-sm text-purple-600 dark:text-purple-400 mb-2 block">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="text-4xl font-bold font-azonix mb-4">{svc.title}</h3>
          <p className="text-gray-300 text-2xl">{svc.description}</p>
        </motion.div>
      ))}
    </section>
  );
}
