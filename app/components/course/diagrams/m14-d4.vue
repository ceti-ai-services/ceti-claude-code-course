<!--
  m14-d4 — Habits that regress. How installs age out.
  Pattern: FailureTable
  Position: after the Silver/Gold compare, before "One last thing".
  Names the failure modes so the reader can spot them in week two.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "How installs age out",
  caption: "Click a row. Four regressions, and the habit that blocks each one.",
  rows: [
    {
      wrong: "install, use once, forget",
      trap:  "week two you're back in the browser tab out of habit",
      right: "three uses in seven days or it doesn't stick",
    },
    {
      wrong: "over-explain every session",
      trap:  "you re-type context you already wrote down last week",
      right: "every repetition is a new line in CLAUDE.md",
    },
    {
      wrong: "one giant CLAUDE.md for everything",
      trap:  "Claude swims — half the file is irrelevant to this folder",
      right: "one CLAUDE.md per folder, scoped to that work",
    },
    {
      wrong: "grade yourself on vibes",
      trap:  "speed-up feels imagined when you don't track it",
      right: "one real number per week — minutes saved, drafts shipped",
    },
  ],
}

const es = {
  title: "Cómo caducan las instalaciones",
  caption: "Clic en una fila. Cuatro regresiones, y el hábito que las bloquea.",
  rows: [
    {
      wrong: "instalas, usas una vez, olvidas",
      trap:  "a la semana dos ya estás en el chatbot por costumbre",
      right: "tres usos en siete días o no cuaja",
    },
    {
      wrong: "explicas de cero cada sesión",
      trap:  "retecleaste contexto que ya escribiste la semana pasada",
      right: "cada repetición es una línea nueva en CLAUDE.md",
    },
    {
      wrong: "un CLAUDE.md gigante para todo",
      trap:  "Claude nada — la mitad del archivo no toca esta carpeta",
      right: "un CLAUDE.md por carpeta, acotado al trabajo",
    },
    {
      wrong: "te calificas por sensación",
      trap:  "sin medir, el avance se siente imaginado",
      right: "un número real por semana — minutos, drafts enviados",
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
