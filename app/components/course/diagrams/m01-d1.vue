<!--
  m01-d1 — The copy-paste loop (the "afterward" tax you pay every round)
  Pattern: OrbitalRing
  Position: early in M01, between the intro (“You did the work twice”) and
  the "shape you haven't used yet" section. Makes the loop visible.
-->
<script setup lang="ts">
import OrbitalRing from "@/components/course/patterns/OrbitalRing.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The copy-paste loop",
  caption: "Four steps. Every task. The AI did step two. You did the other three.",
  centerLabel: "EVERY TASK",
  nodes: [
    { label: "prompt", role: "support" as const },
    { label: "reply", role: "primary" as const },
    { label: "paste", role: "support" as const },
    { label: "refit", role: "accent" as const },
  ],
}

const es = {
  title: "El bucle del copia-pega",
  caption: "Cuatro pasos. Cada tarea. La IA hizo el dos. Los otros tres los hiciste tú.",
  centerLabel: "CADA TAREA",
  nodes: [
    { label: "pides", role: "support" as const },
    { label: "responde", role: "primary" as const },
    { label: "pegas", role: "support" as const },
    { label: "ajustas", role: "accent" as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <OrbitalRing
    :title="t.title"
    :caption="t.caption"
    :nodes="t.nodes"
    :center-label="t.centerLabel"
  />
</template>
