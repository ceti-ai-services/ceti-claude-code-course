<!--
  M06D1 — Three moves, real commands.
  Pattern: ThreeMovesTerminal. Shows the rhythm as actual terminal lines
  the reader would type. Read, plan, execute with approval.
-->
<script setup lang="ts">
import ThreeMovesTerminal from "@/components/course/patterns/ThreeMovesTerminal.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The rhythm, as you'd type it",
  caption: "Read, plan, execute. Three real prompts. Auto-cycles so you can read along.",
  dir: "~/Clients/Meridian",
  moves: [
    {
      stamp: "READ",
      role: "primary" as const,
      line: "read every file in this folder and tell me what's here",
      reply: "12 files read · 3 client threads · 1 SOW",
    },
    {
      stamp: "PLAN",
      role: "secondary" as const,
      line: "draft three follow-up emails. show me the first before the others",
      reply: "draft 1 ready · awaiting your read before drafting 2 + 3",
    },
    {
      stamp: "EXECUTE",
      role: "accent" as const,
      line: "save as follow-up-1.md",
      reply: "wrote follow-up-1.md · approve? [y/n]",
    },
  ],
}

const es = {
  title: "El ritmo, como lo escribirías",
  caption: "Leer, planear, ejecutar. Tres prompts reales. Auto-cicla para que leas con calma.",
  dir: "~/Clientes/Meridian",
  moves: [
    {
      stamp: "LEER",
      role: "primary" as const,
      line: "lee cada archivo de esta carpeta y dime qué hay",
      reply: "12 archivos leídos · 3 hilos de cliente · 1 SOW",
    },
    {
      stamp: "PLANEAR",
      role: "secondary" as const,
      line: "redacta tres correos de seguimiento. enséñame el primero antes",
      reply: "borrador 1 listo · espera tu lectura antes de 2 + 3",
    },
    {
      stamp: "EJECUTAR",
      role: "accent" as const,
      line: "guarda como seguimiento-1.md",
      reply: "escribí seguimiento-1.md · ¿aprobar? [s/n]",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <ThreeMovesTerminal
    :title="t.title"
    :caption="t.caption"
    :dir="t.dir"
    :moves="t.moves"
  />
</template>
