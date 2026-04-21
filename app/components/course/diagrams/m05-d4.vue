<!--
  M05D4 — Briefing doc vs prompt.
  Pattern: ComparisonGrid. Two columns, identical anatomy.
-->
<script setup lang="ts">
import ComparisonGrid from "@/components/course/patterns/ComparisonGrid.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Two shapes. Only one works.",
  caption: "Click to focus. Read yours out loud — does it sound like a brief, or a prompt?",
  columns: [
    {
      eyebrow: "WHAT TO AVOID",
      tagLabel: "prompt",
      tagRole: "accent" as const,
      body: "Talks to Claude. \"You are a helpful assistant specializing in…\" — describes the tool. Nothing here about you.",
    },
    {
      eyebrow: "WHAT TO WRITE",
      tagLabel: "briefing doc",
      tagRole: "secondary" as const,
      body: "Talks about you. \"I run a newsletter for ADHD folks. My audience is tired of being sold to.\" Describes your world. The specific shape only you can write.",
    },
  ],
}

const es = {
  title: "Dos formas. Solo una funciona.",
  caption: "Clic para enfocar. Léete tu archivo en voz alta — ¿suena a briefing o a prompt?",
  columns: [
    {
      eyebrow: "LO QUE EVITAR",
      tagLabel: "prompt",
      tagRole: "accent" as const,
      body: "Le habla a Claude. \"Eres un asistente útil especializado en…\" — describe la herramienta. Nada aquí sobre ti.",
    },
    {
      eyebrow: "LO QUE ESCRIBIR",
      tagLabel: "briefing",
      tagRole: "secondary" as const,
      body: "Habla de ti. \"Llevo un newsletter para gente con TDAH. Mi audiencia está harta de que le vendan.\" Describe tu mundo. La forma específica que solo tú puedes escribir.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <ComparisonGrid :title="t.title" :caption="t.caption" :columns="t.columns" />
</template>
