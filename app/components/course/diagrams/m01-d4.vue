<!--
  m01-d4 — Pick the task you'll bring to Module 06
  Pattern: DecisionFork
  Position: just before the closing TryThis. Turns the abstract
  "pick a painful weekly task" into a concrete judgment call with
  immediate feedback.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Which task will you bring to Module 06?",
  caption: "Pick one. More painful is better. You'll actually solve it later.",
  question: "Which of these eats your week most predictably?",
  choices: [
    {
      label: "Weekly report",
      role: "primary" as const,
      consequence: "Good fit. Reads ten files, writes one — Claude Code's sweet spot.",
    },
    {
      label: "DM / email pile",
      role: "secondary" as const,
      consequence: "Good fit. Same question answered differently ten times becomes one draft, ten variants.",
    },
    {
      label: "Receipts & files",
      role: "accent" as const,
      consequence: "Good fit. Sort, rename, file — the boring half vanishes.",
    },
  ],
}

const es = {
  title: "¿Qué tarea vas a traer al Módulo 06?",
  caption: "Elige una. Mientras más dolorosa, mejor. La vas a resolver de verdad.",
  question: "¿Cuál de estas te come la semana de forma más predecible?",
  choices: [
    {
      label: "Reporte semanal",
      role: "primary" as const,
      consequence: "Buen encaje. Lee diez archivos y escribe uno — el punto fuerte de Claude Code.",
    },
    {
      label: "Pila de DMs",
      role: "secondary" as const,
      consequence: "Buen encaje. La misma pregunta contestada distinto diez veces se vuelve un borrador con diez variantes.",
    },
    {
      label: "Recibos y archivos",
      role: "accent" as const,
      consequence: "Buen encaje. Ordenar, renombrar, archivar — la mitad aburrida desaparece.",
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
