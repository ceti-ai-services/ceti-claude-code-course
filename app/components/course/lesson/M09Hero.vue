<!--
  M09Hero — "Plan mode lets you see the plan before you see the edit."

  Composition: MissionBrief + ThreeMovesTerminal. Three stamps: READ → PLAN →
  APPROVE, each mapped to a terminal line. Shows the dry-run shape of plan mode.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §09
-->
<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import ThreeMovesTerminal from "@/components/course/patterns/ThreeMovesTerminal.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M09 · PLAN MODE",
  title: "Plan mode — think before acting, dry-run your work.",
  analogy: "Plan mode lets you see the plan before you see the edit.",
  chips: [
    { label: "Read-only by default" },
    { label: "Approve · reject · redirect" },
    { label: "shift-tab to enter" },
  ],
  time: "10 min",
  termTitle: "Three moves, one safe edit",
  termCaption: "Each stamp is a moment. Each line is what Claude says at that moment.",
  dir: "~/Documents/claude-plan-test",
  moves: [
    {
      stamp: "READ",
      role: "support" as const,
      line: "rename all three files to use today's date as a prefix",
      reply: "plan mode on · scanning folder · 3 files found",
    },
    {
      stamp: "PLAN",
      role: "secondary" as const,
      line: "proposed: 1) notes.txt → 2026-04-21-notes.txt  2) ideas.txt → …",
      reply: "dry run · nothing written yet",
    },
    {
      stamp: "APPROVE",
      role: "accent" as const,
      line: "looks right — exit plan mode, run it",
      reply: "executing · 3/3 renamed",
    },
  ],
}

const es = {
  codename: "M09 · MODO PLAN",
  title: "Modo plan — pensar antes de actuar, hacer el ensayo.",
  analogy: "El modo plan te deja ver el plan antes de ver la edición.",
  chips: [
    { label: "Solo lectura por defecto" },
    { label: "Aprobar · rechazar · redirigir" },
    { label: "shift-tab para entrar" },
  ],
  time: "10 min",
  termTitle: "Tres movimientos, una edición segura",
  termCaption: "Cada sello es un momento. Cada línea es lo que Claude dice en ese momento.",
  dir: "~/Documentos/prueba-plan",
  moves: [
    {
      stamp: "LEE",
      role: "support" as const,
      line: "renombra los tres archivos con la fecha de hoy como prefijo",
      reply: "modo plan activo · escaneando carpeta · 3 archivos",
    },
    {
      stamp: "PLAN",
      role: "secondary" as const,
      line: "propuesto: 1) notas.txt → 2026-04-21-notas.txt  2) ideas.txt → …",
      reply: "ensayo · nada escrito todavía",
    },
    {
      stamp: "APROBAR",
      role: "accent" as const,
      line: "se ve bien — sal del modo plan y córrelo",
      reply: "ejecutando · 3/3 renombrados",
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
  <ThreeMovesTerminal
    :title="t.termTitle"
    :caption="t.termCaption"
    :dir="t.dir"
    :moves="t.moves"
  />
</template>
