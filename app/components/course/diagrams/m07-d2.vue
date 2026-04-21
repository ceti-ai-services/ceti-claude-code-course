<!--
  M07-D2 — From typed-prompt to slash command in four steps.
  Pattern: TracedExample. Click each step to reveal the real artifact.
-->
<script setup lang="ts">
import { computed } from "vue"
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Build /morning in four moves",
  caption: "Click a step to see the real artifact. Every one is verbatim.",
  steps: [
    {
      phase: "path",
      role: "support" as const,
      action: "Make the folder if it doesn't exist.",
      artifact: "mkdir -p .claude/commands",
      artifactLang: "bash" as const,
    },
    {
      phase: "file",
      role: "primary" as const,
      action: "Create the markdown file. Filename becomes the command.",
      artifact: ".claude/commands/morning.md",
      artifactLang: "text" as const,
    },
    {
      phase: "write",
      role: "secondary" as const,
      action: "Two parts: frontmatter describes, body runs as the prompt.",
      artifact: "---\ndescription: Summarize what changed in this folder since yesterday\n---\n\nLook at the files in this folder. Tell me what changed in the last\n24 hours and flag anything that looks half-finished.",
      artifactLang: "markdown" as const,
    },
    {
      phase: "run",
      role: "accent" as const,
      action: "Restart Claude in the folder, type slash, pick /morning.",
      artifact: "> /morning",
      artifactLang: "bash" as const,
    },
  ],
}

const es = {
  title: "Crea /morning en cuatro pasos",
  caption: "Clic en un paso para ver el archivo real. Todo es literal.",
  steps: [
    {
      phase: "ruta",
      role: "support" as const,
      action: "Crea la carpeta si no existe.",
      artifact: "mkdir -p .claude/commands",
      artifactLang: "bash" as const,
    },
    {
      phase: "archivo",
      role: "primary" as const,
      action: "Crea el archivo markdown. El nombre se vuelve el comando.",
      artifact: ".claude/commands/morning.md",
      artifactLang: "text" as const,
    },
    {
      phase: "escribe",
      role: "secondary" as const,
      action: "Dos partes: frontmatter describe, cuerpo corre como prompt.",
      artifact: "---\ndescription: Resume qué cambió en esta carpeta desde ayer\n---\n\nMira los archivos de esta carpeta. Dime qué cambió en las últimas\n24 horas y marca lo que parezca a medias.",
      artifactLang: "markdown" as const,
    },
    {
      phase: "corre",
      role: "accent" as const,
      action: "Reinicia Claude en la carpeta, teclea slash, elige /morning.",
      artifact: "> /morning",
      artifactLang: "bash" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TracedExample :title="t.title" :caption="t.caption" :steps="t.steps" />
</template>
