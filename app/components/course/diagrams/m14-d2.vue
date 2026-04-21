<!--
  m14-d2 — Silver vs Gold, side by side.
  Pattern: ComparisonGrid
  Position: inside "If you want more" — replaces the two long prose
  paragraphs about Silver/Gold with a scannable compare.
-->
<script setup lang="ts">
import ComparisonGrid from "@/components/course/patterns/ComparisonGrid.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "If you want more",
  caption: "Click a column to focus. Pick the one that matches where you are.",
  columns: [
    {
      eyebrow: "BRONZE — WHERE YOU ARE",
      tagLabel: "keep practicing",
      tagRole: "support" as const,
      body: "Enough for a lot of people. Reuse CLAUDE.md, refine the one you have, catch yourself before the copy-paste reflex. Come back when you outgrow it.",
    },
    {
      eyebrow: "SILVER — $499 · 4 WEEKS",
      tagLabel: "wire it to your tools",
      tagRole: "secondary" as const,
      body: "Async cohort of 20. Leave with one weekly task running itself on a schedule across Gmail, Calendar, Notion, Airtable. Pick this if you already know the task.",
    },
    {
      eyebrow: "GOLD — $2,500 · 1:1",
      tagLabel: "we build it for you",
      tagRole: "primary" as const,
      body: "Four hours, thirty days of Slack, your stack. We sit down and build the integration rather than teach you to. Optional $1,000/mo retainer after.",
    },
  ],
}

const es = {
  title: "Si quieres más",
  caption: "Clic en una columna para enfocarla. Elige la que empata con dónde estás.",
  columns: [
    {
      eyebrow: "BRONCE — DONDE ESTÁS",
      tagLabel: "sigue practicando",
      tagRole: "support" as const,
      body: "A mucha gente le alcanza. Reusa el CLAUDE.md, refínalo, cáchate antes del copia-pega. Vuelve cuando se te quede chico.",
    },
    {
      eyebrow: "PLATA — $499 · 4 SEMANAS",
      tagLabel: "conéctalo a tus tools",
      tagRole: "secondary" as const,
      body: "Cohorte async de 20. Sales con una tarea semanal corriéndose sola entre Gmail, Calendar, Notion, Airtable. Escoge esta si ya sabes qué tarea.",
    },
    {
      eyebrow: "ORO — $2,500 · 1:1",
      tagLabel: "te lo armamos nosotros",
      tagRole: "primary" as const,
      body: "Cuatro horas, 30 días de Slack, tu stack. Nos sentamos a construir la integración en vez de enseñarte. Opcional $1,000/mes después.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <ComparisonGrid
    :title="t.title"
    :caption="t.caption"
    :columns="t.columns"
  />
</template>
