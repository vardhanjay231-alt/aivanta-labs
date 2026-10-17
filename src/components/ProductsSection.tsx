import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Terminal,
  Shield,
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle,
  Clock,
  Sparkles,
  X,
  Copy,
  Check,
  Server,
  Zap,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: "AVAILABLE NOW" | "IN PRIVATE BETA" | "IN ACTIVE DEVELOPMENT" | "RESEARCH & PLANNING";
  statusColor: string;
  version: string;
  description: string;
  highlights: string[];
  specs: {
    runtime: string;
    latency: string;
    deployment: string;
    license: string;
  };
  codeSnippet: string;
  icon: React.ReactNode;
}

interface ProductsSectionProps {
  theme: "light" | "dark";
  onSelectProductForContact?: (productName: string) => void;
  onOpenTool?: (toolId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  theme,
  onSelectProductForContact,
  onOpenTool,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "code">("overview");

  const products: Product[] = [
    {
      id: "cortex",
      name: "Aivanta Cortex",
      tagline: "Autonomous Agent & Workflow Orchestration Engine",
      category: "Workflow Engine",
      status: "AVAILABLE NOW",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      version: "v2.4.2 Production GA",
      description:
        "A deterministic multi-agent framework designed for complex analytical pipelines, API orchestration, and resilient error recovery with mandatory human sign-off checkpoints.",
      highlights: [
        "Constrained JSON schema enforcement on every tool execution",
        "Deterministic fallback trees for mission-critical operations",
        "Cryptographic execution logs for audit and compliance",
        "Pluggable across cloud endpoints and local small models",
      ],
      specs: {
        runtime: "TypeScript / Node.js & Python SDKs",
        latency: "Optimized streaming (<25ms overhead)",
        deployment: "Docker, Kubernetes, Bare Metal, Serverless",
        license: "Commercial Enterprise & Community Core",
      },
      codeSnippet: `import { AivantaCortex, defineAgent } from '@aivanta/cortex';

const researchAgent = defineAgent({
  role: 'Quantitative Document Synthesizer',
  tools: [vectorRetrievalTool, schemaValidatorTool],
  temperature: 0.0, // strictly deterministic
  guardrails: {
    maxExecutionSteps: 8,
    requireHumanVerificationFor: ['external_api_dispatch'],
  },
});

const execution = await AivantaCortex.run({
  objective: 'Audit and consolidate annual disclosures',
  inputPayload: docStream,
  agent: researchAgent,
});`,
      icon: <Terminal className="w-6 h-6 text-emerald-500" />,
    },
    {
      id: "canvas",
      name: "Aivanta Canvas",
      tagline: "Spatial Multimodal Intelligence & Synthesis Workspace",
      category: "Creative & Research Workspace",
      status: "IN PRIVATE BETA",
      statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      version: "v0.9.5 Preview Release",
      description:
        "An infinite spatial canvas where unorganized documents, code blocks, visual notes, and local AI reasoning threads merge into coherent, structured knowledge.",
      highlights: [
        "Infinite spatial layout with semantic proximity grouping",
        "Context pinning: pin source documents as ground truth references",
        "Instant bidirectional export to Markdown, LaTeX, and clean HTML",
        "Local-first document persistence with zero cloud lock-in",
      ],
      specs: {
        runtime: "Cross-platform Desktop (Electron/Rust) & Modern Web",
        latency: "Instant local UI with streaming model tokens",
        deployment: "Desktop local app or Self-hosted enterprise team hub",
        license: "Closed Beta Invitation / Early Access",
      },
      codeSnippet: `// Aivanta Canvas Workspace Hook API
import { useCanvasContext, bindCitationSource } from '@aivanta/canvas-sdk';

export function DocumentSynthesisBlock({ documentId }: { documentId: string }) {
  const { activeWorkspace, synthesizeContext } = useCanvasContext();
  
  const handleGrounding = async () => {
    const verifiedOutput = await synthesizeContext({
      sources: [bindCitationSource(documentId)],
      strictCitationsOnly: true,
      maxOutputTokens: 2048,
    });
  };
}`,
      icon: <Layers className="w-6 h-6 text-amber-500" />,
    },
    {
      id: "nexus",
      name: "Aivanta Nexus",
      tagline: "Privacy-First Edge & On-Device Model Runtime",
      category: "Inference Runtime",
      status: "IN ACTIVE DEVELOPMENT",
      statusColor: "text-sky-500 bg-sky-500/10 border-sky-500/30",
      version: "Scheduled Release: Q3 2026",
      description:
        "High-throughput, ultra-quantized small language model runtime built specifically for Apple Silicon, Snapdragon X, and Linux/x86 edge devices without external network connectivity.",
      highlights: [
        "Custom 3-bit and 4-bit quantization kernels with zero accuracy penalty",
        "Memory-mapped model streaming directly from NVMe storage",
        "Sub-15ms time-to-first-token on modern consumer laptops",
        "Zero telemetry or background network socket creation",
      ],
      specs: {
        runtime: "C++ / Rust native core with C bindings & Python wrapper",
        latency: "<15ms time-to-first-token on unified memory systems",
        deployment: "Embedded edge devices, local laptops, isolated VPCs",
        license: "Dual Source-Available / Commercial Embedded",
      },
      codeSnippet: `#include <aivanta_nexus.h>

int main() {
  // Initialize air-gapped on-device runtime
  nexus_config_t config = nexus_default_config();
  config.enforce_airgap = true;
  config.quantization_mode = NEXUS_Q4_K_M;

  nexus_runtime_t* runtime = nexus_init(&config);
  nexus_load_model(runtime, "./models/aivanta-compact-3b.bin");
  
  // Streaming inference directly from local memory
  nexus_stream_response(runtime, "Validate sensor telemetry telemetry_001.json");
  return 0;
}`,
      icon: <Cpu className="w-6 h-6 text-sky-500" />,
    },
    {
      id: "sentinel",
      name: "Aivanta Sentinel",
      tagline: "Deterministic Safety & Hallucination Mitigation Firewall",
      category: "Verification Proxy",
      status: "RESEARCH & PLANNING",
      statusColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      version: "Architecture Spec v0.2 / Target 2026-2027",
      description:
        "A low-latency cryptographic verification proxy that inspects generative model outputs against formal logical invariants before responses reach users or external APIs.",
      highlights: [
        "Cryptographic assertion tagging for every claim in generated text",
        "Prompt injection firewall with dynamic heuristic entropy scoring",
        "Policy enforcement DSL for regulatory and enterprise compliance",
        "Integrates as a transparent reverse proxy in front of any model API",
      ],
      specs: {
        runtime: "Distributed proxy gateway written in Rust",
        latency: "<8ms inspection overhead per token block",
        deployment: "Sidecar proxy, Cloudflare Worker, or Envoy filter",
        license: "Open Specification & Enterprise Security Module",
      },
      codeSnippet: `# Aivanta Sentinel Policy Rule (YAML/DSL)
version: '1.0'
policy: financial-advisory-guardrail
rules:
  - id: prevent-unbacked-claims
    target: generated_text
    action: block_and_flag
    condition: claims.every(c => c.hasSourceCitation == true)
  - id: pii-data-redaction
    target: [input_prompt, output_response]
    action: mask_sha256
    entities: [SSN, CREDIT_CARD, ACCOUNT_NUMBER]`,
      icon: <Shield className="w-6 h-6 text-purple-500" />,
    },
  ];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="products" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Portfolio & Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Tools built with <span className="font-serif-accent italic">rigor and craft.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Every Aivanta product is engineered around tangible utility, strict development milestones, and transparent availability.
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
        {products.map((product) => (
          <div
            key={product.id}
            className={`group relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#181816]/70 border-[#2A2A26] hover:border-[#44443E] hover:bg-[#1C1C19]"
                : "bg-white/70 border-[#DDD9D1] hover:border-[#B5B0A4] hover:bg-white"
            }`}
          >
            <div>
              {/* Status and Version Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span
                  className={`font-mono-code text-[11px] font-semibold px-3 py-1 rounded-full border ${product.statusColor}`}
                >
                  {product.status}
                </span>
                <span className="font-mono-code text-xs opacity-50">
                  {product.version}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-2xl ${
                    theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                  }`}
                >
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs opacity-60 tracking-wide font-medium mt-0.5">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm opacity-75 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Feature Highlights */}
              <ul className="space-y-2 mb-8">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs opacity-80">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-current/10 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(product);
                  setActiveTab("overview");
                }}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#252522] border-[#383832] text-[#F1EFEA] hover:bg-[#30302B]"
                    : "bg-[#EFECE5] border-[#D0CCC2] text-[#151514] hover:bg-[#E5E1D8]"
                }`}
              >
                <span>Technical Details & Specs</span>
                <ArrowRight size={13} />
              </button>

              {product.id === "cortex" && (
                <button
                  type="button"
                  onClick={() => onOpenTool ? onOpenTool("cortex-runner") : (window.location.hash = "#/tools/cortex-runner")}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                      : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
                  }`}
                >
                  <span>Launch Cortex Studio</span>
                  <ExternalLink size={12} />
                </button>
              )}

              {product.id === "canvas" && (
                <button
                  type="button"
                  onClick={() => onOpenTool ? onOpenTool("writing-assistant") : (window.location.hash = "#/tools/writing-assistant")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
                >
                  <span>Open Writing & Canvas Studio</span>
                  <ArrowRight size={12} />
                </button>
              )}

              {product.id === "nexus" && (
                <button
                  type="button"
                  onClick={() => onOpenTool ? onOpenTool("productivity-organizer") : (window.location.hash = "#/tools/productivity-organizer")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-500 hover:underline cursor-pointer"
                >
                  <span>Open Task Optimizer</span>
                  <ArrowRight size={12} />
                </button>
              )}

              {product.id === "sentinel" && (
                <button
                  type="button"
                  onClick={() => onOpenTool ? onOpenTool("sentinel-verifier") : (window.location.hash = "#/tools/sentinel-verifier")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-500 hover:underline cursor-pointer"
                >
                  <span>Launch Safety Validator</span>
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Deep Technical Drawer */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              theme === "dark"
                ? "bg-[#161614] border-[#2E2E2A] text-[#F1EFEA]"
                : "bg-[#F7F5F0] border-[#D5D0C6] text-[#151514]"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-current/10">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl ${
                    theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                  }`}
                >
                  {selectedProduct.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-mono-code text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${selectedProduct.statusColor}`}
                    >
                      {selectedProduct.status}
                    </span>
                    <span className="font-mono-code text-xs opacity-50">
                      {selectedProduct.version}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-full border border-current/20 hover:bg-current/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 my-6 border-b border-current/10 pb-3">
              {(["overview", "specs", "code"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium uppercase tracking-wider ${
                    activeTab === tab
                      ? theme === "dark"
                        ? "bg-[#F1EFEA] text-[#111110]"
                        : "bg-[#151514] text-[#F1EFEA]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {tab === "overview" && "Overview"}
                  {tab === "specs" && "System Specs"}
                  {tab === "code" && "Integration Example"}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <p className="text-sm opacity-80 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono-code opacity-60 mb-3">
                    Architectural Invariants
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProduct.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs opacity-80">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-[#1D1D1A] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code opacity-60 mb-1">
                    <Server size={13} />
                    <span>TARGET RUNTIME</span>
                  </div>
                  <p className="text-sm font-medium">{selectedProduct.specs.runtime}</p>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-[#1D1D1A] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code opacity-60 mb-1">
                    <Zap size={13} />
                    <span>LATENCY PROFILE</span>
                  </div>
                  <p className="text-sm font-medium">{selectedProduct.specs.latency}</p>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-[#1D1D1A] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code opacity-60 mb-1">
                    <Layers size={13} />
                    <span>DEPLOYMENT TOPOLOGY</span>
                  </div>
                  <p className="text-sm font-medium">{selectedProduct.specs.deployment}</p>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-[#1D1D1A] border-[#2C2C28]" : "bg-white border-[#DDD8CE]"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code opacity-60 mb-1">
                    <Shield size={13} />
                    <span>LICENSING MODEL</span>
                  </div>
                  <p className="text-sm font-medium">{selectedProduct.specs.license}</p>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="relative">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/10">
                  <div className="flex items-center gap-2 font-mono-code text-xs opacity-60">
                    <Code2 size={13} />
                    <span>sdk-integration.ts</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(selectedProduct.codeSnippet)}
                    className="flex items-center gap-1.5 text-xs font-mono-code px-2.5 py-1 rounded-md border border-current/20 hover:bg-current/10 transition-colors cursor-pointer"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  className={`p-4 rounded-xl overflow-x-auto text-xs font-mono-code leading-relaxed ${
                    theme === "dark" ? "bg-[#0D0D0C] text-[#D8D6D1]" : "bg-[#ECE8DF] text-[#1E1E1C]"
                  }`}
                >
                  <code>{selectedProduct.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-current/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs opacity-60">
                Need customized deployment architecture?
              </span>
              <a
                href="#contact"
                onClick={() => {
                  onSelectProductForContact?.(selectedProduct.name);
                  setSelectedProduct(null);
                }}
                className={`text-xs font-medium px-5 py-2.5 rounded-full transition-all ${
                  theme === "dark"
                    ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                    : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
                }`}
              >
                Inquire About {selectedProduct.name}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
