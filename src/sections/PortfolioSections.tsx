import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { siteConfig, imagePath } from "../config/site";
import { portraitGallery, services } from "../data/portfolio";
import { acquireScrollLock } from "../utils/scrollLock";

export function PortfolioSections() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isLightboxOpen = selectedImage !== null;

  useEffect(() => {
    if (!isLightboxOpen) {
      previousFocusRef.current?.focus();
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const releaseScrollLock = acquireScrollLock();
    lightboxCloseRef.current?.focus();

    return () => {
      releaseScrollLock();
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") {
        setSelectedImage((index) =>
          index === null ? null : (index + 1) % portraitGallery.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setSelectedImage((index) =>
          index === null
            ? null
            : (index - 1 + portraitGallery.length) % portraitGallery.length,
        );
      }
      if (event.key === "Tab") {
        const buttons = lightboxRef.current?.querySelectorAll("button");
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <section className="intro section-pad reveal">
        <div className="section-kicker"><span>01</span> / THE STUDIO</div>
        <div className="intro-grid">
          <h2 className="display-heading">
            We capture
            <br />
            <em>what lasts.</em>
          </h2>
          <div className="intro-copy">
            <p className="lead">
              We are a photography and filmmaking studio drawn to honest
              moments, thoughtful frames, and the stories that stay with us
              long after the day is over.
            </p>
            <a className="text-link" href="#about">
              Discover our approach <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>
        </div>
        <div className="section-rule" aria-hidden="true" />
      </section>

      <section className="work section-pad" id="work">
        <div className="section-heading reveal">
          <div>
            <div className="section-kicker"><span>02</span> / SELECTED WORK</div>
            <h2 className="display-heading">Stories in <em>frames.</em></h2>
          </div>
          <p>
            A selection of the people, celebrations, and spaces we have had the
            joy of seeing through a lens.
          </p>
        </div>
        <div className="work-grid">
          <a className="work-tile work-tile--wedding reveal" href="#weddings">
            <img src={imagePath("wedding-bw.jpg")} alt="A couple during their wedding ceremony" />
            <span className="work-index">01 / CELEBRATIONS</span>
            <span className="work-title">Weddings <ArrowUpRight aria-hidden="true" /></span>
            <span className="work-hover">VIEW STORY</span>
          </a>
          <a className="work-tile work-tile--portrait reveal" href="#portraits">
            <img src={imagePath("bridal-portrait.jpg")} alt="A bridal portrait in warm light" loading="lazy" />
            <span className="work-index">02 / PEOPLE</span>
            <span className="work-title">Portraits <ArrowUpRight aria-hidden="true" /></span>
            <span className="work-hover">VIEW STORY</span>
          </a>
          <a className="work-tile work-tile--interiors reveal" href="#interiors">
            <img src={imagePath("interior-01.jpg")} alt="A considered residential interior" loading="lazy" />
            <span className="work-index">03 / SPACES</span>
            <span className="work-title">Interiors <ArrowUpRight aria-hidden="true" /></span>
            <span className="work-hover">VIEW STORY</span>
          </a>
          <a className="work-tile work-tile--lifestyle reveal" href="#lifestyle">
            <img src={imagePath("lifestyle-01.jpg")} alt="A child enjoying a day by the sea" loading="lazy" />
            <span className="work-index">04 / EVERYDAY</span>
            <span className="work-title">Lifestyle <ArrowUpRight aria-hidden="true" /></span>
            <span className="work-hover">VIEW STORY</span>
          </a>
          <a className="work-tile work-tile--film reveal" href="#films">
            <img src={imagePath("hero-03.jpg")} alt="A couple sharing a moment outdoors" loading="lazy" />
            <span className="work-index">05 / MOVING IMAGE</span>
            <span className="work-title">Films <ArrowUpRight aria-hidden="true" /></span>
            <span className="work-hover">WATCH FILM</span>
          </a>
        </div>
      </section>

      <section className="story-feature section-pad" id="weddings">
        <div className="story-image reveal">
          <img src={imagePath("wedding-couple.jpg")} alt="A couple together on their wedding day" loading="lazy" />
          <span className="image-note">A day, held in memory</span>
        </div>
        <div className="story-copy reveal">
          <div className="section-kicker"><span>03</span> / WEDDINGS</div>
          <h2 className="display-heading">
            The day.
            <br />
            <em>The feeling.</em>
          </h2>
          <p>
            From the quiet anticipation before the ceremony to the loudest
            celebrations, we document the full rhythm of your wedding with an
            editorial eye and a documentary heart.
          </p>
          <a className="text-link" href="#contact">
            Plan your wedding story <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </section>

      <section className="gallery-section section-pad" id="portraits">
        <div className="section-heading reveal">
          <div>
            <div className="section-kicker"><span>04</span> / PORTRAITS</div>
            <h2 className="display-heading">Faces carry <em>stories.</em></h2>
          </div>
          <p>Portraits with atmosphere, expression and space to breathe.</p>
        </div>
        <div className="portrait-grid">
          {portraitGallery.map((image, index) => (
            <button
              className={`portrait-item portrait-item--${index + 1} reveal`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View image: ${image.alt}`}
              key={image.src}
            >
              <img src={imagePath(image.src)} alt={image.alt} loading="lazy" />
              <span>{image.caption}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="lifestyle" id="lifestyle">
        <div className="lifestyle-media">
          <img
            src={imagePath("lifestyle-03.jpg")}
            alt="Child playing on the beach"
            loading="lazy"
          />
          <span className="lifestyle-caption">The beautiful in-between</span>
        </div>
        <div className="lifestyle-copy reveal">
          <div className="section-kicker"><span>05</span> / LIFESTYLE</div>
          <h2 className="display-heading">
            Every chapter
            <br />
            <em>matters.</em>
          </h2>
          <p>
            Family, children and the unplanned moments in between — photographed
            with warmth and a little room for play.
          </p>
        </div>
      </section>

      <section className="interiors section-pad" id="interiors">
        <div className="section-heading reveal">
          <div>
            <div className="section-kicker"><span>06</span> / INTERIORS &amp; ARCHITECTURE</div>
            <h2 className="display-heading">
              Spaces deserve
              <br />
              <em>their own story.</em>
            </h2>
          </div>
          <p>
            Clean compositions, natural depth and a focus on the details that
            make a space feel designed.
          </p>
        </div>
        <div className="interior-grid">
          <figure className="interior-main reveal">
            <img src={imagePath("interior-01.jpg")} alt="Luxury living room interior" loading="lazy" />
            <figcaption>Living spaces · Hyderabad</figcaption>
          </figure>
          <figure className="interior-side reveal">
            <img src={imagePath("interior-02.jpg")} alt="Modern residential interior" loading="lazy" />
            <figcaption>Light, form &amp; material</figcaption>
          </figure>
          <figure className="interior-detail reveal">
            <img src={imagePath("interior-03.jpg")} alt="Architectural dining detail" loading="lazy" />
            <figcaption>Details in the everyday</figcaption>
          </figure>
        </div>
      </section>

      <section className="commercial section-pad" id="commercial">
        <div className="commercial-image reveal">
          <img
            src={imagePath("story-design.jpg")}
            alt="An editorial story from the studio portfolio"
            loading="lazy"
          />
          <span className="commercial-image-note">Image-led storytelling</span>
        </div>
        <div className="commercial-copy reveal">
          <div className="section-kicker"><span>07</span> / FOR BRANDS &amp; PEOPLE</div>
          <h2 className="display-heading">Visuals that <em>move.</em></h2>
          <p>
            Considered photography and films for brands, products, events, and
            places—with a focus on feeling, not just appearances.
          </p>
          <ul className="service-tags" aria-label="Commercial services">
            <li>Brand campaigns</li>
            <li>Promotional films</li>
            <li>Product photography</li>
            <li>Events &amp; spaces</li>
          </ul>
          <a className="text-link" href="#contact">
            Start a conversation <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="services-intro reveal">
          <div className="section-kicker"><span>08</span> / WHAT WE DO</div>
          <h2 className="display-heading">Made for <em>your story.</em></h2>
          <p>A thoughtful process, from the first conversation to the final frame.</p>
          <ol className="process-list">
            <li><span>01</span> Discover the story</li>
            <li><span>02</span> Plan the shoot</li>
            <li><span>03</span> Capture the moments</li>
            <li><span>04</span> Deliver the work</li>
          </ol>
        </div>
        <div className="service-list reveal">
          {services.map((service, index) => (
            <details className="service-row" key={service.title}>
              <summary>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{service.title}</span>
                <ArrowUpRight aria-hidden="true" size={18} />
              </summary>
              <p>{service.description}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-image reveal">
          <img src={imagePath("portrait-bw.jpg")} alt="Black and white portrait" loading="lazy" />
        </div>
        <div className="about-copy reveal">
          <div className="section-kicker"><span>09</span> / ABOUT THE STUDIO</div>
          <h2 className="display-heading">
            More than
            <br />
            <em>a frame.</em>
          </h2>
          <p>
            We believe photographs should feel like memories — not just images.
            Our approach blends honest observation with intentional composition,
            whether we&apos;re documenting a wedding, a person, a brand or a space.
          </p>
          <p>
            Based in {siteConfig.location}, we bring a calm presence, a curious
            eye, and care for the small details to every story we are invited to
            tell.
          </p>
          <div className="about-stats">
            <div><strong>PHOTO</strong><span>Still stories</span></div>
            <div><strong>FILM</strong><span>Moving memories</span></div>
            <div><strong>SPACE</strong><span>Visual design</span></div>
          </div>
          <a className="text-link" href="#contact">
            Meet us where your story begins <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="lightbox"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portrait gallery"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <button
            className="lightbox-close"
            ref={lightboxCloseRef}
            type="button"
            aria-label="Close image viewer"
            onClick={() => setSelectedImage(null)}
          >
            <X aria-hidden="true" />
          </button>
          <button
            className="lightbox-arrow lightbox-previous"
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setSelectedImage(
                (selectedImage - 1 + portraitGallery.length) % portraitGallery.length,
              )
            }
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <figure>
            <img
              src={imagePath(portraitGallery[selectedImage].src)}
              alt={portraitGallery[selectedImage].alt}
            />
            <figcaption>{portraitGallery[selectedImage].caption}</figcaption>
          </figure>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Next image"
            onClick={() => setSelectedImage((selectedImage + 1) % portraitGallery.length)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
