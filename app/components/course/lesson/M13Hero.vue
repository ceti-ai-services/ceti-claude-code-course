<!--
  M13Hero — "Subagents and parallel work"

  Composition: MissionBrief + OrbitalRing. The main session at the center;
  four phases on the ring — spawn → work → return → synthesize. The cycle
  is the whole point: delegate the wide work, keep decisions in main.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §13
  Wave C swap: ComparisonGrid → OrbitalRing (B8 audit priority 3).
  The module's thesis is a spawn→work→return cycle, not N parallel concepts.
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import OrbitalRing from "@/components/course/patterns/OrbitalRing.vue"
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
  ringTitle: "Spawn, work, return, synthesize",
  ringCaption: "Each subagent runs in its own context and reports back. The main session keeps the summary.",
  centerLabel: "MAIN SESSION",
  nodes: [
    { label: "spawn", role: "primary" as const },
    { label: "isolate", role: "secondary" as const },
    { label: "return", role: "accent" as const },
    { label: "synthesize", role: "support" as const },
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
  ringTitle: "Lanza, trabaja, regresa, sintetiza",
  ringCaption: "Cada subagente corre en su propio contexto y reporta. La sesión principal guarda el resumen.",
  centerLabel: "SESIÓN PRINCIPAL",
  nodes: [
    { label: "lanza", role: "primary" as const },
    { label: "aísla", role: "secondary" as const },
    { label: "regresa", role: "accent" as const },
    { label: "sintetiza", role: "support" as const },
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
  <OrbitalRing
    :title="t.ringTitle"
    :caption="t.ringCaption"
    :nodes="t.nodes"
    :center-label="t.centerLabel"
  />
</template>
