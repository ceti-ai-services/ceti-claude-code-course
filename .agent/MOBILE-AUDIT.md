# Mobile Audit — 2026-04-28
Viewports tested: 375 / 414 / 768 px. Method: source-only static read of `app/`.

Lesson container at 375px: `.lesson { padding: 60px 24px 100px }` → ~327px usable. `DiagramShell { padding: 20px 22px 18px }` → ~283px inside any pattern body.

## Critical (must fix before mobile launch)

| Severity | Component | Issue | Suggested fix | File:line |
|---|---|---|---|---|
| CRITICAL | Top nav (`.nav-links`) | Brand + 4 text links + PaletteToggle (4 dots + sun/moon) + EN/ES on a single row with no `flex-wrap` and no `@media`. Total content ~480px on a 375px screen. Will overflow horizontally on every page. | Wrap below 768px, hide secondary links behind a hamburger or stack PaletteToggle/LanguageToggle below the brand + links | `app/assets/css/main.css:432-437` |
| CRITICAL | SequentialPulse | 5 chips + 4 connector rails forced into a single horizontal flex (`.sp-track { display: flex }`) with no breakpoint. At 375px, chip width drops to ~35–60px — title + subtitle are illegible. Used by index hero + M09 hero + 4 diagrams. | Switch to `flex-direction: column` + replace `.sp-connector` with vertical chevron below 640px | `app/components/course/patterns/SequentialPulse.vue:86-141` |
| CRITICAL | Timeline | 6 step cards + 5 horizontal arrows in a single flex, no breakpoint. At 375px each step ~35px wide, arrows clip. Used by M02 hero, M12 hero, M14 hero, plus 1 diagram. | Stack vertically below 640px; replace right-arrow SVG with downward chevron | `app/components/course/patterns/Timeline.vue:91-100, 162-169` |
| CRITICAL | FailureTable | 3-column grid (`grid-template-columns: 1fr 1fr 1fr`) with no breakpoint. At 375px each col ~95px — chips and trap text stack and overflow. Most-used pattern in the course (11 diagrams). | Stack rows as 3-line cards (WRONG label / TRAP body / RIGHT label) below 640px | `app/components/course/patterns/FailureTable.vue:66-90` |
| CRITICAL | 14-dot progress strip + jump strip | Each `.dot` is 34×34 with 8px gap. Two strips render on every lesson page. They wrap, but burn ~230px vertical real estate on mobile and the dots look unintentional once they break across rows. | Either hide the top strip on mobile (keep the bottom jumper as the canonical control), or render as a compact horizontal-scroll rail with snap, or condense to a "M03 of 14" indicator + popover | `app/pages/start/[slug].vue:710-715, 930-948` |
| CRITICAL | DecisionFork resets-and-button text size | Choice chips OK, but the `.df-question` is 13px and `.df-consequence` is 11.5px. Bigger problem: `.df-reset` is 10.5px underlined text, ~14px tall — far below the 44×44 tap target. Used in 8 diagrams. | Make `.df-reset` a real button at 36+px tall, increase font to 12px on mobile | `app/components/course/patterns/DecisionFork.vue:119-127` |

## High (degrades UX significantly)

| Severity | Component | Issue | Suggested fix | File:line |
|---|---|---|---|---|
| HIGH | PhaseTabs `.pt-tablist` | `grid-template-columns: repeat(auto-fit, minmax(110px, 1fr))` — at 375px container ≈287px, max 2 cols, so 5 tabs wrap to 3 rows of irregular height. `.pt-facets` uses `minmax(160px, 1fr)` — collapses to 1 col, OK. | Force `grid-template-columns: 1fr` below 640px; tabs become a vertical stack | `app/components/course/patterns/PhaseTabs.vue:98-103` |
| HIGH | Storyboard `.sb-rail` | Fixed `min-width: 136px` left rail next to the panel. At 375px, panel reduced to ~135px — title and note text wrap into 2-3 word ribbons. | Below 640px: stack rail above panel (column flex), let rail buttons take full width as horizontal chips or vertical stack | `app/components/course/patterns/Storyboard.vue:99-114` |
| HIGH | TracedExample badge + indent | `.te-badge` `min-width: 52px`, `.te-artifact` `padding-left: 74px`. The 74px artifact indent leaves ~210px for the artifact pre on mobile — long lines wrap fine, but the indent is excessive. The 640px override drops it to 12px, but the chip-row eyebrow indent is unaffected. | Already partially handled (`@media (max-width: 640px) .te-artifact { padding-left: 12px }`) — verify the row badge + action stack cleanly when action is long | `app/components/course/patterns/TracedExample.vue:115-119, 152-153, 172-174` |
| HIGH | PaletteToggle dots | `.pt-dot` is 16×16px — far below 44×44 tap-target minimum on touch devices. Same for `.pt-mode` at 26×26px. Five tap targets in a 26px-tall pill. | Increase to ≥ 36px each (or wrap with a 44×44 tap area via padding); 4 dots × 44 + mode 44 = 220px wide — at that point the toggle should hide on mobile and surface in a settings menu | `app/components/course/PaletteToggle.vue:101-112, 140-151` |
| HIGH | LanguageToggle EN/ES | `.lt-btn { padding: 3px 10px; min-width: 30px; font-size: 10.5px }` — total height ~22px. Below tap target. | Increase padding to 8px 14px, font to 12px, target ≥ 36px; on mobile place inside the same row as PaletteToggle in a "settings" cluster | `app/components/course/LanguageToggle.vue:61-76` |
| HIGH | TerminalReplay approve/deny | `.tr-btn` is `padding: 3px 10px` ≈ 19px tall. Inline action buttons that cannot be reliably tapped on mobile. The terminal frame itself wraps text fine. | Increase to padding 8px 14px, ensure ≥ 36px height; keep them inline-flex | `app/components/course/patterns/TerminalReplay.vue:231-247` |
| HIGH | CheckableStack inner checkbox | Outer row is full width (good tap target), but the embedded `.cs-check` (18×18 box, role=checkbox) is its own tap target via `@click.stop`. Below 44px. | Wrap the check in a 44×44 tappable container, or remove the separate tap target and treat the row click as the only toggle | `app/components/course/patterns/CheckableStack.vue:140-156` |
| HIGH | TerminalReplay/ThreeMovesTerminal CopyButton | `.copy-btn { height: 26px; padding: 4px 8px }` — below tap target. CopyButton appears on every prompt line. | Bump to ≥ 36px on mobile (`@media (max-width: 640px)`); spacing already accounts for it via `padding-right: 32px` | `app/components/course/_primitives/CopyButton.vue:131-151` |
| HIGH | MissionBrief eyebrow row | Header row is `flex items-center gap-2` (no wrap). Glyph (~46px) + "TRANSMISSION · M13 · SUBAGENTS AND PARALLEL WORK" (long M13/M14/M11 strings) + `time` on `ml-auto`. At 375px the codename text exceeds available width and either ellipsises or pushes the time off-screen. | Add `flex-wrap: wrap` to the eyebrow row, or move `time` to a second line on small screens; mirrors the fallback hero which already does `flex-wrap: wrap` | `app/components/course/MissionBrief.vue:64-96` |
| HIGH | FillableBuilder inputs | `.fb-input/.fb-textarea/.fb-select { font-size: 11.5px }`. iOS auto-zooms when focusing form fields under 16px — disrupts page flow. | Force form inputs to 16px on mobile (`@media (max-width: 640px) { .fb-input, .fb-textarea, .fb-select { font-size: 16px } }`) | `app/components/course/patterns/FillableBuilder.vue:130-149` |

## Medium (visible polish issues)

| Severity | Component | Issue | Suggested fix | File:line |
|---|---|---|---|---|
| MEDIUM | DiagramShell padding | 20px top / 22px sides / 18px bottom — eats ~44px horizontal on a 375px screen. Combines with lesson padding (24×2) to leave ~283px for pattern content. | Reduce to 14px sides below 640px to recover ~16px of horizontal space across all 18 patterns at once | `app/components/course/_primitives/DiagramShell.vue:73-91` |
| MEDIUM | OrbitalRing fixed stage | `BOX_W = 240`, `BOX_H = 208` — fits 375px but the perimeter chip labels at radius 74 can poke beyond the stage if the chip text is long ("Generate-and-test" etc.). | Either clamp Chip max-width on perimeter, or use viewBox + percentage so the stage scales | `app/components/course/patterns/OrbitalRing.vue:32-39, 76` |
| MEDIUM | TradeoffMatrix headers | Header grid is `1fr 120px 1fr`. The 120px middle column is fixed for the `.tm-spacer`. Below 640px it switches to `1fr 1fr` — `.tm-spacer` is hidden. Confirm the two header chips read correctly with no spacer. | Verified switch at 640px is correct. Confirm header chips don't get squished with long sublabels. | `app/components/course/patterns/TradeoffMatrix.vue:86-92, 151-167` |
| MEDIUM | FitTree branches | 3-col grid sized via `repeat(var(--branches), 1fr)` — at 375px (~287px usable) each branch ~87px. Chips inside are `size: sm` and have `width: fit-content`, so they will wrap awkwardly with multi-word labels. Branch labels above are 9.5px mono — readable but small. | Add a `<640px` breakpoint that stacks branches vertically, OR keeps 3 cols but wraps chips per branch as a vertical mini-stack | `app/components/course/patterns/FitTree.vue:148-186` |
| MEDIUM | ScatterFlow SVG labels | SVG scales (`max-width: 100%`), but inside-SVG `<text>` elements at `font-size="10"` become ~7px on 375px after scale-down. Hover tooltip is inert on touch — only effective on desktop. | Add a tap-to-show legend/tooltip on mobile, increase font-size or use `vector-effect: non-scaling-stroke` on text | `app/components/course/patterns/ScatterFlow.vue:106-118, 161-170` |
| MEDIUM | SessionBoundary chip row | `.sb-chips` `flex-wrap: wrap` is correct, but the `evaporates` label uses `margin-left: auto` — when chips wrap, the label sits awkwardly to the right of the last chip on a sparse line. | On mobile force `evaporates` onto its own line (`flex-basis: 100%`) | `app/components/course/patterns/SessionBoundary.vue:125-138` |
| MEDIUM | start/[slug] lesson-nav-row | At 640px breakpoint, grid collapses to 1fr (good). But desktop layout is `1fr auto 1fr` with `min-height: 58px` — fits at 768px but at 414–640 the next-button title can ellipsis-truncate ("See Silver cohort" etc.). | Already handled at <640px; verify the gap between mobile breakpoint (640) and tablet (768) where the row is still 3-col. | `app/pages/start/[slug].vue:834-839, 950-956` |
| MEDIUM | start/[slug] fallback hero | `.fallback-title { font-size: 32px }` — fixed pixel value. Long titles (M11, M13) wrap to 4-5 lines on mobile. | Switch to `clamp(22px, 6vw, 32px)` matching the lesson body conventions | `app/pages/start/[slug].vue:817-823` |
| MEDIUM | Index `.hero-cta-row` | Two CTA buttons: "Start free →" and "Enroll in Silver" — `flex-wrap: wrap` is set. At 414px both fit in one row, but at 375px the second CTA wraps. Acceptable. | No fix needed — note as verified working. | `app/pages/index.vue:305-310` |
| MEDIUM | tier-badge "Most Popular" | `position: absolute; top: -11px; left: 22px` on featured tier card. Hangs above the card border. Fine when cards stack vertically on mobile but verify the negative offset doesn't clip when cards lose their parent padding. | Verify; minor risk | `app/pages/index.vue:398-411` |

## Low (minor)

| Severity | Component | Issue | Suggested fix | File:line |
|---|---|---|---|---|
| LOW | FileTree max-width | `.ftr-list { max-width: 520px }` — already mobile-friendly; tooltip hides at 640px. Long file paths might break layout if they exceed the row width. Has `flex-shrink: 0` on `.ftr-name` — could overflow horizontally without `min-width: 0`. | Add `min-width: 0` + `overflow-wrap: break-word` to `.ftr-name` for long paths | `app/components/course/patterns/FileTree.vue:136-141` |
| LOW | CodeBlock font | Already drops to 11.5px on mobile — readable. `overflow-x: auto` works for long commands. | No fix | `app/components/course/_primitives/CodeBlock.vue:192-203` |
| LOW | PraoLoop inner steps | `.prao-step { flex-direction: column }` at 640px — verified. | No fix | `app/components/course/PraoLoop.vue:461-465` |
| LOW | Index pillars-grid | Already has 3 breakpoints (4→2→1). | No fix | `app/pages/index.vue:462-478` |
| LOW | Lesson `:deep(pre)` | Markdown code in lesson body uses `overflow-x: auto`, font-size 13px — fine. | No fix | `app/pages/start/[slug].vue:1019-1027` |

## Pattern-by-pattern verdict (18 patterns)

- **SequentialPulse** — STACK on mobile (currently horizontal-only, no media query)
- **OrbitalRing** — KEEP (240×208 stage scales OK; minor risk on chip-label overflow)
- **Storyboard** — STACK rail above panel below 640px (currently side-by-side with 136px rail)
- **PhaseTabs** — STACK tabs to 1fr below 640px (auto-fit minmax(110px) wraps awkwardly)
- **ComparisonGrid** — KEEP (already has `<640px { grid-template-columns: 1fr }`)
- **FailureTable** — STACK rows as 3-line cards below 640px (currently rigid 3-col grid, no media query)
- **TracedExample** — KEEP-with-tweak (already shrinks artifact indent at 640px; verify badge+action row doesn't clip)
- **FillableBuilder** — KEEP (already stacks at 640px); fix input font-size to 16px to prevent iOS zoom
- **DecisionFork** — KEEP-with-tweak (chips wrap; bump `.df-reset` to a real ≥36px button)
- **FitTree** — STACK branches below 640px (currently 3-col grid)
- **FileTree** — KEEP (already hides tooltip at 640px); add `min-width: 0` to name span
- **TerminalReplay** — KEEP-with-tweak (frame max-width 520px scales; bump approve/deny + copy buttons to 36px)
- **Timeline** — STACK on mobile (currently horizontal-only with arrows; same shape as SequentialPulse)
- **CheckableStack** — KEEP-with-tweak (rows OK; bump checkbox tap target)
- **SessionBoundary** — KEEP-with-tweak (max-width 440px; force evaporates label to its own row on small screens)
- **TradeoffMatrix** — KEEP (already has `<640px` 3-col → 1-col stack)
- **ScatterFlow** — KEEP-with-tweak (SVG scales; tooltip is hover-only — add tap-to-show on mobile)
- **ThreeMovesTerminal** — KEEP-with-tweak (max-width 460px scales; same copy-button + tap-target nits as TerminalReplay)

## Page-level findings

### Landing (index.vue)

- Hero: `grid-template-columns: 1fr 1fr` collapses at 820px — works.
- Hero diagram is `<SequentialPulse>` — broken on mobile (see CRITICAL).
- Tiers grid: 3 → 1 col at 900px, max-width 480px when stacked. OK.
- Pillars: 4 → 2 → 1 at 900/480. OK.
- Featured tier badge "Most Popular" floats above border with `top: -11px` — verify no clip.

### Lesson pages (start/[slug].vue)

- The 14-dot strip wraps but is bulky on mobile (~230px vertical). Consider hiding the top strip on mobile and keeping only the bottom jumper.
- Fallback hero `.fallback-title { font-size: 32px }` is fixed — long titles (M11, M13) wrap to too many lines.
- Bottom `lesson-nav-row` already stacks at 640px (`@media (max-width: 640px) { grid-template-columns: 1fr }`). Good.
- The new MissionBrief eyebrow row "[polyhedron] ⋅))⋅ TRANSMISSION · M03 · YOUR FIRST REAL SESSION..." has no wrap — long codenames overflow. Fallback hero version DOES wrap, the actual MissionBrief does not.
- `.lesson-body :deep(h2) { font-size: 22px }` and h3 17px — readable.
- Lesson body markdown `pre` uses `overflow-x: auto` — long commands scroll cleanly.

### Tier pages

- **silver.vue:** `.persona-grid` uses `minmax(240px, 1fr)` auto-fit — drops to 1 col on mobile. `.modules` row uses flex with `align-items: flex-start` and `flex: 1` middle column — works. `.takeaways li` padding-left 36px is fine. No critical issues.
- **gold.vue:** Mirror of silver. Same auto-fit personas. OK.
- **thanks.vue:** Not opened — minor risk; static content page, low complexity.
- **start/index.vue (Bronze gate):** `.gate-form { max-width: 560px }`, `.manifest-item { grid-template-columns: 36px 1fr auto }` — works on mobile. `.gate-input` font-size confirms ≥ 14px (need to verify ≥ 16px for iOS no-zoom). Form is single column already.

## Recommended responsive breakpoints

Confirm: mobile **< 640px**, tablet **640–900px**, desktop **≥ 900px**.

The codebase is inconsistent:
- Index page uses 480, 820, 900.
- Patterns use 640.
- ProcessFlow uses 760 (min-width).
- Lesson nav uses 640.

**Recommendation:** standardize on **640 / 900** (mobile / tablet). The 820 in index hero should move to 900 for consistency with the tier/pillars breakpoint, and ProcessFlow's 760 min-width should become 640 max-width to align.

## Tap-target findings

| Element | Current size | Required (44×44 min) | Action |
|---|---|---|---|
| `.pt-dot` palette swatch | 16×16 | 44×44 | Wrap with 44×44 hit area or hide on mobile |
| `.pt-mode` sun/moon | 26×26 | 44×44 | Increase to 44×44 |
| `.lt-btn` EN/ES | ~30×22 | 44×44 | Bump padding to 8px 14px |
| `.dot` lesson progress | 34×34 | 44×44 | Increase to 40×40 (with 4px gap) on mobile |
| `.tr-btn` approve/deny | ~50×19 | 44×44 (height) | Bump padding to 8px 14px |
| `.copy-btn` (TerminalReplay scoped) | 22×22 | 44×44 | Increase ~36×36 on mobile |
| `.copy-btn` (default) | ~70×26 | 44×44 (height) | Bump min-height to 36px on mobile |
| `.df-reset` | underlined text ~14px | 44×44 | Make a real button ≥ 36×36 |
| `.cs-check` (CheckableStack) | 18×18 | 44×44 | Wrap with 44×44 hit area, or remove inner tap target |
| `.lnav-btn` | ≥ 58px tall | OK | None |
| `.tier-btn` | full-width 44+ | OK | None |
| `.btn` (.btn-primary) | 44+ | OK | None |
| Nav `.nav-links a` | text only ~20px tall | 44×44 | Add padding to make ≥ 44 tall |

## Quick-win patterns (3–5 specific CSS additions)

These knock out the bulk of the issues at once. Drop into the relevant files.

**1. DiagramShell mobile padding (saves 16px horizontal on every pattern).**
```css
@media (max-width: 640px) {
  .ds { padding: 14px 14px 14px; }
  .ds-title { font-size: 18px; }
}
```

**2. Universal "horizontal-track" pattern stacker — patch SequentialPulse + Timeline.**
```css
/* SequentialPulse.vue */
@media (max-width: 640px) {
  .sp-track { flex-direction: column; gap: 4px; }
  .sp-item { width: 100%; }
  .sp-connector { flex: 0 0 14px; transform: rotate(90deg); }
}
/* Timeline.vue */
@media (max-width: 640px) {
  .tl-track { flex-direction: column; gap: 8px; }
  .tl-item { flex-direction: row; justify-content: flex-start; gap: 12px; padding: 6px 10px; }
  .tl-arrow { display: none; }
}
```

**3. FailureTable row stacker.**
```css
@media (max-width: 640px) {
  .ft-head { display: none; }
  .ft-row {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 14px 8px;
  }
  .ft-cell { width: 100%; }
  .ft-cell::before {
    display: block;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.22em;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .ft-cell:nth-child(1)::before { content: "WRONG"; }
  .ft-cell:nth-child(2)::before { content: "TRAP"; }
  .ft-cell:nth-child(3)::before { content: "RIGHT"; }
}
```

**4. Tap-target bumper applied across primitives.**
```css
/* CopyButton.vue */
@media (max-width: 640px) {
  .copy-btn { min-height: 36px; padding: 8px 12px; }
}
/* PaletteToggle.vue */
@media (max-width: 640px) {
  .pt-dot { width: 28px; height: 28px; }
  .pt-mode { width: 40px; height: 40px; }
  .pt-wrap { padding: 6px 10px; }
}
/* LanguageToggle.vue */
@media (max-width: 640px) {
  .lt-btn { padding: 8px 14px; font-size: 12px; min-width: 44px; }
}
```

**5. Top nav mobile collapse.**
```css
@media (max-width: 768px) {
  .nav-inner { flex-wrap: wrap; gap: 8px; padding: 10px 16px; }
  .nav-links { gap: 12px; flex-wrap: wrap; flex: 1 1 100%; justify-content: flex-end; }
  .nav-links a { padding: 8px 4px; }
}
```

## Risks to monitor (not fully verified)

- **thanks.vue** — not opened in this audit; assumed low-risk static content.
- **academy/** index + sub-pages — not opened; if they reuse the same patterns they inherit the same issues.
- **Polyhedron** primitive — used in the fallback hero glyph at size=28; assumed scalable but the inner SVG geometry may have hardcoded coords.
- **HeroCustomizer / PersonaCard / PersonaExample / IxCollapse / StackedReveal / ApprovalSim / BeforeAfter / TerminalDemo / BossCheckpoint / XpOrb / ConceptCard / Quiz** — non-pattern course components; not deeply audited. These don't appear in the pattern library but may render in lessons via the markdown blocks. Quick spot-check recommended.
- **Cross-component padding stacking** — DiagramShell padding (44px horizontal) compounds with lesson padding (48px) compounds with body padding. At 375px the inside of any DiagramShell pattern body has ~283px width. Patterns assuming ≥ 320px effective width will clip.
- **The MissionBrief uses Tailwind utilities** (`flex items-center gap-2`) inline rather than scoped CSS. Any mobile fix needs to be applied with Tailwind classes (`flex-wrap`) or by adding scoped CSS that overrides — verify the quick-win additions don't conflict with Tailwind specificity.
- **Module hero patterns + HeroCustomizer** — HeroCustomizer (in components) was not read; if it renders an extra layer above MissionBrief on lesson pages, that's another horizontal eat. Worth verifying before responsive pass.
- **The 14-dot strip wraps**, so it doesn't horizontally overflow — but its visual weight is high on mobile. Treat as a UX issue, not a layout-break.
