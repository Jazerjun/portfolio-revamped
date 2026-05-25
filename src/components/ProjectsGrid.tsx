/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, ArrowUpRight } from "lucide-react";
import { Project } from "../types";
import { fetchProjects, fetchGraphicDesignImages } from "../portfolioService";
import BrandingGuidelines from "./BrandingGuidelines";
import DCOWorkbench from "./DCOWorkbench";

interface VideoThumbnailProps {
  videoUrl?: string;
  fallbackUrl: string;
  title: string;
  isHovered: boolean;
}

function VideoThumbnail({ videoUrl, fallbackUrl, title, isHovered }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !videoLoaded || hasError) return;
    
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Playback prevented or error playing video thumbnail:", error);
        });
      }
    } else {
      videoRef.current.pause();
      // Snap back to a neat frame
      videoRef.current.currentTime = 0.5;
    }
  }, [isHovered, videoLoaded, hasError]);

  const isDirectVideo = videoUrl && (
    videoUrl.toLowerCase().includes(".mp4") ||
    videoUrl.toLowerCase().includes(".mov") ||
    videoUrl.toLowerCase().includes(".webm") ||
    videoUrl.toLowerCase().includes(".m4v") ||
    videoUrl.toLowerCase().includes("firebasestorage.googleapis.com")
  );

  if (!isDirectVideo || hasError) {
    return (
      <img
        src={fallbackUrl}
        alt={title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    );
  }

  // Use #t=0.5 to grab a nice initial thumbnail frame directly from the video metadata
  const videoSrc = `${videoUrl}#t=0.5`;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        loop
        preload="metadata"
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isHovered ? "scale-105 brightness-110" : "scale-100 brightness-90 bg-zinc-950"
        }`}
      />
      
      {/* If current video stream is not yet loaded, show the fallback image immediately */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <img
            src={fallbackUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          {/* A clean minimalist preloader spinner */}
          <div className="absolute w-6 h-6 rounded-full border-2 border-white/15 border-t-white/80 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "branding_suite" | "film_video" | "motion" | "graphic_design" | "dco">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // States for graphic design collection of photos
  const [graphicDesignImages, setGraphicDesignImages] = useState<string[]>([]);
  const [loadingGraphics, setLoadingGraphics] = useState(false);
  const [selectedGraphicImageIdx, setSelectedGraphicImageIdx] = useState<number | null>(null);

  // Load from database / presets
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await fetchProjects();
        setProjects(list);
      } catch (e) {
        console.error("Failed to load portfolio grid projects", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Load graphic design photos
  useEffect(() => {
    async function loadGraphics() {
      setLoadingGraphics(true);
      try {
        const list = await fetchGraphicDesignImages();
        setGraphicDesignImages(list);
      } catch (e) {
        console.error("Failed to load graphic design images", e);
      } finally {
        setLoadingGraphics(false);
      }
    }
    loadGraphics();
  }, []);

  // Keyboard controls for graphic design immersive lightbox
  useEffect(() => {
    if (selectedGraphicImageIdx === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedGraphicImageIdx(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedGraphicImageIdx((prev) => 
          prev !== null ? (prev === 0 ? graphicDesignImages.length - 1 : prev - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedGraphicImageIdx((prev) => 
          prev !== null ? (prev === graphicDesignImages.length - 1 ? 0 : prev + 1) : null
        );
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGraphicImageIdx, graphicDesignImages]);

  const tabs: { value: "all" | "branding_suite" | "film_video" | "motion" | "graphic_design" | "dco"; label: string }[] = [
    { value: "all", label: "All Works" },
    { value: "branding_suite", label: "Branding Suite" },
    { value: "film_video", label: "Film and Video" },
    { value: "motion", label: "Motion Graphics" },
    { value: "graphic_design", label: "Graphic Design" },
    { value: "dco", label: "DCO" },
  ];

  const filteredProjects = activeTab === "all" 
    ? projects.filter((p) => p.category !== "graphic_design")
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24 relative border-t border-white/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block border-l-2 border-white/20 pl-3">
              Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tighter uppercase leading-none">
              Selected Works
            </h2>
            <p className="text-white/45 max-w-md font-light text-sm leading-relaxed">
              A curated showcase of dynamic advertising, cinematics, web products, and brand directions.
            </p>
          </div>

          {/* Categories Tabs layout */}
          <div className="flex flex-wrap gap-2 bg-[#0b0b0b] p-1.5 rounded-full border border-white/10 backdrop-blur w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-5 py-2 rounded-full text-[11px] font-mono transition-all duration-300 pointer-events-auto cursor-pointer ${
                  activeTab === tab.value
                    ? "text-black bg-white font-medium shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Ring State */}
        {loading ? (
          <div className="py-24 flex justify-center items-center">
            <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />
          </div>
        ) : (
          <div className="space-y-12">
            {activeTab === "branding_suite" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <BrandingGuidelines />
              </motion.div>
            )}

            {activeTab === "dco" ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DCOWorkbench />
              </motion.div>
            ) : activeTab === "graphic_design" ? (
              loadingGraphics ? (
                <div className="py-24 flex justify-center items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 xl:gap-8 space-y-6 lg:space-y-0"
                >
                  {graphicDesignImages.map((imgUrl, idx) => (
                    <motion.div
                      key={idx}
                      className="break-inside-avoid inline-block w-full mb-6 xl:mb-8 bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/15 transition-all duration-300 pointer-events-auto cursor-zoom-in relative"
                      onClick={() => setSelectedGraphicImageIdx(idx)}
                      whileHover={{ y: -6 }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Graphic Design Piece ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {/* Subtle elegant gradient overlay on hover to feel clickable */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
                      
                      {/* Interactive zoom-in hint circle on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-4 h-4 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )
            ) : (
              // Original Projects List Layout
              <>
                {filteredProjects.length > 0 && (
                  <div className="space-y-6">
                    {activeTab === "branding_suite" && (
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4 pl-1 border-l-2 border-[#D4AF37]/5 pl-3">
                        05 // BRANDING ASSETS & DELIVERABLES
                      </h4>
                    )}
                    {/* Animated Projects Columns Layout */}
                    <motion.div 
                      layout 
                      className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 xl:gap-8 space-y-6 lg:space-y-0"
                    >
                      <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                          <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ y: -6 }}
                            className="break-inside-avoid inline-block w-full mb-6 xl:mb-8 bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/15 transition-all duration-300 flex flex-col pointer-events-auto cursor-pointer relative"
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => setHoveredProjectId(project.id)}
                            onMouseLeave={() => setHoveredProjectId(null)}
                          >
                            {/* Thumbnail / Video play Trigger container */}
                            <div className={`relative w-full overflow-hidden bg-black ${
                              project.aspectRatio === "9:16"
                                ? "aspect-[9/16]"
                                : project.aspectRatio === "1:1"
                                  ? "aspect-square"
                                  : "aspect-video"
                            }`}>
                              <VideoThumbnail
                                videoUrl={project.videoUrl}
                                fallbackUrl={project.thumbnailUrl}
                                title={project.title}
                                isHovered={hoveredProjectId === project.id}
                              />
                              
                              {/* Dark gradient mask */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
                              
                              {/* Category Label Overlay */}
                              <span className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-[9px] uppercase font-mono tracking-wider px-2.5 py-1 rounded border border-white/10 text-white/50 pointer-events-none">
                                {project.category}
                              </span>

                              {/* Dynamic hover state overlay with button play icon */}
                              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.45)]">
                                  {project.videoUrl ? (
                                    <Play className="w-5 h-5 fill-black stroke-none ml-1" />
                                  ) : (
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Body textual specifications */}
                            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                              <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-white/50 text-xs line-clamp-2 leading-relaxed font-light">
                                  {project.description}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                                {project.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[9px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                                  >
                                    #{tag.replace(/\s+/g, "")}
                                  </span>
                                ))}
                                {project.tags.length > 3 && (
                                  <span className="text-[9px] font-mono text-white/30 bg-white/[0.02] px-2 py-0.5 rounded border border-white/5">
                                    +{project.tags.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}

                {/* Empty layout block if no projects and not branding tab */}
                {filteredProjects.length === 0 && activeTab !== "branding_suite" && (
                  <div className="text-center py-16 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">
                    <p className="text-zinc-500 text-sm">No dynamic projects found in this category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

      </div>

      {/* Cinematic Showcase Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto pointer-events-auto"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className={`bg-[#0c0c0c] border border-white/10 rounded-3xl overflow-hidden w-full max-h-[90vh] flex flex-col relative pointer-events-auto shadow-[0_30px_100px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                selectedProject.aspectRatio === "9:16"
                  ? "max-w-md"
                  : selectedProject.aspectRatio === "1:1"
                    ? "max-w-2xl"
                    : "max-w-4xl"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer pointer-events-auto shadow-md"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto w-full custom-scrollbar">
                
                {/* Embedded Video Area or Big Banner Display */}
                {selectedProject.videoUrl ? (
                  <div className={`relative w-full bg-black border-b border-white/10 flex items-center justify-center ${
                    selectedProject.aspectRatio === "9:16"
                      ? "aspect-[9/16] max-h-[60vh]"
                      : selectedProject.aspectRatio === "1:1"
                        ? "aspect-square max-h-[50vh]"
                        : "aspect-video"
                  }`}>
                    {(() => {
                      const urlStr = selectedProject.videoUrl.toLowerCase();
                      const isDirectVideo = 
                        urlStr.includes(".mp4") || 
                        urlStr.includes(".mov") || 
                        urlStr.includes(".webm") || 
                        urlStr.includes(".m4v") || 
                        urlStr.includes("firebasestorage.googleapis.com");
                      
                      if (isDirectVideo) {
                        return (
                          <video
                            src={selectedProject.videoUrl}
                            controls
                            autoPlay
                            playsInline
                            preload="auto"
                            className="w-full h-full object-contain max-h-[50vh] focus:outline-none"
                          >
                            Your browser does not support the video tag.
                          </video>
                        );
                      }
                      
                      return (
                        <iframe
                          src={selectedProject.videoUrl}
                          title={selectedProject.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      );
                    })()}
                  </div>
                ) : (
                  <div className="relative aspect-video w-full border-b border-white/10">
                    <img
                      src={selectedProject.thumbnailUrl}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent opacity-80" />
                  </div>
                )}

                {/* Narrative Details Block */}
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block">
                      Category: {selectedProject.category}
                    </span>
                    <h2 className="text-3xl font-sans font-bold text-white tracking-tighter uppercase leading-none">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <hr className="border-white/10" />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Editorial Details */}
                    <div className="md:col-span-8 space-y-4">
                      <h4 className="text-xs font-mono text-white/40 uppercase tracking-[0.15em]">
                        Context & Creative Direction
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line font-light">
                        {selectedProject.details || selectedProject.description}
                      </p>
                    </div>

                    {/* Metadata column */}
                    <div className="md:col-span-4 bg-white/5 border border-white/10 p-6 rounded-2xl space-y-5 h-fit">
                      <div>
                        <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.15em] mb-2 block">
                          Dynamic Tools used
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono text-white/80 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedProject.videoUrl && (
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-[9px] font-mono text-white/30 uppercase block mb-1">
                            Integrations
                          </span>
                          <span className="text-white/60 text-xs font-medium block">
                            Embedded Streaming Video
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Client-Approved Photographic Lightbox Modal for Graphic Design */}
      <AnimatePresence>
        {selectedGraphicImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-hidden"
            onClick={() => setSelectedGraphicImageIdx(null)}
          >
            {/* Elegant Minimalist Close Button in top right */}
            <button
              onClick={() => setSelectedGraphicImageIdx(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all duration-300 pointer-events-auto cursor-pointer shadow-lg"
              title="Close Gallery (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation slide arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGraphicImageIdx((prev) => 
                  prev !== null ? (prev === 0 ? graphicDesignImages.length - 1 : prev - 1) : null
                );
              }}
              className="absolute left-6 z-50 p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all pointer-events-auto cursor-pointer"
              title="Previous Photo (←)"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right navigation slide arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGraphicImageIdx((prev) => 
                  prev !== null ? (prev === graphicDesignImages.length - 1 ? 0 : prev + 1) : null
                );
              }}
              className="absolute right-6 z-50 p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all pointer-events-auto cursor-pointer"
              title="Next Photo (→)"
            >
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scale-in photo body with active transition indicator */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 28 }}
              className="relative max-w-full max-h-[85vh] flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={graphicDesignImages[selectedGraphicImageIdx]}
                alt={`Expanded Graphic Design Piece ${selectedGraphicImageIdx + 1}`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] pointer-events-auto"
              />
              
              {/* Image counting pill indicator */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur text-[10px] font-mono text-white/50 tracking-wider">
                {selectedGraphicImageIdx + 1} / {graphicDesignImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
