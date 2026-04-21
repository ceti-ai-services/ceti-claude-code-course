<!--
  M03-D4 — Habits to carry into every first session.
  CheckableStack — commit to these, don't just read them.
-->
<script setup lang="ts">
import CheckableStack from "@/components/course/patterns/CheckableStack.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "First-session habits",
  caption: "Tick each one you'll commit to. They compound.",
  items: [
    {
      title: "Scope before you type",
      role: "primary" as const,
      body: "Pick one folder that holds one batch of work. Smaller is always better. Ten files beat five hundred.",
    },
    {
      title: "Ask what you have, not what Claude does",
      role: "secondary" as const,
      body: "First prompt: 'What's in this folder and what is it for?' Let Claude tell you about your own work.",
    },
    {
      title: "Keep the conversation going",
      role: "accent" as const,
      body: "Don't restart. Ask the next thing. Each answer stays in context — Claude gets sharper as it learns your folder.",
    },
    {
      title: "Duplicate before you let it edit",
      role: "support" as const,
      body: "If the folder matters, copy it first. You'll learn the full undo discipline in Module 04, but start the habit now.",
    },
  ],
}

const es = {
  title: "Hábitos para tu primera sesión",
  caption: "Marca los que vas a comprometer. Se acumulan.",
  items: [
    {
      title: "Acota antes de escribir",
      role: "primary" as const,
      body: "Escoge una carpeta con un lote de trabajo. Más chica siempre es mejor. Diez archivos le ganan a quinientos.",
    },
    {
      title: "Pregunta qué tienes tú, no qué hace Claude",
      role: "secondary" as const,
      body: "Primer prompt: '¿Qué hay en esta carpeta y para qué es?' Deja que Claude te cuente de tu propio trabajo.",
    },
    {
      title: "Mantén la conversación",
      role: "accent" as const,
      body: "No reinicies. Pregunta lo siguiente. Cada respuesta se queda en contexto — Claude se afila mientras aprende tu carpeta.",
    },
    {
      title: "Duplica antes de dejarlo editar",
      role: "support" as const,
      body: "Si la carpeta importa, cópiala primero. La disciplina completa la aprendes en el Módulo 04, pero empieza el hábito ya.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <CheckableStack :title="t.title" :caption="t.caption" :items="t.items" />
</template>
