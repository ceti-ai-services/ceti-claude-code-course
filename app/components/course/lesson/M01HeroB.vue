<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import ConceptCard from "@/components/course/ConceptCard.vue"
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
  eyebrow: "Three things to hold in your head",
  concepts: [
    {
      number: "01",
      label: "Same Claude",
      body: "Claude Code runs the identical model you use in the browser. There is no special version. The intelligence is the same.",
      detail: "Every conversation, every insight, every draft quality you get on claude.ai is available here. The upgrade isn't the model — it's what the model can now see.",
    },
    {
      number: "02",
      label: "Different shape",
      body: "The shape is what changes. Instead of a chat window, Claude lives inside a terminal window pointed at a folder.",
      detail: "That means it can open files, read them, propose edits, and apply them with your approval — without you copying a single line of text.",
    },
    {
      number: "03",
      label: "Your files",
      body: "It sees the actual work. Not a summary you typed. Not a paste. The files in the folder you're working in.",
      detail: "This is the leverage. When Claude can read your receipts, your notes, your drafts — the answer it gives back is about your situation, not the general case.",
    },
  ],
  shift: "The shift in practice",
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
  eyebrow: "Tres cosas que recordar",
  concepts: [
    {
      number: "01",
      label: "El mismo Claude",
      body: "Claude Code ejecuta el modelo idéntico que usas en el navegador. No hay versión especial. La inteligencia es la misma.",
      detail: "Cada conversación, cada perspectiva, cada calidad de borrador que obtienes en claude.ai está disponible aquí. La mejora no es el modelo — es lo que el modelo ahora puede ver.",
    },
    {
      number: "02",
      label: "Forma distinta",
      body: "La forma es lo que cambia. En vez de una ventana de chat, Claude vive en una terminal apuntando a una carpeta.",
      detail: "Eso significa que puede abrir archivos, leerlos, proponer ediciones y aplicarlas con tu aprobación — sin que tú copies una sola línea.",
    },
    {
      number: "03",
      label: "Tus archivos",
      body: "Ve el trabajo real. No un resumen que escribiste. No un pegado. Los archivos en la carpeta donde trabajas.",
      detail: "Ahí está el apalancamiento. Cuando Claude puede leer tus recibos, notas, borradores — la respuesta que te da es sobre tu situación, no el caso general.",
    },
  ],
  shift: "El cambio en la práctica",
  before: {
    label: "Máquina expendedora",
    caption: "Tú escribes. Te responde. El resto lo haces tú.",
    bullets: [
      "Vive en una página web",
      "No puede ver tus archivos",
      "Olvida cada turno",
      "La mitad del trabajo ocurre en tu cabeza después",
    ],
  },
  after: {
    label: "Colega",
    caption: "Tú trabajas. Él trabaja. Tú apruebas.",
    bullets: [
      "Vive en tu carpeta",
      "Lee los archivos reales",
      "Mantiene el contexto en la sesión",
      "Hace la mitad aburrida; tú haces lo que requiere criterio",
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
  <ConceptCard
    :eyebrow="t.eyebrow"
    :items="t.concepts"
  />
  <BeforeAfter
    :title="t.shift"
    :before="t.before"
    :after="t.after"
  />
</template>
