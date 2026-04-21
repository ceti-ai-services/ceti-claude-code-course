# Curriculum v3 — Bronze full-scope expansion

**Date**: 2026-04-20 · **Status**: Direction locked by Manu; rollout in progress
**Supersedes**: the 7-module shape in `CLAUDE.md` §course-structure and `docs/academy-taxonomy.md` §novice

Bronze covers the **full scope of Claude Code + the wider agentic coding toolset** — not just "install and do one thing." 14 modules minimum. Every module is interaction-first: 5–7 discrete interactive elements per module, prose compressed to intent + callouts + diagrams that the reader *does something with*. Reference pattern: the MCP/PRAO loop interactive (see `app/components/course/PraoLoop.vue`).

## The 14 modules

| # | Title | Phase | Time | Status |
|---|---|---|---|---|
| 01 | What Claude Code is — and how it differs from the browser chatbot | Foundations | 12 min | live |
| 02 | Install on Mac, Windows, or Linux | Foundations | 14 min | live |
| 03 | Your first real session — scoped to a folder | Foundations | 14 min | live |
| 04 | File permissions — read the diff, approve the change | Foundations | 12 min | live |
| 05 | CLAUDE.md — write it once, stop explaining yourself | Foundations | 13 min | live |
| 06 | One real task, end-to-end | Real work | 45 min | live |
| 07 | **Slash commands** — reusable prompts you build once | Toolkit | 12 min | planned |
| 08 | **Skills** — packaged capabilities Claude loads on demand | Toolkit | 12 min | planned |
| 09 | **Plan mode** — think before acting, dry-run your work | Toolkit | 10 min | planned |
| 10 | **Hooks** — safety gates + pre/post-tool-use automation | Toolkit | 14 min | planned |
| 11 | **MCP basics** — connect Gmail, Calendar, Notion, your files | Integration | 14 min | **live (prototype)** |
| 12 | **Git integration** — commits, branches, PRs through Claude | Integration | 12 min | planned |
| 13 | **Subagents & parallel work** | Going further | 12 min | planned |
| 14 | **Next steps** — habits + wider agentic toolkit | Going further | 10 min | planned (rewrite of old M07) |

### Stretch modules (optional, same ticket, less-prescribed order)

- *Chrome use / computer use* — agentic browser + desktop control
- *The agentic landscape* — Claude Code vs Cursor, Aider, Cline, Continue; when to use what
- *Custom MCP servers* — building your own tool connectors
- *Debugging AI loops* — when Claude gets stuck, how to recover
- *Team patterns* — shared skills, handoffs, async collaboration

## Density target per module

- **Word budget**: 600–900 visible prose words (down from current 1200–2100).
- **Interactive elements**: 5–7 per module. Each element embeds learning — reading is for connecting the elements, not for delivering the substance.
- **Element patterns** (combine freely):
  - Phase tabs (PRAO-style) — clickable, each phase themed with a color
  - Traced examples — click-to-reveal step detail
  - Before/after toggle panels
  - Terminal replay with branching (user picks the next command)
  - Inline fillable builders (the CLAUDE.md builder, the slash-command composer)
  - Decision forks (ForkChoice) — "what would you do?" with reveal-based consequence
  - End-of-module boss checkpoint (BossCheckpoint) — decision gate to proceed
- **Callouts** stay (`core-idea`, `tip`, `warning`, `stakes`) but used as emphasis pins inside the flow, not as substitute for interaction.

## Color palette — extended phase accents

Added to `app/assets/css/main.css`. All muted / low-chroma. Paired with `--*-bg` (soft tint) and `--*-edge` (border) tokens so tabs and panels can theme per-phase without competing with gold (primary).

- `--color-info` · `#6aa8e8` — Perceive / inform / read-only
- `--color-thought` · `#a78bfa` — Reason / think / plan-mode
- `--color-act` · `#c49368` (CETI brand camel) — Act / execute / external tools
- `--color-confirm` · `#8fb58e` (CETI brand sage) — Observe / confirm / completed

Gold (`#d4a84b`) stays primary — hero title, current step, CTA, main brand mark. No new accent added without updating this list.

## Typography

Added **DM Sans** to the font stack (paired with existing Inter + JetBrains Mono). Use DM Sans for interactive-element body copy — it reads one notch more editorial than Inter, matches the PRAO reference. Inter stays for default body prose; JetBrains Mono for code, labels, and terminal chrome.

## Reference component — `PraoLoop.vue`

The canonical density target. 4 clickable phase tabs (each themed with one of the new accent colors), a dynamic panel that updates per phase (description + MCP role + failure mode), a divider, a traced example with 5 click-to-reveal steps each badged with its phase color. All in a single component. Self-closing tag `<PraoLoop />` in markdown; tokenizer in `[slug].vue` handles it.

This is what 1 of 5–7 elements looks like in Module 11. Others will follow the same density discipline: one clear interaction, one clear teaching point, clickable state the reader changes.

## Rollout plan (recommended — Manu approves before execution)

1. **M11 · MCP basics** — shipped (this commit set). One full interactive element + short prose wrapper. Prove the pattern.
2. **M09 · Plan mode** — next. Smaller scope, interactive "plan-vs-act toggle" primitive, natural colored-accent use (`--color-thought`). ~half a day.
3. **M10 · Hooks** — after M09. Needs `HookTimeline.vue` (animated pre → during → post).
4. **M07 · Slash commands** — needs `SlashBuilder.vue` (student writes a command, sees it render as a `.claude/commands/*.md` file preview).
5. **M08 · Skills** — needs `SkillCard.vue` (hover/tap reveals SKILL.md structure).
6. **Compress M01–M06** — distill existing 1200–2100 word prose into interaction-first pages hitting the 5–7 element target per module. Dispatch a sibling agent to do the first-pass compression on each module, review, adjust.
7. **M12 · Git** — after compressions. Needs `GitLensDemo.vue` (commit / diff / branch visualizer).
8. **M13 · Subagents** — parallel-agent visualization.
9. **M14 · Next steps** — rewrite of old M07 reframed toward the wider landscape.

## Open decisions

- **M06 time estimate** (45 min vs the gate's 15 min). Will reconcile when M06 gets compressed — probably ends up at 25 min after interaction replaces prose.
- **Localization of interactive elements**. `PraoLoop.vue` currently hard-codes EN content in its defaults. Pattern for ES: pass content via props from the module hero so the hero can swap per `lang.value`. Will formalize this pattern on the second interactive element built.
- **Shipping order of compressions vs. new modules**. Open question: do we compress M01–M06 first (making the existing live content denser), or ship the 7 new modules first (showing Manu the full 14-module shape on the manifest)? Current default: new modules first (14 > 7 on the manifest is the visible shift), then compress. Manu's call.
