import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json({ limit: "5mb" }));

// Initialize GoogleGenAI server-side with user-agent header
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Status & Health Endpoint
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    company: "Aivanta Labs",
    tagline: "Building Useful AI for Everyone",
    aiAvailable: !!ai,
    engine: "gemini-3.8-flash",
    timestamp: new Date().toISOString(),
  });
});

// Tool Execution Endpoint
app.post("/api/ai/tool-execute", async (req, res) => {
  const startTime = Date.now();
  try {
    const { toolId, input, options } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res.status(400).json({ error: "Please provide valid text input." });
    }

    if (!ai) {
      return res.status(503).json({
        error:
          "The AI runtime is currently not configured with an API key. Please configure the GEMINI_API_KEY environment variable.",
        aiAvailable: false,
      });
    }

    // Build specialized prompt depending on tool
    let systemInstruction = "You are an intelligent, precise, helpful assistant from Aivanta Labs.";
    let prompt = input;

    switch (toolId) {
      case "writing-assistant": {
        const tone = options?.tone || "professional";
        const goal = options?.goal || "improve";
        systemInstruction = `You are the Aivanta Writing Assistant. Your aim is to make writing clear, engaging, and purposeful.
Tone requirement: ${tone}.
Action objective: ${goal}.
Rules:
1. Provide the improved or generated text directly.
2. Below the text, add a short "Refinement Notes" section with 2-3 specific bullet points on what was clarified or enhanced.`;
        prompt = `Task: ${goal} the following text in a ${tone} tone.\n\nInput text:\n${input}`;
        break;
      }
      case "summarizer": {
        const format = options?.format || "executive";
        const length = options?.length || "balanced";
        systemInstruction = `You are the Aivanta Text Summarizer. Your goal is to extract core insights without hallucination or fluff.
Output format: ${format} (Options: bullet points, executive brief, key takeaways).
Length: ${length}.
Rules:
1. Preserve numbers, dates, and essential facts faithfully.
2. If bullet points, use concise clear bullets.
3. Include a 1-sentence "Core Thesis" at the very beginning.`;
        prompt = `Please summarize the following content using the ${format} format (${length} length):\n\n${input}`;
        break;
      }
      case "idea-generator": {
        const domain = options?.domain || "general";
        const count = options?.count || 5;
        systemInstruction = `You are the Aivanta Idea & Brainstorm Generator. You produce practical, creative, and implementable ideas.
Domain: ${domain}.
Rules:
1. Generate ${count} distinct, creative, and viable ideas.
2. For each idea, provide:
   - Catchy Title
   - 2-sentence description of how it works
   - Target Audience & Why it's useful
   - First concrete next step to test it.`;
        prompt = `Generate ${count} innovative ideas for the following topic/problem:\n\n${input}`;
        break;
      }
      case "study-assistant": {
        const level = options?.level || "general";
        systemInstruction = `You are the Aivanta Study Assistant. Your aim is to make learning intuitive, clear, and memorable for students and lifelong learners.
Target audience knowledge level: ${level}.
Rules:
1. Explain the topic or question using clear everyday analogies.
2. Break it down into 3-4 key conceptual pillars.
3. Provide 3 interactive practice quiz questions (with hidden or clearly marked answers) to test comprehension.`;
        prompt = `Explain the following topic and create practice questions:\n\n${input}`;
        break;
      }
      case "content-planner": {
        const timeframe = options?.timeframe || "1 week";
        systemInstruction = `You are the Aivanta Content & Workflow Planner. You build structured, realistic, and actionable schedules.
Timeframe: ${timeframe}.
Rules:
1. Structure the plan into clear chronological phases or calendar days.
2. Include specific deliverables, recommended channels/formats, and key hooks.
3. Add a checklist of prerequisites and metrics for success.`;
        prompt = `Create a structured content plan (${timeframe}) for the following project/theme:\n\n${input}`;
        break;
      }
      case "productivity-organizer": {
        systemInstruction = `You are the Aivanta Productivity Assistant. You transform chaotic thoughts, notes, and tasks into an orderly action blueprint.
Rules:
1. Triage tasks into:
   - Immediate Priorities (Do First)
   - Secondary / Scheduled Items
   - Quick Wins (< 5 mins)
   - Delegate / Eliminate
2. For top tasks, estimate realistic time commitments.
3. Suggest a 3-step sequence to build immediate momentum.`;
        prompt = `Organize and prioritize the following brain dump / task list:\n\n${input}`;
        break;
      }
      case "cortex-runner": {
        systemInstruction = `You are Aivanta Cortex, a deterministic agent workflow planner.
Rules:
1. Decompose the goal into an execution Directed Acyclic Graph (DAG) with exact sequential steps.
2. For each step, define: Tool/Action, Input Schema, Expected Invariants, and Failure Fallback.
3. Output the plan cleanly with a valid JSON representation at the end.`;
        prompt = `Decompose and plan this workflow:\n\n${input}`;
        break;
      }
      case "sentinel-verifier": {
        systemInstruction = `You are Aivanta Sentinel, an AI factuality and safety verification engine.
Rules:
1. Identify all verifiable claims, numbers, dates, and statements in the input.
2. For each claim, evaluate potential ambiguity, logical consistency, and citation requirements.
3. Assign a Verifiability Score (1-10) and recommend specific grounding verification tests.`;
        prompt = `Audit and verify the following claims/text for safety and grounding:\n\n${input}`;
        break;
      }
      default: {
        systemInstruction = "You are a helpful and reliable AI assistant from Aivanta Labs.";
        prompt = input;
      }
    }

    let resultText = "";
    let usedModel = "gemini-3.8-flash";
    const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        resultText = response.text || "";
        usedModel = model;
        if (resultText) break;
      } catch (mErr: any) {
        lastError = mErr;
        console.warn(`[Aivanta Labs] Model ${model} returned error, trying fallback...`, mErr?.message || mErr);
      }
    }

    if (!resultText) {
      throw lastError || new Error("Failed to receive output from AI models.");
    }

    const executionTimeMs = Date.now() - startTime;

    res.json({
      success: true,
      result: resultText,
      toolId,
      model: "gemini-3.8-flash",
      latencyMs: executionTimeMs,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("AI Tool Execution Error:", err);
    res.status(500).json({
      error: err?.message || "Failed to process request with AI engine.",
      details: err?.toString(),
    });
  }
});

// Contact Form Submission Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, organization, subject, message, privacyPreference } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address format." });
  }

  const ticketId = `AVL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // In production, this can route to a real notifications service or database.
  console.log(`[Aivanta Contact] Received submission [${ticketId}] from ${name} <${email}>`);

  res.json({
    success: true,
    ticketId,
    message: "Thank you for contacting Aivanta Labs. Your request has been recorded.",
    receivedAt: new Date().toISOString(),
  });
});

// Start Server with Vite middlewares in Dev, or Static Files in Prod
async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== "true" },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aivanta Labs] Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
