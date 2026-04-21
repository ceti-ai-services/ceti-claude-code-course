<!--
  m02-d3 — The real install in a terminal window
  Pattern: TerminalReplay
  Position: right after "The install command" section intro. Shows what
  a clean run actually looks like — prompt, install, launch — so the
  reader recognizes the shape before they type it.
-->
<script setup lang="ts">
import TerminalReplay from "@/components/course/patterns/TerminalReplay.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "What a clean install looks like",
  caption: "One check, one install, one launch. Under a minute on a good connection.",
  dir: "~ · terminal",
  lines: [
    { prompt: true, text: "node --version", step: 0 },
    { role: "secondary" as const, text: "v20.11.1", step: 1 },
    { prompt: true, text: "npm install -g @anthropic-ai/claude-code", step: 2 },
    { role: "support" as const, text: "added 1 package in 8s", step: 3 },
    { prompt: true, text: "claude", step: 4 },
    { role: "primary" as const, text: "Welcome to Claude Code. Sign in to continue.", step: 5 },
    { role: "accent" as const, text: ">", step: 6 },
  ],
}

const es = {
  title: "Cómo se ve una instalación limpia",
  caption: "Un check, una instalación, un lanzamiento. Menos de un minuto con buena red.",
  dir: "~ · terminal",
  lines: [
    { prompt: true, text: "node --version", step: 0 },
    { role: "secondary" as const, text: "v20.11.1", step: 1 },
    { prompt: true, text: "npm install -g @anthropic-ai/claude-code", step: 2 },
    { role: "support" as const, text: "added 1 package in 8s", step: 3 },
    { prompt: true, text: "claude", step: 4 },
    { role: "primary" as const, text: "Bienvenido a Claude Code. Inicia sesión para continuar.", step: 5 },
    { role: "accent" as const, text: ">", step: 6 },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TerminalReplay
    :title="t.title"
    :caption="t.caption"
    :dir="t.dir"
    :lines="t.lines"
  />
</template>
