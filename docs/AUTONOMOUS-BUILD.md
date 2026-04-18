# Autonomous Build Runbook — CETI Claude Code Course

**One-line mission**: transform a working-but-plain Nuxt site into an **interactive, visual, motion-rich learning experience** that matches the gold-standard `agentic-ai-course` + `raven-cargo-course` at `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`, while preserving the CETI dark/gold identity and the non-developer audience.

**How to use this file**: hand it to a coding agent (Vercel Sandbox, Claude Code, Codex — anything with repo access + shell + network). The agent reads this file, runs the state-detection step, then executes work packages in order. When context pressure hits, it writes `.agent/HANDOFF.md` and stops at the nearest package boundary. A fresh agent resumes cleanly.

This is a **meta-prompt**: it tells the agent *how to think* (quality gates, self-correction, evidence over assertion) not just *what to write*.

---

## The single most important rule

> **The markdown we have is source material, not the end product.**

The existing `content/start/*.md` lessons are the raw writing. They are verbose on purpose. Your job is to **transform them into interactive HTML/Vue lessons** where prose is broken up by components every 3–4 lines, interactive elements carry the pedagogy, and motion reinforces meaning.

If you find yourself writing a 500-word paragraph in a `.vue` file, stop. That paragraph belongs in source markdown, and its ideas belong in a component — a quiz, a collapsible detail, a step-walkthrough, a callout, a visualization.

---

## Invocation

Paste this block into a fresh agent session inside the cloned repo:

```
You are an autonomous coding agent executing the runbook at docs/AUTONOMOUS-BUILD.md.

STEP 0: Read these three files in full, in this order:
  1. docs/AUTONOMOUS-BUILD.md  (this runbook — the protocol)
  2. CLAUDE.md                 (product spec, tone, invariants)
  3. docs/GOLD-STANDARD.md     (design reference, if present; otherwise skip to step 1
                                — it'll be created in Package 0)

STEP 1: Run the state-detection step in section "State detection" below. Write
  .agent/state.md and commit it.

STEP 2: Identify the first PARTIAL or NOT_STARTED package in your state report
  and begin the per-package protocol.

Do not ask clarifying questions. Do not stop at a file boundary unless it's also
a package boundary. When context gets tight, write .agent/HANDOFF.md at the
nearest package boundary and stop.

Begin now with STEP 0.
```

The invocation assumes:
- Repo cloned, working dir is repo root
- `git config user.email` + `user.name` set
- Vercel CLI logged in as the account owning `ceti-claude-code-course`
- Network access (npm, git push, curl)

---

## Invariants (non-negotiable)

### Audience + tone
- **Audience**: non-developers — marketing, ops, legal, founders. No assumed CLI knowledge. Define any term on first use in half a sentence.
- **Tone**: warm, confident, a little dry. No hype. No emojis in body copy (tier medals `🥉🥈🥇` in eyebrow headers are the only exception; everywhere else use Lucide SVG icons).
- **Banned words** (automatic reject): `revolutionary`, `unlock`, `game-changing`, `next-level`, `10x`, `seamless`, `cutting-edge`, `synergy`, verb-form `leverage`, `dive in`, `let's get started`, `buckle up`, `don't worry`.

### Density (gold-standard rule)
- **Maximum 3–4 lines of consecutive prose** before a visual break (callout, quiz, component, diagram, collapsible detail). If a paragraph is longer, either split it or wrap the overflow in `<details class="ix-collapse">`.
- **Interactive elements per page**: target 4–6 per lesson. Fewer than 3 = it's an article, not a lesson.
- **Words per viewport**: target 150–300 visible words. Collapsed content can be denser.

### Accuracy (zero tolerance)
- No `--thinking` flag. No `--context` flag. No `/memory` slash command. None of these exist.
- `CLAUDE.md` is read at session start — never invoked as a slash command.
- `settings.json` shape is `{"permissions": {"allow": [...], "deny": [...]}}`. Don't invent keys.
- Three MCP primitives: Tools, Resources, Prompts.
- Remote MCP uses Streamable HTTP. SSE was deprecated 2026-03-26.
- Install is `npm install -g @anthropic-ai/claude-code`. Launch is `claude`.
- Permission modes: `default`, `acceptEdits`, `plan`.

### Design system (extended from reference)
- **Palette**: `--bg: #0a0a0b` · `--surface: #121214` · `--raised: #1a1a1d` · `--text: #f5f5f4` · `--muted: #a1a1a8` · `--dim: #6b6b72` · `--gold: #d4a84b` (single accent). Do not introduce additional accent colors.
- **Typography**: Inter 400/500/600/700/800 (body) · JetBrains Mono 400/500 (code/prices) · Oswald 600/700 uppercase for display eyebrows and module numbers (letter-spacing `0.04em`).
- **Motion curve**: `cubic-bezier(0.22, 1, 0.36, 1)` for every transition. Default duration `0.2s` for UI, `0.6s` for orchestrated reveals.
- **Radius**: `--radius: 10px` · `--radius-lg: 14px` · `--radius-xl: 20px` for hero-scale cards.
- **Reduced motion**: every animation respects `prefers-reduced-motion: reduce`. Canvas animation falls back to a static render. No exceptions.

### Commit + deploy discipline
- One commit per verified package. Conventional commit subjects (`feat(bronze):`, `feat(ui):`, `fix(accuracy):`, etc.).
- Never batch unrelated changes. If your subject line needs "and", split the commit.
- Push after every commit. Vercel auto-deploys from `main` within ~30s.
- Before marking a package DONE: run `npm run build`, wait for Vercel deploy Ready, `curl` the live URL, confirm HTTP 200 + content presence.

### What you must NOT do
- Do not rewrite existing Bronze markdown lessons — they are the source-of-truth prose. You extend, re-format into components, and layer interactivity on top. Word count may shrink because content moves into components, not because it's deleted.
- Do not change pricing ($499 · $2,500 · $1,000/mo retainer).
- Do not swap Payment Links for Checkout Sessions.
- Do not change the Nuxt preset (must remain Vercel-default for serverless API routes).
- Do not push to any branch other than `main`.
- Do not commit `.env` (gitignored — verify if you touch ignore rules).
- Do not send any external notification (email, Slack, webhook).

---

## State detection (run this first, every session)

Before touching code, write `.agent/state.md`:

```markdown
# State Report — <YYYY-MM-DD HH:MM UTC>

## Git
- Branch: <branch>
- Clean? <yes/no>
- Last 5 commits:
  <git log --oneline -5>

## Existing artifacts
- app/components/ : <list of .vue files — is there a component library yet?>
- app/composables/: <list>
- content/start/  : <list + word counts>
- content/silver/ : <list, "empty" if missing>
- content/gold/   : <list, "empty" if missing>
- public/takeaways/, public/silver-starter-kit.zip, etc.: <presence check>

## Live deploy
- Top Vercel deployment: <npx vercel ls ceti-claude-code-course --scope manu-mulaveesalas-projects | head -3>
- curl https://dev-learn.cetiai.co/        : <HTTP status>
- curl https://dev-learn.cetiai.co/start/01-mental-model : <HTTP status + quick content grep>

## Package progress (DONE / PARTIAL / NOT_STARTED)
- [ ] Package 0: Gold-standard study + design tokens extracted
- [ ] Package 1: Component library (ModuleHero, Callout, Quiz, Details, StepWalk, CodeBlock, HeroCanvas)
- [ ] Package 2: Landing redesign — canvas hero + trust strip + reworked tier grid
- [ ] Package 3: Bronze 01 — reference interactive rebuild (the "golden" lesson)
- [ ] Package 4: Bronze 02–07 — apply the pattern to remaining lessons
- [ ] Package 5: Silver week-1 lessons + dynamic route mirroring Bronze
- [ ] Package 6: Silver weeks 2/3/4 lessons (may split if time-bound)
- [ ] Package 7: Gold playbook (lighter interactivity; internal + client-facing)
- [ ] Package 8: Industry starter kits (marketing / ops / legal / founder)
- [ ] Package 9: SEO + social (OG image, sitemap, trust strip verify, robots)

## Current package
<name + first concrete file you'll touch>
```

Commit: `chore(agent): state report <timestamp>`. Push. Then advance.

---

## Work packages

### Package 0 — Gold-standard study + design extraction *(~30 min)*

**Goal**: Produce `docs/GOLD-STANDARD.md` — a concrete design reference that every later package cites. This is your spec. If a later package feels ambiguous, re-read this file.

**Steps**:
1. Open these reference files (read, don't execute — they live in a sibling project):
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/index.html`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/raven-cargo-course/index.html`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/raven-cargo-course/module-viewer.html`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-01-paradigm-shift.html`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-02-first-agent.html`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/lab-framework/core.css`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/lab-framework/core.js`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/raven-cargo-course/assets/raven-course.css`
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/.claude/docs/CODING-ELEMENTS-SPEC.md` (if it exists)
   - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/.claude/docs/CONTENT-SPEC.md` (if it exists)

2. Write `docs/GOLD-STANDARD.md` with these exact sections:
   - **1. Visual signature** — the hero canvas, the single most-distinctive element.
   - **2. Component catalog** — every reusable component that appears in labs. For each: name, HTML shape, trigger + animation behavior, when to use.
   - **3. Motion library** — curve, durations, what moves, what stays still, reduced-motion fallbacks.
   - **4. Density rhythm** — words-per-viewport targets, collapse rules, interactive-per-lesson targets.
   - **5. Pedagogy patterns** — predict-reveal, scenario-quiz, step-walkthrough — and when to use each.
   - **6. Anti-patterns** — a numbered list of what NEVER to do.
   - **7. Non-dev adaptation notes** — which gold-standard patterns carry directly to our non-dev audience, which need simplification, which to drop (e.g., terminal simulators).

3. Commit: `docs: gold-standard design reference`.

**Acceptance**:
- `docs/GOLD-STANDARD.md` exists, ≥ 500 lines, with file:line citations back to the reference repo.
- It contains at least 8 components in the catalog with HTML shape + animation notes.
- It names at least 10 anti-patterns.

---

### Package 1 — Component library *(~90 min)*

**Goal**: Build the Vue component set that every later lesson will compose. No lesson content in this package — just reusable pieces.

**Files to create under `app/components/`**:

| Component | Purpose | Must support |
|-----------|---------|--------------|
| `HeroCanvas.vue` | Animated network canvas for the landing hero. Nodes = verbs ("read", "edit", "run"). Edges drift sage-gold packets along them. Respects `prefers-reduced-motion`. | Props: `density`, `accent`. Fallback: static SVG. |
| `ModuleHero.vue` | Per-lesson hero with module number (Oswald uppercase), title, 3–5 objective chips, subtle floating particles. | Props: `moduleNum`, `title`, `time`, `objectives` (array of strings). |
| `ObjectiveChips.vue` | Horizontal chip row. Each chip has a Lucide icon + short label. | Props: `items` (array of `{icon, label}`). |
| `Callout.vue` | Colored-border info block with 7 variants. | Props: `variant` ∈ `{core-idea, tip, warning, key-concept, approval, definition, stakes}`, `title?`. Slot: body. |
| `Quiz.vue` | Multiple-choice quiz. Click-to-reveal per option. Shows check/x icon + explanation on select. No scores across questions — pure comprehension check. | Props: `prompt`, `options` (array of `{label, correct, explain}`). |
| `StepWalk.vue` | Step-by-step walkthrough. Manual advance (left/right arrow keys + on-screen buttons). Progress pills at top. | Props: `steps` (array of `{title, body (slot), image?}`). |
| `ClickCards.vue` | Grid of cards; clicking flips to show hidden detail. Useful for "three misconceptions" or "five archetypes". | Props: `cards` (array of `{front, back}`). |
| `CodeBlock.vue` | Syntax-highlighted block with copy button, optional filename badge, optional line-number gutter. | Props: `lang`, `filename?`, `showLineNumbers?`. Slot: code. |
| `IxInstruct.vue` | Italic, muted instruction line with a right-pointing triangle prefix. Goes immediately before every interactive element. | Slot: the instruction sentence. |
| `IxCollapse.vue` | Styled `<details>` wrapper. Gold disclosure triangle. Smooth open (max-height + opacity). | Props: `summary`. Slot: body. |
| `TryThis.vue` | End-of-lesson exercise block. Card with gold left border, clock icon, estimated time. | Props: `time`. Slot: exercise body. |
| `Recap.vue` | "What you just did" block at end of lesson. | Slot: recap copy. |
| `LessonNav.vue` | Prev / next buttons at the bottom with module numbers and titles. | Props: `prev?`, `next?` (each `{slug, moduleNum, title}`). |
| `ProgressDots.vue` | Dot row for the 7 Bronze modules. States: locked / active / done, driven by `useProgress`. | Props: `current` (slug). |

**Also create**:
- `app/composables/useProgress.ts` — `localStorage`-backed state: `markComplete(slug)`, `isComplete(slug)`, `completedCount` reactive.
- `app/assets/css/tokens.css` — spin out tokens from `main.css` so components can `@import` them without circularity. Keep `main.css` for global resets + typography.
- `app/plugins/lucide.client.ts` — register Lucide icons used by the components (at minimum: `Sparkles`, `ChevronRight`, `Check`, `X`, `Copy`, `Clock`, `ArrowRight`, `CircleCheck`, `CircleAlert`, `Info`).

**Styling convention** for every component:
- Scoped `<style>` with `:deep()` only where truly needed.
- All colors via CSS custom properties (no hex literals inline).
- All transitions use `cubic-bezier(0.22, 1, 0.36, 1)`.
- Every interactive element has a visible focus state (gold outline, 2px offset).

**Acceptance**:
- `npm run build` compiles all 14 components with no warnings.
- Create `app/pages/_components-demo.vue` (gate behind `?preview=1` query so it's not indexed) that renders one instance of every component so you can visually QA them on the live URL.
- Hit `https://dev-learn.cetiai.co/_components-demo?preview=1` — all components render and are interactive.
- Check `prefers-reduced-motion` manually via devtools — canvas goes static, animations are disabled.

**Commit**: `feat(ui): component library — hero canvas, module hero, quiz, callout, 14 total`

---

### Package 2 — Landing redesign *(~45 min)*

**Goal**: Replace the text-heavy landing with a motion-led hero + compact tier grid that matches the gold standard's density.

**Files to modify**:
- `app/pages/index.vue` — complete rebuild. Structure:
  1. `<HeroCanvas />` full-bleed, ~70vh
  2. Overlaid hero copy (≤ 30 words total across title + subtitle)
  3. Single CTA row: "Start with Bronze" (primary gold) · "See tiers below ↓" (ghost)
  4. Trust strip: "5,000+ trained · 100+ organizations · 20+ countries" (real CETI stats — pulled from parent CLAUDE.md)
  5. Three-tier compact cards with Lucide icons, not emojis. Silver card has `card-featured` state.
  6. "What you'll learn" — 3 `ClickCards` (non-dev · your tools · in your terminal).
  7. FAQ — 4 `IxCollapse` entries.
  8. Footer CTA: email capture for "notify me when live".

**Density target**: visible words on first viewport load ≤ 200. Canvas is the signature.

**Acceptance**:
- Homepage has ≤ 200 words above the tier grid.
- Canvas renders and animates at 60fps on a mid-range laptop; reduced-motion yields a static SVG variant.
- All three tier cards link correctly; Silver shows "Most Popular".
- `curl https://dev-learn.cetiai.co/` returns 200 with the canvas markup present.

**Commit**: `feat(landing): canvas hero, trust strip, compact tier cards`

---

### Package 3 — Bronze 01: the reference interactive lesson *(~60 min)*

**Goal**: Rebuild `/start/01-mental-model` as the *golden example* — every other lesson in later packages gets reformatted to match its pattern. Nail this one before touching 02–07.

**Structure** (this is prescriptive — follow it):
1. `<ModuleHero moduleNum="01" title="What Claude Code actually is" time="12 min" :objectives="...">` — 4 objective chips: "See the shift", "Meet the colleague", "Know what it isn't", "Pick a use case"
2. `<IxInstruct>Start here.</IxInstruct>` + one ≤ 30-word framing sentence
3. **Interactive 1 — `<ClickCards>`**: 3 cards front-side showing "Browser chatbot", "IDE plugin", "Terminal assistant" — click-to-reveal back side with the key distinction. Pedagogy: *predict the difference before reading*.
4. `<Callout variant="core-idea">` with the "careful junior colleague" analogy (one paragraph, ≤ 4 lines).
5. **Interactive 2 — `<StepWalk>` with 3 steps**: "Reads first", "Asks before touching", "Explains the plan". Each step has a short caption + a minimal visual (use `<CodeBlock>` stubs for illustrative terminal snippets).
6. `<IxCollapse summary="Why the terminal, of all places?">` — the 2–3 paragraphs that justify the choice. Collapsed by default.
7. **Interactive 3 — `<Quiz>` with 3 questions** testing mental model: vending-machine vs colleague, what Claude Code IS (terminal-native assistant), why the folder scope matters.
8. `<Recap>` — one paragraph, ≤ 4 lines, naming the two ideas the reader should keep.
9. `<TryThis time="5 min">` — the concrete homework from the source markdown (write down one 5-file weekly task).
10. `<LessonNav :next="{...}" />` pointing to Module 02.
11. `<ProgressDots current="01-mental-model" />` — called once at top, `useProgress().markComplete('01-mental-model')` called on `onMounted`.

**Where the source markdown content goes**:
- The strong ideas become Callouts or `<StepWalk>` step captions.
- The longer justifications go into `<IxCollapse>` blocks.
- Examples become `<ClickCards>` predict-reveal pairs.
- Homework goes into `<TryThis>`.
- Anything that doesn't fit one of the above gets cut. The lesson should feel tight.

**Density check**: after drafting, count visible prose words (not inside `<IxCollapse>` or `<ClickCards back>`). Target 400–700. If over 800, you missed the density rule.

**File**: replace the markdown-rendering fallback in `app/pages/start/[slug].vue` — for any slug that has a hand-authored `.vue` page under `app/pages/start/lessons/<slug>.vue`, use that; otherwise fall back to the existing markdown renderer (so Modules 02–07 still work until Package 4 rebuilds them).

**Acceptance**:
- Live URL `/start/01-mental-model` renders the new interactive version with all 3 interactives working.
- Quiz answers show correct/incorrect with explanation.
- StepWalk advances on arrow key + on-screen buttons.
- ClickCards flip smoothly.
- `<ProgressDots>` marks 01 complete after 10s of view (or on route leave).
- Prose word count under the density target.

**Commit**: `feat(bronze): module 01 interactive rebuild — reference pattern`

---

### Package 4 — Bronze 02–07: apply the pattern *(~90 min, or split across two sessions)*

**Goal**: Convert the remaining 6 Bronze lessons into the same interactive pattern. Each lesson must have: `ModuleHero`, ≥ 3 interactive elements, ≥ 2 callouts, a Quiz, a Recap, a TryThis.

**Per-lesson playbook** — for each of `02-install`, `03-first-session`, `04-file-permissions`, `05-claude-md`, `06-real-use-case`, `07-next-steps`:

1. Read the source `content/start/<slug>.md` thoroughly.
2. Extract the 3 strongest ideas — these become the spine (Callouts or StepWalk steps).
3. Identify what's a good predict-reveal — this becomes `ClickCards` or `Quiz`.
4. Identify reference material — collapse into `IxCollapse`.
5. Write `app/pages/start/lessons/<slug>.vue` using the same structure as Module 01. Aim for visual variety across lessons (don't mechanically repeat identical interactive sequences).
6. Per-lesson interactive highlights:
   - **02 Install** — a tabbed `StepWalk` for Mac / Windows / Linux install flows. Animated terminal block typing out `npm install -g @anthropic-ai/claude-code` (CSS typing animation, not a video).
   - **03 First session** — a mock terminal that the reader can "talk to" via predetermined prompts (click a prompt chip → mock response animates in). Not real Claude — a scripted demo.
   - **04 File permissions** — a Quiz modeling approve/deny decisions. Plus a `ClickCards` showing 3 approval scenarios.
   - **05 CLAUDE.md** — a `StepWalk` that builds a CLAUDE.md live, section by section, in a right-hand panel as the user advances.
   - **06 Real use case** — choose-your-adventure: user picks an archetype (report · organize · email), lesson tailors examples accordingly. Implement as a lesson-level state (localStorage) influencing component props.
   - **07 Next steps** — less text, more showcase: what Silver gets you, what Gold gets you, testimonial placeholders (mark `<!-- TESTIMONIAL PENDING -->`).

**Commit per lesson** (NOT per batch). Six commits in this package, shape:
- `feat(bronze): module 02 interactive — install walkthrough`
- `feat(bronze): module 03 interactive — mock first session`
- etc.

**Acceptance** per lesson:
- Live URL returns 200 with interactive elements in the HTML.
- Density check passes (≤ 700 visible prose words).
- No banned words. No accuracy violations.
- `useProgress` marks complete.

---

### Package 5 — Silver week 1 + dynamic silver route *(~60 min)*

**Goal**: Mirror the Bronze pattern for Silver Week 1 so students get the same density/interactivity discipline.

**Files**:
- `app/pages/silver/[...slug].vue` — catch-all that handles `silver/week-01`, `silver/week-01/01-audit-your-week`, etc. Same pattern as `app/pages/start/[slug].vue`.
- `app/pages/silver/lessons/week-01-overview.vue` — the week overview (hero + agenda + deliverable).
- `app/pages/silver/lessons/week-01-01-audit.vue`, `-02-picking-targets.vue`, `-03-first-personal-claude-md.vue` — three lessons.
- Each uses the same component set as Bronze.
- Reading source: `content/silver/week-01/*.md` — if missing, draft from scratch matching the tone (use Bronze 01's source markdown as a reference for length/voice).
- `app/pages/silver.vue` — add an "Enrolled already? Go to Week 1 →" button at the top when `?admin=MERCURIOP0656` is in the URL.

**Acceptance**:
- `/silver/week-01` renders the overview.
- Each of the 3 Week 1 lessons has: hero, 3+ interactives, quiz, recap, try-this.
- `useProgress` tracks Silver lessons under a separate namespace (`silver:week-01:01-audit` etc.) so Bronze and Silver progress don't collide.

**Commit**: `feat(silver): week 1 interactive — audit, targets, personal CLAUDE.md`

---

### Package 6 — Silver weeks 2, 3, 4 *(~75 min — split if needed)*

Same pattern as Package 5, extended across Weeks 2, 3, 4. **If context pressure hits mid-package, split commits per-week** — each week is already a natural checkpoint.

- **Week 2** — Skills and slash commands. Centerpiece interactive: a live skill-builder widget that takes the reader's role + one sentence of intent and outputs a drafted slash command (client-side template logic, not an API call). Also create the `silver-starter-kit/.claude/commands/` directory with 20 real commands and zip to `public/silver-starter-kit.zip`.
- **Week 3** — MCP wiring. One lesson per tool: Gmail, Calendar, Notion, Databases, Security. Each uses `StepWalk` for the setup steps. `ClickCards` for the 3 most common setup errors per tool. Accuracy is critical — re-verify Streamable HTTP, 3 primitives, real server names.
- **Week 4** — Hooks, multi-project, team safety, capstone. Capstone lesson includes 4 `ClickCards` templates (report-generator, inbox-triager, meeting-summarizer, doc-organizer). Each card back has a "download template" button pointing to `public/silver-capstones/<slug>.zip`.

**Commits** (one per week minimum): `feat(silver): week 2 ...`, `feat(silver): week 3 ...`, `feat(silver): week 4 + capstone templates`.

---

### Package 7 — Gold playbook *(~45 min)*

**Goal**: Gold content is lighter on gamified interactivity (audience is senior buyers / instructors) but still visually rich. More like a beautifully-designed playbook than a course.

**Files**:
- `app/pages/gold/index.vue` — already exists, extend with a "See the playbook →" link for authenticated visitors (admin bypass).
- `content/gold/` — 7 markdown sources (overview, pre-engagement, 4 sessions, retainer). Render via a simplified `[slug].vue` that uses the same markdown pipeline as Bronze fallback + selected components (Callout, IxCollapse, CodeBlock, TryThis).
- Gold uses less Quiz, less StepWalk — more Callouts (for stakes, approval moments, definitions) and more IxCollapse (for long reference matrices like the 6-role CLAUDE.md template matrix in session 02).
- Session 3 (MCP wiring) reuses the same Silver Week 3 content but presented as a consultant-facing recipe card set instead of a student lesson.

**Accuracy reminder**: Gold session pricing matches site exactly ($2,500, 5/quarter cap, $1,000/mo retainer). Cross-check before commit.

**Commit**: `feat(gold): playbook — pre-engagement, 4 sessions, retainer cadence`

---

### Package 8 — Industry starter kits *(~45 min)*

**Goal**: Four variants of the Bronze starter kit, one per archetype. Each variant lives under `bronze-kit-src/industries/<archetype>/` with a tailored CLAUDE.md + 5 slash commands.

- `industries/marketing/` — commands: `campaign-brief`, `asset-audit`, `social-post-batch`, `weekly-metrics`, `competitor-scan`.
- `industries/ops/` — `inbox-triage`, `status-update`, `expense-categorize`, `vendor-compare`, `onboarding-pack`.
- `industries/legal/` — `contract-summary`, `clause-compare`, `redline-prep`, `matter-digest`, `precedent-search`.
- `industries/founder/` — `investor-update`, `metric-dashboard`, `hiring-jd`, `one-on-one-prep`, `board-memo`.

Each CLAUDE.md is a worked example for that archetype (pick a realistic persona, fill everything in — no TODOs).

Rebuild the zip after adding:
```bash
cd bronze-kit-src && zip -r ../public/bronze-kit.zip . -x "*.DS_Store"
```

Also add a small `<ClickCards>` on `/start` below the module list: "Download a starter kit for your role" — 4 cards (marketing/ops/legal/founder) linking to `/bronze-kit.zip#industries/<archetype>/` (document path fragment isn't directly honored but acts as UX hint).

**Commit**: `feat(kit): industry starter kits — marketing, ops, legal, founder`

---

### Package 9 — SEO + social + QA pass *(~30 min)*

**Goal**: Make the site shareable and double-check nothing regressed.

- `public/og-image.png` — 1200×630 social card. Generate via a small Node script (`scripts/generate-og.mjs`) using `canvas` or `@napi-rs/canvas`. Design: near-black background, gold `CETI.AI` wordmark top-left, "Claude Code Course" 64px center, "learn.cetiai.co" 18px bottom. Commit both the script and the generated PNG.
- `app/app.vue` — extend `useHead` with OG + Twitter meta tags, referencing the OG image and per-route titles.
- `public/robots.txt` + `public/sitemap.xml`.
- Add Lucide trust strip to landing if missing (from Package 2).
- Run the full QA matrix:

  ```bash
  for path in "/" "/start" "/start/01-mental-model" "/start/07-next-steps" \
              "/silver" "/silver/week-01" "/gold" "/thanks"; do
    code=$(curl -sS -o /dev/null -w "%{http_code}" "https://dev-learn.cetiai.co${path}")
    echo "$code  $path"
  done
  ```
  All must be 200.

- Grep the whole `app/` and `content/` for banned words + accuracy violations. Fix anything that snuck in.

**Commit**: `feat(seo): og image + social meta + sitemap + qa pass`

---

## Per-package protocol

Every package follows six steps. Do not shortcut.

1. **Plan** — write `.agent/plans/<n>-<slug>.md`:
   - Files to create / modify (exact paths)
   - First acceptance criterion you will verify
   - Known unknowns
2. **Build** — create / modify all files for this package.
3. **Local verify**:
   - `npm run build` must exit 0.
   - `ls` new files — count matches the package.
   - `grep -rE "(--thinking|--context|/memory|revolutionary|unlock|game-changing|10x|seamless|cutting-edge)" app/ content/ docs/` must return zero.
4. **Commit + push** — one conventional commit, `git push origin main`.
5. **Wait for deploy** — poll `npx vercel ls ceti-claude-code-course --scope manu-mulaveesalas-projects | head -3` until the top deploy shows `Ready`. If `Error`, fetch logs (`vercel inspect --logs <url>`), fix, commit, push.
6. **Live verify**:
   - `curl -sS -o /dev/null -w "%{http_code}\n" <live url>` → 200.
   - Grep the returned HTML for a unique string from the new content (not just the shell).
   - Update `.agent/state.md` — mark the package DONE, set the next one as current.

If any step fails: stop. Document the failure in `.agent/state.md`. Fix the failing step only. Do not skip ahead.

---

## Quality gates (run before every commit)

All six must pass.

1. **Tone** — no banned words. No emojis in body copy.
2. **Accuracy** — no `--thinking`, no `--context`, no `/memory`, no invented settings keys, no 4th MCP primitive.
3. **Density** — no > 4-line prose block in a `.vue` component. Measure with the eyeball ruler: if the viewport shows all prose and no component, it's too dense.
4. **Structure** — every lesson has `ModuleHero`, ≥ 3 interactives, ≥ 1 `Quiz`, `Recap`, `TryThis`, `LessonNav`.
5. **Motion** — every transition uses `cubic-bezier(0.22, 1, 0.36, 1)`. No `ease`, no `linear` unless explicitly justified.
6. **Build** — `npm run build` exits 0.

Fix failures before committing. Do not commit "I'll fix it next time" work.

---

## HANDOFF.md protocol

You have finite context. When you feel it: **stop at a package boundary (never mid-file)**, write `.agent/HANDOFF.md`:

```markdown
# Handoff — <timestamp>

## Why I stopped
<context pressure / time / blocker>

## Last completed package
<number + commit hash + one-line summary>

## Current package (partial, if any)
- Files I was editing: <paths>
- Finished: <bullet list of concrete things>
- NOT done: <bullet list — brutally specific>
- The next concrete step: <single sentence — e.g., "Write app/components/HeroCanvas.vue, ~180 lines, canvas network with 7 verb-nodes. See docs/GOLD-STANDARD.md section 1 for the reference.">

## Gotchas
<anything non-obvious the next agent needs to know>

## How to resume
1. Read docs/AUTONOMOUS-BUILD.md + CLAUDE.md + docs/GOLD-STANDARD.md.
2. Read .agent/state.md, then this HANDOFF.md.
3. Resume at "next concrete step" above. Skip re-running state detection until you hit the next package boundary.
```

Commit `chore(agent): handoff <timestamp>`, push, stop.

### Signals you are past the useful point (stop earlier)
- You can't recall the last two commits without looking.
- Your plan file repeats decisions you already documented.
- You're re-reading the invariants to remember them.

When these start happening, you are net-negative. HANDOFF and stop.

---

## Failure modes + recovery

- **Vercel build fails** → `vercel inspect --logs <latest-deploy>`. Most common: a typo in a `.vue` file. Fix, commit, push.
- **Live URL 500** → `vercel logs <deploy-url>`. Usually unhandled promise in a server route.
- **Accuracy violation in already-shipped content** → new `fix(accuracy): ...` commit. Now, not later.
- **`npm install` fails** → try `--cache /tmp/npm-cache`. If still failing, note in state.md, try `npm ci`.
- **Push rejected (non-fast-forward)** → never force-push. `git pull --rebase`, resolve conflicts, push.
- **Component renders blank** → check SSR vs client mismatch. Add `<ClientOnly>` wrapper if the component relies on `window`/`localStorage`. For canvas, always `<ClientOnly>`.
- **Truly stuck** → commit `wip(<scope>): <description> — blocked by <specific unknown>`, document in state.md, advance.

---

## Completion criteria

You are done when ONE of:

1. **All 9 packages DONE** → write `.agent/COMPLETE.md` summarizing the run (commits made, live URL, outstanding concerns).
2. **Context pressure** → write `.agent/HANDOFF.md` at nearest package boundary.
3. **Hard blocker needing human** → write `.agent/BLOCKED.md` with the specific question.

Silence is the only real failure mode. Always leave an artifact.

---

## Appendix A — Quick reference

| Item | Value |
|------|-------|
| Live (dev) | https://dev-learn.cetiai.co |
| Repo | https://github.com/ceti-ai-services/ceti-claude-code-course |
| Vercel project | `manu-mulaveesalas-projects/ceti-claude-code-course` |
| Admin bypass | `MERCURIOP0656` (dev/test only) |
| Friend codes | `BRONZE-FRIEND-01`, `BRONZE-FRIEND-02`, `CETI-BRONZE-2026` |
| Gold-standard ref | `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/` |

## Appendix B — File map

```
app/
├── app.vue                         # shell + nav + footer
├── assets/css/main.css             # globals + typography
├── assets/css/tokens.css           # design tokens (Package 1)
├── components/                     # Package 1 lives here
│   ├── HeroCanvas.vue
│   ├── ModuleHero.vue
│   ├── Callout.vue
│   ├── Quiz.vue
│   ├── StepWalk.vue
│   ├── ClickCards.vue
│   ├── CodeBlock.vue
│   ├── IxInstruct.vue
│   ├── IxCollapse.vue
│   ├── TryThis.vue
│   ├── Recap.vue
│   ├── LessonNav.vue
│   ├── ProgressDots.vue
│   └── ObjectiveChips.vue
├── composables/
│   └── useProgress.ts
├── plugins/
│   └── lucide.client.ts
└── pages/
    ├── index.vue                   # Package 2
    ├── start/
    │   ├── index.vue
    │   ├── [slug].vue              # fallback markdown renderer
    │   └── lessons/
    │       ├── 01-mental-model.vue # Package 3
    │       ├── 02-install.vue      # Package 4
    │       └── ... (through 07)
    ├── silver.vue
    ├── silver/
    │   ├── [...slug].vue
    │   └── lessons/
    │       ├── week-01-overview.vue
    │       ├── week-01-01-audit.vue
    │       └── ...
    ├── gold.vue
    └── gold/[slug].vue
content/
├── start/                          # source markdown (don't delete)
├── silver/                         # week-by-week markdown
├── gold/                           # playbook markdown
└── videos/                         # teleprompter (reference only)
bronze-kit-src/
├── CLAUDE.md
├── .claude/commands/               # 5 generic commands
└── industries/                     # Package 8
    ├── marketing/{CLAUDE.md,.claude/commands/}
    ├── ops/{...}
    ├── legal/{...}
    └── founder/{...}
public/
├── bronze-kit.zip                  # rebuilt in Package 8
├── silver-starter-kit.zip          # built in Package 6 / Week 2
├── og-image.png                    # Package 9
├── takeaways/                      # (if still wanted — optional)
├── robots.txt
└── sitemap.xml
docs/
├── AUTONOMOUS-BUILD.md             # this file
├── GOLD-STANDARD.md                # Package 0 output
├── STRIPE-SETUP.md
└── plans/                          # (optional — per-package plans from agent)
.agent/                             # all agent ephemera (gitignored? NO — commit state/handoff for resumability)
├── state.md
├── HANDOFF.md                      # only exists when paused
├── COMPLETE.md                     # only exists when all 9 DONE
├── BLOCKED.md                      # only exists when blocked
└── plans/
    └── <n>-<slug>.md
```

## Appendix C — Token budget

Rough per-session budget (assuming ~200K context model):

| Activity | Budget | Notes |
|----------|--------|-------|
| State detection | 5 min | Keep it lightweight; write and commit |
| Package 0 | 30 min | Reading-heavy; expect ~30K tokens in |
| Package 1 | 90 min | Component-heavy; ~40K tokens out |
| Package 2 | 45 min | |
| Package 3 | 60 min | Careful — this is the reference |
| Package 4 | 90 min | Split per-lesson commits |
| Package 5 | 60 min | |
| Package 6 | 75 min | Split per-week |
| Package 7 | 45 min | |
| Package 8 | 45 min | Lots of small files |
| Package 9 | 30 min | |
| Handoff / complete | 5 min | Always, always write |

Total: ~570 min = 9.5 hours for a full solo run. A realistic 4-hour session reaches **end of Package 4** (Bronze fully interactive) — that is a great outcome and a clean handoff point.

---

*End of runbook. Begin at `.agent/state.md`.*
