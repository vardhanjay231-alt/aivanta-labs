import React from "react";
import { Sparkles, AlertTriangle, ShieldCheck, Scale, CheckCircle2, UserCheck } from "lucide-react";

interface ResponsibleAISectionProps {
  theme: "light" | "dark";
}

export const ResponsibleAISection: React.FC<ResponsibleAISectionProps> = ({ theme }) => {
  return (
    <section id="responsible-ai" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Ethical Standards & Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Responsible AI in <span className="font-serif-accent italic">practice, not theory.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          We believe honesty about what artificial intelligence can and cannot do is essential for building genuine, long-term public trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        {/* Understanding Model Limitations */}
        <div
          className={`p-8 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/70 border-[#2A2A26]"
              : "bg-white/70 border-[#DDD9D1]"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Model Limitations</h3>
            </div>

            <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
              Language models are sophisticated statistical inference engines, but they are not omniscient oracle systems. They can intermittently produce inaccurate dates, biased text, or plausible-sounding hallucinations when ungrounded.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs opacity-80">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <span>Always verify critical legal, medical, or financial calculations independently.</span>
              </div>
              <div className="flex items-start gap-2 text-xs opacity-80">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <span>We design tools to show citation coordinates and prompt for manual review.</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-current/10 text-[11px] font-mono-code opacity-50">
            Pillar 01 • Transparent Boundaries
          </div>
        </div>

        {/* Protecting User Privacy */}
        <div
          className={`p-8 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/70 border-[#2A2A26]"
              : "bg-white/70 border-[#DDD9D1]"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Protecting Privacy</h3>
            </div>

            <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
              Your drafts, study notes, intellectual property, and questions are yours alone. We adhere to a strict ephemeral processing model that ensures your data is never monetized or absorbed into public model weights.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs opacity-80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>Zero model retraining on user inputs or queries.</span>
              </div>
              <div className="flex items-start gap-2 text-xs opacity-80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>Encrypted transit (TLS 1.3) with instant memory disposal after completion.</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-current/10 text-[11px] font-mono-code opacity-50">
            Pillar 02 • Absolute Data Respect
          </div>
        </div>

        {/* Encouraging Responsible Use */}
        <div
          className={`p-8 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/70 border-[#2A2A26]"
              : "bg-white/70 border-[#DDD9D1]"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                }`}
              >
                <UserCheck className="w-5 h-5 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Responsible Usage</h3>
            </div>

            <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
              We encourage users to treat artificial intelligence as an intellectual collaborator, editor, and brainstorming companion—not a surrogate for human integrity, empathy, or moral judgment.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs opacity-80">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                <span>Promote academic honesty and transparent AI citation in schools.</span>
              </div>
              <div className="flex items-start gap-2 text-xs opacity-80">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                <span>Prevent deceptive impersonation and automated disinformation.</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-current/10 text-[11px] font-mono-code opacity-50">
            Pillar 03 • Human In The Loop
          </div>
        </div>
      </div>
    </section>
  );
};
