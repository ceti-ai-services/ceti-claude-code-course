# Module → Visual wiring plan

**Purpose**: one source of truth for which pattern each module's core concepts use, so the Sprint 4 wiring agent (and future modules) can apply the pattern library consistently.

**Principle**: one visual per idea, not two. Respect the one-idea-per-visual rubric from `.claude/skills/ceti-course-visuals/references/rubric.md`. A module can have 1–3 visuals; more than 3 means content is too dense.

## How to read this

Each module lists:
- **Hero visual** — the one "above the fold" that sets the mental model.
- **Mid-lesson visuals** — 0–2 further visuals that replace prose when prose would drag.
- **Pattern** — from `app/components/course/patterns/`.
- **Data spec** — the concrete labels/steps/rows the pattern needs.

---

## 01 · What Claude Code is — and how it differs from the browser chatbot

- **Hero visual** → `ComparisonGrid` · *Vending machine vs. Colleague* (two columns, identical anatomy, click to focus)
  - Columns: `vending-machine` (role: support, body: "one input → one output. transaction done.") and `colleague` (role: secondary, body: "sees your files, asks to clarify, shows you the change before it lands.")
- **Mid-lesson** → `TradeoffMatrix` · rows: INPUT / OUTPUT / MEMORY / CONTROL
  - left header: "Vending machine" (support), right header: "Colleague" (secondary)

## 02 · Install on Mac, Windows, or Linux

- **Hero visual** → `Timeline` · the install flow as four equal steps
  - Steps: *Check Node* (primary), *Install CLI* (secondary), *Authenticate* (accent), *First run* (support)
- **Mid-lesson** → `FailureTable` · install traps (npm permission, wrong Node, missing PATH)

## 03 · Your first real session — scoped to a folder

- **Hero visual** → `TerminalReplay` · `cd ~/Downloads && claude` → the first "what's in here?" exchange
- **Mid-lesson** → `SessionBoundary` · scope = the folder; chips (read, plan, ask, done) evaporate; the folder persists

## 04 · File permissions — read the diff, approve the change

- **Hero visual** → `TerminalReplay` (interactive approve/deny) · the real approval moment, already built — keep this pattern
- **Mid-lesson** → `FailureTable` · permission failure modes: "accept-all" (trap: bad file lands), "vague prompt" (trap: guessed scope), "no CLAUDE.md" (trap: generic tone)

## 05 · CLAUDE.md — write it once, stop explaining yourself

- **Hero visual** → `FillableBuilder` · the reader composes their CLAUDE.md live; preview updates on the right
  - Fields: *Project one-liner*, *Stack*, *Do*, *Don't*, *Deployment*, *Contacts*
- **Mid-lesson** → `FileTree` · where CLAUDE.md lives; hover nodes for purpose

## 06 · One real task, end-to-end

- **Hero visual** → `Storyboard` · **3 phases (Read → Plan → Execute)** with a prose note per phase
- Rationale: the module's prose teaches the three-move rhythm (Read / Plan / Execute) five times, including in its Recap. An earlier 5-phase framing was contracted to 3 per MERCURIO review 2026-04-21 so the hero's mental model matches the prose.
- **Mid-lesson** → `DecisionFork` · "what do you do when Claude proposes a wider scope?" → two choices (accept wider / redirect to scope)

## 07 · Slash commands — reusable prompts you build once

- **Hero visual** → `FillableBuilder` · reader writes one slash command live
  - Fields: *Command name*, *Description*, *Body*
- **Mid-lesson** → `FileTree` · `.claude/commands/` layout with 5 example commands highlighted

## 08 · Skills — packaged capabilities Claude loads on demand

- **Hero visual** → `ComparisonGrid` · Slash command vs. Skill (columns: *explicit* vs. *auto-loaded*)
- **Mid-lesson** → `FillableBuilder` · SKILL.md frontmatter builder (name, description, triggers, body)

## 09 · Plan mode — think before acting, dry-run your work

- **Hero visual** → `ThreeMovesTerminal` · three stamps + three terminal lines: *READ* → *PLAN* → *APPROVE*
- **Mid-lesson** → `SequentialPulse` · plan-mode loop: Propose → Review → Accept/Redirect → Execute

## 10 · Hooks — safety gates and pre/post-tool-use automation

- **Hero visual** → `PhaseTabs` · three tabs: *PreToolUse*, *PostToolUse*, *Stop* — each shows a facet grid (when fires, typical use, example)
- **Mid-lesson** → `FailureTable` · hook anti-patterns: "swallow errors" / "no-op hook" / "hook that mutates state mid-tool"

## 11 · MCP basics — connect Gmail, Calendar, Notion, your files

- **Hero visual** → `OrbitalRing` · the three MCP primitives (Tools / Resources / Prompts) orbit the MCP server at center
- **Mid-lesson** → `ScatterFlow` · which tools fit MCP? effort×fit plot; the "good fit" path connects Gmail → Calendar → Drive

## 12 · Git integration — commits, branches, PRs through Claude

- **Hero visual** → `Timeline` · five steps: *Branch* → *Edit* → *Stage* → *Commit* → *Review PR*
- **Mid-lesson** → `FailureTable` · git anti-patterns: "--no-verify" (trap: hook bypass) / "force push main" (trap: lost work) / "amend pushed commit" (trap: diverged history)

## 13 · Subagents and parallel work

- **Hero visual** → `ComparisonGrid` · **three columns for the three taught patterns** (*independent research* / *wide searches* / *long bounded tasks*)
- Rationale: swapped from `ScatterFlow` to `ComparisonGrid` 2026-04-21 per MERCURIO review — the prose teaches three named patterns, so a 3-column side-by-side carries the taxonomy directly. A 2D plot added abstract axes the prose didn't teach.
- **Mid-lesson** → `OrbitalRing` · fan-out/fan-in cycle: *Spawn* → *Work* → *Report* → *Synthesize*

## 14 · Next steps — habits and the wider agentic toolkit

- **Hero visual** → `CheckableStack` · four habits to commit to (already partially built in the existing M07Hero)
  - items: *Scoped folder*, *Read-only first*, *Correct actively*, *Ask for structure*
- **Mid-lesson** → none — this is a lighter closing module

---

## Wiring workflow (per module)

1. Open the module's markdown at `content/start/<slug>.md`.
2. Identify which prose paragraphs the Hero and Mid-lesson visuals will replace or augment.
3. Create a hero component at `app/components/course/lesson/M<NN>Hero.vue` that:
   - Composes `MissionBrief` (existing mission-style header) above the pattern instantiation.
   - Passes the Data spec from this file as props.
   - EN + ES dict selected via `useCustomizer()` `.lang`.
4. If mid-lesson visuals are specified, register them as custom tags in `app/pages/start/[slug].vue` (follow the `PraoLoop` self-closing pattern).
5. Update `heroMap` in `[slug].vue` to include the new slug → component binding.
6. Quick-visual check in both light + dark × all 4 palettes before commit.
