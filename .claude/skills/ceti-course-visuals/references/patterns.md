# Visual-form catalog

Eleven visual forms. One per concept, or a hybrid of two at most. PLAN must consider ≥ 3 before choosing.

Each entry: **when to use · structure · interaction · reference file · space cost**.

---

## 1 · Comparison grid

- **Use when:** teaching N parallel concepts that share structure — eras, tiers, approaches, before/after.
- **Structure:** N vertical columns. Each column has identical internal anatomy (e.g., actor → arrow → receiver → caption). Divider lines between columns.
- **Interaction:** click any column to elevate/highlight; click any inner node to reveal its role.
- **Reference:** `ref-01-three-eras.svg`.
- **Space:** high horizontally, moderate vertically. Needs ≥ 680px width.
- **Max columns:** 3–4. More → switch to table form.

---

## 2 · Failure-mode table

- **Use when:** teaching N anti-patterns + corrections. Each row is `wrong way → the trap → right way`.
- **Structure:** three text columns, N rows, dashed row separators. Row-header chip in failure-color; correction chip in success-color.
- **Interaction:** click a row → expand with a worked example of the correction in action.
- **Reference:** `ref-02-three-failure-modes.svg`.
- **Space:** moderate. Works at 680px wide, scales down stacked on mobile.
- **Max rows:** 4. More → break into two tables.

---

## 3 · Animated orbit / cycle

- **Use when:** teaching a feedback loop, cycle, or system that returns to start — PRAO, approval loop, iteration cycle.
- **Structure:** 3–4 nodes positioned on a circle. Flow-animated dashed arcs between them (stroke-dashoffset animation). Optional center label with the system name.
- **Interaction:** click any node → dims others, shows that node's detail; animation pauses on focus.
- **Reference:** `ref-03-prao-loop-animated.html`.
- **Space:** square. ~400–500px per side.
- **Max nodes:** 5. More → switch to timeline.

---

## 4 · Phase tabs + reveal panel

- **Use when:** one structure maps onto N named phases, and each phase has multiple facets (description / role / failure mode).
- **Structure:** N horizontal clickable tabs with per-phase color. Dynamic panel below updates on selection. Optional traced-example list underneath.
- **Interaction:** tab click → panel cross-fades; trace-step click → detail reveals.
- **Reference:** existing `app/components/course/PraoLoop.vue`.
- **Space:** full-width, 400–600px tall.
- **Max tabs:** 5. More → switch to stacked reveal.

---

## 5 · Traced example (ordered sequence)

- **Use when:** teaching a procedure where the order matters and each step has a specific artifact (command, file change, API call).
- **Structure:** vertical ordered list. Each step has a phase-badge (colored), an action description, and a click-to-reveal detail (the literal artifact).
- **Interaction:** click-to-reveal per step. Steps are independent — reader can explore non-linearly.
- **Reference:** `PraoLoop.vue` trace-steps section.
- **Space:** full-width, 40–60px per step.
- **Max steps:** 7. More → split into phases.

---

## 6 · Fillable builder

- **Use when:** the concept IS an artifact the reader will build (CLAUDE.md, slash command, skill.md, settings.json).
- **Structure:** left: N input fields with hint text. Right: live preview of the resulting artifact with syntax highlighting. Reader types → preview updates.
- **Interaction:** type / select / toggle on inputs; preview is read-only but selectable.
- **Reference:** *none yet — first deployment will set the pattern.*
- **Space:** full-width, ~500–700px tall. On mobile, preview moves below inputs.
- **Max fields:** 6. More → multi-step builder.

---

## 7 · Decision fork

- **Use when:** teaching a judgment call — two or more paths with different consequences.
- **Structure:** question → N buttons → selected button elevates, other buttons dim + disabled. Reveal shows consequence of that choice.
- **Interaction:** click a button → reveal. Reset button to try another.
- **Reference:** existing `app/components/course/ForkChoice.vue`.
- **Space:** moderate. 400–500px tall.
- **Max choices:** 4. More → decision tree instead.

---

## 8 · File tree / system anatomy

- **Use when:** showing where things live — project layout, config structure, skill folder shape.
- **Structure:** indented tree with folder/file icons and inline descriptions. Terminal-mono font. Hoverable nodes.
- **Interaction:** hover → description tooltip; click a file → expand inline with a preview of its contents (short).
- **Reference:** `RAVEN/raven-skills-course/modules/01-what-is-a-skill.html` (`.file-tree` class).
- **Space:** moderate. Scales with depth.
- **Max depth:** 4 levels. Deeper → collapsible nodes.

---

## 9 · Terminal replay

- **Use when:** teaching a real command flow — install, first session, approval loop.
- **Structure:** fake terminal chrome (mac-style dots, title bar, dir indicator). Typed prompt with per-char jitter, response lines with semantic color (prompt / out / ok / warn / meta).
- **Interaction:** replay button restarts; approve/deny buttons (for approval variants) produce outcome states.
- **References:** `TerminalDemo.vue`, `ApprovalSim.vue`.
- **Space:** full-width, 300–500px tall.
- **Max lines visible at once:** 12. More → scroll internally.

---

## 10 · Timeline (horizontal N-steps)

- **Use when:** teaching a linear process — read → plan → execute.
- **Structure:** N horizontal step cards with numbered nodes, connecting arrows, optional code asides per step. Auto-cycling highlight (pauses on hover).
- **Interaction:** hover a step → it activates; optional click-to-pin.
- **Reference:** existing `app/components/course/ProcessFlow.vue`.
- **Space:** full-width, 200–300px tall.
- **Max steps:** 5. More → break into phases.

---

## 11 · Checkable stack

- **Use when:** teaching a set of habits, checklist items, or multi-part answers that the reader should commit to.
- **Structure:** vertical stack of expandable cards. Each has a number, label, summary. Expand shows body + optional code snippet. Optional checkbox per card for commitment state.
- **Interaction:** click card → expand; click checkbox → commit state (persists in-memory).
- **Reference:** existing `app/components/course/StackedReveal.vue`.
- **Space:** full-width, 60–100px per card.
- **Max cards:** 6. More → split into sections.

---

## Hybrid patterns (combine two forms)

- **Comparison grid + orbit.** Three eras, each era's AI represented as a mini-orbit at different complexities. (Risky — only if space allows.)
- **Tabs + timeline.** One tab per domain (Creator / Consultant / ...), each tab reveals that domain's read→plan→execute timeline.
- **Fillable builder + terminal replay.** Reader builds a CLAUDE.md; click "run" → terminal shows Claude reading it and responding differently than without it.

Hybrids count as one visual and must still fit space + focal-point constraints.

---

## When none of these fit

Flag it in `HANDOFF.md §stuck-log`. Don't invent a new form unless the concept genuinely demands one. The catalog exists so that visual forms become *learned vocabulary* across the academy — the reader by Module 06 already knows how to read a comparison grid and a traced example, and the Module 11 PRAO loop doesn't have to re-teach "click a tab to see the panel." Reusing forms is a feature.

If a new form is genuinely needed, add it here + one reference implementation, and note the add in HANDOFF.
