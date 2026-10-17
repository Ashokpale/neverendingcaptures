import { usePageEffects } from "./hooks/usePageEffects";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { CursorRing } from "./components/CursorRing";
import { ContactSection } from "./sections/ContactSection";
import { FilmSection } from "./sections/FilmSection";
import { HeroSection } from "./sections/HeroSection";
import { PortfolioSections } from "./sections/PortfolioSections";

export default function App() {
  const pageRef = usePageEffects();

  return (
    <div className="min-h-screen" ref={pageRef}>
      <div className="site-noise" aria-hidden="true" />
      <CursorRing />
      <SiteHeader />
      <main>
        <HeroSection />
        <PortfolioSections />
        <FilmSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
