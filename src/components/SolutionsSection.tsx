import React, { useState } from "react";
import {
  FileText,
  Workflow,
  Cpu,
  Lock,
  ArrowRight,
  Sliders,
  CheckCircle2,
  HardDrive,
  Activity,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";

interface SolutionsSectionProps {
  theme: "light" | "dark";
  onSelectSolutionForContact?: (solutionName: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  theme,
  onSelectSolutionForContact,
}) => {
  // Configurator state
  const [workload, setWorkload] = useState<"docs" | "agents" | "reasoning" | "edge">("docs");
  const [privacy, setPrivacy] = useState<"airgap" | "hybrid" | "zero_retention">("hybrid");
  const [latency, setLatency] = useState<"realtime" | "interactive" | "batch">("interactive");

  const solutions = [
    {
      id: "docs",
      title: "Structured Document & Contract Intelligence",
      category: "Document Extraction & Auditing",
      icon: <FileText className="w-5 h-5 text-emerald-500" />,
      description:
        "Ingest dense, ambiguous, and irregular PDFs, scans, blueprints, and tabular filings into verifiable JSON schemas with exact page-level coordinate grounding.",
      capabilities: [
        "Eliminates hallucinated numbers via dual-pass arithmetic verification",
        "Deterministic bounding-box coordinate citations",
        "Direct integration with SAP, Salesforce, and custom SQL backends",
        "Configurable confidence thresholds with human review escalation",
      ],
      idealFor: "Finance, Legal Disclosures, Technical Manuals, Logistics Freight Bills",
    },
    {
      id: "agents",
      title: "Autonomous Operational Workflows",
      category: "Self-Healing Pipelines",
      icon: <Workflow className="w-5 h-5 text-sky-500" />,
      description:
        "Multi-step software and system agents that inspect anomalies, synthesize disparate data streams, and execute external transactional APIs safely.",
      capabilities: [
        "Stateful checkpointing allows pausing and resuming across hours",
        "Immutable execution trace logs for compliance auditing",
        "Mandatory dry-run simulations before mutating external systems",
        "Automatic rollback routines upon unexpected downstream responses",
      ],
      idealFor: "IT Operations, Regulatory Filing Assembly, Supply Chain Triage",
    },
    {
      id: "reasoning",
      title: "Domain-Specific Technical Reasoning",
      category: "Specialized SLM Ensembles",
      icon: <Cpu className="w-5 h-5 text-amber-500" />,
      description:
        "Compact language models fine-tuned on formal logical ontologies, engineering standards, and scientific syntax rather than broad internet noise.",
      capabilities: [
        "Zero catastrophic forgetting on core mathematical & code invariants",
        "Interpretable intermediate reasoning scratchpads",
        "10x smaller parameter footprint with superior domain accuracy",
        "Supports air-gapped localized fine-tuning on proprietary data",
      ],
      idealFor: "Aerospace Specs, Semiconductor Design, Biomedical Research",
    },
    {
      id: "edge",
      title: "Air-Gapped & Sovereign Edge Deployments",
      category: "High-Security Environments",
      icon: <Lock className="w-5 h-5 text-purple-500" />,
      description:
        "Complete artificial intelligence inference stacks packaged for physical hardware without WAN access, cloud subscriptions, or external dependencies.",
      capabilities: [
        "Zero network socket initialization guaranteed at binary level",
        "Optimized for low-power Apple Silicon, Snapdragon, & NVIDIA Orin",
        "FIPS-compliant local storage and ephemeral session state",
        "Full reproducible software bill of materials (SBOM)",
      ],
      idealFor: "Defense Systems, Healthcare Diagnostic Rigs, Private Labs",
    },
  ];

  // Dynamic recommendation calculation based on interactive choices
  const getArchitectureRecommendation = () => {
    let stackName = "Aivanta Cortex Standard Suite";
    let memoryRequirement = "16 GB RAM";
    let inferenceHost = "Private Enterprise VPC";
    let verificationLevel = "Standard Schema Enforcement";

    if (privacy === "airgap") {
      stackName = "Aivanta Nexus Edge Air-Gap Cluster";
      memoryRequirement = "32 GB Unified Silicon";
      inferenceHost = "On-Premises Isolated Edge Nodes";
      verificationLevel = "Strict Cryptographic Assertion Filter";
    } else if (privacy === "hybrid") {
      stackName = "Aivanta Hybrid Cortex + Nexus Mesh";
      memoryRequirement = "24 GB RAM / Hybrid Node";
      inferenceHost = "Dedicated Virtual Private Cloud (VPC)";
      verificationLevel = "Dual-Layer Policy Firewall";
    } else {
      stackName = "Aivanta Cloud Sovereign Endpoint";
      memoryRequirement = "Managed Ephemeral Compute";
      inferenceHost = "Zero-Data-Retention Certified Cloud";
      verificationLevel = "Deterministic Input/Output Guardrails";
    }

    let latencyScore = "< 200 ms";
    if (latency === "realtime") latencyScore = "< 30 ms (Streaming Edge)";
    else if (latency === "batch") latencyScore = "High-Throughput Asynchronous Queue";

    return { stackName, memoryRequirement, inferenceHost, verificationLevel, latencyScore };
  };

  const rec = getArchitectureRecommendation();

  const handleExportSpec = () => {
    const spec = `Aivanta Labs Architecture Recommendation
---------------------------------------------
Workload Type: ${workload.toUpperCase()}
Privacy Posture: ${privacy.toUpperCase()}
Latency Profile: ${latency.toUpperCase()}

Recommended Solution Stack: ${rec.stackName}
Target Host Environment: ${rec.inferenceHost}
Compute / Memory Target: ${rec.memoryRequirement}
Latency Target: ${rec.latencyScore}
Verification Protocol: ${rec.verificationLevel}

Generated at: ${new Date().toISOString()}
Contact: research@aivanta.ai
`;
    const blob = new Blob([spec], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aivanta-architecture-spec-${workload}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="solutions" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Applied AI Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Built for actual <span className="font-serif-accent italic">operational complexity.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          We architect end-to-end applied AI systems that solve mission-critical workflows where errors have tangible consequences.
        </p>
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
        {solutions.map((sol) => (
          <div
            key={sol.id}
            className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              theme === "dark"
                ? "bg-[#181816]/70 border-[#2A2A26] hover:border-[#44443E]"
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
                  {sol.icon}
                </div>
                <span className="font-mono-code text-[11px] opacity-60 tracking-wider uppercase font-semibold">
                  {sol.category}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight mb-3">
                {sol.title}
              </h3>
              <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
                {sol.description}
              </p>

              <div className="space-y-2.5 mb-6">
                {sol.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs opacity-80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[11px] opacity-60">
                <span className="font-semibold uppercase tracking-wider block font-mono-code">Domain Fit</span>
                <span>{sol.idealFor}</span>
              </div>
              <a
                href="#contact"
                onClick={() => onSelectSolutionForContact?.(sol.title)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all shrink-0 ${
                  theme === "dark"
                    ? "bg-[#252522] border-[#383832] text-[#F1EFEA] hover:bg-[#30302B]"
                    : "bg-[#EFECE5] border-[#D0CCC2] text-[#151514] hover:bg-[#E5E1D8]"
                }`}
              >
                Inquire System
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Solution Architecture Configurator */}
      <div
        className={`mt-16 p-8 sm:p-10 rounded-3xl border transition-all ${
          theme === "dark"
            ? "bg-[#151513] border-[#2A2A26]"
            : "bg-[#F4F1EA] border-[#DDD8CE]"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-current/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest opacity-60 mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Topology Explorer</span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight">
              Model your target operational constraints.
            </h3>
            <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-xl">
              Select your organization's workload, regulatory boundaries, and speed requirements to generate the optimal Aivanta architecture blueprint.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportSpec}
            className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full border transition-all cursor-pointer shrink-0 ${
              theme === "dark"
                ? "bg-[#252522] border-[#3A3A34] text-[#F1EFEA] hover:bg-[#2F2F2A]"
                : "bg-white border-[#CDC8BE] text-[#151514] hover:bg-[#EAE6DD]"
            }`}
          >
            <Download size={13} />
            <span>Export Topology Spec</span>
          </button>
        </div>

        {/* Configurator Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-current/10">
          {/* Workload selector */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider opacity-60 block mb-3">
              1. Workload Scope
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: "docs", label: "Document & Schema Synthesis" },
                { id: "agents", label: "Multi-Agent System Pipelines" },
                { id: "reasoning", label: "Deep Specialized Reasoning" },
                { id: "edge", label: "Air-Gapped Local Inference" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setWorkload(opt.id as any)}
                  className={`text-left text-xs px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    workload === opt.id
                      ? theme === "dark"
                        ? "bg-[#F1EFEA] text-[#111110] font-semibold border-white"
                        : "bg-[#151514] text-[#F1EFEA] font-semibold border-black"
                      : "border-current/10 opacity-70 hover:opacity-100 hover:border-current/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Posture */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider opacity-60 block mb-3">
              2. Privacy & Sovereignty
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: "airgap", label: "100% Air-Gapped / Isolated Hardware" },
                { id: "hybrid", label: "Private Dedicated VPC / Hybrid Node" },
                { id: "zero_retention", label: "Zero-Retention Cloud Sovereign" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPrivacy(opt.id as any)}
                  className={`text-left text-xs px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    privacy === opt.id
                      ? theme === "dark"
                        ? "bg-[#F1EFEA] text-[#111110] font-semibold border-white"
                        : "bg-[#151514] text-[#F1EFEA] font-semibold border-black"
                      : "border-current/10 opacity-70 hover:opacity-100 hover:border-current/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Latency Threshold */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider opacity-60 block mb-3">
              3. Latency Objective
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: "realtime", label: "Sub-30ms Real-Time Edge Streaming" },
                { id: "interactive", label: "Interactive Conversational (<250ms)" },
                { id: "batch", label: "High-Throughput Batch Processing" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLatency(opt.id as any)}
                  className={`text-left text-xs px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    latency === opt.id
                      ? theme === "dark"
                        ? "bg-[#F1EFEA] text-[#111110] font-semibold border-white"
                        : "bg-[#151514] text-[#F1EFEA] font-semibold border-black"
                      : "border-current/10 opacity-70 hover:opacity-100 hover:border-current/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Topology Output */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className={`p-4 rounded-2xl border ${
              theme === "dark" ? "bg-[#1D1D19] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] opacity-60 mb-1">
              <Layers size={13} className="text-emerald-500" />
              <span>STACK BLUEPRINT</span>
            </div>
            <p className="text-sm font-semibold">{rec.stackName}</p>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              theme === "dark" ? "bg-[#1D1D19] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] opacity-60 mb-1">
              <Lock size={13} className="text-sky-500" />
              <span>HOST TOPOLOGY</span>
            </div>
            <p className="text-sm font-semibold">{rec.inferenceHost}</p>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              theme === "dark" ? "bg-[#1D1D19] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] opacity-60 mb-1">
              <HardDrive size={13} className="text-amber-500" />
              <span>COMPUTE FOOTPRINT</span>
            </div>
            <p className="text-sm font-semibold">{rec.memoryRequirement}</p>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              theme === "dark" ? "bg-[#1D1D19] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] opacity-60 mb-1">
              <Activity size={13} className="text-purple-500" />
              <span>RESPONSE PROFILE</span>
            </div>
            <p className="text-sm font-semibold">{rec.latencyScore}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
