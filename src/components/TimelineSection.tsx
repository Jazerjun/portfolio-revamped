/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { Experience } from "../types";

const EXPERIENCE_TIMELINE: Experience[] = [
  {
    id: "animalhouse",
    company: "Animal House Fitness",
    role: "Marketing Associate / Video Creator",
    duration: "2025 - Present",
    description: [
      "Design and edit short-form high-engagement social media marketing videos.",
      "Plan and execute full digital media assets supporting critical fitness product launches.",
    ],
    tags: ["Short-form Marketing", "Videography", "Creative Copywriting"],
  },
  {
    id: "clinch",
    company: "Emapta Philippines (Clinch)",
    role: "Creative Account Manager / Motion Designer",
    duration: "2024 - Present",
    description: [
      "Orchestrate dynamic advertising campaigns and DCO initiatives globally.",
      "Design personalized video creatives for major international clients including SharkNinja.",
      "Integrate programmatic variables and data triggers directly into high-fidelity video templates.",
    ],
    tags: ["DCO Advertising", "After Effects", "Campaign Management", "Motion Design"],
  },
  {
    id: "shootsta",
    company: "Outsourced Quality Assured Services (Shootsta AU)",
    role: "Video Editor & Designer",
    duration: "2022 - 2024",
    description: [
      "Crafted high-impact B2B marketing videos and corporate narratives for corporate Australian partners.",
      "Integrated key motion graphics, animated typographic layouts, and complex data visuals.",
      "Supported clients' brand consistency with clean, premium vector adjustments.",
    ],
    tags: ["Video Editing", "Motion Graphics", "B2B Marketing", "Corporate Branding"],
  },
  {
    id: "flowz",
    company: "Office Beacon Philippines (Flowz)",
    role: "Multimedia Specialist",
    duration: "2021 - 2022",
    description: [
      "Developed internal and external marketing content, training sequences, and internal video communications.",
      "Assisted with basic branding packages, vector illustration collections, and logo animation guidelines.",
    ],
    tags: ["Multimedia Asset Creation", "Corporate Messaging", "Branding"],
  },
  {
    id: "nichecanvas",
    company: "NicheCanvas",
    role: "Freelance Motion Designer",
    duration: "2021",
    description: [
      "Created sleek, rapid-turnaround User Generated Content (UGC) and product-focused advertising videos.",
      "Developed visual transitions and simulated lighting systems to emphasize canvas product quality.",
      "Maximized click-through performance with high-energy narrative pacing.",
    ],
    tags: ["UGC Campaigns", "Motion Design", "Commercial Ads", "After Effects"],
  },
  {
    id: "httv",
    company: "HTTV Korea Entertainment",
    role: "Creative Director",
    duration: "2020 - 2022",
    description: [
      "Led video production teams through high-budget historical documentaries and narrative short films.",
      "Directed on-location shoots, managed crew structures, and supervised post-production assemblies.",
      "Elevated storytelling standards leading to robust organic viewership across streaming platforms.",
    ],
    tags: ["Creative Direction", "Directing", "Team Leadership", "Storyboarding"],
  }
];

export default function TimelineSection() {
  return (
    <section id="experience" className="py-24 bg-[#080808] border-t border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.005] to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block border-l-2 border-white/20 pl-3 w-fit mx-auto">
            Milestones
          </span>
          <h2 className="text-4xl font-bold text-white tracking-tighter uppercase leading-none">
            Professional Timeline
          </h2>
          <p className="text-white/45 max-w-lg mx-auto font-light text-sm leading-relaxed">
            A journey of over 6 years crafting cinematic digital workflows, serving international clients, and driving dynamic creative campaigns.
          </p>
        </div>

        {/* Timeline Path Wire */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12">
          {EXPERIENCE_TIMELINE.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Chronological Side Pill - Desktop Only */}
              <div className="absolute left-0 -translate-x-full pr-12 hidden md:block text-right w-32 top-1">
                <span className="text-xs font-mono font-medium tracking-wider text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                  {role.duration}
                </span>
              </div>

              {/* Glowing Indicator Node */}
              <div className="absolute left-0 -translate-x-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#080808] border border-white/40 shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:border-white transition-colors duration-300" />

              <div className="bg-[#0b0b0b] backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/15 transition-all duration-300 relative">
                {/* Mobile Duration tag */}
                <div className="flex items-center gap-2 text-white/60 text-xs font-mono mb-3 md:hidden">
                  <Calendar className="w-3.5 h-3.5 text-white/50" />
                  <span>{role.duration}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white transition-colors">
                      {role.role}
                    </h3>
                    <p className="text-sm text-white/45 font-mono uppercase tracking-wider mt-1">
                      {role.company}
                    </p>
                  </div>
                </div>

                {/* Duty Bullets */}
                <ul className="space-y-3.5 text-white/60 text-sm mb-6 leading-relaxed font-light">
                  {role.description.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags Pillbox */}
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/60 bg-white/5 px-2.5 py-1 rounded border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
