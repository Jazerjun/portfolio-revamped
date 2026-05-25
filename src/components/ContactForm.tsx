/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Linkedin, Phone, MapPin, Copy, Check, ExternalLink } from "lucide-react";

export default function ContactForm() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const contactDetails = {
    phone: "+63 976 2182441",
    email: "buenafejazerjun@gmail.com",
    linkedin: "https://linkedin.com/in/jazerjun-buenafe/",
    linkedinLabel: "linkedin.com/in/jazerjun-buenafe/",
    location: "Metro Manila, Philippines"
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#080808] border-t border-white/10">
      {/* Cinematic Ambient Background Ellipses */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="space-y-16">
          
          {/* Header Introduction Block */}
          <div className="text-center space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#D4AF37] inline-block border-b border-[#D4AF37]/30 pb-1.5">
              Available for Collaboration
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tighter uppercase leading-none block">
              Get In Touch
            </h2>
            <p className="text-white/40 text-sm font-light max-w-xl mx-auto leading-relaxed">
              Let's craft something exceptional. Reach out directly through any of the channels below to discuss motion design, creative direction, or ad automation projects.
            </p>
          </div>

          {/* Elegant About & Contact details grid */}
          <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-8 md:p-12 relative shadow-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
              
              {/* Left Wing: Professional Summary / Pitch */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
                    About Jazerjun
                  </h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    I am a highly focused multimedia artist, motion designer, and ad-tech developer crafting pixel-perfect dynamic creative optimization (DCO) frameworks and high-impact cinematic assets. Let's optimize your messaging, automate your scaling pipelines, or build highly immersive brand identities.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
                  <span>METRO MANILA, PH</span>
                  <span>UTC +8:00</span>
                </div>
              </div>

              {/* Right Wing: Interactive detail rows */}
              <div className="space-y-4 flex flex-col justify-center">
                
                {/* Email Channel Block */}
                <div className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white/70">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-white/40 uppercase block">Email Address</span>
                        <a 
                          href={`mailto:${contactDetails.email}`}
                          className="text-sm font-light text-white hover:text-[#D4AF37] transition-colors block"
                        >
                          {contactDetails.email}
                        </a>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleCopy(contactDetails.email, "email")}
                      className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all cursor-pointer pointer-events-auto"
                      title="Copy Email Address"
                    >
                      {copiedText === "email" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Telephone Channel Block */}
                <div className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white/70">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-white/40 uppercase block">Phone Number</span>
                        <a 
                          href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                          className="text-sm font-light text-white hover:text-[#D4AF37] transition-colors block"
                        >
                          {contactDetails.phone}
                        </a>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleCopy(contactDetails.phone, "phone")}
                      className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all cursor-pointer pointer-events-auto"
                      title="Copy Phone Number"
                    >
                      {copiedText === "phone" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* LinkedIn Channel Block */}
                <div className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white/70">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-white/40 uppercase block">LinkedIn Profile</span>
                        <a 
                          href={contactDetails.linkedin}
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm font-light text-white hover:text-[#D4AF37] transition-colors block"
                        >
                          {contactDetails.linkedinLabel}
                        </a>
                      </div>
                    </div>
                    
                    <a
                      href={contactDetails.linkedin}
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all cursor-pointer pointer-events-auto"
                      title="Open LinkedIn Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Location Channel Block */}
                <div className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white/70">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-white/40 uppercase block">Location</span>
                        <span className="text-sm font-light text-white block">
                          {contactDetails.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Copying tooltip notification block */}
          {copiedText && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-[#D4AF37] text-black text-xs font-mono font-bold rounded-lg shadow-lg uppercase tracking-wider animate-bounce">
              Copied {copiedText === "email" ? "Email Address" : "Phone Number"}!
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
