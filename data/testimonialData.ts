export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRoleOrEvent: string;
  location: string;
  rating: number;
  avatarUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "review-01",
    quote: "Elena doesn't simply take photos; she captures the quiet poetry of intimacy. Looking back at our Lake Como gallery brought tears to our eyes. Her subtle presence and calm guidance made us forget the camera completely.",
    clientName: "Sophia & Julian Rossi",
    clientRoleOrEvent: "Villa Balbianello Destination Wedding",
    location: "Lake Como, Italy",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-02",
    quote: "Her command of light and architectural shadow is unmatched in modern commercial photography. Our brand campaign saw an immediate 40% jump in international press coverage. Elena is our first call for every seasonal lookbook.",
    clientName: "Marcus Sterling",
    clientRoleOrEvent: "Creative Director, Aethel Watch Studio",
    location: "Geneva & London",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-03",
    quote: "As an artist who is usually camera-shy, working with Elena was an absolute revelation. She understood my vision before I even articulated it. The monograph prints hanging in my gallery are true works of art.",
    clientName: "Claire De La Tour",
    clientRoleOrEvent: "Solo Fine Art Portrait Series",
    location: "Paris, France",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-04",
    quote: "The level of professionalism, bespoke styling assistance, and rapid turnaround exceeded every expectation. The images possess a cinematic stillness that will never go out of style.",
    clientName: "David & Eleanor Wright",
    clientRoleOrEvent: "Cotswolds Autumn Celebration",
    location: "Oxfordshire, UK",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];
