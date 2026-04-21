<!--
  M03Hero — "Your first real session"

  Composition: MissionBrief (transmission-style header) + TerminalReplay.
  The replay shows the first-session move: cd into a scoped folder, launch
  claude, ask "what's in here?", read a real summary back.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §03
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import TerminalReplay from "@/components/course/patterns/TerminalReplay.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M03 · FIRST SESSION",
  title: "Your first real session. Not a hello. A useful answer.",
  analogy: "Pick the folder. Then ask.",
  chips: [
    { label: "Scope a folder" },
    { label: "One first prompt" },
    { label: "Hold the session" },
  ],
  time: "14 min",
  termTitle: "The first useful exchange",
  termCaption: "Scope the folder. Ask what's there. Read your own work back.",
  dir: "~/Clients/Meridian · claude",
  lines: [
    { prompt: true, role: "secondary" as const, text: "cd ~/Clients/Meridian && claude", step: 0 },
    { role: "support" as const, text: "reading 14 files in ~/Clients/Meridian …", step: 1 },
    { prompt: true, role: "secondary" as const, text: "what's in this folder and what is it for?", step: 2 },
    { role: "primary" as const, text: "Active engagement with Meridian Foods:", step: 3 },
    { role: "primary" as const, text: "· SOW, Q1 brief, 3 meeting notes,", step: 3 },
    { role: "primary" as const, text: "  two unanswered email threads.", step: 3 },
    { role: "accent" as const, text: "Oldest open item: invoice #441 (32d).", step: 4 },
  ],
}

const es = {
  codename: "M03 · PRIMERA SESIÓN",
  title: "Tu primera sesión real. No un hola. Una respuesta útil.",
  analogy: "Escoge la carpeta. Luego pregunta.",
  chips: [
    { label: "Acota la carpeta" },
    { label: "Un primer prompt" },
    { label: "Sostén la sesión" },
  ],
  time: "14 min",
  termTitle: "El primer intercambio útil",
  termCaption: "Acota la carpeta. Pregunta qué hay. Lee tu propio trabajo de vuelta.",
  dir: "~/Clientes/Meridian · claude",
  lines: [
    { prompt: true, role: "secondary" as const, text: "cd ~/Clientes/Meridian && claude", step: 0 },
    { role: "support" as const, text: "leyendo 14 archivos en ~/Clientes/Meridian …", step: 1 },
    { prompt: true, role: "secondary" as const, text: "¿qué hay en esta carpeta y para qué es?", step: 2 },
    { role: "primary" as const, text: "Trabajo activo con Meridian Foods:", step: 3 },
    { role: "primary" as const, text: "· SOW, brief Q1, 3 notas de reunión,", step: 3 },
    { role: "primary" as const, text: "  dos hilos de correo sin responder.", step: 3 },
    { role: "accent" as const, text: "Pendiente más viejo: factura #441 (32d).", step: 4 },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <TerminalReplay
    :title="t.termTitle"
    :caption="t.termCaption"
    :dir="t.dir"
    :lines="t.lines"
  />
</template>
