<!--
  M02Hero — "Install Claude Code"

  Composition: MissionBrief (transmission-style header) + Timeline
  (four equal install steps: Check Node → Install CLI → Authenticate → First run).

  Plan ref: docs/MODULE-VISUAL-PLAN.md §02
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import Timeline from "@/components/course/patterns/Timeline.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M02 · INSTALL",
  title: "Install Claude Code",
  analogy: "Different launch pads. Same four steps.",
  chips: [
    { label: "Node 18+" },
    { label: "One npm command" },
    { label: "Sign in and launch" },
  ],
  time: "14 min",
  flowTitle: "The install, in four moves",
  flowCaption: "Hover a step to pin it. The highlight cycles until you do.",
  steps: [
    {
      label: "Check Node",
      description: "node --version · need 18 or higher",
      role: "primary" as const,
    },
    {
      label: "Install CLI",
      description: "npm install -g @anthropic-ai/claude-code",
      role: "secondary" as const,
    },
    {
      label: "Authenticate",
      description: "Claude.ai sign-in or API key",
      role: "accent" as const,
    },
    {
      label: "First run",
      description: "type claude, land at the › prompt",
      role: "support" as const,
    },
  ],
}

const es = {
  codename: "M02 · INSTALACIÓN",
  title: "Instalar Claude Code",
  analogy: "Distintas plataformas. Los mismos cuatro pasos.",
  chips: [
    { label: "Node 18+" },
    { label: "Un comando npm" },
    { label: "Inicia sesión y lanza" },
  ],
  time: "14 min",
  flowTitle: "La instalación, en cuatro movimientos",
  flowCaption: "Pasa el cursor sobre un paso para fijarlo. El resalte se cicla hasta que lo hagas.",
  steps: [
    {
      label: "Revisa Node",
      description: "node --version · 18 o más nuevo",
      role: "primary" as const,
    },
    {
      label: "Instala el CLI",
      description: "npm install -g @anthropic-ai/claude-code",
      role: "secondary" as const,
    },
    {
      label: "Autentica",
      description: "Sesión de Claude.ai o API key",
      role: "accent" as const,
    },
    {
      label: "Primer arranque",
      description: "escribe claude, aterriza en el prompt ›",
      role: "support" as const,
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
  <Timeline
    :title="t.flowTitle"
    :caption="t.flowCaption"
    :steps="t.steps"
  />
</template>
