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

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const slideLabels = root.querySelectorAll(".hero-index .slide-number");
    let lenis: Lenis | undefined;
    let lenisTick: ((time: number) => void) | undefined;
    let slideTimer: gsap.core.Tween | undefined;

    if (!motionPreference.matches) {
      lenis = new Lenis({ autoRaf: false, smoothWheel: true, anchors: true });
      lenis.on("scroll", () => ScrollTrigger.update());
      lenisTick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      if (motionPreference.matches) return;

      gsap.fromTo(
        ".hero-content",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2,
          immediateRender: false,
        },
      );

      root.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
        if (element.closest(".hero")) return;

        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      if (slides.length > 1) {
        let currentIndex = 0;
        slideTimer = gsap.delayedCall(4, showNextSlide).repeat(-1);

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
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 1.2,
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
        gsap.set(slides[0], { autoAlpha: 1, zIndex: 1 });
      }

      gsap.utils
        .toArray<HTMLElement>(
          ".story-image img, .film-bg img, .lifestyle-media img",
        )
        .forEach((image) => {
          gsap.to(image, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
    }, root);

    return () => {
      context.revert();
      slideTimer?.kill();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
    };
  }, []);

  return pageRef;
}
