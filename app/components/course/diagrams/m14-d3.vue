<!--
  m14-d3 — A journal prompt, walked through.
  Pattern: TracedExample
  Position: near the end, before the final "Go use it" note. Five
  short prompts the reader can answer to close the loop on their own.
-->
<script setup lang="ts">
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Close the loop with yourself",
  caption: "Click any step. Five prompts you'd actually answer in two minutes.",
  steps: [
    {
      phase: "notice",
      role: "primary" as const,
      action: "Name the task you shipped in Module 06.",
      artifact: "The one real thing that wasn't there this morning. Write its filename.",
    },
    {
      phase: "mark",
      role: "secondary" as const,
      action: "Write the minute you saved, honestly.",
      artifact: "Not the influencer number. The real one. 7? 22? 40?",
    },
    {
      phase: "spot",
      role: "accent" as const,
      action: "Catch the next paste reflex before it happens.",
      artifact: "Which document were you about to drop into ChatGPT? Which folder did it live in?",
    },
    {
      phase: "refine",
      role: "primary" as const,
      action: "Name one line for your CLAUDE.md you keep re-saying.",
      artifact: "Every repetition is a line that belongs in the file. Write it now.",
    },
    {
      phase: "commit",
      role: "secondary" as const,
      action: "Pick a day this week. Commit to one real use.",
      artifact: "Monday 9am, after coffee, the task from step 1. No grander than that.",
    },
  ],
}

const es = {
  title: "Cierra el ciclo contigo",
  caption: "Clic en cualquier paso. Cinco preguntas que contestas en dos minutos.",
  steps: [
    {
      phase: "nota",
      role: "primary" as const,
      action: "Nombra lo que sacaste en el módulo 06.",
      artifact: "Lo único real que no existía esta mañana. Escribe su nombre de archivo.",
    },
    {
      phase: "marca",
      role: "secondary" as const,
      action: "Anota los minutos que de verdad ahorraste.",
      artifact: "No el número de influencer. El real. ¿7? ¿22? ¿40?",
    },
    {
      phase: "cacha",
      role: "accent" as const,
      action: "Atrapa el próximo reflejo de pegar antes de que pase.",
      artifact: "¿Qué documento ibas a soltar en ChatGPT? ¿En qué carpeta vive?",
    },
    {
      phase: "afina",
      role: "primary" as const,
      action: "Apunta una línea de tu CLAUDE.md que repites siempre.",
      artifact: "Cada repetición es una línea que va en el archivo. Escríbela ya.",
    },
    {
      phase: "firma",
      role: "secondary" as const,
      action: "Elige un día esta semana. Compromete un uso real.",
      artifact: "Lunes 9am, tras el café, la tarea del paso 1. Sin más grandeza.",
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
