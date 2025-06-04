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
    <div className="relative flex items-center justify-center w-8 h-8 cursor-pointer">
      <motion.span
        className="block absolute h-0.5 w-6 bg-current rounded"
        animate={open ? { rotate: 45 } : { rotate: 0, translateY: -4 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="block absolute h-0.5 w-6 bg-current rounded"
        animate={open ? { rotate: -45 } : { rotate: 0, translateY: 4 }}
        transition={{ duration: 0.3 }}
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-end px-4 pt-4">
      <div className="flex items-center space-x-2 relative">
        {/* Theme Toggle */}
       <button
  onClick={onToggleTheme}
  aria-label="Toggle theme"
  className="p-1 rounded focus:outline-none"
  style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
>
  <AnimatePresence mode="wait" initial={false}>
    {isDark ? (
      <motion.span
        key="sun"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-flex', position: 'absolute' }}
      >
        <Sun size={20} />
      </motion.span>
    ) : (
      <motion.span
        key="moon"
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-flex', position: 'absolute' }}
      >
        <Moon size={20} />
      </motion.span>
    )}
  </AnimatePresence>
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

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 flex flex-col items-center justify-center space-y-6 font-azonix text-lg font-medium md:hidden"
            >
              {navItems.map((it) => (
                <span
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  className="cursor-pointer transition-colors hover:text-indigo-600"
                >
                  {it.label}
                </span>
              ))}
              <a
                href="#demo"
                className="cursor-pointer transition-colors hover:text-indigo-600"
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