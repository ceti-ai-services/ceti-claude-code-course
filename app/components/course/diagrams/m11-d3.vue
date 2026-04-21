<!--
  m11-d3 — A real Gmail inbox-triage walkthrough, one step per PRAO phase.
  Pattern: TracedExample
  Position: in the "What to install first" section, under the Gmail recommendation —
  shows the actual shape of a first-session Gmail query.
-->
<script setup lang="ts">
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "One Gmail call, four phases",
  caption: "The same PRAO loop, walked across one real question. Tap a step to see the artifact.",
  steps: [
    {
      phase: "Perceive",
      role: "primary" as const,
      action: "Claude reads the Gmail server's tool list and finds search_threads.",
      artifact: "tool: search_threads\n  args: { query: string, max_results?: number }\n  returns: Thread[]",
      artifactLang: "text" as const,
    },
    {
      phase: "Reason",
      role: "secondary" as const,
      action: "It translates your question into a Gmail query string.",
      artifact: 'query = "is:unread from:someone-i-replied-to older_than:30d"',
      artifactLang: "text" as const,
    },
    {
      phase: "Act",
      role: "accent" as const,
      action: "It calls search_threads and shows you the approval prompt.",
      artifact: "→ search_threads({ query, max_results: 5 })\n  scope: gmail.readonly · approve? [y/N]",
      artifactLang: "bash" as const,
    },
    {
      phase: "Observe",
      role: "support" as const,
      action: "It reads the returned threads and summarizes the oldest unread.",
      artifact: "Oldest unread: 14 Feb · Ana R. (last replied 22 Jan)\nsubject: \"Q1 renewal paperwork — waiting on you\"",
      artifactLang: "text" as const,
    },
  ],
}

const es = {
  title: "Una llamada a Gmail, cuatro fases",
  caption: "El mismo loop PRAO, recorrido sobre una pregunta real. Toca un paso para ver el artefacto.",
  steps: [
    {
      phase: "Percibir",
      role: "primary" as const,
      action: "Claude lee la lista de tools del servidor Gmail y encuentra search_threads.",
      artifact: "tool: search_threads\n  args: { query: string, max_results?: number }\n  returns: Thread[]",
      artifactLang: "text" as const,
    },
    {
      phase: "Razonar",
      role: "secondary" as const,
      action: "Traduce tu pregunta a un query de Gmail.",
      artifact: 'query = "is:unread from:alguien-a-quien-respondí older_than:30d"',
      artifactLang: "text" as const,
    },
    {
      phase: "Actuar",
      role: "accent" as const,
      action: "Llama a search_threads y te muestra la aprobación.",
      artifact: "→ search_threads({ query, max_results: 5 })\n  scope: gmail.readonly · aprobar? [s/N]",
      artifactLang: "bash" as const,
    },
    {
      phase: "Observar",
      role: "support" as const,
      action: "Lee los hilos devueltos y resume el más viejo sin leer.",
      artifact: "Más viejo sin leer: 14 feb · Ana R. (última respuesta 22 ene)\nasunto: \"Renovación Q1 — pendiente de ti\"",
      artifactLang: "text" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TracedExample
    :title="t.title"
    :caption="t.caption"
    :steps="t.steps"
  />
</template>
