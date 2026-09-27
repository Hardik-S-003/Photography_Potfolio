export interface Publication {
  id: string;
  name: string;
  description: string;
}

export const publications: Publication[] = [
  { id: "vogue", name: "VOGUE", description: "Featured in Vogue Weddings & Editorial" },
  { id: "harpers", name: "HARPER'S BAZAAR", description: "Top 10 Contemporary Photographers" },
  { id: "kinfolk", name: "KINFOLK", description: "Minimalist Life & Portrait Monograph" },
  { id: "vanity", name: "VANITY FAIR", description: "Annual Culture & Arts Portfolio" },
  { id: "natgeo", name: "NATIONAL GEOGRAPHIC", description: "Expedition & Remote Landscape Series" },
  { id: "archdigest", name: "ARCHITECTURAL DIGEST", description: "Spatial & Structural Lighting Features" },
];
