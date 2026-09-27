export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  startingPrice: string;
  duration: string;
  deliverables: string;
  features: string[];
  recommended?: boolean;
}

export const pricingPackages: PricingPackage[] = [
  {
    id: "editorial-portrait",
    name: "Editorial Portrait",
    tagline: "For artists, founders, creative directors, and personal monographs.",
    startingPrice: "$950",
    duration: "2-3 Hours Studio or On-Location",
    deliverables: "25 Master-Retouched High-Res Images",
    features: [
      "Initial creative direction & wardrobe moodboarding",
      "Two distinct lighting setups & location environments",
      "Private online proofing gallery delivered within 7 days",
      "25 signature hand-graded high-resolution files",
      "Full personal & press editorial usage rights",
      "One archival 11x14 Hahnemühle fine art print",
    ],
    recommended: false,
  },
  {
    id: "commercial-campaign",
    name: "Commercial & Brand",
    tagline: "For luxury labels, architecture studios, and product campaigns.",
    startingPrice: "$2,800",
    duration: "Full Day / Multi-Location Production",
    deliverables: "60+ Color-Graded Assets + Raw Previews",
    features: [
      "Pre-production treatment & visual narrative storyboard",
      "Comprehensive tethered shooting with live client monitor",
      "Full digital capture team & professional assistant",
      "60+ fully licensed commercial campaign deliverables",
      "Global web, social, and print advertising buyout included",
      "Expedited 5-day delivery with round-two revision cycle",
    ],
    recommended: true,
  },
  {
    id: "destination-wedding",
    name: "Destination Story",
    tagline: "For couples seeking timeless, cinematic documentary storytelling.",
    startingPrice: "$4,600",
    duration: "Full Weekend / Multi-Event Coverage",
    deliverables: "500+ Curated Documentary Frames",
    features: [
      "Complimentary engagement or rehearsal dinner session",
      "Up to 10 hours of seamless documentary wedding coverage",
      "Dual shooter team (Elena Vance + associate master)",
      "High-resolution private gallery with limitless guest downloads",
      "Full printing rights with handcrafted Italian linen album",
      "Preview highlight reel delivered within 72 hours",
    ],
    recommended: false,
  },
];
