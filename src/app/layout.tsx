import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import './globals.css';

import ClientWrapper from '@/components/ClientWrapper';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Saas Landing Page',
  description: 'SaaS Landing Page with React, Next.js, TailwindCSS & Framer Motion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="relative">
      <body
        className={twMerge(
          dmSans.className,
          'antialiased min-h-screen bg-[#EAEEFE] text-gray-900',
          'dark:bg-gray-900 dark:text-gray-100'
        )}
      >
        {/* everything (Navbar, page.tsx, Footer) lives inside ClientWrapper */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
