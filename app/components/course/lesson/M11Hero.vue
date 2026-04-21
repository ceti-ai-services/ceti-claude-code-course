<!--
  M11Hero — "MCP — give Claude the tools your work already uses."

  Composition: MissionBrief (transmission-style header) + OrbitalRing
  (three MCP primitives — Tools, Resources, Prompts — orbiting the
  MCP server at the center).

  Plan ref: docs/MODULE-VISUAL-PLAN.md §11
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import OrbitalRing from "@/components/course/patterns/OrbitalRing.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M11 · MCP BASICS",
  title: "MCP — give Claude the tools your work already uses.",
  analogy: "One protocol, three primitives, one loop.",
  chips: [
    { label: "Perceive → Reason → Act → Observe" },
    { label: "Read-only first" },
    { label: "One connector this week" },
  ],
  time: "14 min",
  ringTitle: "Three primitives, one protocol",
  ringCaption: "Every MCP connector exposes the same three shapes. The server in the middle is the wire.",
  centerLabel: "MCP SERVER",
  nodes: [
    { label: "Tools", role: "accent" as const },
    { label: "Resources", role: "primary" as const },
    { label: "Prompts", role: "secondary" as const },
  ],
}

const es = {
  codename: "M11 · FUNDAMENTOS DE MCP",
  title: "MCP — dale a Claude las herramientas donde ya vive tu trabajo.",
  analogy: "Un protocolo, tres primitivas, un solo loop.",
  chips: [
    { label: "Percibir → Razonar → Actuar → Observar" },
    { label: "Solo lectura primero" },
    { label: "Un conector esta semana" },
  ],
  time: "14 min",
  ringTitle: "Tres primitivas, un protocolo",
  ringCaption: "Cada conector MCP expone las mismas tres formas. El servidor en el centro es el cable.",
  centerLabel: "SERVIDOR MCP",
  nodes: [
    { label: "Herramientas", role: "accent" as const },
    { label: "Recursos", role: "primary" as const },
    { label: "Prompts", role: "secondary" as const },
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
