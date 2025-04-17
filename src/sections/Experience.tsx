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
  
const Experience = () => {
  const portfolio = [
    { title: "Banking Sector", description: "Designed secure, user-friendly digital platforms enhancing customer engagement." },
    { title: "AI Solutions", description: "Implemented AI-driven systems improving decision-making and automating processes." },
    { title: "Digital Transformation", description: "Guided businesses through initiatives improving efficiency and modernizing infrastructure." },
    { title: "E-Commerce", description: "Developed high-converting websites boosting sales and customer satisfaction." },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-white dark:bg-gray-900"> {/* Added ID */}
      <div className="container mx-auto px-6">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          Experience & <span className="text-indigo-600 dark:text-indigo-400">Portfolio</span>
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {portfolio.map((item, index) => (
            <motion.div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" variants={staggerItemAppear} whileHover={{ borderColor: '#6366F1', scale: 1.02 }}>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;