import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { imagePath } from "../config/site";

const navigation = [
  ["Home", "#home"],
  ["Work", "#work"],
  ["Weddings", "#weddings"],
  ["Portraits", "#portraits"],
  ["Interiors", "#interiors"],
  ["Films", "#films"],
  ["About", "#about"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header" id="top">
        <a
          className="brand"
          href="#top"
          aria-label="Never Ending Captures home"
          onClick={closeMenu}
        >
          <img src={imagePath("logo.png")} alt="Never Ending Captures" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, href], index) => (
            <a className={index === 0 ? "active" : undefined} href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Enquire <ArrowUpRight aria-hidden="true" size={14} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}
