<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import ApprovalSim from "@/components/course/ApprovalSim.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

interface DiffLine {
  kind: "remove" | "add" | "context" | "meta"
  text: string
}

const enDiff: DiffLine[] = [
  { kind: "context", text: "## Meeting notes · Meridian" },
  { kind: "remove", text: "- action items    with extra spaces" },
  { kind: "add",    text: "- Action items with consistent spacing" },
  { kind: "remove", text: "- follow up next week  (trailing space)" },
  { kind: "add",    text: "- Follow up next week" },
  { kind: "context", text: "" },
  { kind: "meta",   text: "(2 lines changed · 1 file)" },
]

const esDiff: DiffLine[] = [
  { kind: "context", text: "## Notas de reunión · Meridian" },
  { kind: "remove", text: "- elementos de acción    con espacios extra" },
  { kind: "add",    text: "- Elementos de acción con espaciado consistente" },
  { kind: "remove", text: "- seguimiento próxima semana  " },
  { kind: "add",    text: "- Seguimiento próxima semana" },
  { kind: "context", text: "" },
  { kind: "meta",   text: "(2 líneas cambiadas · 1 archivo)" },
]

const en = {
  codename: "M04 · PERMISSIONS",
  title: "Files, Permissions, and Undo",
  analogy: "Every change goes through you. That friction is the feature.",
  chips: [
    { label: "Diff before change" },
    { label: "Approve or deny" },
    { label: "Nothing lands without your yes" },
  ],
  time: "12 min",
  simTitle: "claude · approval loop",
  simPrompt: "fix the formatting in meeting-notes.md",
  simFilename: "meeting-notes.md",
  approveOutcome: "Applied to meeting-notes.md. No other files touched.",
  denyOutcome: "No changes made. You stayed in control.",
}

const es = {
  codename: "M04 · PERMISOS",
  title: "Archivos, permisos, y deshacer",
  analogy: "Todo cambio pasa por ti. Esa fricción es la ventaja.",
  chips: [
    { label: "Diff antes del cambio" },
    { label: "Aprobar o denegar" },
    { label: "Nada aterriza sin tu sí" },
  ],
  time: "12 min",
  simTitle: "claude · loop de aprobación",
  simPrompt: "arregla el formato de meeting-notes.md",
  simFilename: "meeting-notes.md",
  approveOutcome: "Aplicado a meeting-notes.md. Ningún otro archivo tocado.",
  denyOutcome: "Sin cambios. Te mantuviste en control.",
}

const t = computed(() => (lang.value === "es" ? es : en))
const diff = computed(() => (lang.value === "es" ? esDiff : enDiff))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <ApprovalSim
    :title="t.simTitle"
    :prompt="t.simPrompt"
    :filename="t.simFilename"
    :diff="diff"
    :approveOutcome="t.approveOutcome"
    :denyOutcome="t.denyOutcome"
  />
</template>
