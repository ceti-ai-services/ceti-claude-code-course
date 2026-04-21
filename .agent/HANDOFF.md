# HANDOFF — CETI Claude Code Academy · Refactor Pass 3 prep

**Updated:** 2026-04-21 late (after Manu's live review of pass-2).

Pass-1 shipped design foundation. Pass-2 shipped 70 diagrams + dark-contrast bump. Manu reviewed live and called the design "AWESOME" — but surfaced a specific list of issues. Pass-3 addresses them in two waves:

## Wave A — Navigation plumbing (this pass)

Focus stated by Manu: "focus on navigation plumbing for now and i'll dive deeper into the design."

1. **M01 end-of-page "← Back to start" goes to `/` which is the pre-signup landing.** Should go to `/start` so signed-in readers land on the module grid, not the marketing page.
2. **Next-module button invisible in light mode.** Screenshot 7 shows the `.btn-primary` has white text on cream — `color: hsl(var(--background))` resolves to the page background, not the button foreground. Fix: use `hsl(var(--primary-foreground))`.
3. **Add "Review Lesson" button** — scrolls to top so the reader can re-see the hero + 4 mid-lesson diagrams + hit the top nav.
4. **Duplicate the progress-dots strip at the bottom** — the whole-course jumper should be reachable without scrolling to the top.
5. **LanguageToggle (EN/ES) active-state highlight is invisible/strange.** Rebuild with clear toggle feedback — active gets a solid gold fill + clear ring; inactive fades muted.
6. **Current-module dot is hard to see in dark mode.** Add glow / box-shadow / scale bump to `.dot-current` so the "you are here" is unmissable.

## Wave B — Design polish (next pass, documented for agent dispatch)

1. **Copy-to-clipboard on every code / prompt block.** Core decision (logged in CLAUDE.md §copy-decision). Every code fence, every FillableBuilder preview, every TracedExample artifact, every Terminal line — all get a one-click copy button with visual feedback. This includes blocks nested inside other diagrams.
2. **Dark-mode terminal diagrams still render light-cream chrome.** TerminalReplay + any M03/M04/M11 diagrams that embed terminal chrome use hardcoded `bg-[#1a1714]` or similar. Convert every terminal surface to palette tokens so dark mode goes dark, light mode stays pale-cream.
3. **Consistent glow across all diagrams.**
   - **Dark mode:** every `.ds` card gets a subtle luminous edge glow (the good one from the M10 hero screenshot). Achieve with `box-shadow: 0 0 0 1px hsl(var(--border)), 0 0 24px -8px hsl(var(--primary-edge) / 0.2)`.
   - **Light mode:** every `.ds` card gets a soft drop shadow (`0 6px 24px -8px hsl(var(--foreground) / 0.12)`) so cards have depth without gradient soup.
4. **M13 ScatterFlow is hard to understand + labels clip.** Swap M13 hero from ScatterFlow → different pattern (maybe `Storyboard` showing the three patterns with scenarios, or `ComparisonGrid` already-used-for-M13-hero-so-pick-Storyboard). Also: fix ScatterFlow pattern generally — labels ≤ 12 chars and they're truncating.
5. **M10 JSON code block renders as raw monospace with no chrome.** Needs terminal or code-block wrapper with copy button, line numbers optional, dark in dark-mode.
6. **Text overflow** in various blocks (ScatterFlow, possibly TracedExample artifacts). Audit every pattern for `overflow-wrap: break-word` + max-width guards.
7. **Diagram-per-module quality variance.** Some modules land better than others — MERCURIO pass on the whole 70-diagram set, flag the weak ones, rework them.

## Concrete files for Wave A

| File | Change |
|---|---|
| `app/assets/css/main.css` | Fix `.btn-primary` color to `hsl(var(--primary-foreground))`. Add `.dot-current` glow keyframe for dark mode. |
| `app/pages/start/[slug].vue` | Restructure `.lesson-nav`: add Review button + bottom progress-dots; M01 prev routes to `/start`. |
| `app/components/course/LanguageToggle.vue` | Rebuild active-state styling — active = `bg-primary text-primary-foreground shadow` clear, inactive = `text-muted-foreground`. |

## Core decisions logged (survive context resets)

- **D-2026-04-21-copy**: Every code/prompt block gets a copy button. Implementation: shared `<CopyButton>` component, `navigator.clipboard.writeText` + transient checkmark feedback.
- **D-2026-04-21-glow**: Dark-mode diagrams get luminous-edge glow; light-mode diagrams get soft drop shadow. Applied universally via `DiagramShell` so no per-component work.
- **D-2026-04-21-terminal-surface**: All terminal/code surfaces use palette tokens, never hex. In dark mode, terminal bg = `hsl(var(--background))` shifted slightly darker; in light mode, terminal bg = `hsl(var(--muted))` pale-cream.
- **D-2026-04-21-nav**: Bottom nav = three-button row (prev / Review-scroll-top / next) + duplicated progress-dots strip. Review button uses `window.scrollTo({ top: 0, behavior: 'smooth' })`.

## Resume protocol

1. Read this HANDOFF.md
2. Read `progress.md`
3. `git log --oneline -6`
4. Wave A fixes → commit → push
5. Spawn design-pass agents for Wave B with narrow, specific prompts pulled from §Wave B above.
