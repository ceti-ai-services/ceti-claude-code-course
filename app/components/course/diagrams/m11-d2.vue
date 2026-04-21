<!--
  m11-d2 — PRAO loop as a sequential pulse.
  Pattern: SequentialPulse
  Position: in the "The loop, one phase at a time" section, alongside or
  replacing the legacy <PraoLoop/> usage — a clean 4-step pulse reads faster
  than an orbit once the hero has already used orbital motion.
-->
<script setup lang="ts">
import SequentialPulse from "@/components/course/patterns/SequentialPulse.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The PRAO loop, one turn at a time",
  caption: "Every MCP call travels these four phases. The loop restarts on every new turn.",
  steps: [
    { title: "Perceive", subtitle: "read the tool schema + state", role: "primary" as const },
    { title: "Reason",   subtitle: "pick the tool, shape the args", role: "secondary" as const },
    { title: "Act",      subtitle: "call the tool, wait for result", role: "accent" as const },
    { title: "Observe",  subtitle: "read the result, decide next",  role: "support" as const },
  ],
}

const es = {
  title: "El loop PRAO, un turno a la vez",
  caption: "Toda llamada MCP recorre estas cuatro fases. El loop reinicia en cada turno.",
  steps: [
    { title: "Percibir", subtitle: "lee el schema + el estado",       role: "primary" as const },
    { title: "Razonar",  subtitle: "elige tool y arma los args",      role: "secondary" as const },
    { title: "Actuar",   subtitle: "llama la tool, espera resultado", role: "accent" as const },
    { title: "Observar", subtitle: "lee el resultado, decide después", role: "support" as const },
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
