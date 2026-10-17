import React from "react";
import { Sparkles, Target, Eye, HeartHandshake, Compass, Shield, Lock, EyeOff, Lightbulb } from "lucide-react";

interface MissionVisionSectionProps {
  theme: "light" | "dark";
}

export const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({ theme }) => {
  const coreValues = [
    {
      name: "Innovation",
      icon: <Lightbulb className="w-4 h-4 text-amber-500" />,
      desc: "Constantly researching more efficient, responsive, and intuitive ways to apply artificial intelligence to tangible human problems.",
    },
    {
      name: "Simplicity",
      icon: <Compass className="w-4 h-4 text-emerald-500" />,
      desc: "Stripping away cryptic prompts, jargon, and clutter to deliver interfaces that make sense the moment you open them.",
    },
    {
      name: "Accessibility",
      icon: <HeartHandshake className="w-4 h-4 text-sky-500" />,
      desc: "Ensuring modern computational power serves students, small creators, and independent businesses, not solely giant tech monopolies.",
    },
    {
      name: "Transparency",
      icon: <Eye className="w-4 h-4 text-purple-500" />,
      desc: "Openly documenting model limitations, reasoning lineage, and citation origins without hand-waving or exaggerated claims.",
    },
    {
      name: "Privacy",
      icon: <Lock className="w-4 h-4 text-rose-500" />,
      desc: "Treating user data as private property: strictly ephemeral processing, zero unauthorized training retention, and edge-first choices.",
    },
    {
      name: "Responsible AI",
      icon: <Shield className="w-4 h-4 text-teal-500" />,
      desc: "Prioritizing human agency, ethical guardrails, and deterministic safety checks in every tool we release.",
    },
  ];

  return (
    <section id="mission" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Direction & Conviction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Our Mission, Vision, <span className="font-serif-accent italic">& Core Values.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Clear purpose guides every system architecture and user interface we build at Aivanta Labs.
        </p>
      </div>

      {/* Mission & Vision Side-by-Side Complete Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
        {/* Mission Card */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/80 border-[#2A2A26]"
              : "bg-white/80 border-[#DDD9D1]"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <span className="font-mono-code text-[11px] uppercase tracking-wider opacity-60 font-semibold block">
                  Our Purpose
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">Our Mission</h3>
              </div>
            </div>

            <p className="text-base sm:text-lg font-medium leading-relaxed mb-6 font-serif-accent italic opacity-90">
              "Build intuitive, reliable, and responsible AI-powered tools that help people learn, create, work, and solve everyday problems."
            </p>

            <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
              We focus on the human impact of software: helping students grasp complex topics with less anxiety, empowering creators to bring raw concepts to fruition, giving professionals hours of their lives back from administrative drudgery, and equipping teams with tools that behave consistently every time they run.
            </p>
          </div>

          <div className="pt-6 mt-8 border-t border-current/10 flex items-center justify-between text-xs font-mono-code opacity-50">
            <span>Core Anchor 01</span>
            <span>Reliable Utility</span>
          </div>
        </div>

        {/* Vision Card */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/80 border-[#2A2A26]"
              : "bg-white/80 border-[#DDD9D1]"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                <Eye className="w-6 h-6 text-sky-500" />
              </div>
              <div>
                <span className="font-mono-code text-[11px] uppercase tracking-wider opacity-60 font-semibold block">
                  Our Horizon
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">Our Vision</h3>
              </div>
            </div>

            <p className="text-base sm:text-lg font-medium leading-relaxed mb-6 font-serif-accent italic opacity-90">
              "Make useful AI technology accessible to people and organizations regardless of their technical background."
            </p>

            <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
              We envision a future where artificial intelligence operates seamlessly in the background as trusted, dependable digital craftsmanship. Rather than feeling alienating or requiring specialized jargon, AI should feel as approachable, safe, and indispensable as writing on paper or using a pocket calculator.
            </p>
          </div>

          <div className="pt-6 mt-8 border-t border-current/10 flex items-center justify-between text-xs font-mono-code opacity-50">
            <span>Core Anchor 02</span>
            <span>Universal Access</span>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mt-16 pt-12 border-t border-current/10">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-current/10">
          <h4 className="text-xs font-mono-code uppercase tracking-widest opacity-60">
            Six Guiding Values
          </h4>
          <span className="text-xs opacity-50 font-mono-code">Aivanta Labs Ethical Code</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                theme === "dark"
                  ? "bg-[#181816]/50 border-[#2A2A26]"
                  : "bg-white/50 border-[#DDD9D1]"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className={`p-1.5 rounded-lg ${
                    theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                  }`}
                >
                  {val.icon}
                </div>
                <h5 className="text-base font-semibold tracking-tight">{val.name}</h5>
              </div>
              <p className="text-xs opacity-75 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
