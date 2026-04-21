<!--
  M05D1 — Where CLAUDE.md lives.
  Pattern: FileTree. The file sits in the project root; Claude reads it
  automatically when launched from this folder.
-->
<script setup lang="ts">
import FileTree from "@/components/course/patterns/FileTree.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where the file sits",
  caption: "One file, in the folder root. Claude opens it before saying hello.",
  tree: [
    {
      name: "Clients/Meridian/",
      kind: "folder" as const,
      role: "support" as const,
      tooltip: "the folder you launch Claude from",
      children: [
        { name: "CLAUDE.md", kind: "file" as const, role: "primary" as const, tooltip: "read at session start" },
        { name: "proposal.md", kind: "file" as const },
        { name: "meeting-notes.md", kind: "file" as const },
        { name: "price-list.md", kind: "file" as const },
        { name: "emails/", kind: "folder" as const, tooltip: "past threads, .eml files" },
      ],
    },
  ],
}

const es = {
  title: "Dónde vive el archivo",
  caption: "Un archivo, en la raíz de la carpeta. Claude lo abre antes de saludar.",
  tree: [
    {
      name: "Clientes/Meridian/",
      kind: "folder" as const,
      role: "support" as const,
      tooltip: "la carpeta donde arrancas Claude",
      children: [
        { name: "CLAUDE.md", kind: "file" as const, role: "primary" as const, tooltip: "se lee al iniciar la sesión" },
        { name: "propuesta.md", kind: "file" as const },
        { name: "notas-reunion.md", kind: "file" as const },
        { name: "lista-precios.md", kind: "file" as const },
        { name: "correos/", kind: "folder" as const, tooltip: "hilos pasados, archivos .eml" },
      ],
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FileTree :title="t.title" :caption="t.caption" :tree="t.tree" />
</template>
