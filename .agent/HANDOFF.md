# HANDOFF — CETI Claude Code Academy

**Purpose**: resume from any point. Updated at every milestone and before 70% context usage.
**Last updated**: 2026-04-19 — **PLAN V2 COMPLETE.** Bronze ships ready for cohort zero.
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

---

## Plan v2 — Bronze reset (2026-04-19, approved + executing)

**Plan file**: `/Users/manu/.claude/plans/kind-herding-matsumoto.md`
**Decisions ledger**: `docs/DECISIONS.md`
**UX research**: `docs/insights/best-in-class-ux.md` (in flight)

**Core directives** (see DECISIONS.md for full rationale):
- Scrap v1 academy content — too corporate, AI-slop tone. Start fresh.
- Voice: impactful, honest, direct, intimate. Manu's authority + empathy.
- 4 personas: Creator · Consultant · Service · Real Estate. 5th "Corporate" hidden.
- EN authoring + agent-translated Neutral LatAm Spanish (sidecar `.es.md`).
- Hero customizer (2-tap picker) as primary entry point.
- Interactive: callouts, coding animations, forced choice, game-feel, choose-your-adventure. Inspiration: bootcamp.dev.
- shadcn-vue composition only; no new deps without documented payoff.
- codebase-to-course skill may be modified/forked if needed.
- Future-hooks only (AI-assistant plug-in stubs, no assistant built yet).

**Validation gates** (MERCURIO + MARS subagents at each milestone):
- End of Step 2 (component library)
- End of Step 3 (academy landing)
- End of Step 6a (first rewritten module)
- End of Step 6 (full EN rewrite)
- End of Step 7 (ES authoring)
- Before Step 8 (cohort-zero link)

**Commit cadence**: one push per step (10 steps → ~10 deploys) so mobile GitHub view reads like a changelog.

**Resume protocol** (if session drops):
1. `docs/DECISIONS.md` (invariants + voice)
2. `/Users/manu/.claude/plans/kind-herding-matsumoto.md` (approved plan)
3. This HANDOFF.md (current state + unchecked Steps)
4. `git log --oneline -10`
5. Continue at first unchecked Step.

**Progress on Plan v2**:
- [x] Step 0: DECISIONS.md baseline (commit `6fb3888`)
- [x] Step 1: useCustomizer + types
- [x] Step 2: HeroCustomizer + PersonaCard + PersonaExample + LanguageToggle + XpOrb + ForkChoice + BossCheckpoint + useXp
- [x] Step 3: Academy landing rewrite (commit `e33a4d9`) — HeroCustomizer is the primary entry, tier grid and placement quiz removed; homepage CTA now "Start the Academy" → /academy
- [x] Step 4: Archive corporate pages (commit `9eff07f` + routeRules in `5c4c411`) — perspective-matrix.vue + six-dimensions.vue moved to `app/pages/academy/_corporate/`; nuxt.config routeRules redirect `/academy/_corporate/**` → `/academy` (307)
- [x] Step 5: Lesson loader i18n + persona (commit `1e5cb74`) — tokenizer splits markdown into block sequence (html / callout / try / recap / quiz / personaExample), persona-comment pre-filter keeps only matching `<!-- persona:X -->` regions, language routing picks `<slug>.<lang>.md` else `.md`. Live-verified on dev-learn.cetiai.co for creator + service.
- [x] Step 6: Content rewrite EN — all 7 modules in v2 voice (M01 `c32638d`, M03 `549f54e`, M05 `3a8ac9c`, M06 `5c4c411`, M07 `e1ba4b4`, M02+M04 light `76d74c1`)
- [x] **Validation gate M6**: MERCURIO `6571f73` green-light + MARS `1636237` yellow→green. Both reports at `docs/insights/validation-{mercurio,mars}-m6.md`. Three MERCURIO fixes applied (`41f575a`): M05 salon neutral EN, M06 broker last-mile, M07 soft-pedal claims. Three MARS fixes applied (`49aca60`): M03 backup forward-lift, M06 four persona "Before you open Claude" preambles (biggest abandonment-risk fix — Service + Real Estate were assuming CSV/WhatsApp exports), M07 zero-code week-loop TryThis (SMS/calendar reminders).
- [x] Step 7: ES authoring (all 7) — sidecar `.es.md` per module, neutral LatAm voice, persona slots authored (salon picks Medellín, broker picks CDMX), Spotlight→Foco localization acknowledged, banned-words clean. Commits: M01 `e2ff8d1`, M02 `24d8fdf`, M03 `5710956`, M04 `a1fa6c7`, M05 `17006e6`, M06 `0ec6e7b`, M07 `cf24d55`.
- [ ] Step 8: Smoke + cohort link ← **next**

**Commit count in Plan v2 window**: ~20 pushes to main (changelog-shaped for mobile view).

**Live state snapshot** (post-49aca60):
- `/academy` · `/start` · `/start/<01..07>?persona=<any>` all HTTP 200
- Persona-rotated content rendering correctly ("You know the move" + "caption" on creator, "WhatsApp" on service)
- Banned words: zero hits across `content/start/*.md` + academy pages
- Build: green
- MERCURIO verdict: GREEN-LIGHT · MARS verdict: GREEN after fixes

**Resume protocol if session drops** (updated):
1. Read `docs/DECISIONS.md` — voice + invariants
2. Read this HANDOFF.md — current progress
3. `git log --oneline -15` — recent commits
4. Check if ES subagent committed all 7 `.es.md` files at `content/start/*.es.md`
5. If ES incomplete: dispatch a fresh translator with the prompt style from Plan v2
6. If ES complete: run Step 8 smoke matrix (4 personas × 2 langs × top modules = 24 URLs) + send cohort-zero link

---

## Historical — Plan v1 work (superseded, artifacts preserved)

**Milestone M2 — Build proof-of-pipeline academy page** (proof page built 2026-04-19)

Landed:
- Six course components under `app/components/course/`: `ModuleHero`, `Callout`, `Quiz`, `IxCollapse`, `TryThis`, `Recap`. All compose shadcn-vue primitives; no new deps.
- Academy landing at `/academy` with 3-step self-placement + tier cards + cross-tier thread table.
- First page at `/academy/experienced/debugging-ai-loops` — adapted from LUXOR lab-03 + lab-08 substance (the originally-cited lab-09 file does not exist).
- Nav now includes "Academy" between Bronze and Silver.
- Skipped the codebase-to-course → JSON intermediate for this pass. The components are direct-authored; the transform pipeline can come back in later if we want to bulk-port lab HTML. For single high-quality pages, direct authoring beat the translation layer on effort-to-quality.

Route: `/academy/experienced/debugging-ai-loops`. Commit + push + live-verify done in same session.

After proof lands, fan out:
- Novice / Perspective Matrix (MERCURIO-port)
- Novice / Six Dimensions (MARS-port)
- All Novice threads (reusing existing Bronze markdown, rendered through the new pipeline)
- Experienced + Expert thread-by-thread.

**Key architectural decision from LUXOR-MAP**:
`codebase-to-course` produces standalone HTML with its own *light* design system — it does **not** integrate with our dark-gold Tailwind+shadcn stack. Chosen path: **use codebase-to-course as a content source**, transform its HTML into a JSON intermediate, re-render through our shadcn-vue components. Preserves pedagogy + LUXOR discipline without visual mismatch.

Also from LUXOR-MAP — five LUXOR skills to port in spirit: `course-validator` (our pre-commit gate), `course-orchestrator` (8-phase academy build pipeline), `progressive-game-lab` (XP + gating adapted into `ProgressDots`), `curriculum-module-writer` (content generator), `codebase-to-course` (content source).

**Milestone M3 — Novice tier opened** (closed 2026-04-19)

Landed:
- `app/pages/academy/novice/perspective-matrix.vue` — MERCURIO Pattern 1 ported for non-developers. 3 quizzes, core-idea + tip + warning Callouts, IxCollapse deep-dive into a `CLAUDE.md` one-liner workflow, TryThis on a real decision, Recap. Links forward to Six Dimensions, back to Academy.
- `app/pages/academy/novice/six-dimensions.vue` — MARS Pattern 1 ported. Six-item styled `<dl>` (no new component) for the dimension list, 3 quizzes each surfacing the under-examined dimension, IxCollapse for a `/six-dimensions` slash command idea, TryThis on a stalled project, Recap.
- `app/pages/academy/index.vue` — Novice tier card now links to `/academy/novice/perspective-matrix`.
- `.agent/DASHBOARD.md` + this file updated.

Build green, banned-words clean, no new deps.

**Milestone M4 — Fan out Experienced tier** (next)

The six existing components (`ModuleHero`, `Callout`, `Quiz`, `IxCollapse`, `TryThis`, `Recap`) can carry 8–12 more pages if paired with good source content. Candidate pages:
- `/academy/experienced/mcp-wiring` — how to connect one of their actual tools (Gmail, Calendar, Notion)
- `/academy/experienced/hooks-basics` — pre-tool-use hooks, pre-commit gates
- `/academy/experienced/skills-library` — building a reusable skill, the `.claude/skills/` pattern
- `/academy/experienced/multi-project-setup` — project-level `CLAUDE.md`, per-project slash commands

Source material can be adapted from the existing `content/silver/*` markdown once it exists, or drafted fresh from the CLAUDE.md product vision. Keep density discipline: ≤ 600–700 visible prose words per page.

Fill the remaining Novice threads after M4, then Expert.

Possible follow-ups:
- Add `StepWalk`, `ClickCards`, `HeroCanvas`, `CodeBlock`, `LessonNav`, `ProgressDots`, `IxInstruct`, `ObjectiveChips` as the page library grows (see AUTONOMOUS-BUILD Package 1 for the full 14-component list).
- Per-tier index pages (`/academy/novice`, `/academy/experienced`, `/academy/expert`) once there are 3+ pages per tier.

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
