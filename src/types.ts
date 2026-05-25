/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  details?: string;
  category: "all" | "branding_suite" | "film_video" | "motion" | "graphic_design" | "dco";
  thumbnailUrl: string;
  videoUrl?: string; // e.g YouTube, Vimeo, or direct video file
  tags: string[];
  isFeatured?: boolean;
  createdAt?: string | Date;
  aspectRatio?: "16:9" | "9:16" | "1:1";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}
