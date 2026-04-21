<!--
  M06D3 — Trap patterns during execution.
  Pattern: FailureTable. Wrong → trap → right.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Three traps during execution",
  caption: "The same three show up on everyone's first real task.",
  rows: [
    {
      wrong: "accept-all",
      trap: "You skim approvals because the first six were fine. The seventh writes to the wrong folder.",
      right: "read every diff",
    },
    {
      wrong: "polite correction",
      trap: "\"Could you perhaps shorten slightly?\" — Claude adjusts by 4%. You repeat three times.",
      right: "direct and specific",
    },
    {
      wrong: "ship without closing",
      trap: "You forget the one file, the one decision, the one open thread. It surfaces Monday at 8am.",
      right: "\"summarize what we did\"",
    },
  ],
}

const es = {
  title: "Tres trampas al ejecutar",
  caption: "Las mismas tres aparecen en la primera tarea real de todos.",
  rows: [
    {
      wrong: "aprobar todo",
      trap: "Ojeas las aprobaciones porque las primeras seis estaban bien. La séptima escribe en la carpeta equivocada.",
      right: "lee cada diff",
    },
    {
      wrong: "corrección amable",
      trap: "\"¿Podrías tal vez acortarlo un poco?\" — Claude ajusta 4%. Repites tres veces.",
      right: "directa y específica",
    },
    {
      wrong: "cerrar sin revisar",
      trap: "Olvidas el archivo, la decisión, el hilo abierto. Reaparece el lunes a las 8am.",
      right: "\"resume lo que hicimos\"",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable :title="t.title" :caption="t.caption" :rows="t.rows" />
</template>
