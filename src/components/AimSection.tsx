import React from "react";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Palette,
  BookOpen,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface AimSectionProps {
  theme: "light" | "dark";
}

export const AimSection: React.FC<AimSectionProps> = ({ theme }) => {
  const audiences = [
    {
      title: "For Students & Learners",
      icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
      tag: "EDUCATION & MASTERY",
      description:
        "Demystify intimidating mathematical proofs, historical analyses, and scientific principles with intuitive analogies, structured summaries, and interactive self-quizzing tools.",
      benefits: [
        "Plain-English breakdowns of dense textbooks",
        "Targeted practice questions with step-by-step solutions",
        "Turn lecture notes into clear study guides in seconds",
      ],
    },
    {
      title: "For Professionals & Teams",
      icon: <Briefcase className="w-5 h-5 text-sky-500" />,
      tag: "WORKFLOW VELOCITY",
      description:
        "Elevate executive writing, condense lengthy vendor agreements and meeting transcripts, and organize unstructured to-do lists into clear prioritized sprint plans.",
      benefits: [
        "Executive summaries that highlight actionable decisions",
        "Polished business communication matching specific tones",
        "Eliminate repetitive clerical busywork",
      ],
    },
    {
      title: "For Creators & Writers",
      icon: <Palette className="w-5 h-5 text-purple-500" />,
      tag: "CREATIVE MOMENTUM",
      description:
        "Overcome creative blocks with structured brainstorming engines, multi-week content calendars, and collaborative drafting tools designed to keep you in flow.",
      benefits: [
        "Diverse concept generation with immediate next steps",
        "Chronological content planning and milestone schedules",
        "Refine prose while retaining your distinct creative voice",
      ],
    },
    {
      title: "For Educators & Mentors",
      icon: <BookOpen className="w-5 h-5 text-amber-500" />,
      tag: "PEDAGOGICAL TOOLS",
      description:
        "Craft interactive classroom exercises, generate concept analogies tailored to different age groups, and prepare engaging teaching materials efficiently.",
      benefits: [
        "Adapt explanations across elementary to college levels",
        "Build comprehension checks and discussion prompts",
        "Focus more time on direct student mentorship",
      ],
    },
    {
      title: "For Businesses & Organizations",
      icon: <Building2 className="w-5 h-5 text-rose-500" />,
      tag: "PRACTICAL AUTOMATION",
      description:
        "Integrate verified, privacy-first artificial intelligence into daily operational pipelines without complex prompt gymnastics, enterprise lock-in, or data leakage risks.",
      benefits: [
        "Private by default with zero retention options",
        "Consistent structured schemas instead of random text",
        "Accessible to non-technical team members immediately",
      ],
    },
  ];

  return (
    <section id="aim" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Our Company Aim</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Practical AI for <span className="font-serif-accent italic">everyday human endeavor.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Our aim is to make artificial intelligence practical, accessible, and useful for students, professionals, creators, educators, and businesses.
        </p>
      </div>

      {/* Grid of Audiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {audiences.map((aud, i) => (
          <div
            key={i}
            className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              theme === "dark"
                ? "bg-[#181816]/70 border-[#2A2A26] hover:border-[#404038]"
                : "bg-white/70 border-[#DDD9D1] hover:border-[#B5B0A4]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`p-3 rounded-2xl ${
                    theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                  }`}
                >
                  {aud.icon}
                </div>
                <span className="font-mono-code text-[10px] tracking-wider font-semibold opacity-60 px-2 py-0.5 rounded-full border border-current/10">
                  {aud.tag}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight mb-3">
                {aud.title}
              </h3>
              <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
                {aud.description}
              </p>

              <div className="space-y-2.5 mb-6">
                {aud.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs opacity-80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-current/10 text-[11px] font-mono-code opacity-50">
              Designed for immediate everyday utility
            </div>
          </div>
        ))}

        {/* Highlight Card */}
        <div
          className={`p-8 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#1E1E1B] to-[#141412] border-[#383832]"
              : "bg-gradient-to-br from-white to-[#F2EFE8] border-[#CCC7BD]"
          }`}
        >
          <div>
            <span className="font-mono-code text-xs uppercase tracking-wider text-emerald-500 font-semibold block mb-3">
              The Aivanta Standard
            </span>
            <h3 className="text-2xl font-semibold tracking-tight mb-3">
              No technical barrier, no hidden friction.
            </h3>
            <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
              You should not have to be a prompt engineer or computer scientist to benefit from state-of-the-art intelligence. We design tools that work for anyone with an idea or a problem to solve.
            </p>
          </div>

          <a
            href="#tools"
            className={`inline-flex items-center justify-center gap-2 text-xs font-semibold px-6 py-3 rounded-full transition-all ${
              theme === "dark"
                ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
            }`}
          >
            <span>Explore All Available Tools</span>
          </a>
        </div>
      </div>
    </section>
  );
};
