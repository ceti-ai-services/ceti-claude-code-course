<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import ProcessFlow from "@/components/course/ProcessFlow.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M06 · REAL WORK",
  title: "This is the one. Pick the task you mildly dread.",
  analogy: "One task. Three moves. Every time.",
  chips: [
    { label: "Read-only first" },
    { label: "Plan before write" },
    { label: "Approve every step" },
  ],
  time: "45 min",
  flowTitle: "The three-move shape",
  steps: [
    {
      label: "Read-only",
      body:
        "Ask Claude what's there. No edits, no writes. Just understanding. The cheapest place to catch a mismatch.",
      aside: "what's in this folder and what is it for?",
    },
    {
      label: "Plan",
      body:
        "Ask what it would do. Blueprint before building. Correct scope here, not mid-write.",
      aside: "what would a first pass look like? show me the first three.",
    },
    {
      label: "Execute",
      body:
        "Approvals start here. Each diff is a checkpoint. Deny when it's off; Claude adjusts.",
      aside: "write these into captions-wk-16.md",
    },
  ],
}

const es = {
  codename: "M06 · TRABAJO REAL",
  title: "Esta es la buena. Escoge la tarea que detestas un poquito.",
  analogy: "Una tarea. Tres movimientos. Siempre.",
  chips: [
    { label: "Solo lectura primero" },
    { label: "Plan antes de escribir" },
    { label: "Aprobar cada paso" },
  ],
  time: "45 min",
  flowTitle: "La forma en tres movimientos",
  steps: [
    {
      label: "Solo lectura",
      body:
        "Pregúntale a Claude qué hay. Sin ediciones, sin escrituras. Solo entender. El lugar más barato para atrapar un desajuste.",
      aside: "¿qué hay en esta carpeta y para qué es?",
    },
    {
      label: "Plan",
      body:
        "Pregunta qué haría. Plano antes de construir. Corrige el alcance aquí, no a mitad de escritura.",
      aside: "¿cómo se vería un primer pase? muéstrame los primeros tres.",
    },
    {
      label: "Ejecutar",
      body:
        "Las aprobaciones empiezan aquí. Cada diff es un checkpoint. Deniega cuando se desvíe; Claude ajusta.",
      aside: "escribe estos en captions-wk-16.md",
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
  <ProcessFlow
    :title="t.flowTitle"
    :steps="t.steps"
    :auto="true"
  />
</template>
