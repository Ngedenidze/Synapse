"use client";
import Image from "next/image";
import logo from "@/assets/Synapse Logo.png"; // Update with your actual Synapse logo asset
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedin from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        {/* Logo with gradient effect */}
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} alt="Synapse logo" height={60} className="relative" />
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/pricing">Pricing</a>
          <a href="/contact">Contact</a>
          <a href="/careers">Careers</a>
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-6 mt-6">
          <SocialX />
          <SocialInsta />
          <SocialLinkedin />
          <SocialPin />
          <SocialYoutube />
        </div>

        {/* Copyright and tagline */}
        <p className="mt-6">&copy; 2025 Synapse. More Than Company. All rights reserved.</p>
      </div>
    </footer>
  );
};
