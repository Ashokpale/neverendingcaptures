import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { imagePath } from "../config/site";
import { acquireScrollLock } from "../utils/scrollLock";

const navigation = [
  ["Home", "#home"],
  ["Work", "#work"],
  ["Weddings", "#weddings"],
  ["Portraits", "#portraits"],
  ["Films", "#films"],
  ["Interiors", "#interiors"],
  ["About", "#about"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const setScrolled = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    const sections = navigation
      .map(([, href]) => document.querySelector(href))
      .filter((section): section is Element => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", setScrolled);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const releaseScrollLock = acquireScrollLock();
    const menu = menuRef.current;
    const focusableItems = menu?.querySelectorAll<HTMLElement>("a, button");
    if (focusableItems?.[0]) focusableItems[0].focus();
    const context = gsap.context(() => {
      gsap.fromTo(
        focusableItems ?? [],
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
      );
    }, menu ?? undefined);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === "Tab" && focusableItems?.length) {
        const first = focusableItems[0];
        const last = focusableItems[focusableItems.length - 1];
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
    return () => {
      releaseScrollLock();
      document.removeEventListener("keydown", handleKeyDown);
      context.revert();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header" id="top" ref={headerRef}>
        <a
          className="brand"
          href="#home"
          aria-label="Never Ending Captures home"
          onClick={closeMenu}
        >
          <img src={imagePath("logo.png")} alt="Never Ending Captures" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => {
            const id = href.slice(1);
            return (
              <a
                className={activeSection === id ? "active" : undefined}
                href={href}
                aria-current={activeSection === id ? "location" : undefined}
                key={href}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <a className="header-cta" href="#contact">
          Enquire <ArrowUpRight aria-hidden="true" size={14} />
        </a>
        <button
          className="menu-toggle"
          ref={menuButtonRef}
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
        ref={menuRef}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={menuOpen}
      >
        <div className="mobile-menu-top">
          <span>NEVER ENDING CAPTURES</span>
          <button type="button" aria-label="Close menu" onClick={closeMenu}>
            <X aria-hidden="true" />
          </button>
        </div>
        <nav>
          {navigation.map(([label, href], index) => (
            <a
              href={href}
              key={href}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <span>08</span>Contact<ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
        <p>Photography · Films · Visual stories</p>
      </div>
    </>
  );
}
