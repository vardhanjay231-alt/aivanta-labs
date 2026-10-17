import React, { useState, useEffect } from "react";
import { AivantaTool } from "../data/tools";
import { executeAiTool, calculateStats } from "../services/aiService";
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Zap,
  PenTool,
  FileText,
  GraduationCap,
  Calendar,
  CheckSquare,
  Terminal,
  Shield,
} from "lucide-react";

interface ToolRunnerProps {
  tool: AivantaTool;
  theme: "light" | "dark";
  onBack: () => void;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool, theme, onBack }) => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize options with defaults
  useEffect(() => {
    if (tool.optionsConfig) {
      const initialOpts: Record<string, string> = {};
      tool.optionsConfig.forEach((cfg) => {
        initialOpts[cfg.key] = cfg.defaultValue;
      });
      setOptions(initialOpts);
    }
    // Scroll to top when tool runner opens
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tool]);

  const handleExecute = async () => {
    if (!input.trim()) {
      setError("Please enter some text or select one of the sample presets below.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const res = await executeAiTool(tool.id, input, options);
      setResult(res.result);
      setLatency(res.latencyMs);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while communicating with the AI runtime.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPreset = (preset: { input: string; options?: Record<string, string> }) => {
    setInput(preset.input);
    if (preset.options) {
      setOptions((prev) => ({ ...prev, ...preset.options }));
    }
    setError(null);
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setError(null);
    setLatency(null);
  };

  const inputStats = calculateStats(input);
  const resultStats = result ? calculateStats(result) : null;

  // Icon mapping
  const renderIcon = () => {
    const props = { className: "w-6 h-6 text-emerald-500" };
    switch (tool.iconName) {
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 animate-in fade-in duration-300">
      {/* Top Navigation Bar with Back Button */}
      <div className="flex items-center justify-between gap-4 pb-8 border-b border-current/10 mb-8">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
            theme === "dark"
              ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] hover:bg-[#2C2C26]"
              : "bg-[#EFECE5] border-[#D0CCC2] text-[#151514] hover:bg-[#E2DED5]"
          }`}
        >
          <ArrowLeft size={14} />
          <span>Back to All AI Tools</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[11px] px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-500 bg-emerald-500/10 font-medium">
            {tool.status}
          </span>
          <span className="hidden sm:inline font-mono-code text-[11px] opacity-50">
            {tool.category}
          </span>
        </div>
      </div>

      {/* Tool Header Information */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`p-3.5 rounded-2xl ${
              theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
            }`}
          >
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono-code text-[10px] uppercase tracking-wider font-semibold opacity-60">
                {tool.badge}
              </span>
              <span className="text-xs opacity-40">•</span>
              <span className="text-[11px] font-mono-code text-sky-500 flex items-center gap-1">
                <Zap size={11} /> Powered by Gemini AI
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {tool.name}
            </h1>
            <p className="text-sm opacity-70 mt-1">{tool.tagline}</p>
          </div>
        </div>

        <p className="text-sm opacity-80 leading-relaxed max-w-3xl">
          {tool.description}
        </p>
      </div>

      {/* Sample Presets Quick-Click */}
      {tool.samplePresets && tool.samplePresets.length > 0 && (
        <div className="mb-6 p-4 rounded-2xl border border-current/10 bg-current/5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-mono-code uppercase tracking-wider opacity-60 font-semibold flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-500" />
              <span>Quick Test Presets (Click to load)</span>
            </span>
            <span className="text-[11px] opacity-40 font-mono-code">Sample Prompts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tool.samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  theme === "dark"
                    ? "bg-[#181816] border-[#30302A] text-[#E0DED9] hover:border-[#505046]"
                    : "bg-white border-[#DDD8CE] text-[#222] hover:border-[#AAA]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Tool Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input and Parameters */}
        <div
          className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/80 border-[#2A2A26]"
              : "bg-white/80 border-[#DDD9D1]"
          }`}
        >
          <div>
            {/* Dynamic Options Config if present */}
            {tool.optionsConfig && tool.optionsConfig.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 pb-5 border-b border-current/10">
                {tool.optionsConfig.map((cfg) => (
                  <div key={cfg.key}>
                    <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-1.5">
                      {cfg.label}
                    </label>
                    <select
                      value={options[cfg.key] || cfg.defaultValue}
                      onChange={(e) =>
                        setOptions((prev) => ({ ...prev, [cfg.key]: e.target.value }))
                      }
                      className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none transition-all cursor-pointer ${
                        theme === "dark"
                          ? "bg-[#20201D] border-[#383832] text-[#F1EFEA]"
                          : "bg-[#F5F2EA] border-[#D5D0C6] text-[#151514]"
                      }`}
                    >
                      {cfg.choices.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Input Label and Text Area */}
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono-code uppercase tracking-wider opacity-60 font-semibold">
                Input Content *
              </label>
              <span className="text-[11px] font-mono-code opacity-50">
                {inputStats.words} words • {inputStats.characters} chars
              </span>
            </div>

            <textarea
              rows={8}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder={tool.inputPlaceholder}
              className={`w-full text-sm p-4 rounded-2xl border resize-none focus:outline-none transition-all ${
                theme === "dark"
                  ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#66665A]"
                  : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#8E8A80]"
              } ${error ? "border-red-500" : ""}`}
            />

            {error && (
              <div className="mt-3 flex items-start gap-2 text-xs text-red-500 font-mono-code">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Pro Tips */}
            {tool.tips && tool.tips.length > 0 && (
              <div className="mt-4 space-y-1">
                {tool.tips.map((tip, i) => (
                  <p key={i} className="text-[11px] opacity-60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{tip}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading || (!input && !result)}
              className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleExecute}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-6 py-3 rounded-full transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                  : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
              } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Processing with Gemini...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>{tool.actionButtonLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output / Results */}
        <div
          className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between ${
            theme === "dark"
              ? "bg-[#181816]/80 border-[#2A2A26]"
              : "bg-white/80 border-[#DDD9D1]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
              <span className="text-xs font-mono-code uppercase tracking-wider opacity-60 font-semibold flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                <span>Result & Insights</span>
              </span>
              {latency && (
                <span className="text-[11px] font-mono-code text-emerald-500 flex items-center gap-1 font-medium">
                  <Clock size={11} /> {latency}ms
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 border-2 border-current/20 border-t-current rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium tracking-tight">
                  Synthesizing with Aivanta AI Engine...
                </p>
                <p className="text-xs opacity-60 mt-1 font-mono-code">
                  Zero retention in-memory processing
                </p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-sans max-h-[460px] overflow-y-auto ${
                    theme === "dark"
                      ? "bg-[#131311] text-[#E8E6E1] border border-[#262622]"
                      : "bg-[#F7F5F0] text-[#1E1E1C] border border-[#DDD8CE]"
                  }`}
                >
                  {result}
                </div>

                {resultStats && (
                  <div className="flex items-center justify-between text-[11px] font-mono-code opacity-60 px-1">
                    <span>
                      Generated: {resultStats.words} words • {resultStats.characters} chars
                    </span>
                    <span>Read time: ~{resultStats.readingTimeMinutes} min</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
                  }`}
                >
                  <Sparkles size={20} className="opacity-50" />
                </div>
                <h4 className="text-sm font-semibold tracking-tight mb-1">
                  Ready for Input
                </h4>
                <p className="text-xs opacity-60 max-w-xs leading-relaxed">
                  Enter your prompt or choose a sample preset on the left, then click{" "}
                  <strong>"{tool.actionButtonLabel}"</strong> to generate useful results.
                </p>
              </div>
            )}
          </div>

          {/* Result Footer Controls */}
          <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between">
            <span className="text-[11px] font-mono-code opacity-50 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-500" />
              Private & Ephemeral
            </span>

            {result && (
              <button
                type="button"
                onClick={handleCopyResult}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#22221F] border-[#383832] text-[#F1EFEA] hover:bg-[#2A2A26]"
                    : "bg-[#EFECE5] border-[#D0CCC2] text-[#151514] hover:bg-[#E2DED5]"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-500" />
                    <span>Copied Result</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
