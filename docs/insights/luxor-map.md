# LUXOR Map + `codebase-to-course` Deep-Dive

*Source: parallel research subagent, 2026-04-19. Full transcript at `.agent/research-raw/luxor-map.md` (archive on request).*

---

## Headline findings

1. LUXOR holds **3 production courseware projects** that are directly portable as academy content seeds: `agentic-ai-course`, `ANTHROPIC-AGENT-SDK-COURSE`, `MCP-COURSE`.
2. LUXOR holds **5 courseware-building skills** + ~179 general skills. The five that matter for CETI academy: `codebase-to-course`, `progressive-game-lab`, `curriculum-module-writer`, `course-validator`, `course-deployer`, `course-orchestrator`.
3. `/LUXOR/COURSEWARE/` is a **discipline layer**, not a template library — it enforces accuracy invariants, phase gating, and parallel agent dispatch. Its invariants **match CETI's tone/accuracy rules almost one-to-one** (no `--thinking`, no `--context`, SSE deprecated, 3 MCP primitives, CLAUDE.md is not a slash command, etc.).

## `codebase-to-course` — the pragmatic truth

| Dimension | Reality |
|-----------|---------|
| **Input** | Codebase (local path or GitHub URL) or an existing doc |
| **Output** | Standalone HTML (single file for skill-page mode, multi-file for course mode) |
| **Design system** | **Fixed and hard-coded.** Warm cream `#FAF7F2` bg, Bricolage Grotesque + DM Sans, five actor colors, warm vermillion/amber/teal/coral accents |
| **Tailwind + shadcn integration** | **None.** No config layer, no token override. SKILL.md explicitly says "do not regenerate styles.css" |
| **Pedagogy stack** | Code ↔ English translations · group-chat animations · multiple-choice + drag-drop + scenario quizzes · glossary tooltips · IntersectionObserver fades |
| **Six modes** | `default` (multi-module), `skill-page`, `plugin-page`, `batch-skill-page`, `course-with-modules`, `repo-explainer` |

## The architectural decision

Three paths:

**(A) Iframe codebase-to-course output directly** → fast, but the aesthetic mismatch (light warm-cream vs our dark gold) makes the academy feel like two different sites. **Rejected.**

**(B) Build academy pages natively in shadcn-vue, ignore codebase-to-course** → unified brand, but we throw away a proven pedagogy engine and the LUXOR accuracy discipline. **Rejected.**

**(C) Use codebase-to-course as a content source, not the final renderer** — let it produce the HTML, extract its structure (sections, quizzes, code-english pairs, glossary terms, group-chat scripts), and re-render inside our shadcn-vue components against the CETI palette. **Adopted.**

Mechanically: we write a small transform script that parses the codebase-to-course HTML and emits a JSON intermediate the shadcn-vue components consume. One-time build cost, then every future academy page reuses the pipeline.

## Five LUXOR skills to port (directly or in spirit)

| Skill | Port as |
|-------|---------|
| `course-validator` | Our pre-commit accuracy gate (already overlaps our banned-words + invariants list — merge rules, adopt the 3-pass validation pattern) |
| `course-orchestrator` | The 8-phase pipeline becomes our academy build protocol (spec → modules → labs → validate → deploy) |
| `progressive-game-lab` | XP + section-gate mechanics — adapt the concept (progress dots + unlock-on-completion) into our `ProgressDots` component |
| `curriculum-module-writer` | Content generator for module markdown — use directly, pointed at our `content/academy/` tree |
| `codebase-to-course` | Content *source* for any module that starts from existing code (LUXOR projects) — feed it, extract, re-render |

## Three production courses worth mining for content

| LUXOR course | What to extract for CETI |
|--------------|--------------------------|
| `agentic-ai-course` | Labs 01–09 pedagogy patterns; lab-framework CSS tokens to reference; module-viewer structure |
| `ANTHROPIC-AGENT-SDK-COURSE` | Agent SDK patterns reframed for non-devs — "how Claude Code runs as an agent" |
| `MCP-COURSE` | MCP curriculum — feeds Silver Week 3 directly |

## Recommended first academy-page build

Per the subagent: feed `agentic-ai-course/labs/day3/lab-09-debugging-ai-loops.html` into `codebase-to-course` with `intent: skill-page`, transform the output through the shadcn-vue re-renderer, publish as `/academy/experienced/debugging-ai-loops`. Proves the pipeline end-to-end before generalizing.

## Caveats

- codebase-to-course single-page mode caps at ~80 KB. Long modules need the multi-file mode + a chunked transform.
- The LUXOR CLAUDE.md at repo root **does not exist** — `COURSEWARE/CLAUDE.md` is the authoritative spec.
- The subagent *sampled* 10 of 179 LUXOR skills. A deeper pass might surface another 2–3 relevant ones (notably anything tagged "pedagogy" or "validation").
