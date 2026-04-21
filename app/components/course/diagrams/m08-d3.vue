<!--
  M08-D3 — Writing a SKILL.md that actually loads.
  Pattern: TracedExample. Four moves with real artifacts.
-->
<script setup lang="ts">
import { computed } from "vue"
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Write a SKILL.md that loads",
  caption: "Click to reveal each artifact. The description is load-bearing.",
  steps: [
    {
      phase: "path",
      role: "support" as const,
      action: "Create the folder. Folder name is the skill name.",
      artifact: "mkdir -p .claude/skills/weekly-status",
      artifactLang: "bash" as const,
    },
    {
      phase: "name",
      role: "primary" as const,
      action: "Start SKILL.md with frontmatter. Name matches the folder.",
      artifact: "---\nname: weekly-status-update\n---",
      artifactLang: "markdown" as const,
    },
    {
      phase: "trigger",
      role: "accent" as const,
      action: "Write the description with the phrases you actually say.",
      artifact: "description: Use when the user asks to draft their weekly\n  status update, status report, or Friday recap. Formats output\n  with three sections: Shipped, In Flight, Blocked.",
      artifactLang: "markdown" as const,
    },
    {
      phase: "body",
      role: "secondary" as const,
      action: "Teach the shape. Imperative. Name the real sections.",
      artifact: "# Weekly Status Update\n\nAlways use three sections, in this order:\n1. **Shipped** — what finished. Past tense. Short lines.\n2. **In Flight** — what's open. Name the owner.\n3. **Blocked** — who you're waiting on, and for what.",
      artifactLang: "markdown" as const,
    },
  ],
}

const es = {
  title: "Escribe un SKILL.md que cargue",
  caption: "Clic para revelar cada artefacto. La descripción carga todo el peso.",
  steps: [
    {
      phase: "ruta",
      role: "support" as const,
      action: "Crea la carpeta. El nombre de la carpeta es el nombre de la skill.",
      artifact: "mkdir -p .claude/skills/weekly-status",
      artifactLang: "bash" as const,
    },
    {
      phase: "name",
      role: "primary" as const,
      action: "Abre SKILL.md con frontmatter. Name coincide con la carpeta.",
      artifact: "---\nname: weekly-status-update\n---",
      artifactLang: "markdown" as const,
    },
    {
      phase: "disparo",
      role: "accent" as const,
      action: "Escribe la descripción con las frases que tú usas.",
      artifact: "description: Úsala cuando el usuario pida redactar su\n  reporte semanal, status update o recap de viernes. Formatea\n  en tres secciones: Shipped, In Flight, Blocked.",
      artifactLang: "markdown" as const,
    },
    {
      phase: "cuerpo",
      role: "secondary" as const,
      action: "Enseña la forma. Imperativo. Nombra las secciones reales.",
      artifact: "# Weekly Status Update\n\nUsa siempre tres secciones, en este orden:\n1. **Shipped** — qué terminó. Pasado. Líneas cortas.\n2. **In Flight** — qué sigue abierto. Nombra al dueño.\n3. **Blocked** — por quién esperas, y qué necesitas.",
      artifactLang: "markdown" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TracedExample :title="t.title" :caption="t.caption" :steps="t.steps" />
</template>
