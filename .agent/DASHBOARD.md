# Execution Dashboard — CETI Academy

Append-only log of every milestone, decision, and build. Newest at top.

---

## 2026-04-19 · M3 novice tier opened — Perspective Matrix + Six Dimensions

Two Novice pages shipped: `/academy/novice/perspective-matrix` (MERCURIO Pattern 1) and `/academy/novice/six-dimensions` (MARS Pattern 1). Both ported for non-developers — no MoE syntax, no Hekat DSL, no agent-mode framing. The habit comes first, the Claude Code workflow comes second inside a collapsed deep-dive.

Structure matches the M2 reference page exactly: `ModuleHero` → lead sentence → `core-idea` Callout → quizzes with one correct option (and plausible misdirections) → `tip`/`warning`/`key-concept` Callouts → `IxCollapse` deep-dive → `TryThis` exercise → `Recap` → bottom nav. Six Dimensions uses a styled `<dl>` for the dimension list — no new component needed, definitions ≤ 8 words each.

Academy landing updated: Novice tier now routes to `/academy/novice/perspective-matrix` (was `/start/01-mental-model`). The self-placement stepper and tier cards both send novices to the new page.

`npm run build` green. Banned-words + inline-style scan clean. No new deps, no new components.

**Next milestone (M4)**: fan out Experienced tier — candidates `/academy/experienced/mcp-wiring`, `/hooks-basics`, `/skills-library`, `/multi-project-setup`.

---

## 2026-04-19 · M2 proof page built — tier components + academy landing + debugging-ai-loops

Six course components shipped under `app/components/course/`: `ModuleHero`, `Callout` (7 variants via CVA), `Quiz` (per-question reveal, no cross-question state), `IxCollapse` (rotating chevron), `TryThis`, `Recap`. Each composes existing shadcn-vue primitives — no new deps, no new tokens. Tailwind utilities throughout; no inline `style=`.

Academy landing at `/academy`: three-question stepper (uses `ref()`, advances step-by-step, emits recommended tier), three tier cards with Experienced featured (`border-gold`), and the 5×3 cross-tier thread table with mobile overflow. No gate — public entry for the skill-level axis.

First Experienced page at `/academy/experienced/debugging-ai-loops`. Content adapted from LUXOR `agentic-ai-course/labs/day1/lab-03-agent-thinking.html` + `day3/lab-08-production.html` (the originally-cited `lab-09-debugging-ai-loops.html` does not exist — used the nearest substance sources). PRAO loop framing softened for non-developers into Perceive / Reason / Act / Observe. Three quizzes, each naming a symptom and asking for the root cause. Invariants held: no `--thinking`, no `--context`, no `/memory`.

Nav updated to include "Academy" between Bronze and Silver. `npm run build` green. Banned-words + inline-style scan clean.

**Next milestone (M3)**: fan out — Novice / Perspective Matrix and Novice / Six Dimensions as the next two pages, then fill the Experienced thread.

---

## 2026-04-19 · MERCURIO + MARS subagents returned; taxonomy drafted

Both subagents finished within minutes of each other. Ten teachable patterns extracted (3 MERCURIO, 5 MARS + 2 drop-outs). Written to `docs/insights/mercurio-patterns.md` and `docs/insights/mars-patterns.md`.

Academy taxonomy finalized → `docs/academy-taxonomy.md`. Five cross-tier threads (mental model · daily practice · tool integration · decision-making · scaling + safety), each with Novice/Experienced/Expert depth. Three-question self-placement on the landing for visitors.

**Build order**:
1. Experienced / Debugging AI Loops (proof-of-pipeline)
2. Novice / Perspective Matrix (MERCURIO-port)
3. Novice / Six Dimensions (MARS-port)
4. Fan out to all threads

M1 closed. M2 beginning: build the codebase-to-course → shadcn-vue transform + the first academy page.

---

## 2026-04-19 · LUXOR-MAP subagent returned

**Finding** (big): `codebase-to-course` is standalone light-theme HTML with a hard-coded design system (warm cream #FAF7F2, Bricolage Grotesque). **Does not integrate** with Tailwind v4 + shadcn-vue.

**Decision** (C — adopted): Use `codebase-to-course` as a *content source*, not as the final renderer. Transform its HTML → JSON intermediate → shadcn-vue components. Keeps the LUXOR pedagogy engine + accuracy discipline, keeps our dark-gold brand.

**Five LUXOR skills to port** (in spirit where not directly reusable):
- `course-validator` → our pre-commit gate (merge overlapping rules)
- `course-orchestrator` → our academy build protocol (8-phase)
- `progressive-game-lab` → inform our `ProgressDots` (XP + gating)
- `curriculum-module-writer` → content generator for `content/academy/`
- `codebase-to-course` → content source for modules seeded from existing code

**Three courseware projects** to mine: `agentic-ai-course`, `ANTHROPIC-AGENT-SDK-COURSE`, `MCP-COURSE`.

**Artifact**: `docs/insights/luxor-map.md` (written + committed at `<hash-pending>`).

---

## 2026-04-19 · Pivot + M1 start

**Event**: User returned and redirected the effort away from Vercel Sandbox autonomy toward in-session academy building with LUXOR/MERCURIO/MARS integration.

**Decisions ratified**:
- Tech stack locked: Nuxt 4 + Tailwind v4 + shadcn-vue + Vercel default preset.
- Skill-level axis (Novice / Experienced / Expert) is orthogonal to pricing axis (Bronze / Silver / Gold).
- `codebase-to-course` skill is the pages-generator, not markdown-first drafting.
- Subagents used *when they earn it*, not by default. Simplicity > agent choreography.
- HANDOFF.md maintained at every milestone and before 70% context in any window.

**Artifacts now present**:
- `.agent/HANDOFF.md` — resume spec
- `.agent/DASHBOARD.md` — this file
- `docs/AUTONOMOUS-BUILD.md` — interactive-first runbook (reference)
- `docs/STRIPE-SETUP.md` — Payment Links setup (unwired)
- `CLAUDE.md` — product spec
- Full scaffolded site live at dev-learn.cetiai.co

**Next**: dispatch 3 research subagents (MERCURIO, MARS, LUXOR-MAP + codebase-to-course), draft tier taxonomy in parallel.

---

## 2026-04-19 · Shadcn-vue + Tailwind v4 baseline installed

Commit `f918cae`. 10 shadcn-vue primitives scaffolded into `app/components/ui/`. shadcn tokens mapped onto the CETI gold palette. Build green. Live site unaffected (legacy CSS classes retained during migration).

---

## 2026-04-19 · Dev subdomain live

Commit `01d3f1a`. Git → Vercel auto-deploy confirmed (~21s push to live). `dev-learn.cetiai.co` serving 200 on every route. Admin bypass verified against API. DNS record (A → `76.76.21.21`) added via GoDaddy.

---

## 2026-04-18 · Stripe Payment Links minimal-setup integration

Commit `e88d109`. Swapped from Checkout Sessions (needs secret key) to Payment Links (URL-only). `docs/STRIPE-SETUP.md` documents the 5-min dashboard flow. Admin bypass bypasses Stripe entirely for E2E testing.

---

## 2026-04-18 · Dynamic Bronze lesson route

Commit `cb3e2eb`. `/start/[slug]` renders any markdown under `content/start/` via inline frontmatter parser + `marked`. Prev/next nav, progress dots, 7 lessons fully rendering.

---

## 2026-04-18 · Repo public on ceti-ai-services org

Commit `8b34ec6`. CLAUDE.md documents Ormus as core team + "draft to X" workflow (queue Gmail drafts, never send directly).

---

## 2026-04-18 · Project initialized

Commit `dd21296`. Nuxt 4 scaffold, dark theme + gold accent, 3-tier landing, 7 Bronze lessons + 7 video scripts + starter kit (93KB zip) all produced via parallel subagents. 44 files in the initial commit.
