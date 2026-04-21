<!--
  m01-d2 — Vending machine vs colleague, broken out by dimension
  Pattern: TradeoffMatrix
  Position: inside/after "The mental model that fixes this". The hero's
  ComparisonGrid names the metaphor; this breaks it into five concrete
  dimensions so the reader can feel the shift.
-->
<script setup lang="ts">
import TradeoffMatrix from "@/components/course/patterns/TradeoffMatrix.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "What changes, dimension by dimension",
  caption: "Same model. Different shape of working relationship.",
  leftHeader: {
    label: "Vending machine",
    sublabel: "chatbot in a browser",
    role: "support" as const,
  },
  rightHeader: {
    label: "Colleague",
    sublabel: "Claude Code in your folder",
    role: "secondary" as const,
  },
  rows: [
    { key: "Lives in",  left: "a website tab",              right: "the folder with your work" },
    { key: "Sees",      left: "what you paste",             right: "the real files, directly" },
    { key: "Memory",    left: "forgets when you close it",  right: "holds the session together" },
    { key: "Output",    left: "text you must relocate",     right: "edits, with your approval" },
    { key: "Your job",  left: "transcribe, then reshape",   right: "review and decide" },
  ],
}

const es = {
  title: "Qué cambia, dimensión por dimensión",
  caption: "Mismo modelo. Otra forma de relación de trabajo.",
  leftHeader: {
    label: "Máquina expendedora",
    sublabel: "chatbot en el navegador",
    role: "support" as const,
  },
  rightHeader: {
    label: "Colega",
    sublabel: "Claude Code en tu carpeta",
    role: "secondary" as const,
  },
  rows: [
    { key: "Vive en",   left: "una pestaña web",             right: "la carpeta con tu trabajo" },
    { key: "Ve",        left: "lo que tú le pegas",          right: "los archivos reales, directo" },
    { key: "Memoria",   left: "se va al cerrar la pestaña",  right: "sostiene la sesión" },
    { key: "Salida",    left: "texto que tú tienes que mover", right: "ediciones, con tu permiso" },
    { key: "Tu parte",  left: "transcribir y rehacer",       right: "revisar y decidir" },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TradeoffMatrix
    :title="t.title"
    :caption="t.caption"
    :left-header="t.leftHeader"
    :right-header="t.rightHeader"
    :rows="t.rows"
  />
</template>
