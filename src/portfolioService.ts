/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Project, ContactMessage } from './types';
import firebaseConfig from '../firebase-applet-config.json';

// In-Memory & LocalStorage backup database to keep application 100% functional initially
export const LOCAL_PROJECT_PRESETS: Project[] = [
  {
    id: "vid-sumpa-valfer",
    title: "Sumpa - Valfer (Official Music Video)",
    description: "Assistant Director, Motion Graphics Designer & Camera Operator for Valfer, Viva Records. Moody, high-intensity color schemes with kinetic After Effects overlays.",
    details: "Sumpa is an official music video for Viva Records artist Valfer. Taking the roles of Assistant Director, Motion Graphics Designer, and Camera Operator, we worked closely to design a moody, high-intensity color palette with neon lights matching the rhythm. Custom animated lyrics overlay and tracking lines were integrated using After Effects to elevate the storytelling and maintain consistent momentum across sequences.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Videos%2FSumpa%20-%20Valfer%20(Official%20Music%20Video).mp4?alt=media&token=946127c3-4d0a-4e8a-8e9c-054e502c9ba5",
    tags: ["Music Video", "Cinematography", "Motion Graphics", "After Effects", "Viva Records"],
    isFeatured: true
  },
  {
    id: "vid-waste-nsw",
    title: "Waste Management Awareness NSW",
    description: "Motion Graphics Animator & Video Editor for Shootsta AU. Engaging educational explainer using playful vector assets for environmental compliance.",
    details: "Commissioned by Shootsta Australia for NSW Government initiatives, this animated campaign delivers key waste management guidelines in a highly digestible format. Responsible for complete vector asset manipulation, transition choreography, and kinetic flow to guarantee state ecological guidelines resonate with citizens and community groups.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Videos%2FVWFKV5%20-%20Problem%20waste-%20No%20problem.mp4?alt=media&token=e0141f54-9472-4c24-bc1c-bda3da0fb604",
    tags: ["Motion Graphics", "Infographics", "Explainer Video", "Premiere Pro", "Shootsta AU"],
    isFeatured: true
  },
  {
    id: "vid-quaranserye",
    title: "Quaranserye - A Pandemic Series",
    description: "Creative Director, Screenplay Writer, Lead Editor & Camera Operator for HTTV Korea. Reflections on lockdowns and virtual human bonds.",
    details: "Quaranserye is a multi-episode short film series focused on the human experience inside lock-down environments. Taking the helm as Creative Director, screenplay writer, and main Editor, this production centers on high-contrast film emulation, remote communication assets, and natural soundscapes to craft a haunting but warm historical artifact.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Videos%2FQuaranserye%20-%20EP.1%20-New%20Normal-.mp4?alt=media&token=7e8079ce-f6fb-47cb-b25a-e10a107764b9",
    tags: ["Short Film", "Creative Direction", "Color Grading", "Screenplay", "HTTV Korea"],
    isFeatured: true
  },
  {
    id: "vid-freda-wish",
    title: "Freda Wish Foundation Narrative",
    description: "Lead Video Editor for Shootsta AU. Soft documentary styling and editorial flow mapping out community fundraising legacies.",
    details: "Produced through Shootsta AU, this social impact piece focuses on the legacy of the Freda Wish Foundation. Built using a warm documentary color palette, precise audio leveling for interviews, and dynamic multi-cam transitions to provide maximum emotional weight and audience engagement.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/DRWSYN%20-%20Freda%20wish%20foundation.mp4?alt=media&token=38c2b52f-0c2d-4854-99c3-1fec72de4143",
    tags: ["Social Impact", "Documentary", "Video Editing", "Interview Cuts", "Shootsta AU"],
    isFeatured: false
  },
  {
    id: "vid-monkeyfeet",
    title: "Knee Rehab with Monkeyfeet",
    description: "Video Editor & Motion Graphics Designer for Animalhouse Fitness. High-impact product demo and biomechanics tracking overlays.",
    details: "A physical therapy Explainer video showcasing fitness rehabilitation techniques with Monkeyfeet. Handles video sequencing, text tracking callouts, and clean motion layouts to break down biomechanical movement patterns clearly for athletic audiences, enhancing overall conversion.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Videos%2FPT-Approved%20Knee%20Rehab_%20How%20to%20Rebuild%20Leg%20Strength%20Safely%20After%20Injury%20%F0%9F%A6%B5.mp4?alt=media&token=93da5d2b-6621-41a2-8561-069a92ff3a11",
    tags: ["Product Demo", "Fitness Video", "Graphic Overlays", "Reconditioning", "Animalhouse Fitness"],
    isFeatured: false
  },
  {
    id: "vid-elyu-cinematic",
    title: "Elyu Cinematic Video (Film Emulation)",
    description: "Videographer, DOP, Editor & Colorist. High-end film grain, nostalgic coastal sunset memories in La Union.",
    details: "An experimental film exploring coastal tranquility using professional 16mm/35mm color grading presets and hand-held filming style. Fully engineered to evoke feelings of slow, coastal memories with soft atmospheric sound design, showing advanced mastery over color palettes and natural environments.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Videos%2Fpanatalan.mov?alt=media&token=0163239e-c789-4ffa-9f23-e31475406de4",
    tags: ["Cinematography", "Film Emulation", "Color Grading", "Travel Reel", "La Union"],
    isFeatured: true
  },
  {
    id: "vid-click-reel",
    title: "Click - Multimedia Reel",
    description: "Videographer, Video Editor & Motion Designer compilation of commercial visual effects and kinetic typography sync.",
    details: "The official multimedia compilation. This high-tempo reel highlights advanced pacing techniques, audio-beat sync, vector movement, and multiple asset layouts, designed primarily to grab prospective agency and record label attention in seconds.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1551817958-111538301a6b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Videos%2FClick%20--%20A%20Multimedia%20Reel.mp4?alt=media&token=4566de19-977d-4d25-bb8c-19071d788b8e",
    tags: ["Multimedia Reel", "Montage Editing", "Sound Design", "Showcase", "VFX"],
    isFeatured: false
  },
  {
    id: "vid-samsung-monitor",
    title: "Samsung S65VC Business Monitor",
    description: "Video Editor & Motion Designer for Samsung Business AU & Shootsta AU. Commercial speed-ramping and high-end hardware showcase.",
    details: "Produced for Samsung Business Australia through Shootsta, this commercial piece maps out critical product advantages including curved panel layouts, built-in camera integration, and desktop docking. Designed with premium high-key office settings, smooth speed-ramping, and crisp interface graphic callouts.",
    category: "film_video",
    thumbnailUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/%5BKR285P%5D%20Samsung%20S65VC%20Business%20Monitor.mp4?alt=media&token=d3ca6362-11f4-4a1c-beed-0e475cecaee8",
    tags: ["Product Launch", "Tech Commercial", "Sleek Office", "Shootsta AU", "Samsung Business"],
    isFeatured: true,
    aspectRatio: "16:9"
  },
  {
    id: "vid-smart-transportation",
    title: "Smart Transportation by NEC",
    description: "Sound Design & Motion Graphics Animator for NEC & Shootsta AU. Dynamic urban logistics visualizations and fluid vector transitions.",
    details: "Created in collaboration with Shootsta AU for global enterprise NEC, this video showcases smart city logistics and turn-by-turn routing solutions. Focused on pristine vector kinetic workflows, high-precision motion tracking, and tailored tech-centric sound design.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2FXUEPHA%20-%20Smart%20Transportation%20Turn%20by%20turn%20Sol%20Video_v11.mp4?alt=media&token=81d1125c-865f-42e4-a915-40b2b407b683",
    tags: ["Motion Graphics", "Sound Design", "Explainer Video", "After Effects", "NEC"],
    isFeatured: true,
    aspectRatio: "16:9"
  },
  {
    id: "vid-frankie-app",
    title: "Frankie App Launch Showcase",
    description: "Motion Graphics Animator, Illustrator & Sound Designer for Surga Central. Vibrant ui walkthrough and character rigging animations.",
    details: "Vibrant and engaging launch overview for the Frankie application. Developed using high-fidelity Vector animations, customized character rigs, and interface sound design to showcase Surga Central's state-of-the-art proptech platform features.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2FX5QQBH%20-%20Frankie%20Video_animation_v4.mp4?alt=media&token=efdc9299-f02d-4704-a228-18b6b4651c5a",
    tags: ["App UI Walkthrough", "Vector Rigging", "Sound Design", "Launch Video", "Surga Central"],
    isFeatured: true,
    aspectRatio: "16:9"
  },
  {
    id: "vid-success-rallies",
    title: "Success Rallies Campaign by Optus AU",
    description: "Motion Designer, Typography Expert & Video Editor for Optus AU. Energetic kinetic type choreography highlighting commercial achievements.",
    details: "A high-octane commercial campaign for Optus Enterprise Australia. Built around fast-paced kinetic typography, heavy music synchronization, and glitch VFX transitions designed to build intense employee engagement during corporate milestone summits.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2FY6GNRB%20-%20Success%20Rallies%20-%20Part%20Two%20-%20Hype%20Video_v6.mp4?alt=media&token=9091e507-799b-4cab-bc07-f4589db7058c",
    tags: ["Commercial Hype", "Kinetic Typography", "Video Editing", "After Effects", "Optus Campaign"],
    isFeatured: true,
    aspectRatio: "16:9"
  },
  {
    id: "vid-monkeyfeet-podcast",
    title: "Monkeyfeet Podcast Plug",
    description: "Storyboard Artist, 3D Sculptor & Editor for Animalhouse Fitness. Eye-catching vertical content flow engineered for social storytelling.",
    details: "An optimized 9:16 vertical podcast plugin card designed for modern social media algorithms. Focuses on seamless storyboarding, custom 3D element rendering, and rapid text overlays to hook physical therapy and athletic audiences.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2F251105%20CC%20Podcast%20MonkeyFeet%20Plug%20v1_2.mp4?alt=media&token=d96a9937-a59a-4ee8-b3f4-06b0730e029c",
    tags: ["9:16 Social Ads", "3D Rendering", "Video Podcast Hook", "Product Integration", "Animalhouse Fitness"],
    isFeatured: true,
    aspectRatio: "9:16"
  },
  {
    id: "vid-vitamin-c-ad",
    title: "Generic Vitamin C Skincare Ad",
    description: "Storyboard Developer, Motion Designer & Editor. Clean, elegant visual grids showcasing premium hydration benefits.",
    details: "A premium 9:16 vertical beauty and skincare commercial. Applying light particle simulations, clean design grids, and smooth organic pacing to communicate natural hydration, skin illumination, and vitamin-enriched benefits visually.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2FVitaminC_Ad_1080x1920.mp4?alt=media&token=0a6081bc-6e28-444d-ac60-a31b59b93359",
    tags: ["9:16 Skincare Commercial", "Product Fluidity", "Social Ad", "Storyboarding", "Aesthetic Motion"],
    isFeatured: true,
    aspectRatio: "9:16"
  },
  {
    id: "vid-nichecanvas-blackfriday",
    title: "Nichecanvas Black Friday Sale Ad",
    description: "Motion Graphics Designer & Art Producer. Intense neon flares and bold countdown animations optimized for square mobile screens.",
    details: "A high-performance 1:1 e-commerce campaign for Nichecanvas BFCM sales. Highlights include high-impact text animation, glowing neon aesthetic borders, and high-tempo artwork transitions engineered for maximum conversion on digital platforms.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2Ffinal.mp4?alt=media&token=f9cd0bde-195d-47d5-8e77-e41c96e539aa",
    tags: ["1:1 Instagram Feed", "E-commerce Ad", "Black Friday Cyber Monday", "Ad Strategy", "Nichecanvas"],
    isFeatured: true,
    aspectRatio: "1:1"
  },
  {
    id: "vid-nichecanvas-fallsale",
    title: "Nichecanvas Fall Sale Ad",
    description: "Motion Graphics Specialist & Brand Designer. Cozy autumn color boards, fluid layout frames, and gallery showcases.",
    details: "Seasonal social campaign designed in a 1:1 format. Translates the warmth of cozy autumn designs into kinetic gallery carousels, with leaf and drop-shadow styling to increase viewer retention and organic product discovery.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2FFall_Sale.mp4?alt=media&token=2a2b26b9-ed0c-4a8c-ab81-c08b13467bdb",
    tags: ["1:1 Post", "Autumn Campaign", "Carousel Motion", "Nichecanvas", "E-commerce"],
    isFeatured: true,
    aspectRatio: "1:1"
  },
  {
    id: "vid-nichecanvas-outro",
    title: "Nichecanvas Official Outro Card",
    description: "Template Architect & Motion Designer. Seamless recurring outro with elegant asset reveal plates for socials.",
    details: "A 1:1 social card loop used as the absolute end-screens on e-commerce platforms. Employs soft asset reveal boxes, social handler templates, and sleek branding triggers to drive viewer clicks on to other video reels.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2Foutro_1x1_v2.mp4?alt=media&token=377938b7-b43f-41e0-8640-96f0d0a0cb3b",
    tags: ["1:1 Outro template", "End Screen Card", "Branding Trigger", "After Effects", "Nichecanvas"],
    isFeatured: false,
    aspectRatio: "1:1"
  },
  {
    id: "vid-brodo-sizzle",
    title: "Brodo Sizzle Reel",
    description: "Motion Designer & Storyboarder for Brodo. Kinetic brand presentation with hyper-rhythmic font overlays.",
    details: "Expressive 9:16 sizzle reel built for physical retail product lines. Leverages storyboards, rapid edits, and hyper-rhythmic font overlaps to present Brodo's lifestyle message with high emotional engagement.",
    category: "motion",
    thumbnailUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Motion%20Design%2FBrodo%20Sizzle%20Reel.mp4?alt=media&token=f2560441-4751-42e1-bb11-f947d3ba71a2",
    tags: ["9:16 Social Hype", "Lifestyle Sizzle", "Commercial Reel", "Sleek Typography", "Brodo"],
    isFeatured: true,
    aspectRatio: "9:16"
  }
];

export const LOCAL_TESTIMONIALS_PRESETS = [
  {
    id: "testi-1",
    clientName: "David Harrison",
    company: "Shootsta Australia",
    role: "Senior Marketing Lead",
    feedback: "Jazerjun brings a cinematic eye combined with incredible motion graphics speed. He understands corporate briefs and consistently turns dry content into beautiful stories.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "testi-2",
    clientName: "Elena Vargova",
    company: "Clinch",
    role: "Global Creative Director",
    feedback: "His expertise with After Effects and dynamic templating was instrumental in executing our SharkNinja campaigns. He bridges technical DCO with artistic design flawlessly.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

// Helper to check if Firebase database is fully ready
function isFirebaseConfigured() {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}

// Ensure local persistence matching
const STORAGE_PROJECTS_KEY = "buenafe_portfolio_projects";
const STORAGE_MESSAGES_KEY = "buenafe_portfolio_messages";

function getLocalProjects(): Project[] {
  const data = localStorage.getItem(STORAGE_PROJECTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(LOCAL_PROJECT_PRESETS));
    return LOCAL_PROJECT_PRESETS;
  }
  try {
    const list = JSON.parse(data) as Project[];
    // Filter out old presets and invalid categories
    const oldIds = ["dentaboost", "sumpa-mv", "sharkninja-dco", "australian-b2b", "nichecanvas-ugc", "httv-documentaries"];
    const validCategories = ["all", "branding_suite", "film_video", "motion", "graphic_design", "dco"];
    const filtered = list.filter(p => !oldIds.includes(p.id) && validCategories.includes(p.category));
    
    // Ensure all 8 optimized presets exist and are fully matching latest details in local storage
    let localChanged = false;
    for (const preset of LOCAL_PROJECT_PRESETS) {
      const existingIdx = filtered.findIndex(p => p.id === preset.id);
      if (existingIdx === -1) {
        filtered.push(preset);
        localChanged = true;
      } else {
        const existing = filtered[existingIdx];
        if (existing.videoUrl !== preset.videoUrl || existing.description !== preset.description || existing.details !== preset.details) {
          filtered[existingIdx] = { ...existing, ...preset };
          localChanged = true;
        }
      }
    }

    if (filtered.length !== list.length || localChanged) {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch (e) {
    return LOCAL_PROJECT_PRESETS;
  }
}

function saveLocalProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
}

// SERVICE LAYER FOR PROJECTS

export async function fetchProjects(): Promise<Project[]> {
  if (isFirebaseConfigured()) {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const output: Project[] = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        output.push({
          id: doc.id,
          title: item.title,
          description: item.description,
          details: item.details,
          category: item.category,
          thumbnailUrl: item.thumbnailUrl,
          videoUrl: item.videoUrl,
          tags: item.tags || [],
          isFeatured: item.isFeatured || false,
          createdAt: item.createdAt ? (item.createdAt.toDate ? item.createdAt.toDate() : item.createdAt) : undefined,
          aspectRatio: item.aspectRatio || "16:9",
        });
      });

      // Synchronize/upsert our premium video projects directly in Firestore so they always exist and are up to date!
      // This solves the problem of old database records or empty database.
      let dbUpdated = false;
      for (const preset of LOCAL_PROJECT_PRESETS) {
        const existingIdx = output.findIndex(p => p.id === preset.id);
        if (existingIdx === -1) {
          console.log(`Auto-seeding new video to Firestore: ${preset.title}`);
          const ref = doc(db, "projects", preset.id);
          await setDoc(ref, {
            ...preset,
            createdAt: serverTimestamp()
          });
          output.push({
            ...preset,
            createdAt: new Date(),
          });
          dbUpdated = true;
        } else {
          const existing = output[existingIdx];
          if (
            existing.videoUrl !== preset.videoUrl || 
            existing.description !== preset.description || 
            existing.details !== preset.details ||
            existing.aspectRatio !== preset.aspectRatio
          ) {
            console.log(`Auto-updating video settings in Firestore: ${preset.title}`);
            const ref = doc(db, "projects", preset.id);
            await setDoc(ref, {
              ...existing,
              ...preset,
              createdAt: existing.createdAt || serverTimestamp()
            });
            output[existingIdx] = { ...existing, ...preset };
            dbUpdated = true;
          }
        }
      }

      // If collection is empty, backfill firestore with presets
      if (output.length === 0) {
        console.log("No projects found in Firestore. Backfilling mock projects...");
        for (const proj of LOCAL_PROJECT_PRESETS) {
          const docId = proj.id;
          const ref = doc(db, "projects", docId);
          await setDoc(ref, {
            ...proj,
            createdAt: serverTimestamp()
          });
          output.push(proj);
        }
      }
      return output;
    } catch (error) {
      console.warn("Could not load from Firestore, falling back to Local Storage:", error);
      // Don't crash - return local copy
      return getLocalProjects();
    }
  } else {
    return getLocalProjects();
  }
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const idValue = "proj_" + Math.random().toString(36).substring(2, 9);
  const now = new Date();
  const newProject: Project = { ...project, id: idValue, createdAt: now };

  if (isFirebaseConfigured()) {
    try {
      const ref = doc(db, "projects", idValue);
      await setDoc(ref, {
        ...newProject,
        createdAt: serverTimestamp()
      });
      return newProject;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `projects/${idValue}`);
    }
  }

  // Backup Local Storage
  const current = getLocalProjects();
  current.unshift(newProject);
  saveLocalProjects(current);
  return newProject;
}

export async function updateProject(id: string, projectUpdates: Partial<Project>): Promise<void> {
  if (isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, projectUpdates);
      return;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `projects/${id}`);
    }
  }

  const current = getLocalProjects();
  const index = current.findIndex(p => p.id === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...projectUpdates };
    saveLocalProjects(current);
  }
}

export async function deleteProject(id: string): Promise<void> {
  if (isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "projects", id));
      return;
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  }

  const current = getLocalProjects();
  const updated = current.filter(p => p.id !== id);
  saveLocalProjects(updated);
}

// SERVICE LAYER FOR CLIENT MESSAGES

export async function submitMessage(message: Omit<ContactMessage, 'id'>): Promise<void> {
  const idValue = "msg_" + Math.random().toString(36).substring(2, 9);
  if (isFirebaseConfigured()) {
    try {
      const ref = doc(db, "messages", idValue);
      await setDoc(ref, {
        ...message,
        createdAt: serverTimestamp()
      });
      return;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `messages/${idValue}`);
    }
  }

  // Fallback to local storage message archives
  const currentRaw = localStorage.getItem(STORAGE_MESSAGES_KEY);
  const current: any[] = currentRaw ? JSON.parse(currentRaw) : [];
  current.unshift({ ...message, id: idValue, createdAt: new Date() });
  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(current));
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  if (isFirebaseConfigured()) {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const output: ContactMessage[] = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        output.push({
          id: doc.id,
          name: item.name,
          email: item.email,
          message: item.message,
          createdAt: item.createdAt ? (item.createdAt.toDate ? item.createdAt.toDate() : item.createdAt) : undefined
        });
      });
      return output;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, "messages");
    }
  }

  const currentRaw = localStorage.getItem(STORAGE_MESSAGES_KEY);
  return currentRaw ? JSON.parse(currentRaw) : [];
}

export async function deleteMessage(id: string): Promise<void> {
  if (isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "messages", id));
      return;
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  }

  const currentRaw = localStorage.getItem(STORAGE_MESSAGES_KEY);
  if (currentRaw) {
    const list: any[] = JSON.parse(currentRaw);
    const updated = list.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(updated));
  }
}

export async function fetchGraphicDesignImages(): Promise<string[]> {
  const customLinks = [
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2F250813%20GLA%20BFCM%20-%20MF%20Pro%20Phone%20Call%20(Evergreen)_v1.png?alt=media&token=40d72701-05da-4162-a988-1924d9e21eb0",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2F251104%20CC%20Comparison%20Chart_1X1_2.png?alt=media&token=8779bf93-c44e-4a6b-a2a1-8e74571f0877",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2F251211%20CC%20Apple%20Toggles_1x1.png?alt=media&token=8250dc41-4c83-4cf1-ac48-20c31ae75573",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2FCopy%20of%20laksa.png?alt=media&token=5e70ffe3-ffd4-4a2a-a634-2ca1cd55a7cc",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2FCopy%20of%20pho.png?alt=media&token=333aa5b1-9301-4461-8432-7331b2542bba",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2FCopy%20of%20spicy-beef-ramen.png?alt=media&token=594954de-2fdc-4959-9dba-b22ebd6ebe97",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2Fposter-a.jpg?alt=media&token=d51edbfe-523b-4fb3-a034-c20b09d3d279",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2Fposter-j.jpg?alt=media&token=e9e7b1cd-316e-4567-b9df-ad51ab9915fd",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2Fposter-q.jpg?alt=media&token=16897547-dd92-4b81-bdda-3110cac0cc7f",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2Fpage1_revised.png?alt=media&token=3e804fe8-e24d-4bb0-a0a3-19cbda0ac557",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2F251028%20BFCM%20-%20Plain%20BG%20Part%202_1x1_2.png?alt=media&token=f91c2b9e-7685-4ac5-be96-4bd49551953b",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2FVector-Art.png?alt=media&token=7e8a4a8b-44bb-49ed-abfc-a494058bb4cd",
    "https://firebasestorage.googleapis.com/v0/b/website-portfolio-1c325.firebasestorage.app/o/Graphic%20Design%2FVector-Art01.png?alt=media&token=42f71cfe-7c84-45e2-b32b-5679112eb861"
  ];

  return Promise.resolve(customLinks);
}

