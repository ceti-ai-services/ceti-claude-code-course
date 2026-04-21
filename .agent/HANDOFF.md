# HANDOFF — CETI Claude Code Academy · Refactor Pass 2

**Updated:** 2026-04-21 (late). Pass 1 shipped but scope was wrong: **one hero diagram per module is not enough.** Manu's directive: **5 diagrams per module, visuals are the majority of the page, prose is the scaffolding.** Plus: dark-mode text contrast too dim on dark background. Plus: the agentic team was under-used (I did too much serial work myself).

---

## What shipped in Pass 1 (keep this)

- ✅ Retro-boardwalk dual-mode (light/dark × 4 palettes) in `app/assets/css/main.css`
- ✅ 18 pattern components in `app/components/course/patterns/`
- ✅ 14 hero components in `app/components/course/lesson/M<NN>Hero.vue` (one per module)
- ✅ All 14 modules content files at `content/start/<slug>.md`
- ✅ PaletteToggle + `usePalette()` composable
- ✅ Live at dev-learn.cetiai.co, all 14 routes 200

## What Pass 2 must fix

1. **Density**: every module needs **~4 additional mid-lesson diagrams** (the hero stays). Current 1-per-module → target 5-per-module. Total = 56 new diagrams across 14 modules.
2. **Dark-mode text contrast**: foreground-on-dark-card is dim (chip foregrounds at ~60-65% lightness on deep-tint fills). Bump toward 72–80% lightness on `--*-foreground` vars in each `.dark` block.
3. **Agentic team**: real parallel agent dispatch per module-range. 7 agents × 2 modules × 4 diagrams = 56. Each agent: reads .md, picks pattern per concept, builds Vue component, inserts `<CourseDiagram id="...">` tag into .md at correct position.

## Pass 2 architecture

### Generic diagram tokenizer (one-time infra)

- New self-closing tag: `<CourseDiagram id="m09-d1" />`
- Each diagram is a Vue SFC at `app/components/course/diagrams/<id>.vue`
- Central registry at `app/components/course/diagrams/index.ts` maps id → component
- `[slug].vue` tokenizer gets one new branch: `if (tag === "CourseDiagram") { blocks.push({kind: "diagram", id: attrs.id}) }`
- Template: `<component :is="registry[block.id]" v-else-if="block.kind === 'diagram'" />`
- Agents NEVER touch `[slug].vue` — they just create `.vue` files and add tags to `.md`

### Diagram id convention

`m<NN>-d<1..4>` where NN = module number, d1..d4 = mid-lesson sequence. The hero keeps its existing `M<NN>Hero.vue` structure. So per module:
- 1 hero (M<NN>Hero.vue, already built)
- 4 mid-lesson (m<NN>-d1 through m<NN>-d4 as CourseDiagram components)
- = 5 total ✓

### Agent team layout

7 agents, each owns 2 modules. Split:

| Agent | Modules | Diagrams to build |
|---|---|---|
| 1 | 01, 02 | 8 diagrams (m01-d1..4, m02-d1..4) |
| 2 | 03, 04 | 8 |
| 3 | 05, 06 | 8 |
| 4 | 07, 08 | 8 |
| 5 | 09, 10 | 8 |
| 6 | 11, 12 | 8 |
| 7 | 13, 14 | 8 |

Each agent task (self-contained — agent reads these paths and nothing else):
1. Read `CLAUDE.md` (tone rules)
2. Read `.claude/skills/retro-boardwalk-skill/PATTERNS.md` (the 18 patterns)
3. Read `app/components/course/diagrams/index.ts` (registry to edit)
4. Read the 2 module .md files + existing hero .vue files (to avoid pattern reuse within module)
5. Read 3 sample patterns from `app/components/course/patterns/` (the agent picks which)
6. For each of 2 modules:
   - Identify 4 mid-lesson concepts that are stronger as visual than prose
   - Pick pattern per concept (NOT the one the hero uses — variety required)
   - Build `app/components/course/diagrams/m<NN>-d<1..4>.vue` (thin wrapper: imports pattern, passes data, exports default)
   - Insert `<CourseDiagram id="m<NN>-d<1..4>" />` into `.md` at the right paragraph break (replacing or augmenting prose)
   - Register in `diagrams/index.ts`
7. Verify with hex grep

Parallel dispatch. Each agent ≤ 15 min autonomous work.

## Color contrast fix (apply before agents run)

In `app/assets/css/main.css`, bump dark-mode `--*-foreground` lightness in each `.palette-*.dark` block:
- `--primary-foreground`: 85% → keep (already bright)
- `--secondary-foreground`: 69% → **78%**
- `--accent-foreground`: 62% → **72%**
- `--support-foreground`: 65% → **76%**
- `--muted-foreground`: 70% → **78%**

This preserves the "color is light at the edge" contract but pushes foreground above the WCAG AA contrast threshold on the dark-tint fills.

## Success gate for Pass 2

- [ ] 14 modules × 5 diagrams = 70 total (14 heroes + 56 mid-lesson)
- [ ] All 14 routes still 200
- [ ] No raw hex in any new file
- [ ] Dark-mode AA contrast passes on chip foregrounds
- [ ] `npx nuxt build` green
- [ ] Deployed to dev-learn.cetiai.co

## Resume if context dies

1. Read this HANDOFF.md
2. Read `CLAUDE.md` § "5-diagrams-per-module rule"
3. `ls app/components/course/diagrams/` — count — if < 56 files, agents didn't finish
4. `git log --oneline -6` — see what's committed
5. Dispatch any missing agent(s) from the team table above
6. Build + push

## Decisions logged

- **D-2026-04-21-density**: 5 diagrams per module is the floor, not the ceiling. Pages should be ~60% visual by vertical real estate. Prose is connective tissue, not the substance.
- **D-2026-04-21-variety**: Each module uses **≥ 4 distinct patterns** across its 5 diagrams (hero + 4 mid-lesson). No two diagrams in the same module use the same pattern.
- **D-2026-04-21-registry**: Central `diagrams/index.ts` registry. Never add diagram-specific imports to `[slug].vue` — everything flows through one `<CourseDiagram id="..." />` tag.
- **D-2026-04-21-contrast**: Dark-mode `--*-foreground` tokens bumped to 72–80% lightness. The "edge-light" rule stays; the light is just brighter.
