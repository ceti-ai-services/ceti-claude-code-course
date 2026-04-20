<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import BeforeAfter from "@/components/course/BeforeAfter.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M01 · MENTAL MODEL",
  title: "You already have AI. You're just using it wrong.",
  analogy: "Same model. Different shape.",
  chips: [
    { label: "Reframe what AI is" },
    { label: "Spot the copy-paste tax" },
    { label: "Name the shift" },
  ],
  time: "12 min",
  shift: "The shift",
  before: {
    label: "Vending machine",
    caption: "You prompt. It replies. You do the rest.",
    bullets: [
      "Lives on a website",
      "Can't see your files",
      "Forgets every turn",
      "Half the work happens in your head after",
    ],
  },
  after: {
    label: "Colleague",
    caption: "You work. It works. You approve.",
    bullets: [
      "Lives in your folder",
      "Reads the real files",
      "Keeps context across the session",
      "Does the boring half; you do the part that needs you",
    ],
  },
}

const es = {
  codename: "M01 · MODELO MENTAL",
  title: "Ya tienes IA. Lo que pasa es que la estás usando mal.",
  analogy: "Mismo modelo. Forma distinta.",
  chips: [
    { label: "Replantea qué es la IA" },
    { label: "Detecta el impuesto del copia-pega" },
    { label: "Nombra el cambio" },
  ],
  time: "12 min",
  shift: "El cambio",
  before: {
    label: "Máquina expendedora",
    caption: "Tú escribes. Te responde. El resto lo haces tú.",
    bullets: [
      "Vive en una página",
      "No puede ver tus archivos",
      "Olvida cada turno",
      "La mitad del trabajo ocurre en tu cabeza después",
    ],
  },
  after: {
    label: "Colega",
    caption: "Tú trabajas. Trabaja contigo. Tú apruebas.",
    bullets: [
      "Vive en tu carpeta",
      "Lee los archivos reales",
      "Mantiene el contexto en la sesión",
      "Hace la parte mecánica; tú haces la que te necesita",
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
