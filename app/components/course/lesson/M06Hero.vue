<!--
  M06Hero — "This is the one. Pick the task you mildly dread."

  Composition: MissionBrief + Storyboard. THREE phases — Read, Plan, Execute —
  matching the three-move rhythm the module's prose teaches verbatim.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §06 (contracted from 5 → 3 phases per
  MERCURIO review 2026-04-21 to stop the hero from installing a different
  mental model than the prose).
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import Storyboard from "@/components/course/patterns/Storyboard.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M06 · REAL WORK",
  title: "This is the one. Pick the task you mildly dread.",
  analogy: "Three moves. Every task.",
  chips: [
    { label: "Read-only first" },
    { label: "Plan before write" },
    { label: "Approve every step" },
  ],
  time: "45 min",
  sbTitle: "Three moves, every task",
  sbCaption: "Click a phase to pin it. Auto-cycles until you do.",
  phases: [
    {
      title: "Read",
      role: "primary" as const,
      note: "Ask Claude what's there before you ask it to do anything. A summary you can correct beats a draft you can't. Scope the folder first — not your Desktop, not your home — one task's worth of files.",
    },
    {
      title: "Plan",
      role: "secondary" as const,
      note: "Ask what it would do. Blueprint, not building. Correct the scope here — mid-write is too late. If the plan describes a wider change than you wanted, that's the moment to redirect.",
    },
    {
      title: "Execute",
      role: "accent" as const,
      note: "Approvals start here. Each diff is a checkpoint. Deny when it's off; Claude adjusts and re-proposes. When it's done, ask for a one-paragraph review so you catch the decision you meant to make.",
    },
  ],
}

const es = {
  codename: "M06 · TRABAJO REAL",
  title: "Esta es la buena. Escoge la tarea que detestas un poquito.",
  analogy: "Tres movimientos. Cada tarea.",
  chips: [
    { label: "Solo lectura primero" },
    { label: "Plan antes de escribir" },
    { label: "Aprobar cada paso" },
  ],
  time: "45 min",
  sbTitle: "Tres movimientos, cada tarea",
  sbCaption: "Clic en una fase para fijarla. Se cicla sola hasta que lo hagas.",
  phases: [
    {
      title: "Leer",
      role: "primary" as const,
      note: "Pregunta a Claude qué hay antes de pedirle que haga algo. Un resumen que puedes corregir le gana a un borrador que no. Acota la carpeta primero — nada de tu escritorio ni de tu home — una tarea, sus archivos.",
    },
    {
      title: "Planear",
      role: "secondary" as const,
      note: "Pregunta qué haría. El plano, no el edificio. Corrige el alcance aquí — a mitad de escritura ya es tarde. Si el plan describe un cambio más ancho del que querías, ese es el momento para redirigir.",
    },
    {
      title: "Ejecutar",
      role: "accent" as const,
      note: "Las aprobaciones empiezan aquí. Cada diff es un checkpoint. Rechaza si se desvía; Claude ajusta y vuelve a proponer. Cuando termine, pídele un resumen de un párrafo para atrapar la decisión que querías tomar.",
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
  <Storyboard
    :title="t.sbTitle"
    :caption="t.sbCaption"
    :phases="t.phases"
  />
</template>
