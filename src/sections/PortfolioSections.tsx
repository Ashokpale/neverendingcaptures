import { ArrowRight, ArrowUpRight } from "lucide-react";
import { imagePath } from "../config/site";

const categories = [
  {
    title: "Weddings",
    caption: "Real moments. Lasting stories.",
    image: "wedding-bw.jpg",
    alt: "Wedding photography",
    href: "#weddings",
  },
  {
    title: "Portraits",
    caption: "People. Emotion. Character.",
    image: "bridal-portrait.jpg",
    alt: "Traditional portrait photography",
    href: "#portraits",
  },
  {
    title: "Interiors",
    caption: "Spaces that speak.",
    image: "interior-01.jpg",
    alt: "Interior photography",
    href: "#interiors",
  },
  {
    title: "Lifestyle",
    caption: "Every chapter deserves to be remembered.",
    image: "lifestyle-01.jpg",
    alt: "Lifestyle portrait at the beach",
    href: "#lifestyle",
  },
];

const portraits = [
  ["portrait-green.jpg", "Traditional portrait"],
  ["portrait-dramatic.jpg", "Dramatic portrait"],
  ["portrait-bw.jpg", "Black and white portrait"],
  ["dance-01.jpg", "Classical dance portrait"],
  ["dance-02.jpg", "Classical dance portrait"],
  ["portrait-saree.jpg", "Traditional saree portrait"],
];

export function PortfolioSections() {
  return (
    <>
      <section className="intro section-pad reveal">
        <div className="section-kicker">01 / THE STUDIO</div>
        <div className="intro-grid">
          <h2>
            We capture
            <br />
            <em>what lasts.</em>
          </h2>
          <div>
            <p className="lead">
              Never Ending Captures is a photography and filmmaking studio built
              around real moments, thoughtful frames and stories that stay long
              after the day is over.
            </p>
            <a className="text-link" href="#about">
              Discover our approach <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </div>
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="section-heading reveal">
          <div>
            <div className="section-kicker">02 / SELECTED WORK</div>
            <h2>
              Stories in <em>frames.</em>
            </h2>
          </div>
          <p>Wedding days, portraits, spaces and the people who bring them to life.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a
              className={`category-card reveal${index === 0 ? " card-large" : ""}`}
              href={category.href}
              key={category.title}
            >
              <img src={imagePath(category.image)} alt={category.alt} />
              <div className="card-overlay">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{category.title}</h3>
                <p>{category.caption}</p>
                <b>
                  Explore <ArrowRight aria-hidden="true" size={13} />
                </b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="story-feature" id="weddings">
        <div className="story-image reveal">
          <img src={imagePath("wedding-couple.jpg")} alt="Wedding couple outdoors" />
        </div>
        <div className="story-copy reveal">
          <div className="section-kicker">03 / WEDDINGS</div>
          <h2>
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
            Plan your wedding story <ArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
      </section>

      <section className="gallery-section section-pad" id="portraits">
        <div className="section-heading reveal">
          <div>
            <div className="section-kicker">04 / PORTRAITS</div>
            <h2>
              Faces carry <em>stories.</em>
            </h2>
          </div>
          <p>Portraits with atmosphere, expression and space to breathe.</p>
        </div>
        <div className="masonry">
          {portraits.map(([image, alt]) => (
            <figure className="masonry-item reveal" key={image}>
              <img src={imagePath(image)} alt={alt} loading="lazy" />
            </figure>
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
        </div>
        <div className="lifestyle-copy reveal">
          <div className="section-kicker">05 / LIFESTYLE</div>
          <h2>
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
            <div className="section-kicker">06 / INTERIORS &amp; ARCHITECTURE</div>
            <h2>
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
            <img
              src={imagePath("interior-01.jpg")}
              alt="Luxury living room interior"
              loading="lazy"
            />
          </figure>
          <figure className="interior-side reveal">
            <img
              src={imagePath("interior-02.jpg")}
              alt="Modern white interior"
              loading="lazy"
            />
          </figure>
          <figure className="interior-detail reveal">
            <img
              src={imagePath("interior-03.jpg")}
              alt="Architectural dining detail"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-image reveal">
          <img
            src={imagePath("portrait-bw.jpg")}
            alt="Black and white portrait"
            loading="lazy"
          />
        </div>
        <div className="about-copy reveal">
          <div className="section-kicker">08 / ABOUT NEC</div>
          <h2>
            More than
            <br />
            <em>a frame.</em>
          </h2>
          <p>
            We believe photographs should feel like memories — not just images.
            Our approach blends honest observation with intentional composition,
            whether we&apos;re documenting a wedding, a person, a brand or a space.
          </p>
          <div className="about-stats">
            <div>
              <strong>PHOTO</strong>
              <span>Still stories</span>
            </div>
            <div>
              <strong>FILM</strong>
              <span>Moving memories</span>
            </div>
            <div>
              <strong>SPACE</strong>
              <span>Visual design</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
