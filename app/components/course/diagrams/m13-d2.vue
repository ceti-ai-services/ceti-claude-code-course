<!--
  m13-d2 — Spawn a subagent, or do it inline?
  Pattern: DecisionFork
  Position: at the start of "When to use one" — a judgment call the
  reader has to make every time. Two choices, consequence appears below.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Spawn, or stay?",
  caption: "The judgment call before every delegation.",
  question: "Five files to summarize, none depending on the others — what do you do?",
  choices: [
    {
      label: "stay in main",
      role: "support" as const,
      consequence: "Main context fills with five file bodies. By file three, Claude is drifting.",
    },
    {
      label: "spawn a subagent",
      role: "secondary" as const,
      consequence: "Subagent reads all five in its own context, returns one paragraph. Main stays clean.",
    },
  ],
}

const es = {
  title: "¿Delegas o lo haces tú?",
  caption: "La decisión que tomas antes de cada delegación.",
  question: "Cinco archivos que resumir, ninguno depende del otro — ¿qué haces?",
  choices: [
    {
      label: "lo hago yo",
      role: "support" as const,
      consequence: "El contexto principal se llena con cinco archivos. Al tercero, Claude ya divaga.",
    },
    {
      label: "suelto un subagente",
      role: "secondary" as const,
      consequence: "El subagente los lee en su contexto y devuelve un párrafo. El principal queda limpio.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <DecisionFork
    :title="t.title"
    :caption="t.caption"
    :question="t.question"
    :choices="t.choices"
  />
</template>
