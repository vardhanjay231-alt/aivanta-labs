export interface AivantaTool {
  id: string;
  name: string;
  category: "Writing" | "Productivity" | "Education" | "Creative" | "System";
  status: "Ready to Use" | "Active AI Model" | "Production Engine";
  badge: string;
  tagline: string;
  description: string;
  iconName: string;
  inputPlaceholder: string;
  actionButtonLabel: string;
  samplePresets: {
    label: string;
    input: string;
    options?: Record<string, string>;
  }[];
  optionsConfig?: {
    key: string;
    label: string;
    type: "select";
    defaultValue: string;
    choices: { value: string; label: string }[];
  }[];
  tips: string[];
}

export const AIVANTA_TOOLS: AivantaTool[] = [
  {
    id: "writing-assistant",
    name: "AI Writing Assistant",
    category: "Writing",
    status: "Ready to Use",
    badge: "Everyday Utility",
    tagline: "Refine, compose, and elevate your communication",
    description:
      "Crafts clear, impactful text for emails, proposals, articles, reports, and creative drafting. Select your desired tone and goal to produce natural, engaging writing.",
    iconName: "PenTool",
    inputPlaceholder:
      "Type or paste your draft, prompt, or rough notes here. For example: 'Write an introductory announcement explaining our new student AI workshop.'",
    actionButtonLabel: "Improve & Generate Writing",
    optionsConfig: [
      {
        key: "tone",
        label: "Tone of Voice",
        type: "select",
        defaultValue: "professional",
        choices: [
          { value: "professional", label: "Professional & Polished" },
          { value: "conversational", label: "Friendly & Conversational" },
          { value: "concise", label: "Crisp & Concise" },
          { value: "academic", label: "Academic & Thorough" },
          { value: "persuasive", label: "Inspiring & Persuasive" },
        ],
      },
      {
        key: "goal",
        label: "Primary Goal",
        type: "select",
        defaultValue: "improve",
        choices: [
          { value: "improve", label: "Enhance Clarity & Flow" },
          { value: "expand", label: "Expand with Examples" },
          { value: "shorten", label: "Shorten & Summarize" },
          { value: "draft", label: "Draft from Scratch" },
        ],
      },
    ],
    samplePresets: [
      {
        label: "Executive Update",
        input:
          "Team, quick note about Q3 milestones. We reached our server latency target of 22ms. We need to finalize documentation before Friday so our beta cohort can onboard.",
        options: { tone: "professional", goal: "improve" },
      },
      {
        label: "Student Workshop Pitch",
        input:
          "Announce an interactive 2-hour university workshop where beginners learn how to use practical AI tools for research papers and study planning without needing coding skills.",
        options: { tone: "persuasive", goal: "draft" },
      },
      {
        label: "Clarify Technical Report",
        input:
          "The system utilizes stochastic gradients which intermittently result in divergent sub-trajectories under edge conditions where memory constraints truncate contextual tokens.",
        options: { tone: "concise", goal: "improve" },
      },
    ],
    tips: [
      "Include key details like your target audience or required format for more tailored output.",
      "Use the 'Crisp & Concise' tone when writing emails or executive briefs.",
    ],
  },
  {
    id: "summarizer",
    name: "Text Summarizer & Key Takeaways",
    category: "Productivity",
    status: "Ready to Use",
    badge: "High-Speed Digest",
    tagline: "Condense long articles, transcripts, and documents into clear insights",
    description:
      "Transforms lengthy text, meeting notes, research papers, and articles into focused summaries, bullet points, or executive briefings while retaining crucial facts.",
    iconName: "FileText",
    inputPlaceholder:
      "Paste any article, transcript, lecture notes, or document here to extract core insights...",
    actionButtonLabel: "Generate Summary",
    optionsConfig: [
      {
        key: "format",
        label: "Summary Format",
        type: "select",
        defaultValue: "bullet points",
        choices: [
          { value: "bullet points", label: "Structured Bullet Points" },
          { value: "executive", label: "Executive Brief (1-2 Paragraphs)" },
          { value: "key takeaways", label: "Top 5 Key Takeaways" },
          { value: "action items", label: "Action Items & Next Steps" },
        ],
      },
      {
        key: "length",
        label: "Depth Level",
        type: "select",
        defaultValue: "balanced",
        choices: [
          { value: "concise", label: "Ultra-Brief (Fast skim)" },
          { value: "balanced", label: "Balanced (Recommended)" },
          { value: "detailed", label: "Comprehensive (Preserve nuance)" },
        ],
      },
    ],
    samplePresets: [
      {
        label: "Research Abstract",
        input:
          "Small language models (SLMs) trained on curated synthetic data can achieve reasoning benchmarks comparable to models five times their size, particularly in mathematical decomposition and structured JSON generation. However, post-training alignment remains sensitive to out-of-domain edge prompts. By introducing deterministic verification filters alongside low-rank adaptation, inference latency dropped from 120ms to 28ms while keeping hallucination rates under 1.8% on standard testing datasets.",
        options: { format: "key takeaways", length: "balanced" },
      },
      {
        label: "Meeting Transcript",
        input:
          "Meeting transcript: Sarah discussed the upcoming onboarding schedule for students in the winter semester. Tom confirmed that the cloud sandbox environment has 99.9% uptime and zero recorded outages during last month's load testing. Lisa raised a concern regarding data privacy: we must ensure student essays are never retained or used to train third-party public models. Action item: Lisa will audit the API proxy configuration by Thursday, and Tom will prepare the demo account links.",
        options: { format: "action items", length: "balanced" },
      },
    ],
    tips: [
      "Select 'Action Items & Next Steps' to quickly turn meeting transcripts into to-do lists.",
      "Summaries include a 1-sentence Core Thesis at the top for immediate context.",
    ],
  },
  {
    id: "idea-generator",
    name: "Idea & Innovation Generator",
    category: "Creative",
    status: "Ready to Use",
    badge: "Creative Brainstorm",
    tagline: "Spark structured, viable concepts for projects, startups, and lessons",
    description:
      "Breaks creative blocks by exploring fresh angles, product features, educational activities, and problem-solving hypotheses tailored to your domain.",
    iconName: "Sparkles",
    inputPlaceholder:
      "Enter a topic, challenge, or domain. For example: 'Ways AI can help high school biology students visualize cellular respiration' or 'Sustainable retail packaging ideas'...",
    actionButtonLabel: "Spark Creative Ideas",
    optionsConfig: [
      {
        key: "domain",
        label: "Target Context",
        type: "select",
        defaultValue: "general",
        choices: [
          { value: "education", label: "Education & Teaching" },
          { value: "business", label: "Business & Entrepreneurship" },
          { value: "creators", label: "Content & Creative Arts" },
          { value: "productivity", label: "Personal Productivity & Habits" },
          { value: "general", label: "General Innovation" },
        ],
      },
      {
        key: "count",
        label: "Number of Ideas",
        type: "select",
        defaultValue: "5",
        choices: [
          { value: "3", label: "3 Focused Ideas" },
          { value: "5", label: "5 Well-Rounded Ideas" },
          { value: "7", label: "7 Diverse Ideas" },
        ],
      },
    ],
    samplePresets: [
      {
        label: "Biology Education AI",
        input: "How can practical AI tools assist high school biology teachers in creating interactive laboratory experiments that work on basic tablets?",
        options: { domain: "education", count: "5" },
      },
      {
        label: "Local Business Utility",
        input: "Ideas for small local bakeries to reduce daily inventory food waste using simple predictive customer demand modeling.",
        options: { domain: "business", count: "5" },
      },
    ],
    tips: [
      "Specify your target audience and any budget or technical constraints for realistic recommendations.",
      "Each idea comes with an immediate first step to test the concept.",
    ],
  },
  {
    id: "study-assistant",
    name: "Study & Learning Assistant",
    category: "Education",
    status: "Ready to Use",
    badge: "Student & Educator Tool",
    tagline: "Master complex subjects with intuitive breakdowns and practice quizzes",
    description:
      "Explains intimidating topics using clear analogies, breaks lessons into foundational concepts, and builds practice questions to test and reinforce your mastery.",
    iconName: "GraduationCap",
    inputPlaceholder:
      "Enter any subject, theorem, or question you want to understand. For example: 'Explain how public-key cryptography works' or 'What caused the French Revolution?'...",
    actionButtonLabel: "Break Down & Create Quiz",
    optionsConfig: [
      {
        key: "level",
        label: "Target Knowledge Level",
        type: "select",
        defaultValue: "high school to college",
        choices: [
          { value: "beginner", label: "Beginner / Middle School (Simple analogies)" },
          { value: "high school to college", label: "High School & College (Standard)" },
          { value: "advanced", label: "Advanced / Professional (Rigorous terminology)" },
        ],
      },
    ],
    samplePresets: [
      {
        label: "Public Key Cryptography",
        input: "Explain public-key cryptography and RSA encryption, why one key can encrypt while only another can decrypt, and give a real-world analogy.",
        options: { level: "high school to college" },
      },
      {
        label: "Photosynthesis & Mitochondria",
        input: "Explain the relationship between the light-dependent reactions in chloroplasts and ATP generation in mitochondria.",
        options: { level: "high school to college" },
      },
    ],
    tips: [
      "Try answering the generated quiz questions before reading the solution to check recall.",
      "Ask for practical analogies to make abstract math or science concepts click.",
    ],
  },
  {
    id: "content-planner",
    name: "Content & Workflow Planner",
    category: "Creative",
    status: "Ready to Use",
    badge: "Strategy & Scheduling",
    tagline: "Organize campaigns, newsletters, and milestones with structured schedules",
    description:
      "Helps creators, educators, and teams construct logical, timeline-driven plans with clear deliverables, hooks, formats, and prerequisite checklists.",
    iconName: "Calendar",
    inputPlaceholder:
      "Describe what you want to plan. For example: 'A 4-week launch plan for an educational podcast about modern science breakthroughs'...",
    actionButtonLabel: "Build Content Schedule",
    optionsConfig: [
      {
        key: "timeframe",
        label: "Planning Window",
        type: "select",
        defaultValue: "2 weeks",
        choices: [
          { value: "1 week", label: "1 Week Intensive Sprint" },
          { value: "2 weeks", label: "2 Weeks Action Plan" },
          { value: "1 month", label: "1 Month Comprehensive Strategy" },
          { value: "quarterly", label: "Quarterly Roadmap (3 Months)" },
        ],
      },
    ],
    samplePresets: [
      {
        label: "Science Podcast Launch",
        input: "Plan the launch of a new weekly 15-minute science podcast for teenagers covering space exploration and robotics.",
        options: { timeframe: "2 weeks" },
      },
      {
        label: "Nonprofit Newsletter Series",
        input: "A 4-week educational email series explaining digital privacy best practices for non-technical community members.",
        options: { timeframe: "1 month" },
      },
    ],
    tips: [
      "Plans include checklist prerequisites so you know what assets to prepare in advance.",
    ],
  },
  {
    id: "productivity-organizer",
    name: "Productivity & Task Organizer",
    category: "Productivity",
    status: "Ready to Use",
    badge: "Clarity & Momentum",
    tagline: "Turn chaotic notes and task dumps into an actionable priority plan",
    description:
      "Sorts through overwhelming to-do lists, messy meeting notes, or random brain dumps, triaging tasks by urgency, value, and momentum-building quick wins.",
    iconName: "CheckSquare",
    inputPlaceholder:
      "Paste your unstructured thoughts, emails, and to-do items here. For example: 'Need to prepare slides for Monday, email vendor about invoice discrepancy, review lab assignment, buy groceries, fix bug #402, renew domain'...",
    actionButtonLabel: "Organize & Triage Tasks",
    samplePresets: [
      {
        label: "Hectic Workday Dump",
        input:
          "Finish quarterly report draft by 4pm, call dentist to reschedule, reply to Alex regarding API endpoint documentation, review PR #12, organize desktop folders, prep questions for team sync tomorrow morning, read chapter 4 of machine learning book.",
      },
      {
        label: "Student Midterm Crunch",
        input:
          "Study for calculus exam on Friday, write 3-page sociology reflection paper due Wednesday night, do chemistry lab calculations, email professor about office hours extension, organize lecture notes into flashcards, pay lab fee.",
      },
    ],
    tips: [
      "Paste without worrying about formatting or punctuation—the organizer categorizes everything automatically.",
      "Check the 'Quick Wins (< 5 mins)' section first to establish quick daily momentum.",
    ],
  },
  {
    id: "cortex-runner",
    name: "Aivanta Cortex Workflow Engine",
    category: "System",
    status: "Production Engine",
    badge: "Core Architecture",
    tagline: "Deterministic multi-step task decomposition and JSON schema planning",
    description:
      "Aivanta's flagship enterprise engine that translates complex operational goals into verifiable execution DAGs with mandatory human approval gates and schema enforcement.",
    iconName: "Terminal",
    inputPlaceholder:
      "Define an enterprise or analytical objective. For example: 'Audit vendor invoices against purchasing contracts, extract line items, verify mathematical totals, and flag variances above 5% to accounting.'...",
    actionButtonLabel: "Decompose Execution Graph",
    samplePresets: [
      {
        label: "Invoice Audit Pipeline",
        input: "Audit monthly supplier invoices for pricing deviations against master service agreement schedule A, verify tax totals, and flag discrepancies.",
      },
      {
        label: "Customer Data Migration",
        input: "Migrate legacy SQL customer contact table to encrypted CRM schema with PII masking and automated foreign key consistency checks.",
      },
    ],
    tips: [
      "The generated DAG features clear type signatures and failure fallbacks for each execution step.",
    ],
  },
  {
    id: "sentinel-verifier",
    name: "Aivanta Sentinel Grounding Validator",
    category: "System",
    status: "Production Engine",
    badge: "Safety & Verification",
    tagline: "Audit AI text for factual consistency, unsupported claims, and safety risks",
    description:
      "Inspects generative text and documents against formal grounding standards, flagging ambiguities, unverified numbers, and potential hallucinations before deployment.",
    iconName: "Shield",
    inputPlaceholder:
      "Paste synthetic text, reports, or claims you want to audit for grounding, accuracy, and compliance...",
    actionButtonLabel: "Audit & Verify Text",
    samplePresets: [
      {
        label: "Financial Claim Audit",
        input: "Our proprietary algorithm guarantees 44.8% annual returns with 0% risk of principal drawdown across all macroeconomic interest rate cycles.",
      },
      {
        label: "Medical Advice Verification",
        input: "Patients experiencing persistent acute chest pain should ingest concentrated herbal extracts and delay clinical cardiology examination until symptoms persist for 72 hours.",
      },
    ],
    tips: [
      "Sentinel identifies unsupported probabilistic claims and provides citation grounding checks.",
    ],
  },
];
