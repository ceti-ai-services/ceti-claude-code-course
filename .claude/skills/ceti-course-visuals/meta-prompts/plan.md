# PLAN meta-prompt

Passed to: an **Opus-level subagent** responsible for choosing the right visual form for a single course concept.

The subagent MUST read these files first, in order, before producing any output:

1. `/sessions/elegant-eager-meitner/mnt/CETI/projects/ceti-claude-code-course/.claude/skills/ceti-course-visuals/SKILL.md` (the skill contract)
2. `/sessions/elegant-eager-meitner/mnt/CETI/projects/ceti-claude-code-course/.claude/skills/ceti-course-visuals/references/rubric.md` (what WOW looks like)
3. `/sessions/elegant-eager-meitner/mnt/CETI/projects/ceti-claude-code-course/.claude/skills/ceti-course-visuals/references/patterns.md` (catalog of visual forms)
4. The three reference files in `references/ref-0*` (canonical quality bar)

---

## Task given to the subagent

You are the PLAN phase of the `ceti-course-visuals` skill. Your output picks the visual form for **ONE** concept.

### Input

```
Module:      M<NN> — <title>
Concept:     <one-line description of what this visual will teach>
Position:    <nth visual in the module; earlier ones already built are: ...>
Source:      <optionally: 100–200 words from current prose that this visual replaces>
Notes:       <optional — special constraints, relationships to other visuals, etc.>
```

### Your job

1. State the ONE-IDEA sentence the visual will teach. It must fit this template: *"This visual teaches that ___ ."* — no "and," no hedging. If the concept contains two ideas, pick one and flag the other as a separate concept for a later visual.
2. Consider **at least THREE** forms from `patterns.md`. For each: one sentence on why it would or wouldn't fit this concept. Do not settle on the first idea.
3. Choose one form (or a hybrid of two — no more). Justify the choice in ≤ 80 words, citing the rubric criteria the form supports (especially **#1 first-look clarity**, **#2 interaction reward**, **#5 pedagogical soundness**).
4. Sketch the structural composition:
   - What are the ≤ 3 focal points?
   - What's the static state a reader sees at first glance?
   - What's withheld / revealed on interaction?
   - What colors (from CETI tokens) map to what meaning?
   - What animation, if any, is justified?
5. List the DATA the GENERATE phase will need (specific labels, phase names, example content, etc.) — prose bullets are fine, no code yet.

### Your output format

No preamble. Return EXACTLY this shape:

```
ONE-IDEA SENTENCE
This visual teaches that <…>.

FORMS CONSIDERED (≥ 3)
1. <Form name>. <Why fit / why not — one line.>
2. <Form name>. <Why fit / why not — one line.>
3. <Form name>. <Why fit / why not — one line.>

FORM CHOSEN
<Form name, or hybrid "A + B">.

JUSTIFICATION (≤ 80 words)
<Rubric-linked reasoning.>

COMPOSITION SKETCH
- Focal points: <1–3 items>
- Static state: <what's visible on first glance>
- Revealed on interaction: <what appears on click/hover>
- Color mapping: <token → meaning pairs>
- Motion: <none | one animation + what it answers>

DATA SPEC
- <bulleted list of the exact labels / example text / phase names the GENERATE phase needs>

RISKS
<≤ 3 one-line notes on what could go wrong, if anything>
```

### Hard rules

- **Never pick a form you haven't considered alternatives to.** The three-forms-minimum rule is non-negotiable.
- **If no form fits**, say so explicitly ("concept mismatch — recommend falling back to prose") instead of forcing a bad choice.
- **Never invent a form not in patterns.md** unless you also make the case that one of the catalog forms genuinely cannot carry this concept. If you make that case, propose the new form as an addition to patterns.md and note that Manu must approve before GENERATE runs.
- **Word budget: ≤ 500 words total.** Sharper than prose. No hedging.
