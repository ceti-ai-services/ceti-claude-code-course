<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import StackedReveal from "@/components/course/StackedReveal.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M07 · WEEK ONE",
  title: "You did it. Now what changes.",
  analogy: "Three moves this week. Then the tool is yours.",
  chips: [
    { label: "Reuse" },
    { label: "Refine" },
    { label: "Catch the reflex" },
  ],
  time: "10 min",
  eyebrow: "Weekly loop · 3 habits",
  revealTitle: "Tick them as you go.",
  items: [
    {
      label: "Reuse your CLAUDE.md in a second folder.",
      summary: "A different client, a different project, a different batch.",
      body:
        "<p>Tomorrow morning, pick another folder where your work lives. Write a new CLAUDE.md there, modeled on the one from Module 05. The second one takes ten minutes. The third one takes five.</p>",
    },
    {
      label: "Refine the one you have as you notice what you keep re-explaining.",
      summary: "Every re-explained thing is a line that belongs in the file.",
      body:
        "<p>Every time you type \"remember that I prefer…\" or \"also just to be clear, my clients…\" — that's a line that belongs in the file, not in the chat. Add it, save, next session is sharper.</p>",
    },
    {
      label: "Catch yourself before the browser-chatbot reflex.",
      summary: "The real test is noticing the reflex and redirecting.",
      body:
        "<p>Next week you'll almost open ChatGPT in a tab and paste a document. Stop for one second and ask: <em>could I just point Claude at the folder this lives in?</em> Nine times out of ten the answer is yes.</p>",
    },
  ],
}

const es = {
  codename: "M07 · SEMANA 1",
  title: "Lo lograste. Ahora qué cambia.",
  analogy: "Tres movimientos esta semana. Luego la herramienta es tuya.",
  chips: [
    { label: "Reúsa" },
    { label: "Afina" },
    { label: "Atrapa el reflejo" },
  ],
  time: "10 min",
  eyebrow: "Loop semanal · 3 hábitos",
  revealTitle: "Márcalos conforme los haces.",
  items: [
    {
      label: "Reúsa tu CLAUDE.md en una segunda carpeta.",
      summary: "Otro cliente, otro proyecto, otro lote.",
      body:
        "<p>Mañana por la mañana, encuentra otra carpeta donde vive tu trabajo. Escribe un CLAUDE.md nuevo, modelado en el del Módulo 05. El segundo te toma diez minutos. El tercero cinco.</p>",
    },
    {
      label: "Afina el que tienes conforme notas qué sigues re-explicando.",
      summary: "Cada cosa re-explicada es una línea que pertenece en el archivo.",
      body:
        "<p>Cada vez que escribas \"recuerda que prefiero…\" o \"también, para aclarar, mis clientes…\" — esa es una línea que pertenece en el archivo, no en el chat. Agrégala, guarda, la siguiente sesión queda más afilada.</p>",
    },
    {
      label: "Agárrate antes del reflejo del chatbot del navegador.",
      summary: "La prueba real es notar el reflejo y redirigirlo.",
      body:
        "<p>La próxima semana casi abrirás ChatGPT en una pestaña y pegarás un documento. Detente un segundo y pregunta: <em>¿podría apuntar Claude a la carpeta donde vive esto?</em> Nueve de cada diez veces la respuesta es sí.</p>",
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
  <StackedReveal
    :eyebrow="t.eyebrow"
    :title="t.revealTitle"
    :items="t.items"
    :checkable="true"
  />
</template>
