<!--
  M08Hero — "A skill is a folder of expertise Claude loads when the task matches."

  Composition: MissionBrief + ComparisonGrid. Two columns — slash command
  (explicit invocation) vs. skill (ambient, description-triggered).

  Plan ref: docs/MODULE-VISUAL-PLAN.md §08
-->
<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import ComparisonGrid from "@/components/course/patterns/ComparisonGrid.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M08 · SKILLS",
  title: "Skills — packaged capabilities Claude loads on demand.",
  analogy: "A skill is a folder of expertise Claude loads when the task matches.",
  chips: [
    { label: "SKILL.md at the root" },
    { label: "Description is the trigger" },
    { label: "Folder of context, not a prompt" },
  ],
  time: "12 min",
  compTitle: "Two shapes, two moments",
  compCaption: "Click a column to focus. One you invoke. One notices you.",
  columns: [
    {
      eyebrow: "YOU TYPE IT",
      tagLabel: "slash command",
      tagRole: "support" as const,
      body: "Explicit. You pick it from the /-menu. Runs a prompt, prints the output, and is gone. Best when you want the same answer every time.",
    },
    {
      eyebrow: "CLAUDE PICKS IT",
      tagLabel: "skill",
      tagRole: "secondary" as const,
      body: "Ambient. Claude reads the description, matches it to what you said, and pulls the whole folder into context. Best when you want the shape consistent and the content variable.",
    },
  ],
}

const es = {
  codename: "M08 · SKILLS",
  title: "Skills — capacidades empaquetadas que Claude carga a demanda.",
  analogy: "Una skill es una carpeta de conocimiento que Claude carga cuando la tarea encaja.",
  chips: [
    { label: "SKILL.md en la raíz" },
    { label: "La descripción es el disparador" },
    { label: "Carpeta de contexto, no un prompt" },
  ],
  time: "12 min",
  compTitle: "Dos formas, dos momentos",
  compCaption: "Clic en una columna para enfocarla. Una la invocas tú. La otra te nota.",
  columns: [
    {
      eyebrow: "TÚ LO ESCRIBES",
      tagLabel: "comando slash",
      tagRole: "support" as const,
      body: "Explícito. Lo eliges del menú /. Corre un prompt, imprime la salida, y se va. Ideal cuando quieres la misma respuesta cada vez.",
    },
    {
      eyebrow: "CLAUDE LO ELIGE",
      tagLabel: "skill",
      tagRole: "secondary" as const,
      body: "Ambiente. Claude lee la descripción, la empata con lo que dijiste, y jala toda la carpeta al contexto. Ideal cuando quieres la forma constante y el contenido variable.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <ComparisonGrid
    :title="t.compTitle"
    :caption="t.compCaption"
    :columns="t.columns"
  />
</template>
