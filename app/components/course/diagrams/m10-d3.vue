<!--
  m10-d3 — Hook vs slash command vs skill: the conditional-vs-
  unconditional judgment call.
  Pattern: DecisionFork. The consequence column is the heuristic.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Hook, command, or skill?",
  caption: "If the rule is about what you said, it isn't a hook.",
  question: "This behavior should happen…",
  choices: [
    {
      label: "every time, no exceptions",
      role: "accent" as const,
      consequence: "Hook. Register it in settings.json under the right lifecycle event.",
    },
    {
      label: "when I ask for it",
      role: "primary" as const,
      consequence: "Slash command. Reusable prompt you invoke by name.",
    },
    {
      label: "when the task calls for it",
      role: "secondary" as const,
      consequence: "Skill. A capability Claude loads on demand based on context.",
    },
  ],
}

const es = {
  title: "¿Hook, comando o skill?",
  caption: "Si la regla depende de lo que dijiste, no es un hook.",
  question: "Este comportamiento debería ocurrir…",
  choices: [
    {
      label: "siempre, sin excepción",
      role: "accent" as const,
      consequence: "Hook. Regístralo en settings.json bajo el evento correcto.",
    },
    {
      label: "cuando yo lo pida",
      role: "primary" as const,
      consequence: "Comando. Prompt reutilizable que invocas por nombre.",
    },
    {
      label: "cuando la tarea lo amerite",
      role: "secondary" as const,
      consequence: "Skill. Capacidad que Claude carga según el contexto.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <DecisionFork
    :title="t.title"
    :caption="t.caption"
    :question="t.question"
    :choices="t.choices"
  />
</template>
