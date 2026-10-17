import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { imagePath } from "../config/site";

export function FilmSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      const playback = videoRef.current?.play();
      playback?.catch(() => setPlaybackError(true));
      document.body.style.overflow = "hidden";
    } else {
      videoRef.current?.pause();
      document.body.style.overflow = "";
      setPlaybackError(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <section className="films" id="films">
      <div className="film-bg">
        <img src={imagePath("interior-02.jpg")} alt="" loading="lazy" />
      </div>
      <div className="film-overlay" />
      <div className="film-content reveal">
        <div className="section-kicker">07 / CINEMATIC FILMS</div>
        <h2>
          Watch
          <br />
          <em>the story.</em>
        </h2>
        <p>
          Corporate films, interior films, event coverage and visual stories
          shaped with rhythm, detail and sound.
        </p>
        <button className="film-play" type="button" onClick={() => setIsOpen(true)}>
          <Play aria-hidden="true" size={13} /> Play film
        </button>
      </div>
      <div
        className={`film-video-wrap${isOpen ? " open" : ""}`}
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
