import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../config/site";

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`;

export function ContactSection() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-inner reveal">
        <div className="section-kicker"><span>11</span> / LET&apos;S CREATE</div>
        <h2 className="display-heading">
          Have a story
          <br />
          <em>to tell?</em>
        </h2>
        <p>
          Tell us what you&apos;re planning and let&apos;s create something worth
          remembering.
        </p>
        <div className="contact-actions">
          <a
            className="primary-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us <ArrowUpRight aria-hidden="true" size={14} />
          </a>
          <a className="secondary-btn" href={`mailto:${siteConfig.email}`}>
            Email us <ArrowUpRight aria-hidden="true" size={14} />
          </a>
          <a
            className="secondary-btn"
            href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}
          >
            Call {siteConfig.phone} <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
        <div className="contact-meta">
          <span>
            Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </span>
          <span>
            Phone / WhatsApp:{" "}
            <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
          </span>
          <span>Location: {siteConfig.location}</span>
          <span>
            Instagram:{" "}
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
              @neverendingcaptures
            </a>
          </span>
        </div>
        <p className="contact-note">
          Every good story begins with a conversation. We would love to hear
          yours.
        </p>
      </div>
    </section>
  );
}
