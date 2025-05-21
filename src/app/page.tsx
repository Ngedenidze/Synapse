'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import AboutUs from '@/sections/AboutUs';
import Services from '@/sections/Services';
import Experience from '@/sections/Experience';
import Pricing from '@/sections/Pricing';
import Quote from '@/sections/Quote';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import Landing from '@/sections/Landing';
export default function App() {
  const [isDark, setIsDark] = useState(false);

  // on mount, load preference (or OS default)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefers);
      document.documentElement.classList.toggle('dark', prefers);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className="font-sans min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <Landing />
        <Hero />
        <AboutUs />
        <Services />
        <Experience />
        <Pricing />
        <Quote />
        <Contact />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
