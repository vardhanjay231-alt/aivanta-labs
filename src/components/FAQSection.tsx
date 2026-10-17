import React, { useState } from "react";
import { Sparkles, Plus, Minus, HelpCircle } from "lucide-react";

interface FAQSectionProps {
  theme: "light" | "dark";
}

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Tools & Technology" | "Privacy & Data";
}

export const FAQSection: React.FC<FAQSectionProps> = ({ theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "General",
      question: "What is Aivanta Labs and what is your core mission?",
      answer:
        "Aivanta Labs is an applied artificial intelligence company whose mission is to build intuitive, reliable, and responsible AI-powered tools that help people learn, create, work, and solve everyday problems. We believe AI should be a quiet, dependable utility accessible to everyone regardless of technical background.",
    },
    {
      category: "General",
      question: "Who can use Aivanta's tools?",
      answer:
        "Our tools are engineered for students, educators, professionals, creators, and businesses alike. From high school students preparing for exams to software teams automating complex JSON data pipelines, our interfaces require zero prior coding or prompt engineering knowledge.",
    },
    {
      category: "Tools & Technology",
      question: "How do the AI tools on this website work?",
      answer:
        "When you select a tool (such as the Writing Assistant, Summarizer, or Study Assistant), your input is securely processed by our backend engine running state-of-the-art Gemini AI models with customized system instructions and constraints. Results are generated with real-time latency feedback and formatted for immediate everyday use.",
    },
    {
      category: "Tools & Technology",
      question: "Can I use these tools directly in my browser without installing anything?",
      answer:
        "Yes! Every tool in our interactive catalogue runs directly inside your modern web browser on desktop, tablet, or mobile. Simply open the tool, type or paste your content (or select a quick sample preset), and click the action button.",
    },
    {
      category: "Privacy & Data",
      question: "Is my text, draft, or confidential note stored on your servers?",
      answer:
        "No. We enforce strict ephemeral processing. Your text is evaluated in temporary memory solely to generate the requested output and is immediately discarded. We do not store your drafts in persistent databases, and we never use user-submitted queries to train public foundation models.",
    },
    {
      category: "Privacy & Data",
      question: "Are there any hidden costs or subscriptions required to try the tools?",
      answer:
        "All the interactive web tools listed in our catalogue are available to explore and test immediately. We believe in letting users experience the genuine practical value of our systems firsthand without forcing paywalls or deceptive sign-up walls.",
    },
    {
      category: "Tools & Technology",
      question: "What makes Aivanta different from generic chat interfaces?",
      answer:
        "Generic chatbots often wander into conversational tangents, invent plausible-sounding falsehoods, and require complicated prompting. Aivanta provides focused, purposeful tools with explicit controls (like tone, depth, and formats) and deterministic schema validation so you get reliable outputs every single time.",
    },
    {
      category: "General",
      question: "How can my team or school collaborate with Aivanta Labs?",
      answer:
        "You can reach out through our Contact section for private enterprise deployments, educational pilot programs, customized workflow integrations, or joint research partnerships. We respond promptly with technical directness.",
    },
  ];

  return (
    <section id="faq" className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mb-3 font-mono-code">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Clear answers about <span className="font-serif-accent italic">how we work.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm opacity-70 leading-relaxed">
          Everything you need to know about Aivanta Labs, our AI tools catalogue, privacy principles, and system reliability.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="pt-10 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                theme === "dark"
                  ? "bg-[#181816]/70 border-[#2A2A26]"
                  : "bg-white/70 border-[#DDD9D1]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="font-mono-code text-[11px] font-semibold opacity-40">
                    0{index + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold tracking-tight">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`p-1.5 rounded-full border transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 bg-current/10" : ""
                  }`}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm opacity-80 leading-relaxed border-t border-current/5 animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                  <div className="mt-3 pt-3 flex items-center gap-2 text-[10px] font-mono-code opacity-50 uppercase tracking-wider">
                    <span>Category: {faq.category}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
