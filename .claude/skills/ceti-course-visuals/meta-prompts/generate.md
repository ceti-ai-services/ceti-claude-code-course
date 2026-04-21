# GENERATE meta-prompt

Passed to: an **Opus-level subagent** responsible for producing two variant implementations of the visual planned in the PLAN phase.

The subagent MUST read these files first, in order:

1. `.claude/skills/ceti-course-visuals/SKILL.md`
2. `.claude/skills/ceti-course-visuals/references/rubric.md`
3. `.claude/skills/ceti-course-visuals/references/patterns.md`
4. The PLAN output for this concept (passed in as the body of the prompt).
5. `app/assets/css/main.css` — especially the `@theme` block (palette tokens).
6. The reference implementation Vue file named in the PLAN's chosen form (e.g., `app/components/course/PraoLoop.vue` for tabs+reveal).
7. The raw reference file for the chosen pattern (e.g., `references/ref-01-three-eras.svg`).

---

## Task given to the subagent

You are the GENERATE phase of the `ceti-course-visuals` skill. You will produce **TWO** variant implementations of the visual specified by the PLAN.

### Input

The full PLAN output (ONE-IDEA, FORMS CONSIDERED, FORM CHOSEN, JUSTIFICATION, COMPOSITION SKETCH, DATA SPEC, RISKS).

Plus:
- Target file path: `app/components/course/visuals/m<NN>/<concept-slug>.vue`
- Module slug: `<NN>-<module-title-slug>`

### Your job

1. **Produce two variants.** Both implement the same chosen form but differ in one axis of your choice — spacing, color emphasis, interaction micro-behavior, composition rhythm. They must be *materially* different, not cosmetic twins. Name them `Variant A` and `Variant B`.
2. Each variant is a **single Vue SFC** (preferred) or a **single inline SVG block** (if the PLAN's form is a pure diagram).
3. Follow the Vue SFC conventions from `PraoLoop.vue`:
   - `<script setup lang="ts">` for reactive state.
   - If interfaces / defaults are needed with `withDefaults`, use a separate non-setup `<script lang="ts">` block above it and `export` them.
   - Props: `eyebrow?`, `class?`, and whatever concept-specific props the data needs.
   - EN + ES: pass copy in through props from the parent hero (`t.value = lang.value === "es" ? es : en`). Do NOT hard-code English inside the visual.
   - CSS in `<style scoped>` using CETI tokens only. NEVER write raw hex or named colors. If you need a color not in the token set, flag it and stop.
4. Follow the structural rules from SKILL.md:
   - Honor `prefers-reduced-motion` — every animation wrapped in a `@media (prefers-reduced-motion: reduce) { … }` override.
   - Max 3 focal points. Max 4 colors with intent. ≥ 30% whitespace.
   - Semantic HTML (button for clickable, role for tablist, aria-selected, etc.).
   - No emojis except in strings where semantically required.
   - File ≤ 260 lines. Aim for ≤ 180.
5. For each variant, produce a **PLAN-LINK block** at the top of the file as a comment:

```ts
/*
 * Concept: <one-idea sentence>
 * Form:    <pattern name from patterns.md>
 * Variant: A (or B)
 * Varies from sibling in: <one line — what makes A ≠ B>
 * Plan ref: <short ref to which PLAN output this implements>
 */
```

6. Register the visual's self-closing tag in `app/pages/start/[slug].vue`:
   - Add to `CUSTOM_TAGS` array.
   - Add to `SELF_CLOSING_TAGS` set.
   - Add to `Block` union type.
   - Add `else if (found.tag === "<TagName>") { blocks.push({ kind: "<kind>" }) }` in the self-close branch.
   - Add `import` + template `<TagName v-else-if="block.kind === '<kind>'" />`.
7. For Vue SFC output:
   - Use Nuxt auto-imported `ref`, `computed`, `onMounted` — no explicit `from "vue"` needed (except inside non-setup `<script lang="ts">` for interface/type exports where auto-import doesn't reach).
   - Use Lucide icons imported individually from `lucide-vue-next`.

### Your output format

Return two code blocks in this exact shape, nothing else:

```
=== VARIANT A ===
target: app/components/course/visuals/m<NN>/<concept-slug>.vue
<full Vue SFC code, no surrounding backticks, no commentary>
```

```
=== VARIANT B ===
target: app/components/course/visuals/m<NN>/<concept-slug>.vue
<full Vue SFC code, no surrounding backticks, no commentary>
```

```
=== WIRING ===
A diff or full replacement text for the tokenizer hook in app/pages/start/[slug].vue that would register the new tag. Applies identically to A and B.
```

### Hard rules

- **Never output prose between code blocks.** The EVAL subagent parses these markers verbatim.
- **Never hallucinate tokens.** If a color/token you want doesn't exist in `main.css`, flag at the top of the file as a comment and stop — don't substitute a hex.
- **If a variant genuinely doesn't meet rubric #3 (space) or #4 (color) during generation, reject it internally and regenerate before outputting.** Better to fail loudly at generation than ship something the EVAL will bounce.
- **If the same variant would be output twice (A ≈ B), flag and stop. Two variants must be materially different.**
