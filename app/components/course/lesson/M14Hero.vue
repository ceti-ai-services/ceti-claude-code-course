<!--
  M14Hero — "Next steps — habits and the wider agentic toolkit"

  Composition: MissionBrief (transmission-style header) + CheckableStack
  (four habits to commit to — scope first, read-only before write,
  correct actively, ask for structure).

  Plan ref: docs/MODULE-VISUAL-PLAN.md §14
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M14 · NEXT STEPS",
  title: "Next steps — habits and the wider agentic toolkit.",
  analogy: "Four habits. Tick them as you go.",
  chips: [
    { label: "Scope first" },
    { label: "Read-only before write" },
    { label: "Correct actively" },
    { label: "Ask for structure" },
  ],
  time: "10 min",
  stackTitle: "Four habits to commit to",
  stackCaption: "Click a row for the why. Click the box to mark it yours.",
  items: [
    {
      title: "Scope first",
      body: "Always cd into the folder before you run claude. Scope is the first act of control — Claude reads only what the folder contains. No folder, no scope, no safety rails.",
      role: "primary" as const,
    },
    {
      title: "Read-only before write",
      body: "Start every new folder with a summarize or list request. Read the answer, judge the quality, then progress to edits. Trust is earned per-folder, not once.",
      role: "secondary" as const,
    },
    {
      title: "Correct actively",
      body: "When the plan drifts, redirect. Don't approve-and-hope. A five-word correction now saves a five-minute cleanup later. The best operators interrupt early and often.",
      role: "accent" as const,
    },
    {
      title: "Ask for structure",
      body: "Tell Claude the shape of the answer — bullets, table, file names, commit messages in imperative mood. Structure is half the prompt. The model fills shapes better than it invents them.",
      role: "support" as const,
    },
  ],
}

const es = {
  codename: "M14 · PRÓXIMOS PASOS",
  title: "Próximos pasos — hábitos y el kit agéntico más amplio.",
  analogy: "Cuatro hábitos. Márcalos conforme los haces.",
  chips: [
    { label: "Primero el alcance" },
    { label: "Leer antes de escribir" },
    { label: "Corrige activo" },
    { label: "Pide estructura" },
  ],
  time: "10 min",
  stackTitle: "Cuatro hábitos para comprometerte",
  stackCaption: "Haz clic en una fila para el porqué. Haz clic en la casilla para marcarlo tuyo.",
  items: [
    {
      title: "Primero el alcance",
      body: "Siempre haz cd a la carpeta antes de correr claude. El alcance es el primer acto de control — Claude solo lee lo que la carpeta contiene. Sin carpeta, sin alcance, sin baranda.",
      role: "primary" as const,
    },
    {
      title: "Leer antes de escribir",
      body: "Empieza cada carpeta nueva con un pedido de resumen o lista. Lee la respuesta, juzga la calidad, y de ahí pasa a editar. La confianza se gana por carpeta, no una sola vez.",
      role: "secondary" as const,
    },
    {
      title: "Corrige activo",
      body: "Cuando el plan se desvíe, redirige. No apruebes y reces. Una corrección de cinco palabras ahora te ahorra cinco minutos de limpieza después. Los mejores operadores interrumpen pronto y seguido.",
      role: "accent" as const,
    },
    {
      title: "Pide estructura",
      body: "Dile a Claude la forma de la respuesta — viñetas, tabla, nombres de archivo, commits en imperativo. La estructura es la mitad del prompt. El modelo llena formas mejor de lo que las inventa.",
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
  <CheckableStack
    :title="t.stackTitle"
    :caption="t.stackCaption"
    :items="t.items"
  />
</template>
