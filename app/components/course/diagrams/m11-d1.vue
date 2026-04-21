<!--
  m11-d1 — The three MCP primitives, side by side.
  Pattern: ComparisonGrid
  Position: after the "three primitives" paragraph, replacing the inline prose.
-->
<script setup lang="ts">
import ComparisonGrid from "@/components/course/patterns/ComparisonGrid.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Three primitives, one protocol",
  caption: "Every MCP server exposes the same three shapes. Click a column to focus.",
  columns: [
    {
      eyebrow: "ACTIONS IT CAN RUN",
      tagLabel: "Tools",
      tagRole: "accent" as const,
      body: "Callable actions the server offers — send this email, create this event, move this file. Each tool has a name, a description, and a JSON schema Claude reads before it decides to call it.",
    },
    {
      eyebrow: "STATE IT CAN READ",
      tagLabel: "Resources",
      tagRole: "primary" as const,
      body: "Data the server exposes for reading — yesterday's threads, today's events, a page of your Notion database. Resources are how Claude perceives current state before it reasons about what to do.",
    },
    {
      eyebrow: "RECIPES IT CAN OFFER",
      tagLabel: "Prompts",
      tagRole: "secondary" as const,
      body: "Reusable prompt templates the server exposes — ready-made recipes the tool's author wrote for common jobs. Claude can pick one, fill its slots, and run it without you rewriting the instructions.",
    },
  ],
}

const es = {
  title: "Tres primitivas, un protocolo",
  caption: "Cada servidor MCP expone las mismas tres formas. Clic en una columna para enfocarla.",
  columns: [
    {
      eyebrow: "ACCIONES QUE PUEDE EJECUTAR",
      tagLabel: "Tools",
      tagRole: "accent" as const,
      body: "Acciones invocables que ofrece el servidor — enviar este correo, crear este evento, mover este archivo. Cada tool tiene nombre, descripción y un JSON schema que Claude lee antes de decidir llamarla.",
    },
    {
      eyebrow: "ESTADO QUE PUEDE LEER",
      tagLabel: "Resources",
      tagRole: "primary" as const,
      body: "Datos que el servidor expone para lectura — hilos de ayer, eventos de hoy, una página de tu base de Notion. Los resources son cómo Claude percibe el estado antes de razonar.",
    },
    {
      eyebrow: "RECETAS QUE PUEDE OFRECER",
      tagLabel: "Prompts",
      tagRole: "secondary" as const,
      body: "Plantillas de prompt reutilizables que expone el servidor — recetas listas que escribió quien hizo la herramienta. Claude elige una, rellena los huecos y la corre sin que reescribas instrucciones.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <ComparisonGrid
    :title="t.title"
    :caption="t.caption"
    :columns="t.columns"
  />
</template>
