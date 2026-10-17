import React, { useState, useEffect } from "react";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { Navbar } from "./components/Navbar";
import { ArchitectureBanner } from "./components/ArchitectureBanner";
import { AboutSection } from "./components/AboutSection";
import { AimSection } from "./components/AimSection";
import { MissionVisionSection } from "./components/MissionVisionSection";
import { ToolsCatalogueSection } from "./components/ToolsCatalogueSection";
import { ProductsSection } from "./components/ProductsSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { ResponsibleAISection } from "./components/ResponsibleAISection";
import { PlaygroundSection } from "./components/PlaygroundSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ToolRunner } from "./components/ToolRunner";
import { LegalModal } from "./components/LegalModal";
import { AIVANTA_TOOLS } from "./data/tools";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [contactPrefill, setContactPrefill] = useState<string | undefined>();
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | null>(null);

  // Parse URL hash for tool routes or anchors
  const parseHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith("#/tools/")) {
      const toolId = hash.replace("#/tools/", "").trim();
      const matched = AIVANTA_TOOLS.find((t) => t.id === toolId);
      if (matched) {
        setActiveToolId(matched.id);
        return;
      }
    }
    setActiveToolId(null);
  };

  useEffect(() => {
    parseHash();
    window.addEventListener("hashchange", parseHash);
    window.addEventListener("popstate", parseHash);
    return () => {
      window.removeEventListener("hashchange", parseHash);
      window.removeEventListener("popstate", parseHash);
    };
  }, []);

  // Detect section visibility on scroll when in main landing view
  useEffect(() => {
    if (activeToolId) return;

    const sections = [
      "home",
      "about",
      "aim",
      "mission",
      "tools",
      "products",
      "solutions",
      "why-us",
      "responsible-ai",
      "sandbox",
      "faq",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeToolId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleOpenTool = (toolId: string) => {
    window.location.hash = `#/tools/${toolId}`;
    setActiveToolId(toolId);
  };

  const handleBackToTools = () => {
    window.location.hash = "#tools";
    setActiveToolId(null);
    setTimeout(() => {
      const el = document.getElementById("tools");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleProductSelect = (productName: string) => {
    setContactPrefill(productName);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isDark = theme === "dark";
  const activeTool = activeToolId
    ? AIVANTA_TOOLS.find((t) => t.id === activeToolId)
    : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ease-in-out ${
        isDark ? "bg-[#111110] text-[#F1EFEA] dark" : "bg-[#EBE9E5] text-[#151514]"
      }`}
    >
      {/* Sticky Floating Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
        isToolView={!!activeTool}
        onNavigateHome={() => {
          setActiveToolId(null);
          window.location.hash = "#home";
        }}
      />

      {/* Conditional: Tool Runner or Full Landing Page */}
      {activeTool ? (
        <main>
          <ToolRunner
            tool={activeTool}
            theme={theme}
            onBack={handleBackToTools}
          />
        </main>
      ) : (
        <main>
          {/* Section 1: Home — Liquid Sculpture Hero */}
          <div id="home">
            <SculptureHero
              brand="Aivanta Labs"
              eyebrow="Applied Intelligence & Practical Systems"
              headline={"Building Useful AI\nfor Everyone."}
              headlineAccent="for Everyone."
              body="We research and build intuitive, reliable, and responsible artificial intelligence tools that help students, professionals, creators, educators, and businesses learn, create, work, and solve everyday problems."
              primaryCta={{ label: "Explore AI Tools", href: "#tools" }}
              secondaryCta={{ label: "Our Company Aim", href: "#aim" }}
              navLinks={[
                { label: "AI Tools", href: "#tools" },
                { label: "Our Aim", href: "#aim" },
                { label: "About", href: "#about" },
                { label: "Mission & Vision", href: "#mission" },
                { label: "Solutions", href: "#solutions" },
                { label: "Why Us", href: "#why-us" },
                { label: "Responsible AI", href: "#responsible-ai" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ]}
              navCta={{ label: "Open Tools", href: "#tools" }}
              theme={theme}
              onThemeChange={(newTheme) => setTheme(newTheme)}
              themeToggle={true}
              background="#EBE9E5"
              darkBackground="#111110"
              backdropText="aivanta"
              hint="Move across the form to interact"
              hintTouch="Touch the form to interact"
              loadFonts={true}
            />
          </div>

          {/* Architectural Commitments Banner */}
          <ArchitectureBanner theme={theme} />

          {/* Section 2: About Aivanta Labs */}
          <AboutSection theme={theme} />

          {/* Section 3: Our Aim */}
          <AimSection theme={theme} />

          {/* Section 4: Mission & Vision */}
          <MissionVisionSection theme={theme} />

          {/* Section 5: Interactive AI Tools Catalogue */}
          <ToolsCatalogueSection
            theme={theme}
            onSelectTool={handleOpenTool}
          />

          {/* Architecture Products */}
          <ProductsSection
            theme={theme}
            onOpenTool={handleOpenTool}
            onSelectProductForContact={handleProductSelect}
          />

          {/* Section 6: Solutions & Services */}
          <SolutionsSection
            theme={theme}
            onSelectSolutionForContact={handleProductSelect}
          />

          {/* Section 7: Why Choose Us */}
          <WhyUsSection theme={theme} />

          {/* Section 8: Responsible AI & Privacy */}
          <ResponsibleAISection theme={theme} />

          {/* Section: Grounding & Decomposer Sandbox */}
          <PlaygroundSection theme={theme} />

          {/* Section 9: FAQ */}
          <FAQSection theme={theme} />

          {/* Section 10: Contact */}
          <ContactSection
            theme={theme}
            prefilledSubject={contactPrefill}
          />
        </main>
      )}

      {/* Section 11: Footer */}
      <Footer
        theme={theme}
        onOpenLegalModal={setLegalModalType}
      />

      {/* Privacy & Terms Modal */}
      <LegalModal
        type={legalModalType}
        theme={theme}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
