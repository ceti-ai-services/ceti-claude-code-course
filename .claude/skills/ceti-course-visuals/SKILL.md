---
name: ceti-course-visuals
description: Generate stunning, pedagogically-sound visual + interactive elements for the CETI Claude Code Academy. Every invocation loops PLAN → GENERATE → EVAL with an Opus-level rubric until the output is demonstrably WOW or explicitly logged as stuck. The goal is visual communication, not content for content's sake. Use whenever a module concept needs a diagram, animated element, interactive card, or traced example — in place of more prose.
triggers:
  - "visualize this concept"
  - "build a visual for M0X"
  - "make this interactive"
  - "turn this prose into a diagram"
  - "ceti visuals"
  - "visual forge"
author: CETI.AI · Manu Mulaveesala
version: 1.0.0
last_updated: 2026-04-20
---

# CETI Course Visuals — the skill

This skill turns a concept from a Bronze module into one visual/interactive element that holds its own on the page. Every element must teach a single idea with intention — no ornament, no content-for-content's-sake, no filler.

**Non-negotiable: the output clears the WOW rubric (`references/rubric.md`), or the concept is logged in `HANDOFF.md §stuck-log` for re-plan.** Iteration cap: 5 rounds per concept.

---

## When to invoke

- A module has a concept that's currently prose and could be visual (decision trees, processes, comparisons, mappings, sequences, anatomies, failure modes).
- An existing visual fails an EVAL pass and needs another round.
- A new concept lands in the curriculum and needs its first visual.

**Don't invoke for:** pure typography moments, short transitional paragraphs, individual callouts, or anything that would be weaker as a visual than as a sentence.

---

## The contract

Every visual produced by this skill must:

1. **Teach one idea.** Not two, not a whole module. One.
2. **Change state on user interaction.** Click a tab → panel updates. Click a step → detail reveals. Hover a term → definition appears. No static posters. (Exception: a pure SVG diagram that's the *target* of an interaction elsewhere is fine.)
3. **Work in isolation AND in the module flow.** A reader landing on the visual with no prior context can parse what it's showing within 5 seconds; a reader who's done the prior prose extracts depth on interaction.
4. **Fit the CETI design system.** Palette tokens only (`--color-gold`, `--color-info`, `--color-thought`, `--color-act`, `--color-confirm`, and semantic callout tokens). Fonts: Inter body, JetBrains Mono labels/code, Oswald display. No new deps. Honor `prefers-reduced-motion`.
5. **Be self-contained code.** A single `.vue` SFC or a single `.svg` inline block. No split files, no external state.
6. **Come with props that support EN + ES.** Copy lives in dict objects keyed by `lang.value` from `useCustomizer()`.

---

## The loop (PLAN → GENERATE → EVAL, max 5 rounds)

```
┌────────────────────────────────────────────────────────────────┐
│ INPUT: one concept + its position in the module                │
│                                                                │
│ ROUND 1..5                                                     │
│   ├─ PLAN   (Opus subagent — meta-prompts/plan.md)             │
│   │   Picks the right visual form for THIS concept. Not the   │
│   │   first thing that occurs. Weighs 3+ forms.                │
│   │                                                            │
│   ├─ GENERATE (Opus subagent — meta-prompts/generate.md)       │
│   │   Produces TWO variants as real Vue/SVG code.              │
│   │                                                            │
│   ├─ EVAL   (Opus subagent / MERCURIO — meta-prompts/eval.md)  │
│   │   Scores both against rubric.md. Verdict: WOW | NEEDS      │
│   │   REWORK (+ what) | RE-PLAN (wrong form).                  │
│   │                                                            │
│   └─ If WOW → ship. If REWORK → round N+1 with feedback.      │
│               If RE-PLAN → round N+1 from PLAN step.          │
│                                                                │
│ AFTER ROUND 5                                                  │
│   If still not WOW → log to HANDOFF.md §stuck-log with:        │
│   concept, form tried, EVAL's last verdict, Manu's call.       │
└────────────────────────────────────────────────────────────────┘
```

Each subagent gets the full rubric + references. No subagent produces output without first stating which rubric criteria its output hits.

---

## The rubric — when is it WOW?

See `references/rubric.md` for full scoring. In one line: **a visual is WOW when a competent learner, seeing it for five seconds, forms the correct mental model of the concept; and on first click/hover, the visual rewards that attention with a *specific* additional detail they didn't infer from the initial glance.**

Not WOW: pretty, busy, decorative, "looks like a dashboard."
WOW: purposeful, ruthlessly-spaced, color does work (doesn't just exist), interaction is the lesson.

---

## Pedagogical principles (enforced in EVAL)

1. **One idea per visual.** Chunking / miller's 7±2. If two ideas are fighting, split.
2. **Progressive disclosure.** Reveal detail only on interaction. First look: the claim. Second look: the mechanism. Third look: the counter-case / failure mode.
3. **Dual coding.** The concept exists simultaneously as words AND as a visual structure. The visual isn't decoration of the text — the visual *is* one of two independent encodings.
4. **Signaling.** Use color, weight, position to mark what matters. Don't bold things to hedge.
5. **Scaffolding.** Any visual later in the module can assume the earlier visual's vocabulary. Earliest visuals teach the grammar; later ones use it.
6. **Feedback.** When a user interacts, the visible response is immediate and semantically correct. No lag, no ambiguity.
7. **Worked examples over abstract rules.** If teaching a rule, show one traced example of it in action before/after the rule. (Ref: `ref-01-three-eras.svg` structure — Era / arrow / caption, one concrete actor diagram per era.)

---

## Space + color economy (hard rules)

- **Max 3 focal points per visual.** More than 3 → the eye has nowhere to rest. Split.
- **Max 4 colors used with intent.** Greys don't count. Gold is always one; the other three come from the phase-accent palette (`--color-info`, `--color-thought`, `--color-act`, `--color-confirm`) or from semantic callout tokens.
- **Color is semantic.** If two things are the same color, they must be the same *kind* of thing. Never decorative.
- **Whitespace ≥ 30% of the visual's bounding box.** If it's dense, it's either wrong or splittable.
- **Motion is intentional.** Every animation answers a question the static state left open. No "it's animated because animation is cool."
- **Text ≤ 140 chars per label.** Longer → use a reveal.
- **Typography stays CETI.** Inter body, JetBrains Mono code/labels, Oswald display. DM Sans optional for editorial density blocks. No other fonts.

---

## Available visual forms (pick one per concept, or hybrid)

Catalog at `references/patterns.md`. In one line each:

- **Comparison grid** (`ref-01-three-eras`) — N columns, one concept per column, shared structure (actor boxes, arrows, caption). Best for: eras, approaches, tiers, before/after.
- **Failure-mode table** (`ref-02-three-failure-modes`) — failure → trap → correction, 3 rows. Best for: pitfalls, anti-patterns, common mistakes.
- **Animated orbit / cycle** (`ref-03-prao-loop-animated`) — 4 nodes on a circle, flow-animated arcs, center label. Best for: loops, cycles, feedback systems.
- **Phase tabs + reveal panel** (`PraoLoop.vue`) — N clickable tabs, dynamic panel updates. Best for: mapping one structure onto phases.
- **Traced example** (`PraoLoop.vue` trace steps) — ordered sequence, click-to-reveal detail per step. Best for: procedural understanding.
- **Fillable builder** — reader fills N fields, live preview shows the resulting artifact. Best for: CLAUDE.md, slash commands, skill.md.
- **Decision fork** (`ForkChoice.vue`) — "what would you do?" with branching reveal. Best for: judgment calls, first-session decisions.
- **File tree / system anatomy** — folder structure visualization, hoverable nodes. Best for: project layout, where things live.
- **Terminal replay** (`TerminalDemo.vue` / `ApprovalSim.vue`) — typed prompt, response, interactive approval. Best for: real command flows.
- **Timeline** (`ProcessFlow.vue`) — horizontal N steps, auto-highlight or click. Best for: linear processes, read→plan→execute.
- **Checkable stack** (`StackedReveal.vue`) — N cards, expand/check state. Best for: habits, checklists, multi-part answers.

The PLAN subagent must consider ≥3 of these for every concept before choosing.

---

## Reference corpus

Files in `references/` are the **canonical quality bar**. They set the level every output must meet or exceed.

- `ref-01-three-eras.svg` — three-column comparison grid. Canonical for: semantic color coding, arrow use, caption rhythm.
- `ref-02-three-failure-modes.svg` — three-row failure→trap→correction table. Canonical for: tight information density without clutter.
- `ref-03-prao-loop-animated.html` — animated orbit with sequential phase highlighting. Canonical for: motion-as-teaching.
- `rubric.md` — WOW scoring rubric.
- `patterns.md` — full visual-form catalog.

New references land here only when Manu approves.

---

## Output contract (what the skill returns)

For each concept:

1. One `.vue` SFC (preferred) or inline `.svg` block, placed under `app/components/course/visuals/<module>/<concept-slug>.vue`.
2. If Vue: exposes props for EN + ES copy via dict pattern seen in `PraoLoop.vue`.
3. Registered in `app/pages/start/[slug].vue` (tokenizer + template) as a self-closing inline tag.
4. A short commit message noting: module, concept, form chosen, rounds to converge, EVAL verdict snippet.

Under 180 lines per visual ideally. Hard ceiling: 260 lines. Beyond that it's doing too much and needs splitting.

---

## Anti-patterns (auto-fail EVAL)

1. **Dashboard-style grids** of disconnected stats. Courses aren't admin consoles.
2. **Stock icon fields** — a row of emoji-adjacent icons with labels underneath. Tells you nothing.
3. **Gradients as content.** Gradient skies, gradient buttons, gradient "data." Gradients allowed only on thin accent lines.
4. **Animated backgrounds** that compete with content.
5. **More than one playful detail per visual.** Pick one. One loading bar, OR one pulsing dot, OR one scan line. Not all three.
6. **Inline SVG with hard-coded hex colors.** Must use CSS custom-property tokens so theme swap works.
7. **Clickable elements without a clear hover affordance.** If it's clickable it must look it.
8. **A "legend" explaining color meanings.** If you need a legend, the color isn't doing its job.
9. **Text that repeats what the shape already shows.** An arrow labeled "points to" is noise.
10. **Any motion that can't be disabled by `prefers-reduced-motion`.**

---

## Stuck log protocol

If a concept hits round 5 without WOW:

1. Commit the best-of-5 version behind a `stuck-at-round-5` branch or as a `wip:` commit.
2. Append to `.agent/HANDOFF.md §stuck-log`:
   - Concept name + module
   - Forms tried (which patterns from `patterns.md`)
   - EVAL's specific rejection reasons
   - Proposed unblock (e.g., "concept itself may be wrong shape — needs prose fallback")
3. Flag in next Manu update.

Stuck is data, not failure.

---

## File layout for this skill

```
.claude/skills/ceti-course-visuals/
├── SKILL.md                       (this file)
├── references/
│   ├── rubric.md                  WOW scoring rubric
│   ├── patterns.md                visual-form catalog
│   ├── ref-01-three-eras.svg      canonical comparison grid
│   ├── ref-02-three-failure-modes.svg
│   └── ref-03-prao-loop-animated.html
└── meta-prompts/
    ├── plan.md                    PLAN-phase Opus subagent prompt
    ├── generate.md                GENERATE-phase Opus subagent prompt
    └── eval.md                    EVAL-phase Opus subagent prompt
```

Every file is a hard input to a subagent. Don't inline these into a caller prompt — pass the path + the concept spec; the subagent reads the skill, then produces.
