// Header.js
"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/Synapse Logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Transforming businesses through digital innovation.
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-5 bg-slate-400/50 shadow-lg shadow-slate-700/50">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Synapse logo" height={200} width={200} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="/">Home</a>
              <a href="/services">Services</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/pricing">Pricing</a>
              <a href="/contact">Contact</a>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                Sign up for free
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
