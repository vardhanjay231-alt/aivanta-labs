import React from "react";
import { Sparkles, MousePointerClick, Sliders, ShieldCheck, HeartHandshake, CheckCircle } from "lucide-react";

interface WhyUsSectionProps {
  theme: "light" | "dark";
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ theme }) => {
  const differentiators = [
    {
      title: "Effortless Usability",
      subtitle: "Zero prompt engineering required",
      icon: <MousePointerClick className="w-5 h-5 text-emerald-500" />,
      description:
        "You shouldn't have to craft convoluted multi-paragraph prompts just to get work done. Aivanta tools feature intuitive controls, clear dropdown options, and specialized presets so anyone can produce immediate quality.",
    },
    {
      title: "Clear, Deterministic Workflows",
      subtitle: "Predictable outputs you can depend on",
      icon: <Sliders className="w-5 h-5 text-sky-500" />,
      description:
        "We constrain generative models with structural invariants and schema verification. When you ask for an executive brief or a JSON plan, you get structured, repeatable outputs instead of wandering conversational tangents.",
    },
    {
      title: "Genuine Accessibility",
      subtitle: "Built for everyone, everywhere",
      icon: <HeartHandshake className="w-5 h-5 text-purple-500" />,
      description:
        "Designed to work smoothly across low-bandwidth environments, desktop laptops, and mobile phones. Our clean, responsive layouts ensure students and professionals can access tools anywhere.",
    },
    {
      title: "Privacy-Conscious Architecture",
      subtitle: "Your inputs stay your property",
      icon: <ShieldCheck className="w-5 h-5 text-rose-500" />,
      description:
        "We enforce ephemeral, zero-retention processing. Your writing, proprietary notes, and ideas are never stored in databases, never auctioned to advertisers, and never used to train public foundation models.",
    },
    {
      title: "Real Practical Value",
      subtitle: "Hours saved, errors caught",
      icon: <CheckCircle className="w-5 h-5 text-amber-500" />,
      description:
        "We reject flashy party tricks and vanity features. Every single tool in our catalogue solves a concrete everyday chore: summarizing dense pages, polishing important emails, or organizing overwhelming task backlogs.",
    },
  ];

  return (
    <section id="why-us" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>The Aivanta Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Why choose <span className="font-serif-accent italic">Aivanta Labs.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          We strip away artificial intelligence hype to deliver dependable, accessible tools built for everyday life and honest productivity.
        </p>
      </div>

      {/* Grid of Differentiators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {differentiators.map((diff, i) => (
          <div
            key={i}
            className={`p-8 rounded-3xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#181816]/70 border-[#2A2A26] hover:border-[#404038]"
                : "bg-white/70 border-[#DDD9D1] hover:border-[#B5B0A4]"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                {diff.icon}
              </div>
              <span className="font-mono-code text-[11px] font-bold opacity-30">
                0{i + 1}
              </span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight mb-1">
              {diff.title}
            </h3>
            <p className="text-xs font-mono-code opacity-50 uppercase tracking-wider mb-4 font-semibold">
              {diff.subtitle}
            </p>
            <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
              {diff.description}
            </p>
          </div>
        ))}

        {/* Closing Promise Card */}
        <div
          className={`p-8 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#1D1D19] border-[#383832]"
              : "bg-[#F3F0E9] border-[#CCC7BD]"
          }`}
        >
          <div>
            <span className="font-mono-code text-xs uppercase tracking-wider text-emerald-500 font-semibold block mb-2">
              Our Guarantee
            </span>
            <h4 className="text-2xl font-semibold tracking-tight mb-3">
              Tools that respect your time and intellect.
            </h4>
            <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
              No hidden fees, no dark patterns, no fake claims. Just intuitive AI tools you can open, use, and rely upon every single day.
            </p>
          </div>

          <div className="pt-6 border-t border-current/10">
            <a
              href="#tools"
              className={`inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all ${
                theme === "dark"
                  ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                  : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
              }`}
            >
              <span>Try Our AI Tools Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
