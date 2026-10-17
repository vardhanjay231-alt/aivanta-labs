import React, { useState } from "react";
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle,
  ShieldAlert,
  ArrowRight,
  Code,
  FileCheck,
  Cpu,
  UserCheck,
} from "lucide-react";

interface PlaygroundSectionProps {
  theme: "light" | "dark";
}

interface Step {
  id: number;
  label: string;
  type: "deterministic" | "model_reasoning" | "human_approval" | "verification";
  detail: string;
  status: "verified" | "pending";
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({ theme }) => {
  const presets = [
    {
      title: "Invoice & Expense Extraction",
      prompt:
        "Audit unstructured image receipts and invoices for any line-item above $250, verify VAT numbers against international registry, and flag duplicate dates.",
      steps: [
        {
          id: 1,
          label: "Optical Tokenizer & Coordinate Extraction",
          type: "deterministic",
          detail: "OCR parsing with strict bounding-box coordinates for each line item.",
          status: "verified",
        },
        {
          id: 2,
          label: "Arithmetic Invariant Verification",
          type: "verification",
          detail: "Verify Subtotal + VAT = Total using arbitrary-precision mathematical solver.",
          status: "verified",
        },
        {
          id: 3,
          label: "Registry Cross-Check & Deduplication",
          type: "deterministic",
          detail: "Exact hash matching against prior 90-day accounting ledger.",
          status: "verified",
        },
        {
          id: 4,
          label: "Discrepancy Escalation Gate",
          type: "human_approval",
          detail: "Flag anomalous VAT registry mismatches to human compliance officer.",
          status: "verified",
        },
      ],
      outputSchema: `{
  "audit_status": "APPROVED_WITH_FLAG",
  "verified_subtotal": 1420.50,
  "currency": "USD",
  "flagged_discrepancies": [
    { "line": 4, "issue": "Missing VAT registration suffix", "confidence": 1.0 }
  ],
  "line_items_count": 8,
  "human_signoff_required": true
}`,
    },
    {
      id: "contract",
      title: "Legal Contract Liability Audit",
      prompt:
        "Parse commercial SaaS vendor agreement for indemnification liability limits, check if mutual breach clauses exist, and highlight unilateral termination windows.",
      steps: [
        {
          id: 1,
          label: "Clause Boundary Segmentation",
          type: "deterministic",
          detail: "Semantic parsing isolating Section 8 (Indemnification) and Section 12 (Term).",
          status: "verified",
        },
        {
          id: 2,
          label: "Invariant Compliance Testing",
          type: "model_reasoning",
          detail: "Check if liability cap exceeds 12-month trailing contract aggregate.",
          status: "verified",
        },
        {
          id: 3,
          label: "Source Citation Grounding",
          type: "verification",
          detail: "Attach exact paragraph coordinates for every highlighted risk factor.",
          status: "verified",
        },
        {
          id: 4,
          label: "General Counsel Authorization Checkpoint",
          type: "human_approval",
          detail: "Present redlined delta for attorney signature prior to repository commit.",
          status: "verified",
        },
      ],
      outputSchema: `{
  "liability_cap_clause_present": true,
  "cap_multiple": "1x_annual_fees",
  "mutual_indemnification": false,
  "termination_notice_days": 30,
  "risk_assessment": "REQUIRES_RECIPROCAL_AMENDMENT",
  "grounded_citations": ["Section 8.2(b)", "Section 12.4"]
}`,
    },
    {
      id: "telemetry",
      title: "Server Anomaly Incident Triage",
      prompt:
        "Ingest 500,000 JSON application traces, isolate 5xx spike between 03:10 and 03:22 UTC, and correlate root cause with container deployment events.",
      steps: [
        {
          id: 1,
          label: "Time-Series Bucket Filtering",
          type: "deterministic",
          detail: "Filter 5xx HTTP responses within designated timestamp interval.",
          status: "verified",
        },
        {
          id: 2,
          label: "Correlation Engine Execution",
          type: "model_reasoning",
          detail: "Intersect cluster deploy event 03:09:42 UTC with latency spike onset.",
          status: "verified",
        },
        {
          id: 3,
          label: "Blast Radius Quantification",
          type: "verification",
          detail: "Count affected customer sessions with zero synthetic hallucinated counts.",
          status: "verified",
        },
        {
          id: 4,
          label: "Rollback Recommendation Gate",
          type: "human_approval",
          detail: "Provide SRE engineer one-click kubectl rollout undo confirmation.",
          status: "verified",
        },
      ],
      outputSchema: `{
  "incident_classification": "DEPLOYMENT_REGRESSION",
  "root_cause_service": "auth-service-v3.1.2",
  "affected_requests": 1420,
  "error_signature": "ConnectionPoolExhaustedException",
  "recommended_mitigation": "ROLLBACK_TO_V3.1.1",
  "automated_execution_blocked": true
}`,
    },
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(presets[0].prompt);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  const currentPreset = presets[selectedPresetIndex];

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setCustomPrompt(presets[index].prompt);
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 400);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 600);
  };

  return (
    <section id="sandbox" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Grounding Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            See how Useful AI decomposes <span className="font-serif-accent italic">complex intent.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Instead of trusting a black box, Aivanta splits real-world tasks into verifiable steps, mathematical checks, and human sign-off gates.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="pt-10 flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono-code opacity-50 uppercase mr-1">Load Preset:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectPreset(idx)}
            className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer font-medium ${
              selectedPresetIndex === idx
                ? theme === "dark"
                  ? "bg-[#F1EFEA] text-[#111110] border-white font-semibold"
                  : "bg-[#151514] text-[#F1EFEA] border-black font-semibold"
                : "border-current/15 opacity-70 hover:opacity-100"
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Main Sandbox Interactive Console */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Box */}
        <div
          className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#161614] border-[#2A2A26]"
              : "bg-white border-[#DDD8CE]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
              <span className="text-xs font-mono-code opacity-60 uppercase tracking-wider">
                Natural Language Objective
              </span>
              <span className="text-[11px] font-mono-code opacity-50">
                Aivanta Cortex Engine v2.4
              </span>
            </div>

            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={5}
              className={`w-full text-sm p-4 rounded-2xl border resize-none focus:outline-none transition-all ${
                theme === "dark"
                  ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#55554B]"
                  : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#99948A]"
              }`}
              placeholder="Enter a complex business, engineering, or auditing task..."
            />

            <div className="mt-4 flex items-center gap-2 text-xs opacity-60">
              <ShieldAlert size={14} className="text-amber-500 shrink-0" />
              <span>Engine automatically injects formal verification barriers.</span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCustomPrompt(presets[selectedPresetIndex].prompt)}
              className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                  : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
              } ${isRunning ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isRunning ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing DAG...</span>
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" />
                  <span>Decompose & Verify Task</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output DAG & Schema View */}
        <div
          className={`lg:col-span-7 p-6 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#161614] border-[#2A2A26]"
              : "bg-white border-[#DDD8CE]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-6">
              <span className="text-xs font-mono-code opacity-60 uppercase tracking-wider flex items-center gap-2">
                <FileCheck size={14} className="text-emerald-500" />
                <span>Deterministic Execution DAG</span>
              </span>
              <span className="text-xs font-mono-code px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                100% Grounded
              </span>
            </div>

            {/* Steps Flow */}
            <div className="space-y-3 mb-8">
              {currentPreset.steps.map((step) => {
                let badgeClass = "text-sky-500 bg-sky-500/10 border-sky-500/20";
                let typeIcon = <Cpu size={12} />;
                if (step.type === "deterministic") {
                  badgeClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
                  typeIcon = <CheckCircle size={12} />;
                } else if (step.type === "human_approval") {
                  badgeClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
                  typeIcon = <UserCheck size={12} />;
                }

                return (
                  <div
                    key={step.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      theme === "dark"
                        ? "bg-[#1E1E1B] border-[#2E2E28]"
                        : "bg-[#F9F7F3] border-[#E0DCD4]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[11px] font-bold opacity-40">
                          0{step.id}
                        </span>
                        <h4 className="text-xs font-semibold tracking-tight">
                          {step.label}
                        </h4>
                      </div>
                      <span
                        className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 font-medium ${badgeClass}`}
                      >
                        {typeIcon}
                        {step.type.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs opacity-70 leading-relaxed pl-6">
                      {step.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Schema Output Preview */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono-code opacity-60 mb-2">
                <span className="flex items-center gap-1.5">
                  <Code size={13} />
                  <span>Constrained JSON Schema Guarantee</span>
                </span>
                <span>Type Safe</span>
              </div>
              <pre
                className={`p-3.5 rounded-2xl text-[11px] font-mono-code leading-relaxed overflow-x-auto ${
                  theme === "dark"
                    ? "bg-[#0E0E0D] text-[#D8D6D1] border border-[#242420]"
                    : "bg-[#EFECE5] text-[#1E1E1C] border border-[#DDD8CE]"
                }`}
              >
                <code>{currentPreset.outputSchema}</code>
              </pre>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-current/10 flex items-center justify-between">
            <span className="text-xs opacity-60">
              Ready to wire Aivanta Cortex into your live stack?
            </span>
            <a
              href="#contact"
              className="text-xs font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Explore Deployment</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
