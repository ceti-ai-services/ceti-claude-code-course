# WOW rubric — the quality bar

Every visual scored by the EVAL subagent on these seven criteria. Output ships only when **at least six are GREEN** and zero are RED. Otherwise: rework with the specific red/yellow note, or escalate to re-plan.

---

## 1 · First-look clarity (5-second test)

**GREEN.** A competent learner who has never seen this concept, given 5 seconds with the static state, forms the *correct* mental model of what this visual is showing. They can finish the sentence "this is teaching me how ___ relates to ___."

**YELLOW.** They get most of it but miss one relationship or direction.

**RED.** They can't tell what it's about, or they form the wrong model.

*How to test:* ask the EVAL subagent to describe what it thinks the visual is teaching, given only the title + the image/code. If the description matches the intended concept → GREEN.

---

## 2 · Interaction reward

**GREEN.** The first click/hover reveals a *specific* additional detail that the initial view deliberately withheld — and the withheld detail is the sharpest, hardest-to-infer part of the concept.

**YELLOW.** The click reveals *something*, but it's predictable or restates the visible.

**RED.** No interaction, OR the interaction reveals filler ("more info").

*How to test:* ask "would a learner who skips every click still get the full lesson?" If yes → RED.

---

## 3 · Space economy

**GREEN.** ≥ 30% whitespace in the bounding box. ≤ 3 focal points. The eye knows where to rest and where to travel next.

**YELLOW.** Close to thresholds, or one focal point is weakly distinguished.

**RED.** Dashboard density. More than 3 focal points competing. Eye has no rest.

*How to test:* count focal points (anything the eye visits first on a squint). Measure whitespace ratio visually. If > 3 focal points or < 25% whitespace → RED.

---

## 4 · Color discipline

**GREEN.** ≤ 4 colors-with-intent, each semantically linked to a concept. If two things share a color, they're the same kind of thing. No decorative color. All colors come from CETI tokens.

**YELLOW.** 5 colors, OR one color's meaning is ambiguous.

**RED.** ≥ 6 colors, hex codes not tokens, legend required, or "it looked better this way."

*How to test:* list every color used. For each: "what concept does this color mean?" If any answer is "it's pretty" → RED.

---

## 5 · Pedagogical soundness

**GREEN.** Teaches exactly one idea. Uses progressive disclosure. Respects chunking (≤ 7 items, ideally ≤ 4). Worked example present where a rule is stated. Dual coding: the visual is independent of the text, not decoration of it.

**YELLOW.** Minor chunking violation (5–7 items) or missing worked example.

**RED.** Teaches two ideas fighting each other. Bulleted list that happens to have a border around it.

*How to test:* write the single one-idea sentence the visual teaches. If you can't do it without an "and," it's RED.

---

## 6 · CETI design system fit

**GREEN.** Only CETI palette tokens. Only CETI fonts (Inter / JetBrains Mono / Oswald / optional DM Sans). Uses existing components where appropriate (shadcn card, alert, button). Honors `prefers-reduced-motion`. Works in EN + ES via prop-based copy dict.

**YELLOW.** One deviation with a documented reason (e.g., a temporary hex until a token lands).

**RED.** Foreign fonts, raw hex colors, broken in ES, ignores reduced-motion, or rebuilds what shadcn already offers.

*How to test:* grep for `#[0-9a-f]{3,6}`, check for `prefers-reduced-motion` block, run in both `lang` values.

---

## 7 · "Stunning" test (the subjective check that saves the objective ones)

**GREEN.** A designer friend, shown only the visual with no context, says "what is this, it's nice" and wants to click it. The visual has *presence* — it earns its place on the page.

**YELLOW.** Competent but forgettable. "It's fine."

**RED.** "This looks like every other course on the internet." Or "I think this is a dashboard."

*How to test:* ask the EVAL subagent to rate the visual against the three reference files (`ref-01-three-eras`, `ref-02-three-failure-modes`, `ref-03-prao-loop-animated`) on a crafted-ness scale. If it's obviously lower-quality than those references → YELLOW/RED.

---

## Scoring

- **7 GREEN → ship.**
- **6 GREEN, 1 YELLOW → ship if the yellow is #2 or #7 (subjective); rework if it's #1, #3, #4, #5 (objective).**
- **Any RED → rework.**
- **Three consecutive rework rounds on the same criterion → escalate to re-plan (wrong visual form for this concept).**

---

## EVAL output format

The EVAL subagent returns exactly this shape:

```
Verdict: WOW | REWORK | RE-PLAN

Per-criterion scores:
1. First-look clarity:    GREEN | YELLOW | RED — <one-line reason>
2. Interaction reward:    GREEN | YELLOW | RED — <one-line reason>
3. Space economy:         GREEN | YELLOW | RED — <one-line reason>
4. Color discipline:      GREEN | YELLOW | RED — <one-line reason>
5. Pedagogical soundness: GREEN | YELLOW | RED — <one-line reason>
6. Design system fit:     GREEN | YELLOW | RED — <one-line reason>
7. Stunning test:         GREEN | YELLOW | RED — <one-line reason>

If REWORK: concrete next-iteration notes (≤ 80 words).
If RE-PLAN: which alternative form from patterns.md to try, and why.
If WOW: which reference file it's now comparable to.
```

No prose preamble. No scores out of 10. Three-state greens, nothing else. Subagent is instructed to be stingy with GREENs.
