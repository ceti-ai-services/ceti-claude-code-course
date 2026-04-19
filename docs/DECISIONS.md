# DECISIONS — CETI Claude Code Academy

Perpetuated decision ledger. Append-only. Newest at top. Every entry names the date, the decision, and the rationale so the team (and future Manu, and any agent picking up later) can audit *why* we did what we did.

---

## 2026-04-19 · Bronze reset v2 — voice, personas, i18n, future-hooks

### Audience correction

**Decision**: Bronze tier is **not for corporate employees**. It is for solo founders and small business owners going from level-1 to level-2 — creators, consultants/freelancers, service business owners, real estate brokers. Future corporate cohorts are out of scope for this launch.

**Rationale**: Shipped v1 content assumed "team/stakeholders/Q1 meetings." User feedback: content reads AI-generated and doesn't meet the actual cohort-zero audience where they are.

### Voice (the heart of this reset)

**Decision**: Every piece of Bronze content passes this filter before commit:

- Impactful, honest, direct — copywriting discipline, hook first, rhythm, no filler
- Personal, intimate — address the reader as *you*, name what they're actually feeling
- Authority + empathy — Manu's voice (5000+ trained, 100+ orgs) from alongside the reader, not above
- Anti-template — no "In this lesson you will learn…", no "Congratulations!", no standard AI cadence
- Future-aware, not future-promising — gesture at the dynamic AI assistant that will plug in later without describing features we haven't built

**Banned words** (enforced pre-commit grep): `revolutionary`, `unlock`, `game-changing`, `next-level`, `10x`, `seamless`, `cutting-edge`, `synergy`, verb-form `leverage`, `dive in`, `let's get started`, `buckle up`, `don't worry`.

### Personas (four, all authored — no generic fallback)

**Decision**: Hero customizer routes against exactly these four:

1. **Creator** — coaches, YouTubers, newsletter writers, course creators
2. **Consultant / Freelancer** — solo consultants, designers, developers, contractors
3. **Service business owner** — tradespeople, salons, cleaners, tutors, trainers
4. **Real estate broker**

Every persona-varying block in every module has authored copy for all four. No default slot.

**Rationale**: Generic "I help business owners" reads corporate. Named archetypes with named frustrations read human.

### Corporate persona (hidden for now)

**Decision**: A fifth "Corporate" persona is defined in the codebase but hidden from nav + routing. The two existing Novice academy pages (`perspective-matrix.vue`, `six-dimensions.vue`) move to `app/pages/academy/_corporate/` and are **preserved, not deleted**. Nuxt's underscore-prefix convention skips routing.

**Rationale**: User: "move to a corporate persona that we'll plug in and improve later, but stays hidden for now — we're not having those clients yet so no point to build it."

### i18n approach (simplified per user direction 2026-04-19)

**Decision**: Drop the full `@nuxtjs/i18n` module plan. Drop the dual-composable plan. Use the smallest i18n that works:

1. Author every module in English with extreme voice-care.
2. At execution time, the agent (me) translates each module to neutral Central/South American Spanish. Not machine-translate — careful, idiom-aware, copy-faithful. Keep technical terms in English where LatAm tech audience says them that way (`CLAUDE.md`, `terminal`, `prompt`).
3. Store translations as sidecar markdown: `01-mental-model.md` (EN) + `01-mental-model.es.md` (ES).
4. Lesson loader picks file via `route.query.lang ?? 'en'` — falls back to EN.
5. Language toggle in nav flips `?lang=` query.
6. No localStorage, no global composable, no route prefix.

**Rationale**: User: "better quality content if you just prompt the documents to yourself and ask to customize it to Central and South American Spanish and use your language translation capabilities rather than trying to maintain a consistent i18n version for now." Better fidelity for marketing copy + room to graduate to a full i18n layer later without rework.

### Future-vision hooks (enable the dynamic AI assistant plug-in, don't build it now)

**Decision**: Three cheap-to-add affordances make the future AI assistant easy to slot in, without building the assistant this weekend:

1. **Reflection capture points** — every module's `<TryThis>` gets a commented-out `<ReflectionInput>` TODO marker. No input rendered yet.
2. **Profile data schema stub** — `app/types/profile.ts` with a typed `StudentProfile` interface (persona, lang, completedModules, reflections map). Zero runtime, just the contract.
3. **Session metadata in module frontmatter** — every lesson gets `tags:` and `skills_gained:` frontmatter fields. Future AI assistant can query them.

**Rationale**: User vision: "an AI assistant that can plug in directly and support or even customize the journeys based on the backgrounds of the individuals in a dynamic, non-deterministic way." The scaffolding must not preclude that. The assistant itself is out of scope for this ship.

### Interactive experience (game-feel + choose-your-adventure)

**Decision**: Bronze pages use callout boxes, coding-adapted animations, and realistic interactive elements that force engagement — "game fight experience" per user direction. Concrete patterns determined by `docs/insights/best-in-class-ux.md` (research in flight). Inspiration: bootcamp.dev.

Constraint: must compose from already-installed shadcn primitives (`button`, `card`, `alert`, `badge`, `collapsible`, `tabs`, `accordion`, `dialog`, `progress`, `separator`) plus Tailwind utilities. No new deps unless payoff is large and documented.

**Rationale**: User: "use callout boxes, coding animations, and realistic interactive elements that force people to engage and interact with the page, almost like a game fight experience and choose your own adventure."

### Validation gates — MERCURIO + MARS at every milestone

**Decision**: At the end of every major step (not every file), dispatch a validation pass — one MERCURIO-framed subagent (multi-perspective review), one MARS-framed subagent (domain decomposition, leverage-point check). They read what just shipped, critique it against this DECISIONS file + the voice filter, and return a structured go/no-go + concrete improvements. We iterate *within* the phase before advancing.

**Rationale**: User explicitly called this out — "Validation should be performed with Mercurio and Mars at each major milestone and step in order to review and iterate within the phase in order to continuously improve, rather than build a bunch of things that no one wants or cares about, like you just previously did."

**Milestone boundaries where validation fires**:
- End of component library (Step 2 ship)
- End of academy landing rewrite (Step 3 ship)
- End of lesson loader + first rewritten module (Step 6a)
- End of EN content rewrite (Step 6 close)
- End of ES authoring (Step 7 close)
- Before cohort-zero link send (Step 8)

### Codebase-to-course skill — modify if needed

**Decision**: Use the `codebase-to-course` LUXOR skill as a content source. If the skill needs changes to fit our Nuxt 4 + shadcn-vue + Tailwind + dark-gold stack, **modify the skill or create a derivative skill** — user has explicit authority granted. Document any skill changes in this file.

**Rationale**: User: "Use codebase-to-course skill as well, but customize to the exact type of architecture that we want. If you need to modify any skills or create new skills, you can do so at will."

**Initial stance**: transform-layer approach (Path B from `docs/insights/luxor-map.md`) — keep the upstream skill untouched, write a thin adapter that re-emits its HTML output through our shadcn-vue components. If adapter turns out more complex than a forked skill, revisit.

### Interactive patterns — game-feel + choose-your-own-adventure

**Decision**: Callout boxes, coding-adapted animations, realistic forced-engagement interactions. "Game fight experience." Inspiration: bootcamp.dev + competitive scouting (research in flight at `docs/insights/best-in-class-ux.md`).

Specific patterns to ship with Bronze:
- Forced-choice branches (mid-lesson "what would you do?" that shows a different next block based on the reader's pick)
- Visible progress/XP orbs that grow as the reader advances
- "Boss encounter" end-of-module checkpoint — reader must make a decision, not just scroll
- Combo animations for multi-step actions (prompt → response → edit → accept) — CSS + Tailwind, no new deps
- Callout boxes with 7 variants (`core-idea`, `tip`, `warning`, `key-concept`, `approval`, `definition`, `stakes`) — already exist, use more aggressively

**Constraint**: compose from already-installed shadcn primitives + Tailwind. No new deps unless payoff is documented + big.

**Rationale**: User: "use callout boxes, coding animations, and realistic interactive elements that force people to engage and interact with the page, almost like a game fight experience and choose your own adventure. You can use inspiration from places like bootcamp.dev."

### Continuous HANDOFF + redeploy rhythm

**Decision**: `.agent/HANDOFF.md` is updated at every step boundary — not just every milestone. Every commit pushes to `main`, auto-deploying to `dev-learn.cetiai.co`, so the user can check progress on mobile at any time without asking.

**Rationale**: User: "I should just be able to go check the verso link and see what's changed or get a notification on my phone."

**Cadence**: minimum one deploy per step (10 steps planned → ~10 deploys). Commits carry conventional subjects so the mobile GitHub view reads as a clean changelog.

### Ship scope

**Decision**: Bronze live on `dev-learn.cetiai.co` by Sunday 2026-04-20, EN + ES, 4 personas, ready to link to cohort zero (Ormus + friends).

### Cut-lines (explicitly NOT in scope this weekend)

1. The actual AI assistant that customizes journeys — hooks only
2. Student accounts, auth, server-persisted reflections — state stays URL-param + localStorage
3. Rebuilding starter kit, video scripts, or Silver/Gold content
4. `@nuxtjs/i18n`, CMS, translation memory
5. New color palettes or illustrations
6. Per-persona lesson bodies — only example blocks vary; main prose is single-source per language

---

## Decision-making protocol going forward

When a new decision is needed:

1. Capture it here with date + rationale before implementing.
2. If it contradicts an earlier decision, **don't delete the earlier one** — add a superseding entry at the top that references it.
3. If an agent is blocked on a decision, write the unknown to `.agent/HANDOFF.md` and escalate.
