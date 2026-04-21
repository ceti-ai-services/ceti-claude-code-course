<!--
  m13-d3 — Parallel vs. sequential: what changes when you fan out.
  Pattern: TradeoffMatrix (swapped from ScatterFlow 2026-04-21).

  Prior version used ScatterFlow to plot "which tasks fit the shape,"
  which overlapped the hero's ComparisonGrid of three patterns. This
  version teaches concept (c) — parallel vs. sequential — a dimension
  the module title promises but the other diagrams don't make concrete.

  Left = parallel subagents (N run at once). Right = sequential chain
  (each step waits). Rows name the practical dimensions so the reader
  can feel the trade instead of reading about it.
-->
<script setup lang="ts">
import TradeoffMatrix from "@/components/course/patterns/TradeoffMatrix.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Parallel, or sequential",
  caption: "Same five files, two shapes of delegation. Pick by the work, not by the habit.",
  leftHeader: {
    label: "Parallel",
    sublabel: "five subagents at once",
    role: "secondary" as const,
  },
  rightHeader: {
    label: "Sequential",
    sublabel: "one after the next",
    role: "support" as const,
  },
  rows: [
    { key: "Wall time",   left: "as long as the slowest", right: "sum of all five" },
    { key: "Main ctx",    left: "five summaries back",    right: "same, just slower" },
    { key: "Best when",   left: "tasks don't depend",     right: "step two needs step one" },
    { key: "Failure",     left: "one subagent may miss",  right: "first miss stops the chain" },
    { key: "Overhead",    left: "N spawns, one sync",     right: "one spawn, many waits" },
  ],
}

const es = {
  title: "Paralelo o secuencial",
  caption: "Mismos cinco archivos, dos formas de delegar. Elige por el trabajo, no por costumbre.",
  leftHeader: {
    label: "Paralelo",
    sublabel: "cinco subagentes a la vez",
    role: "secondary" as const,
  },
  rightHeader: {
    label: "Secuencial",
    sublabel: "uno tras otro",
    role: "support" as const,
  },
  rows: [
    { key: "Tiempo",      left: "lo que tarde el más lento", right: "la suma de los cinco" },
    { key: "Ctx princ",   left: "cinco resúmenes de vuelta", right: "igual, pero más lento" },
    { key: "Mejor si",    left: "no dependen entre sí",      right: "el dos necesita al uno" },
    { key: "Si falla",    left: "uno puede perder algo",     right: "el primer fallo corta todo" },
    { key: "Costo",       left: "N spawns, una síntesis",    right: "un spawn, muchas esperas" },
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
