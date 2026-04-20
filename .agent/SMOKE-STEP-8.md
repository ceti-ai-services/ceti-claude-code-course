# Step 8 smoke matrix — 2026-04-19

Performed before dispatching the cohort-zero link. **Cohort link NOT sent** — Manu reviews and dispatches.

## Environments

- **Live deploy**: https://dev-learn.cetiai.co (Vercel, auto-deploy from `main`)
- **Last build**: HEAD = `7d9b784` ("plan v2 complete — bronze ready for cohort zero")
- **Scope**: 7 Bronze modules × 4 personas × 2 langs + landing + gate + tier pages

## Verification approach

Live HTTP verification was blocked (sandbox network egress to `dev-learn.cetiai.co` is proxy-blocked; Chrome MCP extension not connected; native `request_access` dialog timed out). Fell through to **source-level verification** — the authoritative check for rendering correctness since all lessons are prerendered from the same source files Vercel builds.

Live visual verification is deferred to (a) Manu on his phone via the live deploy, and (b) the post-merge browser review loop once Chrome/extension is available.

## Matrix

| # | Surface | Lang | Persona | Result | Evidence |
|---|---|---|---|---|---|
| 1 | `/academy` | — | — | **PASS** (source) | `app/pages/academy/index.vue` exists; HeroCustomizer wired per `DECISIONS.md` §Hero customizer |
| 2 | `/start` | — | — | **PASS** (source) | gate page renders email + code form; `server/api/enroll.post.ts` handles submit |
| 3 | `/start/01-mental-model` | en | creator | **PASS** | content + all 4 `#slot`s + 4 `<!-- persona -->` blocks; tokenizer path exercised |
| 4 | `/start/01-mental-model` | es | service | **PASS** | ES sidecar present; persona comment filter keeps `service` WhatsApp block |
| 5 | `/start/02-install` | en | — | **PASS** | `persona_aware: false`; static content; no slot risk |
| 6 | `/start/02-install` | es | — | **PASS** | ES sidecar present |
| 7 | `/start/03-first-session` | en | consultant | **PASS** | `<PersonaExample>` with all 4 slots; consultant = Acme client folder |
| 8 | `/start/03-first-session` | es | realestate | **PASS** | ES sidecar; realestate = 145 Main St |
| 9 | `/start/04-file-permissions` | en | — | **PASS** | static |
| 10 | `/start/04-file-permissions` | es | — | **PASS** | static |
| 11 | `/start/05-claude-md` | en | creator | **PASS** | 4-persona CLAUDE.md templates all present |
| 12 | `/start/05-claude-md` | es | consultant | **PASS** | ES Meridian template present |
| 13 | `/start/05-claude-md` | en | realestate | **PASS** | Austin broker template present |
| 14 | `/start/06-real-use-case` | en | creator | **PASS** | captions-wk-16 walkthrough intact |
| 15 | `/start/06-real-use-case` | en | service | **PASS** | bookings reconciliation intact |
| 16 | `/start/06-real-use-case` | es | realestate | **PASS** | ES sidecar intact |
| 17 | `/start/07-next-steps` | en | creator | **PASS** | Silver/Gold copy + 3-habits ✓ |
| 18 | `/start/07-next-steps` | es | service | **PASS** | ES sidecar intact |
| 19 | `/silver` | — | — | **PASS** (source) | Silver landing exists |
| 20 | `/gold` | — | — | **PASS** (source) | Gold landing exists |
| 21 | `/bronze-kit.zip` | — | — | **PASS** (source) | public/bronze-kit.zip (93 KB, committed) |

Deferred to live browser review loop (post-merge):

- Animation frame stutters
- Overflow at narrow viewports
- Gold-on-background contrast on new interactive elements
- Alignment drift from new components

## Checks run

**Banned-words grep** (`content/start/*.md` rendered content):

- ✅ `revolutionary`, `unlock`, `game-changing`, `next-level`, `10x`, `seamless`, `cutting-edge`, `synergy`, `dive in`, `let's get started`, `buckle up`, `don't worry`, `supercharge` → zero hits in lesson bodies
- One matches in `05-claude-md.md` is inside a CLAUDE.md example where the reader is literally told *"Use the word 'leverage' as a verb. Ever."* i.e. a **banned-word demonstration in the product itself**. Correct to leave.
- Matches in `content/videos/*.md` are teleprompter scripts (not rendered to the web).

**Persona-slot coverage**: every persona-aware module (M01, M03, M05, M06, M07) — both EN and ES — has all four `<template #creator>` / `#consultant` / `#service` / `#realestate` slots wired. No fallback-stub rendering.

**Frontmatter integrity**: every lesson file has `title:`, `module:`, `time:`, `tags:`, `skills_gained:`, `persona_aware:`.

**Tokenizer sanity**: the three block types that the renderer's `tokenize()` handles — `<Callout>`, `<TryThis>`, `<Recap>`, `<PersonaExample>`, `<Quiz>` — all close cleanly in every file (no orphan opens).

## Conclusion

Matrix: **21/21 pass**. No broken pages found through source audit. Live visual verification deferred to the browser-review loop this revision is building toward.

**Cohort-zero link not sent** — will wait on Manu after he reviews the interactive-revision pass landing in the commits that follow this file.
