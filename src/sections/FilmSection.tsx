import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { imagePath } from "../config/site";
import { acquireScrollLock } from "../utils/scrollLock";

export function FilmSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      closeButtonRef.current?.focus();
      const playback = videoRef.current?.play();
      playback?.catch(() => setPlaybackError(true));
      const releaseScrollLock = acquireScrollLock();
      return () => releaseScrollLock();
    } else {
      videoRef.current?.pause();
      setPlaybackError(false);
      previousFocusRef.current?.focus();
    }

    return () => {
      videoRef.current?.pause();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, video",
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <section className="films" id="films">
      <div className="film-bg">
        <img src={imagePath("hero-04.jpg")} alt="" loading="lazy" />
      </div>
      <div className="film-overlay" />
      <div className="film-content reveal">
        <div className="section-kicker"><span>10</span> / CINEMATIC FILMS</div>
        <h2 className="display-heading">
          Watch
          <br />
          <em>the story.</em>
        </h2>
        <p>
          Corporate films, interior films, event coverage and visual stories
          shaped with rhythm, detail and sound.
        </p>
        <button
          className="film-play"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Play aria-hidden="true" size={13} /> Play film
        </button>
        <span className="film-caption">A moving image, a lasting memory</span>
      </div>
      <div
        className={`film-video-wrap${isOpen ? " open" : ""}`}
        ref={dialogRef}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Never Ending Captures film"
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <button
          className="film-close"
          ref={closeButtonRef}
          type="button"
          aria-label="Close video"
          onClick={() => setIsOpen(false)}
          tabIndex={isOpen ? 0 : -1}
        >
          <X aria-hidden="true" size={32} />
        </button>
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={imagePath("interior-02.jpg")}
          tabIndex={isOpen ? 0 : -1}
        >
          <source src="/video/nec-film.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
        {playbackError && (
          <p className="film-playback-error" role="status">
            Playback did not start automatically. Press play to watch.
          </p>
        )}
      </div>
    </section>
  );
}
