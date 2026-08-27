// Add-ons catalog for Taungoo Sigma Lab services.
// Each add-on is an incremental feature/scope for the SAME service (not another main service).
// Pricing follows the project PPP factor: USD × 3,450 MMK/USD × 0.35 (rounded to nice MMK amounts).
// One-time add-ons range 483,000–6,040,000 MMK; Ongoing add-ons range 241,000–1,810,000 MMK/mo.

export interface AddOn {
  id: string;          // unique slug, e.g. "ai-chatbot-extra-flow"
  name: string;        // short name, e.g. "Extra Conversation Flow"
  type: "one-time" | "ongoing";  // one-time fee or recurring monthly
  description: string; // 1 sentence describing what it includes
  price: string;       // MMK price, e.g. "1,210,000 MMK" or "966,000 MMK/mo" for ongoing
}

export const SERVICE_ADDONS: Record<string, AddOn[]> = {
  // 1. AI Chatbot ---------------------------------------------------------
  "ai-chatbot": [
    { id: "ai-chatbot-extra-flow", name: "Extra Conversation Flow", type: "one-time", description: "Additional multi-step conversation flow with branching logic, entity extraction, and slot-filling tuned to your intents", price: "1,210,000 MMK" },
    { id: "ai-chatbot-language-pack", name: "Additional Language Pack", type: "one-time", description: "Full localization to one extra language with native NLP, intent retraining, and culturally-tuned responses", price: "966,000 MMK" },
    { id: "ai-chatbot-training-pipeline", name: "Custom Training Data Pipeline", type: "one-time", description: "Fine-tuning pipeline ingesting 1,000+ of your support docs, FAQs, and chat logs with weekly retrain hooks", price: "2,420,000 MMK" },
    { id: "ai-chatbot-analytics-dashboard", name: "Conversation Analytics Dashboard", type: "one-time", description: "Drop-off funnels, intent classification, sentiment trends, and per-flow resolution rates exported to BI", price: "1,810,000 MMK" },
    { id: "ai-chatbot-crm-sync", name: "CRM Two-way Sync", type: "one-time", description: "HubSpot or Salesforce integration with field mapping, lead scoring, and conversation-to-ticket routing", price: "1,570,000 MMK" },
    { id: "ai-chatbot-sentiment-escalation", name: "Sentiment Escalation Module", type: "one-time", description: "Real-time emotion detection that triggers live-agent handoff on negative sentiment or churn signals", price: "1,330,000 MMK" },
    { id: "ai-chatbot-model-retune", name: "Monthly Model Retuning", type: "ongoing", description: "Quarterly fine-tune pass, accuracy regression tests, and prompt drift remediation on production traffic", price: "483,000 MMK/mo" },
  ],

  // 2. Voice AI ----------------------------------------------------------
  "voice-ai": [
    { id: "voice-ai-voice-clone", name: "Custom Voice Clone", type: "one-time", description: "Branded TTS voice trained on 30 minutes of studio audio with pronunciation lexicon and emotion control", price: "1,810,000 MMK" },
    { id: "voice-ai-language-support", name: "Additional Language Support", type: "one-time", description: "Full STT + TTS coverage for one new locale with accent variants and code-switching tolerance", price: "1,330,000 MMK" },
    { id: "voice-ai-telephony", name: "Telephony Integration", type: "one-time", description: "Twilio or Vonage SIP trunk, IVR tree, call recording, and live transcription with DTMF fallback", price: "2,420,000 MMK" },
    { id: "voice-ai-wake-word", name: "Custom Wake Word", type: "one-time", description: "Branded wake-word model with on-device inference, low false-positive tuning, and embedded SDK", price: "966,000 MMK" },
    { id: "voice-ai-translation", name: "Real-time Translation Module", type: "one-time", description: "Bidirectional live translation across 6 languages with voice preservation and latency under 800ms", price: "3,620,000 MMK" },
    { id: "voice-ai-analytics", name: "Call Analytics Dashboard", type: "one-time", description: "Per-call sentiment, talk-time ratio, drop-off heatmap, and weekly QA scorecards for agents", price: "1,570,000 MMK" },
    { id: "voice-ai-hosting", name: "Call Volume Hosting", type: "ongoing", description: "Per 1,000 minutes of additional monthly usage with secure storage and pipeline auto-scaling", price: "724,000 MMK/mo" },
  ],

  // 3. Agent Swarm -------------------------------------------------------
  "agent-swarm": [
    { id: "agent-swarm-specialist-agent", name: "Additional Specialist Agent", type: "one-time", description: "New agent role with custom tool access, scoped memory, and defined handoff protocols to peers", price: "2,420,000 MMK" },
    { id: "agent-swarm-orchestration", name: "Swarm Orchestration Rules", type: "one-time", description: "Priority graph, dependency chains, fallback paths, and concurrency limits across the swarm", price: "1,810,000 MMK" },
    { id: "agent-swarm-memory-tuning", name: "Memory Vector Store Tuning", type: "one-time", description: "Hybrid (keyword + vector) recall with re-ranking, scoped namespaces, and TTL-based forgetting", price: "1,570,000 MMK" },
    { id: "agent-swarm-hitl", name: "Human-in-the-loop Approval", type: "one-time", description: "Slack and email checkpoints for high-risk actions with one-click approve, reject, or edit flows", price: "966,000 MMK" },
    { id: "agent-swarm-tool-integration", name: "Custom Tool Integration", type: "one-time", description: "API wrapper with retries, schema validation, and agent function-calling registration for one external system", price: "1,330,000 MMK" },
    { id: "agent-swarm-dashboard", name: "Swarm Analytics Dashboard", type: "one-time", description: "Per-agent performance, tool usage, token cost, and handoff heatmap in a real-time BI view", price: "1,810,000 MMK" },
    { id: "agent-swarm-refinement", name: "Continuous Agent Refinement", type: "ongoing", description: "Weekly prompt tuning, eval regression runs, and tool-call accuracy reports on production data", price: "966,000 MMK/mo" },
  ],

  // 4. AI Automation -----------------------------------------------------
  "ai-automation": [
    { id: "ai-automation-extra-workflow", name: "Extra Workflow", type: "one-time", description: "Additional N8N or Make workflow with 5+ nodes, OAuth, and end-to-end test coverage", price: "966,000 MMK" },
    { id: "ai-automation-connector", name: "Custom Integration Connector", type: "one-time", description: "Wrapper for one unlisted API with retries, pagination, webhooks, and typed schema exports", price: "1,570,000 MMK" },
    { id: "ai-automation-error-layer", name: "Error Handling & Retry Layer", type: "one-time", description: "Dead-letter queue, exponential backoff, alerting hooks, and replay UI for failed runs", price: "1,210,000 MMK" },
    { id: "ai-automation-scheduler", name: "Scheduled Job Orchestration", type: "one-time", description: "Cron registry, distributed queue, worker pool autoscaling, and per-job SLA tracking", price: "1,330,000 MMK" },
    { id: "ai-automation-audit-pipeline", name: "Audit Log Pipeline", type: "one-time", description: "Full execution trail shipped to your warehouse with immutable hash chain and query layer", price: "1,810,000 MMK" },
    { id: "ai-automation-notifications", name: "Slack & Email Notification Pack", type: "one-time", description: "Multi-channel alert templates with severity routing, mute windows, and on-call rotations", price: "483,000 MMK" },
    { id: "ai-automation-monitoring", name: "Workflow Monitoring SLA", type: "ongoing", description: "24/7 uptime monitoring, monthly tuning pass, and incident response within 4 business hours", price: "724,000 MMK/mo" },
  ],

  // 5. API & MCP ---------------------------------------------------------
  "api-mcp": [
    { id: "api-mcp-rest-endpoint", name: "Additional REST Endpoint", type: "one-time", description: "Full CRUD endpoint with auth, role scopes, rate limiting, and OpenAPI annotations", price: "966,000 MMK" },
    { id: "api-mcp-graphql", name: "GraphQL Layer Add-on", type: "one-time", description: "Schema-first GraphQL layer with resolvers, DataLoader batching, and persisted queries", price: "1,810,000 MMK" },
    { id: "api-mcp-websocket", name: "WebSocket Streaming Channel", type: "one-time", description: "Real-time pub/sub channel with presence, room scoping, and backpressure handling", price: "1,570,000 MMK" },
    { id: "api-mcp-mcp-server", name: "MCP Server Module", type: "one-time", description: "Model Context Protocol server with tool/resource schemas, transport, and auth gating", price: "2,420,000 MMK" },
    { id: "api-mcp-key-mgmt", name: "API Key Management", type: "one-time", description: "Key rotation, scopes, per-key quotas, and a self-service portal for your customers", price: "1,330,000 MMK" },
    { id: "api-mcp-sdk-gen", name: "OpenAPI Spec + SDK Generation", type: "one-time", description: "Versioned spec with multi-language SDK auto-generation (TS, Python, Go) and changelog", price: "966,000 MMK" },
    { id: "api-mcp-hosting", name: "Managed API Hosting", type: "ongoing", description: "Gateway, autoscaling, uptime monitoring, and monthly performance tuning on your VPC", price: "966,000 MMK/mo" },
  ],

  // 6. HERMES / Openclaw / GrokBot --------------------------------------
  "hermes-openclaw-grokbot": [
    { id: "hermes-persona", name: "Extra Bot Persona", type: "one-time", description: "Branded personality with tone-of-voice guide, sample responses, and refusal patterns", price: "966,000 MMK" },
    { id: "hermes-adapter", name: "Custom Discord/Telegram Adapter", type: "one-time", description: "Platform integration with slash commands, threads, reactions, and permission gating", price: "1,570,000 MMK" },
    { id: "hermes-tool-calling", name: "Tool Calling Module", type: "one-time", description: "Function registry with typed schemas, argument validation, and sandboxed execution", price: "1,810,000 MMK" },
    { id: "hermes-rag", name: "RAG Knowledge Base", type: "one-time", description: "Vector ingestion of your docs with chunking strategy, citation rendering, and re-ranking", price: "2,420,000 MMK" },
    { id: "hermes-router", name: "Multi-Model Router", type: "one-time", description: "Per-query model selection based on cost, latency, and capability scoring with fallback chain", price: "1,330,000 MMK" },
    { id: "hermes-moderation", name: "Moderation Filter Pack", type: "one-time", description: "Safety classifiers, custom rule engine, and full audit log of blocked or flagged outputs", price: "966,000 MMK" },
    { id: "hermes-refresh", name: "Daily Persona Refresh", type: "ongoing", description: "Daily content tuning, new tool hooks, and weekly persona drift report", price: "483,000 MMK/mo" },
  ],

  // 7. AI Video Generation ----------------------------------------------
  "ai-video-generation": [
    { id: "ai-video-extra-minute", name: "Extra Finished Minute", type: "one-time", description: "Additional one minute of finished, color-graded footage with sound design included", price: "483,000 MMK" },
    { id: "ai-video-avatar-training", name: "Custom Avatar Training", type: "one-time", description: "Branded AI avatar trained from 5 minutes of footage with lip-sync and gesture library", price: "2,420,000 MMK" },
    { id: "ai-video-dubbing", name: "Multi-language Voice Dubbing", type: "one-time", description: "Lip-synced translation per language with native voice talent and subtitle burn-in", price: "966,000 MMK" },
    { id: "ai-video-storyboard-revisions", name: "Storyboard Revision Pack", type: "one-time", description: "Three rounds of structure changes with shot list, framing, and pacing updates", price: "724,000 MMK" },
    { id: "ai-video-brand-pack", name: "Brand Style Pack", type: "one-time", description: "Color grading LUTs, typography templates, transition set, and lower-thirds pack", price: "1,210,000 MMK" },
    { id: "ai-video-music-license", name: "Background Score License", type: "one-time", description: "Royalty-free music selection with sync rights cleared for paid and organic distribution", price: "483,000 MMK" },
    { id: "ai-video-render-credits", name: "Render Credits Top-up", type: "ongoing", description: "Priority GPU queue and monthly render-minute bundle for ongoing production cadence", price: "724,000 MMK/mo" },
  ],

  // 8. 3D Modeling ------------------------------------------------------
  "3d-modeling": [
    { id: "3d-modeling-extra-model", name: "Additional 3D Asset", type: "one-time", description: "Single modeled asset (small/medium/large) delivered with clean topology and UVs", price: "966,000 MMK" },
    { id: "3d-modeling-pbr-pack", name: "PBR Texture Pack", type: "one-time", description: "4K physically-based materials with albedo, normal, roughness, metallic, and AO maps", price: "1,330,000 MMK" },
    { id: "3d-modeling-rigging", name: "Rigging & Skinning", type: "one-time", description: "Full skeletal rig with IK controls, facial blendshapes, and weight paint cleanup", price: "1,810,000 MMK" },
    { id: "3d-modeling-animation-set", name: "Animation Clip Set", type: "one-time", description: "Five reusable animation clips (idle, walk, attack, reaction, special) with root motion", price: "1,570,000 MMK" },
    { id: "3d-modeling-lod", name: "LOD Optimization", type: "one-time", description: "Three LOD levels plus Nanite-ready mesh and collision proxy for real-time engines", price: "966,000 MMK" },
    { id: "3d-modeling-render-pass", name: "Photoreal Render Pass", type: "one-time", description: "4K turntable and hero-shot renders with multi-pass EXR for compositing flexibility", price: "724,000 MMK" },
    { id: "3d-modeling-library-hosting", name: "Asset Library Hosting", type: "ongoing", description: "Cloud storage, versioned history, and team access controls for your growing asset library", price: "241,000 MMK/mo" },
  ],

  // 9. Graphic Design ---------------------------------------------------
  "graphic-design": [
    { id: "graphic-design-extra-concept", name: "Additional Logo Concept", type: "one-time", description: "Two extra unique logo directions with type, color, and usage mockups", price: "966,000 MMK" },
    { id: "graphic-design-pattern-pack", name: "Brand Pattern Pack", type: "one-time", description: "Seamless patterns and texture set across light, dark, and accent variants", price: "724,000 MMK" },
    { id: "graphic-design-social-templates", name: "Social Media Template Set", type: "one-time", description: "Ten branded post templates in editable Figma with caption and hashtag guidance", price: "966,000 MMK" },
    { id: "graphic-design-print-collateral", name: "Print Collateral Pack", type: "one-time", description: "Business cards, letterhead, and envelope with print-ready CMYK files and dielines", price: "1,210,000 MMK" },
    { id: "graphic-design-packaging", name: "Packaging Design", type: "one-time", description: "Dieline, 3D mockup, spec sheet, and print-ready artwork for one product SKU", price: "1,810,000 MMK" },
    { id: "graphic-design-retouch-bundle", name: "Photo Retouch Bundle", type: "one-time", description: "Twenty high-end edits with skin, color, and background cleanup for product or portrait", price: "966,000 MMK" },
    { id: "graphic-design-retainer", name: "Monthly Design Retainer", type: "ongoing", description: "Unlimited small revisions plus one new brand asset delivered each month", price: "966,000 MMK/mo" },
  ],

  // 10. Content & Copywriting -------------------------------------------
  "content-copywriting": [
    { id: "content-extra-article", name: "Extra SEO Article", type: "one-time", description: "1,500-word SEO article with keyword research, internal links, and meta description", price: "483,000 MMK" },
    { id: "content-long-form", name: "Long-form Blog Post", type: "one-time", description: "3,000-word pillar article with expert quotes, schema markup, and hero illustration brief", price: "966,000 MMK" },
    { id: "content-tech-docs", name: "Technical Documentation Set", type: "one-time", description: "Five pages of API or SDK docs with code samples, callouts, and version history", price: "1,330,000 MMK" },
    { id: "content-email-sequence", name: "Email Sequence Pack", type: "one-time", description: "Seven-email nurture sequence with subject A/B variants and segmentation logic", price: "966,000 MMK" },
    { id: "content-whitepaper", name: "Whitepaper / Ebook", type: "one-time", description: "5,000-word lead magnet with research citations, charts, and gated-download landing copy", price: "1,570,000 MMK" },
    { id: "content-localization", name: "Localization Pack", type: "one-time", description: "Translation and cultural adaptation of existing content into one additional language", price: "966,000 MMK" },
    { id: "content-monthly-refresh", name: "Monthly Content Refresh", type: "ongoing", description: "Four articles plus eight social posts delivered monthly with editorial calendar", price: "724,000 MMK/mo" },
  ],

  // 11. Online Media Buying ---------------------------------------------
  "online-media-buying": [
    { id: "online-media-extra-platform", name: "Extra Ad Platform", type: "one-time", description: "Expansion to one additional platform (Google, Meta, TikTok, LinkedIn) with full setup", price: "966,000 MMK" },
    { id: "online-media-tracking", name: "Conversion Tracking Setup", type: "one-time", description: "GA4, Meta Pixel, and server-side tagging with consent mode and deduplication", price: "1,330,000 MMK" },
    { id: "online-media-creative-variants", name: "Creative Variations Pack", type: "one-time", description: "Ten static and five short-form video variants for multivariate creative testing", price: "1,570,000 MMK" },
    { id: "online-media-audience-layer", name: "Audience Persona Layer", type: "one-time", description: "Lookalike audiences, retargeting tiers, and exclusion lists mapped to your funnel", price: "966,000 MMK" },
    { id: "online-media-landing-cro", name: "Landing Page Optimization", type: "one-time", description: "Three A/B variants with CRO audit, form redesign, and post-click analytics", price: "1,810,000 MMK" },
    { id: "online-media-reporting", name: "Weekly Reporting Dashboard", type: "one-time", description: "Looker Studio dashboard pulling spend, ROAS, and attribution across all platforms", price: "724,000 MMK" },
    { id: "online-media-management", name: "Campaign Management", type: "ongoing", description: "Daily optimization, bid adjustments, creative refresh, and scaling decisions", price: "1,810,000 MMK/mo" },
  ],

  // 12. UI/UX Design ----------------------------------------------------
  "ui-ux-design": [
    { id: "ui-ux-extra-screen", name: "Extra Screen Design", type: "one-time", description: "Single mobile or web screen with state variants and dark/light themes", price: "483,000 MMK" },
    { id: "ui-ux-design-system", name: "Design System Extension", type: "one-time", description: "Fifty-plus components with tokens, variants, documentation, and code handoff notes", price: "2,420,000 MMK" },
    { id: "ui-ux-prototype", name: "Interactive Prototype", type: "one-time", description: "Clickable Figma prototype with user flows, micro-interactions, and dev-spec exports", price: "1,570,000 MMK" },
    { id: "ui-ux-a11y-audit", name: "Accessibility Audit", type: "one-time", description: "WCAG 2.2 AA compliance review with screen-reader testing and remediation checklist", price: "1,330,000 MMK" },
    { id: "ui-ux-usability-test", name: "Usability Testing Round", type: "one-time", description: "Five moderated participant sessions with task scripts, recordings, and findings report", price: "1,810,000 MMK" },
    { id: "ui-ux-motion-pack", name: "Motion Design Pack", type: "one-time", description: "Ten micro-interactions with Lottie exports and timing specs for engineers", price: "966,000 MMK" },
    { id: "ui-ux-maintenance", name: "Design Maintenance", type: "ongoing", description: "Weekly iterations, dev handoff support, and design QA on shipped features", price: "724,000 MMK/mo" },
  ],

  // 13. Android & iOS App ----------------------------------------------
  "android-ios-app": [
    { id: "android-ios-extra-screen", name: "Extra Native Screen", type: "one-time", description: "Single native screen with state management, navigation, and unit-tested business logic", price: "966,000 MMK" },
    { id: "android-ios-push", name: "Push Notification System", type: "one-time", description: "FCM and APNs integration with segmentation, scheduling, and deep-link routing", price: "1,210,000 MMK" },
    { id: "android-ios-iap", name: "In-app Purchase Module", type: "one-time", description: "StoreKit and Play Billing with receipt validation server, entitlements, and restore flow", price: "1,810,000 MMK" },
    { id: "android-ios-offline", name: "Offline Mode & Sync", type: "one-time", description: "Local persistence, conflict resolution, and background sync queue for poor-connectivity use", price: "2,420,000 MMK" },
    { id: "android-ios-localization", name: "Localization Pack", type: "one-time", description: "Per-language UI strings, RTL layout support, and locale-specific asset variants", price: "966,000 MMK" },
    { id: "android-ios-store-submission", name: "App Store Submission", type: "one-time", description: "Review prep, listing assets, privacy disclosures, and submission to both stores", price: "483,000 MMK" },
    { id: "android-ios-crash-sla", name: "Crash Monitoring SLA", type: "ongoing", description: "Sentry integration, monthly triage report, and 24-hour response on P1 crashes", price: "483,000 MMK/mo" },
  ],

  // 14. Web / WebApp ---------------------------------------------------
  "web-webapp": [
    { id: "web-webapp-extra-page", name: "Extra Responsive Page", type: "one-time", description: "Single responsive page with state, form handling, and SEO meta scaffolding", price: "966,000 MMK" },
    { id: "web-webapp-cms", name: "CMS Integration", type: "one-time", description: "Sanity or Contentful integration with preview mode, content modeling, and editor training", price: "1,570,000 MMK" },
    { id: "web-webapp-auth", name: "Auth & User Management", type: "one-time", description: "NextAuth or Clerk integration with RBAC, magic links, OAuth, and audit logs", price: "1,810,000 MMK" },
    { id: "web-webapp-e2e", name: "E2E Test Suite", type: "one-time", description: "Playwright suite with thirty specs across critical paths and CI integration", price: "1,330,000 MMK" },
    { id: "web-webapp-seo", name: "SEO Optimization Pack", type: "one-time", description: "Schema markup, sitemaps, meta templating, OG cards, and Core Web Vitals pass", price: "966,000 MMK" },
    { id: "web-webapp-perf", name: "Performance Optimization", type: "one-time", description: "Bundle splitting, image pipeline, caching strategy, and Lighthouse 90+ on key pages", price: "1,210,000 MMK" },
    { id: "web-webapp-hosting", name: "Hosting & Monitoring", type: "ongoing", description: "Vercel hosting, uptime alerts, error tracking, and monthly performance tuning", price: "724,000 MMK/mo" },
  ],

  // 15. Chrome Extensions ----------------------------------------------
  "chrome-extensions": [
    { id: "chrome-extensions-content-script", name: "Additional Content Script", type: "one-time", description: "Page-injection script with DOM scraping, mutation observer, and isolated world", price: "966,000 MMK" },
    { id: "chrome-extensions-bg-worker", name: "Background Service Worker", type: "one-time", description: "Task queue, alarm scheduler, and message bus with persistent IndexedDB state", price: "1,210,000 MMK" },
    { id: "chrome-extensions-cross-browser", name: "Cross-browser Port", type: "one-time", description: "Firefox, Edge, and Safari port with shared core and per-browser manifest", price: "1,810,000 MMK" },
    { id: "chrome-extensions-oauth-sync", name: "OAuth & Sync Engine", type: "one-time", description: "Chrome identity, refresh-token flow, and cross-device sync with conflict resolution", price: "1,570,000 MMK" },
    { id: "chrome-extensions-options-ui", name: "Options Page UI", type: "one-time", description: "Settings page with import/export, theme toggle, and per-feature toggles", price: "966,000 MMK" },
    { id: "chrome-extensions-store-submission", name: "Web Store Submission", type: "one-time", description: "Listing copy, screenshots, privacy policy, and submission to Chrome Web Store", price: "483,000 MMK" },
    { id: "chrome-extensions-auto-update", name: "Auto-update & Analytics", type: "ongoing", description: "Release pipeline with staged rollout and weekly usage event reporting", price: "483,000 MMK/mo" },
  ],

  // 16. Desktop / MacBook Apps -----------------------------------------
  "desktop-macbook-apps": [
    { id: "desktop-macbook-extra-view", name: "Extra Native View", type: "one-time", description: "Single native window with state, menu integration, and accessibility support", price: "1,210,000 MMK" },
    { id: "desktop-macbook-auto-update", name: "Auto-update Pipeline", type: "one-time", description: "Code signing, Sparkle or Squirrel integration, and delta-update distribution", price: "1,570,000 MMK" },
    { id: "desktop-macbook-offline-db", name: "Offline Database", type: "one-time", description: "SQLite with migrations, encryption, and full-text search index", price: "1,330,000 MMK" },
    { id: "desktop-macbook-menu-bar", name: "Native Menu Bar & Notifications", type: "one-time", description: "System tray, menu bar item, and native notification center integration", price: "966,000 MMK" },
    { id: "desktop-macbook-cloud-sync", name: "Cloud Sync Module", type: "one-time", description: "Multi-device sync with conflict resolution and end-to-end encrypted transport", price: "1,810,000 MMK" },
    { id: "desktop-macbook-notarization", name: "macOS Notarization & DMG", type: "one-time", description: "Apple Developer ID signing, notarization, and DMG installer with drag-to-Applications", price: "724,000 MMK" },
    { id: "desktop-macbook-crash-telemetry", name: "Crash & Telemetry", type: "ongoing", description: "Sentry integration, symbol upload pipeline, and monthly triage report", price: "483,000 MMK/mo" },
  ],

  // 17. ASO ------------------------------------------------------------
  "aso": [
    { id: "aso-locale-listing", name: "Additional Locale Listing", type: "one-time", description: "Full keyword research and store listing copy localized for one additional language", price: "483,000 MMK" },
    { id: "aso-screenshot-refresh", name: "Screenshot Refresh Pack", type: "one-time", description: "Eight localized screenshots per locale with copy variations and device frames", price: "724,000 MMK" },
    { id: "aso-ab-testing", name: "A/B Testing Setup", type: "one-time", description: "Google Play experiments with hypothesis, variants, and statistical significance readout", price: "1,210,000 MMK" },
    { id: "aso-keyword-sprint", name: "Keyword Optimization Sprint", type: "one-time", description: "Fifty ranked keywords with tracking, density tuning, and competitor gap analysis", price: "966,000 MMK" },
    { id: "aso-preview-video", name: "App Preview Video", type: "one-time", description: "Thirty-second promo with script, screen recording, captions, and editing", price: "1,330,000 MMK" },
    { id: "aso-review-management", name: "Review Response Management", type: "one-time", description: "Templated replies for top review patterns with sentiment tracking and escalation rules", price: "483,000 MMK" },
    { id: "aso-ranking-monitoring", name: "Keyword Ranking Monitoring", type: "ongoing", description: "Weekly ranking report across stores, competitor tracking, and alert on rank drops", price: "362,000 MMK/mo" },
  ],

  // 18. Web3 Wallets ---------------------------------------------------
  "web3-wallets": [
    { id: "web3-wallets-chain-support", name: "Additional Chain Support", type: "one-time", description: "EVM, Solana, or Cosmos chain integration with RPC fallback and address validation", price: "1,810,000 MMK" },
    { id: "web3-wallets-hardware", name: "Hardware Wallet Integration", type: "one-time", description: "Ledger, Trezor, and Keystore support with U2F transport and signing flows", price: "1,570,000 MMK" },
    { id: "web3-wallets-multisig", name: "Multi-sig Module", type: "one-time", description: "Threshold signing with role policies, approval queues, and full audit trail", price: "2,420,000 MMK" },
    { id: "web3-wallets-nft-gallery", name: "NFT Gallery & Display", type: "one-time", description: "Metadata parsing, media rendering, trait filters, and lazy-loaded grid view", price: "1,330,000 MMK" },
    { id: "web3-wallets-dapp-browser", name: "dApp Browser", type: "one-time", description: "WalletConnect v2 and in-app browser with session management and origin allow-list", price: "1,810,000 MMK" },
    { id: "web3-wallets-tx-simulation", name: "Transaction Simulation", type: "one-time", description: "Pre-sign preview with balance changes, approval calls, and risk scoring", price: "1,570,000 MMK" },
    { id: "web3-wallets-monitoring", name: "Wallet Monitoring & Alerts", type: "ongoing", description: "Security watch on connected dApps, threat intel feeds, and instant suspicious-tx alerts", price: "966,000 MMK/mo" },
  ],

  // 19. AMM / DEX ------------------------------------------------------
  "amm-dex": [
    { id: "amm-dex-pool-type", name: "Additional Liquidity Pool Type", type: "one-time", description: "Concentrated, TWAMM, or weighted pool implementation with full math tests", price: "2,420,000 MMK" },
    { id: "amm-dex-yield-farming", name: "Yield Farming Module", type: "one-time", description: "Staking, rewards distribution, vesting schedules, and farm booster logic", price: "1,810,000 MMK" },
    { id: "amm-dex-mev-protection", name: "MEV Protection Layer", type: "one-time", description: "Slippage guard, private mempool routing, and commit-reveal pattern for large swaps", price: "1,570,000 MMK" },
    { id: "amm-dex-bridge", name: "Cross-chain Bridge Integration", type: "one-time", description: "Routing across bridges with quote comparison, retry logic, and status webhooks", price: "2,420,000 MMK" },
    { id: "amm-dex-subgraph", name: "Analytics Subgraph", type: "one-time", description: "Subgraph indexing TVL, volume, LP metrics, and pair history with GraphQL API", price: "1,330,000 MMK" },
    { id: "amm-dex-router-ui", name: "Custom Router UI", type: "one-time", description: "Branded swap interface with custom slippage, gas presets, and token lists", price: "1,210,000 MMK" },
    { id: "amm-dex-pool-monitoring", name: "Pool Health Monitoring", type: "ongoing", description: "Imbalance alerts, rebalancing recommendations, and weekly TVL health report", price: "724,000 MMK/mo" },
  ],

  // 20. DAO Governance -------------------------------------------------
  "dao-governance": [
    { id: "dao-governance-proposal-type", name: "Additional Proposal Type", type: "one-time", description: "Custom proposal template with quorum, threshold, and execution flow wired to timelock", price: "1,570,000 MMK" },
    { id: "dao-governance-voting-strategy", name: "Voting Strategy Module", type: "one-time", description: "Quadratic, conviction, or weighted voting with anti-collusion checks", price: "1,810,000 MMK" },
    { id: "dao-governance-treasury", name: "Treasury Module", type: "one-time", description: "Multi-asset treasury with vesting, payment streams, and on-chain reporting", price: "2,420,000 MMK" },
    { id: "dao-governance-delegation", name: "Delegate & Delegation UI", type: "one-time", description: "Delegate flow with revocation, vote-weight visualization, and delegate leaderboard", price: "1,210,000 MMK" },
    { id: "dao-governance-forum", name: "Discussion Forum Integration", type: "one-time", description: "Discourse or Snapshot sync with cross-linking, topic-to-proposal mapping, and RSS", price: "966,000 MMK" },
    { id: "dao-governance-tally", name: "Realtime Tally Dashboard", type: "one-time", description: "Live vote power, participation rate, and quorum progress with delegator breakdown", price: "1,330,000 MMK" },
    { id: "dao-governance-monitoring", name: "Governance Monitoring", type: "ongoing", description: "Proposal watch service, voter reminders, and monthly governance health report", price: "483,000 MMK/mo" },
  ],

  // 21. NFT Systems ---------------------------------------------------
  "nft-systems": [
    { id: "nft-systems-collection", name: "Additional Collection", type: "one-time", description: "5K-supply ERC-721 or ERC-1155 contract with reveal, allowlist, and metadata freezing", price: "2,420,000 MMK" },
    { id: "nft-systems-dynamic", name: "Dynamic NFT Module", type: "one-time", description: "On-chain trait evolution with oracle triggers and rendered image auto-regeneration", price: "1,810,000 MMK" },
    { id: "nft-systems-royalty", name: "Royalty Enforcement Layer", type: "one-time", description: "EIP-2981 plus marketplace blacklist and operator-filter registry integration", price: "966,000 MMK" },
    { id: "nft-systems-mint-ui", name: "Mint UI Customization", type: "one-time", description: "Branded mint page with allowlist gating, batch mint, and live gas estimator", price: "1,330,000 MMK" },
    { id: "nft-systems-metadata", name: "Metadata Hosting & CDN", type: "one-time", description: "IPFS or Arweave pinning with image pipeline, traits JSON, and backup mirror", price: "966,000 MMK" },
    { id: "nft-systems-marketplace", name: "Marketplace Listing Hooks", type: "one-time", description: "OpenSea, Blur, and Magic Eden listing automation with floor tracking", price: "1,210,000 MMK" },
    { id: "nft-systems-analytics", name: "Floor & Holders Analytics", type: "ongoing", description: "Monthly report on floor, holders, whale moves, and wash-trade detection", price: "483,000 MMK/mo" },
  ],

  // 22. Security Audit -------------------------------------------------
  "security-audit": [
    { id: "security-audit-contract", name: "Additional Contract Audit", type: "one-time", description: "Single Solidity or Vyper contract review with manual + automated findings report", price: "1,810,000 MMK" },
    { id: "security-audit-pentest", name: "Penetration Test Add-on", type: "one-time", description: "Frontend, API, and infrastructure penetration test with exploitation steps and remediation", price: "2,420,000 MMK" },
    { id: "security-audit-formal", name: "Formal Verification", type: "one-time", description: "Certora or Halmos spec writing with rule coverage and counterexample reporting", price: "3,620,000 MMK" },
    { id: "security-audit-social-eng", name: "Social Engineering Test", type: "one-time", description: "Phishing simulations and red-team exercises against your team with awareness training", price: "1,570,000 MMK" },
    { id: "security-audit-reaudit", name: "Re-audit After Fixes", type: "one-time", description: "Verification pass on mitigations with retest of all original findings and report update", price: "966,000 MMK" },
    { id: "security-audit-localization", name: "Audit Report Localization", type: "one-time", description: "Full translation of the audit report into one additional language with technical glossary", price: "483,000 MMK" },
    { id: "security-audit-monitoring", name: "Continuous Monitoring", type: "ongoing", description: "Monthly vulnerability scans, threat intel feeds, and 4-hour incident response SLA", price: "1,810,000 MMK/mo" },
  ],

  // 23. Smart Contract Development ------------------------------------
  "smart-contract-development": [
    { id: "smart-contract-module", name: "Additional Contract Module", type: "one-time", description: "Single Solidity module with unit tests, fuzz tests, and NatSpec documentation", price: "1,810,000 MMK" },
    { id: "smart-contract-upgradeability", name: "Upgradeability Pattern", type: "one-time", description: "UUPS or Transparent proxy setup with role-based upgrade admin and storage gaps", price: "1,570,000 MMK" },
    { id: "smart-contract-gas", name: "Gas Optimization Sprint", type: "one-time", description: "Assembly refactor, storage packing, and calldata optimization with before/after benchmarks", price: "1,330,000 MMK" },
    { id: "smart-contract-multisig", name: "Multi-sig Integration", type: "one-time", description: "Gnosis Safe integration with module hooks, role policies, and signing workflows", price: "1,210,000 MMK" },
    { id: "smart-contract-pausable", name: "Emergency Stop / Pausable", type: "one-time", description: "Role-based circuit breaker with per-function pause and graceful shutdown hooks", price: "966,000 MMK" },
    { id: "smart-contract-testnet", name: "Testnet Deploy & Verification", type: "one-time", description: "Multi-testnet deployment, Etherscan verification, and dry-run scripts", price: "483,000 MMK" },
    { id: "smart-contract-mainnet-monitoring", name: "Mainnet Monitoring", type: "ongoing", description: "Event watch service, anomaly alerts, and monthly on-chain health report", price: "724,000 MMK/mo" },
  ],

  // 24. Bug Bounty ----------------------------------------------------
  "bug-bounty": [
    { id: "bug-bounty-severity-tier", name: "Additional Severity Tier", type: "one-time", description: "Custom payout tier with escrow, KYC gate, and dispute-resolution policy", price: "966,000 MMK" },
    { id: "bug-bounty-hunter-pack", name: "Hunter Recruitment Pack", type: "one-time", description: "Outreach campaign and onboarding flow for twenty-five new bounty hunters", price: "1,330,000 MMK" },
    { id: "bug-bounty-triage", name: "Triage Service", type: "one-time", description: "First-pass validation, dedupe, and severity scoring for all incoming submissions", price: "1,810,000 MMK" },
    { id: "bug-bounty-private", name: "Private Program Add-on", type: "one-time", description: "Invite-only cohort with KYC, NDA, and gated access to staging assets", price: "1,210,000 MMK" },
    { id: "bug-bounty-payout", name: "Payout Management", type: "one-time", description: "Multi-chain payout disbursement with ledger, tax docs, and refund handling", price: "966,000 MMK" },
    { id: "bug-bounty-hall-of-fame", name: "Hall of Fame Page", type: "one-time", description: "Branded leaderboard with contributor avatars, stats, and assets for your marketing site", price: "483,000 MMK" },
    { id: "bug-bounty-monthly-triage", name: "Monthly Triage Retainer", type: "ongoing", description: "SLA-backed triage with monthly report and 24-hour response on critical submissions", price: "724,000 MMK/mo" },
  ],

  // 25. Money Market Development -------------------------------------
  "money-market-development": [
    { id: "money-market-asset", name: "Additional Asset Market", type: "one-time", description: "Single asset market with custom rate model, oracle feed, and risk parameters", price: "2,420,000 MMK" },
    { id: "money-market-rate-strategy", name: "Interest Rate Strategy", type: "one-time", description: "Custom curve with kink, utilization target, and per-asset slope tuning", price: "1,810,000 MMK" },
    { id: "money-market-liquidation", name: "Liquidation Engine", type: "one-time", description: "Auction or Dutch-style liquidation with reward split and bad-debt recapitalization", price: "2,420,000 MMK" },
    { id: "money-market-collateral", name: "Collateral Risk Module", type: "one-time", description: "Per-asset LTV, liquidation thresholds, haircuts, and oracle staleness guards", price: "1,570,000 MMK" },
    { id: "money-market-governance-vault", name: "Governance Vault", type: "one-time", description: "Pause function, parameter setter, and timelocked admin routes for DAO control", price: "1,330,000 MMK" },
    { id: "money-market-risk-dashboard", name: "Risk Dashboard", type: "one-time", description: "TVL, utilization, bad debt, and reserve health with stress-test scenarios", price: "1,210,000 MMK" },
    { id: "money-market-risk-monitoring", name: "Market Risk Monitoring", type: "ongoing", description: "Daily risk alerts, scenario simulation, and monthly risk committee report", price: "1,810,000 MMK/mo" },
  ],

  // 26. CBDC Development ----------------------------------------------
  "cbdc-development": [
    { id: "cbdc-node-validator", name: "Additional Node Validator", type: "one-time", description: "Permissioned validator setup with HSM-backed keys and consensus participation", price: "1,810,000 MMK" },
    { id: "cbdc-kyc-aml", name: "KYC / AML Integration", type: "one-time", description: "Sumsub or comparable KYC with sanctions screening, risk scoring, and audit trail", price: "2,420,000 MMK" },
    { id: "cbdc-offline-payments", name: "Offline Payment Module", type: "one-time", description: "Secure-element integration with deferred sync and double-spend prevention", price: "3,620,000 MMK" },
    { id: "cbdc-privacy-tranche", name: "Privacy Tranche", type: "one-time", description: "Zero-knowledge proof layer with selective disclosure for regulator and citizen views", price: "3,620,000 MMK" },
    { id: "cbdc-central-bank-dashboard", name: "Central Bank Dashboard", type: "one-time", description: "Supply, flow, and policy controls with role-based access and immutable action log", price: "2,420,000 MMK" },
    { id: "cbdc-cross-border-bridge", name: "Cross-border Bridge", type: "one-time", description: "CBDC-to-CBDC atomic settlement with FX oracle and compliance gate", price: "3,620,000 MMK" },
    { id: "cbdc-compliance-reporting", name: "Compliance Reporting", type: "ongoing", description: "Weekly regulatory reports, audit log exports, and policy change attestation", price: "1,810,000 MMK/mo" },
  ],

  // 27. Mobile/Web Game Dev ------------------------------------------
  "mobile-web-game-development": [
    { id: "game-level-pack", name: "Extra Level Pack", type: "one-time", description: "Ten new levels with new mechanics, par scoring, and playtested difficulty curve", price: "1,810,000 MMK" },
    { id: "game-character", name: "Additional Playable Character", type: "one-time", description: "Model, animations, ability kit, and balancing pass for one new character", price: "1,570,000 MMK" },
    { id: "game-multiplayer", name: "Multiplayer Module", type: "one-time", description: "Matchmaking, netcode, room system, and lobby with party invites and reconnect", price: "3,620,000 MMK" },
    { id: "game-iap", name: "In-app Purchase System", type: "one-time", description: "Store integration with consumables, cosmetics, receipt validation, and entitlements", price: "1,810,000 MMK" },
    { id: "game-leaderboard", name: "Leaderboard & Achievements", type: "one-time", description: "Backend, UI, push notifications, and platform integration for Game Center and Play", price: "966,000 MMK" },
    { id: "game-localization", name: "Localization Pack", type: "one-time", description: "Per-language UI, voice subtitles, and asset swap with RTL and CJK support", price: "724,000 MMK" },
    { id: "game-liveops", name: "LiveOps & Content Drops", type: "ongoing", description: "Monthly events, balance patches, and themed content drops to drive retention", price: "966,000 MMK/mo" },
  ],
};

// Helper exports for consumers
export const ALL_ADDONS: AddOn[] = Object.values(SERVICE_ADDONS).flat();

export function getAddOnsForService(slug: string): AddOn[] {
  return SERVICE_ADDONS[slug] ?? [];
}

export function findAddonById(id: string): AddOn | undefined {
  return ALL_ADDONS.find((a) => a.id === id);
}
