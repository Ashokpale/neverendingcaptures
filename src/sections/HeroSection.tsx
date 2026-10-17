import { ArrowDown } from "lucide-react";
import { imagePath } from "../config/site";

const slides = ["hero-01.jpg", "hero-02.jpg", "hero-03.jpg", "hero-04.jpg"];

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <div className="hero-slideshow">
          {slides.map((slide, index) => (
            <img
              className={`hero-slide${index === 0 ? " active" : ""}`}
              src={imagePath(slide)}
              alt="A wedding captured by Never Ending Captures"
              aria-hidden={index !== 0}
              key={slide}
            />
          ))}
        </div>
      </div>
      <div className="hero-vignette" />
      <div className="hero-content reveal">
        <p className="eyebrow">NEVER ENDING CAPTURES</p>
        <h1>
          Stories
          <br />
          <em>That Never End.</em>
        </h1>
        <p className="hero-sub">
          PHOTOGRAPHY <span>·</span> FILMS <span>·</span> VISUAL STORIES
        </p>
      </div>
      <div className="hero-index" aria-label="Slideshow">
        <span className="line" />
        {slides.map((slide, index) => (
          <span
            className={`slide-number${index === 0 ? " current" : ""}`}
            aria-current={index === 0 ? "true" : undefined}
            key={slide}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
      <a className="scroll-label" href="#work">
        SCROLL <ArrowDown aria-hidden="true" size={12} />
      </a>
    </section>
  );
}
