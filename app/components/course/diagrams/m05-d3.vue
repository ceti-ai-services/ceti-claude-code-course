<!--
  M05D3 — The thing people get wrong: CLAUDE.md as prompt.
  Pattern: FailureTable. Wrong → trap → right, three rows.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Three ways people ruin a good CLAUDE.md",
  caption: "Wrong shape, not wrong effort. Fix the shape.",
  rows: [
    {
      wrong: "prompt style",
      trap: "\"You are a helpful assistant with a warm professional tone…\" — Claude already has a job description.",
      right: "briefing doc",
    },
    {
      wrong: "two-page essay",
      trap: "The longer it gets, the less your future self maintains it. Vague beats stale.",
      right: "one screen",
    },
    {
      wrong: "generic conventions",
      trap: "\"Be clear and concise\" helps no one. Name the specific thing only you could name.",
      right: "specific \"never do\"",
    },
  ],
}

const es = {
  title: "Tres formas de arruinar un buen CLAUDE.md",
  caption: "No es falta de esfuerzo — es forma equivocada. Cambia la forma.",
  rows: [
    {
      wrong: "estilo prompt",
      trap: "\"Eres un asistente útil con tono cálido y profesional…\" — Claude ya tiene descripción de puesto.",
      right: "doc de briefing",
    },
    {
      wrong: "ensayo de dos páginas",
      trap: "Mientras más largo, menos lo mantiene tu yo futuro. Vago le gana a viejo.",
      right: "una pantalla",
    },
    {
      wrong: "convenciones genéricas",
      trap: "\"Sé claro y conciso\" no ayuda a nadie. Nombra lo específico que solo tú podrías nombrar.",
      right: "\"nunca hagas\" preciso",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable :title="t.title" :caption="t.caption" :rows="t.rows" />
</template>
