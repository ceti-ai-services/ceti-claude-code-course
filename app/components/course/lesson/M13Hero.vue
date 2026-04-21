<!--
  M13Hero — "Subagents and parallel work"

  Composition: MissionBrief + ComparisonGrid. Three columns matching the
  three "patterns that pay off reliably" taught in the prose — independent
  research, wide searches, long bounded tasks.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §13 (swapped from ScatterFlow to
  ComparisonGrid per MERCURIO review 2026-04-21 so the visual carries the
  same three-pattern taxonomy the module teaches in prose).
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import ComparisonGrid from "@/components/course/patterns/ComparisonGrid.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M13 · SUBAGENTS",
  title: "Subagents and parallel work.",
  analogy: "Delegate the wide work. Keep the decisions in the main context.",
  chips: [
    { label: "Three patterns pay off" },
    { label: "Independent + bounded = spawn" },
    { label: "Sequential + stateful = stay" },
  ],
  time: "12 min",
  compTitle: "Three patterns that pay off",
  compCaption: "Click a column to focus. Each runs in its own context and reports back.",
  columns: [
    {
      eyebrow: "PATTERN 1",
      tagLabel: "independent research",
      tagRole: "primary" as const,
      body: "Five files, five subagents, all in parallel. Each returns a short summary. The main session synthesizes.",
    },
    {
      eyebrow: "PATTERN 2",
      tagLabel: "wide searches",
      tagRole: "secondary" as const,
      body: "Looking for something in a big pile and you don't know where it lives. The subagent burns through the reading; you stay focused.",
    },
    {
      eyebrow: "PATTERN 3",
      tagLabel: "long bounded tasks",
      tagRole: "accent" as const,
      body: "Lots of reading or tool use that produces a compact answer. Keep the main session's context for decisions, not details.",
    },
  ],
}

const es = {
  codename: "M13 · SUBAGENTES",
  title: "Subagentes y trabajo en paralelo.",
  analogy: "Delega el trabajo ancho. Las decisiones quédense en el contexto principal.",
  chips: [
    { label: "Tres patrones que rinden" },
    { label: "Independiente + acotado = lanza" },
    { label: "Secuencial + con estado = quédate" },
  ],
  time: "12 min",
  compTitle: "Tres patrones que rinden",
  compCaption: "Clic en una columna para enfocarla. Cada uno corre en su propio contexto y reporta.",
  columns: [
    {
      eyebrow: "PATRÓN 1",
      tagLabel: "investigación independiente",
      tagRole: "primary" as const,
      body: "Cinco archivos, cinco subagentes, en paralelo. Cada uno devuelve un resumen corto. La sesión principal sintetiza.",
    },
    {
      eyebrow: "PATRÓN 2",
      tagLabel: "búsquedas amplias",
      tagRole: "secondary" as const,
      body: "Buscas algo en un pilón de archivos y no sabes dónde vive. El subagente se quema la lectura; tú te quedas enfocado.",
    },
    {
      eyebrow: "PATRÓN 3",
      tagLabel: "tareas largas y acotadas",
      tagRole: "accent" as const,
      body: "Mucha lectura o uso de herramientas que produce una respuesta compacta. Deja el contexto principal para las decisiones.",
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
