<!--
  M07-D4 — Common slash-command mistakes.
  Pattern: FailureTable. Wrong → trap → right.
-->
<script setup lang="ts">
import { computed } from "vue"
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where new authors slip",
  caption: "Click a row to pin it. Every trap has the same shape: clarity lost.",
  rows: [
    {
      wrong: "long filename",
      trap: "You type /compose-client-facing-followup and fumble the spelling every time.",
      right: "short verb",
    },
    {
      wrong: "two jobs",
      trap: "One command both summarizes and drafts. Output drifts between runs, impossible to refine.",
      right: "one file, one prompt",
    },
    {
      wrong: "vague body",
      trap: "The body says 'help with this'. Claude fills the gap differently every session.",
      right: "imperative body",
    },
    {
      wrong: "first-typed-wins",
      trap: "You save and never edit. Three weeks later the prompt is stale and you're bolting 'oh, and also' onto every run.",
      right: "edit the file",
    },
  ],
}

const es = {
  title: "Donde tropiezan los nuevos autores",
  caption: "Clic en una fila para fijarla. Toda trampa tiene la misma forma: perder claridad.",
  rows: [
    {
      wrong: "nombre largo",
      trap: "Tecleas /redactar-seguimiento-a-cliente y fallas la ortografía cada vez.",
      right: "verbo corto",
    },
    {
      wrong: "dos trabajos",
      trap: "Un comando resume y redacta. La salida cambia entre corridas, imposible de refinar.",
      right: "un archivo, un prompt",
    },
    {
      wrong: "cuerpo vago",
      trap: "El cuerpo dice 'ayúdame con esto'. Claude llena el hueco distinto cada sesión.",
      right: "cuerpo imperativo",
    },
    {
      wrong: "primer intento",
      trap: "Guardas y nunca editas. Tres semanas después el prompt está viejo y pegas 'ah, y también' en cada corrida.",
      right: "edita el archivo",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable :title="t.title" :caption="t.caption" :rows="t.rows" />
</template>
