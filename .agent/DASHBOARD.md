# Execution Dashboard — CETI Academy

Append-only log of every milestone, decision, and build. Newest at top.

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
