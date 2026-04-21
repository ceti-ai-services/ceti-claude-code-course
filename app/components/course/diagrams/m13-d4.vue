<!--
  m13-d4 — Anti-patterns. Where new delegators waste tokens.
  Pattern: FailureTable
  Position: at/near "When not to use one" — replaces the prose list
  of don'ts with a scannable wrong → trap → right grid.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where delegation backfires",
  caption: "Click a row. Three ways people over-spawn, and what works instead.",
  rows: [
    {
      wrong: "spawn for a single edit",
      trap:  "fresh context re-reads the file you already have open",
      right: "edit inline — main session sees it already",
    },
    {
      wrong: "spawn sequential steps",
      trap:  "step two needs step one's output, so it just waits",
      right: "run them in main, or chain explicitly",
    },
    {
      wrong: "spawn to 'add context'",
      trap:  "you're copying context in by paste — defeats the point",
      right: "describe the files, let the subagent go read them",
    },
    {
      wrong: "spawn three when one will do",
      trap:  "three reports to synthesize, three times the overhead",
      right: "one subagent with a clearer brief",
    },
  ],
}

const es = {
  title: "Cuándo la delegación sale cara",
  caption: "Clic en una fila. Tres formas de excederse, y lo que sí funciona.",
  rows: [
    {
      wrong: "soltar uno por una edición",
      trap:  "el contexto nuevo relee un archivo que ya tenías",
      right: "edita en el principal — ya lo ve",
    },
    {
      wrong: "soltar pasos secuenciales",
      trap:  "el dos necesita al uno, así que espera",
      right: "córrelos en el principal o encadénalos",
    },
    {
      wrong: "soltar para 'dar contexto'",
      trap:  "copias con pegar — desarma el punto",
      right: "describe los archivos, que los lea él",
    },
    {
      wrong: "soltar tres cuando basta uno",
      trap:  "tres reportes que sintetizar, triple costo",
      right: "un subagente con mejor brief",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable
    :title="t.title"
    :caption="t.caption"
    :rows="t.rows"
  />
</template>
