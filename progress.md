# Progress — after Pass 3a (navigation plumbing)

**Snapshot:** 2026-04-21 late. Manu reviewed pass-2 live. Said the design is "AWESOME" and the course is looking "MUCH better." Called out a specific list of issues. Pass 3 splits into two waves.

## Wave A — Navigation plumbing (SHIPPED, commit c0e3207)

1. ✅ **M01 back-button routes to `/start`** instead of `/` (marketing page).
2. ✅ **`.btn-primary` contrast fixed** — was invisible in light mode (cream text on cream fill). Now uses `hsl(var(--primary-foreground))`.
3. ✅ **"Review lesson" button** — smooth-scrolls to top, honors `prefers-reduced-motion`.
4. ✅ **Bottom module-jumper strip** — duplicates the top progress dots at the bottom.
5. ✅ **EN/ES toggle** — active state was unstyled (the `bg-gold` utility didn't exist in the palette system). Rebuilt with scoped palette tokens + mode-specific glow.
6. ✅ **Current-module dot glow** — luminous ring + scale-up in dark mode, solid glow in light.

Live on dev-learn.cetiai.co.

## Wave B — Design polish (NEXT PASS)

All items have concrete fix specifications logged in `.agent/HANDOFF.md §Wave B` and core decisions in `CLAUDE.md` (§copy-decision, §glow-decision).

### Agent team for Wave B (plan, not yet dispatched)

| Agent | Scope | Outputs |
|---|---|---|
| B1 — primitives | Build `<CopyButton>` component + update `DiagramShell` with dark glow + light shadow | shared copy UX + consistent card depth |
| B2 — terminal surfaces | Convert all terminal chrome (TerminalReplay, ThreeMovesTerminal, any m<NN>-d<N>.vue using terminal aesthetic) to palette tokens | dark-mode terminals go dark, light-mode stay cream |
| B3 — code blocks | Wrap all `<pre><code>` markdown output in a code-block component with CopyButton; audit `.prose` styles for pattern | every code fence has copy |
| B4 — copy-integration | Audit FillableBuilder, TracedExample, any diagram that exposes verbatim text; add CopyButton to their artifact slots | nested copy works |
| B5 — M10 JSON block | Wrap the hooks `settings.json` block in a proper code surface with chrome | fixes screenshot #5 |
| B6 — M13 swap | Rework M13 diagrams — hero is ComparisonGrid (good); audit the 4 mid-lesson diagrams for clarity. ScatterFlow label-clip fix in the pattern. | clearer subagent teaching |
| B7 — overflow audit | Grep every pattern for fixed widths + hardcoded `text-overflow` behavior; standardize with `overflow-wrap: break-word` | no truncated text |
| B8 — MERCURIO | Review all 70 diagrams, flag weak ones, propose replacements | quality parity across modules |

### Feedback items from Manu's review (log, verbatim context)

| # | Issue | Location | Spec |
|---|---|---|---|
| F1 | All copyable blocks need a copy button with single-click UX | Every code, prompt, FillableBuilder preview, TracedExample artifact, Terminal line | `<CopyButton :text="..." />`, clipboard API, transient checkmark |
| F2 | Dark-mode terminal diagrams still use light-cream chrome | M03 TerminalReplay (screenshot #2) | Use `hsl(var(--card))`-shifted bg; terminal text uses `hsl(var(--foreground))` |
| F3 | Glow on diagrams is inconsistent — the "awesome" one should be everywhere | Compare M10 hero (great) vs. others | `DiagramShell` adds dark-mode glow + light-mode shadow universally |
| F4 | Text overflow — labels clipping | M13 ScatterFlow ("five-fi", "bounded researc"), possibly TracedExample | Max label 12 chars in ScatterFlow; `overflow-wrap: break-word` + `min-width: 0` on text containers |
| F5 | M10 hooks JSON block renders as raw monospace with no chrome | screenshot #5 | Wrap in code-block component with chrome + CopyButton |
| F6 | Current module number hard to see in dark mode | top progress-dots | ✅ FIXED in Wave A (glow ring) |
| F7 | Next-module button invisible in light mode — class is there but glow-only visible | screenshot #7 | ✅ FIXED in Wave A (btn-primary fg token) |
| F8 | M13 hero pattern (was ScatterFlow) is confusing | screenshot #8 | Swapped to ComparisonGrid in pass-2. **Remaining**: audit M13 mid-lesson diagrams for clarity |

### Design decisions locked in CLAUDE.md

- **Copy-to-clipboard rule (§v4.2):** every copyable block gets `<CopyButton>`. Top-right placement, always visible on mobile, hover-visible on desktop, transient checkmark feedback.
- **Glow & depth rule (§v4.2):** Dark mode cards glow with `0 0 32px -10px hsl(var(--primary-edge) / 0.18)`. Light mode cards use `0 1px 2px 0.06, 0 8px 24px -12px 0.10`.
- **Terminal surface rule:** terminals follow the palette — never hex. Dark mode terminal bg is deeper than card bg; light mode is warm-cream.

## Current status

- **Build**: green (5.91 MB, 1.55 MB gzip)
- **Routes**: 14 module pages + 5 site pages all 200
- **Deploy**: commit `c0e3207` pushed, Vercel auto-deploying
- **Diagrams**: 14 heroes + 56 mid-lesson = 70 rendering
- **Next**: spawn Wave B agents B1–B8 in parallel

## Resume protocol

1. Read this file.
2. Read `.agent/HANDOFF.md §Wave B`.
3. `git log --oneline -6`.
4. Spawn Wave B agents (specs in HANDOFF.md §Wave B table).
5. Build + verify + commit + push.
