import React, { useState, useEffect } from "react";
import { ArrowUpRight, Sun, Moon, Menu, X, ShieldCheck } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  activeSection: string;
  onNavigateHome?: () => void;
  isToolView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  activeSection,
  onNavigateHome,
  isToolView = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "AI Tools", href: "#tools", id: "tools" },
    { label: "Our Aim", href: "#aim", id: "aim" },
    { label: "About", href: "#about", id: "about" },
    { label: "Mission & Vision", href: "#mission", id: "mission" },
    { label: "Solutions", href: "#solutions", id: "solutions" },
    { label: "Why Us", href: "#why-us", id: "why-us" },
    { label: "Responsible AI", href: "#responsible-ai", id: "responsible-ai" },
    { label: "FAQ", href: "#faq", id: "faq" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isToolView && onNavigateHome) {
      onNavigateHome();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating navigation when scrolled or in tool view */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 pointer-events-none ${
          scrolled || isToolView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Pill */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#181816]/90 border-[#2A2A26] text-[#F1EFEA] hover:border-[#40403A]"
                : "bg-[#F3F1EC]/90 border-[#D8D5CE] text-[#151514] hover:border-[#BCB8AF]"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-sm tracking-tight">Aivanta Labs</span>
          </a>

          {/* Desktop Nav Links Pill */}
          <nav
            className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-sm transition-all ${
              theme === "dark"
                ? "bg-[#181816]/95 border-[#2A2A26] text-[#A6A49F]"
                : "bg-[#F3F1EC]/95 border-[#D8D5CE] text-[#63625E]"
            }`}
            aria-label="Sticky Primary"
          >
            {navLinks.slice(0, 7).map((link) => {
              const isActive = !isToolView && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? theme === "dark"
                        ? "bg-[#252522] text-[#F1EFEA] font-medium"
                        : "bg-[#E5E2DC] text-[#151514] font-medium"
                      : theme === "dark"
                      ? "hover:text-[#F1EFEA] hover:bg-[#20201D]"
                      : "hover:text-[#151514] hover:bg-[#ECE9E3]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions Pill */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-2 rounded-full border backdrop-blur-md transition-all duration-200 cursor-pointer ${
                theme === "dark"
                  ? "bg-[#181816]/90 border-[#2A2A26] text-[#F1EFEA] hover:bg-[#252522]"
                  : "bg-[#F3F1EC]/90 border-[#D8D5CE] text-[#151514] hover:bg-[#EAE7E1]"
              }`}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="#tools"
              onClick={(e) => handleLinkClick(e, "#tools")}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${
                theme === "dark"
                  ? "bg-[#F1EFEA] text-[#111110] border-transparent hover:bg-white"
                  : "bg-[#151514] text-[#F1EFEA] border-transparent hover:bg-black"
              }`}
            >
              AI Tools Catalogue
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-[#181816]/90 border-[#2A2A26] text-[#F1EFEA]"
                  : "bg-[#F3F1EC]/90 border-[#D8D5CE] text-[#151514]"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-50 lg:hidden backdrop-blur-xl pt-20 px-6 flex flex-col justify-between pb-8 transition-all overflow-y-auto ${
            theme === "dark" ? "bg-[#111110]/98 text-[#F1EFEA]" : "bg-[#EBE9E5]/98 text-[#151514]"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-current/10">
              <span className="text-xs uppercase tracking-widest font-mono-code opacity-60">Directory</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full border border-current/20"
              >
                <X size={16} />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-medium tracking-tight py-2 border-b border-current/5 hover:opacity-70 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-current/10 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-70 font-mono-code">Theme Appearance</span>
              <button
                type="button"
                onClick={onToggleTheme}
                className="px-3 py-1.5 rounded-full border border-current/20 text-xs flex items-center gap-2 cursor-pointer"
              >
                {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
            <a
              href="#tools"
              onClick={(e) => handleLinkClick(e, "#tools")}
              className={`w-full text-center py-3 rounded-full text-xs font-semibold ${
                theme === "dark" ? "bg-[#F1EFEA] text-[#111110]" : "bg-[#151514] text-[#F1EFEA]"
              }`}
            >
              Open AI Tools
            </a>
          </div>
        </div>
      )}
    </>
  );
};
