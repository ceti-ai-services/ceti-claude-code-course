<!--
  m09-d2 — Three responses to a plan: approve, reject, redirect.
  Pattern: DecisionFork. Makes the "redirect" option tangible — most
  readers forget it exists and reflexively pick approve or reject.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "You have three moves, not two",
  caption: "Redirect is the one most people forget.",
  question: "Claude just handed you a plan. What do you say?",
  choices: [
    {
      label: "approve",
      role: "secondary" as const,
      consequence: "Exit plan mode. Claude executes — per-step approval still on.",
    },
    {
      label: "reject",
      role: "accent" as const,
      consequence: "Claude drops the plan. You restate the task with sharper scope.",
    },
    {
      label: "redirect",
      role: "primary" as const,
      consequence: "Keep steps 1–4. Fix step 5. Claude revises. You re-read.",
    },
  ],
}

const es = {
  title: "Tienes tres movimientos, no dos",
  caption: "Redirigir es el que más se olvida.",
  question: "Claude te pasó el plan. ¿Qué respondes?",
  choices: [
    {
      label: "aprobar",
      role: "secondary" as const,
      consequence: "Sales del modo plan. Claude ejecuta — la aprobación por paso sigue activa.",
    },
    {
      label: "rechazar",
      role: "accent" as const,
      consequence: "Claude descarta el plan. Replanteas la tarea con más precisión.",
    },
    {
      label: "redirigir",
      role: "primary" as const,
      consequence: "Conserva los pasos 1–4. Corrige el 5. Claude revisa. Relees.",
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
