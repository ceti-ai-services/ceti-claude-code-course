<!--
  M08-D4 — Skill anti-patterns — why a skill fails to load.
  Pattern: FailureTable. Wrong → trap → right.
-->
<script setup lang="ts">
import { computed } from "vue"
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Why a skill never loads",
  caption: "Click a row to pin. Every miss traces back to the description.",
  rows: [
    {
      wrong: "vague description",
      trap: "'Helps with status updates.' Claude has no phrases to match against — the skill sits unused.",
      right: "concrete phrases",
    },
    {
      wrong: "one-word description",
      trap: "'status'. Every tenth message mentions status; the skill over-triggers on irrelevant chats.",
      right: "narrow trigger",
    },
    {
      wrong: "prompt-stuffed body",
      trap: "The body reads like a one-shot prompt. Loads fine, but shapes nothing — reader gets a generic answer.",
      right: "teach the shape",
    },
    {
      wrong: "missing name field",
      trap: "You write a great description but skip 'name:'. Claude can't reference the skill cleanly across sessions.",
      right: "name + description",
    },
  ],
}

const es = {
  title: "Por qué una skill nunca carga",
  caption: "Clic en una fila para fijarla. Todo fallo regresa a la descripción.",
  rows: [
    {
      wrong: "descripción vaga",
      trap: "'Ayuda con status updates.' Claude no tiene frases para empatar — la skill nunca se activa.",
      right: "frases concretas",
    },
    {
      wrong: "una sola palabra",
      trap: "'status'. Cualquier mensaje la menciona; la skill se dispara en conversaciones irrelevantes.",
      right: "disparo estrecho",
    },
    {
      wrong: "cuerpo tipo prompt",
      trap: "El cuerpo suena a prompt de una sola vez. Carga bien pero no moldea — el lector recibe una respuesta genérica.",
      right: "enseña la forma",
    },
    {
      wrong: "falta name",
      trap: "Escribes una descripción impecable pero omites 'name:'. Claude no puede referenciar la skill entre sesiones.",
      right: "name + description",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable :title="t.title" :caption="t.caption" :rows="t.rows" />
</template>
