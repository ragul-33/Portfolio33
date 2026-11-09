import React from 'react';

import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Tools from './components/Tools';
import HowIThink from './components/HowIThink';
import Services from './components/Services';
import IdentityInMotion from './components/IdentityInMotion';
import Collaboration from './components/Collaboration';
import Contact from './components/Contact';
import HumanFile from './components/HumanFile';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#07090d] text-[#f1f5f9]">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main" className="relative z-10">
        {/* HERO — unnumbered */}
        <Hero />

        {/* 01 — ABOUT */}
        <About />

        {/* 02 — CAPABILITIES */}
        <Capabilities />

        {/* 03 — TOOLS */}
        <Tools />

        {/* 04 — HOW I THINK */}
        <HowIThink />

        {/* 05 — SERVICES */}
        <Services />

        {/* Identity in motion — rebuilt X-mask installation */}
        <IdentityInMotion />

        {/* 06 — LET'S CREATE SOMETHING */}
        <Collaboration />

        {/* 07 — CONTACT */}
        <Contact />

        {/* 08 — DIGITAL AFTERGLOW */}
        <HumanFile />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}