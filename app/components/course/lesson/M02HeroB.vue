<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import ProcessFlow from "@/components/course/ProcessFlow.vue"
import ConceptCard from "@/components/course/ConceptCard.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M02 · INSTALL",
  title: "Install Claude Code",
  analogy: "Different launch pads. Same install command.",
  chips: [
    { label: "Node 18+" },
    { label: "One npm command" },
    { label: "Pick your OS" },
  ],
  time: "14 min",
  flowTitle: "The four-step install",
  steps: [
    {
      label: "Check Node",
      body: "Run `node --version` in any terminal. You need v18 or newer. If missing, grab it from nodejs.org — LTS build, accept defaults.",
      aside: "node --version",
    },
    {
      label: "Install",
      body: "One npm command, runs everywhere. Two minutes on a typical broadband connection.",
      aside: "npm install -g @anthropic-ai/claude-code",
    },
    {
      label: "Launch",
      body: "Type `claude` in any terminal window, press enter. First launch opens your browser to authenticate.",
      aside: "claude",
    },
    {
      label: "Sign in",
      body: "Use your Claude.ai login (Pro or Max) or an Anthropic API key. Either works. Browser authentication opens automatically.",
      aside: "(sign in with Claude.ai or API key)",
    },
  ],
  prereqEyebrow: "Before you start",
  prereqs: [
    {
      number: "A",
      label: "A terminal",
      body: "Mac: Spotlight → Terminal. Windows: PowerShell or WSL. Linux: you already know.",
    },
    {
      number: "B",
      label: "Node.js 18+",
      body: "Check: `node --version`. If missing or old, download the LTS build from nodejs.org.",
    },
    {
      number: "C",
      label: "A sign-in method",
      body: "Claude.ai Pro/Max subscription (easiest) or an Anthropic API key from console.anthropic.com.",
    },
  ],
}

const es = {
  codename: "M02 · INSTALACIÓN",
  title: "Instalar Claude Code",
  analogy: "Distintas plataformas. Mismo comando de instalación.",
  chips: [
    { label: "Node 18+" },
    { label: "Un comando npm" },
    { label: "Elige tu sistema" },
  ],
  time: "14 min",
  flowTitle: "Los cuatro pasos de instalación",
  steps: [
    {
      label: "Verificar Node",
      body: "Ejecuta `node --version` en cualquier terminal. Necesitas v18 o más reciente. Si falta, descárgalo de nodejs.org — versión LTS, acepta los valores predeterminados.",
      aside: "node --version",
    },
    {
      label: "Instalar",
      body: "Un comando npm, funciona en todos lados. Dos minutos con buena conexión.",
      aside: "npm install -g @anthropic-ai/claude-code",
    },
    {
      label: "Lanzar",
      body: "Escribe `claude` en cualquier terminal, presiona enter. El primer lanzamiento abre tu navegador para autenticarte.",
      aside: "claude",
    },
    {
      label: "Iniciar sesión",
      body: "Usa tu cuenta de Claude.ai (Pro o Max) o una clave de API de Anthropic. Cualquiera funciona. La autenticación se abre automáticamente.",
      aside: "(inicia sesión con Claude.ai o clave de API)",
    },
  ],
  prereqEyebrow: "Antes de empezar",
  prereqs: [
    {
      number: "A",
      label: "Una terminal",
      body: "Mac: Spotlight → Terminal. Windows: PowerShell o WSL. Linux: ya sabes.",
    },
    {
      number: "B",
      label: "Node.js 18+",
      body: "Verifica: `node --version`. Si falta o está desactualizado, descarga la versión LTS de nodejs.org.",
    },
    {
      number: "C",
      label: "Método de inicio de sesión",
      body: "Suscripción Claude.ai Pro/Max (más fácil) o una clave API de Anthropic en console.anthropic.com.",
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
  <ConceptCard
    :eyebrow="t.prereqEyebrow"
    :items="t.prereqs"
  />
  <ProcessFlow
    :title="t.flowTitle"
    :steps="t.steps"
    :auto="true"
  />
</template>
