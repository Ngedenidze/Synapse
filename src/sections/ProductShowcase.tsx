
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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

// Pricing Section (No changes)
const Pricing = () => {
  const pricingTiers = [
    {
      title: "Web: Basic", price: "$1,500+", description: "Simple single-page or small business site.",
      features: ["Essential Features", "Basic Design", "Mobile Responsive"],
      bgColor: "bg-white", textColor: "text-gray-800", buttonColor: "bg-gray-200", buttonHover: "hover:bg-gray-300", buttonTextColor: "text-gray-800", borderColor: "border-gray-200",
    },
    {
      title: "Web: Custom", price: "$5,000+", description: "Full-featured site with custom design & UX.",
      features: ["Custom Design", "Interactive Elements", "Tailored UX", "CMS Integration"],
      bgColor: "bg-indigo-600", textColor: "text-white", buttonColor: "bg-white", buttonHover: "hover:bg-indigo-100", buttonTextColor: "text-indigo-600", borderColor: "border-indigo-700", popular: true,
    },
     {
      title: "Web: E-Commerce", price: "$8,000+", description: "Online stores with full e-commerce functionality.",
      features: ["Product Pages", "Payment Integration", "Customer Accounts", "Secure Checkout"],
      bgColor: "bg-white", textColor: "text-gray-800", buttonColor: "bg-gray-200", buttonHover: "hover:bg-gray-300", buttonTextColor: "text-gray-800", borderColor: "border-gray-200",
    },
    {
      title: "Digital Transformation", price: "$1,500 - $15,000+", description: "From strategy consultation to full implementation.",
      features: ["Digital Assessment", "Roadmap Development", "Infrastructure Updates", "Process Automation"],
      bgColor: "bg-white", textColor: "text-gray-800", buttonColor: "bg-gray-200", buttonHover: "hover:bg-gray-300", buttonTextColor: "text-gray-800", borderColor: "border-gray-200",
    },
    {
      title: "AI & Data Solutions", price: "$5,000 - $7,500+", description: "AI integration and data security/analytics.",
      features: ["AI Feature Implementation", "Chatbots / Engines", "Data Protection", "Analytics Setup"],
       bgColor: "bg-white", textColor: "text-gray-800", buttonColor: "bg-gray-200", buttonHover: "hover:bg-gray-300", buttonTextColor: "text-gray-800", borderColor: "border-gray-200",
    },
    {
      title: "Digital Marketing", price: "$1,500 - $4,000+/mo", description: "SEO and full-service digital marketing.",
      features: ["On-Page SEO", "Social Media Marketing", "Content Creation", "Ad Campaigns"],
      bgColor: "bg-white", textColor: "text-gray-800", buttonColor: "bg-gray-200", buttonHover: "hover:bg-gray-300", buttonTextColor: "text-gray-800", borderColor: "border-gray-200",
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50"> {/* Added ID */}
      <div className="container mx-auto px-6">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          Flexible <span className="text-indigo-600">Pricing Plans</span>
        </motion.h2>
         <motion.p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Choose the perfect starting point for your digital journey. Prices indicate starting costs and vary based on project scope. Discounts available for long-term, non-profit, and startup clients.
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {pricingTiers.map((tier, index) => (
            <motion.div key={index} className={`relative p-8 rounded-xl shadow-lg border-2 flex flex-col ${tier.bgColor} ${tier.borderColor}`} variants={staggerItemAppear} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
               {tier.popular && ( <div className="absolute top-0 right-4 -mt-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"> Most Popular </div> )}
              <div className={`flex-grow ${tier.textColor}`}>
                <h3 className="text-2xl font-semibold mb-2">{tier.title}</h3>
                <p className="text-3xl font-bold mb-4">{tier.price}</p>
                <p className="mb-6 opacity-90">{tier.description}</p>
                <ul className="space-y-2 mb-8 text-left">
                  {tier.features.map((feature, fIndex) => ( <li key={fIndex} className="flex items-center"> <CheckCircle className={`w-5 h-5 mr-2 ${tier.popular ? 'text-indigo-300' : 'text-indigo-500'}`} /> <span>{feature}</span> </li> ))}
                </ul>
              </div>
              <motion.button className={`w-full mt-auto px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow ${tier.buttonColor} ${tier.buttonHover} ${tier.buttonTextColor}`} whileTap={tapScale}> Get Started </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
