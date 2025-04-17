import exp from "constants";
import { motion } from "framer-motion";

// Fade-in variant
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };
  
  // Stagger container variant
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger
        delayChildren: 0.1,
      }
    }
  };
  
  // Item variant for staggering (Initial Appearance)
  const staggerItemAppear = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Generic Hover scale effect (Fallback/Base)
  const hoverScale = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  };
  
  // Tap scale effect
  const tapScale = {
    scale: 0.95
  };
  
  // --- Specific Hover Animations for Service Cards ---
  const webDevHover = {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.3)", // Indigo shadow
    transition: { type: "spring", stiffness: 300 }
  };
  
  const digitalTransHover = {
    scale: 1.04,
    rotate: 1, // Slight rotation
    boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.15)",
    transition: { type: "spring", stiffness: 300 }
  };
  
  const aiDataHover = {
    scale: 1.05,
    filter: "brightness(1.1)", // Subtle glow
     boxShadow: "0px 10px 20px rgba(139, 92, 246, 0.2)", // Purple shadow
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };
  
  const marketingHover = {
    scale: 1.06, // Slightly larger pop
    boxShadow: "0px 10px 20px rgba(236, 72, 153, 0.2)", // Pinkish shadow
    transition: { type: "spring", stiffness: 400, damping: 15 }
  };
  
  const consultingHover = {
    scale: 1.03,
    y: -3, // Slight lift
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 300 }
  };
const AboutUs = () => (
    <motion.section
      id="about" // Added ID for scrolling
      className="py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 ">
          A Bit About <span className="text-indigo-600 dark:text-indigo-400">Synapse</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-400">
          We specialize in transforming businesses through digital solutions that drive growth. Our expertise spans web design, custom web pages, and digital transformation, all tailored to enhance your sales and improve the quality of your services. We manage all your digital needs, ensuring optimization for success in the digital age.
        </p>
      </div>
    </motion.section>
  );
  export default AboutUs;   // Exporting the component for use in other parts of the application