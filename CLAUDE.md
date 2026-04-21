# CETI.AI — Claude Code Course

**Domain**: learn.cetiai.co
**Stack**: Nuxt 4 · static · Vercel
**Status**: Pre-launch (cohort zero = 2 mutual friends)

This repo is the landing site and enrollment funnel for CETI.AI's Claude Code course product. It is the productized companion to cetiai.co's high-touch enterprise consulting: a three-tier ticket system that turns Manu's calendar into SKUs and feeds the existing Ascendient-shaped enterprise pipeline.

## Product shape

| Tier | Price | Format | Cap | Purpose |
|------|-------|--------|-----|---------|
| 🥉 Bronze — *Claude Code: Day One* | Free (invite) | 7 self-serve modules, ~90 min | — | Top of funnel. Captures the list. |
| 🥈 Silver — *Claude Code for Your Work* | $499 | 4-week async cohort + weekly live Q&A | 20 | Recurring revenue engine. |
| 🥇 Gold — *Claude Code in Your Business* | $2,500 | 4× 1:1 hours + 30-day Slack support · **optional $1,000/mo retainer after** | 5/quarter | Bridge to existing enterprise consulting. |

**Funnel math**: Free Bronze → 5–10% → Silver → 10–20% → Gold → retainer / enterprise.

Bronze's ticket codes are gated server-side (`server/api/enroll.post.ts`) so every starter becomes a known email on the list. Cohort zero is two friends: `BRONZE-FRIEND-01` and `BRONZE-FRIEND-02`. Their feedback shapes v1.

## Audience + tone

The entire course assumes a reader who has **never opened a terminal**. Target archetypes:

- Marketing director wanting to automate reporting
- Ops lead drowning in shared-drive cleanup
- Founder who wants AI that actually touches their files
- Lawyer/accountant wanting to summarize and organize

**Tone invariants** (enforce in all written content, videos, email, landing copy):

- **Warm**, not cheerful. We respect the reader's time and intelligence.
- **Confident**, not loud. No "game-changing," no "revolutionary," no "unlock."
- **A little dry**. Occasional deadpan. Technical-writer energy, not influencer energy.
- **No emojis** in lesson bodies, commands, or documentation (medal emojis in tier headers are the only exception).
- **No condescension**. Never "Don't worry, this is easy!" — just explain it.
- **No hype**. If a thing is genuinely useful, say what it does. Show don't tell.
- **Short sentences**. Short paragraphs. Aggressive verbs. Cut every sentence that could be cut.

## Core team

| Name | Email | Role |
|------|-------|------|
| Manu Mulaveesala | hello@ceti.ai / manutej@gmail.com | Founder, lead instructor, enterprise consulting |
| Ormus | hermeticormus@gmail.com | Cohort zero · product review · co-instructor candidate for Silver |

Ormus is also Bronze friend code **`BRONZE-FRIEND-01`**. His feedback gates the Bronze launch.

### Draft workflow — "draft to X"

When Manu says *"draft to ormus"* (or any core-team name), queue a Gmail draft rather than sending. Drafts pile up in the Drafts folder and Manu reviews + sends in a single pass, usually daily. Rationale: preserves tone control, avoids half-baked messages going out, and batches async communication so the core team isn't pinged in real time.

Convention for every drafted email:
- Tone matches the course tone: warm, confident, a little dry.
- Subject line names the deliverable, not the feeling ("Claude Code course — Bronze review ready," not "Quick question!").
- Body opens with context in one sentence, then the ask in another.
- Ends with a specific request or "no action needed" — never vague sign-offs.
- Never send directly. Always `create_draft`, never a send API.

## Course structure (Bronze — 7 modules, ~90 min total)

1. **Mental model** — what Claude Code is (and isn't)
2. **Install** — Mac / Windows / Linux, Node prerequisite, API key vs. Claude.ai sign-in
3. **First session** — scope to a folder, ask it a real question
4. **File permissions** — approve/deny flow, backup-first habit, permission modes
5. **CLAUDE.md** — project memory, fill-in template
6. **One real use case** — report / organize / email archetype
7. **Next steps** — Silver + Gold pitch

Every module ends with:
- "What you just did" — one-paragraph recap
- "Try this" — a 5–10 min concrete exercise

Lesson source lives in `content/start/*.md`. The Nuxt page route `/start/01-mental-model` renders Module 01. Modules 02–07 will follow the same pattern.

Video companion under `content/videos/` — one teleprompter script per module, 8–12 min each. See `content/videos/README.md` for production conventions.

Starter kit under `bronze-kit-src/` zipped to `public/bronze-kit.zip`:
- CLAUDE.md template with worked examples
- 5 slash commands: `morning`, `summarize-file`, `draft-email`, `organize-downloads`, `journal`
- 1-page cheat sheet PDF
- FAQ.md for PATH / install / permission errors

## Repository layout

```
app/
  app.vue                  # root shell: nav + <NuxtPage/> + footer
  assets/css/main.css      # dark theme, single gold accent
  pages/
    index.vue              # landing: hero + 3-tier card grid
    start/
      index.vue            # Bronze gate — email + ticket code form
      01-mental-model.vue  # Module 01 rendered page (others to follow)
    silver.vue             # $499 Stripe checkout
    gold.vue               # $2,500 Stripe checkout
    thanks.vue             # post-checkout confirmation
server/
  api/
    enroll.post.ts         # validates ticket code → redirect to /start/01-mental-model
    checkout/
      silver.post.ts       # Stripe Checkout placeholder
      gold.post.ts         # Stripe Checkout placeholder
content/
  start/                   # 7 lesson markdown files
  videos/                  # 7 teleprompter scripts + README
bronze-kit-src/            # source files that get zipped into public/bronze-kit.zip
public/
  bronze-kit.zip           # downloadable starter kit (generated)
nuxt.config.ts
package.json
CLAUDE.md                  # this file
README.md
.env.example
```

## Copy-to-clipboard rule (v4.2, 2026-04-21)

> **Every code block, every prompt, every copyable artifact gets a one-click copy button.**

Applies everywhere a reader might want to paste-and-try:
- Markdown code fences in lesson prose
- `FillableBuilder` preview blocks
- `TracedExample` expanded artifact panels
- `TerminalReplay` / `ThreeMovesTerminal` command lines
- JSON/YAML configuration blocks in any diagram
- `<Callout>` bodies that contain code inline

Implementation: one shared `<CopyButton :text="..." />` component. Clicking triggers `navigator.clipboard.writeText(text)` and shows a transient checkmark for ~1.2s. Position: top-right corner of the code surface. Visible on hover (and always on mobile).

## Glow & depth rule (v4.2, 2026-04-21)

> **Dark mode: diagrams glow with their edge color. Light mode: diagrams sit on a soft shadow.**

Applied universally via `DiagramShell` (single source):
- **Dark:** `box-shadow: 0 0 0 1px hsl(var(--border)), 0 0 32px -10px hsl(var(--primary-edge) / 0.18)`
- **Light:** `box-shadow: 0 1px 2px hsl(var(--foreground) / 0.06), 0 8px 24px -12px hsl(var(--foreground) / 0.10)`

Terminal chrome inside a diagram follows the same contract — terminal bg in dark mode is deeper than the card, in light mode is warm-cream (never light-cream-on-dark or vice versa).

## 5-diagrams-per-module rule (v4.1, 2026-04-21)

> **Every module has at least 5 diagrams. Visuals are the majority. Prose is connective tissue.**

Concretely:
- **1 hero** diagram at `app/components/course/lesson/M<NN>Hero.vue` (composes `MissionBrief` + one pattern)
- **4 mid-lesson** diagrams at `app/components/course/diagrams/m<NN>-d<1..4>.vue` (each thin wrapper around one pattern)
- **No two diagrams in the same module use the same pattern** — force variety.

### How diagrams get into a module

1. Create `app/components/course/diagrams/<id>.vue` — thin wrapper, imports one pattern, binds EN+ES copy via `useCustomizer()`.
2. Register in `app/components/course/diagrams/index.ts`.
3. Embed `<CourseDiagram id="<id>" />` in the module's `.md` at the right paragraph break (replacing or augmenting prose).

The `[slug].vue` tokenizer already knows `<CourseDiagram>` as a self-closing tag. No page-renderer changes when adding diagrams.

### The prose shrinks to scaffolding

When a diagram carries an idea, **delete the prose that was carrying it.** Keep: one-sentence setup before the diagram, one-sentence aftertaste naming what just happened. Cut: every "as you can see above" paragraph.

Target shape for a 12-minute lesson:
- 3–5 short prose paragraphs (setup, connective tissue, closing)
- 1 hero diagram at the top
- 4 mid-lesson diagrams distributed through the body
- 1 `<TryThis>` block · 1 `<Recap>` block

## Design system (v4 — retro-boardwalk dual-mode, 2026-04-21)

**Single source of truth:** `.claude/skills/retro-boardwalk-skill/` (BRAND_BOOK.md + PATTERNS.md).
**Visual-forge skill:** `.claude/skills/ceti-course-visuals/` (PLAN → GENERATE → EVAL loop).

### The one rule that matters

> **Light mode: the color is the fill. Dark mode: the color is the light at the edge.**

Dark-mode nodes are deep hue-tinted shadows with luminous colored borders. If a dark-mode card reads as a bright pastel, it is wrong.

### Four palettes × two modes via body class

One HTML element owns the palette. Swap a body class → the whole system re-skins.

```html
<body class="palette-boardwalk dark">
<!-- or palette-coastal | palette-greenhouse | palette-neosage -->
<!-- and light | dark -->
```

| Palette | Personality | Pick for… |
|---|---|---|
| `boardwalk` | 90s nostalgia, softened | default — warm, human content |
| `coastal` | warm/cool tension | tradeoffs, two-sided comparisons |
| `greenhouse` | botanical earth tones | systems, infrastructure, growth |
| `neosage` | muted-neon | high-energy, "electric" concepts |

Palette CSS lives in `app/assets/css/main.css` as `:root`-scoped blocks. Components name roles, never hex.

### Token roles (PRAO mapping is universal)

| Role | Meaning | PRAO mapping |
|---|---|---|
| `primary` | "first" teaching color | **Perceive** |
| `secondary` | "second" | **Reason** |
| `accent` | active/CTA/output — one pop per view | **Act** |
| `support` | neutral/observe | **Observe** |
| `*-edge` | luminous border color (dark-mode only) | — |

### Typography (fixed roles)

| Face | Use | Weights |
|---|---|---|
| **Fraunces** (serif, italic) | Display headlines, card titles | 300 italic, 600 |
| **DM Sans** (sans) | Body, UI | 400, 500, 600, 700 |
| **Space Mono** (mono) | Code, file paths, artifacts | 400, 700 |

Rules: display text uses Fraunces **300 italic** — the italic is the signature. Never mix weights in a sentence. Minimum body 11px.

### Pattern library

**Location:** `app/components/course/patterns/` — 18 reusable teaching shapes, functional (props-in, events-out), zero side effects.

| Pattern | Use when… |
|---|---|
| `SequentialPulse` | 3–5 ordered phases that share role colors |
| `OrbitalRing` | feedback loop / cycle (PRAO) |
| `Storyboard` | one concept mapped onto N named phases with prose |
| `PhaseTabs` | N phases × multiple facets |
| `ComparisonGrid` | N parallel concepts (eras, tiers, approaches) |
| `FailureTable` | wrong → trap → right (3–4 rows) |
| `TracedExample` | ordered steps with artifacts |
| `FillableBuilder` | the concept IS an artifact (CLAUDE.md, slash command) |
| `DecisionFork` | judgment call, 2–3 paths |
| `FitTree` | branching decision |
| `FileTree` | project layout, anatomy |
| `TerminalReplay` | real command flow with approve/deny |
| `Timeline` | 4–6 linear steps |
| `CheckableStack` | habits / checklists |
| `SessionBoundary` | persistent vs ephemeral |
| `TradeoffMatrix` | two approaches × N dimensions |
| `ScatterFlow` | fit on a 2D axis |
| `ThreeMovesTerminal` | read / plan / execute as three stamps |

Decision tree for picking a pattern: see `.claude/skills/retro-boardwalk-skill/PATTERNS.md` § Pattern selection heuristic.

### Non-negotiables (automatic fail in EVAL)

1. **No raw hex in components.** Reference tokens only (`bg-primary`, `border-primary-edge`, `hsl(var(--accent))`).
2. **No emoji inside diagram nodes.** Palette-selector UI can use them; diagrams cannot.
3. **Contrast ≥ 4.5:1** on every colored background.
4. **One saturated accent max** per card.
5. **One focal animation max.** Secondaries can fade/dim, never compete.
6. **Fraunces 300 italic** appears somewhere in every card (usually the title).
7. **`prefers-reduced-motion`** disables auto-cycles; hover/focus still works.
8. **All 4 palettes × light/dark** pass a visual check before ship.
9. **Max 3 focal points** per visual. Max 4 role colors with intent.
10. **Whitespace ≥ 30%** of the bounding box.

### When to invoke the visual-forge skill

Use `.claude/skills/ceti-course-visuals/` for any new concept that could be visual rather than prose: decision trees, processes, comparisons, mappings, sequences, anatomies, failure modes. The skill runs PLAN → GENERATE → EVAL for up to 5 rounds until the output clears the WOW rubric (`references/rubric.md`).

**Don't invoke for:** pure typography moments, short transitional paragraphs, individual callouts.

### How to extend a course pattern

1. Pick the pattern from PATTERNS.md.
2. Open `app/components/course/patterns/<PatternName>.vue`.
3. **Copy-adapt, don't re-derive.** Keep the token names. Swap the copy. Swap the node count if needed (within the pattern's max).
4. Verify the four constraints (max 4 role colors · max one focal animation · every colored background ≥ 4.5:1 · Fraunces italic somewhere).
5. Test all 4 palettes × light/dark.

### The 14-module Bronze structure

| # | Title | Status | Time |
|---|---|---|---|
| 01 | What Claude Code is — and how it differs from the browser chatbot | live | 12 |
| 02 | Install on Mac, Windows, or Linux | live | 14 |
| 03 | Your first real session — scoped to a folder | live | 14 |
| 04 | File permissions — read the diff, approve the change | live | 12 |
| 05 | CLAUDE.md — write it once, stop explaining yourself | live | 13 |
| 06 | One real task, end-to-end | live | 45 |
| 07 | Slash commands — reusable prompts you build once | live | 12 |
| 08 | Skills — packaged capabilities Claude loads on demand | live | 12 |
| 09 | Plan mode — think before acting, dry-run your work | live | 10 |
| 10 | Hooks — safety gates and pre/post-tool-use automation | live | 14 |
| 11 | MCP basics — connect Gmail, Calendar, Notion, your files | live | 14 |
| 12 | Git integration — commits, branches, PRs through Claude | live | 12 |
| 13 | Subagents and parallel work | live | 12 |
| 14 | Next steps — habits and the wider agentic toolkit | live | 10 |

Unlock target: all 14 live by end of refactor pass 2026-04-21.

## Key rules

- **Never link to competitor courses** (Maven, Fractional, Anthropic's own docs as a "course" — docs as references is fine). Plain-text citations only.
- **Ticket codes are secrets** in spirit — they're not cryptographic, but we don't publish the list. Friend codes rotate if leaked.
- **Stripe keys never in code.** Only in `.env`. The checkout handlers return a 503 with a friendly message if keys aren't set, so pre-launch dev doesn't crash.
- **Enrollment trail.** Every successful `/api/enroll` should eventually persist to a real store (Airtable or Postgres). Right now it logs; swap in the real persistence before the friends launch.
- **Content accuracy** (zero tolerance — see agentic-ai-course standards):
  - No `--thinking` flag. No `--context` flag. No `/memory` command. These do not exist.
  - SSE for remote MCP is deprecated 2025-03-26 — use Streamable HTTP.
  - Exactly THREE MCP primitives: Tools, Resources, Prompts.
  - CLAUDE.md is read at session start, never invoked as a slash command.

## Deploy

```bash
# From repo root
npx vercel --prod --yes
```

Target domain: `learn.cetiai.co` (sub-domain off cetiai.co). Static generation via `nuxt generate`. Set env vars in Vercel: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_SILVER`, `STRIPE_PRICE_GOLD`, `BRONZE_TICKET_CODES`.

## Related projects

- **`cetiai.co`** (main site) — enterprise consulting, client proposals. Source in `/Users/manu/Documents/CETI/website/`.
- **`agentic-ai-course`** at `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/` — prior 3-day Claude Code course (Ascendient). Design references, accuracy rules, and content spec come from there.

## Contacts

- Email: hello@ceti.ai
- Website: [cetiai.co](https://cetiai.co)
- Calendly: [calendly.com/manutej/30min](https://calendly.com/manutej/30min)
