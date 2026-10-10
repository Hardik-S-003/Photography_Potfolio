import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import contact from "@/assets/contact.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

/* Content pages leave room for the persistent shutter at middle-left. */
const CONTENT_PAD = "pl-6 pr-6 pb-32 md:pb-0 md:pl-[26vw] md:pr-[6vw]";

export function HomePage() {
  return (
    <section className="relative h-full w-full overflow-hidden" aria-labelledby="home-title">
      <img
        src={hero}
        alt="Sarah James holding a vintage camera"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[22%_center]"
      />
      <div className="absolute inset-0 scrim-bottom md:hidden" />
      <header className="absolute left-6 top-6 md:left-12 md:top-10">
        <h1 id="home-title" className="font-display text-lg tracking-[0.35em] text-foreground">
          SARAH JAMES
        </h1>
        <p className="meta mt-2">Photographer</p>
      </header>

      <nav aria-label="Social" className="absolute right-6 top-7 flex gap-6 md:right-12 md:top-11">
        {["IG", "BE", "VM"].map((s) => (
          <a key={s} href="#" className="meta transition-colors hover:text-foreground">
            {s}
          </a>
        ))}
      </nav>

      <blockquote className="absolute left-6 right-6 top-[24vh] md:left-[40vw] md:right-auto md:top-auto md:bottom-[16vh] md:max-w-[17rem]">
        <span className="block h-px w-10 bg-hairline" />
        <p className="font-display mt-5 text-2xl font-normal leading-snug text-foreground md:text-[1.7rem]">
          Not just photographs, but moments that breathe.
        </p>
      </blockquote>

      <footer className="absolute bottom-6 left-6 right-6 flex justify-between md:bottom-10 md:left-12 md:right-12">
        <span className="meta">Capturing real stories</span>
        <span className="meta">Est. 2018</span>
      </footer>
    </section>
  );
}

export function AboutPage() {
  return (
    <section className="relative h-full w-full overflow-y-auto bg-background" aria-labelledby="about-title">
      <MinimalistHero />
    </section>
  );
}

const PHOTOS = [
  { src: g1, cat: "Landscapes", title: "Caravan, Sahara" },
  { src: g2, cat: "People", title: "The Fisherman, Lofoten" },
  { src: g3, cat: "Street", title: "After Rain, Tokyo" },
  { src: g4, cat: "Wildlife", title: "Ghost of the Mountains, Ladakh" },
  { src: g5, cat: "Landscapes", title: "Blue Hour, Nærøyfjord" },
  { src: contact, cat: "Landscapes", title: "Above the Clouds, Spiti" },
] as const;

const GALLERY_ITEMS: WorksWheelItem[] = PHOTOS.map((p) => ({
  title: p.title,
  image: p.src,
}));

export function GalleryPage({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative h-full w-full overflow-hidden bg-background" aria-labelledby="gallery-title">
      <div className="relative h-full">
        <div className="relative h-full overflow-hidden">
          <div className="pointer-events-none absolute left-6 right-6 top-8 z-10 md:left-[26vw] md:top-10">
            <p className="eyebrow">Gallery / Selected work</p>
            <h2 id="gallery-title" className="font-display mt-3 text-3xl leading-tight md:text-5xl">Moments in Time</h2>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-32 md:left-[24%] md:top-36">
            <WorksWheel items={GALLERY_ITEMS} label="Moments in Time" enabled={active && open === null} onOpen={setOpen} />
          </div>
        </div>
      </div>
      {open !== null && <Viewer photos={PHOTOS} index={open} setIndex={setOpen} />}
    </section>
  );
}

function Viewer({
  photos,
  index,
  setIndex,
}: {
  photos: readonly (typeof PHOTOS)[number][];
  index: number;
  setIndex: (i: number | null) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const p = photos[index]!;

  const close = () => {
    if (reduced || !root.current) return setIndex(null);
    gsap.to(root.current, { autoAlpha: 0, duration: 0.4, onComplete: () => setIndex(null) });
  };
  const step = (d: number) => setIndex((index + d + photos.length) % photos.length);

  useEffect(() => {
    closeBtn.current?.focus();
    if (!reduced && root.current) {
      gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
    }
  }, []);

  useEffect(() => {
    if (!reduced && img.current) {
      gsap.fromTo(
        img.current,
        { clipPath: "inset(50% 0 50% 0)", scale: 1.06 },
        { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 0.9, ease: "power3.out" },
      );
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return createPortal(
    <div ref={root} role="dialog" aria-modal="true" aria-label={p.title} className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <span className="meta">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")} — {p.cat}
        </span>
        <button ref={closeBtn} onClick={close} aria-label="Close viewer" className="text-subtle transition-colors hover:text-foreground">
          <X className="h-5 w-5" strokeWidth={1} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-6 md:px-24">
        <img ref={img} src={p.src} alt={p.title} className="max-h-full max-w-full object-contain" />
        <button onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 p-3 text-subtle hover:text-foreground md:left-8">
          <ArrowLeft className="h-5 w-5" strokeWidth={1} />
        </button>
        <button onClick={() => step(1)} aria-label="Next image" className="absolute right-2 p-3 text-subtle hover:text-foreground md:right-8">
          <ArrowRight className="h-5 w-5" strokeWidth={1} />
        </button>
      </div>
      <p className="font-display px-6 py-6 text-center text-lg md:py-8">{p.title}</p>
    </div>,
    document.body,
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section className="relative h-full w-full overflow-y-auto" aria-labelledby="contact-title">
      <img src={contact} alt="" width={1920} height={1088} loading="lazy" className="fixed inset-0 h-full w-full object-cover md:absolute" />
      <div className="absolute inset-0 scrim-left" />
      <div className={`relative grid min-h-full items-center gap-14 py-16 md:grid-cols-2 md:gap-16 ${CONTENT_PAD}`}>
        <div className="max-w-sm">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="font-display mt-6 text-4xl md:text-6xl">
            Get in touch.
          </h2>
          <p className="mt-6 text-sm leading-7 text-subtle">
            Have a project in mind, a question, or just want to say hello? I'd love to hear from you.
          </p>
          <dl className="mt-10 space-y-5 border-t border-hairline pt-6 text-sm">
            {[
              ["Email", "sarahjames@example.com", "mailto:sarahjames@example.com"],
              ["Phone", "+91 98765 43210", "tel:+919876543210"],
              ["Location", "Bangalore, India", null],
            ].map(([k, v, href]) => (
              <div key={k} className="flex items-baseline gap-6">
                <dt className="meta w-20">{k}</dt>
                <dd>{href ? <a href={href} className="hover:text-subtle">{v}</a> : v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <form onSubmit={submit} className="w-full max-w-md space-y-5" aria-label="Contact form">
          {sent ? (
            <p className="font-display text-2xl" role="status">
              Thank you — I'll be in touch soon.
            </p>
          ) : (
            <>
              <label className="block">
                <span className="sr-only">Name</span>
                <input required className="field" placeholder="Name" name="name" />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input required type="email" className="field" placeholder="Email" name="email" />
              </label>
              <label className="block">
                <span className="sr-only">Project / Subject</span>
                <input className="field" placeholder="Project / Subject" name="subject" />
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea required rows={4} className="field resize-none" placeholder="Message" name="message" />
              </label>
              <button type="submit" className="group mt-6 inline-flex items-center gap-4 border-b border-foreground pb-2 text-[0.7rem] tracking-[0.35em] text-foreground">
                SEND A MESSAGE
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
