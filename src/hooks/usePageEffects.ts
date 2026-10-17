import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function usePageEffects() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let lenis: Lenis | undefined;
    let lenisTick: ((time: number) => void) | undefined;
    let slideTimer: gsap.core.Tween | undefined;
    const animationMedia = gsap.matchMedia();
    const handleScrollLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;
      if (locked) lenis?.stop();
      else lenis?.start();
    };
    window.addEventListener("nec:scroll-lock", handleScrollLock);

    if (!reducedMotion) {
      lenis = new Lenis({ autoRaf: false, smoothWheel: true, anchors: true });
      lenis.on("scroll", () => ScrollTrigger.update());
      lenisTick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      if (reducedMotion) return;

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .fromTo(
          ".brand",
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          ".hero-meta",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          "-=0.25",
        )
        .fromTo(
          ".hero-title-line > *",
          { yPercent: 110, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1, stagger: 0.12 },
          "-=0.15",
        )
        .fromTo(
          ".hero-sub, .hero-cta",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.35",
        )
        .fromTo(
          ".scroll-label",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          "-=0.15",
        );

      root.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
        const children = element.querySelectorAll<HTMLElement>(
          ".section-kicker, .display-heading, p, .text-link, .about-stats, .process-list, .service-row",
        );
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true,
              },
            },
          );
        }

        if (
          element.matches(
            ".work-tile, .portrait-item, .interior-grid figure, .story-image, .commercial-image, .about-image",
          )
        ) {
          gsap.fromTo(
            element,
            { clipPath: "inset(7% 0 7% 0)" },
            {
              clipPath: "inset(0% 0 0% 0)",
              duration: 1,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        }
      });

      gsap.fromTo(
        ".section-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".section-rule",
            start: "top 88%",
            once: true,
          },
        },
      );

      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      const slideLabels = root.querySelectorAll(".hero-index .slide-number");
      if (slides.length > 1) {
        let currentIndex = 0;

        function showNextSlide() {
          const previous = slides[currentIndex];
          currentIndex = (currentIndex + 1) % slides.length;
          const next = slides[currentIndex];
          if (!previous || !next) return;

          previous.classList.remove("active");
          previous.setAttribute("aria-hidden", "true");
          next.classList.add("active");
          next.setAttribute("aria-hidden", "false");
          gsap.set(next, { zIndex: 2 });
          gsap.set(previous, { zIndex: 1 });
          gsap.fromTo(
            next,
            { autoAlpha: 0, scale: 1.045 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.5,
              ease: "power1.inOut",
              onComplete: () => gsap.set(previous, { zIndex: 0 }),
            },
          );

          slideLabels.forEach((label, index) => {
            const isCurrent = index === currentIndex;
            label.classList.toggle("current", isCurrent);
            if (isCurrent) label.setAttribute("aria-current", "true");
            else label.removeAttribute("aria-current");
          });
        }

        gsap.set(slides.slice(1), { autoAlpha: 0 });
        gsap.set(slides[0], { autoAlpha: 1, zIndex: 1, scale: 1 });
        slideTimer = gsap.delayedCall(5, showNextSlide).repeat(-1);
      }

      animationMedia.add(
        {
          desktop: "(min-width: 901px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          if (!mediaContext.conditions?.desktop || mediaContext.conditions.reducedMotion) {
            return;
          }

          gsap.utils
            .toArray<HTMLElement>(
              ".story-image img, .film-bg img, .lifestyle-media img, .commercial-image img",
            )
            .forEach((image) => {
              gsap.to(image, {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            });
        },
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((image) => {
      if (!image.complete) image.addEventListener("load", refresh, { once: true });
    });

    return () => {
      images.forEach((image) => image.removeEventListener("load", refresh));
      context.revert();
      animationMedia.revert();
      window.removeEventListener("nec:scroll-lock", handleScrollLock);
      slideTimer?.kill();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
    };
  }, []);

  return pageRef;
}
