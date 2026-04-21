# Retro Boardwalk — Brand Book

A dual-mode design system for teaching technical concepts. Four palettes, two modes, one contract.

---

## 1 · The core insight

**In light mode, the color is the fill. In dark mode, the color is the light at the edge.**

This is the single rule that makes dark mode not look like a generic dark app.

| Element | Light mode | Dark mode |
|---|---|---|
| Background | warm cream (tinted toward palette hue) | deep ink (tinted toward palette hue) |
| Node fill | pastel, saturated | dark shadow of the hue — 1.1–1.4 : 1 against bg |
| Node border | none | **the luminous palette color** |
| Node text | dark hue | luminous palette color (matches border) |
| Accent | one saturated pop | one saturated pop (unchanged) |

If a dark-mode node is readable without the border, you've painted it too bright. Back off the fill; let the edge carry the signal.

---

## 2 · Palettes

Four named families. Each has a personality — pick based on the subject matter, not what's prettiest.

### 🎡 Retro Boardwalk

90s nostalgia, softened. Warm cream, pastel lilac, sage mint, dusty coral. Use for: welcoming onboardings, human-feeling content, anything that should feel lived-in.

### 🌊 Coastal Mist

Warm/cool tension held by seafoam + blush. Use for: two-sided comparisons, tradeoffs, anything where "balance" is the lesson.

### 🌿 Greenhouse

Botanical earth tones. Olive, terracotta, sage. Use for: systems thinking, organic processes, growth metaphors, infrastructure content.

### ⚡ Neo Sage

Muted-neon tension. Dusty violet + acid lime + amber. Use for: high-energy training, "electric" concepts, anything that needs visual punch.

---

## 3 · The token contract

Every diagram reads from **the same semantic roles**. Your code never names a hex; it names a role.

| Token | Meaning |
|---|---|
| `background` | The canvas |
| `card` / `surface` | A container sitting on the canvas |
| `foreground` / `ink` | Primary body text |
| `muted-foreground` / `dim` | Secondary / caption text |
| `border` | Hairline separators |
| `primary` | The "first" teaching color — usually the input/read phase |
| `secondary` | The "second" — usually planning/reason |
| `accent` | The active/CTA/output color — one pop per view |
| `support` | The "fourth wheel" — observe/neutral |
| `*-edge` | **Dark-mode only** — the luminous border color for each role |

### Role → phase mapping (PRAO)

When teaching the PRAO loop, always map:

- **Perceive → primary**
- **Reason → secondary**
- **Act → accent**
- **Observe → support**

This is the same mapping across all four palettes, which is why diagrams are palette-agnostic.

---

## 4 · Typography

Three faces, fixed roles.

| Face | Use | Weights |
|---|---|---|
| **Fraunces** (serif, italic) | Display headlines, card titles | 300 italic, 600 |
| **DM Sans** (sans) | Body, UI, everything else | 400, 500, 600, 700 |
| **Space Mono** (mono) | Code, file paths, artifacts | 400, 700 |

Rules:
- Display text uses Fraunces 300 italic. The italic is non-negotiable — it's the signature.
- Never mix weights within a single sentence.
- Minimum body size: 11px. Captions: 9–10px with `tracking-[0.2em] uppercase`.
- Line-height 1.5 for body, 1.1 for display.

---

## 5 · Composition rules

### Spacing
- Radius scale: **4 / 6 / 8 / 10 / 14 / 18px**. Nothing in between.
- Card padding: **16–24px**. Less on nested cards.
- Gap between sibling chips: **6px**. Between sections: **14–18px**.

### Elevation
- **Light mode:** soft shadow, `0 6px 16px rgba(ink, 0.12)` when active.
- **Dark mode:** replace shadows with luminous outlines — `0 0 0 2px <edge>/25`, no drop shadow. Shadows on dark bg just make things muddy.

### Motion
- Default easing: `ease-out 0.2–0.35s`.
- Active-state transforms: `translateY(-2px) scale(1.03)`.
- Auto-cycle intervals: **1.1s** (fast pulse), **1.4s** (orbital), **2.0–2.4s** (commentary needs reading time).
- `prefers-reduced-motion`: disable auto-cycles, keep hover/focus states.

### Iconography
- **Placeholders only.** Emoji for brand moments (the palette chooser uses 🎡 🌊 🌿 ⚡), never inline inside diagrams.
- If a concept needs an icon, draw it as a mono-weight SVG in `--foreground`, 1.5px stroke, 18–22px box.

---

## 6 · Anti-patterns

Things that look right but aren't:

| ❌ Don't | ✅ Do |
|---|---|
| Use mid-tone saturated fills in dark mode | Dark shadow fills + luminous borders |
| Add more than one accent per view | Reserve accent for the one CTA/active state |
| Use `#000` or neutral gray backgrounds in dark | Tint the dark bg toward the palette hue |
| Invent new hex values in components | Reference a token role |
| Emoji icons on diagram nodes | Text labels or placeholder squares |
| Hairline borders in dark mode using `#333` | Use `hsl(var(--border))` — it's edge-tinted |
| Gradient backgrounds as "interest" | Negative space + a single luminous accent |
| Mix more than 3 role colors in one card | 2 primary roles + 1 accent max |

---

## 7 · Which implementation to reach for

Two equivalent implementations exist. Pick one per project and don't mix:

### Option A — Inline theme (`theme.jsx` + React context)
Good when: You need diagrams to work without a build step, as drop-in components into existing HTML prototypes.
Files: `theme.jsx`, `diagrams-rb.jsx`, `patterns-extended-rb.jsx`.

### Option B — Token contract (`shadcn-primitives.jsx` + Tailwind)
**Recommended.** Good when: You're building a sustained training product with many surfaces. One class on `<body>` re-skins everything.
Files: `shadcn-primitives.jsx`, `shadcn-diagrams.jsx`, and the palette CSS in the HTML `<head>`.

Both are in `references/`. Option B is the reference implementation going forward.

---

## 8 · Checklist for any new surface

Before shipping a diagram or layout:

- [ ] It reads correctly in all 4 palettes (swap the body class to verify)
- [ ] It reads correctly in dark mode — no invisible text, no muddy fills
- [ ] At most one saturated accent is visible
- [ ] No raw hex codes in component code
- [ ] Fraunces 300 italic is used somewhere (usually a title)
- [ ] At least one role-border treatment is visible in dark mode
- [ ] Auto-animation pauses / is disabled under `prefers-reduced-motion`
- [ ] Caption uses `italic text-muted-foreground` and is under 80 chars
