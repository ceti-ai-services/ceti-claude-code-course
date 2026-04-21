<!--
  m10-d4 — Hook anti-patterns and the fixes that make each one safe.
  Pattern: FailureTable. All four rows come from real ways people
  brick their first hook.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "How first hooks go wrong",
  caption: "Click a row. The trap is the reason it feels harmless until it isn't.",
  rows: [
    {
      wrong: "no matcher on PreToolUse",
      trap: "hook fires for every tool — Read, Edit, Bash, everything",
      right: "scope with matcher: \"Bash\" or the tool you actually mean",
    },
    {
      wrong: "blocking hook on first try",
      trap: "a bad exit 2 can lock Claude out of every tool call",
      right: "start with a Stop hook that just echoes a summary",
    },
    {
      wrong: "test hooks in a real workspace",
      trap: "a typo silently kills the hooks block or nukes your day",
      right: "scratch project first; copy in only after it works",
    },
    {
      wrong: "missing comma in settings.json",
      trap: "JSON dies silently — no error, no hook fires",
      right: "validate the JSON; restart Claude after every edit",
    },
  ],
}

const es = {
  title: "Cómo fallan los primeros hooks",
  caption: "Clic en una fila. La trampa explica por qué parece inofensivo.",
  rows: [
    {
      wrong: "sin matcher en PreToolUse",
      trap: "dispara para cada herramienta — Read, Edit, Bash, todas",
      right: "acota con matcher: \"Bash\" o la herramienta real",
    },
    {
      wrong: "hook bloqueante al primer intento",
      trap: "un exit 2 mal puesto deja a Claude sin herramientas",
      right: "empieza con un Stop hook que solo imprima un resumen",
    },
    {
      wrong: "probar hooks en un proyecto real",
      trap: "un typo mata el bloque de hooks o te tumba el día",
      right: "carpeta scratch primero; copia solo cuando funcione",
    },
    {
      wrong: "coma faltante en settings.json",
      trap: "el JSON muere en silencio — sin error, sin hook",
      right: "valida el JSON; reinicia Claude tras cada edición",
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
