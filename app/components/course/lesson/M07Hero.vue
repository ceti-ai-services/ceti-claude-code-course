<!--
  M07Hero — "A slash command is a prompt you wrote yesterday, waiting in a menu."

  Composition: MissionBrief + FillableBuilder. Reader fills the three fields
  (name, description, body) and sees a live-rendered slash-command markdown
  file on the right.

  Plan ref: docs/MODULE-VISUAL-PLAN.md §07
-->
<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import FillableBuilder from "@/components/course/patterns/FillableBuilder.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M07 · SLASH COMMANDS",
  title: "Slash commands — reusable prompts you build once.",
  analogy: "A slash command is a prompt you wrote yesterday, waiting in a menu.",
  chips: [
    { label: "One file per command" },
    { label: "Rule of three" },
    { label: "Short verb names" },
  ],
  time: "12 min",
  builderTitle: "Write one now",
  builderCaption: "Fill the fields. The file on the right is the file you'd save.",
  fields: [
    {
      label: "Command name",
      key: "name",
      placeholder: "morning",
      hint: "short verb · becomes /name",
    },
    {
      label: "Description",
      key: "description",
      placeholder: "Summarize what changed in this folder since yesterday",
      hint: "one line · shows in the /-menu",
    },
    {
      label: "Body (the prompt)",
      key: "body",
      kind: "textarea" as const,
      placeholder:
        "Look at the files in this folder. Tell me what changed in the last\n24 hours and flag anything that looks half-finished.",
      hint: "what Claude runs when you type /name",
    },
  ],
  previewTemplate:
    "# .claude/commands/{{name}}.md\n---\ndescription: {{description}}\n---\n\n{{body}}",
}

const es = {
  codename: "M07 · COMANDOS SLASH",
  title: "Comandos slash — prompts reutilizables que escribes una vez.",
  analogy: "Un comando slash es un prompt que escribiste ayer, esperando en un menú.",
  chips: [
    { label: "Un archivo por comando" },
    { label: "Regla del tres" },
    { label: "Nombres de verbo corto" },
  ],
  time: "12 min",
  builderTitle: "Escribe uno ahora",
  builderCaption: "Llena los campos. El archivo de la derecha es el archivo que guardarías.",
  fields: [
    {
      label: "Nombre del comando",
      key: "name",
      placeholder: "morning",
      hint: "verbo corto · se convierte en /nombre",
    },
    {
      label: "Descripción",
      key: "description",
      placeholder: "Resume qué cambió en esta carpeta desde ayer",
      hint: "una línea · se ve en el menú /",
    },
    {
      label: "Cuerpo (el prompt)",
      key: "body",
      kind: "textarea" as const,
      placeholder:
        "Mira los archivos en esta carpeta. Dime qué cambió en las últimas\n24 horas y marca lo que parezca a medias.",
      hint: "lo que Claude corre cuando escribes /nombre",
    },
  ],
  previewTemplate:
    "# .claude/commands/{{name}}.md\n---\ndescription: {{description}}\n---\n\n{{body}}",
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
