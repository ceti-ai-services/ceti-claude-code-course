<!--
  M09Hero — "Plan mode lets you see the plan before you see the edit."

  Composition: MissionBrief + SequentialPulse. Four phases of the plan-mode
  pipeline — understand → propose → review → execute. The pulse travels the
  track so the reader sees that nothing lands until the third phase clears.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §09
  Wave C swap: ThreeMovesTerminal → SequentialPulse (B8 audit priority 4).
  ThreeMovesTerminal is M06's hero; plan mode's four-stamp pipeline is a
  cleaner opener than reusing that shape.
-->
<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import SequentialPulse from "@/components/course/patterns/SequentialPulse.vue"
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
  pulseTitle: "The four-stamp plan pipeline",
  pulseCaption: "Nothing mutates until the third stamp clears. Click a step to pin it.",
  steps: [
    { title: "understand", subtitle: "scan the scope",       role: "support"   as const },
    { title: "propose",    subtitle: "numbered dry run",     role: "primary"   as const },
    { title: "review",     subtitle: "you approve or redirect", role: "secondary" as const },
    { title: "execute",    subtitle: "per-step still on",    role: "accent"    as const },
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
  pulseTitle: "Los cuatro sellos del modo plan",
  pulseCaption: "Nada cambia hasta que pasa el tercer sello. Haz clic en un paso para fijarlo.",
  steps: [
    { title: "entiende",  subtitle: "revisa el alcance",     role: "support"   as const },
    { title: "propone",   subtitle: "ensayo numerado",       role: "primary"   as const },
    { title: "revisa",    subtitle: "apruebas o rediriges",  role: "secondary" as const },
    { title: "ejecuta",   subtitle: "paso a paso sigue",     role: "accent"    as const },
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
  <SequentialPulse
    :title="t.pulseTitle"
    :caption="t.pulseCaption"
    :steps="t.steps"
  />
</template>
