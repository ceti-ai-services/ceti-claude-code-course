<!--
  M04-D2 — Permission modes as PhaseTabs. Three tabs with shared
  facets: what it asks, when to use, what breaks.
-->
<script setup lang="ts">
import PhaseTabs from "@/components/course/patterns/PhaseTabs.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Three permission modes",
  caption: "Click a tab. Same facets, different gear.",
  tabs: [
    {
      title: "default",
      role: "secondary" as const,
      facets: [
        { label: "Asks for", value: "Every file edit, every shell command" },
        { label: "Use when", value: "You're new, folder matters, first week" },
        { label: "Cost", value: "~2s of friction per action" },
      ],
    },
    {
      title: "acceptEdits",
      role: "primary" as const,
      facets: [
        { label: "Asks for", value: "Shell commands only — edits go silent" },
        { label: "Use when", value: "Repetitive task, pattern is clear, one session" },
        { label: "Cost", value: "Trust must be earned first" },
      ],
    },
    {
      title: "plan",
      role: "support" as const,
      facets: [
        { label: "Asks for", value: "Nothing — Claude only describes" },
        { label: "Use when", value: "Sensitive folder, unfamiliar territory" },
        { label: "Cost", value: "No execution until you switch modes" },
      ],
    },
  ],
}

const es = {
  title: "Tres modos de permiso",
  caption: "Clic en una pestaña. Mismas facetas, marcha distinta.",
  tabs: [
    {
      title: "default",
      role: "secondary" as const,
      facets: [
        { label: "Pregunta por", value: "Cada edición, cada comando de shell" },
        { label: "Úsalo cuando", value: "Eres nuevo, la carpeta importa, primera semana" },
        { label: "Costo", value: "~2s de fricción por acción" },
      ],
    },
    {
      title: "acceptEdits",
      role: "primary" as const,
      facets: [
        { label: "Pregunta por", value: "Solo comandos de shell — ediciones en silencio" },
        { label: "Úsalo cuando", value: "Tarea repetitiva, patrón claro, una sesión" },
        { label: "Costo", value: "La confianza se gana primero" },
      ],
    },
    {
      title: "plan",
      role: "support" as const,
      facets: [
        { label: "Pregunta por", value: "Nada — Claude solo describe" },
        { label: "Úsalo cuando", value: "Carpeta sensible, territorio desconocido" },
        { label: "Costo", value: "No ejecuta hasta que cambies de modo" },
      ],
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <PhaseTabs :title="t.title" :caption="t.caption" :tabs="t.tabs" />
</template>
