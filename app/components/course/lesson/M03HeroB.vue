<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import TerminalDemo from "@/components/course/TerminalDemo.vue"
import ConceptCard from "@/components/course/ConceptCard.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

interface LineDef {
  kind: "prompt" | "out" | "ok" | "warn" | "meta"
  text: string
}

const enLines: LineDef[] = [
  { kind: "meta", text: "-- scope: ~/Clients/Meridian/ --" },
  { kind: "prompt", text: "what's in this folder and what is it for?" },
  { kind: "out", text: "Reading 14 files…" },
  { kind: "out", text: "Q1 rebrand project for Meridian Foods." },
  { kind: "out", text: "Briefs, meeting notes, two draft decks, one invoice." },
  { kind: "meta", text: "(context: this folder only — no other projects visible)" },
  { kind: "prompt", text: "what's the most recent thing and what are they waiting on?" },
  { kind: "out", text: "Most recent: meeting-2026-04-12.md" },
  { kind: "out", text: "Waiting on: revised brand voice doc + logo shortlist by Friday." },
]

const esLines: LineDef[] = [
  { kind: "meta", text: "-- alcance: ~/Clientes/Meridian/ --" },
  { kind: "prompt", text: "¿qué hay en esta carpeta y para qué es?" },
  { kind: "out", text: "Leyendo 14 archivos…" },
  { kind: "out", text: "Proyecto de rebrand Q1 para Meridian Foods." },
  { kind: "out", text: "Briefs, notas de reunión, dos decks en borrador, una factura." },
  { kind: "meta", text: "(contexto: solo esta carpeta — ningún otro proyecto visible)" },
  { kind: "prompt", text: "¿qué es lo más reciente y qué están esperando?" },
  { kind: "out", text: "Más reciente: meeting-2026-04-12.md" },
  { kind: "out", text: "Esperan: doc de voz de marca revisado + shortlist de logo para el viernes." },
]

const en = {
  codename: "M03 · FIRST SESSION",
  title: "Your first real session. Not a hello. A useful answer.",
  analogy: "Pick your universe. Then ask.",
  chips: [
    { label: "Scope a folder" },
    { label: "One first prompt" },
    { label: "Hold the session" },
  ],
  time: "14 min",
  demoTitle: "claude · first-session · ~/Clients/Meridian/",
  rulesEyebrow: "Three rules for a good first session",
  rules: [
    {
      number: "01",
      label: "Start scoped",
      body: "One folder. One batch of related work. Claude Code's context is the folder you launch from — smaller is sharper.",
      detail: "Don't launch in ~ or on your Desktop. Years of everything lives there. Start in the folder for the task you're doing right now.",
    },
    {
      number: "02",
      label: "Ask what's there first",
      body: "\"What's in this folder and what is it for?\" — before asking for anything to be done.",
      detail: "This single question tells you whether Claude's reading of your files matches your mental model of them. Catch mismatches here, not mid-task.",
    },
    {
      number: "03",
      label: "Don't type \"hi\"",
      body: "The first prompt is your first signal. Use it to orient Claude to the work, not to the conversation.",
      detail: "Claude doesn't need a warm-up. The folder is already read. Ask the useful question and you'll have a useful answer in under ten seconds.",
    },
  ],
}

const es = {
  codename: "M03 · PRIMERA SESIÓN",
  title: "Tu primera sesión real. No un hola. Una respuesta útil.",
  analogy: "Elige tu universo. Luego pregunta.",
  chips: [
    { label: "Acota la carpeta" },
    { label: "Un primer prompt" },
    { label: "Sostén la sesión" },
  ],
  time: "14 min",
  demoTitle: "claude · primera sesión · ~/Clientes/Meridian/",
  rulesEyebrow: "Tres reglas para una buena primera sesión",
  rules: [
    {
      number: "01",
      label: "Empieza acotado",
      body: "Una carpeta. Un lote de trabajo relacionado. El contexto de Claude Code es la carpeta desde donde lo lanzas — más pequeño, más preciso.",
      detail: "No lo lances en ~ ni en el Escritorio. Ahí vive todo. Empieza en la carpeta de la tarea que estás haciendo ahora.",
    },
    {
      number: "02",
      label: "Pregunta qué hay primero",
      body: "\"¿Qué hay en esta carpeta y para qué es?\" — antes de pedir que se haga algo.",
      detail: "Esta única pregunta te dice si la lectura de Claude de tus archivos coincide con tu modelo mental. Detecta desajustes aquí, no a mitad de la tarea.",
    },
    {
      number: "03",
      label: "No escribas \"hola\"",
      body: "El primer prompt es tu primera señal. Úsalo para orientar a Claude al trabajo, no a la conversación.",
      detail: "Claude no necesita calentamiento. La carpeta ya fue leída. Haz la pregunta útil y tendrás una respuesta útil en menos de diez segundos.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
const lines = computed(() => (lang.value === "es" ? esLines : enLines))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <ConceptCard
    :eyebrow="t.rulesEyebrow"
    :items="t.rules"
  />
  <TerminalDemo
    :title="t.demoTitle"
    dir="~/Clients/Meridian/"
    :lines="lines"
    :autoplay="true"
    :replayable="true"
  />
</template>
