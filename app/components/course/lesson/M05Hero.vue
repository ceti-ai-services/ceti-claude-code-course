<!--
  M05Hero — "Teach it once. Let it remember forever."

  Composition: MissionBrief + FillableBuilder. The reader composes their
  CLAUDE.md live: six fields (one-liner, stack, do, don't, deployment,
  contacts) feed a monospace preview template on the right.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §05
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import FillableBuilder from "@/components/course/patterns/FillableBuilder.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const previewTemplateEn = `# CLAUDE.md

## Project
{{oneliner}}

## Stack
{{stack}}

## Do
{{do}}

## Don't
{{dont}}

## Deployment
{{deployment}}

## Contacts
{{contacts}}
`

const previewTemplateEs = `# CLAUDE.md

## Proyecto
{{oneliner}}

## Stack
{{stack}}

## Haz
{{do}}

## No hagas
{{dont}}

## Despliegue
{{deployment}}

## Contactos
{{contacts}}
`

const en = {
  codename: "M05 · CLAUDE.md",
  title: "Teach it once. Let it remember forever.",
  analogy: "Write it once. Claude reads it every session.",
  chips: [
    { label: "Six fields" },
    { label: "Project-level file" },
    { label: "No reintroduction tax" },
  ],
  time: "13 min",
  builderTitle: "Compose your CLAUDE.md",
  builderCaption: "Fill the fields. The preview on the right is the file.",
  fields: [
    {
      label: "Project one-liner",
      key: "oneliner",
      placeholder: "Active work for Meridian Foods — the rebrand.",
      kind: "text" as const,
    },
    {
      label: "Stack",
      key: "stack",
      placeholder: "Notion · Figma · Gmail · this folder",
      kind: "text" as const,
    },
    {
      label: "Do",
      key: "do",
      placeholder: "Short drafts by default. Direct, not polite.",
      kind: "textarea" as const,
    },
    {
      label: "Don't",
      key: "dont",
      placeholder: "Propose scope beyond the current SOW.",
      kind: "textarea" as const,
    },
    {
      label: "Deployment",
      key: "deployment",
      placeholder: "Final decks go to the CMO over email, PDF only.",
      kind: "text" as const,
    },
    {
      label: "Contacts",
      key: "contacts",
      placeholder: "CMO: Ana · Board: quarterly recap only",
      kind: "text" as const,
    },
  ],
  previewTemplate: previewTemplateEn,
}

const es = {
  codename: "M05 · CLAUDE.md",
  title: "Enséñale una vez. Deja que recuerde para siempre.",
  analogy: "Escríbelo una vez. Claude lo lee cada sesión.",
  chips: [
    { label: "Seis campos" },
    { label: "Archivo del proyecto" },
    { label: "Sin reintroducción diaria" },
  ],
  time: "13 min",
  builderTitle: "Compón tu CLAUDE.md",
  builderCaption: "Llena los campos. La vista previa de la derecha es el archivo.",
  fields: [
    {
      label: "Proyecto en una línea",
      key: "oneliner",
      placeholder: "Trabajo activo para Meridian Foods — el rebrand.",
      kind: "text" as const,
    },
    {
      label: "Stack",
      key: "stack",
      placeholder: "Notion · Figma · Gmail · esta carpeta",
      kind: "text" as const,
    },
    {
      label: "Haz",
      key: "do",
      placeholder: "Borradores cortos por defecto. Directo, no amable.",
      kind: "textarea" as const,
    },
    {
      label: "No hagas",
      key: "dont",
      placeholder: "Proponer alcance fuera del SOW actual.",
      kind: "textarea" as const,
    },
    {
      label: "Despliegue",
      key: "deployment",
      placeholder: "Los decks finales van al CMO por correo, solo PDF.",
      kind: "text" as const,
    },
    {
      label: "Contactos",
      key: "contacts",
      placeholder: "CMO: Ana · Board: resumen trimestral",
      kind: "text" as const,
    },
  ],
  previewTemplate: previewTemplateEs,
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
  <FillableBuilder
    :title="t.builderTitle"
    :caption="t.builderCaption"
    :fields="t.fields"
    :preview-template="t.previewTemplate"
    preview-lang="markdown"
  />
</template>
