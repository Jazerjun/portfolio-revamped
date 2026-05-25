import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Database, 
  Sliders, 
  MapPin, 
  CloudSun, 
  Clock, 
  Sparkles, 
  Activity, 
  FileSpreadsheet,
  ChevronRight
} from "lucide-react";

// Types for our simulator Scenarios
interface DCOScenario {
  id: string;
  name: string;
  persona: string;
  triggerDetails: {
    location: string;
    weather: string;
    temperature: string;
    timeOfDay: string;
  };
  adAssets: {
    title: string;
    accent: string;
    cta: string;
    bgColor: string;
    imageUrl: string;
  };
  metrics: {
    clickProbability: string;
    variantId: string;
    activeFeeds: number;
    ctrUplift: string;
  };
  rules: string[];
}

const SCENARIOS: DCOScenario[] = [
  {
    id: "scen-warm-fitness",
    name: "Summer Fitness Push",
    persona: "Active Gym-Goers & Outdoor Runners",
    triggerDetails: {
      location: "Sydney, NSW",
      weather: "Sunny / Clear",
      temperature: "31°C",
      timeOfDay: "07:30 AM",
    },
    adAssets: {
      title: "BEAT THE HEAT.",
      accent: "Live from Sydney • Fresh Hydro Gear Storefront Near You",
      cta: "Find Cold Refreshments",
      bgColor: "from-orange-500/10 to-transparent",
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
    },
    metrics: {
      clickProbability: "4.82%",
      variantId: "VAR-SYD-SUNNY-FIT-07a",
      activeFeeds: 3,
      ctrUplift: "+38.4%",
    },
    rules: [
      "IF Temperature > 28°C",
      "IF LocalTime BETWEEN 06:00 AND 10:00",
      "SERVE variant_hero_id = 'SydSummerFit'",
      "SERVE regional_locator = 'Sydney Central'"
    ]
  },
  {
    id: "scen-cozy-office",
    name: "Rainy Day Comforts",
    persona: "Remote Office Workforce & Coffee Seekers",
    triggerDetails: {
      location: "Melbourne, VIC",
      weather: "Heavy Rain / Wind",
      temperature: "12°C",
      timeOfDay: "02:15 PM",
    },
    adAssets: {
      title: "DESK GRIND REDEFINED.",
      accent: "Warm Brews & Cozy Soundscapes • Melbourne Delivery Available",
      cta: "Order Warm Comforts",
      bgColor: "from-blue-500/10 to-transparent",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    },
    metrics: {
      clickProbability: "6.15%",
      variantId: "VAR-MELB-RAIN-OFFICE-02p",
      activeFeeds: 4,
      ctrUplift: "+54.1%",
    },
    rules: [
      "IF Weather == 'Rainy' OR 'Cold'",
      "IF Audience_Tag == 'Office_Professional'",
      "SERVE variant_hero_id = 'MelbourneWarmComforts'",
      "INJECT custom_delivery_api = 'UberEatsMelbourne'"
    ]
  },
  {
    id: "scen-midnight-sale",
    name: "Midnight Urgency Promo",
    persona: "Tech-Savvy / Gamers & Night Owl Shoppers",
    triggerDetails: {
      location: "Brisbane, QLD",
      weather: "Cool Night",
      temperature: "19°C",
      timeOfDay: "11:45 PM",
    },
    adAssets: {
      title: "MIDNIGHT FLASH ACCESS.",
      accent: "Exclusive Drop Ends in 15 Minutes • Live QLD Server Queue Status",
      cta: "Claim 40% Off",
      bgColor: "from-purple-500/10 to-transparent",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    },
    metrics: {
      clickProbability: "7.89%",
      variantId: "VAR-QLD-MIDNIGHT-FLASH-11p",
      activeFeeds: 2,
      ctrUplift: "+61.7%",
    },
    rules: [
      "IF Hour == 23 AND Minute > 30",
      "IF Device_OS == 'iOS' OR 'Android'",
      "SERVE variant_hero_id = 'MidnightNeonUrgency'",
      "TOGGLE pulse_banner_animation = TRUE"
    ]
  },
  {
    id: "scen-brunch-luxe",
    name: "Sunday Organic Lifestyle",
    persona: "Aesthetic Design lovers & Organic Foodies",
    triggerDetails: {
      location: "Perth, WA",
      weather: "Golden Hour Warmth",
      temperature: "24°C",
      timeOfDay: "10:10 AM",
    },
    adAssets: {
      title: "SOURCED FRESH DAILY.",
      accent: "Aesthetic Dining Hubs Map Checked • Perth WA Local Roastery",
      cta: "Reserve Brunch Spot",
      bgColor: "from-emerald-500/10 to-transparent",
      imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=80",
    },
    metrics: {
      clickProbability: "5.10%",
      variantId: "VAR-PERTH-SUNDAY-DELUXE-10a",
      activeFeeds: 3,
      ctrUplift: "+29.5%",
    },
    rules: [
      "IF DayOfWeek == 'Sunday'",
      "IF Audience_Subcategory == 'Gourmet_Lifestyle'",
      "SERVE variant_hero_id = 'OrganicSundayPerth'",
      "SET cta_path = '/places/brunch/wa_perth'"
    ]
  }
];

export default function DCOWorkbench() {
  const [activeScenario, setActiveScenario] = useState<DCOScenario>(SCENARIOS[0]);
  const [aspectRatioMode, setAspectRatioMode] = useState<"16:9" | "9:16" | "1:1">("16:9");

  // Helper simulated triggers on click
  const handleScenarioChange = (scenario: DCOScenario) => {
    setActiveScenario(scenario);
  };

  return (
    <div className="space-y-16">
      
      {/* Dynamic Intro Block */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Abstract background ambient aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                Dynamic Creative Optimization (DCO)
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight uppercase leading-tight">
              Hyper-Localized Dynamic Ad Delivery Architecture
            </h3>
            
            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
              At <strong className="font-semibold text-white">Clinch</strong>, my DCO implementation transforms static campaigns into real-time personalized engines. By writing backend rule structures, connecting multi-channel location/weather data, and auto-orchestrating design variables, a single master graphic is compiled into hundreds of personalized variants dynamically.
            </p>

            <p className="text-white/45 text-xs font-mono">
              ★ SYSTEM HIGHLIGHT: Tested with instant temperature sensors, localized geofencing coordinates, and demographic payload structures.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
              <div className="text-[#D4AF37] font-mono text-xl font-bold mb-1">2,400+</div>
              <div className="text-white/80 font-sans text-xs font-medium uppercase tracking-wider">Dynamic Variants</div>
              <p className="text-white/40 text-[10px] mt-1 font-light">Processed per template feed hourly.</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
              <div className="text-purple-400 font-mono text-xl font-bold mb-1">54.1%</div>
              <div className="text-white/80 font-sans text-xs font-medium uppercase tracking-wider font-semibold">Max CTR Uplift</div>
              <p className="text-white/40 text-[10px] mt-1 font-light">Observed under rain triggered banners.</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
              <div className="text-blue-400 font-mono text-xl font-bold mb-1">0.02s</div>
              <div className="text-white/80 font-sans text-xs font-medium uppercase tracking-wider">Compile Time</div>
              <p className="text-white/40 text-[10px] mt-1 font-light">Dynamic asset assembly with zero crop.</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider">Online & Verified</span>
              </div>
              <div className="text-white/45 text-[10px] font-mono">Clinch Engine SDK & API Gateway synced.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confidentiality Notice & Sandbox Disclaimer */}
      <div className="bg-[#ffaa00]/5 border border-[#ffaa00]/15 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="bg-[#ffaa00]/10 border border-[#ffaa00]/20 rounded-xl p-3 flex-shrink-0">
            <Cpu className="w-5 h-5 text-[#ffaa00]" />
          </div>
          <div className="space-y-1 flex-grow">
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-[#ffaa00] font-bold">
              Confidentiality Notice // Simulation Preview
            </h4>
            <p className="text-white/60 text-xs font-light leading-relaxed max-w-4xl">
              This interactive suite is a <strong>generic simulation preview</strong> illustrating my expertise in structural logic, multi-aspect layout orchestration, and custom feed automation. To maintain strict client confidentiality, no source code, proprietary databases, or actual live campaign configurations from <strong>Clinch</strong> are accessed, executed, or simulated here. All metrics, datasets, and scenarios are fully synthetic, independent sandboxed assets.
            </p>
          </div>
        </div>
      </div>

      {/* CORE INTERACTIVE SANDBOX EXPERIMENT */}
      <div className="space-y-8">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
            Interactive Showcase Simulator // Experiment Real-time
          </h4>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
            Clinch Dynamic Creative Composer
          </h3>
          <p className="text-white/40 text-sm font-light">
            Select an incoming real-world data scenario below to observe how the ad canvas auto-corrects copy, ratios, and content without manual code.
          </p>
        </div>

        {/* Action controls grid config */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: TRIGGERS CONTROLLER */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. SCENARIO SELECTOR */}
            <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Sliders className="w-4 h-4" />
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">
                  Select Context Scenario 
                </span>
              </div>
              <div className="space-y-2.5">
                {SCENARIOS.map((scenario) => {
                  const isSelected = activeScenario.id === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleScenarioChange(scenario)}
                      className={`w-full text-left p-4 rounded-xl border transition-all pointer-events-auto cursor-pointer flex flex-col gap-1.5 ${
                        isSelected 
                          ? "bg-white text-black border-transparent shadow-lg"
                          : "bg-black/30 border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {scenario.name}
                        </span>
                        {isSelected && (
                          <span className="bg-black text-[9px] text-[#D4AF37] font-mono px-2 py-0.5 rounded uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-mono ${isSelected ? "text-black/60" : "text-white/30"}`}>
                        Target: {scenario.persona}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. INCOMING CLIENT SENSORS LOG */}
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-white/75">
                <Cpu className="w-4 h-4" />
                <span className="text-[10px] uppercase font-mono tracking-wider">
                  Target Live Sensor Feed
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pb-2 border-b border-white/5">
                <div className="bg-black/50 border border-white/5 p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase text-white/40">Location Trigger</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-xs font-semibold text-white font-mono leading-none">{activeScenario.triggerDetails.location}</span>
                  </div>
                </div>
                <div className="bg-black/50 border border-white/5 p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase text-white/40">Weather Condition</span>
                  <div className="flex items-center gap-1.5">
                    <CloudSun className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-xs font-semibold text-white font-mono leading-none">{activeScenario.triggerDetails.weather}</span>
                  </div>
                </div>
                <div className="bg-black/50 border border-white/5 p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase text-white/40">Temp Reading</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#D4AF37] font-mono leading-none">{activeScenario.triggerDetails.temperature}</span>
                  </div>
                </div>
                <div className="bg-black/50 border border-white/5 p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase text-white/40">Evaluation Clock</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-300" />
                    <span className="text-xs font-semibold text-white font-mono leading-none">{activeScenario.triggerDetails.timeOfDay}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Logic Diagnostics */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase text-white/30">clinch_engine_eval.sh log:</div>
                <div className="p-3 bg-black rounded-lg border border-white/5 font-mono text-[10px] text-emerald-400 space-y-1">
                  {activeScenario.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* MIDDLE DISPLAY: NO-CROP AD BANNER PREVIEW STAGE */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              
              {/* STAGE HEADER WITH RATIO CONTROLS */}
              <div className="bg-black/60 border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white/70">
                    Active Preview Monitor
                  </span>
                </div>

                {/* Grid Sizing layout tabs to show how we proportion grid without any cropping */}
                <div className="flex bg-black border border-white/10 rounded-full p-1 gap-1">
                  {(["16:9", "1:1", "9:16"] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatioMode(ratio)}
                      className={`px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all pointer-events-auto cursor-pointer ${
                        aspectRatioMode === ratio
                          ? "bg-[#D4AF37] text-black font-semibold shadow-inner"
                          : "text-white/45 hover:text-white"
                      }`}
                    >
                      {ratio === "16:9" ? "Web Desktop (16:9)" : ratio === "1:1" ? "Square Feed (1:1)" : "Mobile Story (9:16)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIVE DYNAMIC CANVAS DISPLAY STAGE */}
              <div className="bg-[#050505] p-12 flex items-center justify-center min-h-[480px] select-none relative">
                {/* Visual Grid Backdrop simulating layout guide */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                
                {/* THE AD CANVAS ELEMENT */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeScenario.id}-${aspectRatioMode}`}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className={`bg-neutral-950 border border-white/15 rounded-xl overflow-hidden shadow-2xl relative flex flex-col transition-all duration-300 ${
                      aspectRatioMode === "16:9" 
                        ? "w-full max-w-2xl aspect-video" 
                        : aspectRatioMode === "1:1" 
                          ? "w-[360px] h-[360px]" 
                          : "w-[270px] h-[480px]"
                    }`}
                  >
                    
                    {/* Background Dynamic Visual Asset: Swapped dynamically */}
                    <div className="absolute inset-0 bg-black">
                      <img 
                        src={activeScenario.adAssets.imageUrl} 
                        alt="Dynamic DCO Campaign Visual"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-60 mix-blend-normal transition-opacity duration-500 scale-100"
                      />
                      {/* Ambient color gradient mapped to scenario dynamic theme */}
                      <div className={`absolute inset-0 bg-gradient-to-t via-black/50 ${activeScenario.adAssets.bgColor} transition-colors duration-500`} />
                    </div>

                    {/* Logo Plate Top End Screen Overlay */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#D4AF37] flex items-center justify-center text-black font-serif text-[11px] font-bold">
                        C
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white">
                        CLINCH ENGINE
                      </span>
                    </div>

                    {/* Top Right Live Sync Status */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur border border-white/15 px-2.5 py-1 rounded text-[8px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AUTO-ALIGNED
                    </div>

                    {/* Dynamic Layout Content Panel (Repositioned cleanly based on aspect ratio) */}
                    <div className={`mt-auto p-6 z-10 space-y-4 flex flex-col ${
                      aspectRatioMode === "16:9"
                        ? "max-w-[85%]"
                        : "max-w-full"
                    }`}>
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">
                          Scenario Mapped Accent
                        </span>
                        
                        <h2 className={`font-sans font-extrabold text-white uppercase tracking-tight leading-none ${
                          aspectRatioMode === "16:9"
                            ? "text-3xl md:text-4xl"
                            : "text-2xl"
                        }`}>
                          {activeScenario.adAssets.title}
                        </h2>
                        
                        <p className="text-white/80 font-mono text-[9px] uppercase tracking-wide">
                          {activeScenario.adAssets.accent}
                        </p>
                      </div>

                      {/* CTA Button Overlay with arrow */}
                      <div className="pt-2">
                        <button className="bg-white hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer text-black text-[9px] uppercase font-mono tracking-widest px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold pointer-events-auto shadow-lg shadow-black/40">
                          <span>{activeScenario.adAssets.cta}</span>
                          <span className="text-[11px] font-sans font-bold">→</span>
                        </button>
                      </div>

                    </div>

                    {/* Footer specifications badge */}
                    <div className="absolute bottom-2 right-4 text-[7px] font-mono text-white/30 tracking-tight z-15">
                      VAR: {activeScenario.metrics.variantId}
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>

              {/* REAL-TIME OPTIMIZATION METRICS LOG COMPOSER */}
              <div className="bg-black/80 border-t border-white/10 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-[9px] font-mono uppercase text-white/40">Computed Variant ID</div>
                  <div className="text-sm font-semibold text-white font-mono">{activeScenario.metrics.variantId}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-mono uppercase text-white/40">Click-Through Ratio (CTR)</div>
                  <div className="text-sm font-semibold text-purple-400 font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-purple-500" />
                    {activeScenario.metrics.clickProbability}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-mono uppercase text-white/40">Estimated Conversion Uplift</div>
                  <div className="text-sm font-semibold text-[#D4AF37] font-mono">{activeScenario.metrics.ctrUplift}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-mono uppercase text-white/40">Active Feed Synced Columns</div>
                  <div className="text-sm font-semibold text-white font-mono flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-500" />
                    {activeScenario.metrics.activeFeeds} Feeds
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SECURE MOCK FEED DATABASE TABLE */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic Asset Spreadsheet Matrix</h4>
              <p className="text-white/40 text-xs font-light">The actual background database row processed by Clinch based on the target API.</p>
            </div>
          </div>
          <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] font-mono text-white/40">
            db_sync_active: true
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase text-[9px] tracking-wide">
                <th className="py-3 px-4">Scenario Ref</th>
                <th className="py-3 px-4">Weather Filter</th>
                <th className="py-3 px-4">Target Audience Segment</th>
                <th className="py-3 px-4">Title Asset Hook</th>
                <th className="py-3 px-4">CTA Route</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((scen) => {
                const isActive = activeScenario.id === scen.id;
                return (
                  <tr 
                    key={scen.id}
                    onClick={() => setActiveScenario(scen)}
                    className={`border-b border-white/5 cursor-pointer transition-colors ${
                      isActive 
                        ? "bg-white/5 text-white" 
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-[#D4AF37]">{scen.metrics.variantId.split("-")[1] || scen.id}</td>
                    <td className="py-3 px-4">{scen.triggerDetails.weather} ({scen.triggerDetails.temperature})</td>
                    <td className="py-3 px-4">{scen.persona}</td>
                    <td className="py-3 px-4 truncate max-w-xs">"{scen.adAssets.title}"</td>
                    <td className="py-3 px-4">{scen.adAssets.cta}</td>
                    <td className="py-3 px-4">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                          ● RUNNING
                        </span>
                      ) : (
                        <span className="text-white/20">READY</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
