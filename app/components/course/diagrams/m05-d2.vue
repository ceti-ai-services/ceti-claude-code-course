<!--
  M05D2 — The four axes worth writing down.
  Pattern: CheckableStack. The reader commits to each axis as they
  draft their own file.
-->
<script setup lang="ts">
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The four axes",
  caption: "Tick each one as you draft your file. One screen is enough.",
  items: [
    {
      title: "Who am I?",
      role: "primary" as const,
      body: "One sentence. Your role, what you do, who you do it for. The more specific, the better Claude's defaults get.",
    },
    {
      title: "What is this folder for?",
      role: "secondary" as const,
      body: "One or two sentences. The purpose of this specific folder and what kind of work lives in it.",
    },
    {
      title: "What conventions do I care about?",
      role: "support" as const,
      body: "Anything you keep re-explaining. Naming patterns. Tone. Words you don't use. Output shapes you prefer.",
    },
    {
      title: "Who reads what comes out of here?",
      role: "accent" as const,
      body: "If most things produced in this folder go to a specific audience — clients, a spouse, an inspector — name them.",
    },
  ],
}

const es = {
  title: "Los cuatro ejes",
  caption: "Marca cada uno mientras redactas tu archivo. Una pantalla alcanza.",
  items: [
    {
      title: "¿Quién soy?",
      role: "primary" as const,
      body: "Una oración. Tu rol, qué haces, para quién. Mientras más específico, mejor quedan los defaults de Claude.",
    },
    {
      title: "¿Para qué es esta carpeta?",
      role: "secondary" as const,
      body: "Una o dos oraciones. El propósito de esta carpeta en específico y qué tipo de trabajo vive en ella.",
    },
    {
      title: "¿Qué convenciones me importan?",
      role: "support" as const,
      body: "Cualquier cosa que te encuentres re-explicando. Patrones de nombres. Tono. Palabras que no usas. Formas de output que prefieres.",
    },
    {
      title: "¿Quién lee lo que sale de aquí?",
      role: "accent" as const,
      body: "Si la mayoría de lo que sale de esta carpeta va a una audiencia específica — clientes, tu pareja, un inspector — nómbrala.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <CheckableStack :title="t.title" :caption="t.caption" :items="t.items" />
</template>
