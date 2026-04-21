<!--
  m02-d1 — Which sign-in path fits you?
  Pattern: DecisionFork
  Position: inside "Prerequisites", right after the two sign-in paths
  are named. Replaces the "Pick whichever you already have..." paragraph
  with an interactive judgment call.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Pick your sign-in path",
  caption: "Two valid doors. Pick whichever you already have.",
  question: "How do you already pay for Claude?",
  choices: [
    {
      label: "Claude.ai Pro / Max",
      role: "secondary" as const,
      consequence: "Simplest path. Same login works in Claude Code — nothing else to set up.",
    },
    {
      label: "Anthropic API key",
      role: "primary" as const,
      consequence: "Billing per request. Paste a sk-ant- key at the prompt. Treat it like a password.",
    },
    {
      label: "Neither yet",
      role: "accent" as const,
      consequence: "Get Claude.ai Pro first — cheapest path of least resistance for a non-developer.",
    },
  ],
}

const es = {
  title: "Elige tu camino de inicio de sesión",
  caption: "Dos puertas válidas. Elige la que ya tengas.",
  question: "¿Cómo pagas Claude ahora mismo?",
  choices: [
    {
      label: "Claude.ai Pro / Max",
      role: "secondary" as const,
      consequence: "El camino más simple. El mismo login funciona en Claude Code — no hay nada más que configurar.",
    },
    {
      label: "API key de Anthropic",
      role: "primary" as const,
      consequence: "Cobro por request. Pega una key sk-ant- en el prompt. Trátala como contraseña.",
    },
    {
      label: "Ninguna todavía",
      role: "accent" as const,
      consequence: "Saca Claude.ai Pro primero — el camino con menos fricción para alguien no técnico.",
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
