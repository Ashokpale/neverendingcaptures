import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { siteConfig, imagePath } from "../config/site";

export function SiteFooter() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" aria-label="Never Ending Captures home">
            <img src={imagePath("logo.png")} alt="" />
          </a>
          <p>Photography, films and visual stories made to be remembered.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">EXPLORE</span>
          <a href="#work">Selected work</a>
          <a href="#weddings">Weddings</a>
          <a href="#portraits">Portraits</a>
          <a href="#interiors">Interiors</a>
          <a href="#films">Films</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">SAY HELLO</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <span>{siteConfig.location}</span>
        </div>
        <a className="footer-top" href="#top">
          <span>Back to top</span>
          <ArrowUp aria-hidden="true" size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {year} Never Ending Captures</span>
        <span>Photography · Films · Visual Stories</span>
        <span>Made with care in Hyderabad</span>
      </div>
    </footer>
  );
}
