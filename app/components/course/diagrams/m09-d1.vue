<!--
  m09-d1 — Plan mode as a four-step flow: READ → PLAN → APPROVE → EXECUTE.
  Pattern: SequentialPulse. The pulse travels across each chip so the
  order of operations is the thing the eye learns.
-->
<script setup lang="ts">
import SequentialPulse from "@/components/course/patterns/SequentialPulse.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Plan before you touch a file",
  caption: "Four stamps. Nothing mutates until the third one clears.",
  steps: [
    { title: "read",    subtitle: "scan the scope",     role: "support"   as const },
    { title: "plan",    subtitle: "dry run, numbered",  role: "primary"   as const },
    { title: "approve", subtitle: "you decide",         role: "secondary" as const },
    { title: "execute", subtitle: "per-step still on",  role: "accent"    as const },
  ],
}

const es = {
  title: "Planea antes de tocar un archivo",
  caption: "Cuatro sellos. Nada cambia hasta que pasa el tercero.",
  steps: [
    { title: "lee",      subtitle: "revisa el alcance", role: "support"   as const },
    { title: "planea",   subtitle: "simulacro numerado", role: "primary"   as const },
    { title: "aprueba",  subtitle: "tú decides",        role: "secondary" as const },
    { title: "ejecuta",  subtitle: "paso a paso sigue", role: "accent"    as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <SequentialPulse
    :title="t.title"
    :caption="t.caption"
    :steps="t.steps"
  />
</template>
