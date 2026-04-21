# Teaching Patterns — The Arsenal

A complete catalog of interactive shapes for technical training. Each pattern has a clear use case, anatomy, interaction model, and constraints. Pick the pattern, then apply the brand.

**Rule:** one pattern per card. Hybrid patterns are allowed but count as one pattern and must still obey the single-focal-point constraint.

---

## Pattern selection heuristic

```
                     ┌─ one artifact to build?  → Fillable builder
                     ├─ procedure (order matters)? → Timeline or Traced example
                     ├─ loop/cycle? → Animated orbit or Sequential pulse
                     ├─ N parallel concepts? → Comparison grid
                     ├─ wrong vs right? → Failure table or Decision fork
                     ├─ one structure, N phases? → Phase tabs or Storyboard
                     ├─ where things live? → File tree
                     ├─ real command flow? → Terminal replay
                     ├─ habits to commit to? → Checkable stack
                     └─ data + pedagogy mixed? → Scatter flow (hybrid)
```

---

## 1 · Sequential pulse

- **Use when:** teaching a linear process of 3–5 steps where order matters and each step has a clear phase color.
- **Structure:** N horizontal chips with role colors, connected by thin lines. A traveling dot pulses through each connector in sequence.
- **Interaction:** auto-cycles; the active chip lifts and scales. Click any chip to pin (optional).
- **Space:** full-width, ~220–260px tall.
- **Max steps:** 5. More → Timeline.
- **Reference:** `V1SequentialPulse` / `ShadSequentialPulse`.

---

## 2 · Orbital ring

- **Use when:** teaching a feedback loop or cycle that returns to start (PRAO, approval loop, iteration cycle).
- **Structure:** 3–4 nodes positioned on a circle. A dot orbits continuously along the path. Center label shows the currently-active node.
- **Interaction:** auto-animated; no click by default. Pause on hover if the page is busy.
- **Space:** square, 400–520px per side.
- **Max nodes:** 5. More → switch to Timeline.
- **Reference:** `V2OrbitalRing` / `ShadOrbitalRing`.

---

## 3 · Storyboard panel

- **Use when:** one concept maps onto N named phases, each with a **description** the reader needs to dwell on.
- **Structure:** left rail of N clickable phase chips; right panel shows detail for the active phase. Progress dots at the bottom of the right panel.
- **Interaction:** click a chip → right panel cross-fades. Auto-cycle slowly (2.0–2.4s) so readers can read.
- **Space:** full-width, 340–380px tall.
- **Max phases:** 5.
- **Reference:** `V7Storyboard` / `ShadStoryboard`.

---

## 4 · Phase tabs + reveal panel

- **Use when:** one structure maps onto N phases, each with **multiple facets** (role / failure mode / detail) that share a layout.
- **Structure:** N horizontal tabs with per-phase color. Panel below updates on tab switch, showing facets in a grid.
- **Interaction:** tab click → panel cross-fades. No auto-cycle — let the reader drive.
- **Space:** full-width, 360–400px tall.
- **Max tabs:** 5.
- **Reference:** `PPhaseTabs`.

---

## 5 · Comparison grid

- **Use when:** teaching N parallel concepts that share internal structure — eras, tiers, approaches.
- **Structure:** N vertical columns with identical anatomy (label → chip → body). Dashed dividers between columns.
- **Interaction:** click a column to elevate/highlight; others dim to ~55% opacity.
- **Space:** high horizontally, ~320–360px tall. Needs ≥ 520px wide.
- **Max columns:** 3–4.
- **Reference:** `PComparisonGrid` / `ShadComparison`.

---

## 6 · Failure-mode table

- **Use when:** teaching N anti-patterns + corrections (wrong way → trap → right way).
- **Structure:** three text columns, N rows, dashed row separators. Wrong chip in `accent`, right chip in `secondary`.
- **Interaction:** click a row → highlights that row's background; expandable for worked example (optional).
- **Space:** full-width, 60–80px per row + header.
- **Max rows:** 4.
- **Reference:** `PFailureTable` / `ShadFailureTable`.

---

## 7 · Traced example (ordered sequence)

- **Use when:** teaching a procedure where each step has a specific artifact (command, file change, API call).
- **Structure:** vertical ordered list. Each step: phase badge, action description, click-to-reveal artifact in mono font.
- **Interaction:** click to expand/collapse each step. Non-linear exploration allowed.
- **Space:** full-width, 40–60px per step collapsed.
- **Max steps:** 7.
- **Reference:** `PTracedExample`.

---

## 8 · Fillable builder

- **Use when:** the concept IS an artifact the reader will build (CLAUDE.md, slash command, settings).
- **Structure:** two-column split. Left: labeled inputs with hints. Right: live-updating preview of the artifact, syntax-highlighted where relevant.
- **Interaction:** type / select / toggle on the left; the right updates in real-time. Preview is selectable but read-only.
- **Space:** full-width, 320–380px tall. On mobile, preview stacks below.
- **Max fields:** 6.
- **Reference:** `PFillableBuilder`.

---

## 9 · Decision fork

- **Use when:** teaching a judgment call — 2–3 paths with different consequences.
- **Structure:** question → N role-colored buttons. Pick one → that button lifts, others dim, consequence appears below. Reset button to try again.
- **Interaction:** click a button → reveal. Reset clears.
- **Space:** moderate, 320–360px tall.
- **Max choices:** 4. More → Fit-check tree.
- **Reference:** `PDecisionFork`.

---

## 10 · Fit-check tree

- **Use when:** teaching a branching decision with 2–3 paths AND the path's reasoning matters.
- **Structure:** root question → pair of branches with labels. Selected branch's chips light up; unselected dim.
- **Interaction:** auto-cycles between branches (1.6s), or click to pin.
- **Space:** 460×380px.
- **Max branches:** 3.
- **Reference:** `V8DecisionTree` / `ShadFitTree`.

---

## 11 · File tree / anatomy

- **Use when:** showing where things live — project layout, config structure, skill folder shape.
- **Structure:** indented tree with folder/file glyphs, mono font. Key nodes get a role-colored highlight background.
- **Interaction:** hover a row → tooltip shows purpose. Click expands nested content (optional).
- **Space:** moderate, 24–28px per row.
- **Max depth:** 4 levels.
- **Reference:** `PFileTree`.

---

## 12 · Terminal replay

- **Use when:** teaching a real command flow — install, first session, approval loop.
- **Structure:** mac-style terminal chrome (traffic-light dots in role colors). Prompt line, response lines in semantic colors.
- **Interaction:** auto-replays on a loop; optional approve/deny buttons produce outcome states.
- **Space:** full-width, 280–340px tall.
- **Max visible lines:** 12.
- **Reference:** `PTerminalReplay` / `ShadTerminal`.

---

## 13 · Timeline (horizontal N-steps)

- **Use when:** teaching a linear procedure of 4–6 steps — read → plan → execute → summarize.
- **Structure:** N equal-width step cards, numbered circles, connecting arrows. Auto-cycling highlight moves through.
- **Interaction:** hover to pin a step; clicking not required.
- **Space:** full-width, 200–300px tall.
- **Max steps:** 6.
- **Reference:** `PTimeline`.

---

## 14 · Checkable stack

- **Use when:** teaching a set of habits, commitments, or multi-part answers the reader should internalize.
- **Structure:** vertical stack of expandable rows. Each has a number, title, and expandable body. Optional per-row checkbox.
- **Interaction:** click row → expand/collapse. Click checkbox → toggle commitment state (persists in memory, or in localStorage).
- **Space:** 60–90px per row collapsed.
- **Max items:** 6.
- **Reference:** `PCheckableStack` / `ShadCheckList`.

---

## 15 · Session boundary

- **Use when:** teaching persistence boundaries — what survives a session vs. what doesn't.
- **Structure:** two containers. Outer: solid-border card (persistent). Inner: dashed-border "session" box holding ephemeral chips.
- **Interaction:** the "evaporates" label pulses subtly; no click needed.
- **Space:** 400–480px wide, 260–320px tall.
- **Reference:** `V3SessionBoundary` / `ShadSessionBoundary`.

---

## 16 · Tradeoff matrix

- **Use when:** comparing two approaches across N dimensions.
- **Structure:** two headers (role-colored chips), N rows each with a central label column and left/right values. Dashed row separators.
- **Interaction:** optional alternating header emphasis. Otherwise static.
- **Space:** full-width, 80px header + 40px per row.
- **Max rows:** 6.
- **Reference:** `V4TradeoffMatrix` / `ShadTradeoffMatrix`.

---

## 17 · Scatter flow (hybrid)

- **Use when:** teaching which items in a set "fit" a pattern, AND why — using a 2D axis for positioning + a flow for sequencing.
- **Structure:** points scattered on an effort×fit scatter plot. A dashed animated path connects only the "fit" items; a traveling dot moves along the path.
- **Interaction:** auto-animated; hover a point for detail (optional).
- **Space:** 560×380px minimum.
- **Max points:** 8.
- **Reference:** `V5ScatterFlow`.

---

## 18 · Three-moves terminal (hybrid)

- **Use when:** the concept IS "it's only three moves" — read, plan, execute.
- **Structure:** three phase-stamp chips in a row, then three lines of terminal dialogue below. Stamps and lines reveal in sequence; active line has a blinking cursor.
- **Interaction:** auto-cycles 3 phases at 2.4s intervals.
- **Space:** 460×380px.
- **Reference:** `V6ThreeMoves`.

---

## Hybrids that work

Some pairs compose cleanly. Others don't. Tested combos:

| Combo | Works because |
|---|---|
| Comparison grid + orbit | Each column is an era, each era gets its own mini-orbit at different complexity |
| Phase tabs + timeline | Tab per domain, each tab reveals that domain's read→plan→execute timeline |
| Fillable builder + terminal | Reader builds a CLAUDE.md; click "run" → terminal shows Claude reading it |
| Scatter + flow (built-in) | See pattern 17 |
| Three-moves + terminal (built-in) | See pattern 18 |

**Don't try:**
- Orbit + scatter (two circular motifs compete)
- Decision fork + phase tabs (two attention-grabbers)
- Comparison grid + failure table (same visual weight, reader's eye bounces)

---

## Spacing & sizing cheatsheet

| Pattern | Min width | Typical height | Focal count |
|---|---|---|---|
| Sequential pulse | 680 | 220 | 4 chips + 3 arrows |
| Orbital ring | 400 | 400 | 4 nodes + center |
| Storyboard | 560 | 360 | 4 rail + 1 panel |
| Phase tabs | 480 | 380 | 4 tabs + panel |
| Comparison grid | 520 | 340 | 3 columns |
| Failure table | 480 | 60/row | 4 rows max |
| Traced example | 440 | 50/step | 7 steps max |
| Fillable builder | 520 | 340 | 2 columns |
| Decision fork | 400 | 340 | 2 buttons + reveal |
| Fit-check tree | 460 | 380 | 2 branches × 2 |
| File tree | 440 | 28/row | 10 rows max |
| Terminal replay | 460 | 320 | chrome + body |
| Timeline | 560 | 240 | 5 steps |
| Checkable stack | 420 | 80/row | 6 items max |
| Session boundary | 400 | 280 | 2 boxes |
| Tradeoff matrix | 520 | 320 | 2 cols × 4 rows |
| Scatter flow | 560 | 380 | 6–8 points |
| Three-moves terminal | 460 | 380 | 3 stamps + 3 lines |

---

## Writing copy for patterns

- **Titles:** Fraunces 300 italic. Max 6 words. Sentence case.
- **Captions:** DM Sans 400 italic. Max 12 words. Sentence case.
- **Chip labels:** 1–2 words. Lowercase for commands (`read`, `plan`), Capitalized for concepts (`Perceive`).
- **Step descriptions:** imperative, present tense. "read every file" not "reading every file".
- **Artifact text:** monospace, show the real thing verbatim. Don't paraphrase commands.
- **Numbers:** use real numbers if they're part of the story (`+ 34 lines`, `$4,200`). Avoid fake "lorem-ipsum" data.
