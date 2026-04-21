<!--
  m14-d1 — The week after. Three sessions in seven days or the install ages out.
  Pattern: Timeline
  Position: inside "Three things to practice this week" — makes the
  Mon/Wed/Fri cadence physical before the prose lists the habits.
-->
<script setup lang="ts">
import Timeline from "@/components/course/patterns/Timeline.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The week after this course",
  caption: "Three sessions. If you use it three times in seven days, it sticks.",
  steps: [
    { label: "MON",     description: "run your Module 06 task again", role: "primary"   as const },
    { label: "WED",     description: "catch the browser-chatbot reflex", role: "accent"    as const },
    { label: "FRI",     description: "add what you kept re-explaining", role: "secondary" as const },
    { label: "NEXT MON", description: "new folder, new CLAUDE.md, 10 min", role: "primary"   as const },
  ],
}

const es = {
  title: "La semana después del curso",
  caption: "Tres sesiones. Si lo usas tres veces en siete días, se queda.",
  steps: [
    { label: "LUN", description: "corre otra vez tu tarea del módulo 06", role: "primary"   as const },
    { label: "MIÉ", description: "cacha el reflejo del chatbot del navegador", role: "accent"    as const },
    { label: "VIE", description: "añade lo que repetías cada vez", role: "secondary" as const },
    { label: "PRÓXIMO LUN", description: "carpeta nueva, CLAUDE.md nuevo, 10 min", role: "primary"   as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <Timeline
    :title="t.title"
    :caption="t.caption"
    :steps="t.steps"
  />
</template>
