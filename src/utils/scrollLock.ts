let lockCount = 0;
let previousOverflow = "";

export function acquireScrollLock() {
  lockCount += 1;
  if (lockCount === 1) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent<boolean>("nec:scroll-lock", { detail: true }),
    );
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(
        new CustomEvent<boolean>("nec:scroll-lock", { detail: false }),
      );
    }
  };
}
