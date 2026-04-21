<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M11 · MCP BASICS",
  title: "MCP — give Claude the tools your work already uses.",
  analogy: "One protocol, many tools. Four phases, every time.",
  chips: [
    { label: "Perceive → Reason → Act → Observe" },
    { label: "Read-only first" },
    { label: "One connector this week" },
  ],
  time: "14 min",
}

const es = {
  codename: "M11 · FUNDAMENTOS DE MCP",
  title: "MCP — dale a Claude las herramientas donde ya vive tu trabajo.",
  analogy: "Un protocolo, muchas herramientas. Cuatro fases, siempre.",
  chips: [
    { label: "Percibir → Razonar → Actuar → Observar" },
    { label: "Solo lectura primero" },
    { label: "Un conector esta semana" },
  ],
  time: "14 min",
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
</template>
