'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

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
    <>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      {children}
      <Footer />
    </>
  );
}
