/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  Film, 
  Layers, 
  Video, 
  Palette, 
  Compass, 
  Flame, 
  Monitor, 
  Share2, 
  Tv2 
} from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // 1-100 scale index
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILLS_DATABASE: SkillCategory[] = [
  {
    title: "Core Disciplines",
    skills: [
      { name: "Video Editing", level: 95, icon: <Film className="w-4 h-4 text-sky-400" /> },
      { name: "Motion Graphics", level: 92, icon: <Layers className="w-4 h-4 text-sky-400" /> },
      { name: "Videography", level: 88, icon: <Video className="w-4 h-4 text-sky-400" /> },
      { name: "Graphic Design", level: 85, icon: <Palette className="w-4 h-4 text-sky-400" /> },
    ],
  },
  {
    title: "Strategic & Directing",
    skills: [
      { name: "Creative Direction", level: 90, icon: <Compass className="w-4 h-4 text-indigo-400" /> },
      { name: "DCO Advertising", level: 94, icon: <Tv2 className="w-4 h-4 text-indigo-400" /> },
      { name: "Branding & Identity", level: 84, icon: <Flame className="w-4 h-4 text-indigo-400" /> },
      { name: "UI/UX Prototyping", level: 80, icon: <Monitor className="w-4 h-4 text-indigo-400" /> },
      { name: "Social Ad Content", level: 90, icon: <Share2 className="w-4 h-4 text-indigo-400" /> },
    ],
  }
];

const SOFTWARE_STACK = [
  { name: "Premiere Pro", desc: "Long-form narrative & offline editing", levelString: "Master", pct: 96 },
  { name: "After Effects", desc: "Sleek motion design & complex DCO sheets", levelString: "Master", pct: 94 },
  { name: "Photoshop", desc: "Asset preparation & visual textures", levelString: "Advanced", pct: 90 },
  { name: "Illustrator", desc: "Vector graphics & clean identity designs", levelString: "Advanced", pct: 86 }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#080808] border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block border-l-2 border-white/20 pl-3 w-fit mx-auto">
            Core Toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tighter uppercase leading-none">
            Skills & Software Stack
          </h2>
          <p className="text-white/45 max-w-lg mx-auto font-light text-sm leading-relaxed">
            A precise synthesis of elite creative narrative techniques combined with cutting edge design software packages.
          </p>
        </div>

        {/* Bento Grid Concept */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Skill Bars Categories (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {SKILLS_DATABASE.map((category, catIdx) => (
              <div 
                key={category.title}
                className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8 relative space-y-6"
              >
                <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-white/60 border-b border-white/5 pb-3">
                  {category.title}
                </h3>

                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-white/70 font-light">
                          {skill.icon}
                          <span className="font-light">{skill.name}</span>
                        </div>
                        <span className="text-white/40 font-mono text-xs">{skill.level}%</span>
                      </div>
                      
                      {/* Meter frame */}
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-white/75 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Key Software Suite Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-white/60 border-b border-white/5 pb-3">
                Primary Software Suite
              </h3>

              <div className="space-y-4">
                {SOFTWARE_STACK.map((sw, idx) => (
                  <motion.div
                    key={sw.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.01, borderColor: "rgba(255, 255, 255, 0.2)" }}
                    className="p-4 bg-white/[0.01] rounded-xl border border-white/5 flex justify-between items-center gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-white block">{sw.name}</span>
                      <span className="text-white/40 text-xs block leading-relaxed font-light">{sw.desc}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-medium text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded uppercase tracking-wider">
                        {sw.levelString}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Micro Apple-like Quote card */}
            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />
              <p className="text-xs text-white/45 italic relative z-10 leading-relaxed font-sans font-light">
                "The tool doesn't dictate the artistry; it simply materializes the speed at which ideas convert into dynamic visual emotions."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
