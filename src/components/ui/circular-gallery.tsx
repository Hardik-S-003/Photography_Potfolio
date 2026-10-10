import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type PointerEvent } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryItem {
  title: string;
  category: string;
  photo: { url: string; text: string; pos?: string };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  active: boolean;
  onOpen: (index: number) => void;
}

const CircularGallery = forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, active, onOpen, className = "", ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const orbit = useRef({ angle: 0 });
    const drag = useRef<{ pointer: number; x: number; angle: number; moved: boolean } | null>(null);
    const suppressClick = useRef(false);
    const [width, setWidth] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const count = items.length;
    const stepAngle = count > 0 ? 360 / count : 360;
    const radius = count < 3 ? width * 0.7 : width / (2 * Math.tan(Math.PI / count));
    const front = count ? ((Math.round(-rotation / stepAngle) % count) + count) % count : 0;

    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;
      const observer = new ResizeObserver(() => setWidth(card.getBoundingClientRect().width));
      observer.observe(card);
      setWidth(card.getBoundingClientRect().width);
      return () => observer.disconnect();
    }, [count]);

    useEffect(() => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const change = () => setReducedMotion(media.matches);
      change();
      media.addEventListener("change", change);
      return () => media.removeEventListener("change", change);
    }, []);

    useEffect(() => () => { gsap.killTweensOf(orbit.current); }, []);

    const paint = () => {
      if (ringRef.current) ringRef.current.style.transform = `translateZ(-${radius}px) rotateY(${orbit.current.angle}deg)`;
      setRotation(orbit.current.angle);
    };

    const rotateTo = (target: number) => {
      gsap.killTweensOf(orbit.current);
      if (reducedMotion) {
        orbit.current.angle = target;
        paint();
      } else {
        gsap.to(orbit.current, { angle: target, duration: 0.9, ease: "power3.inOut", onUpdate: paint });
      }
    };

    const step = (direction: number) => {
      if (count < 2) return;
      rotateTo(Math.round(orbit.current.angle / stepAngle) * stepAngle - direction * stepAngle);
    };

    const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
      if (!active || count < 2 || event.button !== 0) return;
      gsap.killTweensOf(orbit.current);
      drag.current = { pointer: event.pointerId, x: event.clientX, angle: orbit.current.angle, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
      const start = drag.current;
      if (!start || start.pointer !== event.pointerId) return;
      const dx = event.clientX - start.x;
      if (Math.abs(dx) > 5) start.moved = true;
      if (!start.moved) return;
      orbit.current.angle = start.angle + dx / Math.max(width, 1) * stepAngle * 1.35;
      paint();
    };

    const pointerEnd = (event: PointerEvent<HTMLDivElement>) => {
      const start = drag.current;
      if (!start || start.pointer !== event.pointerId) return;
      if (start.moved) {
        suppressClick.current = true;
        rotateTo(Math.round(orbit.current.angle / stepAngle) * stepAngle);
        window.setTimeout(() => { suppressClick.current = false; }, 100);
      }
      drag.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    };

    if (!count) return null;

    return (
      <div ref={ref} role="region" aria-label="Circular photography gallery" tabIndex={0}
        onKeyDown={(event) => {
          if (!active || event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            step(event.key === "ArrowRight" ? 1 : -1);
          }
        }} className={`relative h-full w-full outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`} {...props}>
        <div className="gallery-stage absolute inset-0 touch-pan-y overflow-visible" style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
          onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd}>
          <div ref={ringRef} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}>
            {items.map((item, index) => {
              const relative = ((index * stepAngle + rotation) % 360 + 360) % 360;
              const depth = Math.min(relative, 360 - relative);
              return (
                <div key={`${item.title}-${index}`} ref={index === 0 ? cardRef : undefined} role="group" aria-label={item.title}
                  className="gallery-card absolute left-0 top-0 aspect-[4/3] w-[min(72vw,64vh)] sm:w-[min(60vw,480px,64vh)] lg:w-[min(46vw,560px,64vh)]"
                  style={{ transform: `translate(-50%, -50%) rotateY(${index * stepAngle}deg) translateZ(${radius}px)`, transformStyle: "preserve-3d", backfaceVisibility: "hidden", opacity: Math.max(0.2, 1 - depth / 160), filter: `brightness(${Math.max(0.5, 1 - depth / 280)})` }}>
                  <Button variant="ghost" type="button" onClick={() => { if (!suppressClick.current) onOpen(index); }}
                    tabIndex={index === front ? 0 : -1} aria-label={`Open ${item.title}`}
                    className="group relative block h-full w-full overflow-hidden rounded-none border border-border bg-card p-0 text-left focus-visible:ring-2 focus-visible:ring-ring">
                    <img src={item.photo.url} alt={item.photo.text} loading="lazy" draggable={false}
                      className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.photo.pos ?? "center" }} />
                    <span className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent px-5 pb-5 pt-16 text-foreground ${index === front ? "" : "invisible"}`}>
                      <span className="font-display block text-xl leading-tight">{item.title}</span>
                      <span className="meta mt-2 block text-subtle">{item.category}</span>
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-10 right-6 z-10 flex items-center gap-3 md:bottom-12 md:right-12">
          <span className="meta mr-3 tabular-nums">{String(front + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
          <Button type="button" variant="outline" size="icon" onClick={() => step(-1)} aria-label="Previous photograph" className="rounded-full bg-background/80"><ArrowLeft /></Button>
          <Button type="button" variant="outline" size="icon" onClick={() => step(1)} aria-label="Next photograph" className="rounded-full bg-background/80"><ArrowRight /></Button>
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";
export { CircularGallery };