# HANDOFF — CETI Claude Code Academy

**Purpose**: resume from any point. Updated at every milestone and before 70% context usage.
**Last updated**: 2026-04-19
**Primary objective**: build the highest-quality Claude Code academy — tiered as Novice / Experienced / Expert — using the `codebase-to-course` skill, porting LUXOR + MERCURIO + MARS insights, and logging everything to DASHBOARD.md.

---

## Current state (snapshot)

**Repo**: https://github.com/ceti-ai-services/ceti-claude-code-course
**Live**: https://dev-learn.cetiai.co
**Vercel**: `manu-mulaveesalas-projects/ceti-claude-code-course` (auto-deploy on push to `main`)

**Stack locked** (do not change without explicit instruction):
- Nuxt 4 + Vercel default preset (serverless)
- Tailwind CSS v4 (CSS-first `@theme` config in `app/assets/css/main.css`)
- shadcn-vue via `shadcn-nuxt` (10 primitives installed in `app/components/ui/`)
- reka-ui (Radix-for-Vue), Lucide icons, `cn()` helper at `app/lib/utils.ts`
- Single gold accent `#d4a84b` on near-black; legacy CSS classes retained during migration

**What exists now**:
- Landing + /start (Bronze gate) + /silver + /gold + /thanks pages (all live)
- Dynamic `/start/[slug]` renders 7 Bronze lessons from `content/start/*.md` (full content — rendered by inline frontmatter parser + `marked`)
- `/api/enroll`, `/api/checkout/{silver,gold}` serverless routes working; admin bypass via `MERCURIOP0656`
- Bronze starter kit zipped at `public/bronze-kit.zip` (93 KB: CLAUDE.md template, 5 slash commands, cheat-sheet PDF, FAQ)
- 7 video teleprompter scripts at `content/videos/` (reference only — not web-rendered)
- shadcn-vue + Tailwind baseline installed; `components.json` configured

**Runbooks authored** (for future or abandoned-autonomous workflows):
- `docs/AUTONOMOUS-BUILD.md` — the interactive-first build runbook (shadcn-adapted)
- `docs/STRIPE-SETUP.md` — 5-min Payment Links setup (user hasn't wired yet)
- `CLAUDE.md` — product spec, tone, invariants

---

## Pivot (2026-04-19)

User returned from being away. Key direction shifts:

1. **Drop the Vercel Sandbox autonomous plan** — I execute here directly in this session.
2. **Focus**: make the academy the highest quality possible, not autonomous orchestration.
3. **Tier the academy as Novice / Experienced / Expert** — a *skill-level* axis, distinct from the Bronze/Silver/Gold *pricing* tiers.
4. **Port LUXOR insights**, especially MERCURIO + MARS patterns.
5. **Use the `codebase-to-course` skill** (global skill at `~/.claude/skills/codebase-to-course/`) to build *pages*, not just markdown.
6. **Simplicity is the ultimate sophistication** — do not overengineer. No elaborate multi-agent orchestration. Use subagents where they earn their keep, not as a matter of course.
7. **Maintain HANDOFF.md and DASHBOARD.md at every milestone.** Log everything to DASHBOARD.md for later review.
8. **Hard rule**: HANDOFF.md gets updated before 70% context usage in any window.

---

## Tier taxonomy (WIP — finalizing this milestone)

**Novice** — professional who has never used a terminal. Primary outcome: install Claude Code, do one real thing this week.

**Experienced** — professional comfortable with Claude Code basics; now needs real integration depth (MCP, skills, hooks, multi-project). Primary outcome: wire Claude Code into their actual job, ship one real automation.

**Expert** — senior operator or solo consultant treating Claude Code as core infrastructure. Primary outcome: architect team rollouts, custom MCP servers, hook-based governance, production-grade automation stacks.

Maps loosely onto pricing tiers (Bronze ≈ Novice, Silver ≈ Experienced, Gold ≈ Expert) but is **orthogonal** — a Novice can buy Gold, an Expert can browse Bronze. The skill axis drives the *content*; the pricing axis drives the *packaging*.

---

## What I'm working on right now

**Milestone M1 — Insight synthesis + taxonomy definition** (closed 2026-04-19)

Status:
- ✅ HANDOFF.md + DASHBOARD.md written + committed (`07d6be7`)
- ✅ LUXOR-MAP subagent returned → `docs/insights/luxor-map.md` committed (`083edd3`)
- ✅ MERCURIO subagent returned → `docs/insights/mercurio-patterns.md`
- ✅ MARS subagent returned → `docs/insights/mars-patterns.md`
- ✅ Novice/Experienced/Expert tier rubric → `docs/academy-taxonomy.md`

**Milestone M2 — Build proof-of-pipeline academy page** (in progress)

First page to build: **Experienced / Debugging AI Loops**. Pipeline:
1. Feed `agentic-ai-course/labs/day3/lab-09-debugging-ai-loops.html` into `codebase-to-course` via `skill-page` mode.
2. Write a small transform script that parses the output HTML into a JSON intermediate (sections, quizzes, code-english pairs, glossary, callouts).
3. Render the JSON through a new `AcademyPage.vue` that composes existing shadcn-vue primitives.
4. Route: `/academy/experienced/debugging-ai-loops`.
5. Commit + deploy + live-verify.

After proof lands, fan out:
- Novice / Perspective Matrix (MERCURIO-port)
- Novice / Six Dimensions (MARS-port)
- All Novice threads (reusing existing Bronze markdown, rendered through the new pipeline)
- Experienced + Expert thread-by-thread.

**Key architectural decision from LUXOR-MAP**:
`codebase-to-course` produces standalone HTML with its own *light* design system — it does **not** integrate with our dark-gold Tailwind+shadcn stack. Chosen path: **use codebase-to-course as a content source**, transform its HTML into a JSON intermediate, re-render through our shadcn-vue components. Preserves pedagogy + LUXOR discipline without visual mismatch.

Also from LUXOR-MAP — five LUXOR skills to port in spirit: `course-validator` (our pre-commit gate), `course-orchestrator` (8-phase academy build pipeline), `progressive-game-lab` (XP + gating adapted into `ProgressDots`), `curriculum-module-writer` (content generator), `codebase-to-course` (content source).

**Milestone M2 — Academy spine** (next)

- Draft Novice / Experienced / Expert tier rubric → `docs/academy-taxonomy.md`
- Build the codebase-to-course → shadcn-vue transform layer (small; ~100 LOC script)
- Generate the first proof-of-pipeline academy page: `/academy/experienced/debugging-ai-loops` from `agentic-ai-course/labs/day3/lab-09-debugging-ai-loops.html`

**Milestone M3 — Academy expansion**

Expand each tier with 5–7 skill-focused pages driven by the synthesized insights and MERCURIO/MARS patterns.

---

## How to resume from this file

If you are a fresh agent picking this up:

1. Read `CLAUDE.md` for product spec / invariants / banned words.
2. Read `docs/AUTONOMOUS-BUILD.md` for the interactive-first design reference (shadcn-vue, density rules, gold standard).
3. Read `.agent/DASHBOARD.md` for the full milestone log.
4. Read `docs/insights/*.md` (if present) for the MERCURIO/MARS/LUXOR synthesis.
5. Continue from the "What I'm working on right now" section above — pick up at the first incomplete step.

**Invariants (enforced):**
- Tone: warm, confident, a little dry. No hype. No emojis in body.
- Banned words list: see `CLAUDE.md`.
- Accuracy: no `--thinking`, no `--context`, no `/memory` — these don't exist.
- Density: ≤ 3–4 prose lines before a visual break.
- Commit discipline: one logical change per commit. Conventional subjects. Push to `main` (auto-deploys).

**Admin keys**:
- `MERCURIOP0656` (admin bypass, dev/test only)
- Bronze codes: `BRONZE-FRIEND-01`, `BRONZE-FRIEND-02`, `CETI-BRONZE-2026`
