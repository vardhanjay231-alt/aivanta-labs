import React from "react";
import { ArrowUp, ShieldCheck } from "lucide-react";

interface FooterProps {
  theme: "light" | "dark";
  onOpenLegalModal: (type: "privacy" | "terms") => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onOpenLegalModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 border-t border-current/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-current/10">
        {/* Brand & Mission */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-lg tracking-tight">Aivanta Labs</span>
          </div>
          <p className="text-xs sm:text-sm opacity-70 leading-relaxed max-w-sm">
            Building Useful AI for Everyone. We research and build intuitive, reliable, and responsible artificial intelligence tools that help people learn, create, work, and solve everyday problems.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono-code opacity-50">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>Ephemeral In-Memory AI Runtime • Zero Data Harvesting</span>
          </div>
        </div>

        {/* Column 1: AI Tools Catalogue */}
        <div className="md:col-span-2 space-y-3">
          <span className="font-mono-code text-[11px] uppercase tracking-wider font-semibold opacity-60">
            Interactive Tools
          </span>
          <ul className="space-y-2 text-xs opacity-75">
            <li>
              <a href="#/tools/writing-assistant" className="hover:opacity-100 transition-opacity">
                Writing Assistant
              </a>
            </li>
            <li>
              <a href="#/tools/summarizer" className="hover:opacity-100 transition-opacity">
                Text Summarizer
              </a>
            </li>
            <li>
              <a href="#/tools/idea-generator" className="hover:opacity-100 transition-opacity">
                Idea Generator
              </a>
            </li>
            <li>
              <a href="#/tools/study-assistant" className="hover:opacity-100 transition-opacity">
                Study Assistant
              </a>
            </li>
            <li>
              <a href="#/tools/content-planner" className="hover:opacity-100 transition-opacity">
                Content Planner
              </a>
            </li>
            <li>
              <a href="#/tools/productivity-organizer" className="hover:opacity-100 transition-opacity">
                Task Organizer
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Company & Purpose */}
        <div className="md:col-span-3 space-y-3">
          <span className="font-mono-code text-[11px] uppercase tracking-wider font-semibold opacity-60">
            Company & Purpose
          </span>
          <ul className="space-y-2 text-xs opacity-75">
            <li>
              <a href="#about" className="hover:opacity-100 transition-opacity">
                About Aivanta Labs
              </a>
            </li>
            <li>
              <a href="#aim" className="hover:opacity-100 transition-opacity">
                Our Aim (For Students & Teams)
              </a>
            </li>
            <li>
              <a href="#mission" className="hover:opacity-100 transition-opacity">
                Mission, Vision & Values
              </a>
            </li>
            <li>
              <a href="#solutions" className="hover:opacity-100 transition-opacity">
                Solutions & Services
              </a>
            </li>
            <li>
              <a href="#why-us" className="hover:opacity-100 transition-opacity">
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#responsible-ai" className="hover:opacity-100 transition-opacity">
                Responsible AI & Privacy
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:opacity-100 transition-opacity">
                Frequently Asked Questions
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Communication & Legal */}
        <div className="md:col-span-3 space-y-3">
          <span className="font-mono-code text-[11px] uppercase tracking-wider font-semibold opacity-60">
            Direct Channels
          </span>
          <ul className="space-y-2 text-xs opacity-75">
            <li>
              <a href="#contact" className="hover:opacity-100 transition-opacity">
                Inquiry & Feedback Portal
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal("privacy")}
                className="hover:opacity-100 transition-opacity text-left cursor-pointer"
              >
                Privacy Policy & Data Sovereignty
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal("terms")}
                className="hover:opacity-100 transition-opacity text-left cursor-pointer"
              >
                Terms of Architecture & Usage
              </button>
            </li>
            <li>
              <a href="#sandbox" className="hover:opacity-100 transition-opacity">
                Grounding Sandbox
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
        <p>© {currentYear} Aivanta Labs Inc. All rights reserved. Building Useful AI for Everyone.</p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onOpenLegalModal("privacy")}
            className="hover:opacity-100 transition-opacity cursor-pointer"
          >
            Privacy
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalModal("terms")}
            className="hover:opacity-100 transition-opacity cursor-pointer"
          >
            Terms
          </button>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:opacity-100 transition-opacity cursor-pointer font-medium"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
