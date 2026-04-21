<!--
  m10-d1 — Anatomy of settings.json for a PreToolUse hook.
  Pattern: FileTree. Highlighted rows carry the shape every hook
  shares: event → matcher → hooks[] → command.
-->
<script setup lang="ts">
import FileTree from "@/components/course/patterns/FileTree.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where a hook lives",
  caption: "Hover a row. The shape is the same every time.",
  tree: [
    {
      name: ".claude/",
      kind: "folder" as const,
      tooltip: "project-scoped config · prefer this over the global file",
      children: [
        {
          name: "settings.json",
          kind: "file" as const,
          role: "primary" as const,
          tooltip: "where every hook is registered",
          children: [
            {
              name: "hooks/",
              kind: "folder" as const,
              role: "secondary" as const,
              tooltip: "one key per lifecycle event",
              children: [
                {
                  name: "PreToolUse[]",
                  kind: "folder" as const,
                  role: "accent" as const,
                  tooltip: "fires before Claude uses a tool — can block",
                  children: [
                    { name: "matcher: \"Bash\"", kind: "file" as const, tooltip: "only run when this tool is about to fire" },
                    { name: "hooks[].command", kind: "file" as const, tooltip: "the shell line that inspects and decides" },
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
  title: "Dónde vive un hook",
  caption: "Pasa el cursor. La forma se repite siempre.",
  tree: [
    {
      name: ".claude/",
      kind: "folder" as const,
      tooltip: "config del proyecto · preferible sobre la global",
      children: [
        {
          name: "settings.json",
          kind: "file" as const,
          role: "primary" as const,
          tooltip: "donde se registran todos los hooks",
          children: [
            {
              name: "hooks/",
              kind: "folder" as const,
              role: "secondary" as const,
              tooltip: "una clave por evento de ciclo",
              children: [
                {
                  name: "PreToolUse[]",
                  kind: "folder" as const,
                  role: "accent" as const,
                  tooltip: "dispara antes de usar una herramienta — puede bloquear",
                  children: [
                    { name: "matcher: \"Bash\"", kind: "file" as const, tooltip: "solo corre para esta herramienta" },
                    { name: "hooks[].command", kind: "file" as const, tooltip: "la línea de shell que inspecciona y decide" },
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
  <FileTree
    :title="t.title"
    :caption="t.caption"
    :tree="t.tree"
  />
</template>
