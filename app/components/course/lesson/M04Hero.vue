<!--
  M04Hero — "Files, permissions, and undo"

  Composition: MissionBrief + TerminalReplay with an approvalAt step.
  Claude proposes writing drafts/follow-up-1.md; reader emits approve/deny
  on the buttons that appear mid-replay. Replaces the earlier ApprovalSim.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §04
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import TerminalReplay from "@/components/course/patterns/TerminalReplay.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M04 · PERMISSIONS",
  title: "Files, permissions, and undo",
  analogy: "Every change goes through you. That friction is the feature.",
  chips: [
    { label: "Read the diff" },
    { label: "Approve or deny" },
    { label: "Nothing lands without your yes" },
  ],
  time: "12 min",
  termTitle: "The approval moment",
  termCaption: "Claude proposes. You approve or deny. Try the buttons.",
  dir: "~/Clients/Meridian · claude",
  lines: [
    { prompt: true, role: "secondary" as const, text: "draft a soft nudge email for invoice #441", step: 0 },
    { role: "support" as const, text: "reading 3 past threads, invoice metadata …", step: 1 },
    { role: "primary" as const, text: "Proposed write: drafts/follow-up-1.md", step: 2 },
    { role: "primary" as const, text: "· 142 words · warm, short, no subject line", step: 2 },
    { role: "accent" as const, text: "Approve this write?", step: 3 },
  ],
  approvalAt: 3,
}

const es = {
  codename: "M04 · PERMISOS",
  title: "Archivos, permisos y deshacer",
  analogy: "Todo cambio pasa por ti. Esa fricción es la ventaja.",
  chips: [
    { label: "Lee el diff" },
    { label: "Aprueba o rechaza" },
    { label: "Nada aterriza sin tu sí" },
  ],
  time: "12 min",
  termTitle: "El momento de aprobar",
  termCaption: "Claude propone. Tú apruebas o rechazas. Prueba los botones.",
  dir: "~/Clientes/Meridian · claude",
  lines: [
    { prompt: true, role: "secondary" as const, text: "redacta un recordatorio suave para la factura #441", step: 0 },
    { role: "support" as const, text: "leyendo 3 hilos previos, metadatos de la factura …", step: 1 },
    { role: "primary" as const, text: "Escritura propuesta: drafts/follow-up-1.md", step: 2 },
    { role: "primary" as const, text: "· 142 palabras · cálido, corto, sin asunto", step: 2 },
    { role: "accent" as const, text: "¿Aprobar esta escritura?", step: 3 },
  ],
  approvalAt: 3,
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
    :approval-at="t.approvalAt"
  />
</template>
