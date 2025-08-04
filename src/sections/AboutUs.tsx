import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import backgroundImg from "@/components/animation/laptop.jpg"; // Assuming this is a Next.js style image import

const strips = [
  { height: "8%", topOffset: "0%" },
  { height: "10%", topOffset: "8%" },
  { height: "12%", topOffset: "18%" },
  { height: "10%", topOffset: "30%" },
  { height: "15%", topOffset: "40%" },
  { height: "20%", topOffset: "55%" },
  { height: "15%", topOffset: "75%" },
  { height: "10%", topOffset: "90%" },
];

const stripVariants = {
  hidden: { height: "0%", opacity: 0 }, // Using "0%" for consistency
  visible: (i: number) => ({
    height: strips[i].height,
    opacity: 1,
    transition: { delay: i * 0.25, duration: 0.8, ease: "easeOut" },
  }),
};

export default function StripReveal() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Determine the correct image URL (handles Next.js image objects and simple string paths)
  const imageUrl = typeof backgroundImg === 'string' ? backgroundImg : backgroundImg.src;

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-black" // bg-black as a fallback
    >
      {/* Container for strips */} 
      {strips.map(({ height, topOffset }, i) => (
        <motion.div
          key={i}
          className="absolute left-0 w-full overflow-visible" 
          style={{
            top: topOffset,
            // The height of this motion.div is animated by variants from "0%" to strips[i].height
          }}
          custom={i} // Passes the index to variants for staggered delay and correct height
          initial="hidden"
          animate={controls}
          variants={stripVariants}
        >
          {/* This inner div displays the background image.
            It's sized to the full screen height and then shifted vertically
            to show the correct "slice" of the image for this strip.
          */}
          <div
            className="w-full bg-cover bg-center" // Tailwind classes for background-size and initial position
            style={{
              backgroundImage: `url(${imageUrl})`,
              // Set the height of this div to the full height of the intended background display (e.g., screen height)
              height: "100vh",
              // This transform pulls the "100vh" tall image container upwards.
              // The amount it's pulled up by is equal to the strip's offset from the top of the screen.
              // This ensures that the correct segment of the full image is visible within the strip's bounds.
              transform: `translateY(-${topOffset})`,
              // Performance hint for the browser
              willChange: "transform",
            }}
          />
        </motion.div>
      ))}

      {/* Text overlay */}
      <div className="absolute max-w-screen font-azonix bottom-16 left-8 text-white font-bold text-5xl sm:text-2xl leading-tight bg-black bg-opacity-80 px-4 py-2 select-none pointer-events-none">
        REIMAGINE<br /> <span className="text-purple-600 dark:text-purple-400">POSSIBILITIES</span>
      </div>
    </section>
  );
}