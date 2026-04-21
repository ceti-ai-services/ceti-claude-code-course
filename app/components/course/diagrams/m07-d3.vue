<!--
  M07-D3 — Naming rules that age well.
  Pattern: CheckableStack. Four rules you commit to.
-->
<script setup lang="ts">
import { computed } from "vue"
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Naming rules that age well",
  caption: "Tap a rule to expand. Check when it's a habit.",
  items: [
    {
      title: "Short verbs beat long nouns",
      body: "/morning reads better than /daily-folder-summary. Treat the name like a keyboard shortcut, not a filename.",
      role: "primary" as const,
    },
    {
      title: "Prefix related commands",
      body: "When the set grows, group by intent: /draft-email, /draft-invoice, /draft-follow-up. The menu sorts itself.",
      role: "secondary" as const,
    },
    {
      title: "Apply the rule of three",
      body: "Two is a coincidence, three is a pattern. Only turn a prompt into a command once you've retyped a variant three times.",
      role: "accent" as const,
    },
    {
      title: "One file, one prompt",
      body: "Never stuff two jobs into one command. If it has two outputs, split it. Refinement means editing one tight file.",
      role: "support" as const,
    },
  ],
}

const es = {
  title: "Reglas de nombres que envejecen bien",
  caption: "Toca una regla para expandirla. Marca cuando sea hábito.",
  items: [
    {
      title: "Verbos cortos ganan a nombres largos",
      body: "/morning se lee mejor que /resumen-diario-de-carpeta. El nombre es un atajo de teclado, no un nombre de archivo.",
      role: "primary" as const,
    },
    {
      title: "Prefija comandos relacionados",
      body: "Cuando el conjunto crece, agrupa por intención: /draft-email, /draft-invoice, /draft-follow-up. El menú se ordena solo.",
      role: "secondary" as const,
    },
    {
      title: "Aplica la regla del tres",
      body: "Dos veces es casualidad, tres es patrón. Convierte un prompt en comando solo cuando lo hayas retecleado tres veces.",
      role: "accent" as const,
    },
    {
      title: "Un archivo, un prompt",
      body: "Nunca metas dos trabajos en un comando. Si tiene dos salidas, divídelo. Refinar es editar un archivo breve.",
      role: "support" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <CheckableStack :title="t.title" :caption="t.caption" :items="t.items" />
</template>
