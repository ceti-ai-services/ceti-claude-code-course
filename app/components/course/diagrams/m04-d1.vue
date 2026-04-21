<!--
  M04-D1 — The five-step approval loop. SequentialPulse — a linear
  procedure with a traveling dot between phase chips.
-->
<script setup lang="ts">
import SequentialPulse from "@/components/course/patterns/SequentialPulse.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The approval loop",
  caption: "Every file-changing action passes through all five steps. Step 3 is the safety gate.",
  steps: [
    { title: "ask", subtitle: "you prompt", role: "support" as const },
    { title: "propose", subtitle: "Claude drafts", role: "primary" as const },
    { title: "show", subtitle: "diff or command", role: "secondary" as const },
    { title: "decide", subtitle: "approve or deny", role: "accent" as const },
    { title: "apply", subtitle: "file changes", role: "secondary" as const },
  ],
}

const es = {
  title: "El ciclo de aprobación",
  caption: "Cada acción que cambia archivos pasa por los cinco pasos. El paso 3 es la puerta de seguridad.",
  steps: [
    { title: "pides", subtitle: "tú escribes", role: "support" as const },
    { title: "propone", subtitle: "Claude redacta", role: "primary" as const },
    { title: "muestra", subtitle: "diff o comando", role: "secondary" as const },
    { title: "decides", subtitle: "aprobar o rechazar", role: "accent" as const },
    { title: "aplica", subtitle: "archivo cambia", role: "secondary" as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <SequentialPulse :title="t.title" :caption="t.caption" :steps="t.steps" />
</template>
