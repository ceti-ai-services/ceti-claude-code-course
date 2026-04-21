<!--
  m12-d1 — A real commit-message walkthrough, honest version vs. flattering.
  Pattern: TracedExample
  Position: inside "Commit messages that tell the truth" — shows the shape
  of a good message, artifact-by-artifact.
-->
<script setup lang="ts">
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "One honest commit, four parts",
  caption: "Claude drafts the message in this shape. Tap a step to see the artifact.",
  steps: [
    {
      phase: "Summary",
      role: "primary" as const,
      action: "One line, imperative mood, under 72 chars. No adjectives.",
      artifact: "rename UserSchema exports to match db column casing",
      artifactLang: "text" as const,
    },
    {
      phase: "What",
      role: "secondary" as const,
      action: "Paragraph naming the concrete change — files, functions, behavior.",
      artifact: "Renames `user_id` → `userId` in db/schema.ts and the three\ncallers in api/users/. Adds a deprecation alias so older\ncallers keep compiling for one release.",
      artifactLang: "text" as const,
    },
    {
      phase: "Why",
      role: "accent" as const,
      action: "One sentence explaining why the change exists, not what it does.",
      artifact: "We were translating casing in three layers; pick one.",
      artifactLang: "text" as const,
    },
    {
      phase: "Watch",
      role: "support" as const,
      action: "Anything the next engineer should know — risks, follow-ups, TODOs.",
      artifact: "Watch: the deprecation alias emits a runtime warning.\nRemove it in the next minor.",
      artifactLang: "text" as const,
    },
  ],
}

const es = {
  title: "Un commit honesto, cuatro partes",
  caption: "Claude arma el mensaje con esta forma. Toca un paso para ver el artefacto.",
  steps: [
    {
      phase: "Resumen",
      role: "primary" as const,
      action: "Una línea, modo imperativo, menos de 72 caracteres. Sin adjetivos.",
      artifact: "renombra exports de UserSchema al casing de las columnas db",
      artifactLang: "text" as const,
    },
    {
      phase: "Qué",
      role: "secondary" as const,
      action: "Párrafo nombrando el cambio concreto — archivos, funciones, comportamiento.",
      artifact: "Renombra `user_id` → `userId` en db/schema.ts y en los tres\nllamadores en api/users/. Añade un alias de deprecación\npara que los llamadores viejos sigan compilando un release.",
      artifactLang: "text" as const,
    },
    {
      phase: "Por qué",
      role: "accent" as const,
      action: "Una frase que explica por qué existe el cambio, no lo que hace.",
      artifact: "Traducíamos casing en tres capas; elige una.",
      artifactLang: "text" as const,
    },
    {
      phase: "Ojo",
      role: "support" as const,
      action: "Lo que el próximo ingeniero debe saber — riesgos, pendientes, TODOs.",
      artifact: "Ojo: el alias de deprecación emite un warning en runtime.\nRetíralo en el próximo minor.",
      artifactLang: "text" as const,
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <TracedExample
    :title="t.title"
    :caption="t.caption"
    :steps="t.steps"
  />
</template>
