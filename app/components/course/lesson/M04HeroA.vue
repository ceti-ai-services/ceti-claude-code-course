<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import TerminalDemo from "@/components/course/TerminalDemo.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

interface LineDef {
  kind: "prompt" | "out" | "ok" | "warn" | "meta"
  text: string
}

const enLines: LineDef[] = [
  { kind: "prompt", text: "fix the formatting in meeting-notes.md" },
  { kind: "out", text: "Proposing edit to meeting-notes.md:" },
  { kind: "warn", text: "- bullet  list   with weird spacing" },
  { kind: "ok", text: "+ - Bullet list with consistent spacing" },
  { kind: "warn", text: "- wrong trailing space" },
  { kind: "ok", text: "+ - consistent trailing (none)" },
  { kind: "out", text: "Approve this change? (y/n)" },
  { kind: "prompt", text: "y" },
  { kind: "ok", text: "Applied to meeting-notes.md" },
  { kind: "meta", text: "(no other files touched — scope held)" },
]

const esLines: LineDef[] = [
  { kind: "prompt", text: "arregla el formato de meeting-notes.md" },
  { kind: "out", text: "Propongo editar meeting-notes.md:" },
  { kind: "warn", text: "- viñetas   con espacios raros" },
  { kind: "ok", text: "+ - Viñetas con espaciado consistente" },
  { kind: "warn", text: "- espacio final incorrecto" },
  { kind: "ok", text: "+ - sin espacio final" },
  { kind: "out", text: "¿Aprobar este cambio? (y/n)" },
  { kind: "prompt", text: "y" },
  { kind: "ok", text: "Aplicado a meeting-notes.md" },
  { kind: "meta", text: "(ningún otro archivo tocado — alcance respetado)" },
]

const en = {
  codename: "M04 · PERMISSIONS",
  title: "Files, Permissions, and Undo",
  analogy: "Three prompts stand between a question and a changed file.",
  chips: [
    { label: "Diff before change" },
    { label: "Approve or deny" },
    { label: "Undo with a copy" },
  ],
  time: "12 min",
  demoTitle: "claude · approval loop · ~/client-notes/",
}

const es = {
  codename: "M04 · PERMISOS",
  title: "Archivos, permisos, y deshacer",
  analogy: "Tres prompts se interponen entre una pregunta y un archivo cambiado.",
  chips: [
    { label: "Diff antes del cambio" },
    { label: "Aprobar o denegar" },
    { label: "Deshacer con una copia" },
  ],
  time: "12 min",
  demoTitle: "claude · loop de aprobación · ~/notas-cliente/",
}

const t = computed(() => (lang.value === "es" ? es : en))
const lines = computed(() => (lang.value === "es" ? esLines : enLines))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <TerminalDemo
    :title="t.demoTitle"
    dir="~/client-notes/"
    :lines="lines"
    :autoplay="true"
    :replayable="true"
  />
</template>
