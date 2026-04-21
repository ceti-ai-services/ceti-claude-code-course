<!--
  m13-d1 — Main context persists; subagent context evaporates.
  Pattern: SessionBoundary
  Position: after "What a subagent is" — makes the boundary physical
  before the prose moves on to "when to use one".
-->
<script setup lang="ts">
import SessionBoundary from "@/components/course/patterns/SessionBoundary.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where the detail lives",
  caption: "The main session keeps the summary. Every file read inside the subagent is gone.",
  persistentLabel: "main session · keeps the summary",
  sessionTag: "SUBAGENT",
  ephemeralLabel: "evaporates on return",
  chips: [
    { label: "read file A", role: "support" as const },
    { label: "read file B", role: "support" as const },
    { label: "read file C", role: "support" as const },
    { label: "tool calls", role: "accent" as const },
    { label: "scratch notes", role: "support" as const },
  ],
}

const es = {
  title: "Dónde vive el detalle",
  caption: "La sesión principal guarda el resumen. Cada archivo leído dentro del subagente se esfuma.",
  persistentLabel: "sesión principal · guarda el resumen",
  sessionTag: "SUBAGENTE",
  ephemeralLabel: "se esfuma al volver",
  chips: [
    { label: "leer archivo A", role: "support" as const },
    { label: "leer archivo B", role: "support" as const },
    { label: "leer archivo C", role: "support" as const },
    { label: "llamadas a tools", role: "accent" as const },
    { label: "notas sueltas", role: "support" as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <SessionBoundary
    :title="t.title"
    :caption="t.caption"
    :persistent-label="t.persistentLabel"
    :session-tag="t.sessionTag"
    :ephemeral-label="t.ephemeralLabel"
    :chips="t.chips"
  />
</template>
