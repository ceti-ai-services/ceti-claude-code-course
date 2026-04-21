# Progress — after Wave B (design polish + bilingual parity)

**Snapshot:** 2026-04-21 late. Pass-3 shipped in two waves. Wave A (navigation plumbing) landed as `c0e3207`. Wave B (design polish + bilingual parity) shipped as five commits orchestrated across five parallel subagents.

## Wave A — Navigation plumbing (SHIPPED earlier)

Commit `c0e3207`. See git log for details. All six items (F1–F6 / nav set) resolved.

## Wave B — Design polish + bilingual parity (SHIPPED this pass)

Dispatched as parallel agents (B1 first, then C1/C2/B6+B7/B8/B2–B5 concurrent). All builds green. Size 5.94 MB / 1.55 MB gzip.

### Commits in order

| SHA | Scope | Author agent |
|---|---|---|
| `816cef9` | B1 — CopyButton primitive + universal DiagramShell glow/shadow | B1 |
| `4204a0d` | C2 Spanish for modules 07–13 + (bundled) B7 overflow fixes across 11 patterns | C2 + B7 (race) |
| `22682ef` | B8 — diagram quality audit report at `.agent/B8-diagram-review.md` | B8 |
| `f7ab7f1` | B6 — M13 d3 swap ScatterFlow → TradeoffMatrix | B6 |
| `ebfc7ec` | B2+B3+B4+B5 — terminal palette tokens, CodeBlock primitive, Fillable/Traced copy, M10 JSON chrome | B2–B5 |

### What shipped — by feedback item

| # | Issue | Resolution |
|---|---|---|
| F1 | Copy-to-clipboard on every code block | Shared `<CopyButton>`; integrated into `<CodeBlock>`, FillableBuilder preview, TracedExample artifacts, TerminalReplay/ThreeMovesTerminal per-line. Markdown fences now route through CodeBlock via `splitFences()` in `[slug].vue`. |
| F2 | Dark-mode terminals still cream | Added `--terminal-bg` + `--terminal-fg` tokens to every palette × mode block in `main.css`. TerminalDemo + TerminalReplay + ThreeMovesTerminal all use tokens. Zero hex leaks (verified). |
| F3 | Glow inconsistency | `DiagramShell` carries universal dark-mode `--primary-edge` glow + light-mode soft shadow. No per-component work. |
| F4 | ScatterFlow label clip | Pattern now enforces 12-char soft-cap + ellipsis + `<title>` tooltip; plus `overflow-wrap: break-word` + `min-width: 0` applied across 11 patterns. |
| F5 | M10 JSON raw monospace | Solved via B3 — the module's two `json` fences now render through CodeBlock. |
| F6 | Current dot glow | ✅ Wave A |
| F7 | Next-module button invisible in light mode | ✅ Wave A |
| F8 | M13 hero confusing | Hero kept (ComparisonGrid, pass-2). Mid-lesson d3 swapped ScatterFlow → TradeoffMatrix. |

### Bilingual coverage (new in Wave B)

- **Heroes:** 21/21 have `const es` — 100%.
- **Lessons:** 14/14 `.es.md` — 100% (07–13 added this pass).

### B8 diagram audit — key findings

Report at `.agent/B8-diagram-review.md`. Verdicts: **KEEP 58 · TWEAK 10 · SWAP 2**.

- **5 priority swaps** proposed but **not yet shipped**: `m13-d3` (done this pass), `M14Hero`, `M13Hero`, `M09Hero`, `m05-d2`.
- **Pattern inventory imbalance**: FailureTable in 11/14 modules (d4 overuse). FitTree unused (dead inventory). TradeoffMatrix + Storyboard underused.
- **Repo hygiene flag**: 7 orphan `M0XHero{A,B}.vue` variants on disk but not wired in `[slug].vue` — wire or delete.
- **A11y flag**: FileTree and FillableBuilder don't explicitly honor `prefers-reduced-motion` (likely non-animated; confirm or add guard).

## Current status

- **Build:** green, 5.94 MB (1.55 MB gzip)
- **Routes:** 14 module pages + 5 site pages, all 200
- **Diagrams:** 14 heroes + 56 mid-lesson = 70 rendering; all in palette tokens
- **Deploy:** 5 commits on main, not yet pushed
- **Bilingual parity:** complete across heroes + lesson markdown

## Next (Wave C — optional follow-up, not yet dispatched)

Based on B8 audit:

1. **Hero rework** — swap M14Hero, M13Hero, M09Hero per B8 priorities 2/3/4.
2. **`m05-d2`** — CheckableStack → Storyboard.
3. **Orphan cleanup** — decide M01HeroA/B, M02HeroA/B, M03HeroA/B, M04HeroA: wire or delete.
4. **A11y audit** — confirm FileTree/FillableBuilder reduced-motion behavior.
5. **Callout inline fences** — optionally route through CodeBlock (B2–B5 agent deferred this intentionally).
6. **Push** — `npx vercel --prod --yes` from repo root (or git push — CI auto-deploys).

## Resume protocol

1. Read this file.
2. Read `.agent/B8-diagram-review.md` for the full diagram-by-diagram list.
3. `git log --oneline -8`.
4. Pick a Wave C item (Hero rework most visible) or push and ship.
