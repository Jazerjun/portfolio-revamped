/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  Grid, 
  BookOpen, 
  Download, 
  Play, 
  Pause, 
  Layers, 
  Info,
  Check,
  Copy,
  FolderLock
} from "lucide-react";

interface BrandPage {
  pageNumber: number;
  url: string;
  section: "Overview" | "Logo & Iconography" | "Color Strategy" | "Typography" | "Applications";
  title: string;
  description: string;
}

const TAKOYO_PAGES: BrandPage[] = [
  {
    pageNumber: 1,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0001.jpg?alt=media&token=84d8010d-1931-4196-af07-2e260fc4b2e6",
    section: "Overview",
    title: "Cover Page",
    description: "Welcome. Core Identity System Cover."
  },
  {
    pageNumber: 2,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0002.jpg?alt=media&token=a32748d5-c368-41ce-8ef6-faab80771b26",
    section: "Overview",
    title: "Contents & Framework",
    description: "Structure layout index & corporate vision roadmap."
  },
  {
    pageNumber: 3,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0003.jpg?alt=media&token=5198f56b-2395-4363-8514-03a6f3215733",
    section: "Overview",
    title: "Brand Story",
    description: "Culinary craft narration, ethos, and user connection guidelines."
  },
  {
    pageNumber: 4,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0004.jpg?alt=media&token=1231390a-a11e-4d22-b1fc-d6ee3a7cf06e",
    section: "Overview",
    title: "Core Mood Board",
    description: "Inspirational vectors, textures, and lifestyle resonance guidelines."
  },
  {
    pageNumber: 5,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0005.jpg?alt=media&token=21d4f243-f56c-48a1-8c03-9d4c67a3ea27",
    section: "Logo & Iconography",
    title: "Primary Mark Analysis",
    description: "Corporate signet geometry and logo grid precision."
  },
  {
    pageNumber: 6,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0006.jpg?alt=media&token=2dffd4d1-8074-4601-b8d7-f47a9142b8d7",
    section: "Logo & Iconography",
    title: "Landscape Alternatives",
    description: "Responsive secondary layouts for digital and print spaces."
  },
  {
    pageNumber: 7,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0007.jpg?alt=media&token=36f2989d-ab7a-474e-9c83-b1a320be4fc3",
    section: "Logo & Iconography",
    title: "Logo Clearance Guidelines",
    description: "Defining margins, padding thresholds, and proportional metrics."
  },
  {
    pageNumber: 8,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0008.jpg?alt=media&token=32e27a7b-20ef-49b2-89cd-e244043cfc8c",
    section: "Logo & Iconography",
    title: "Visual Misuse Chart",
    description: "Constraints mapping and incorrect placement, scaling, and color cases."
  },
  {
    pageNumber: 9,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0009.jpg?alt=media&token=993d7438-3145-472f-b3ff-1e7efb5fdc85",
    section: "Color Strategy",
    title: "Hero Color Values",
    description: "Tako Red and deep squid inks parameters. HEX/RGB/CMYK ratios."
  },
  {
    pageNumber: 10,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0010.jpg?alt=media&token=d2c3b2e9-c08c-4a8f-a6be-7fae621c473f",
    section: "Color Strategy",
    title: "Accent Systems",
    description: "Complementary hues matching natural sea components and modern interior design notes."
  },
  {
    pageNumber: 11,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0011.jpg?alt=media&token=aa8e6ede-41cf-4324-9313-ca770957d558",
    section: "Color Strategy",
    title: "Contrast Matrix",
    description: "Readability matrix ensuring accessible color combinations for digital menus and signage."
  },
  {
    pageNumber: 12,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0012.jpg?alt=media&token=3503908e-cb52-41c0-89dc-09e81627dab6",
    section: "Typography",
    title: "Primary Display Fonts",
    description: "Selected editorial font settings, weights range, tracking and character map."
  },
  {
    pageNumber: 13,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0013.jpg?alt=media&token=5709dd2c-f20f-4c3e-95ff-8d256278651b",
    section: "Typography",
    title: "Supporting Type Classes",
    description: "General body fonts, interface hierarchies, and menu pricing text columns."
  },
  {
    pageNumber: 14,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0014.jpg?alt=media&token=11fb4d00-90a4-4e55-bafd-c0b0dc8e91f8",
    section: "Typography",
    title: "Copywriting Tone",
    description: "Voice characteristics rules, active words, syntax, and phrasing manuals."
  },
  {
    pageNumber: 15,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0015.jpg?alt=media&token=2a798519-c3ba-4453-b321-a78d70c0f071",
    section: "Applications",
    title: "Takeout Boxes",
    description: "Environmentally sound cardboard containers layout designs with geometric brand highlights."
  },
  {
    pageNumber: 16,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0016.jpg?alt=media&token=0b3c1d4c-3e48-4a98-bef1-446a351fb250",
    section: "Applications",
    title: "Sauce Bottles & Jars",
    description: "Canned elements packaging, structural glass label tags and bottle sealing."
  },
  {
    pageNumber: 17,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0017.jpg?alt=media&token=3fb70ed0-45e9-4fef-a0a0-1ebf0dcecdee",
    section: "Applications",
    title: "Premium Takeout Bags",
    description: "Structural kraft bag mockups, handles colors, and large logo side placements."
  },
  {
    pageNumber: 18,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0018.jpg?alt=media&token=93f7e02e-2ee0-4d9c-af0f-edce0d3a0242",
    section: "Applications",
    title: "Staff Workwear",
    description: "Minimalist black cotton shirts, aprons detailing, and subtle embroidered neck branding."
  },
  {
    pageNumber: 19,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0019.jpg?alt=media&token=eebc4c1f-60e4-431d-9d4e-bc2fc4c05655",
    section: "Applications",
    title: "Digital App Concept",
    description: "Interactive smart interfaces showcasing menu ordering and culinary streams."
  },
  {
    pageNumber: 20,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0020.jpg?alt=media&token=f718a53f-f8cf-4df5-b2aa-dbaabf1d6743",
    section: "Applications",
    title: "Closing Credits",
    description: "Project credits page, trademark information, and creative director signing."
  }
];

export default function BrandingGuidelines() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isSpreadMode, setIsSpreadMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGridMode, setShowGridMode] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play slideshow logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActivePageIndex((prev) => {
          const step = isSpreadMode ? 2 : 1;
          const nextVal = prev + step;
          return nextVal >= TAKOYO_PAGES.length ? 0 : nextVal;
        });
      }, 4000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isSpreadMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") handleLightboxPrev();
        if (e.key === "ArrowRight") handleLightboxNext();
        if (e.key === "Escape") setLightboxIndex(null);
        return;
      }

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePageIndex, isSpreadMode, lightboxIndex]);

  const handleNext = () => {
    const step = isSpreadMode ? 2 : 1;
    setActivePageIndex((prev) => {
      const nextVal = prev + step;
      return nextVal >= TAKOYO_PAGES.length ? 0 : nextVal;
    });
  };

  const handlePrev = () => {
    const step = isSpreadMode ? 2 : 1;
    setActivePageIndex((prev) => {
      const nextVal = prev - step;
      return nextVal < 0 ? TAKOYO_PAGES.length - (isSpreadMode ? 2 : 1) : nextVal;
    });
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev !== null && prev < TAKOYO_PAGES.length - 1 ? prev + 1 : 0));
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : TAKOYO_PAGES.length - 1));
  };

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(index);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const filteredPages = TAKOYO_PAGES;

  const currentPage = TAKOYO_PAGES[activePageIndex];
  const nextSpreadPage = isSpreadMode && activePageIndex + 1 < TAKOYO_PAGES.length 
    ? TAKOYO_PAGES[activePageIndex + 1] 
    : null;

  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-4 md:p-8 space-y-6 md:space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto text-white">
      
      {/* Upper Control Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E53E3E] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#E53E3E] uppercase font-bold">Takoyo Traditional & Modern</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-sans">
            Brand Identity Suite
          </h3>
          <p className="text-xs text-white/40 font-light max-w-xl">
            A comprehensive 20-page strategic brand guide detailing the visual philosophy, spatial clearances, dynamic palettes, and product application mocks for Takoyo.
          </p>
        </div>

        {/* Action Widgets */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Layout Mode Toggles */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { setShowGridMode(false); setIsSpreadMode(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all ${
                !showGridMode && !isSpreadMode 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              Single Page
            </button>
            <button
              onClick={() => { setShowGridMode(false); setIsSpreadMode(true); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all ${
                !showGridMode && isSpreadMode 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <BookOpen className="w-3 h-3" />
              Spread View
            </button>
            <button
              onClick={() => setShowGridMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all ${
                showGridMode 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Grid className="w-3 h-3" />
              Asset Matrix
            </button>
          </div>

          {/* Slideshow Play / Pause */}
          {!showGridMode && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                isPlaying 
                  ? "bg-[#E53E3E]/20 text-[#E53E3E] border-[#E53E3E]/30" 
                  : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
              }`}
              title={isPlaying ? "Pause Rotation" : "Auto-rotate brand book"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>



      {/* Primary Display Area */}
      <AnimatePresence mode="wait">
        {showGridMode ? (
          /* Asset Matrix Grid Mode */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredPages.map((page) => (
              <motion.div
                key={page.pageNumber}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-[#E53E3E]/40 transition-all duration-300 flex flex-col cursor-pointer relative"
                onClick={() => {
                  const idx = TAKOYO_PAGES.findIndex(p => p.pageNumber === page.pageNumber);
                  setActivePageIndex(idx);
                  setShowGridMode(false);
                }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={page.url}
                    alt={page.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Page number badge */}
                  <span className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md text-[9px] font-mono text-white/60 px-2 py-0.5 rounded border border-white/10">
                    PG {String(page.pageNumber).padStart(2, "0")}
                  </span>
                  
                  {/* Category overlay label */}
                  <span className="absolute top-2.5 left-2.5 bg-[#E53E3E]/85 backdrop-blur-md text-[7px] tracking-wider uppercase font-mono text-white px-1.5 py-0.5 rounded">
                    {page.section}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Presenter Book/Spread view */
          <motion.div
            key="presenter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* The main viewport */}
            <div className="relative bg-[#050505] rounded-3xl border border-white/5 overflow-hidden flex flex-col items-center justify-between p-4 md:p-8 min-h-[400px] lg:min-h-[550px]">
              
              {/* Backglow Ambient gradient matching Takoyo Theme */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[#E53E3E]/[0.02] blur-[120px] pointer-events-none" />

              {/* Viewport bar controls */}
              <div className="w-full relative z-10 flex items-center justify-between pb-4 border-b border-white/5 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/40 uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    {isSpreadMode ? `PG ${String(currentPage.pageNumber).padStart(2, "0")} - ${String(nextSpreadPage ? nextSpreadPage.pageNumber : currentPage.pageNumber).padStart(2, "0")}` : `PAGE ${String(currentPage.pageNumber).padStart(2, "0")} / 20`}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider uppercase text-white/30">
                    // CHAPTER: {currentPage.section}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.15))}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[9px] font-mono text-white/40 min-w-[32px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.15))}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setLightboxIndex(activePageIndex)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 ml-1.5"
                    title="Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Page presentation platform */}
              <div ref={containerRef} className="w-full flex-grow flex items-center justify-center overflow-auto py-2 sm:py-6 relative min-h-[300px] sm:min-h-[420px]">
                
                {/* Left arrow trigger inside frame */}
                <button
                  onClick={handlePrev}
                  className="absolute left-1 md:left-4 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-black/70 backdrop-blur border border-white/10 hover:border-white/30 hover:bg-black text-white/60 hover:text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 pointer-events-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Main animated image panel box */}
                <div 
                  className={`transition-transform duration-300 ease-out flex items-center justify-center gap-4 sm:gap-6 w-full ${isSpreadMode ? "max-w-6xl" : "max-w-2xl"}`}
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <AnimatePresence mode="wait">
                    <div className={`grid grid-cols-1 ${isSpreadMode ? "md:grid-cols-2" : ""} gap-4 sm:gap-6 w-full justify-items-center`}>
                      
                      {/* Left Side (Current Page) */}
                      <motion.div
                        key={`left-${currentPage.pageNumber}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative w-full rounded-2xl bg-[#0a0a0a]/50 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden cursor-zoom-in group/page flex items-center justify-center p-1"
                        onClick={() => setLightboxIndex(activePageIndex)}
                      >
                        <img
                          src={currentPage.url}
                          alt={currentPage.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto max-h-[60vh] md:max-h-[68vh] object-contain select-none rounded-xl"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 flex justify-between items-end opacity-0 group-hover/page:opacity-100 transition-opacity duration-300">
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-mono text-[#E53E3E] uppercase font-bold tracking-widest">{currentPage.section}</span>
                            <span className="text-xs font-bold text-white block">{currentPage.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/50 bg-[#0e0e0e] border border-white/15 px-2 py-0.5 rounded-lg">
                            PG {String(currentPage.pageNumber).padStart(2, "0")}
                          </span>
                        </div>
                      </motion.div>

                      {/* Right Side (Next Spread Page) */}
                      {isSpreadMode && (
                        <motion.div
                          key={`right-${nextSpreadPage ? nextSpreadPage.pageNumber : "empty"}`}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="relative w-full rounded-2xl bg-[#0a0a0a]/50 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden cursor-zoom-in group/page flex items-center justify-center p-1"
                          onClick={() => {
                            if (nextSpreadPage) {
                              setLightboxIndex(activePageIndex + 1);
                            }
                          }}
                        >
                          {nextSpreadPage ? (
                            <>
                              <img
                                src={nextSpreadPage.url}
                                alt={nextSpreadPage.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-auto max-h-[60vh] md:max-h-[68vh] object-contain select-none rounded-xl"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 flex justify-between items-end opacity-0 group-hover/page:opacity-100 transition-opacity duration-300">
                                <div className="space-y-0.5">
                                  <span className="text-[8px] font-mono text-[#E53E3E] uppercase font-bold tracking-widest">{nextSpreadPage.section}</span>
                                  <span className="text-xs font-bold text-white block">{nextSpreadPage.title}</span>
                                </div>
                                <span className="text-[10px] font-mono text-white/50 bg-[#0e0e0e] border border-white/15 px-2 py-0.5 rounded-lg">
                                  PG {String(nextSpreadPage.pageNumber).padStart(2, "0")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full min-h-[300px] sm:min-h-[420px] flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-white/5 rounded-2xl bg-black/10">
                              <FolderLock className="w-8 h-8 text-white/15 mb-2.5" />
                              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">Index End</span>
                              <span className="text-[11px] text-white/40 font-light max-w-[140px]">No subsequent page in current chapter spread.</span>
                            </div>
                          )}
                        </motion.div>
                      )}

                    </div>
                  </AnimatePresence>
                </div>

                {/* Right arrow trigger inside frame */}
                <button
                  onClick={handleNext}
                  className="absolute right-1 md:right-4 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-black/70 backdrop-blur border border-white/10 hover:border-white/30 hover:bg-black text-white/60 hover:text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 pointer-events-auto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Informational Descriptor Box below pages */}
              <div className="w-full relative z-10 p-3 border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E]" />
                  <span className="text-[10px] font-mono text-white/50 tracking-wider">
                    TAKOYO BRAND SUITE DOCUMENT
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(currentPage.url, activePageIndex)}
                    className="p-1.5 hover:bg-white/5 text-white/40 hover:text-white border border-white/5 rounded-lg transition-all text-[10px] font-mono flex items-center gap-1 cursor-pointer pointer-events-auto"
                  >
                    {copiedLink === activePageIndex ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        URL
                      </>
                    )}
                  </button>
                  <a
                    href={currentPage.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-all text-[10px] font-mono flex items-center gap-1 pointer-events-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    High-Res
                  </a>
                </div>
              </div>

            </div>

            {/* Navigation Strip Slider of small thumbnail boxes (20 items preview) */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 pl-1">
                Linear Navigation Track // Grid Index
              </h5>
              <div className="flex gap-2 w-full overflow-x-auto pb-4 scrollbar-thin pointer-events-auto">
                {TAKOYO_PAGES.map((page, idx) => {
                  const isCur = activePageIndex === idx || (isSpreadMode && activePageIndex + 1 === idx);
                  return (
                    <button
                      key={page.pageNumber}
                      onClick={() => setActivePageIndex(idx)}
                      className={`flex-shrink-0 relative w-12 sm:w-16 h-16 sm:h-20 rounded-xl overflow-hidden border transition-all ${
                        isCur 
                          ? "border-[#E53E3E] ring-2 ring-[#E53E3E]/25 scale-102" 
                          : "border-white/5 hover:border-white/20 hover:scale-102"
                      }`}
                    >
                      <img
                        src={page.url}
                        alt=""
                        className="w-full h-full object-cover select-none"
                      />
                      {/* Floating numbers inside container track */}
                      <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-mono font-medium text-white/80">
                        {page.pageNumber}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Lightbox Modal Overlay (Full viewport popup) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Upper row header toolbar */}
            <div className="w-full flex justify-between items-center text-white/60 relative z-20 pointer-events-none mb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E53E3E] font-bold block">Takoyo Brand Codex</span>
                <span className="text-sm font-semibold text-white/90 block font-sans">
                  TAKOYO BRAND CONSTITUTION // PAGE {String(TAKOYO_PAGES[lightboxIndex].pageNumber).padStart(2, "0")}
                </span>
              </div>
              
              <button
                onClick={() => setLightboxIndex(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-xl text-xs font-mono tracking-wider transition-all pointer-events-auto"
              >
                Exit [ESC]
              </button>
            </div>

            {/* Content centered container with navigation triggers */}
            <div className="w-full max-w-5xl flex-grow flex items-center justify-between gap-4 relative">
              
              <button
                onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/35 bg-neutral-900/60 hover:bg-black text-white/70 hover:text-white flex items-center justify-center pointer-events-auto transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div 
                className="max-h-[80vh] flex items-center justify-center p-2 relative pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  src={TAKOYO_PAGES[lightboxIndex].url}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
                />
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/35 bg-neutral-900/60 hover:bg-black text-white/70 hover:text-white flex items-center justify-center pointer-events-auto transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>


          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
