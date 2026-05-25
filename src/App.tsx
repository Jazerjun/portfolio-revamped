/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ChevronDown, 
  Play, 
  Sparkles, 
  Settings, 
  Layers, 
  Film, 
  Tv2, 
  Briefcase 
} from "lucide-react";

// Portfolio Components Imports
import CursorGlow from "./components/CursorGlow";
import AboutSection from "./components/AboutSection";
import TimelineSection from "./components/TimelineSection";
import ProjectsGrid from "./components/ProjectsGrid";
import SkillsSection from "./components/SkillsSection";
import ContactForm from "./components/ContactForm";


const ROLES = [
  "Multimedia Artist",
  "Motion Designer",
  "Video Editor",
  "Creative Strategist",
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate premium cinematic entry loading cover
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // cycle Subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIdx((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      theme === "dark" 
        ? "bg-[#080808] text-white selection:bg-white/20 selection:text-white" 
        : "bg-neutral-50 text-neutral-900 selection:bg-neutral-900/10"
    }`}>
      
      {/* Premium Cursor Flow Spotlights */}
      <CursorGlow />

      {/* 1. CINEMATIC INTRO LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center gap-6"
          >
            <div className="space-y-3 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-xs uppercase font-mono tracking-[0.5em] text-white/40"
              >
                Portfolio Edition
              </motion.div>
              
              <motion.h1
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.05em", opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-3xl md:text-4xl font-sans font-bold text-white tracking-widest"
              >
                Jazerjun Buenafe
              </motion.h1>

              <div className="h-0.5 w-16 bg-white/20 mx-auto mt-4" />
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-[1px] bg-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT */}
      {!loading && (
        <div className="relative">
          
          {/* Subtle Ambient Background Orbs */}
          {theme === "dark" && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#1a1a1a] rounded-full blur-[120px] opacity-40 animate-pulse duration-[10000ms]" />
              <div className="absolute top-[80vh] right-[-5%] w-[40vw] h-[40vw] bg-[#121212] rounded-full blur-[100px] opacity-35 animate-pulse duration-[12000ms]" />
              <div className="absolute top-[180vh] left-[5vw] w-[45vw] h-[45vw] bg-[#121212] rounded-full blur-[150px] opacity-25" />
            </div>
          )}

          {/* 2. PREMIUM HEADER NAVBAR */}
          <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300 pointer-events-auto ${
            theme === "dark" ? "bg-[#080808]/80 border-white/10" : "bg-white/80 border-neutral-200/60"
          }`}>
            <nav className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
              
              {/* Brand Logo Identity */}
              <div 
                onClick={() => handleScrollTo("hero")}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className={`text-xl font-bold tracking-tighter uppercase font-sans ${theme === "dark" ? "text-white" : "text-zinc-950"}`}>
                  JB<span className={`${theme === "dark" ? "text-white/30" : "text-zinc-400"} font-light`}>/</span>Creative
                </div>
              </div>

              {/* Navigation Links Desktop */}
              <div className="hidden md:flex items-center gap-10">
                {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleScrollTo(item.toLowerCase())}
                    className={`text-[10px] uppercase tracking-[0.3em] font-medium pointer-events-auto transition-all cursor-pointer hover:text-white ${
                      theme === "dark" ? "text-white/50" : "text-zinc-650 hover:text-zinc-950"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Extra Utility Actions */}
              <div className="hidden md:flex items-center gap-3">
                {/* Dark/Light mode toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer pointer-events-auto ${
                    theme === "dark" 
                      ? "border-white/20 text-white/50 hover:text-white hover:bg-white/5" 
                      : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                  }`}
                  title="Toggle Light Theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white pointer-events-auto shadow-sm"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white pointer-events-auto shadow-sm"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </nav>

            {/* Mobile Expanded Menu drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-24 left-0 right-0 bg-[#080808] border-b border-white/10 px-8 py-8 flex flex-col gap-5 md:hidden z-30"
                >
                  {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleScrollTo(item.toLowerCase())}
                      className="text-left text-xs uppercase font-mono tracking-[0.2em] font-medium pointer-events-auto text-white/60 hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* 3. DYNAMIC HERO SPLASH INTRO */}
          <section id="hero" className="min-h-screen flex flex-col justify-center relative pt-24 px-6 overflow-hidden">
            
            {/* Floating UI Detail */}
            <div className="absolute top-[40%] right-12 hidden xl:flex flex-col items-end space-y-2 pointer-events-none select-none z-10">
              <div className="w-2 h-2 bg-white animate-pulse"></div>
              <div className="w-8 h-[1px] bg-white/20"></div>
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.25em]" style={{ writingMode: "vertical-rl" }}>Portfolio © 2026</span>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
              
              {/* Copywriting blocks (Column 1 - 7 cols) */}
              <div className="lg:col-span-8 space-y-8 text-left">
                
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/70 font-bold whitespace-nowrap">
                    Now Scheduling For Autumn 2026/2027
                  </span>
                </div>

                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-[0.5em] text-white/40 block font-mono">
                    Senior Multimedia Portfolio
                  </span>
                  
                  {/* Huge cinematic Title with high contrast tracking */}
                  <h1 className="text-[55px] sm:text-[85px] lg:text-[110px] font-bold leading-[0.85] tracking-tighter text-white py-2 uppercase font-sans">
                    JAZERJUN<br/>BUENAFE
                  </h1>

                  {/* ROTATING ROLES ANIMATOR */}
                  <div className="h-8 flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeRoleIdx}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-xs font-mono uppercase tracking-[0.4em] font-semibold text-white/80"
                      >
                        {ROLES[activeRoleIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <p className="text-white/60 text-base max-w-xl leading-relaxed font-light">
                  I create polished video campaigns, custom motion graphics, and dynamic video ads. I partner with major brands, agencies, and production houses to turn creative concepts into beautiful, high-impact visuals.
                </p>

                {/* Primary CTA button locks */}
                <div className="flex flex-wrap items-center gap-4 pt-6">
                  <button
                    onClick={() => handleScrollTo("projects")}
                    className="px-8 py-3.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all font-sans cursor-pointer pointer-events-auto"
                  >
                    View Projects
                  </button>

                  <button
                    onClick={() => handleScrollTo("contact")}
                    className="px-8 py-3.5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm hover:bg-white/5 transition-all font-sans cursor-pointer pointer-events-auto"
                  >
                    Get in Touch
                  </button>
                </div>

              </div>
              
              {/* Portrait Visual Anchor (Column 2 - 4 cols) */}
              <div className="lg:col-span-4 relative hidden lg:block">
                <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto scale-95 hover:scale-100 transition-all duration-700">
                  
                  {/* Ambient glowing backdrop */}
                  <div className="absolute -inset-2 rounded-[32px] bg-white/[0.02] blur-xl opacity-60 pointer-events-none" />
                  
                  {/* Fine Technical Corner Accents */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/25 rounded-tl-xl pointer-events-none" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/25 rounded-tr-xl pointer-events-none" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/25 rounded-bl-xl pointer-events-none" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/25 rounded-br-xl pointer-events-none" />

                  {/* Portrait Box */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="w-full h-full rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative group flex items-end p-6"
                  >
                    {/* The actual photograph */}
                    <img 
                      src="https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/IMG_1580.jpg?alt=media&token=579e01f3-777d-417f-88e5-9087c565cf15" 
                      alt="Jazerjun Buenafe" 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    
                    {/* Elegant overlay gradient for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Subtle details overlay label */}
                    <div className="relative z-10 w-full flex items-center bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono tracking-widest text-white/50 uppercase block">Creative Director</span>
                        <span className="text-xs font-bold text-white tracking-tight uppercase">Jazerjun Buenafe</span>
                      </div>
                    </div>

                  </motion.div>

                  {/* Tech Floating Meta badges */}
                  <div className="absolute -top-6 -right-6 px-3 py-1.5 bg-[#0e0e0e]/90 backdrop-blur border border-white/10 rounded-full flex items-center shadow-xl pointer-events-none">
                    <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/70">Based in PH</span>
                  </div>

                  <div className="absolute -bottom-4 -left-6 px-3 py-1.5 bg-[#0e0e0e]/90 backdrop-blur border border-white/10 rounded-full flex items-center shadow-xl pointer-events-none">
                    <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/70">Available Worldwide</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 flex flex-col items-center space-y-4 left-1/2 -translate-x-1/2 cursor-pointer" onClick={() => handleScrollTo("about")}>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">Scroll to Explore</span>
            </div>
          </section>

          {/* 4. ABOUT SECTION & EXPERIENCE STATS */}
          <AboutSection />

          {/* 5. TIMELINE CLINICAL WORK HISTORY */}
          <TimelineSection />

          {/* 6. PROJECTS COLLECTION CONTAINER */}
          <ProjectsGrid />

          {/* 7. DETAILED MODERN SKILL Bento PORTALS */}
          <SkillsSection />

          {/* 9. SECURE CONTACT CHANNELS & SUBMISSION PORTAL */}
          <ContactForm />

          {/* FOOTER BAR */}
          <footer className={`py-12 border-t text-center space-y-4 transition-colors z-10 relative ${
            theme === "dark" ? "bg-zinc-950/80 border-zinc-900" : "bg-neutral-100 border-neutral-300"
          }`}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
              <p>© 2026 Jazerjun Buenafe. Creative Rights Reserved.</p>
            </div>
          </footer>

        </div>
      )}

    </div>
  );
}
