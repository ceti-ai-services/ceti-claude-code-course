<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import StackedReveal from "@/components/course/StackedReveal.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M05 · CLAUDE.md",
  title: "Teach it once. Let it remember forever.",
  analogy: "Write it once. Claude reads it every session.",
  chips: [
    { label: "Four questions" },
    { label: "Project-level file" },
    { label: "No reintroduction tax" },
  ],
  time: "13 min",
  eyebrow: "Brief · 4 questions",
  revealTitle: "Answer these once. Save. Done.",
  items: [
    {
      label: "Who am I?",
      summary:
        "One sentence. Your role, what you do, who you serve.",
      body:
        "<p>Specific beats generic. \"Independent brand strategist, ten years in, three retainer clients\" teaches Claude more than \"consultant.\"</p>",
      code: "# Who I am\nIndependent brand strategist. Ten years in.\nThree retainer clients, one project client at a time.",
    },
    {
      label: "What is this folder for?",
      summary:
        "The purpose of this specific folder and the shape of work in it.",
      body:
        "<p>CLAUDE.md is per-folder. This question grounds Claude in the <em>this-specific-folder</em> context.</p>",
      code: "# What this folder is\nActive work for Meridian Foods — the rebrand project.\nBriefs, decks, client emails, meeting notes, research.",
    },
    {
      label: "What conventions do I care about?",
      summary:
        "The things you keep re-explaining. Tone, words, output shapes.",
      body:
        "<p>Every line that belongs in your CLAUDE.md is a line you won't type again tomorrow.</p>",
      code: "# How I work\n- Direct, no fluff. The client is senior.\n- When I ask for a draft, default short.\n- Flag anything that reads like I'm trying too hard.",
    },
    {
      label: "Who reads what comes out of here?",
      summary:
        "The audience for the outputs. Name them, or Claude assumes.",
      body:
        "<p>Two sentences. Who they are, what they hate, what they need quickly.</p>",
      code: "# Audience for outputs\nMeridian's CMO (reads fast, hates adjectives)\nand their board (numbers and one-page summaries, not essays).",
    },
  ],
}

const es = {
  codename: "M05 · CLAUDE.md",
  title: "Enséñale una vez. Deja que recuerde para siempre.",
  analogy: "Escríbelo una vez. Claude lo lee cada sesión.",
  chips: [
    { label: "Cuatro preguntas" },
    { label: "Archivo del proyecto" },
    { label: "Sin reintroducción diaria" },
  ],
  time: "13 min",
  eyebrow: "Brief · 4 preguntas",
  revealTitle: "Contesta estas una vez. Guarda. Listo.",
  items: [
    {
      label: "¿Quién soy?",
      summary:
        "Una frase. Tu rol, qué haces, para quién.",
      body:
        "<p>Lo específico le gana a lo genérico. \"Estratega de marca independiente, diez años, tres clientes de retainer\" le enseña más que \"consultor\".</p>",
      code: "# Quién soy\nEstratega de marca independiente. Diez años.\nTres clientes de retainer, uno por proyecto a la vez.",
    },
    {
      label: "¿Para qué es esta carpeta?",
      summary:
        "El propósito de esta carpeta específica y la forma del trabajo.",
      body:
        "<p>CLAUDE.md es por carpeta. Esta pregunta ancla a Claude en el contexto de <em>esta carpeta específica</em>.</p>",
      code: "# Qué es esta carpeta\nTrabajo activo para Meridian Foods — el proyecto de rebrand.\nBriefs, decks, correos, notas de reunión, research.",
    },
    {
      label: "¿Qué convenciones me importan?",
      summary:
        "Las cosas que sigues re-explicando. Tono, palabras, formato.",
      body:
        "<p>Cada línea que pertenece en tu CLAUDE.md es una línea que no vas a escribir mañana.</p>",
      code: "# Cómo trabajo\n- Directo, sin relleno. El cliente es senior.\n- Cuando pido un borrador, por defecto corto.\n- Márcame cualquier cosa que suene a esfuerzo excesivo.",
    },
    {
      label: "¿Quién lee lo que sale de aquí?",
      summary:
        "La audiencia de los outputs. Nómbrala o Claude asume.",
      body:
        "<p>Dos frases. Quiénes son, qué odian, qué necesitan rápido.</p>",
      code: "# Audiencia de outputs\nCMO de Meridian (lee rápido, odia los adjetivos)\ny el board (números y resumen en una página, no ensayos).",
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
  />
</template>
