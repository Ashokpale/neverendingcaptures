import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function SiteFooter() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="footer">
      <div>© {year} Never Ending Captures</div>
      <div>Photography · Films · Visual Stories</div>
      <a href="#top">
        Back to top <ArrowUp aria-hidden="true" size={13} />
      </a>
    </footer>
  );
}
