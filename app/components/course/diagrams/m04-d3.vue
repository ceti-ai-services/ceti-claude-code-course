<!--
  M04-D3 — DecisionFork: the approve/deny judgment call when a prompt
  appears. Three role-colored buttons with consequences.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Approve, deny, or narrow",
  caption: "An approval prompt just appeared. What's the right move?",
  question: "The diff looks bigger than you expected. What do you do?",
  choices: [
    {
      label: "approve",
      role: "secondary" as const,
      consequence: "Only if the diff matches what you asked for and you can explain it in one sentence.",
    },
    {
      label: "deny",
      role: "accent" as const,
      consequence: "Not failure — part of the conversation. Claude will adjust and propose a smaller change.",
    },
    {
      label: "narrow",
      role: "primary" as const,
      consequence: "Reply: 'only change the first paragraph.' Claude proposes again, scoped down.",
    },
  ],
}

const es = {
  title: "Aprueba, rechaza, o acota",
  caption: "Acaba de aparecer un prompt de aprobación. ¿Cuál es el movimiento?",
  question: "El diff se ve más grande de lo que esperabas. ¿Qué haces?",
  choices: [
    {
      label: "aprobar",
      role: "secondary" as const,
      consequence: "Solo si el diff calza con lo que pediste y puedes explicarlo en una oración.",
    },
    {
      label: "rechazar",
      role: "accent" as const,
      consequence: "No es fracaso — es parte de la conversación. Claude se ajusta y propone un cambio más chico.",
    },
    {
      label: "acotar",
      role: "primary" as const,
      consequence: "Responde: 'solo cambia el primer párrafo.' Claude vuelve a proponer, más acotado.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <DecisionFork
    :title="t.title"
    :caption="t.caption"
    :question="t.question"
    :choices="t.choices"
  />
</template>
