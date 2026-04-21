<!--
  m12-d2 — Push now vs. draft PR first — the default-choice fork.
  Pattern: DecisionFork
  Position: inside "The draft PR pattern", replacing the prose that lists
  the options. Reader picks, sees the consequence.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Push now, or open a draft PR?",
  caption: "For anything non-trivial, the draft PR is the safer default — even solo.",
  question: "Your commit looks right. What's the next move?",
  choices: [
    {
      label: "Push straight to main",
      role: "accent" as const,
      consequence: "Fast, but the diff skips CI and a second read. Fine for a typo. Risky for anything that touches behavior.",
    },
    {
      label: "Push branch · open draft PR",
      role: "secondary" as const,
      consequence: "CI runs, the diff gets a second pass, and future-you reviewing on a phone catches what current-you approved too fast.",
    },
    {
      label: "Hold the commit locally",
      role: "support" as const,
      consequence: "Safe, but the work isn't durable yet. Push the branch even if the PR stays in draft — the remote is the backup.",
    },
  ],
}

const es = {
  title: "¿Push directo, o PR en borrador?",
  caption: "Para cualquier cosa no trivial, el PR borrador es el default más seguro — incluso en solitario.",
  question: "El commit se ve bien. ¿Qué sigue?",
  choices: [
    {
      label: "Push directo a main",
      role: "accent" as const,
      consequence: "Rápido, pero el diff se salta CI y una segunda lectura. Está bien para un typo. Riesgoso si toca comportamiento.",
    },
    {
      label: "Push branch · PR borrador",
      role: "secondary" as const,
      consequence: "Corre CI, el diff recibe una segunda pasada, y el tú-futuro revisándolo en el celular atrapa lo que el tú-presente aprobó rápido.",
    },
    {
      label: "Guardar el commit local",
      role: "support" as const,
      consequence: "Seguro, pero el trabajo aún no es durable. Empuja la rama aunque el PR quede en borrador — el remoto es el respaldo.",
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
