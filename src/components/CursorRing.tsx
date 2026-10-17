import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CursorRing() {
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!ring || !finePointer.matches) return;

    const moveX = gsap.quickTo(ring, "x", {
      duration: 0.2,
      ease: "power2.out",
    });
    const moveY = gsap.quickTo(ring, "y", {
      duration: 0.2,
      ease: "power2.out",
    });
    const moveRing = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      ring.classList.add("is-visible");
    };
    const hideRing = () => ring.classList.remove("is-visible");

    window.addEventListener("pointermove", moveRing, { passive: true });
    document.addEventListener("pointerleave", hideRing);
    document.addEventListener("pointerenter", hideRing);

    return () => {
      window.removeEventListener("pointermove", moveRing);
      document.removeEventListener("pointerleave", hideRing);
      document.removeEventListener("pointerenter", hideRing);
    };
  }, []);

  return <span className="cursor-ring" ref={ringRef} aria-hidden="true" />;
}
