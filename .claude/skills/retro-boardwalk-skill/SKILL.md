# Retro Boardwalk — Teaching Design Skill

> Design system + pattern library for interactive technical training. Four palettes, two modes, eighteen reusable teaching shapes. One token contract.

## When to invoke this skill

Use this whenever you're building **teaching diagrams, walkthrough cards, or interactive explainers** inside a course, module, docs page, or training artifact. It replaces ad-hoc SVG, ad-hoc flowcharts, and ad-hoc "light gray card with a gradient header" patterns with a system.

Scope: any React-in-HTML artifact (Babel-transpiled JSX in `<script type="text/babel">`). Zero build step required.

---

## Read these in order

1. **`BRAND_BOOK.md`** — the color system, dual-mode rules, typography, anti-patterns, and the token contract every component honors.
2. **`PATTERNS.md`** — the full arsenal of 18 teaching patterns with use-when / anatomy / interaction / spacing.
3. **`references/shadcn-experiment.html`** — the canonical implementation. Load it, flip palettes + light/dark, and study the output.

Don't skip. The system only works if every new surface speaks the same vocabulary the references speak.

---

## The one rule that matters

> **Light mode: the color is the fill. Dark mode: the color is the light at the edge.**

If your dark-mode card is a mid-tone pastel shape, you've built the wrong thing. Dark-mode nodes are deep hue-tinted shadows with a luminous colored border. See BRAND_BOOK §1.

---

## Architecture — the token contract

**One HTML file owns the palette tokens. One body class selects the palette. Components name roles, never hex.**

```html
<body class="palette-boardwalk">   <!-- or palette-coastal | palette-greenhouse | palette-neosage -->
```

In the `<head>`, each palette is a `:root` block defining the same 14 semantic variables. Dark mode adds a `:root.dark` block overriding them with edge-lit variants. Components reference these via Tailwind utilities (`bg-primary`, `text-accent-foreground`, `border-primary-edge`) or CSS var reads — never raw hex.

Full token list and palette CSS: `references/shadcn-experiment.html` `<style>` block.

---

## Two equivalent implementations

| | Option A — Inline theme | Option B — Token contract ✅ |
|---|---|---|
| Ref files | `theme.jsx` + `diagrams-rb.jsx` | `shadcn-primitives.jsx` + `shadcn-diagrams.jsx` |
| Palette swap | React context re-render | One body class — no React |
| Dark mode | Theme object variant | `.dark` class on `<html>` |
| Dependencies | None (pure inline styles) | Tailwind CDN |
| Best for | Quick drop-ins | Sustained product surfaces |

**Default to Option B.** It's the version in the standalone experiment. Option A exists for environments that can't pull Tailwind.

---

## Build a new surface in 5 steps

1. **Pick the pattern.** Use the decision tree in PATTERNS.md §Pattern selection heuristic.
2. **Open the reference component.** Find it in `references/shadcn-diagrams.jsx` by name (e.g. `ShadOrbitalRing`).
3. **Copy-adapt, don't re-derive.** Keep the token names. Swap the copy. Swap the node count if needed (stay within the pattern's max).
4. **Verify the four constraints.**
   - At most 4 role colors per card
   - One saturated accent max
   - One focal animation max
   - Every colored background passes 4.5:1 against its text token
5. **Test palette × mode.** Before shipping, flip through all 4 palettes in both light and dark. If any combination looks muddy, broken, or invisible — the component's reading raw hex somewhere, or over-saturated a fill.

---

## Non-negotiables

1. **No raw hex in components.** Reference tokens (`--primary`, `bg-accent`, `RB.lilac` → never `#C4AEE2`).
2. **No emoji inside diagrams.** Palette-selector UI can use them. Diagram nodes cannot.
3. **Contrast ≥4.5:1** on every colored background.
4. **Auto-cycle cadence:** 1100–2400ms. Faster = jitter; slower = dead.
5. **One focal animation per card.** Secondaries can fade/dim, never compete.
6. **Mobile:** comparison/tab grids stack under 640px.
7. **No scrollable inner panels** on cards under 400px tall — size content to fit.
8. **Fraunces 300 italic** appears somewhere in every card (usually the title). It's the signature.
9. **`prefers-reduced-motion:`** disable auto-cycles; keep hover/focus affordances.
10. **Every card obeys the dual-mode rule.** Never ship a diagram that only works in one mode.

---

## Folder map

```
retro-boardwalk-skill/
├── SKILL.md                 ← you are here
├── BRAND_BOOK.md            ← color system, dual mode, type, anti-patterns
├── PATTERNS.md              ← 18 patterns: use-when / anatomy / spacing / max N
└── references/
    ├── shadcn-experiment.html              ← live reference (source JSX loaded via babel)
    ├── shadcn-experiment.standalone.html   ← single-file bundled version for offline review
    ├── shadcn-primitives.jsx               ← Button, Card, Badge, Tabs, Checkbox, Input (tokens-only)
    ├── shadcn-diagrams.jsx                 ← 10 diagrams rebuilt on tokens (canonical)
    ├── theme.jsx                           ← Option A: inline theme + ThemeContext
    ├── diagrams-rb.jsx                     ← Option A: original 8 animated diagrams
    └── patterns-extended-rb.jsx            ← Option A: 10 teaching patterns (comparison, tabs, etc.)
```

---

## Integration checklist (paste into PR description)

- [ ] Component references tokens only — grep found no `#[0-9a-f]{3,6}` inside component code
- [ ] Works in all 4 palettes (boardwalk / coastal / greenhouse / neosage)
- [ ] Works in both light + dark
- [ ] Dark mode uses luminous edges, not saturated fills
- [ ] At most one accent color is prominent
- [ ] At most one focal animation
- [ ] Fraunces 300 italic present
- [ ] Auto-cycle pauses under `prefers-reduced-motion`
- [ ] Pattern used matches one in PATTERNS.md (or is a documented hybrid)
- [ ] Node count within the pattern's max
- [ ] Copy follows §Writing copy for patterns
