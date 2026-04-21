<!--
  m02-d2 — Mac / Windows / Linux as three parallel installs
  Pattern: PhaseTabs
  Position: opening the three OS sections. Replaces the repeated
  "check Node, install Node, run the install command" scaffolding
  across three headings with a single interactive panel.
-->
<script setup lang="ts">
import PhaseTabs from "@/components/course/patterns/PhaseTabs.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "Same install, three terminals",
  caption: "Pick your OS. The shape is identical — the shell and the escape hatch differ.",
  tabs: [
    {
      title: "Mac",
      role: "primary" as const,
      facets: [
        { label: "Open", value: "Spotlight (⌘+Space) → Terminal" },
        { label: "Check", value: "node --version (need v18+)" },
        { label: "Install Node", value: "nodejs.org → LTS installer" },
        { label: "Install Claude", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "If it fails", value: "sudo npm install -g ... (enter Mac password)" },
      ],
    },
    {
      title: "Windows",
      role: "secondary" as const,
      facets: [
        { label: "Open", value: "Start → PowerShell (not Command Prompt)" },
        { label: "Check", value: "node --version" },
        { label: "Install Node", value: "nodejs.org → LTS Windows installer" },
        { label: "Install Claude", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "Escape hatch", value: "wsl --install (run PowerShell as admin)" },
      ],
    },
    {
      title: "Linux",
      role: "accent" as const,
      facets: [
        { label: "Open", value: "Your terminal (you know where it is)" },
        { label: "Check", value: "node --version" },
        { label: "Install Node", value: "apt / dnf / pacman — whichever you use" },
        { label: "Install Claude", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "If it fails", value: "Prefix with sudo" },
      ],
    },
  ],
}

const es = {
  title: "Misma instalación, tres terminales",
  caption: "Elige tu sistema. La forma es idéntica — cambian la shell y la salida de emergencia.",
  tabs: [
    {
      title: "Mac",
      role: "primary" as const,
      facets: [
        { label: "Abrir", value: "Spotlight (⌘+Espacio) → Terminal" },
        { label: "Revisar", value: "node --version (necesitas v18+)" },
        { label: "Instalar Node", value: "nodejs.org → instalador LTS" },
        { label: "Instalar Claude", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "Si falla", value: "sudo npm install -g ... (mete tu contraseña de Mac)" },
      ],
    },
    {
      title: "Windows",
      role: "secondary" as const,
      facets: [
        { label: "Abrir", value: "Inicio → PowerShell (no Command Prompt)" },
        { label: "Revisar", value: "node --version" },
        { label: "Instalar Node", value: "nodejs.org → instalador LTS de Windows" },
        { label: "Instalar Claude", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "Salida de emergencia", value: "wsl --install (PowerShell como admin)" },
      ],
    },
    {
      title: "Linux",
      role: "accent" as const,
      facets: [
        { label: "Abrir", value: "Tu terminal (ya sabes dónde está)" },
        { label: "Revisar", value: "node --version" },
        { label: "Instalar Node", value: "apt / dnf / pacman — el que uses" },
        { label: "Instalar Claude", value: "npm install -g @anthropic-ai/claude-code" },
        { label: "Si falla", value: "Antepón sudo" },
      ],
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <PhaseTabs :title="t.title" :caption="t.caption" :tabs="t.tabs" />
</template>
