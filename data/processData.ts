export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Curatorial Consultation",
    subtitle: "Vision, Moodboard & Pre-Production",
    description: "Every shoot begins with deep visual dialogue. We align on color palette, lighting references, wardrobe, location scouting, and emotional tone to ensure intentionality in every frame.",
    highlights: ["In-depth creative consultation", "Custom styling & lighting moodboard", "Permit & location scouting coordination"],
  },
  {
    stepNumber: "02",
    title: "Shoot Day Guidance",
    subtitle: "Candid Direction & Effortless Flow",
    description: "No stiff poses or forced smiles. On set, I guide gentle organic movement and harness natural ambient light, creating an unhurried, comfortable atmosphere where your true presence unfolds.",
    highlights: ["Relaxed, pressure-free direction", "Continuous tethered review for commercial clients", "Mastery of changing natural light conditions"],
  },
  {
    stepNumber: "03",
    title: "Archival Delivery & Prints",
    subtitle: "Hand-Retouching & Fine Art Heirlooms",
    description: "Each chosen image is individually hand-graded with subtle film tonality and archival color science. Delivered via a private client portal with direct options for museum-grade Hahnemühle prints.",
    highlights: ["Bespoke film-inspired color grading", "Fast private proofing gallery", "Museum-quality archival cotton rag prints"],
  },
];
