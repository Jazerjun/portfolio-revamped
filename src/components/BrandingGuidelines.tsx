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
  FolderLock,
  Compass,
  Palette,
  Sparkles,
  Type,
  Layout,
  HelpCircle,
  Eye,
  RefreshCw
} from "lucide-react";

interface BrandPage {
  pageNumber: number;
  url: string;
  section: "Overview" | "Logo & Iconography" | "Color Strategy" | "Typography" | "Applications";
  title: string;
  description: string;
  type: "image" | "video";
}

const NOIR_PAGES: BrandPage[] = [
  {
    pageNumber: 1,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Branding%20Suite%2FPage%201.mp4?alt=media&token=fa024e28-1e22-4f64-8ef0-f4cc44e67854",
    section: "Overview",
    title: "Cinematic Cover & Introduction",
    description: "Interactive visual launch utilizing high-contrast luxury formatting, showing dynamic letter spacing and editorial structures.",
    type: "video"
  },
  {
    pageNumber: 2,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Branding%20Suite%2FNoire%20Brand-02.png?alt=media&token=074e6e13-19c5-4b90-8ab3-fcb8ce9114bb",
    section: "Logo & Iconography",
    title: "Logomark Clearance & Anatomy",
    description: "Architectural alignment grid defining structural margins, clearance safezones, and minimal branding scales.",
    type: "image"
  },
  {
    pageNumber: 3,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Branding%20Suite%2FNoire%20Brand-03.png?alt=media&token=e4aa7706-d003-40fb-93c9-8775ffa015b4",
    section: "Color Strategy",
    title: "Monochrome Strategy Board",
    description: "Deep dark canvas layers paired with soft gold accents and organic shadows to communicate high-end minimal luxury.",
    type: "image"
  },
  {
    pageNumber: 4,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Branding%20Suite%2FNoire%20Brand-05.png?alt=media&token=bbdb9c20-68df-4563-b1c3-8e36a924b25f",
    section: "Typography",
    title: "Editorial Typography Spacing",
    description: "Luxury typeface profiles and mono-spaced detail markers. Strict tracking hierarchies to support clean typography flow.",
    type: "image"
  },
  {
    pageNumber: 5,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Branding%20Suite%2FNoire%20Brand-04.png?alt=media&token=94c681e4-1773-4539-ba7e-106f12fa4442",
    section: "Applications",
    title: "Bespoke Packaging & Identity",
    description: "Visual identity rendered dynamically across premium Lookbook drafts, tag labels, and paper textures.",
    type: "image"
  },
  {
    pageNumber: 6,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Branding%20Suite%2FPage%206.mp4?alt=media&token=9e6740f8-7bb1-4e62-8fe6-7c6813095164",
    section: "Applications",
    title: "Motion Campaign & Pacing",
    description: "Lookbook simulation with organic frame pacing and motion curves, showing typography and high contrast fashion cuts.",
    type: "video"
  }
];

const TAKOYO_PAGES: BrandPage[] = [
  {
    pageNumber: 1,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0001.jpg?alt=media&token=84d8010d-1931-4196-af07-2e260fc4b2e6",
    section: "Overview",
    title: "Cover Page",
    description: "Welcome. Core Identity System Cover.",
    type: "image"
  },
  {
    pageNumber: 2,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0002.jpg?alt=media&token=a32748d5-c368-41ce-8ef6-faab80771b26",
    section: "Overview",
    title: "Contents & Framework",
    description: "Structure layout index & corporate vision roadmap.",
    type: "image"
  },
  {
    pageNumber: 3,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0003.jpg?alt=media&token=5198f56b-2395-4363-8514-03a6f3215733",
    section: "Overview",
    title: "Brand Story",
    description: "Culinary craft narration, ethos, and user connection guidelines.",
    type: "image"
  },
  {
    pageNumber: 4,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0004.jpg?alt=media&token=1231390a-a11e-4d22-b1fc-d6ee3a7cf06e",
    section: "Overview",
    title: "Core Mood Board",
    description: "Inspirational vectors, textures, and lifestyle resonance guidelines.",
    type: "image"
  },
  {
    pageNumber: 5,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0005.jpg?alt=media&token=21d4f243-f56c-48a1-8c03-9d4c67a3ea27",
    section: "Logo & Iconography",
    title: "Primary Mark Analysis",
    description: "Corporate signet geometry and logo grid precision.",
    type: "image"
  },
  {
    pageNumber: 6,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0006.jpg?alt=media&token=2dffd4d1-8074-4601-b8d7-f47a9142b8d7",
    section: "Logo & Iconography",
    title: "Landscape Alternatives",
    description: "Responsive secondary layouts for digital and print spaces.",
    type: "image"
  },
  {
    pageNumber: 7,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0007.jpg?alt=media&token=36f2989d-ab7a-474e-9c83-b1a320be4fc3",
    section: "Logo & Iconography",
    title: "Logo Clearance Guidelines",
    description: "Defining margins, padding thresholds, and proportional metrics.",
    type: "image"
  },
  {
    pageNumber: 8,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0008.jpg?alt=media&token=32e27a7b-20ef-49b2-89cd-e244043cfc8c",
    section: "Logo & Iconography",
    title: "Visual Misuse Chart",
    description: "Constraints mapping and incorrect placement, scaling, and color cases.",
    type: "image"
  },
  {
    pageNumber: 9,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0009.jpg?alt=media&token=993d7438-3145-472f-b3ff-1e7efb5fdc85",
    section: "Color Strategy",
    title: "Hero Color Values",
    description: "Tako Red and deep squid inks parameters. HEX/RGB/CMYK ratios.",
    type: "image"
  },
  {
    pageNumber: 10,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0010.jpg?alt=media&token=d2c3b2e9-c08c-4a8f-a6be-7fae621c473f",
    section: "Color Strategy",
    title: "Accent Systems",
    description: "Complementary hues matching natural sea components and modern interior design notes.",
    type: "image"
  },
  {
    pageNumber: 11,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0011.jpg?alt=media&token=aa8e6ede-41cf-4324-9313-ca770957d558",
    section: "Color Strategy",
    title: "Contrast Matrix",
    description: "Readability matrix ensuring accessible color combinations for digital menus and signage.",
    type: "image"
  },
  {
    pageNumber: 12,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0012.jpg?alt=media&token=3503908e-cb52-41c0-89dc-09e81627dab6",
    section: "Typography",
    title: "Primary Display Fonts",
    description: "Selected editorial font settings, weights range, tracking and character map.",
    type: "image"
  },
  {
    pageNumber: 13,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0013.jpg?alt=media&token=5709dd2c-f20f-4c3e-95ff-8d256278651b",
    section: "Typography",
    title: "Supporting Type Classes",
    description: "General body fonts, interface hierarchies, and menu pricing text columns.",
    type: "image"
  },
  {
    pageNumber: 14,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0014.jpg?alt=media&token=11fb4d00-90a4-4e55-bafd-c0b0dc8e91f8",
    section: "Typography",
    title: "Copywriting Tone",
    description: "Voice characteristics rules, active words, syntax, and phrasing manuals.",
    type: "image"
  },
  {
    pageNumber: 15,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0015.jpg?alt=media&token=2a798519-c3ba-4453-b321-a78d70c0f071",
    section: "Applications",
    title: "Takeout Boxes",
    description: "Environmentally sound cardboard containers layout designs with geometric brand highlights.",
    type: "image"
  },
  {
    pageNumber: 16,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0016.jpg?alt=media&token=0b3c1d4c-3e48-4a98-bef1-446a351fb250",
    section: "Applications",
    title: "Sauce Bottles & Jars",
    description: "Canned elements packaging, structural glass label tags and bottle sealing.",
    type: "image"
  },
  {
    pageNumber: 17,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0017.jpg?alt=media&token=3fb70ed0-45e9-4fef-a0a0-1ebf0dcecdee",
    section: "Applications",
    title: "Premium Takeout Bags",
    description: "Structural kraft bag mockups, handles colors, and large logo side placements.",
    type: "image"
  },
  {
    pageNumber: 18,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0018.jpg?alt=media&token=93f7e02e-2ee0-4d9c-af0f-edce0d3a0242",
    section: "Applications",
    title: "Staff Workwear",
    description: "Minimalist black cotton shirts, aprons detailing, and subtle embroidered neck branding.",
    type: "image"
  },
  {
    pageNumber: 19,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0019.jpg?alt=media&token=eebc4c1f-60e4-431d-9d4e-bc2fc4c05655",
    section: "Applications",
    title: "Digital App Concept",
    description: "Interactive smart interfaces showcasing menu ordering and culinary streams.",
    type: "image"
  },
  {
    pageNumber: 20,
    url: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Takoyo_BrandGuidelines_viewing_page-0020.jpg?alt=media&token=f718a53f-f8cf-4df5-b2aa-dbaabf1d6743",
    section: "Applications",
    title: "Closing Credits",
    description: "Project credits page, trademark information, and creative director signing.",
    type: "image"
  }
];

interface ColorDetails {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  usage: string;
}

const NOIR_PALETTE: ColorDetails[] = [
  { name: "Premium Gold", hex: "#D4AF37", rgb: "212, 175, 55", cmyk: "0, 17, 74, 17", usage: "Primary Accents & Metallic Highlights" },
  { name: "Deep Charcoal", hex: "#0b0b0b", rgb: "11, 11, 11", cmyk: "0, 0, 0, 96", usage: "Core Background Canvas" },
  { name: "Pure Off-White", hex: "#E6E6E6", rgb: "230, 230, 230", cmyk: "0, 0, 0, 10", usage: "Editorial Typography & Clear Lines" },
  { name: "Muted Luxury", hex: "#262626", rgb: "38, 38, 38", cmyk: "0, 0, 0, 85", usage: "Structural Borders & Spatial Grids" }
];

const TAKOYO_PALETTE: ColorDetails[] = [
  { name: "Tako Red", hex: "#E53E3E", rgb: "229, 62, 62", cmyk: "0, 73, 73, 10", usage: "Primary Corporate Signet Background" },
  { name: "Squid Ink Dark", hex: "#1A202C", rgb: "26, 32, 44", cmyk: "41, 27, 0, 83", usage: "Luxury Dark Backing Grid" },
  { name: "Sea Salt Light", hex: "#FFF5F5", rgb: "255, 245, 245", cmyk: "0, 4, 4, 0", usage: "Accessible contrast base & highlights" },
  { name: "Ocean Ochre", hex: "#D69E2E", rgb: "214, 158, 46", cmyk: "0, 26, 79, 16", usage: "Traditional packaging complementary trim" }
];

export default function BrandingGuidelines() {
  const [selectedSuite, setSelectedSuite] = useState<"noir" | "takoyo">("noir");
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isSpreadMode, setIsSpreadMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGridMode, setShowGridMode] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<number | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // Timer progress bar fraction (0 to 1)
  const [playProgress, setPlayProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const currentPages = selectedSuite === "noir" ? NOIR_PAGES : TAKOYO_PAGES;
  const currentPalette = selectedSuite === "noir" ? NOIR_PALETTE : TAKOYO_PALETTE;
  
  const logoAccent = selectedSuite === "noir" ? "#D4AF37" : "#E53E3E";
  const logoAccentBg = selectedSuite === "noir" ? "bg-[#D4AF37]" : "bg-[#E53E3E]";
  const logoAccentText = selectedSuite === "noir" ? "text-[#D4AF37]" : "text-[#E53E3E]";
  const logoAccentBorder = selectedSuite === "noir" ? "border-[#D4AF37]/35" : "border-[#E53E3E]/35";

  // Reset active index when switching suites
  const handleSuiteChange = (suite: "noir" | "takoyo") => {
    setSelectedSuite(suite);
    setActivePageIndex(0);
    setZoomLevel(1);
    setIsPlaying(false);
    setPlayProgress(0);
    setShowGridMode(false);
  };

  // Jump to specific book section (User benefit: incredibly fast filtering/navigation)
  const handleSectionJump = (sectionName: BrandPage["section"]) => {
    const idx = currentPages.findIndex(p => p.section === sectionName);
    if (idx !== -1) {
      setActivePageIndex(idx);
      setShowGridMode(false);
    }
  };

  // Precise timing implementation with progressive visual loading bar
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now();
      const duration = 5000; // 5 seconds slide time

      const tick = () => {
        if (!startTimeRef.current) return;
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        setPlayProgress(progress);

        if (progress >= 1) {
          // Slide step logic (handling spread view increments)
          const step = isSpreadMode ? 2 : 1;
          setActivePageIndex((prev) => {
            const nextVal = prev + step;
            return nextVal >= currentPages.length ? 0 : nextVal;
          });
          startTimeRef.current = Date.now(); // Reset slide start timer
        }
        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      setPlayProgress(0);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isSpreadMode, currentPages]);

  // Keyboard navigation for maximum accessibility and friendliness
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Lightbox overrides standard window triggers
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
      } else if (e.key === " ") {
        // Spacebar acts as play/pause toggle
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.key === "g" || e.key === "G") {
        setShowGridMode(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePageIndex, isSpreadMode, lightboxIndex, currentPages, isPlaying]);

  const handleNext = () => {
    // Reset play start baseline whenever user overrides single page manually
    if (isPlaying) {
      startTimeRef.current = Date.now();
    }
    const step = isSpreadMode ? 2 : 1;
    setActivePageIndex((prev) => {
      const nextVal = prev + step;
      return nextVal >= currentPages.length ? 0 : nextVal;
    });
  };

  const handlePrev = () => {
    if (isPlaying) {
      startTimeRef.current = Date.now();
    }
    const step = isSpreadMode ? 2 : 1;
    setActivePageIndex((prev) => {
      const nextVal = prev - step;
      return nextVal < 0 ? currentPages.length - (isSpreadMode ? 2 : 1) : nextVal;
    });
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev !== null && prev < currentPages.length - 1 ? prev + 1 : 0));
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : currentPages.length - 1));
  };

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(index);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleCopyColorHEX = (hexCode: string) => {
    navigator.clipboard.writeText(hexCode);
    setCopiedColor(hexCode);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Extract logically unique sections/chapters for current interactive guideline manual
  const uniqueSections = Array.from(new Set(currentPages.map(page => page.section)));
  
  const currentPage = currentPages[activePageIndex];
  const nextSpreadPage = isSpreadMode && activePageIndex + 1 < currentPages.length 
    ? currentPages[activePageIndex + 1] 
    : null;

  return (
    <div className="bg-[#080808] border border-white/10 rounded-3xl p-4 md:p-8 space-y-6 md:space-y-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] pointer-events-auto text-white">
      
      {/* UI Top Controller Switcher Panel */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-950/80 border border-white/5 p-3 rounded-2xl">
        <div className="flex items-center gap-2 px-2.5">
          <Compass className="w-4 h-4 text-white/40" />
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">// CHOOSE METRIC CORE SYSTEM:</span>
        </div>
        
        <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-xl">
          <button
            onClick={() => handleSuiteChange("noir")}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer pointer-events-auto flex items-center gap-2.5 ${
              selectedSuite === "noir"
                ? "bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/10"
                : "text-white/55 hover:text-white hover:bg-white/5"
            }`}
          >
            Noir Apparel Studio
            <span className={`w-1.5 h-1.5 rounded-full ${selectedSuite === "noir" ? "bg-black animate-pulse" : "bg-[#D4AF37]"}`} />
          </button>
          
          <button
            onClick={() => handleSuiteChange("takoyo")}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer pointer-events-auto flex items-center gap-2.5 ${
              selectedSuite === "takoyo"
                ? "bg-[#E53E3E] text-white font-bold shadow-lg shadow-[#E53E3E]/10"
                : "text-white/55 hover:text-white hover:bg-white/5"
            }`}
          >
            Takoyo Traditional
            <span className={`w-1.5 h-1.5 rounded-full ${selectedSuite === "takoyo" ? "bg-white animate-pulse" : "bg-[#E53E3E]"}`} />
          </button>
        </div>
      </div>

      {/* Renders Section Chapter Jump-Links (Massively boosts User-Friendliness) */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider text-white/20 uppercase font-semibold flex items-center gap-1.5">
            <Layout className="w-3 h-3" /> Brand Codex Directory index:
          </span>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-1.5 transition pb-0.5 cursor-pointer pointer-events-auto"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHelp ? "Hide Shortcuts" : "Keyboard Guide"}
          </button>
        </div>

        {/* Keyboard shortcut reference drawer card */}
        <AnimatePresence>
          {showHelp && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-zinc-950/90 border border-white/5 p-4 rounded-xl overflow-hidden grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/30 block">// ACTION</span>
                <span className="text-xs font-medium text-white block">Next Page</span>
                <kbd className="inline-block px-1.5 py-0.5 bg-white/10 text-[9px] font-mono rounded border border-white/10 text-white/75">ArrowRight</kbd>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/30 block">// ACTION</span>
                <span className="text-xs font-medium text-white block">Previous Page</span>
                <kbd className="inline-block px-1.5 py-0.5 bg-white/10 text-[9px] font-mono rounded border border-white/10 text-white/75">ArrowLeft</kbd>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/30 block">// ACTION</span>
                <span className="text-xs font-medium text-white block">Slideshow Toggle</span>
                <kbd className="inline-block px-1.5 py-0.5 bg-white/10 text-[9px] font-mono rounded border border-white/10 text-white/75">Spacebar</kbd>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/30 block">// ACTION</span>
                <span className="text-xs font-medium text-white block">Asset Matrix Grid</span>
                <kbd className="inline-block px-1.5 py-0.5 bg-white/10 text-[9px] font-mono rounded border border-white/10 text-white/75">G</kbd>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-1.5 py-1">
          {uniqueSections.map((sect) => {
            const isSectionActive = currentPages[activePageIndex].section === sect && !showGridMode;
            return (
              <button
                key={sect}
                onClick={() => handleSectionJump(sect)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer border ${
                  isSectionActive 
                    ? `bg-white border-white text-black font-semibold shadow-md` 
                    : `bg-white/[0.02] border-white/5 hover:border-white/15 text-white/55 hover:text-white`
                }`}
              >
                {sect}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dynamic Overview Box */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: logoAccent }} />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold" style={{ color: logoAccent }}>
              {selectedSuite === "noir" ? "Noir Luxury Uniformity Guidelines" : "Takoyo Culinary Visual Standard"}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-sans">
            Brand Identity Suite
          </h3>
          <p className="text-xs text-white/40 font-light max-w-xl">
            {selectedSuite === "noir" 
              ? "A bespoke 6-page cinematic design specification leveraging fluid video motion captures and sleek packaging/typography system layouts."
              : "A detailed 20-page strategic brand bible illustrating color spacing safety corridors, high-contrast assets, and workwear details."}
          </p>
        </div>

        {/* HUD control area for interactive configuration */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Format Selection Layout Buttons */}
          <div className="flex bg-zinc-950 p-1.5 rounded-xl border border-white/5 shadow-inner">
            <button
              onClick={() => { setShowGridMode(false); setIsSpreadMode(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all cursor-pointer pointer-events-auto ${
                !showGridMode && !isSpreadMode 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "text-white/60 hover:text-white"
              }`}
              title="Show single brand card at full scale"
            >
              <Maximize2 className="w-3 h-3" />
              Single Card
            </button>
            
            <button
              onClick={() => { setShowGridMode(false); setIsSpreadMode(true); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all cursor-pointer pointer-events-auto ${
                !showGridMode && isSpreadMode 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "text-white/60 hover:text-white"
              }`}
              title="Lookbook Spread Mode (dual page page flips)"
            >
              <BookOpen className="w-3 h-3" />
              Spread Book
            </button>
            
            <button
              onClick={() => setShowGridMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all cursor-pointer pointer-events-auto ${
                showGridMode 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "text-white/60 hover:text-white"
              }`}
              title="View all asset sheets as a visual matrix"
            >
              <Grid className="w-3 h-3" />
              Asset Matrix
            </button>
          </div>

          {/* Autoplay Slideshow with detailed tactile configuration */}
          {!showGridMode && (
            <div className="flex items-center bg-zinc-950/90 border border-white/5 rounded-xl p-1 gap-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
                style={{
                  backgroundColor: isPlaying ? `${logoAccent}20` : "transparent",
                  color: isPlaying ? logoAccent : "rgba(255,255,255,0.45)"
                }}
                title={isPlaying ? "Pause Automatic Rotation" : "Play Slideshow (5s Interval)"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide Transition Visual Loader (Active when isPlaying is true) */}
      {isPlaying && !showGridMode && (
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 bottom-0 left-0 transition-all duration-75"
            style={{ 
              backgroundColor: logoAccent, 
              width: `${playProgress * 100}%` 
            }}
          />
        </div>
      )}

      {/* Main Interactive Stage Platform */}
      <AnimatePresence mode="wait">
        {showGridMode ? (
          /* MATRIX GRID INDEX */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {currentPages.map((page, idx) => (
              <motion.div
                key={page.pageNumber}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-zinc-950/60 border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300 flex flex-col cursor-pointer relative shadow-md"
                onClick={() => {
                  setActivePageIndex(idx);
                  setShowGridMode(false);
                }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                  {page.type === "video" ? (
                    <video
                      src={page.url}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src={page.url}
                      alt={page.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  
                  {page.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="p-2.5 bg-black/75 backdrop-blur border border-white/10 rounded-full text-white">
                        <Play className="w-3.5 h-3.5 fill-white stroke-none ml-0.5" />
                      </div>
                    </div>
                  )}

                  <span className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md text-[9px] font-mono text-white/60 px-2 py-0.5 rounded border border-white/10">
                    PG {String(page.pageNumber).padStart(2, "0")}
                  </span>
                  
                  <span 
                    className="absolute top-2.5 left-2.5 backdrop-blur-md text-[8px] tracking-widest uppercase font-mono text-black px-2 py-0.5 rounded font-black"
                    style={{ backgroundColor: logoAccent }}
                  >
                    {page.section}
                  </span>
                </div>
                
                <div className="p-3 text-left space-y-1 bg-black/45 flex-grow border-t border-white/5">
                  <span className="text-[9px] font-mono font-medium text-white/40 block leading-none">// PAGE {page.pageNumber}</span>
                  <p className="text-xs font-bold text-white uppercase tracking-tight truncate">{page.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* PRESENTATION WORKBENCH */
          <motion.div
            key="presenter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="relative bg-[#050505] rounded-3xl border border-white/5 overflow-hidden flex flex-col items-center justify-between p-4 md:p-8 min-h-[460px] lg:min-h-[580px]">
              
              {/* Backglow Ambient gradient */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full blur-[120px] pointer-events-none opacity-25 transition-colors duration-500"
                style={{ backgroundColor: `${logoAccent}0F` }}
              />

              {/* HUD Header with interactive utilities */}
              <div className="w-full relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-4 border-b border-white/5 gap-3 mb-4">
                <div className="flex items-center gap-3 justify-between sm:justify-start">
                  <span className="text-[10px] font-mono text-white/50 uppercase bg-white/5 border border-white/15 px-3 py-1 rounded-lg">
                    {isSpreadMode 
                      ? `SPREAD PG ${String(currentPage.pageNumber).padStart(2, "0")} - ${String(nextSpreadPage ? nextSpreadPage.pageNumber : currentPage.pageNumber).padStart(2, "0")}` 
                      : `SHEET NO. ${String(currentPage.pageNumber).padStart(2, "0")} / ${currentPages.length}`}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/30 hidden md:inline-block">
                    // VIEWPORT MODE
                  </span>
                </div>

                {/* Tactile Scaling & Lightbox buttons */}
                <div className="flex items-center justify-center gap-1.5 self-center">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.15))}
                    className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 active:scale-95 text-white/60 hover:text-white transition cursor-pointer pointer-events-auto"
                    title="Zoom Out Brand Sheet"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[9px] font-mono text-white/40 min-w-[36px] text-center bg-black px-2 py-1 rounded-md border border-white/5">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.15))}
                    className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 active:scale-95 text-white/60 hover:text-white transition cursor-pointer pointer-events-auto"
                    title="Zoom In Brand Sheet"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  
                  <button 
                    onClick={() => setLightboxIndex(activePageIndex)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white ml-2 cursor-pointer pointer-events-auto flex items-center gap-1 text-[10px] uppercase font-mono px-2.5 py-1.5"
                    title="Open Fullscreen Immersive Lightbox Focus"
                  >
                    <Eye className="w-3 h-3" /> Focus View
                  </button>
                </div>
              </div>

              {/* Central Dynamic Presenter Stage */}
              <div className="w-full flex-grow flex items-center justify-center overflow-auto py-2 sm:py-6 relative min-h-[300px] sm:min-h-[440px]">
                
                {/* Arrow navigation handles for ultimate friendliness */}
                <button
                  onClick={handlePrev}
                  className="absolute left-1 md:left-4 z-20 w-11 md:w-12 h-11 md:h-12 rounded-full bg-black/85 backdrop-blur border border-white/10 hover:border-white/30 hover:bg-black text-white/70 hover:text-white flex items-center justify-center transition shadow-2xl active:scale-95 pointer-events-auto cursor-pointer"
                  title="Previous Brand Panel"
                >
                  <ChevronLeft className="w-5.5 h-5.5" />
                </button>

                {/* Animated frame container */}
                <div 
                  className="transition-transform duration-300 ease-out flex items-center justify-center gap-6 w-full"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <div className={`grid grid-cols-1 ${isSpreadMode ? "md:grid-cols-2" : ""} gap-6 w-full max-w-6xl justify-items-center`}>
                    
                    {/* Left Page Column */}
                    <motion.div
                      key={`left-${currentPage.pageNumber}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="relative w-full rounded-2xl bg-zinc-950/60 border border-white/10 shadow-2xl overflow-hidden cursor-zoom-in group/page flex items-center justify-center p-1"
                      onClick={() => setLightboxIndex(activePageIndex)}
                    >
                      {currentPage.type === "video" ? (
                        <div className="relative w-full aspect-[4/3] bg-black flex items-center justify-center rounded-xl overflow-hidden max-h-[58vh]">
                          <video
                            src={currentPage.url}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-full object-contain focus:outline-none pointer-events-auto"
                          />
                        </div>
                      ) : (
                        <img
                          src={currentPage.url}
                          alt={currentPage.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto max-h-[58vh] object-contain select-none rounded-xl"
                        />
                      )}
                      
                      {/* Tactical Page Cover Info HUD hover overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-5 flex justify-between items-end opacity-0 group-hover/page:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/page:translate-y-0 text-left">
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-white/10" style={{ color: logoAccent }}>
                            {currentPage.section}
                          </span>
                          <span className="text-sm font-extrabold text-white block uppercase tracking-tight font-sans">{currentPage.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-white/50 bg-black/90 border border-white/10 px-2.5 py-1 rounded-md">
                          PG {String(currentPage.pageNumber).padStart(2, "0")}
                        </span>
                      </div>
                    </motion.div>

                    {/* Right Page Column (Interactive in Spread view, helper layout in single card) */}
                    {isSpreadMode && (
                      <motion.div
                        key={`right-${nextSpreadPage ? nextSpreadPage.pageNumber : "empty"}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative w-full rounded-2xl bg-zinc-950/60 border border-white/10 shadow-2xl overflow-hidden cursor-zoom-in group/page flex items-center justify-center p-1"
                        onClick={() => {
                          if (nextSpreadPage) {
                            setLightboxIndex(activePageIndex + 1);
                          }
                        }}
                      >
                        {nextSpreadPage ? (
                          <>
                            {nextSpreadPage.type === "video" ? (
                              <div className="relative w-full aspect-[4/3] bg-black flex items-center justify-center rounded-xl overflow-hidden max-h-[58vh]">
                                <video
                                  src={nextSpreadPage.url}
                                  controls
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full h-full object-contain focus:outline-none pointer-events-auto"
                                />
                              </div>
                            ) : (
                              <img
                                src={nextSpreadPage.url}
                                alt={nextSpreadPage.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-auto max-h-[58vh] object-contain select-none rounded-xl"
                              />
                            )}
                            
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-5 flex justify-between items-end opacity-0 group-hover/page:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/page:translate-y-0 text-left">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-white/10" style={{ color: logoAccent }}>
                                  {nextSpreadPage.section}
                                </span>
                                <span className="text-sm font-extrabold text-white block uppercase tracking-tight font-sans">{nextSpreadPage.title}</span>
                              </div>
                              <span className="text-[10px] font-mono text-white/50 bg-black/90 border border-white/10 px-2.5 py-1 rounded-md">
                                PG {String(nextSpreadPage.pageNumber).padStart(2, "0")}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-full min-h-[360px] flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-white/5 rounded-2xl bg-black/10">
                            <FolderLock className="w-8 h-8 text-white/10 mb-3" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">Index Limit</span>
                            <span className="text-[11px] text-white/40 font-light max-w-[170px]">No subsequent page in current chapter spread.</span>
                          </div>
                        )}
                      </motion.div>
                    )}

                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="absolute right-1 md:right-4 z-20 w-11 md:w-12 h-11 md:h-12 rounded-full bg-black/85 backdrop-blur border border-white/10 hover:border-white/30 hover:bg-black text-white/70 hover:text-white flex items-center justify-center transition shadow-2xl active:scale-95 pointer-events-auto cursor-pointer"
                  title="Next Brand Panel"
                >
                  <ChevronRight className="w-5.5 h-5.5" />
                </button>

              </div>

              {/* Informational description block panel below stage */}
              <div className="w-full relative z-10 p-4 sm:p-5 border border-white/5 bg-zinc-950/90 backdrop-blur-md rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-4">
                <div className="space-y-1.5 text-left flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: logoAccent }} />
                    <span className="text-[9.5px] font-mono text-white/40 tracking-wider">
                      {selectedSuite === "noir" ? "NOIR TECHNICAL DOSSIER" : "TAKOYO CORPORATE BIBLE // visual rulebook"}
                    </span>
                  </div>
                  <h4 className="text-white text-sm font-semibold uppercase font-mono pl-3.5 flex items-center gap-2">
                    {currentPage.title} 
                    <span className="text-[9px] font-mono text-white/20 capitalize font-medium">({currentPage.section})</span>
                  </h4>
                  <p className="text-[12px] text-white/55 pl-3.5 max-w-2xl font-light leading-relaxed">
                    {currentPage.description}
                  </p>
                </div>

                {/* tactile manual widgets */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => handleCopyLink(currentPage.url, activePageIndex)}
                    className="px-3 py-2 hover:bg-white/5 text-white/50 hover:text-white border border-white/10 rounded-lg transition-all text-[10px] font-mono flex items-center gap-1.5 cursor-pointer pointer-events-auto"
                    title="Copy resource URL link to clipboard"
                  >
                    {copiedLink === activePageIndex ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Link Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Asset URL
                      </>
                    )}
                  </button>
                  
                  <a
                    href={currentPage.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-all text-[10px] font-mono flex items-center gap-1.5 pointer-events-auto"
                    title="Open high-resolution file in standalone browser viewport"
                  >
                    <Download className="w-3.5 h-3.5" />
                    High-Res File
                  </a>
                </div>
              </div>

            </div>




            {/* Tactile scroll navigation track list */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 pl-1 text-left flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-white/30" /> Sheet index strip navigation track:
              </h5>
              
              <div className="flex gap-2 w-full overflow-x-auto pb-4 scrollbar-thin pointer-events-auto">
                {currentPages.map((page, idx) => {
                  const isCur = activePageIndex === idx || (isSpreadMode && activePageIndex + 1 === idx);
                  return (
                    <button
                      key={page.pageNumber}
                      onClick={() => setActivePageIndex(idx)}
                      className="flex-shrink-0 relative w-14 sm:w-16 h-18 sm:h-20 rounded-xl overflow-hidden border transition-all cursor-pointer pointer-events-auto hover:border-white/20"
                      style={{
                        borderColor: isCur ? logoAccent : "rgba(255,255,255,0.05)",
                        boxShadow: isCur ? `0 0 12px ${logoAccent}35` : "none",
                        transform: isCur ? "scale(1.04)" : "scale(1)"
                      }}
                    >
                      {page.type === "video" ? (
                        <video
                          src={page.url}
                          className="w-full h-full object-cover select-none brightness-75"
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={page.url}
                          alt=""
                          className="w-full h-full object-cover select-none brightness-75"
                        />
                      )}
                      
                      <span className="absolute inset-x-0 bottom-0 top-0 bg-black/40 flex flex-col items-center justify-center p-1">
                        <span className="text-[11px] font-mono font-black text-white">{page.pageNumber}</span>
                        <span className="text-[7px] font-mono text-white/40 uppercase hidden sm:inline truncate max-w-[48px]">{page.section}</span>
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
            className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header row toolbar */}
            <div className="w-full flex justify-between items-center text-white/50 relative z-20 pointer-events-none mb-4">
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-black block" style={{ color: logoAccent }}>
                  {selectedSuite === "noir" ? "Noir Apparel Codex" : "Takoyo Culinary Codex"}
                </span>
                <span className="text-sm font-black text-white/90 block font-sans uppercase tracking-tight">
                  {selectedSuite === "noir" ? "NOIR SPECTRAL // SHEET " : "TAKOYO SYMMETRY // SHEET "}{String(currentPages[lightboxIndex].pageNumber).padStart(2, "0")}
                </span>
              </div>
              
              <button
                onClick={() => setLightboxIndex(null)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white border border-white/10 rounded-xl text-xs font-mono tracking-wider transition-all pointer-events-auto cursor-pointer"
              >
                Exit View [ESC]
              </button>
            </div>

            {/* Central presentation viewport and controls */}
            <div className="w-full max-w-5xl flex-grow flex items-center justify-between gap-4 relative">
              
              <button
                onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/35 bg-zinc-950/80 hover:bg-neutral-950 text-white/70 hover:text-white flex items-center justify-center pointer-events-auto transition active:scale-95 cursor-pointer"
                title="Previous Guideline Panel"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div 
                className="max-h-[75vh] flex items-center justify-center p-2 relative pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                {currentPages[lightboxIndex].type === "video" ? (
                  <video
                    key={lightboxIndex}
                    src={currentPages[lightboxIndex].url}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="max-h-[72vh] max-w-full object-contain rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95)] focus:outline-none pointer-events-auto"
                  />
                ) : (
                  <motion.img
                    key={lightboxIndex}
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    src={currentPages[lightboxIndex].url}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="max-h-[72vh] max-w-full object-contain rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
                  />
                )}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/35 bg-zinc-950/80 hover:bg-neutral-950 text-white/70 hover:text-white flex items-center justify-center pointer-events-auto transition active:scale-95 cursor-pointer"
                title="Next Guideline Panel"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom HUD footer details */}
            <div className="p-4 border border-white/5 bg-zinc-950/80 backdrop-blur rounded-2xl w-full max-w-3xl relative z-10 text-left space-y-1">
              <span className="text-[9px] font-mono uppercase font-black" style={{ color: logoAccent }}>
                CHAPTER: {currentPages[lightboxIndex].section}
              </span>
              <h5 className="text-white text-xs font-bold font-mono tracking-wide">
                {currentPages[lightboxIndex].title}
              </h5>
              <p className="text-[11px] text-white/50 font-normal">
                {currentPages[lightboxIndex].description}
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
