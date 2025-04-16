"use client";
import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import cogImage from "@/assets/cog.png";

export const ScrollCog = () => {
  // Listen to the overall scroll progress of the viewport
  const { scrollYProgress } = useScroll();

  // Map the scroll progress to our desired transforms:
  const translateX = useTransform(scrollYProgress, [0, 0.5, 1], [1200, 0, 1200]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  return (
    <motion.div
      style={{
        position: "fixed",     // fixed so it stays visible during scroll
        top: 0,                // you can adjust these offsets as necessary
        left: 0,
        zIndex: 10,
        translateX,            // controlled by scroll
        scale,                
      }}
    >
      {/* The cog image rotates continuously over 5 seconds.
          If you want rotation also driven by scroll, you could add a similar useTransform. */}
      <motion.img
        src={cogImage.src}
        alt="Animated Cog"
        animate={{ translateY: [-30, 30] }}
        transition={{ repeat: Infinity, duration: 3, ease: "anticipate" }}
        style={{ width: "800px", height: "800px" }}
      />
    </motion.div>
  );
};
