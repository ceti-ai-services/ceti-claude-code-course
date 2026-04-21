<!--
  m01-d3 — Where your actual work lives (the folders Claude Code can see)
  Pattern: FileTree
  Position: replaces the "Right now, your work is in folders..." prose.
  Makes the point physical before the colleague metaphor lands.
-->
<script setup lang="ts">
import FileTree from "@/components/course/patterns/FileTree.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Where your work actually lives",
  caption: "A colleague can see all of this. The browser chatbot cannot.",
  tree: [
    {
      name: "~",
      kind: "folder" as const,
      children: [
        {
          name: "Documents",
          kind: "folder" as const,
          children: [
            { name: "Clients", kind: "folder" as const, role: "primary" as const, tooltip: "briefs, contracts, SOWs" },
            { name: "Reports", kind: "folder" as const, tooltip: "weekly updates you rewrite every Friday" },
          ],
        },
        {
          name: "Downloads",
          kind: "folder" as const,
          role: "accent" as const,
          tooltip: "screenshots and receipts piling up",
          children: [
            { name: "receipt-3124.png", kind: "file" as const },
            { name: "lease-draft.pdf",  kind: "file" as const },
          ],
        },
        {
          name: "Notes",
          kind: "folder" as const,
          role: "secondary" as const,
          tooltip: "caption backlog, half-written ideas",
          children: [
            { name: "captions.md", kind: "file" as const },
          ],
        },
      ],
    },
  ],
}

const es = {
  title: "Dónde vive de verdad tu trabajo",
  caption: "Un colega puede ver todo esto. El chatbot del navegador no.",
  tree: [
    {
      name: "~",
      kind: "folder" as const,
      children: [
        {
          name: "Documentos",
          kind: "folder" as const,
          children: [
            { name: "Clientes", kind: "folder" as const, role: "primary" as const, tooltip: "briefs, contratos, propuestas" },
            { name: "Reportes", kind: "folder" as const, tooltip: "updates semanales que reescribes cada viernes" },
          ],
        },
        {
          name: "Descargas",
          kind: "folder" as const,
          role: "accent" as const,
          tooltip: "capturas y recibos acumulados",
          children: [
            { name: "recibo-3124.png", kind: "file" as const },
            { name: "contrato-renta.pdf", kind: "file" as const },
          ],
        },
        {
          name: "Notas",
          kind: "folder" as const,
          role: "secondary" as const,
          tooltip: "captions pendientes, ideas a medias",
          children: [
            { name: "captions.md", kind: "file" as const },
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
