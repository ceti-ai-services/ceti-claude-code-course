<!--
  M14Hero — "Next steps — habits and the wider agentic toolkit"

  Composition: MissionBrief (transmission-style header) + Timeline.
  The course finale as a five-step journey: Bronze finished → daily practice →
  read-only opens → active correction → structured asks. Narrative weight over
  a checkbox list.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §14
  Wave C swap: CheckableStack → Timeline (B8 audit priority 2).
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import Timeline from "@/components/course/patterns/Timeline.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M14 · NEXT STEPS",
  title: "Next steps — habits and the wider agentic toolkit.",
  analogy: "You finished Bronze. Here is the path the habits take you down.",
  chips: [
    { label: "Scope first" },
    { label: "Read-only before write" },
    { label: "Correct actively" },
    { label: "Ask for structure" },
  ],
  time: "10 min",
  flowTitle: "Five steps past the finish line",
  flowCaption: "Hover a step to pin it. The highlight cycles until you do.",
  steps: [
    {
      label: "Bronze done",
      description: "fourteen modules behind you · habits start now",
      role: "support" as const,
    },
    {
      label: "Scope first",
      description: "cd into the folder before every claude · no folder, no rails",
      role: "primary" as const,
    },
    {
      label: "Read-only before write",
      description: "open new folders with a summarize · trust earned per-folder",
      role: "secondary" as const,
    },
    {
      label: "Correct actively",
      description: "redirect early · five-word fix beats a five-minute cleanup",
      role: "accent" as const,
    },
    {
      label: "Ask for structure",
      description: "name the shape · bullets, tables, file names, imperative commits",
      role: "support" as const,
    },
  ],
}

const es = {
  codename: "M14 · PRÓXIMOS PASOS",
  title: "Próximos pasos — hábitos y el kit agéntico más amplio.",
  analogy: "Terminaste Bronze. Aquí el camino que los hábitos te abren.",
  chips: [
    { label: "Primero el alcance" },
    { label: "Leer antes de escribir" },
    { label: "Corrige activo" },
    { label: "Pide estructura" },
  ],
  time: "10 min",
  flowTitle: "Cinco pasos pasando la meta",
  flowCaption: "Pasa el cursor sobre un paso para fijarlo. El resalte se cicla hasta que lo hagas.",
  steps: [
    {
      label: "Bronze hecho",
      description: "catorce módulos atrás · los hábitos empiezan ahora",
      role: "support" as const,
    },
    {
      label: "Primero el alcance",
      description: "cd a la carpeta antes de cada claude · sin carpeta, sin baranda",
      role: "primary" as const,
    },
    {
      label: "Leer antes de escribir",
      description: "abre carpetas nuevas con un resumen · confianza por carpeta",
      role: "secondary" as const,
    },
    {
      label: "Corrige activo",
      description: "redirige pronto · cinco palabras ahora, no cinco minutos después",
      role: "accent" as const,
    },
    {
      label: "Pide estructura",
      description: "nombra la forma · viñetas, tablas, archivos, commits imperativos",
      role: "support" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <Timeline
    :title="t.flowTitle"
    :caption="t.flowCaption"
    :steps="t.steps"
  />
</template>
