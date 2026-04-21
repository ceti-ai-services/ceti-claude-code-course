<!--
  M03-D1 — Scope anatomy: what a "good" starting folder looks like versus
  a folder that's too big. FileTree pattern with role-tinted rows.
-->
<script setup lang="ts">
import FileTree from "@/components/course/patterns/FileTree.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Scope is everything",
  caption: "Green = start here. Red = too big. The folder you pick is the universe.",
  tree: [
    {
      name: "~/Documents",
      kind: "folder" as const,
      role: "accent" as const,
      tooltip: "too big — years of everything",
    },
    {
      name: "Clients",
      kind: "folder" as const,
      children: [
        {
          name: "Acme",
          kind: "folder" as const,
          children: [
            {
              name: "2026-Q1",
              kind: "folder" as const,
              role: "secondary" as const,
              tooltip: "start Claude here — one client, one quarter",
            },
            { name: "2025-Q4", kind: "folder" as const },
          ],
        },
        { name: "Globex", kind: "folder" as const },
      ],
    },
    {
      name: "Downloads",
      kind: "folder" as const,
      role: "accent" as const,
      tooltip: "too broad — use a subfolder",
    },
  ],
}

const es = {
  title: "El alcance lo es todo",
  caption: "Verde = arranca aquí. Rojo = demasiado grande. La carpeta que escoges es el universo.",
  tree: [
    {
      name: "~/Documents",
      kind: "folder" as const,
      role: "accent" as const,
      tooltip: "demasiado grande — años de todo",
    },
    {
      name: "Clientes",
      kind: "folder" as const,
      children: [
        {
          name: "Acme",
          kind: "folder" as const,
          children: [
            {
              name: "2026-Q1",
              kind: "folder" as const,
              role: "secondary" as const,
              tooltip: "arranca Claude aquí — un cliente, un trimestre",
            },
            { name: "2025-Q4", kind: "folder" as const },
          ],
        },
        { name: "Globex", kind: "folder" as const },
      ],
    },
    {
      name: "Downloads",
      kind: "folder" as const,
      role: "accent" as const,
      tooltip: "demasiado amplia — usa una subcarpeta",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FileTree :title="t.title" :caption="t.caption" :tree="t.tree" />
</template>
