import React from "react";
import { Cpu, Lock, CheckCircle2, SlidersHorizontal, Sparkles } from "lucide-react";

interface ArchitectureBannerProps {
  theme: "light" | "dark";
}

export const ArchitectureBanner: React.FC<ArchitectureBannerProps> = ({ theme }) => {
  const pillars = [
    {
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      tag: "DETERMINISM",
      title: "Verifiable Accuracy",
      desc: "Replacing stochastic guesswork with constrained grammar generation, schema validation, and structured output guarantees.",
    },
    {
      icon: <Lock className="w-4 h-4 text-sky-500" />,
      tag: "SOVEREIGNTY",
      title: "Private by Default",
      desc: "Zero retention pipelines and full on-premise or edge execution without unwanted telemetric exfiltration.",
    },
    {
      icon: <Cpu className="w-4 h-4 text-amber-500" />,
      tag: "EFFICIENCY",
      title: "Compact Distillation",
      desc: "Engineered small language models (SLMs) delivering frontier reasoning at 10x lower latency and minimal compute footprint.",
    },
    {
      icon: <SlidersHorizontal className="w-4 h-4 text-purple-500" />,
      tag: "CONTROL",
      title: "Human In The Loop",
      desc: "Ergonomic supervisory rails, continuous execution checkpoints, and transparent audit traces for high-stakes workflows.",
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
      {/* Intro Sub-Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Applied Intelligence Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight">
            Engineered for reliability, <span className="font-serif-accent italic">not spectacle.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Artificial intelligence becomes genuinely useful only when it behaves predictably, respects user autonomy, and integrates cleanly into existing operations.
        </p>
      </div>

      {/* Grid of Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {pillars.map((item, i) => (
          <div
            key={i}
            className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#181816]/60 border-[#2A2A26] hover:border-[#404038] hover:bg-[#1D1D1A]"
                : "bg-white/60 border-[#DDD9D1] hover:border-[#BCB7AC] hover:bg-white/90"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                {item.icon}
              </div>
              <span className="font-mono-code text-[10px] tracking-wider font-semibold opacity-60 px-2 py-0.5 rounded-full border border-current/10">
                {item.tag}
              </span>
            </div>

            <h3 className="text-base font-semibold tracking-tight mb-2 group-hover:translate-x-0.5 transition-transform">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed opacity-70">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
