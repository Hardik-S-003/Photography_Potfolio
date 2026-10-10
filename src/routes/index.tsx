import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BLADE_CLOSED, BLADE_PIVOT, Shutter, type Page } from "@/components/portfolio/Shutter";
import { AboutPage, ContactPage, GalleryPage, HomePage } from "@/components/portfolio/pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarah James — Documentary & Travel Photographer" },
      { name: "description", content: "Cinematic documentary, travel and portrait photography by Sarah James, Bangalore." },
      { property: "og:title", content: "Sarah James — Photographer" },
      { property: "og:description", content: "Not just photographs, but moments that breathe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function shutterTarget(page: Page) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 768) {
    return page === "home"
      ? { left: w * 0.5, top: h * 0.68, width: Math.min(w * 0.7, 320), height: Math.min(w * 0.7, 320) }
      : { left: 50, top: h - 50, width: 92, height: 92 };
  }
  if (page === "home") {
    const s = Math.min(h * 0.56, w * 0.34, 520);
    return { left: w * 0.75, top: h * 0.5, width: s, height: s };
  }
  const s = Math.min(h * 0.38, w * 0.2, 320);
  return { left: w * 0.12, top: h * 0.5, width: s, height: s };
}

function Index() {
  const [active, setActive] = useState<Page>("home");
  const pages: { id: Page; el: React.ReactNode }[] = [
    { id: "home", el: <HomePage /> },
    { id: "gallery", el: <GalleryPage active={active === "gallery"} /> },
    { id: "about", el: <AboutPage /> },
    { id: "contact", el: <ContactPage /> },
  ];
  const activeRef = useRef<Page>("home");
  const busy = useRef(false);
  const shutter = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const layers = useRef<Partial<Record<Page, HTMLDivElement | null>>>({});

  useEffect(() => {
    const place = () => gsap.set(shutter.current, { ...shutterTarget(activeRef.current), xPercent: -50, yPercent: -50 });
    place();
    gsap.to(shutter.current, { autoAlpha: 1, duration: 0.8 });
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  const go = (to: Page) => {
    const from = activeRef.current;
    if (busy.current || to === from) return;
    busy.current = true;
    activeRef.current = to;
    setActive(to);

    const out = layers.current[from]!;
    const inn = layers.current[to]!;
    const toHome = to === "home";
    const done = () => {
      gsap.set(out, { autoAlpha: 0, xPercent: 0, zIndex: 0 });
      inn.focus({ preventScroll: true });
      busy.current = false;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(inn, { zIndex: 2, xPercent: 0 });
      gsap.to(inn, { autoAlpha: 1, duration: 0.25 });
      gsap.set(shutter.current, shutterTarget(to));
      gsap.delayedCall(0.25, done);
      return;
    }

    const root = shutter.current!;
    const blades = Array.from(root.querySelectorAll<SVGGElement>(".blade"));
    const irisRot = root.querySelector<SVGGElement>(".iris-rot")!;
    const homeLabel = root.querySelector(".home-label");
    const [px, py] = BLADE_PIVOT;
    // single mechanical state: 0 = open, 1 = nearly closed. Drives every blade around its pivot
    // and the whole blade carrier around the optical axis — always returns to 0, so nothing accumulates.
    const iris = { t: 0 };
    const apply = () => {
      const a = iris.t * BLADE_CLOSED;
      blades.forEach((b) => b.setAttribute("transform", `rotate(${a} ${px} ${py})`));
      irisRot.setAttribute("transform", `rotate(${-iris.t * 40})`);
    };
    // phase 1 select 0–0.15, phase 2 close 0.15–0.6, phase 3 hold 0.6–0.72, phase 4 open + pull 0.72–1.47, settle to ~1.6
    const C0 = 0.15, CD = 0.45, P0 = 0.72, D = 0.85;
    const tl = gsap.timeline({ onComplete: done });
    tl.to(iris, { t: 1, duration: CD, ease: "power3.inOut", onUpdate: apply }, C0)
      .to(homeLabel, { opacity: 0, duration: 0.3 }, C0)
      .to(flash.current, { autoAlpha: 0.08, duration: 0.06 }, C0 + CD)
      .to(flash.current, { autoAlpha: 0, duration: 0.35 }, C0 + CD + 0.08);
    if (toHome) {
      tl.set(out, { zIndex: 2 }, P0)
        .set(inn, { autoAlpha: 1, xPercent: -15, zIndex: 1 }, P0)
        .to(out, { xPercent: 100, duration: D, ease: "power3.inOut" }, P0)
        .to(inn, { xPercent: 0, duration: D, ease: "power3.inOut" }, P0);
    } else {
      tl.set(out, { zIndex: 1 }, P0)
        .set(inn, { autoAlpha: 1, xPercent: 100, zIndex: 2 }, P0)
        .to(inn, { xPercent: 0, duration: D, ease: "power3.inOut" }, P0)
        .to(out, { xPercent: -12, duration: D, ease: "power3.inOut" }, P0);
    }
    tl.to(shutter.current, { ...shutterTarget(to), duration: D, ease: "power3.inOut" }, P0)
      .to(iris, { t: 0, duration: 0.85, ease: "power3.inOut", onUpdate: apply }, P0)
      .to(homeLabel, { opacity: 1, duration: 0.4 }, P0 + 0.5);
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-background">
      {pages.map(({ id, el }) => (
        <div
          key={id}
          ref={(n) => {
            layers.current[id] = n;
          }}
          tabIndex={-1}
          inert={id !== active}
          aria-hidden={id !== active}
          className="absolute inset-0 outline-none will-change-transform"
          style={{ visibility: id === "home" ? "visible" : "hidden", zIndex: id === "home" ? 1 : 0 }}
        >
          {el}
        </div>
      ))}
      <div ref={flash} className="pointer-events-none fixed inset-0 z-20 bg-foreground opacity-0" style={{ visibility: "hidden" }} />
      <div ref={shutter} className="fixed z-30" style={{ visibility: "hidden", left: "75%", top: "50%", width: 0, height: 0 }}>
        <Shutter active={active} onSelect={go} />
      </div>
    </main>
  );
}
