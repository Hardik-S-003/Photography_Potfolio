import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/about-portrait.png";

export function MinimalistHero() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-background px-6 pb-8 pt-8 text-foreground md:px-12 md:py-10">
      <header className="relative z-10 flex items-start justify-between md:pl-[max(26vw,240px)]">
        <div>
          <p className="eyebrow">About / Sarah James</p>
          <p className="meta mt-2">Documentary photographer</p>
        </div>
        <span className="meta hidden md:block">Bangalore, India</span>
      </header>

      <div className="relative flex min-h-[580px] flex-1 flex-col justify-end md:min-h-[420px] md:flex-row md:items-center md:pl-[max(26vw,240px)]">
        <div className="relative z-20 order-2 max-w-sm pb-2 md:order-1 md:w-[34%] md:shrink-0 md:pb-0">
          <p className="font-display text-xl leading-snug md:text-2xl">
            I follow the light, the quiet, and the stories in between.
          </p>
          <p className="mt-4 text-sm leading-7 text-subtle">
            I’m a documentary and travel photographer drawn to people, places, and the moments that make them unforgettable.
          </p>
          <Button
            variant="ghost"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls="about-story"
            className="mt-5 h-auto gap-2 rounded-none border-b border-hairline px-0 pb-1 text-xs uppercase text-foreground hover:bg-transparent"
          >
            {expanded ? "Read less" : "Read more"} <ArrowDownRight className="h-4 w-4" />
          </Button>
          <p id="about-story" hidden={!expanded} className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
            Through my lens, I seek the raw, unfiltered beauty of our world — the moments that often go unnoticed, but mean everything.
          </p>
        </div>

        <div className="pointer-events-none relative order-1 flex min-h-[330px] flex-1 items-center justify-center md:order-2 md:h-full md:min-h-[450px]">
          <div className="about-disc absolute aspect-square w-[min(68vw,360px)] rounded-full md:w-[min(34vw,480px)]" />
          <img src={portrait} alt="Sarah James holding her camera" width={1024} height={1280} className="relative z-10 h-[min(42vh,470px)] w-auto max-w-none object-contain object-bottom md:h-[min(62vh,600px)]" />
        </div>

        <div className="pointer-events-none relative z-20 order-3 pb-3 md:order-3 md:-ml-14 md:w-[22%] md:pb-0">
          <h2 id="about-title" className="font-display text-[clamp(3rem,6vw,7rem)] leading-[0.94] md:text-[clamp(3rem,6vw,7rem)]">
            Behind<br />the lens.
          </h2>
        </div>
      </div>

      <footer className="relative z-20 mt-8 flex justify-between border-t border-hairline pt-5 md:ml-[max(26vw,240px)]">
        <span className="meta">Travel / Documentary / Portrait</span>
        <span className="meta hidden sm:block">Bangalore, India</span>
      </footer>
    </div>
  );
}