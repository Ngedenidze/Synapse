'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, DatabaseZap, BrainCircuit, Megaphone, BriefcaseBusiness, Twitter, Instagram, Facebook, Phone, Mail, MapPin, CheckCircle, Menu } from 'lucide-react'; // Added Menu for mobile

// --- Animation Variants ---

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


// --- Components ---

// Navigation Bar (Updated with Mobile Menu State)
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false); // Close menu on click
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Experience', id: 'experience' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ];

  const mobileMenuVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

   const mobileMenuItemVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
  };


  return (
    // Fixed container for the navbar
    <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 flex justify-center">
       {/* Pill-shaped, semi-transparent background */}
      <motion.nav
        className="relative bg-white/90 backdrop-blur-lg shadow-lg rounded-full py-3 px-6 md:px-10 flex items-center justify-between space-x-4 md:space-x-8 w-full max-w-4xl" // Added max-width
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      >
        {/* Logo */}
        <motion.div
          className="text-xl font-bold text-indigo-600 cursor-pointer flex-shrink-0" // Added flex-shrink-0
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SYNAPSE
        </motion.div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </motion.li>
          ))}
        </ul>

         {/* Mobile Menu Button */}
         <div className="md:hidden">
            <motion.button
                className="text-gray-700 hover:text-indigo-600 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
             >
                <Menu size={24} />
            </motion.button>
         </div>

         {/* Mobile Menu Dropdown */}
         {isMobileMenuOpen && (
            <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4 md:hidden"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
            >
                <ul className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                        <motion.li
                            key={item.id}
                            className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-1"
                            variants={mobileMenuItemVariants}
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.label}
                        </motion.li>
                     ))}
                </ul>
            </motion.div>
         )}
      </motion.nav>
    </div>
  );
};

// Hero Section (No changes)
const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 overflow-hidden pt-24"> {/* Increased pt */}
      {/* Background shapes */}
      <motion.div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full filter blur-xl opacity-50 animate-blob" style={{ y: yRange }} />
      <motion.div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full filter blur-xl opacity-50 animate-blob animation-delay-2000" style={{ y: yRange }} />
      <motion.div className="absolute bottom-40 left-40 w-24 h-24 bg-pink-300 rounded-full filter blur-xl opacity-50 animate-blob animation-delay-4000" style={{ y: yRange }} />

      <motion.div className="z-10 container mx-auto px-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4" variants={fadeIn}>
          <span className="text-indigo-600">SYNAPSE:</span> Transform Your Business
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8" variants={fadeIn}>
          Specializing in digital solutions that drive growth. From web design to digital transformation, we elevate your business to new heights with seamless, efficient, and scalable solutions.
        </motion.p>
        <motion.button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg" variants={fadeIn} whileHover={hoverScale} whileTap={tapScale}>
          Discover Our Solutions
        </motion.button>
      </motion.div>
      {/* CSS Animation */}
      <style jsx>{`
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </section>
  );
};

// About Us Section (No changes)
const AboutUs = () => (
  <motion.section
    id="about" // Added ID for scrolling
    className="py-16 md:py-24 bg-white"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeIn}
  >
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        A Bit About <span className="text-indigo-600">Synapse</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        We specialize in transforming businesses through digital solutions that drive growth. Our expertise spans web design, custom web pages, and digital transformation, all tailored to enhance your sales and improve the quality of your services. We manage all your digital needs, ensuring optimization for success in the digital age.
      </p>
    </div>
  </motion.section>
);

// Services Section (Updated with specific animations)
const Services = () => {
  const services = [
    { icon: Code, title: "Web Design & Development", description: "Creating stunning, user-friendly websites tailored to your brand.", hoverAnimation: webDevHover },
    { icon: DatabaseZap, title: "Digital Transformation", description: "Guiding your business through modernization and process optimization.", hoverAnimation: digitalTransHover },
    { icon: BrainCircuit, title: "AI & Data Solutions", description: "Leveraging AI and data for smarter decisions and enhanced security.", hoverAnimation: aiDataHover },
    { icon: Megaphone, title: "Digital Marketing", description: "Boosting your online presence through SEO, social media, and campaigns.", hoverAnimation: marketingHover },
    { icon: BriefcaseBusiness, title: "IT Consulting & Strategy", description: "Providing expert guidance for your technology roadmap.", hoverAnimation: consultingHover },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50"> {/* Added ID */}
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-indigo-600">Services</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer} // Use stagger container for initial appearance timing
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger when 10% is visible
        >
          {/* Map through services and apply specific animations */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer" // Added cursor-pointer
              variants={staggerItemAppear} // Use stagger item variant for initial appearance
              whileHover={service.hoverAnimation} // Apply the specific hover animation
              whileTap={tapScale} // Keep tap effect consistent
            >
              {/* Icon Container with hover effect */}
               <motion.div
                  className="bg-indigo-100 p-4 rounded-full mb-4 inline-block" // Added inline-block
                  // Add subtle animation to icon container on card hover if desired
                  // Example: whileHover={{ scale: 1.1, rotate: 5 }}
               >
                <service.icon className="w-8 h-8 text-indigo-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


// Experience Section (No changes)
const Experience = () => {
  const portfolio = [
    { title: "Banking Sector", description: "Designed secure, user-friendly digital platforms enhancing customer engagement." },
    { title: "AI Solutions", description: "Implemented AI-driven systems improving decision-making and automating processes." },
    { title: "Digital Transformation", description: "Guided businesses through initiatives improving efficiency and modernizing infrastructure." },
    { title: "E-Commerce", description: "Developed high-converting websites boosting sales and customer satisfaction." },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-white"> {/* Added ID */}
      <div className="container mx-auto px-6">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          Experience & <span className="text-indigo-600">Portfolio</span>
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {portfolio.map((item, index) => (
            <motion.div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200" variants={staggerItemAppear} whileHover={{ borderColor: '#6366F1', scale: 1.02 }}>
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
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


// Quote Section (No changes)
const Quote = () => (
  <motion.section className="py-16 md:py-24 bg-indigo-600 text-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}>
    <div className="container mx-auto px-6 text-center">
      <motion.blockquote className="text-2xl md:text-3xl italic font-medium max-w-4xl mx-auto mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.2 }}>
        "In the world of business, the most successful companies are those that embrace change and adapt to new technologies."
      </motion.blockquote>
      <motion.p className="text-lg text-indigo-200" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.4 }}>
        - Bill Gates
      </motion.p>
    </div>
  </motion.section>
);

// Contact Section (No changes)
const Contact = () => (
  <section id="contact" className="py-16 md:py-24 bg-gray-50"> {/* Added ID */}
    <div className="container mx-auto px-6">
      <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
        Talk to <span className="text-indigo-600">Us!</span>
      </motion.h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {/* Address */}
        <motion.div variants={staggerItemAppear} className="flex flex-col items-center">
          <MapPin className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Address</h3>
          <p className="text-gray-600">123 Anywhere St., Any City</p>
          <p className="text-gray-600">Caldwell, NJ, USA</p>
        </motion.div>
        {/* Phone */}
        <motion.div variants={staggerItemAppear} className="flex flex-col items-center">
          <Phone className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Phone</h3>
          <a href="tel:+995577543353" className="text-indigo-600 hover:underline">+995 577 54 33 53</a>
        </motion.div>
        {/* Email */}
        <motion.div variants={staggerItemAppear} className="flex flex-col items-center">
          <Mail className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Email</h3>
          <a href="mailto:hello@reallygreatsite.com" className="text-indigo-600 hover:underline">hello@reallygreatsite.com</a>
        </motion.div>
      </motion.div>
      {/* Social Media Links */}
      <motion.div className="flex justify-center gap-6 mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={hoverScale} whileTap={tapScale}>
          <Twitter className="w-7 h-7 text-gray-500 hover:text-indigo-600 transition-colors" />
        </motion.a>
        <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={hoverScale} whileTap={tapScale}>
          <Instagram className="w-7 h-7 text-gray-500 hover:text-indigo-600 transition-colors" />
        </motion.a>
        <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={hoverScale} whileTap={tapScale}>
          <Facebook className="w-7 h-7 text-gray-500 hover:text-indigo-600 transition-colors" />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

// Footer Section (No changes)
const Footer = () => (
  <footer className="py-8 bg-gray-800 text-gray-400 text-center">
    <div className="container mx-auto px-6">
      <p>&copy; {new Date().getFullYear()} Synapse. All rights reserved.</p>
      <p className="text-sm mt-1">Transforming Businesses Digitally</p>
    </div>
  </footer>
);


// Main App Component (No structural changes)
function App() {
  return (
    <div className="font-sans">
      {/* Load Tailwind via CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Load Inter font */}
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"/>
       <style>{`
         body { font-family: 'Inter', sans-serif; scroll-padding-top: 100px; /* Adjust based on navbar height */}
         /* Ensure smooth scrolling */
         html { scroll-behavior: smooth; }
       `}</style>

      <Navbar />
      <main>
        <Hero />
        <AboutUs />    {/* Has id="about" */}
        <Services />   {/* Has id="services" - Updated */}
        <Experience /> {/* Has id="experience" */}
        <Pricing />    {/* Has id="pricing" */}
        <Quote />
        <Contact />    {/* Has id="contact" */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
