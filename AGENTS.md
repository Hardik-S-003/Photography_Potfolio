
# Project rules

- The portfolio is a single route (`/`) with full-screen page layers animated by GSAP; the shutter is the only navigation. Why: the brief requires one continuous experience without page reloads.
- Page content lives in `src/components/portfolio/pages.tsx`, the shutter in `Shutter.tsx`. Why: keeps content swappable without touching transition logic.
- The Gallery page uses the uploaded ring-to-drum wheel in `src/components/ui/works-wheel.tsx` inside the single page layer. Why: preserve the supplied interaction and keep photograph browsing independent of shutter navigation.
- The About page uses an isolated editorial portrait composition in `src/components/ui/minimalist-hero.tsx` without its own navigation. Why: preserve the shutter as the single navigation mechanism.
