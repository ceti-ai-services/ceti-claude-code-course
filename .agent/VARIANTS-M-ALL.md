# Module interactive variants — proposals for sibling-agent evaluation

**Context.** Revision pass closing the feedback captured in `.agent/FEEDBACK-LOG.md` (2026-04-19). Manu asked for TWO interactive variants per module; a sibling agent picks the winner per module on five criteria (pedagogical clarity, interactivity depth, visual polish, animation quality, mission-vibe fit). Winners are then wired into `app/pages/start/[slug].vue` as a per-slug "lesson hero" slot above the markdown blocks.

## Available primitives (all new, all in `app/components/course/`)

1. **`MissionBrief.vue`** — hero card with "Transmission · codename" radio icon, staggered line reveal, scanning highlight sweep, objective chips. Replaces static intro paragraph; gives every lesson a mission-briefing top.
2. **`ProcessFlow.vue`** — horizontal multi-step timeline. Steps auto-highlight on a cycle (pausable on hover/focus). Connecting arrows light up with active state. Supports optional code asides per step.
3. **`BeforeAfter.vue`** — A/B comparison card with pill tabs. Panels cross-fade + blur-dissolve with small translate so the transition feels like "reveal through the seam" rather than tab-swap. Per-side bullets supported.
4. **`TerminalDemo.vue`** — fake terminal with macOS-style chrome dots, title bar, dir indicator, and typed output (per-character type, small jitter). Line kinds: `prompt`, `out`, `ok`, `warn`, `meta`. Replayable.
5. **`StackedReveal.vue`** — expandable card stack. Each card has a number, label, one-line summary; body opens inline on tap. Optional checkbox state per card (for habit commitment).

All five honor `prefers-reduced-motion`. All five compose existing shadcn primitives (Card, Button, Badge) and palette tokens (`--color-gold`, `--color-gold-dim`, `--ease-out-spring`).

---

## Eval criteria (shared across modules)

1. **Pedagogical clarity** — does the interaction illuminate the one idea of the module, or compete with it?
2. **Interactivity depth** — does the reader *do* something, or just watch something?
3. **Visual polish** — does it feel crafted, or decorated?
4. **Animation quality** — purposeful, not gratuitous; honors reduced-motion.
5. **Mission-vibe fit** — operator's voice, calm confidence, no hype. Feels like a briefing, not a pep rally.

For each module, write the winner ("A" or "B") and a one-paragraph rationale citing at least two of the five criteria.

---

## M01 — Mental Model · "You already have AI. You're just using it wrong."

**One idea.** Claude Code is the same Claude you use in the browser, in a shape that can see your files. Vending machine vs. colleague.

### Variant A — `MissionBrief` + `BeforeAfter`
- Brief codename: `M01 · MENTAL MODEL`. Analogy subtitle: *"Same model. Different shape."*
- Objective chips: `Reframe what AI is`, `Spot the copy-paste tax`, `Name the shift`.
- Below: `BeforeAfter` titled **The shift**. 
  - Before (label `Vending machine`): *"You prompt. It replies. You do the rest."* + bullets: *Lives on a website*, *Can't see your files*, *Forgets every turn*, *Half the work happens in your head after*.
  - After (label `Colleague`): *"You work. It works. You approve."* + bullets: *Lives in your folder*, *Reads the real files*, *Keeps context in one session*, *Does the boring half; you do the part that needs you*.

### Variant B — `MissionBrief` + `ProcessFlow` (dual)
- Same hero brief.
- Two stacked `ProcessFlow`s back to back:
  - **Old flow**: `Open chat → Paste context → Copy reply → Rework → Ship` (5 steps)
  - **New flow**: `Open folder → Ask → Approve edits → Ship` (4 steps)
- Reader sees the shape of the two workflows side by side; the shorter "new" flow is visually obvious.

---

## M02 — Install · "Install Claude Code"

**One idea.** The install is the same `npm install -g` command everywhere. The hard part is getting to a working terminal, which differs by OS.

### Variant A — `MissionBrief` + shadcn `Tabs` (Mac / Windows / Linux), each tab contains a `TerminalDemo`
- Mission brief: *"Different launch pads. Same install command."*
- Three-tab `Tabs` (Mac/Windows/Linux). Each tab's `TerminalDemo` shows the full flow: `node --version` → `npm install -g @anthropic-ai/claude-code` → `claude` → first-launch screen. Typed in real time (~5 seconds). Replay button.

### Variant B — `MissionBrief` + `ProcessFlow` (Check Node → Install → Launch → Auth)
- Same hero.
- Four-step `ProcessFlow` — OS-agnostic, with one small embedded `TerminalDemo` below showing the canonical install. Less per-OS detail, more "shape of the flow" clarity.

---

## M03 — First Session · "Your first real session. Not a hello. A useful answer."

**One idea.** Scope is everything. The folder you launch Claude in IS the universe of the session.

### Variant A — `MissionBrief` + `TerminalDemo` (first-scope exchange)
- Brief: *"Pick your universe. Then ask."*
- `TerminalDemo` titled `first-session`, dir `~/Clients/Meridian/`, shows the exchange:
  - `prompt`: `what's in this folder and what is it for?`
  - `out`: `Reading 14 files…  Most look like an active brand engagement for Meridian Foods…`
  - `prompt`: `group those by status`
  - `out`: *(three-line summary)*
  - `meta`: *`(session continues — scope is the folder you launched from)`*

### Variant B — `MissionBrief` + `BeforeAfter` (Unscoped vs Scoped)
- Brief same.
- `BeforeAfter`: 
  - Before (`Unscoped`): *"Claude Code started in ~. It can see everything in your home folder."* bullets: *Tax PDFs*, *Old screenshots*, *Screenshots of screenshots*, *A decade of drafts*. 
  - After (`Scoped`): *"Claude Code started in the one folder that matters right now."* bullets: *Only the work for this task*, *Answers reference real files*, *No surprise edits outside scope*, *You can trust the output*.

---

## M04 — Permissions · "Files, Permissions, and Undo"

**One idea.** Every file-changing action is approved by you. That friction is the feature.

### Variant A — `TerminalDemo` with an approval block and colored diff lines
- `TerminalDemo` titled `approval`, showing:
  - `prompt`: `fix the formatting in meeting-notes.md`
  - `out`: `Proposing edit to meeting-notes.md:`
  - `warn` (red): `- bullet  list  with weird spacing`
  - `ok` (gold): `+ - Bullet list with consistent spacing`
  - `out`: `Approve? (y/n)`
  - `prompt`: `y`
  - `ok`: `Applied.`
- Above: mission brief *"Three prompts stand between a question and a changed file."*

### Variant B — `ProcessFlow` (Ask → Propose → Diff shown → You approve → Change lands)
- Brief same.
- Five-step `ProcessFlow`. Each step has a short terminal-style aside.
- Emphasis on the *loop* of approval, not on a single diff moment.

---

## M05 — CLAUDE.md · "Teach it once. Let it remember forever."

**One idea.** A short file in your folder that answers four questions, so you don't have to re-introduce yourself every session.

### Variant A — `StackedReveal` with 4 question cards (the canonical four)
- Brief: *"Write it once. Claude reads it every session."*
- `StackedReveal` eyebrow: *`Brief · 4 questions`*. Items:
  1. *Who am I?* · summary: *One sentence. Role, what you do, who you serve.* · body: expanded template line.
  2. *What is this folder for?* · summary etc.
  3. *What conventions do I care about?*
  4. *Who reads what comes out of here?*
- Each card opens to reveal an example line + a code snippet of the filled-in template for the current persona.

### Variant B — `BeforeAfter` (Session without vs Session with CLAUDE.md)
- `BeforeAfter` showing a `TerminalDemo`-style exchange:
  - Before (`No CLAUDE.md`): a first-prompt re-introduction tax, generic reply.
  - After (`CLAUDE.md`): straight to the work, reply already in-voice.

---

## M06 — Real Use Case · "This is the one. Pick the task you mildly dread."

**One idea.** Every task follows the same three-move shape: read-only → plan → execute with approvals.

### Variant A — `MissionBrief` + `ProcessFlow` (Read-only → Plan → Execute)
- Brief: *"One task. Three moves. Every time."*
- `ProcessFlow`: 
  - `Read-only` — *"Ask it what's there. No edits, no writes. Just understanding."* aside: `what's in this folder and what is it for?`
  - `Plan` — *"Ask what it would do. Blueprint before building."* aside: `what would a first pass look like?`
  - `Execute` — *"Approve each step. Every change is a checkpoint."* aside: `write these ten captions into captions-wk-16.md`
- Optional: a second `TerminalDemo` showing the pattern with the active persona's task.

### Variant B — `MissionBrief` + `TerminalDemo` only
- Extended terminal replay (~20 seconds) showing the full three-move arc in one continuous demo, with `meta` banners between moves (`-- move 1: read --`, `-- move 2: plan --`, `-- move 3: execute --`).
- Less explicit labeling, more "see the shape in action."

---

## M07 — Next Steps · "You did it. Now what changes."

**One idea.** Three habits this week turn one install into a weekly rhythm.

### Variant A — `MissionBrief` + `StackedReveal` with `checkable` = true for 3 habits
- Brief: *"Three moves this week. Then the tool is yours."*
- `StackedReveal` items (checkable): 
  1. *Reuse your CLAUDE.md in a second folder.* · summary: *A different client, a different project.*
  2. *Refine the one you have as you notice what you keep re-explaining.*
  3. *Catch yourself before reaching for the browser chatbot.*
- Checked state persists (in-memory). Eyebrow: `Weekly loop · 3 habits`.

### Variant B — `MissionBrief` + `ProcessFlow` (Mon → Wed → Fri)
- Brief same.
- `ProcessFlow` styled as a week rhythm: Monday (`Run Module 06 task again`), Wednesday (`Notice the browser-chatbot reflex`), Friday (`Update your CLAUDE.md`). 
- Auto-cycle on loop so the reader sees the rhythm.

---

## Delivery

For each module, return your evaluation in this format:

```
## M01
Winner: A
Rationale: <100-word paragraph citing at least two criteria>

## M02
...
```

If the two variants are genuinely close, say so and recommend what would break the tie (e.g., "variant A wins today; variant B becomes better in a mobile-first pass when tab-swapping stutters").
