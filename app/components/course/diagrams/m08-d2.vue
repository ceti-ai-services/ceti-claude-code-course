<!--
  M08-D2 — How a skill triggers itself.
  Pattern: SequentialPulse. Four phases: speak → match → load → shape.
-->
<script setup lang="ts">
import { computed } from "vue"
import SequentialPulse from "@/components/course/patterns/SequentialPulse.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "How a skill triggers itself",
  caption: "You don't summon it. The description is the matchmaker.",
  steps: [
    { title: "you speak", subtitle: "draft my status update", role: "support" as const },
    { title: "claude scans", subtitle: "reads descriptions", role: "primary" as const },
    { title: "skill loads", subtitle: "whole folder in context", role: "secondary" as const },
    { title: "output shaped", subtitle: "Shipped · In Flight · Blocked", role: "accent" as const },
  ],
}

const es = {
  title: "Cómo se dispara una skill",
  caption: "Tú no la invocas. La descripción es la casamentera.",
  steps: [
    { title: "tú hablas", subtitle: "redacta mi status update", role: "support" as const },
    { title: "claude escanea", subtitle: "lee las descripciones", role: "primary" as const },
    { title: "skill carga", subtitle: "carpeta entera al contexto", role: "secondary" as const },
    { title: "salida moldeada", subtitle: "Shipped · In Flight · Blocked", role: "accent" as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <SequentialPulse :title="t.title" :caption="t.caption" :steps="t.steps" />
</template>
