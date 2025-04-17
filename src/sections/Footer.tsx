// src/sections/Footer.tsx
'use client';

import Image from 'next/image';
import logo from '@/assets/Synapse Logo.png';
import SocialX from '@/assets/social-x.svg';
import SocialInsta from '@/assets/social-insta.svg';
import SocialLinkedin from '@/assets/social-linkedin.svg';
import SocialPin from '@/assets/social-pin.svg';
import SocialYoutube from '@/assets/social-youtube.svg';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      className="
        relative py-16 flex flex-col items-center text-center
        bg-gradient-to-br from-indigo-100 via-white to-purple-100
        dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900
        overflow-hidden
      "
    >
      {/* Floating blobs (same as Hero) */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-300 rounded-full blur-xl opacity-30 animate-blob dark:bg-indigo-700" />
      <div className="absolute bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-purple-700" />

      <div className="z-10 container mx-auto px-6 space-y-6">
        {/* Logo */}
        <div className="inline-flex relative before:content-[''] before:absolute before:inset-0 before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)]">
          <Image src={logo} alt="Synapse logo" height={60} className="relative" />
        </div>

        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-6 text-gray-800 dark:text-gray-200 font-medium">
          {['About', 'Services', 'Portfolio', 'Pricing', 'Contact', 'Careers'].map((label) => (
            <a key={label} href={`/${label.toLowerCase()}`} className="hover:underline">
              {label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-6 text-gray-600 dark:text-gray-400">
          {[SocialX, SocialInsta, SocialLinkedin, SocialPin, SocialYoutube].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              <Icon className="h-6 w-6" />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          &copy; 2025 Synapse. More Than Company. All rights reserved.
        </p>
      </div>

      {/* Blob keyframes (if not already global) */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </footer>
  );
}
