# Progress — Refactor Pass 2 (density + contrast)

**Snapshot:** 2026-04-21 late. 7 agents dispatched in parallel to add 4 mid-lesson diagrams per module (56 total). Infrastructure for the diagram registry is in place. Dark-mode contrast bumped across all 4 palettes.

## Current state

### Task
Expand every Bronze module from 1 diagram (hero only) to 5 diagrams (hero + 4 mid-lesson). Total target: 14 heroes + 56 mid-lesson = 70 diagrams. This is the density correction after pass-1 shipped with too much prose per module.

### Active agents (parallel)

| Agent | Modules | Status |
|---|---|---|
| 1 | 01, 02 | in-flight |
| 2 | 03, 04 | ✅ done |
| 3 | 05, 06 | in-flight |
| 4 | 07, 08 | ✅ done |
| 5 | 09, 10 | ✅ done |
| 6 | 11, 12 | in-flight |
| 7 | 13, 14 | in-flight |

Each agent:
1. Reads its 2 module `.md` files + `PATTERNS.md` + `M01Hero.vue` template
2. Picks 4 distinct patterns per module (none = the module's hero pattern)
3. Builds thin-wrapper `.vue` files at `app/components/course/diagrams/m<NN>-d<1..4>.vue`
4. Inserts `<CourseDiagram id="m<NN>-d<1..4>" />` into the module's `.md` at the right paragraph breaks, deleting the prose the diagram now carries

### Modifications landed (by me, before agents)

| File | Change |
|---|---|
| `app/assets/css/main.css` | Dark-mode `--*-foreground` lightness bumped to 76–92% across all 4 palettes |
| `app/components/course/diagrams/index.ts` | New file — registry with static imports for all 56 `m<NN>-d<1..4>` components |
| `app/pages/start/[slug].vue` | Tokenizer now recognizes `<CourseDiagram id="..." />` as self-closing tag; imports `DIAGRAM_REGISTRY` and dispatches via `<component :is="...">` |
| `CLAUDE.md` | Added "5-diagrams-per-module rule" section with `<CourseDiagram>` contract, file paths, and prose-shrinkage guidance |
| `.agent/HANDOFF.md` | Pass-2 scope + agent team table + success gates |

### Key decisions

- **D-2026-04-21-density**: 5 diagrams per module is the floor. Visuals are majority; prose is connective tissue.
- **D-2026-04-21-variety**: No two diagrams in the same module use the same pattern.
- **D-2026-04-21-registry**: Central `diagrams/index.ts` registry. `[slug].vue` uses one generic tag; agents never edit the page renderer.
- **D-2026-04-21-contrast**: `--*-foreground` tokens raised to 76–92% lightness. "Edge-light" rule preserved; light is just brighter.

## What's next (when agents return)

1. Wait for all 7 notifications. Each returns ≤150-word report with pattern choices + prose deletions.
2. Rebuild: `npx nuxt build`.
3. Smoke test: 14 `/start/<slug>` routes should all 200 and render their 5 diagrams inline.
4. Fix any TypeScript or build errors from agent outputs (hex leaks, missing prop shapes, broken markdown).
5. Commit in one feat commit: `feat(density): 56 mid-lesson diagrams + 5-per-module rule`.
6. Push → Vercel auto-deploy.
7. Final MERCURIO pass if time allows.

## Resume protocol (if context dies)

1. Read this file.
2. Read `.agent/HANDOFF.md` § "Pass 2 architecture".
3. `ls app/components/course/diagrams/*.vue | wc -l` — if < 56, check which m<NN>-d<N>.vue are missing and dispatch catch-up agents per the HANDOFF team table.
4. `git log --oneline -6` to see where we are.
5. `npx nuxt build` — if green, commit + push.
