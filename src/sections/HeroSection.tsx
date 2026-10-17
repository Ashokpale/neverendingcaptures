import { ArrowDown, ArrowUpRight } from "lucide-react";
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
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow hero-meta">HYDERABAD, INDIA <span>·</span> PHOTO &amp; FILM</p>
        <h1 className="hero-title">
          <span className="hero-title-line"><span>Stories</span></span>
          <span className="hero-title-line"><em>That Never End.</em></span>
        </h1>
        <p className="hero-sub">
          Photography, films and visual stories made to be remembered.
        </p>
        <div className="hero-actions">
          <a className="hero-cta hero-cta--primary" href="#work">
            Explore our work <ArrowDown aria-hidden="true" size={15} />
          </a>
          <a className="hero-cta hero-cta--secondary" href="#contact">
            Start your story <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
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
      <a className="scroll-label" href="#work" aria-label="Scroll to explore our work">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown aria-hidden="true" size={14} />
      </a>
    </section>
  );
}
