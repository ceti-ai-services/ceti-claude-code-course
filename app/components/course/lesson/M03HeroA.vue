<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import BeforeAfter from "@/components/course/BeforeAfter.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M03 · FIRST SESSION",
  title: "Your first real session. Not a hello. A useful answer.",
  analogy: "Pick your universe. Then ask.",
  chips: [
    { label: "Scope a folder" },
    { label: "One first prompt" },
    { label: "Hold the session" },
  ],
  time: "14 min",
  shift: "Scope is the feature",
  before: {
    label: "Unscoped",
    caption: "Claude Code started in ~. It can see everything in your home folder.",
    bullets: [
      "Tax PDFs and old receipts",
      "Screenshots of screenshots",
      "A decade of drafts",
      "Files you forgot you had",
    ],
  },
  after: {
    label: "Scoped",
    caption: "Claude Code started in the one folder that matters right now.",
    bullets: [
      "Only the work for this task",
      "Answers reference real, named files",
      "No surprise edits outside scope",
      "You can trust the output",
    ],
  },
}

const es = {
  codename: "M03 · PRIMERA SESIÓN",
  title: "Tu primera sesión real. No un hola. Una respuesta útil.",
  analogy: "Elige tu universo. Luego pregunta.",
  chips: [
    { label: "Acota la carpeta" },
    { label: "Un primer prompt" },
    { label: "Sostén la sesión" },
  ],
  time: "14 min",
  shift: "El alcance es la ventaja",
  before: {
    label: "Sin alcance",
    caption: "Claude Code arrancó en ~. Ve todo lo que hay en tu carpeta personal.",
    bullets: [
      "PDFs de impuestos y recibos viejos",
      "Captures de capturas",
      "Una década de borradores",
      "Archivos que olvidaste que tenías",
    ],
  },
  after: {
    label: "Con alcance",
    caption: "Claude Code arrancó en la única carpeta que importa ahora.",
    bullets: [
      "Solo el trabajo de esta tarea",
      "Las respuestas citan archivos reales",
      "Cero ediciones sorpresa fuera de alcance",
      "Puedes confiar en el resultado",
    ],
  },
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
  <BeforeAfter
    :title="t.shift"
    :before="t.before"
    :after="t.after"
  />
</template>
