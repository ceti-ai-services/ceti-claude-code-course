<!--
  m13-d3 — Which tasks actually fit the subagent shape?
  Pattern: ScatterFlow — independence (x) × context cost (y).
  The dashed path connects only the "fit" tasks so the reader sees
  the shape: high independence + high context cost = spawn.
-->
<script setup lang="ts">
import ScatterFlow from "@/components/course/patterns/ScatterFlow.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Which tasks fit the shape",
  caption: "High independence + heavy reading = delegate. Low + light = stay in main.",
  xLabel: "independent from each other →",
  yLabel: "← heavy reading",
  points: [
    { x: 88, y: 90, label: "five-file summary", fit: true,  role: "secondary" as const, detail: "Each file stands alone — parallel subagents shine." },
    { x: 82, y: 70, label: "wide search",      fit: true,  role: "secondary" as const, detail: "Burn the reading inside the subagent, return the hit." },
    { x: 72, y: 82, label: "bounded research", fit: true,  role: "secondary" as const, detail: "Long task, compact answer — classic subagent fit." },
    { x: 20, y: 30, label: "single edit",      fit: false, role: "support"   as const, detail: "Main session can do this directly — spawning is pure overhead." },
    { x: 28, y: 22, label: "quick question",   fit: false, role: "support"   as const, detail: "If one answer will do, one answer will do." },
    { x: 18, y: 78, label: "sequential deps",  fit: false, role: "accent"    as const, detail: "Step two needs step one's result — can't run in parallel." },
  ],
}

const es = {
  title: "Qué tareas encajan con la forma",
  caption: "Mucha independencia + lectura pesada = delega. Poca + ligera = quédate.",
  xLabel: "independientes entre sí →",
  yLabel: "← lectura pesada",
  points: [
    { x: 88, y: 90, label: "resumen de 5 archivos", fit: true,  role: "secondary" as const, detail: "Cada archivo va solo — los subagentes en paralelo brillan." },
    { x: 82, y: 70, label: "búsqueda amplia",       fit: true,  role: "secondary" as const, detail: "Quema la lectura dentro del subagente y devuelve el hallazgo." },
    { x: 72, y: 82, label: "investigación acotada", fit: true,  role: "secondary" as const, detail: "Tarea larga, respuesta compacta — el encaje clásico." },
    { x: 20, y: 30, label: "una edición",           fit: false, role: "support"   as const, detail: "La sesión principal lo hace directo — delegar es solo costo." },
    { x: 28, y: 22, label: "pregunta rápida",       fit: false, role: "support"   as const, detail: "Si una respuesta basta, basta una respuesta." },
    { x: 18, y: 78, label: "pasos dependientes",    fit: false, role: "accent"    as const, detail: "El paso dos necesita el uno — no corre en paralelo." },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <ScatterFlow
    :title="t.title"
    :caption="t.caption"
    :x-label="t.xLabel"
    :y-label="t.yLabel"
    :points="t.points"
  />
</template>
