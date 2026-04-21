<!--
  M08-D1 — Anatomy of a skill folder.
  Pattern: FileTree. Shows .claude/skills/<name>/ layout.
-->
<script setup lang="ts">
import { computed } from "vue"
import FileTree from "@/components/course/patterns/FileTree.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Anatomy of a skill folder",
  caption: "One skill, one folder. SKILL.md is the only required file — everything else is fuel.",
  tree: [
    {
      name: ".claude/",
      kind: "folder" as const,
      children: [
        {
          name: "skills/",
          kind: "folder" as const,
          children: [
            {
              name: "weekly-status/",
              kind: "folder" as const,
              role: "primary" as const,
              tooltip: "the skill's name — matches 'name' in frontmatter",
              children: [
                { name: "SKILL.md", kind: "file" as const, role: "accent" as const, tooltip: "required · name + description + body" },
                {
                  name: "examples/",
                  kind: "folder" as const,
                  role: "secondary" as const,
                  tooltip: "optional · real past outputs for tone",
                  children: [
                    { name: "2024-q4-week-42.md", kind: "file" as const, role: "support" as const },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const es = {
  title: "Anatomía de una carpeta skill",
  caption: "Una skill, una carpeta. SKILL.md es lo único obligatorio — lo demás es combustible.",
  tree: [
    {
      name: ".claude/",
      kind: "folder" as const,
      children: [
        {
          name: "skills/",
          kind: "folder" as const,
          children: [
            {
              name: "weekly-status/",
              kind: "folder" as const,
              role: "primary" as const,
              tooltip: "nombre de la skill — coincide con 'name' en frontmatter",
              children: [
                { name: "SKILL.md", kind: "file" as const, role: "accent" as const, tooltip: "obligatorio · name + description + cuerpo" },
                {
                  name: "examples/",
                  kind: "folder" as const,
                  role: "secondary" as const,
                  tooltip: "opcional · salidas reales para el tono",
                  children: [
                    { name: "2024-q4-week-42.md", kind: "file" as const, role: "support" as const },
                  ],
                },
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
