/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitMessage } from "../portfolioService";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const validateEmail = (email: string) => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus("error");
      setErrorText("Please fill out all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setSubmitStatus("error");
      setErrorText("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorText("");

    try {
      await submitMessage(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to submit client message:", err);
      setSubmitStatus("error");
      setErrorText("Could not deliver your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#080808] border-t border-white/10">
      
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Column 1: Editorial text details & details info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block border-l-2 border-white/20 pl-3">
                Inquire
              </span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tighter uppercase leading-none">
                Let's Craft Something <br />
                <span className="text-white/60">
                  Exceptional
                </span>
              </h2>
            </div>

            <p className="text-white/45 text-sm leading-relaxed font-light">
              Seeking dynamic ad automation scaling, bespoke cinematography workflows, motion assets, or full campaign strategizing? Fill out the portal. I typically respond within 24 business hours.
            </p>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                Direct Channels
              </h4>
              
              <div className="space-y-3">
                <a 
                  href="mailto:buenafejazerjun@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors py-1 group pointer-events-auto"
                >
                  <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5 shrink-0 group-hover:border-white/20">
                    <Mail className="w-4 h-4 text-white/80" />
                  </div>
                  <span className="text-sm font-light">buenafejazerjun@gmail.com</span>
                </a>

                <a 
                  href="https://linkedin.com/in/jazerjun-buenafe/"
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors py-1 group pointer-events-auto"
                >
                  <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5 shrink-0 group-hover:border-white/20">
                    <Linkedin className="w-4 h-4 text-white/80" />
                  </div>
                  <span className="text-sm font-light">linkedin.com/in/jazerjun-buenafe/</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Minimalist Contact inputs portal */}
          <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/5 rounded-3xl p-8 md:p-10 relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 block">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. David Harrison"
                    className="w-full bg-black border border-white/10 focus:border-white/30 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors cursor-text pointer-events-auto"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 block">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="david@company.com"
                    className="w-full bg-black border border-white/10 focus:border-white/30 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors cursor-text pointer-events-auto"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 block">
                  Project Inquiry details
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your dynamic campaign goals, timelines, or videography scope."
                  className="w-full bg-black border border-white/10 focus:border-white/30 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors resize-none cursor-text pointer-events-auto"
                />
              </div>

              {/* Status Feedbacks banner */}
              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3 text-sm animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="font-light">Success! Your inquiry has been submitted securely. Let's speak soon.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="font-light">{errorText}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white hover:bg-neutral-200 text-black font-semibold uppercase tracking-wider py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer pointer-events-auto ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "shadow-md hover:shadow-lg"
                }`}
              >
                <span className="text-xs font-mono tracking-wider">{isSubmitting ? "Submitting..." : "Send Inquiry"}</span>
                <Send className="w-4 h-4 ml-1" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
