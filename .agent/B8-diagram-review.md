# B8 — Diagram Quality Review
Reviewed: 70 diagrams across 14 modules, 2026-04-21

**Scope**: 14 hero components (`app/components/course/lesson/M<NN>Hero.vue`) + 56 mid-lesson wrappers (`app/components/course/diagrams/m<NN>-d<1..4>.vue`). `M01HeroA/B`, `M02HeroA/B`, `M03HeroA/B`, `M04HeroA` exist on disk but are **not wired** into `app/pages/start/[slug].vue` (the renderer's `heroMap` only references the non-suffixed heroes). They are noted below but not rated as live.

**Method**: read `diagrams/index.ts` for the registry, grepped every diagram for its pattern import, collected every `title:` / `caption:` pair for pedagogical context, and spot-checked the pattern source for `prefers-reduced-motion` and Fraunces usage. No prose markdown was opened. No component was modified.

## Verdict distribution
| Verdict | Count |
|---|---|
| KEEP  (landing well) | 58 |
| TWEAK (minor fix) | 10 |
| SWAP  (wrong pattern for concept) | 2 |

Total: 70.

## Per-module findings

### M01 — Mental Model ("You already have AI. You're just using it wrong.")
- **Hero** (`M01Hero.vue`, ComparisonGrid): **KEEP** — vending-machine vs colleague is the module's thesis; ComparisonGrid is the canonical shape for two parallel concepts.
- **d1** (`m01-d1.vue`, OrbitalRing): **KEEP** — "The copy-paste loop, every task, four steps" is literally a cycle. OrbitalRing is exactly right.
- **d2** (`m01-d2.vue`, TradeoffMatrix): **KEEP** — "What changes, dimension by dimension" is the textbook TradeoffMatrix use; the only module that uses this pattern, good variety.
- **d3** (`m01-d3.vue`, FileTree): **KEEP** — "Where your work actually lives" = anatomy, fits FileTree.
- **d4** (`m01-d4.vue`, DecisionFork): **TWEAK** — "Which task will you bring to Module 06?" is a pick-your-own prompt, not a binary judgment. DecisionFork works but copy needs to clarify that every branch is acceptable (unlike most DecisionFork uses in this course where one branch is "right"). Consider making the branch outcomes visibly equal.

(HeroA/HeroB variants exist; not live.)

### M02 — Install ("Install Claude Code")
- **Hero** (`M02Hero.vue`, Timeline): **KEEP** — install is a linear 4–6 step sequence; Timeline is the right shape.
- **d1** (`m02-d1.vue`, DecisionFork): **KEEP** — OS fork (Mac / Windows / Linux) is a genuine branch point.
- **d2** (`m02-d2.vue`, PhaseTabs): **KEEP** — "Same install, three terminals" = one concept × three OS facets, exactly PhaseTabs' use case.
- **d3** (`m02-d3.vue`, TerminalReplay): **KEEP** — real command flow, fits perfectly.
- **d4** (`m02-d4.vue`, CheckableStack): **KEEP** — install-completion habits, standard close.

(HeroA/HeroB variants exist; not live.)

### M03 — First session ("Your first real session")
- **Hero** (`M03Hero.vue`, TerminalReplay): **KEEP** — opening a scoped session IS a real command flow.
- **d1** (`m03-d1.vue`, FileTree): **KEEP** — "Scope is everything / green = start here, red = too big" is annotated anatomy.
- **d2** (`m03-d2.vue`, Storyboard): **KEEP** — "Four clicks. Thirty seconds." is a narrative of a concrete action across four named phases. Storyboard lands.
- **d3** (`m03-d3.vue`, SessionBoundary): **KEEP** — "Folder persists. Session evaporates." is literally what SessionBoundary was built for.
- **d4** (`m03-d4.vue`, CheckableStack): **KEEP** — habits, standard.

(HeroA/HeroB variants exist; not live.)

### M04 — File permissions ("Files, permissions, and undo")
- **Hero** (`M04Hero.vue`, TerminalReplay): **KEEP** — the approve/deny flow is a real terminal exchange.
- **d1** (`m04-d1.vue`, SequentialPulse): **KEEP** — "The approval loop — five steps, step 3 is the safety gate" is a 5-phase sequence; SequentialPulse fits.
- **d2** (`m04-d2.vue`, PhaseTabs): **KEEP** — "Three permission modes — same facets, different gear" is the exact PhaseTabs contract (N tabs × shared facets).
- **d3** (`m04-d3.vue`, DecisionFork): **KEEP** — approve / deny / narrow is a true 3-way branch.
- **d4** (`m04-d4.vue`, FailureTable): **KEEP** — "Approval anti-patterns" is textbook FailureTable.

(HeroA variant exists; not live.)

### M05 — CLAUDE.md ("write it once, stop explaining yourself")
- **Hero** (`M05Hero.vue`, FillableBuilder): **KEEP** — FillableBuilder is explicitly designed for "the concept IS an artifact" (CLAUDE.md is the module's artifact).
- **d1** (`m05-d1.vue`, FileTree): **KEEP** — "Where the file sits" = anatomy.
- **d2** (`m05-d2.vue`, CheckableStack): **TWEAK** — "The four axes / Who am I / What is this folder for / conventions / readers" is conceptually a framework, not a habit list. CheckableStack works but these are prompts to answer, not actions to tick. Consider whether `Storyboard` (four named phases of drafting) would teach the drafting rhythm better; KEEP if authoring time is a constraint.
- **d3** (`m05-d3.vue`, FailureTable): **KEEP** — "Three ways people ruin a good CLAUDE.md" is canonical.
- **d4** (`m05-d4.vue`, ComparisonGrid): **KEEP** — "Two shapes. Only one works." is two parallel concepts side-by-side.

### M06 — Real use case ("This is the one. Pick the task you mildly dread.")
- **Hero** (`M06Hero.vue`, Storyboard): **KEEP** — Read / Plan / Execute mapped across the module's one chosen task is Storyboard's purpose.
- **d1** (`m06-d1.vue`, ThreeMovesTerminal): **KEEP** — the module's whole thesis ("Three moves. Every task.") literally named a dedicated pattern. Perfect fit.
- **d2** (`m06-d2.vue`, DecisionFork): **KEEP** — "An approval prompt appears, pick one" is binary+ judgment.
- **d3** (`m06-d3.vue`, FailureTable): **KEEP** — "Three traps during execution."
- **d4** (`m06-d4.vue`, CheckableStack): **KEEP** — "Four habits that multiply."

### M07 — Slash commands
- **Hero** (`M07Hero.vue`, FillableBuilder): **KEEP** — a slash command IS an artifact you fill in.
- **d1** (`m07-d1.vue`, FileTree): **KEEP** — "Where slash commands live" = anatomy.
- **d2** (`m07-d2.vue`, TracedExample): **KEEP** — "Build /morning in four moves, every one verbatim" is TracedExample's exact contract.
- **d3** (`m07-d3.vue`, CheckableStack): **KEEP** — "Naming rules that age well" (Tap to expand, tick when habit) is both checklist and reveal-on-tap, which CheckableStack supports.
- **d4** (`m07-d4.vue`, FailureTable): **KEEP** — "Where new authors slip."

### M08 — Skills
- **Hero** (`M08Hero.vue`, ComparisonGrid): **TWEAK** — M08 is about what a skill IS; the hero compares skill concepts across columns. Works, but ComparisonGrid is also M01's hero and M13's hero — consider whether `FillableBuilder` (since a skill is also "an artifact on disk") would distinguish this module. Low priority; this is variety concern, not pedagogy.
- **d1** (`m08-d1.vue`, FileTree): **KEEP** — "Anatomy of a skill folder" is literally FileTree's job.
- **d2** (`m08-d2.vue`, SequentialPulse): **KEEP** — "How a skill triggers itself" describes phases of matching; SequentialPulse fits.
- **d3** (`m08-d3.vue`, TracedExample): **KEEP** — "Write a SKILL.md that loads — click to reveal each artifact" is TracedExample by the book.
- **d4** (`m08-d4.vue`, FailureTable): **KEEP** — "Why a skill never loads."

### M09 — Plan mode
- **Hero** (`M09Hero.vue`, ThreeMovesTerminal): **TWEAK** — reuses M06's hero pattern; the module is about plan-mode specifically, not the read/plan/execute rhythm. Consider `SequentialPulse` for the four-stamp plan flow, or `SessionBoundary` (plan vs execute as phases). Works but shares visual identity with M06's hero.
- **d1** (`m09-d1.vue`, SequentialPulse): **KEEP** — "Four stamps. Nothing mutates until the third clears." is a 4-phase role-coded sequence.
- **d2** (`m09-d2.vue`, DecisionFork): **KEEP** — "You have three moves, not two" is a 3-way fork. Good.
- **d3** (`m09-d3.vue`, FailureTable): **KEEP** — "When plan mode earns its keep" with trap column = FailureTable contract.
- **d4** (`m09-d4.vue`, TracedExample): **KEEP** — "A plan, redirected — same task, one step off" is a walked-through artifact.

### M10 — Hooks
- **Hero** (`M10Hero.vue`, PhaseTabs): **KEEP** — PreToolUse / PostToolUse / Stop are three lifecycle phases, each with the same facets. PhaseTabs is the right call. Only module using PhaseTabs as hero — good variety.
- **d1** (`m10-d1.vue`, FileTree): **KEEP** — where hook scripts live.
- **d2** (`m10-d2.vue`, TracedExample): **KEEP** — "A hook firing, step by step" with artifacts.
- **d3** (`m10-d3.vue`, DecisionFork): **KEEP** — hook routing decisions.
- **d4** (`m10-d4.vue`, FailureTable): **KEEP** — "How first hooks go wrong."

### M11 — MCP basics
- **Hero** (`M11Hero.vue`, OrbitalRing): **TWEAK** — MCP is a protocol, not a loop. OrbitalRing puts the PRAO cycle at module-hero level, but the module also contains `m11-d2` which is also the PRAO loop (SequentialPulse). Semantic overlap between hero and d2. Consider making hero `ComparisonGrid` ("Gmail / Calendar / Notion — same three primitives") since `m11-d1` already plays that role… or keep hero and swap `m11-d1`. Flagging as redundancy, not pattern mismatch.
- **d1** (`m11-d1.vue`, ComparisonGrid): **KEEP** — "Three primitives, one protocol — click a column to focus" = N parallel concepts, canonical.
- **d2** (`m11-d2.vue`, SequentialPulse): **KEEP** — "The PRAO loop, one turn at a time — four phases" is a role-coded sequence.
- **d3** (`m11-d3.vue`, TracedExample): **KEEP** — "One Gmail call, four phases — tap to see the artifact" is pure TracedExample.
- **d4** (`m11-d4.vue`, FailureTable): **KEEP** — "MCP installs — where first sessions go wrong."

### M12 — Git integration
- **Hero** (`M12Hero.vue`, Timeline): **KEEP** — commits → branches → PR is a linear history sequence; Timeline fits.
- **d1** (`m12-d1.vue`, TracedExample): **KEEP** — walked-through git example.
- **d2** (`m12-d2.vue`, DecisionFork): **KEEP** — "Push now, or open a draft PR?" is a genuine 2-way fork.
- **d3** (`m12-d3.vue`, FailureTable): **KEEP** — "What to never let Claude do" = classic FailureTable.
- **d4** (`m12-d4.vue`, CheckableStack): **KEEP** — "Read the commit out loud — the five-check pass" = tickable checklist.

### M13 — Subagents
- **Hero** (`M13Hero.vue`, ComparisonGrid): **TWEAK** — third ComparisonGrid hero in the course (after M01, M08). The module's thesis is "context boundary + delegation," which M13-d1 (SessionBoundary) already teaches beautifully; consider promoting that shape to hero or using `OrbitalRing` for the spawn → work → return cycle.
- **d1** (`m13-d1.vue`, SessionBoundary): **KEEP** — "Where the detail lives / main session keeps the summary" is exactly SessionBoundary.
- **d2** (`m13-d2.vue`, DecisionFork): **KEEP** — "Spawn, or stay?" is a clean binary judgment.
- **d3** (`m13-d3.vue`, ScatterFlow): **SWAP → `TradeoffMatrix`** — caption: "High independence + heavy reading = delegate. Low + light = stay." This IS a 2D scatter on paper, but ScatterFlow is space-constrained (labels ≤ 12 chars) and "stay in main" / "delegate" / independence / reading are structurally long labels that will clip at 375px mobile. TradeoffMatrix natively supports two approaches × N dimensions with roomier rows. ScatterFlow is also the ONLY appearance in 70 diagrams — if it stays, it stays as a one-off, which is fine pedagogy but adds cognitive load for no return. See priority list below.
- **d4** (`m13-d4.vue`, FailureTable): **KEEP** — "Where delegation backfires."

### M14 — Next steps
- **Hero** (`M14Hero.vue`, CheckableStack): **SWAP → `Timeline`** — "Next steps / habits" as CheckableStack is conceptually correct, but (a) CheckableStack is also used in four other modules as d-slot, (b) the course finale deserves more visual weight than a check-off list, and (c) `m14-d1` (Timeline: "The week after this course — three sessions") would be a stronger *finale* as hero, promoting narrative closure over a chore list. Alternatively `Storyboard` (three named "after the course" phases). Pattern also collides with five d-slot CheckableStack instances across the course — the final hero shouldn't feel like another habits card.
- **d1** (`m14-d1.vue`, Timeline): **KEEP** — "The week after this course — three sessions / seven days" is a linear timeline.
- **d2** (`m14-d2.vue`, ComparisonGrid): **KEEP** — "If you want more — click a column to focus" is tier comparison.
- **d3** (`m14-d3.vue`, TracedExample): **KEEP** — "Close the loop with yourself — five prompts."
- **d4** (`m14-d4.vue`, FailureTable): **TWEAK** — "How installs age out — four regressions and the habit that blocks each." Fits FailureTable, but M14 already has a CheckableStack hero and a Timeline d1 plus a ComparisonGrid d2 — a fifth module-ending FailureTable feels formulaic (10 modules end with FailureTable as d4). Copy is sharp; pattern choice is the issue. Consider `TradeoffMatrix` (regression × habit) to give the module's closing diagram a distinct silhouette.

## Priority replacement list (SWAP first, then TWEAK)

1. **`m13-d3.vue` — swap ScatterFlow → TradeoffMatrix.** Caption already describes a 2-axis comparison between "delegate" and "stay in main" across independence and reading-cost. TradeoffMatrix will render at 375px without clipping. It also eliminates the one-off pattern use, returning M13 to the course's pattern vocabulary.

2. **`M14Hero.vue` — swap CheckableStack → Timeline (or Storyboard).** The course's final hero should carry narrative weight, not read as a to-do list. Timeline ("Week 1 / Week 2 / ongoing") makes the "three sessions in seven days = habit" argument the module opens with. CheckableStack is already overused in d-slots (5 appearances); promoting a fresher pattern to the hero frees that visual for `m14-d1` to also become something else (or stay).

3. **`M13Hero.vue` — tweak ComparisonGrid → OrbitalRing or SessionBoundary.** Third ComparisonGrid hero (M01, M08, M13); the module is about a spawn→work→return cycle, which is OrbitalRing's exact contract.

4. **`M09Hero.vue` — tweak ThreeMovesTerminal → SequentialPulse.** ThreeMovesTerminal is M06's hero already. Plan mode's four-stamp pipeline (`m09-d1`'s thesis) as the hero is a stronger opener.

5. **`m05-d2.vue` — tweak CheckableStack → Storyboard.** "The four axes" of drafting CLAUDE.md are questions to answer in sequence, not actions to tick. Storyboard ("four phases of drafting") would teach the *rhythm* of filling the file in.

6. **`m01-d4.vue` — tweak DecisionFork copy.** The pattern works, but every branch is a valid pick. Adjust branch visuals so no option looks "correct" — readers should feel permission to pick any.

7. **`M11Hero.vue` — tweak to resolve overlap with `m11-d2`.** Hero=OrbitalRing and d2=SequentialPulse both depict the PRAO loop. Either: (a) keep hero, swap d2 to `TracedExample` for a concrete PRAO walk-through (but d3 already does that), or (b) swap hero to ComparisonGrid and compare MCP servers (Gmail / Calendar / Notion) at module-opener scale.

8. **`m14-d4.vue` — tweak FailureTable → TradeoffMatrix.** 10 modules end in FailureTable as their d4. For the course's final diagram, a 2D regression × habit matrix would read as "earned wisdom," not another warning table.

9. **`M08Hero.vue` — tweak ComparisonGrid → FillableBuilder.** A skill IS an artifact; FillableBuilder is the pattern library's answer for artifact modules (M05, M07 use it). Would match M08's concept and further differentiate from M01 and M13 heroes.

10. **`m07-d3.vue` — tweak CheckableStack.** Works, but "tap to expand, tick when habit" is doing two things. Consider whether `Storyboard` (naming rules walked through as phases) fits the teach-the-rhythm goal.

## Patterns underused / overused

- **Overused: `FailureTable`** — appears in **11 of 14 modules** (M04, M05, M06, M07, M08, M09, M10, M11, M12, M13, M14), all in d4 slot. Pedagogically motivated ("every module ends on anti-patterns") but visually the course closes every module with the same silhouette. Consider rotating one or two to `TradeoffMatrix` (regression × counter-habit) or `Storyboard` (walked-through failure recovery). Specific swaps suggested: `m14-d4` (priority 8 above).

- **Overused: `DecisionFork`** — 8 of 14 modules (M01, M02, M04, M06, M09, M10, M12, M13). Mostly in d-slot mid-module. Fine individually; the concern is when a module has DecisionFork in d2 AND the hero reads as a decision (M13 hero feels fork-y next to m13-d2). Not a blocker.

- **Overused: `CheckableStack`** — 7 modules (M02, M03, M05, M06, M07, M12, M14) plus M14's hero. When a reader finishes M06 with CheckableStack d4 and opens M07 to find CheckableStack d3 inside two modules, the shape blurs. Promoting `M14Hero.vue` off CheckableStack (priority 2 above) reclaims the pattern's punch.

- **Overused: `FileTree`** — 7 appearances (M01-d3, M03-d1, M05-d1, M07-d1, M08-d1, M10-d1). "Where X lives" as d1 is a course convention; that's fine. Only flagging as a stylistic note.

- **Underused: `FitTree` — 0 appearances.** The pattern exists and is imported nowhere. If branching decisions deepen (e.g. a module-06 "pick your task → pick the shape of the answer" flow), FitTree would carry that. Current diagrams may not need it, but it is dead inventory in the library.

- **Underused: `ScatterFlow` — 1 appearance (`m13-d3`).** If the SWAP in priority 1 ships, ScatterFlow goes to zero. That's acceptable — the pattern's label-length constraint (≤ 12 chars) makes it structurally hard to use well in a Bronze course.

- **Underused: `Timeline` — 3 appearances.** Good use in M02Hero (install steps), M12Hero (git history), `m14-d1` (the week after). Solid pedagogical fit each time; not flagging.

- **Underused: `TradeoffMatrix` — 1 appearance (`m01-d2`).** Worth adding one or two more, since its silhouette is distinct from ComparisonGrid and it handles 2×N dimensions better than ScatterFlow. Candidates: `m13-d3` (priority 1), `m14-d4` (priority 8).

- **Underused: `Storyboard` — 2 appearances (M06Hero, `m03-d2`).** Carries narrative weight that CheckableStack lacks. Candidates for promotion: `m05-d2`, `M14Hero`, `m07-d3`.

- **Underused: `OrbitalRing` — 2 appearances (`m01-d1`, M11Hero).** Good pattern for cycles; could land as M13Hero (priority 3).

## Risks / debt spotted but not rated

- **Hero A/B variants are orphans.** `M01HeroA.vue`, `M01HeroB.vue`, `M02HeroA/B`, `M03HeroA/B`, `M04HeroA.vue` exist but `app/pages/start/[slug].vue` (lines 215–230) only maps the non-suffixed heroes. Either wire them into a visual-A/B toggle or delete them — otherwise translators, reviewers, and future agents will spend cycles reading dead code. Not a diagram quality issue; a repo-hygiene issue.

- **`m13-d3` ScatterFlow at mobile.** Even without swapping, the labels "high independence" / "low independence" / "heavy reading" / "light reading" will wrap awkwardly at 375px inside the ScatterFlow's 4-quadrant layout. Worth a 375px visual check independent of pattern swap.

- **No component uses `ScatterFlow`, `FitTree`, `FillableBuilder` more than twice.** Low-volume patterns risk getting stylistically drift-y — a single future edit can make them feel inconsistent with the rest of the course. When swapping `m13-d3` off ScatterFlow, deleting ScatterFlow from the library is worth considering.

- **Fraunces 300 italic**: enforced globally via `--font-display` in `app/assets/css/main.css:23` with a `.display-italic` selector at line 382. 16 of 18 patterns reference `prefers-reduced-motion`; `FileTree` and `FillableBuilder` do not — likely because neither animates, but worth confirming the shared `DiagramShell` handles motion at the wrapper level.

- **`FailureTable` as d4 convention** is a strong pedagogical frame ("every lesson ends on anti-patterns"). The overuse call above is visual-rhythm, not pedagogical. Any swap that keeps the "failure modes" teaching intent (e.g. TradeoffMatrix with the trap column, Storyboard walking through a recovery) preserves the course's closing teaching beat.

- **No raw hex in diagrams verified.** Two grep hits in `M03Hero.vue` and `M04Hero.vue` ("invoice #441") are quoted text content, not CSS hex — rubric rule 1 passes across all 70 diagrams.

- **No emoji inside diagram nodes verified** by spot-reading representative files across patterns. Rubric rule 2 passes.
