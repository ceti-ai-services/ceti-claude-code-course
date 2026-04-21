<!--
  M03-D3 — Session boundary: the folder persists, the chat context
  evaporates on /exit. Next run starts fresh.
-->
<script setup lang="ts">
import SessionBoundary from "@/components/course/patterns/SessionBoundary.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Folder persists. Session evaporates.",
  caption: "Your files are saved on disk. The chat history isn't — it lives only until /exit.",
  persistentLabel: "~/Clients/Acme/2026-Q1",
  ephemeralLabel: "evaporates on /exit",
  sessionTag: "SESSION",
  chips: [
    { label: "what's in this folder?", role: "primary" as const },
    { label: "group by status", role: "secondary" as const },
    { label: "draft follow-up", role: "accent" as const },
  ],
}

const es = {
  title: "La carpeta persiste. La sesión se evapora.",
  caption: "Tus archivos quedan en disco. El historial de chat no — vive solo hasta /exit.",
  persistentLabel: "~/Clientes/Acme/2026-Q1",
  ephemeralLabel: "se evapora al /exit",
  sessionTag: "SESIÓN",
  chips: [
    { label: "¿qué hay aquí?", role: "primary" as const },
    { label: "agrupa por estado", role: "secondary" as const },
    { label: "redacta seguimiento", role: "accent" as const },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <SessionBoundary
    :title="t.title"
    :caption="t.caption"
    :persistent-label="t.persistentLabel"
    :ephemeral-label="t.ephemeralLabel"
    :session-tag="t.sessionTag"
    :chips="t.chips"
  />
</template>
