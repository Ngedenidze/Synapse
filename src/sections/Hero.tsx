// Hero.js
"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import cogImage from "@/assets/cog.png";
import cylinderImage from "@/assets/cylinder.png";
import noodleImage from "@/assets/noodle.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Define container variants to stagger child (letter) animations
const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // delay between each letter
    },
  },
};

// Define variants for each letter: pop up and fade in
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.3 } },
};

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // The headline text for which each letter will be animated.
  const headlineText = "Elevate Your Business";
  const letters = headlineText.split("");

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip"
      style={{ background: "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)" }}
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Synapse – More Than Company 2025
            </div>
            {/* Animated headline */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              We deliver bespoke digital solutions, from web design to digital transformation, 
              empowering your business to thrive in the digital age.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">Get for free</button>
              <button className="btn btn-text flex gap-1">
                <span>Learn more</span>
                {/* Uncomment if you wish to show the arrow icon */}
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={cogImage.src}
              alt="Animated cog"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              animate={{ translateY: [-30, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={cylinderImage.src}
              alt="Animated cylinder"
              width={220}
              height={220}
              className="hidden md:block -top-8 -left-32 md:absolute"
              style={{ translateY }}
            />
            <motion.img
              src={noodleImage.src}
              alt="Animated noodle"
              width={220}
              className="hidden lg:block top-[524px] left-[448px] absolute rotate-[30deg]"
              style={{
                rotate: 30,
                translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};