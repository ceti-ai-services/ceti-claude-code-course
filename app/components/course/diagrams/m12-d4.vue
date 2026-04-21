<!--
  m12-d4 — Commit safety checklist — five habits to read before approving.
  Pattern: CheckableStack
  Position: right before the TryThis, so readers internalize the habits
  before they run the exercise.
-->
<script setup lang="ts">
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Read the commit out loud — the five-check pass",
  caption: "Two seconds per item. This is how the git history stays honest.",
  items: [
    {
      title: "The file list matches the change",
      body: "No stray files. If something is staged you didn't touch, unstage it before approving — scope creep hides here.",
      role: "primary" as const,
    },
    {
      title: "The summary line names the behavior",
      body: "Imperative mood, under 72 chars, no adjectives. \"rename X to Y\" not \"improve naming.\"",
      role: "secondary" as const,
    },
    {
      title: "The body explains why, not what",
      body: "The diff shows what. The message should say why it was worth changing and what to watch for next.",
      role: "secondary" as const,
    },
    {
      title: "No secrets in the diff",
      body: "Scan for .env, api keys, tokens, or anything in a `credentials` path. Reject the stage if anything looks off.",
      role: "accent" as const,
    },
    {
      title: "Draft PR beats direct push",
      body: "For non-trivial work, open a draft PR. CI runs, future-you reads it on a phone, nothing is merged until you flip the flag.",
      role: "support" as const,
    },
  ],
}

const es = {
  title: "Lee el commit en voz alta — los cinco chequeos",
  caption: "Dos segundos por ítem. Así la historia de git se mantiene honesta.",
  items: [
    {
      title: "La lista de archivos coincide con el cambio",
      body: "Nada que sobre. Si algo está staged y no lo tocaste, quítalo antes de aprobar — el scope creep se esconde aquí.",
      role: "primary" as const,
    },
    {
      title: "El resumen nombra el comportamiento",
      body: "Modo imperativo, menos de 72 caracteres, sin adjetivos. \"renombra X a Y\" y no \"mejora el naming.\"",
      role: "secondary" as const,
    },
    {
      title: "El cuerpo explica por qué, no qué",
      body: "El diff muestra qué. El mensaje debe decir por qué valía la pena y qué vigilar después.",
      role: "secondary" as const,
    },
    {
      title: "Nada de secretos en el diff",
      body: "Escanea por .env, api keys, tokens o cualquier ruta `credentials`. Rechaza el stage si algo huele raro.",
      role: "accent" as const,
    },
    {
      title: "PR en borrador le gana al push directo",
      body: "Para cualquier cosa no trivial, abre PR borrador. CI corre, el tú-futuro lo lee en el celular, nada se mergea hasta que quites el borrador.",
      role: "support" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <CheckableStack
    :title="t.title"
    :caption="t.caption"
    :items="t.items"
  />
</template>
