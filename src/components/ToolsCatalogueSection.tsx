import React, { useState } from "react";
import { AIVANTA_TOOLS, AivantaTool } from "../data/tools";
import {
  Sparkles,
  ArrowRight,
  Search,
  PenTool,
  FileText,
  GraduationCap,
  Calendar,
  CheckSquare,
  Terminal,
  Shield,
  Layers,
  Zap,
} from "lucide-react";

interface ToolsCatalogueSectionProps {
  theme: "light" | "dark";
  onSelectTool: (toolId: string) => void;
}

export const ToolsCatalogueSection: React.FC<ToolsCatalogueSectionProps> = ({
  theme,
  onSelectTool,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Writing", "Productivity", "Education", "Creative", "System"];

  const filteredTools = AIVANTA_TOOLS.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-emerald-500" };
    switch (iconName) {
      case "PenTool":
        return <PenTool {...props} />;
      case "FileText":
        return <FileText {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "GraduationCap":
        return <GraduationCap {...props} />;
      case "Calendar":
        return <Calendar {...props} />;
      case "CheckSquare":
        return <CheckSquare {...props} />;
      case "Terminal":
        return <Terminal {...props} />;
      case "Shield":
        return <Shield {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section id="tools" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Interactive AI Tools Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Practical AI tools that <span className="font-serif-accent italic">actually work.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Select any tool below to launch its dedicated, fully functional interactive studio powered by Aivanta’s server AI runtime.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer font-medium whitespace-nowrap ${
                selectedCategory === cat
                  ? theme === "dark"
                    ? "bg-[#F1EFEA] text-[#111110] border-white font-semibold"
                    : "bg-[#151514] text-[#F1EFEA] border-black font-semibold"
                  : "border-current/15 opacity-70 hover:opacity-100 hover:border-current/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI tools..."
            className={`w-full text-xs pl-9 pr-4 py-2.5 rounded-full border focus:outline-none transition-all ${
              theme === "dark"
                ? "bg-[#181816] border-[#30302A] text-[#F1EFEA] focus:border-[#55554B]"
                : "bg-white border-[#DDD9D1] text-[#151514] focus:border-[#8E8A80]"
            }`}
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectTool(tool.id);
              }
            }}
            className={`group relative flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-current/40 ${
              theme === "dark"
                ? "bg-[#181816]/70 border-[#2A2A26] hover:border-[#4A4A40] hover:bg-[#1D1D19]"
                : "bg-white/70 border-[#DDD9D1] hover:border-[#B5B0A4] hover:bg-white"
            }`}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${
                    theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                  }`}
                >
                  {renderIcon(tool.iconName)}
                </div>
                <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-emerald-500 bg-emerald-500/10 font-semibold">
                  {tool.status}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="mb-3">
                <span className="font-mono-code text-[10px] uppercase tracking-wider opacity-60 font-medium">
                  {tool.category}
                </span>
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-emerald-500 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs opacity-60 mt-0.5 font-medium line-clamp-1">
                  {tool.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs opacity-75 leading-relaxed line-clamp-3 mb-6">
                {tool.description}
              </p>
            </div>

            {/* Clickable Action Button */}
            <div className="pt-4 border-t border-current/10 flex items-center justify-between">
              <span className="text-[11px] font-mono-code opacity-50 flex items-center gap-1">
                <Zap size={11} className="text-sky-500" />
                Live AI Tool
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTool(tool.id);
                }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#252522] border-[#383832] text-[#F1EFEA] group-hover:bg-[#F1EFEA] group-hover:text-[#111110]"
                    : "bg-[#EFECE5] border-[#D0CCC2] text-[#151514] group-hover:bg-[#151514] group-hover:text-[#F1EFEA]"
                }`}
              >
                <span>Open Tool</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm opacity-60 font-mono-code">
            No tools found matching "{searchQuery}" in category "{selectedCategory}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-xs font-semibold text-emerald-500 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
