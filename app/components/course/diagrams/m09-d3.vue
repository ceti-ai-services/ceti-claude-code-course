<!--
  m09-d3 — When plan mode earns its keep (and when it's overkill).
  Pattern: FailureTable. Rows surface common misreads of the tool.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "When plan mode earns its keep",
  caption: "Click a row. The trap is the reason the wrong move feels fine.",
  rows: [
    {
      wrong: "skip it — twenty files",
      trap: "you assume scope; Claude assumed a different one",
      right: "plan mode on, read the list first",
    },
    {
      wrong: "plan mode for one scratch edit",
      trap: "adds twenty seconds, reveals nothing new",
      right: "normal mode — the diff prompt is enough",
    },
    {
      wrong: "approve without reading",
      trap: "plan mode only helps if you actually read the plan",
      right: "scan every step; redirect on the one that's off",
    },
    {
      wrong: "reject every plan you dislike",
      trap: "you lose the 80% that was right",
      right: "redirect — tell Claude which step to change and why",
    },
  ],
}

const es = {
  title: "Cuándo el modo plan vale la pena",
  caption: "Clic en una fila. La trampa explica por qué se siente correcto.",
  rows: [
    {
      wrong: "saltarlo — veinte archivos",
      trap: "supones el alcance; Claude supuso otro",
      right: "modo plan activo, lee la lista primero",
    },
    {
      wrong: "modo plan para una edición suelta",
      trap: "son veinte segundos sin ganancia nueva",
      right: "modo normal — el prompt de diff basta",
    },
    {
      wrong: "aprobar sin leer",
      trap: "el modo plan solo ayuda si lees el plan",
      right: "revisa cada paso; redirige el que esté mal",
    },
    {
      wrong: "rechazar todo plan que no te guste",
      trap: "pierdes el 80% que estaba bien",
      right: "redirige — di qué paso cambiar y por qué",
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
