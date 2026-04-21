<!--
  m02-d4 — First-launch sanity checklist
  Pattern: CheckableStack
  Position: right before the closing Recap. Commits the reader to
  the four things that must be true before they consider the install
  done — shrinks the "The first launch" prose.
-->
<script setup lang="ts">
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Before you call it installed",
  caption: "Tap each row. Check it off when it's true for you.",
  items: [
    {
      title: "node --version prints 18 or higher",
      body: "If you see v18.x, v20.x, or newer, the engine is ready. If it says command not found, install Node from nodejs.org (LTS) and open a fresh terminal.",
      role: "primary" as const,
    },
    {
      title: "npm install finished without EACCES",
      body: "If you hit a permission error on Mac or Linux, prefix the command with sudo and re-run. On Windows, WSL is the escape hatch if plain PowerShell keeps failing.",
      role: "secondary" as const,
    },
    {
      title: "typing claude launches the app",
      body: "A welcome screen and an authentication prompt should appear. If your shell reports claude not found, open a brand-new terminal window — installers don't affect windows that were already open.",
      role: "primary" as const,
    },
    {
      title: "you signed in and reached the > prompt",
      body: "Either browser sign-in (Claude.ai Pro / Max) or pasted API key. You should end at a single > with a blinking cursor. That's Claude Code waiting for a question.",
      role: "accent" as const,
    },
  ],
}

const es = {
  title: "Antes de decir que ya está instalado",
  caption: "Toca cada fila. Márcala cuando sea cierta para ti.",
  items: [
    {
      title: "node --version imprime 18 o más alto",
      body: "Si ves v18.x, v20.x o más nuevo, el motor está listo. Si dice command not found, instala Node desde nodejs.org (LTS) y abre una terminal nueva.",
      role: "primary" as const,
    },
    {
      title: "npm install terminó sin EACCES",
      body: "Si chocas con un error de permisos en Mac o Linux, antepón sudo y vuelve a correrlo. En Windows, WSL es la salida de emergencia si PowerShell plano sigue fallando.",
      role: "secondary" as const,
    },
    {
      title: "al escribir claude se lanza la app",
      body: "Debe aparecer una pantalla de bienvenida y un prompt de autenticación. Si tu shell dice claude no encontrado, abre una ventana de terminal completamente nueva — los instaladores no afectan ventanas que ya estaban abiertas.",
      role: "primary" as const,
    },
    {
      title: "iniciaste sesión y llegaste al prompt >",
      body: "Con login del navegador (Claude.ai Pro / Max) o pegando la API key. Debes terminar en un único > con el cursor parpadeando. Ese es Claude Code esperando una pregunta.",
      role: "accent" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <CheckableStack :title="t.title" :caption="t.caption" :items="t.items" />
</template>
