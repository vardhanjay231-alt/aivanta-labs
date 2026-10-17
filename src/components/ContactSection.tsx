import React, { useState } from "react";
import { submitContactInquiry } from "../services/aiService";
import {
  Sparkles,
  Send,
  Mail,
  Shield,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Key,
  MessageSquare,
} from "lucide-react";

interface ContactSectionProps {
  theme: "light" | "dark";
  prefilledSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  theme,
  prefilledSubject,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [subject, setSubject] = useState(prefilledSubject || "General Technical Inquiry");
  const [message, setMessage] = useState("");
  const [privacyPreference, setPrivacyPreference] = useState("Dedicated Hybrid VPC");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    ticketId: string;
    message: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  React.useEffect(() => {
    if (prefilledSubject) {
      setSubject(`Inquiry regarding ${prefilledSubject}`);
    }
  }, [prefilledSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please provide a valid email format.";
    }
    if (!message.trim() || message.trim().length < 15) {
      newErrors.message = "Please provide at least 15 characters describing your objective.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitContactInquiry({
        name: name.trim(),
        email: email.trim(),
        organization: organization.trim(),
        subject,
        message: message.trim(),
        privacyPreference,
      });

      setSubmittedData({
        ticketId: response.ticketId,
        message: response.message,
      });
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to submit request. Please verify network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (!submittedData?.ticketId) return;
    navigator.clipboard.writeText(submittedData.ticketId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setOrganization("");
    setMessage("");
    setSubmittedData(null);
    setSubmitError(null);
  };

  return (
    <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Connect with Aivanta Labs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Start a conversation with <span className="font-serif-accent italic">our engineers.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Whether you have feedback on our AI tools, questions about privacy architectures, or proposals for collaboration, we welcome your direct communication.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form Container */}
        <div
          className={`lg:col-span-7 p-8 sm:p-10 rounded-3xl border transition-all ${
            theme === "dark"
              ? "bg-[#181816]/70 border-[#2A2A26]"
              : "bg-white/70 border-[#DDD9D1]"
          }`}
        >
          {submittedData ? (
            <div className="py-8 text-center flex flex-col items-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight mb-2">
                Inquiry Successfully Logged
              </h3>
              <p className="text-sm opacity-75 max-w-md mb-6 leading-relaxed">
                Thank you, <strong>{name}</strong>. Your message has been received by our backend runtime system.
              </p>

              {/* Reference ID card */}
              <div
                className={`flex items-center gap-4 px-5 py-3 rounded-2xl border mb-8 font-mono-code text-xs ${
                  theme === "dark"
                    ? "bg-[#1E1E1B] border-[#33332D]"
                    : "bg-[#F3F0EA] border-[#D8D4CA]"
                }`}
              >
                <div>
                  <span className="opacity-50 block text-[10px]">VERIFIED DISPATCH TICKET</span>
                  <span className="font-bold tracking-wider">{submittedData.ticketId}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="p-2 rounded-lg hover:bg-current/10 transition-colors cursor-pointer"
                  title="Copy reference code"
                >
                  {copiedRef ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className={`text-xs font-semibold px-6 py-3 rounded-full border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#252522] border-[#383832] text-[#F1EFEA] hover:bg-[#30302B]"
                    : "bg-[#EFECE5] border-[#D0CCC2] text-[#151514] hover:bg-[#E5E1D8]"
                }`}
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs flex items-center gap-2 font-mono-code">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-2 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className={`w-full text-sm px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                      theme === "dark"
                        ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#66665A]"
                        : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#8E8A80]"
                    } ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-500 mt-1 block font-mono-code">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-2 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.org"
                    className={`w-full text-sm px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                      theme === "dark"
                        ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#66665A]"
                        : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#8E8A80]"
                    } ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-500 mt-1 block font-mono-code">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Organization */}
                <div>
                  <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-2 font-semibold">
                    Organization / School (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="University or Studio name"
                    className={`w-full text-sm px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                      theme === "dark"
                        ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#66665A]"
                        : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#8E8A80]"
                    }`}
                  />
                </div>

                {/* Subject Category */}
                <div>
                  <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-2 font-semibold">
                    Topic of Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full text-sm px-4 py-3 rounded-xl border focus:outline-none transition-all cursor-pointer ${
                      theme === "dark"
                        ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#66665A]"
                        : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#8E8A80]"
                    }`}
                  >
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                    <option value="Feedback on AI Tools">Feedback on AI Tools</option>
                    <option value="Educational Program & School Access">Educational Program & School Access</option>
                    <option value="Enterprise Architecture Consultation">Enterprise Architecture Consultation</option>
                    <option value="Research & Scientific Collaboration">Research & Scientific Collaboration</option>
                    <option value="Security Audit & Vulnerability Report">Security Audit & Vulnerability Report</option>
                  </select>
                </div>
              </div>

              {/* Privacy Profile Selection */}
              <div>
                <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-2 font-semibold">
                  Deployment / Privacy Baseline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Ephemeral Cloud Processing",
                    "Dedicated Hybrid VPC",
                    "Air-Gapped On-Premises",
                  ].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPrivacyPreference(p)}
                      className={`text-xs px-3.5 py-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                        privacyPreference === p
                          ? theme === "dark"
                            ? "bg-[#2A2A26] border-[#F1EFEA] font-semibold text-white"
                            : "bg-[#EAE6DD] border-[#151514] font-semibold text-black"
                          : "border-current/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono-code uppercase tracking-wider opacity-60 mb-2 font-semibold">
                  Message & Specific Details *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  placeholder="Tell us what you are working on, any questions about our tools, or how we can assist..."
                  className={`w-full text-sm p-4 rounded-xl border resize-none focus:outline-none transition-all ${
                    theme === "dark"
                      ? "bg-[#1E1E1B] border-[#33332D] text-[#F1EFEA] focus:border-[#66665A]"
                      : "bg-[#F8F6F1] border-[#D5D0C6] text-[#151514] focus:border-[#8E8A80]"
                  } ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-500 mt-1 block font-mono-code">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] opacity-60 font-mono-code flex items-center gap-1.5">
                  <Shield size={12} className="text-emerald-500" />
                  Zero third-party data tracking
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-6 py-3 rounded-full transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#F1EFEA] text-[#111110] hover:bg-white"
                      : "bg-[#151514] text-[#F1EFEA] hover:bg-black"
                  } ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Sending to Server...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Information without invented fake numbers */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`p-8 rounded-3xl border ${
              theme === "dark" ? "bg-[#181816]/70 border-[#2A2A26]" : "bg-white/70 border-[#DDD9D1]"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider opacity-60 mb-4 font-semibold">
              <MessageSquare size={14} className="text-emerald-500" />
              <span>Direct Communication Channel</span>
            </div>
            <h4 className="text-lg font-semibold tracking-tight mb-2">
              Aivanta Labs Inquiries
            </h4>
            <p className="text-xs sm:text-sm opacity-75 leading-relaxed mb-6">
              We review every inquiry directly through this portal. Messages are parsed in our internal task stream with response priority given to technical questions, tool feedback, and collaboration proposals.
            </p>

            <div className="space-y-3 pt-6 border-t border-current/10">
              <div className="flex items-center gap-3 text-xs opacity-80">
                <Mail size={13} className="opacity-60" />
                <span className="font-mono-code">Portal Form (Active & Monitored)</span>
              </div>
              <div className="flex items-center gap-3 text-xs opacity-80">
                <Key size={13} className="opacity-60" />
                <span className="font-mono-code">PGP Fingerprint: 0x4A81E92 (Security Channel)</span>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl border ${
              theme === "dark" ? "bg-[#181816]/50 border-[#2A2A26]" : "bg-white/50 border-[#DDD9D1]"
            }`}
          >
            <h5 className="text-xs font-mono-code uppercase tracking-wider font-semibold mb-2">
              Responsible Communication Policy
            </h5>
            <p className="text-xs opacity-70 leading-relaxed">
              We do not publish unsolicited telemarketing phone lines or personal mobile numbers. All correspondence is securely conducted via our authenticated web dispatch portal and verified developer repositories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
