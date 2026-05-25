/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Award, Briefcase, Video, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const stats = [
    {
      icon: <Briefcase className="w-6 h-6 text-sky-400" />,
      value: "6+ Years",
      label: "Professional Experience",
      description: "Directing, editing, and motion design.",
    },
    {
      icon: <Video className="w-6 h-6 text-sky-400" />,
      value: "International",
      label: "Global Client base",
      description: "Delivering world-class assets globally.",
    },
    {
      icon: <Award className="w-6 h-6 text-sky-400" />,
      value: "Specialization",
      label: "Motion Graphics Expert",
      description: "Creative advertising and cinematic stories.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-400" />,
      value: "Dynamic scale",
      label: "Creative Campaign Leader",
      description: "High-performing dynamic asset scaling.",
    },
  ];

  const highlights = [
    "Expertise in Dynamic Creative Optimization (DCO) and targeted ads.",
    "Proven track record coordinating with Australian, US, and local agencies.",
    "Comprehensive full post-production loop (offline/online edit, audio, and grade).",
    "Creative direction spanning historical documentaries, commercials, & short films.",
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-white/10 bg-[#080808]">
      {/* Absolute Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Column 1: Core Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block border-l-2 border-white/20 pl-3">
                Creative Mind
              </span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-white uppercase leading-none">
                Cinematic Vision. <br />
                <span className="text-white/50">
                  Technical Precision.
                </span>
              </h2>
            </div>

            <p className="text-white/70 text-lg leading-relaxed font-light">
              I am Jazerjun Buenafe, a senior Multimedia Artist with 6+ years of technical experience in crafting premium motion design, directing high-impact visual stories, and launching optimized commercial creatives.
            </p>

            <p className="text-white/40 leading-relaxed text-sm font-light">
              My background integrates the creative chaos of cinematic direction with the strict optimization mechanics of programmatic advertising. I bridge the gap between human aesthetics and dynamic delivery layouts.
            </p>

            {/* Quick Points Grid */}
            <div className="space-y-3.5 pt-4">
              {highlights.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-1" />
                  <span className="text-white/70 text-sm font-light leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Interactive Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 255, 255, 0.2)" }}
                className="bg-[#0b0b0b] backdrop-blur-md border border-white/5 rounded-2xl p-8 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Background glow decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-2xl group-hover:bg-white/[0.03] transition-colors" />
                
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 w-fit rounded-lg border border-white/10 text-white/70">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-sans font-bold text-white tracking-tight leading-none uppercase">
                      {stat.value}
                    </h3>
                    <p className="text-white/45 text-xs font-mono uppercase tracking-[0.15em] mt-2">
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed font-light">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
