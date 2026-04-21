<!--
  M01Hero — "You already have AI. You're just using it wrong."

  Composition: MissionBrief (transmission-style header) + ComparisonGrid
  (vending-machine vs. colleague, two-column side-by-side with focus
  affordance). The TradeoffMatrix for the detailed breakdown lives further
  down the module as <M01TradeoffMatrix/>.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §01
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import ComparisonGrid from "@/components/course/patterns/ComparisonGrid.vue"
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
  compTitle: "The shift",
  compCaption: "Click a column to focus. Same model, different shape of use.",
  columns: [
    {
      eyebrow: "WHAT YOU HAVE NOW",
      tagLabel: "vending machine",
      tagRole: "support" as const,
      body: "Lives on a website. Can't see your files. You prompt, it replies, you do the rest — half the work happens in your head after.",
    },
    {
      eyebrow: "WHAT YOU COULD HAVE",
      tagLabel: "colleague",
      tagRole: "secondary" as const,
      body: "Lives in your folder. Reads the real files. Keeps context across the session. Does the boring half; you do the part that needs you.",
    },
  ],
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
  compTitle: "El cambio",
  compCaption: "Clic en una columna para enfocarla. Mismo modelo, distinto uso.",
  columns: [
    {
      eyebrow: "LO QUE TIENES AHORA",
      tagLabel: "máquina expendedora",
      tagRole: "support" as const,
      body: "Vive en una página. No puede ver tus archivos. Tú escribes, responde, el resto lo haces tú — la mitad del trabajo ocurre en tu cabeza después.",
    },
    {
      eyebrow: "LO QUE PODRÍAS TENER",
      tagLabel: "colega",
      tagRole: "secondary" as const,
      body: "Vive en tu carpeta. Lee los archivos reales. Mantiene el contexto en la sesión. Hace la parte mecánica; tú haces la que te necesita.",
    },
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
  <ComparisonGrid
    :title="t.compTitle"
    :caption="t.compCaption"
    :columns="t.columns"
  />
</template>
