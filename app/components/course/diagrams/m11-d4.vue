<!--
  m11-d4 — MCP connector anti-patterns: wrong → trap → right.
  Pattern: FailureTable
  Position: right before the read-only tip Callout, so readers see the traps
  before they install their first connector.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "MCP installs — where first sessions go wrong",
  caption: "Four common traps. Each one is a scope or permission call you should slow down on.",
  rows: [
    {
      wrong: "Enable write on day one",
      trap: "Claude sends real email before you trust its judgment",
      right: "Start read-only",
    },
    {
      wrong: "Approve all scopes at once",
      trap: "You granted calendar.write and never noticed",
      right: "Approve minimum scope",
    },
    {
      wrong: "Skip the tool description",
      trap: "Claude picks the wrong tool because the name looks similar",
      right: "Read the schema first",
    },
    {
      wrong: "Install five connectors today",
      trap: "You can't tell which one caused the weird behavior",
      right: "One connector a week",
    },
  ],
}

const es = {
  title: "Instalar MCP — dónde fallan las primeras sesiones",
  caption: "Cuatro trampas comunes. Cada una es un scope o permiso que conviene frenar.",
  rows: [
    {
      wrong: "Habilitar escritura el día uno",
      trap: "Claude manda correo real antes de que confíes en su criterio",
      right: "Empieza solo lectura",
    },
    {
      wrong: "Aprobar todos los scopes de golpe",
      trap: "Diste calendar.write sin darte cuenta",
      right: "Aprueba el scope mínimo",
    },
    {
      wrong: "Saltarte la descripción de la tool",
      trap: "Claude elige la tool equivocada porque el nombre se parece",
      right: "Lee el schema primero",
    },
    {
      wrong: "Instalar cinco conectores hoy",
      trap: "No sabes cuál provocó el comportamiento raro",
      right: "Un conector por semana",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable
    :title="t.title"
    :caption="t.caption"
    :rows="t.rows"
  />
</template>
