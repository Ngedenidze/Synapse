'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}
function CustomHamburger({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-end w-8 h-8 relative">
      {/* Top bar */}
      <span
        className={`
          block h-1 w-7 rounded-full bg-current mb-1 transition-all duration-300
          ${open ? "translate-y" : ""}
        `}
      />
      {/* Bottom bar */}
      <span
        className={`
          block h-1 w-7 rounded-full bg-current transition-all duration-300
          ${open ? "-translate-y-2" : ""}
        `}
      />
    </div>
  );
}
export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Experience', id: 'experience' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-end px-4 pt-4 w-screen">
      <div className="flex items-center space-x-2 relative">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="p-1 rounded focus:outline-none"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {/* Hamburger & Dropdown (relative container) */}
        <motion.button
          onClick={() => setIsMenuOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
          className="p-1 rounded focus:outline-none"
          aria-label="Open menu"
        >
          <CustomHamburger open={isMenuOpen} />
        </motion.button>

        {/* Dropdown positioned directly below the hamburger */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="
                absolute top-12 right-0 mt-2 min-w-[160px]
                flex flex-col items-end space-y-2
                bg-transparent shadow-none
                z-50
                font-azonix
                text-lg font-medium
              "
            >
              {navItems.map((it) => (
                <span
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  className="cursor-pointer transition-colors hover:text-indigo-600 px-4 py-1 whitespace-nowrap"
                >
                  {it.label}
                </span>
              ))}
              <a
                href="#demo"
                className="cursor-pointer transition-colors hover:text-indigo-600 px-4 py-1 whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Demo
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}