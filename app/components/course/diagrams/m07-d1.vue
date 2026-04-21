<!--
  M07-D1 — Where slash commands live.
  Pattern: FileTree. Shows .claude/commands/ anatomy.
-->
<script setup lang="ts">
import { computed } from "vue"
import FileTree from "@/components/course/patterns/FileTree.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where slash commands live",
  caption: "The filename is the command. One file, one prompt, one slash.",
  tree: [
    {
      name: "your-project/",
      kind: "folder" as const,
      children: [
        { name: "CLAUDE.md", kind: "file" as const, role: "support" as const, tooltip: "session briefing — always loaded" },
        {
          name: ".claude/",
          kind: "folder" as const,
          children: [
            {
              name: "commands/",
              kind: "folder" as const,
              role: "primary" as const,
              tooltip: "one markdown file per slash command",
              children: [
                { name: "morning.md", kind: "file" as const, role: "accent" as const, tooltip: "becomes /morning" },
                { name: "draft-email.md", kind: "file" as const, role: "secondary" as const, tooltip: "becomes /draft-email" },
                { name: "summarize-file.md", kind: "file" as const, role: "secondary" as const, tooltip: "becomes /summarize-file" },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const es = {
  title: "Dónde viven los comandos slash",
  caption: "El nombre del archivo es el comando. Un archivo, un prompt, un slash.",
  tree: [
    {
      name: "tu-proyecto/",
      kind: "folder" as const,
      children: [
        { name: "CLAUDE.md", kind: "file" as const, role: "support" as const, tooltip: "briefing de sesión — siempre cargado" },
        {
          name: ".claude/",
          kind: "folder" as const,
          children: [
            {
              name: "commands/",
              kind: "folder" as const,
              role: "primary" as const,
              tooltip: "un archivo markdown por comando slash",
              children: [
                { name: "morning.md", kind: "file" as const, role: "accent" as const, tooltip: "se vuelve /morning" },
                { name: "draft-email.md", kind: "file" as const, role: "secondary" as const, tooltip: "se vuelve /draft-email" },
                { name: "summarize-file.md", kind: "file" as const, role: "secondary" as const, tooltip: "se vuelve /summarize-file" },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FileTree :title="t.title" :caption="t.caption" :tree="t.tree" />
</template>
