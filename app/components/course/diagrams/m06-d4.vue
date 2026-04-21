<!--
  M06D4 — The habits that multiply.
  Pattern: CheckableStack. Four habits the reader should commit to.
-->
<script setup lang="ts">
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Four habits that multiply",
  caption: "Tick each one when you've used it on a real task. No prize — just proof.",
  items: [
    {
      title: "Ask for structure",
      role: "primary" as const,
      body: "\"As a table.\" \"Two short paragraphs, no more.\" The default prose shape is rarely the most useful one. Specify.",
    },
    {
      title: "Correct fast and direct",
      role: "secondary" as const,
      body: "\"That's not what I asked for.\" \"Shorter.\" Claude responds well to plain correction. It doesn't need polite — it needs specific.",
    },
    {
      title: "Ask what it's unsure about",
      role: "support" as const,
      body: "Before you ship: \"What did you skim versus read fully? Where did you have to guess?\" Those edges are exactly where your judgment lands.",
    },
    {
      title: "Close the loop",
      role: "accent" as const,
      body: "\"Summarize what we did and what's left.\" You'll catch the one file it forgot, or the decision you meant to make and didn't.",
    },
  ],
}

const es = {
  title: "Cuatro hábitos que multiplican",
  caption: "Marca cada uno cuando lo hayas usado en una tarea real. Sin premio — solo prueba.",
  items: [
    {
      title: "Pide estructura",
      role: "primary" as const,
      body: "\"Como tabla.\" \"Dos párrafos cortos, no más.\" La prosa por default casi nunca es la forma más útil. Especifica.",
    },
    {
      title: "Corrige rápido y directo",
      role: "secondary" as const,
      body: "\"Eso no es lo que pedí.\" \"Más corto.\" Claude responde bien a la corrección plana. No necesita cortés — necesita específica.",
    },
    {
      title: "Pregúntale de qué no está seguro",
      role: "support" as const,
      body: "Antes de enviar: \"¿Qué ojeaste y qué leíste a fondo? ¿Dónde tuviste que adivinar?\" Ahí aterriza tu juicio humano.",
    },
    {
      title: "Cierra el ciclo",
      role: "accent" as const,
      body: "\"Resume lo que hicimos y qué queda.\" Vas a atrapar el archivo que se olvidó, o la decisión que querías tomar y no tomaste.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <CheckableStack :title="t.title" :caption="t.caption" :items="t.items" />
</template>
