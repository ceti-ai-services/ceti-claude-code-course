<!--
  M06D2 — The approval checkpoint. Scope widened — what do you do?
  Pattern: DecisionFork. Three choices, one right.
-->
<script setup lang="ts">
import DecisionFork from "@/components/course/patterns/DecisionFork.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "An approval prompt appears",
  caption: "Claude is about to write files you didn't ask for. Pick one.",
  question: "The diff shows Claude moving 14 files — you only asked about three. What do you do?",
  choices: [
    {
      label: "approve all",
      role: "accent" as const,
      consequence: "Eleven files end up somewhere you didn't choose. You spend the afternoon undoing.",
    },
    {
      label: "deny and narrow",
      role: "secondary" as const,
      consequence: "Right call. \"Only touch the three I named.\" Claude re-plans with correct scope.",
    },
    {
      label: "approve and watch",
      role: "support" as const,
      consequence: "You'll catch it partway and have to stop the session. Cleaner to deny up front.",
    },
  ],
}

const es = {
  title: "Aparece un prompt de aprobación",
  caption: "Claude va a escribir archivos que no pediste. Escoge uno.",
  question: "El diff muestra a Claude moviendo 14 archivos — solo preguntaste por tres. ¿Qué haces?",
  choices: [
    {
      label: "aprobar todo",
      role: "accent" as const,
      consequence: "Once archivos acaban donde no elegiste. Pasas la tarde deshaciendo.",
    },
    {
      label: "denegar y acotar",
      role: "secondary" as const,
      consequence: "Decisión correcta. \"Solo toca los tres que nombré.\" Claude re-planea con el alcance bien.",
    },
    {
      label: "aprobar y vigilar",
      role: "support" as const,
      consequence: "Lo atraparás a medias y tendrás que cortar la sesión. Más limpio denegar de entrada.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <DecisionFork
    :title="t.title"
    :caption="t.caption"
    :question="t.question"
    :choices="t.choices"
  />
</template>
