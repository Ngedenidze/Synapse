'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Sun, Moon, ArrowRight } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Experience', id: 'experience' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const mobileNavVars = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };
  const mobileItemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        className="
          w-full max-w-4xl flex items-center justify-between
          px-6 py-3 rounded-full
          bg-white/75 dark:bg-black/40
          border border-gray-200 dark:border-gray-700
          backdrop-blur-lg
          shadow-none
          text-indigo-800 dark:text-indigo-100
        "
      >
        {/* Logo */}
        <motion.div
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SYNAPSE
        </motion.div>

        {/* Desktop Links + Theme Toggle + CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-1 rounded focus:outline-none"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {navItems.map((it) => (
            <motion.span
              key={it.id}
              onClick={() => scrollTo(it.id)}
              className="cursor-pointer font-medium transition-colors hover:text-indigo-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {it.label}
            </motion.span>
          ))}

          {/* Book a Demo button with arrow */}
          <a
            href="#demo"
            className="
              ml-4 inline-flex items-center
              bg-indigo-600 hover:bg-indigo-700
              text-white
              px-4 py-2
              rounded-full
              font-medium
              transition-colors
              duration-200
            "
          >
            Book a Demo
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-1 rounded focus:outline-none"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <motion.button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded focus:outline-none"
          >
            <Menu size={24} />
          </motion.button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileNavVars}
            className="
              absolute top-full left-0 right-0 mt-2
              bg-white/10 dark:bg-black/10
              backdrop-blur-md rounded-xl
              shadow-none p-4
              text-gray-800 dark:text-gray-100
            "
          >
            <ul className="flex flex-col space-y-3">
              {navItems.map((it) => (
                <motion.li
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  variants={mobileItemVars}
                  className="cursor-pointer font-medium transition-colors hover:text-indigo-600"
                >
                  {it.label}
                </motion.li>
              ))}
              {/* Include the demo CTA in mobile menu with arrow */}
              <li>
                <a
                  href="#demo"
                  className="
                    block text-center inline-flex items-center justify-center
                    bg-indigo-600 hover:bg-indigo-700
                    text-white
                    px-4 py-2
                    rounded-full
                    font-medium
                    transition-colors
                  "
                >
                  Book a Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}
