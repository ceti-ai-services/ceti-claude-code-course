<!--
  M04-D4 — FailureTable: four common approval-reading mistakes.
  Wrong behavior → the trap → the right move.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Approval anti-patterns",
  caption: "Four ways people get burned — and what to do instead.",
  rows: [
    {
      wrong: "rubber-stamp yes",
      trap: "Reading becomes a reflex. The diff touches six files instead of one and you miss it.",
      right: "scan the diff",
    },
    {
      wrong: "skip the backup",
      trap: "The edit went sideways and the original is gone. No git, no copy, no undo.",
      right: "duplicate first",
    },
    {
      wrong: "acceptEdits on day one",
      trap: "Silent edits pile up. You can't tell which ones were clean and which ones slipped.",
      right: "stay in default",
    },
    {
      wrong: "deny without saying why",
      trap: "Claude tries the same thing again. The back-and-forth loops with no new information.",
      right: "narrow the ask",
    },
  ],
}

const es = {
  title: "Antipatrones de aprobación",
  caption: "Cuatro formas en que la gente se quema — y qué hacer en su lugar.",
  rows: [
    {
      wrong: "aprobar por reflejo",
      trap: "Leer se vuelve un reflejo. El diff toca seis archivos en vez de uno y se te pasa.",
      right: "escanea el diff",
    },
    {
      wrong: "saltarte el backup",
      trap: "La edición salió mal y el original ya no está. Sin git, sin copia, sin deshacer.",
      right: "duplica primero",
    },
    {
      wrong: "acceptEdits el día uno",
      trap: "Las ediciones silenciosas se acumulan. No distingues cuáles salieron bien y cuáles se colaron.",
      right: "quédate en default",
    },
    {
      wrong: "rechazar sin decir por qué",
      trap: "Claude intenta lo mismo otra vez. El ida y vuelta gira sin información nueva.",
      right: "acota la petición",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable :title="t.title" :caption="t.caption" :rows="t.rows" />
</template>
