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

## Design system

Minimal dark theme. **One** accent color: gold (`#d4a84b`). No indigo/cyan/gradient-soup. Backgrounds are near-black (`#0a0a0b`) with layered surfaces. Typography is Inter for text, JetBrains Mono for code/prices.

Tokens in `app/assets/css/main.css`:
- `--bg` `#0a0a0b` (body)
- `--surface` `#121214` (cards)
- `--raised` `#1a1a1d` (inputs, code blocks)
- `--gold` `#d4a84b` (accents — only color that isn't a shade of grey)
- `--text` `#f5f5f4` · `--muted` `#a1a1a8` · `--dim` `#6b6b72`

Every new component uses these tokens. Do not introduce new colors without updating this list.

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
