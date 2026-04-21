<!--
  m09-d4 — A real redirect, step by step. A plan comes back, one step
  is wrong, the reader nudges it, execution proceeds.
  Pattern: TracedExample. Click each row to see the artifact verbatim.
-->
<script setup lang="ts">
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "A plan, redirected",
  caption: "Same task. One step off. The fix is a sentence.",
  steps: [
    {
      phase: "ask",
      role: "support" as const,
      action: "request the change in plan mode",
      artifact: "rename all three files with today's date as a prefix",
    },
    {
      phase: "plan",
      role: "primary" as const,
      action: "Claude returns a numbered dry run",
      artifact: "1. notes.md    → 2026-04-21-notes.md\n2. draft.md    → 2026-04-21-draft.md\n3. archive.md  → 2026-04-21-archive.md",
    },
    {
      phase: "spot",
      role: "accent" as const,
      action: "notice step 3 is wrong — archive.md should stay",
      artifact: "# don't touch anything in archive/",
    },
    {
      phase: "redirect",
      role: "primary" as const,
      action: "nudge Claude, keep the rest",
      artifact: "steps 1 and 2 are fine. skip step 3 — leave archive.md alone.",
    },
    {
      phase: "revise",
      role: "secondary" as const,
      action: "re-read the shorter plan",
      artifact: "1. notes.md → 2026-04-21-notes.md\n2. draft.md → 2026-04-21-draft.md",
    },
    {
      phase: "run",
      role: "accent" as const,
      action: "exit plan mode; approve per-step as Claude executes",
    },
  ],
}

const es = {
  title: "Un plan, redirigido",
  caption: "Misma tarea. Un paso mal. La corrección es una frase.",
  steps: [
    {
      phase: "pide",
      role: "support" as const,
      action: "pide el cambio en modo plan",
      artifact: "renombra los tres archivos con la fecha de hoy como prefijo",
    },
    {
      phase: "plan",
      role: "primary" as const,
      action: "Claude devuelve un simulacro numerado",
      artifact: "1. notes.md    → 2026-04-21-notes.md\n2. draft.md    → 2026-04-21-draft.md\n3. archive.md  → 2026-04-21-archive.md",
    },
    {
      phase: "detecta",
      role: "accent" as const,
      action: "el paso 3 está mal — archive.md debe quedarse",
      artifact: "# no toques nada dentro de archive/",
    },
    {
      phase: "redirige",
      role: "primary" as const,
      action: "corrige a Claude, conserva lo demás",
      artifact: "los pasos 1 y 2 están bien. salta el 3 — deja archive.md.",
    },
    {
      phase: "revisa",
      role: "secondary" as const,
      action: "relee el plan ajustado",
      artifact: "1. notes.md → 2026-04-21-notes.md\n2. draft.md → 2026-04-21-draft.md",
    },
    {
      phase: "corre",
      role: "accent" as const,
      action: "sal del modo plan; aprueba paso a paso al ejecutar",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TracedExample
    :title="t.title"
    :caption="t.caption"
    :steps="t.steps"
  />
</template>
