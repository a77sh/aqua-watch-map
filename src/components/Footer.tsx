import { Link } from "react-router-dom";
import { Droplets } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="h-1 w-full water-gradient opacity-40" />
      <div className="container py-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
                <Droplets className="h-5 w-5 text-secondary-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                AquaRadar
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-muted-foreground md:text-left">
              Community-driven water issue reporting. Helping citizens protect their water infrastructure.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Navigate
              </span>
              <Link
                to="/"
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to="/community"
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Community
              </Link>
              <Link
                to="/report"
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Report Issue
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Built for communities. Powered by open data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
