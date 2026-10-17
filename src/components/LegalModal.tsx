import React from "react";
import { X, ShieldCheck, Lock, FileText } from "lucide-react";

interface LegalModalProps {
  type: "privacy" | "terms" | null;
  theme: "light" | "dark";
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, theme, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
          theme === "dark"
            ? "bg-[#161614] border-[#2E2E2A] text-[#F1EFEA]"
            : "bg-[#F7F5F0] border-[#D5D0C6] text-[#151514]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                theme === "dark" ? "bg-[#252522]" : "bg-[#EDE9E1]"
              }`}
            >
              {type === "privacy" ? (
                <Lock size={18} className="text-emerald-500" />
              ) : (
                <FileText size={18} className="text-sky-500" />
              )}
            </div>
            <div>
              <span className="font-mono-code text-[10px] uppercase tracking-wider opacity-60">
                Aivanta Labs Document
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                {type === "privacy" ? "Privacy Policy & Data Sovereignty" : "Terms of Architecture & Use"}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full border border-current/20 hover:bg-current/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm space-y-4 opacity-80 leading-relaxed font-sans">
          {type === "privacy" ? (
            <>
              <p>
                <strong>1. Ephemeral In-Memory Processing:</strong> When you use any AI tool or sandbox feature on this website, your inputs are transmitted securely to our backend and processed in volatile runtime memory strictly for the purpose of fulfilling your request. Once the response is sent back, the input is immediately purged.
              </p>
              <p>
                <strong>2. Zero Model Training:</strong> We explicitly do not store, catalog, or aggregate user prompts, writing drafts, task notes, or contact submissions to train public artificial intelligence models.
              </p>
              <p>
                <strong>3. No Sale of User Data:</strong> Aivanta Labs does not sell, license, or monetize your personal information, email address, or usage patterns to third-party data brokers or advertising networks.
              </p>
              <p>
                <strong>4. Security in Transit:</strong> All communications between your browser and our runtime servers are encrypted using modern Transport Layer Security (TLS 1.3).
              </p>
              <p>
                <strong>5. User Responsibility:</strong> Because artificial intelligence systems are statistical inference tools, please refrain from submitting private encryption keys, raw passwords, or unredacted government identification numbers.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Intended Everyday Utility:</strong> Aivanta Labs builds tools to assist students, professionals, creators, and businesses with learning, writing, task planning, and operational automation.
              </p>
              <p>
                <strong>2. Verification of Outputs:</strong> Artificial intelligence outputs must be reviewed and verified by a human when used in high-stakes legal, medical, financial, or safety-critical contexts. Aivanta Labs makes no warranties of complete factual infallibility.
              </p>
              <p>
                <strong>3. Acceptable Use:</strong> Users agree not to utilize Aivanta Labs systems to generate malicious software, automated disinformation campaigns, deceptive impersonation, or harassing communications.
              </p>
              <p>
                <strong>4. Intellectual Property:</strong> You retain complete ownership of all original text and materials you input into Aivanta Labs tools, as well as the generated resulting outputs.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono-code opacity-60">
          <span>Last Updated: {new Date().getFullYear()}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold hover:underline cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
