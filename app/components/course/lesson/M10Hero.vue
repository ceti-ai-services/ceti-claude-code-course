<!--
  M10Hero — "A hook is a small script that runs at a moment you choose."

  Composition: MissionBrief + PhaseTabs. Three tabs — PreToolUse,
  PostToolUse, Stop — each exposing (when fires / typical use / example).

  Plan ref: docs/MODULE-VISUAL-PLAN.md §10
-->
<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import PhaseTabs from "@/components/course/patterns/PhaseTabs.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M10 · HOOKS",
  title: "Hooks — safety gates and pre/post-tool-use automation.",
  analogy: "A hook is a small script that runs at a moment you choose.",
  chips: [
    { label: "Registered in settings.json" },
    { label: "Three lifecycle events" },
    { label: "Unconditional by design" },
  ],
  time: "14 min",
  tabsTitle: "Three moments, three hooks",
  tabsCaption: "Click a tab to see when each event fires and what it's good for.",
  tabs: [
    {
      title: "PreToolUse",
      role: "primary" as const,
      facets: [
        { label: "When fires", value: "Before Claude runs any tool — Bash, Edit, Write, Read." },
        { label: "Typical use", value: "Block dangerous commands. Confirm a destructive write. Redact secrets from tool input." },
        { label: "Example", value: "grep for 'rm -rf' in the Bash input · exit 2 to block the call." },
      ],
    },
    {
      title: "PostToolUse",
      role: "secondary" as const,
      facets: [
        { label: "When fires", value: "After a tool ran successfully and produced an output." },
        { label: "Typical use", value: "Auto-format files after a write. Log what changed. Notify another system." },
        { label: "Example", value: "Run prettier on every file Claude just edited — no approval needed." },
      ],
    },
    {
      title: "Stop",
      role: "accent" as const,
      facets: [
        { label: "When fires", value: "When the session ends or Claude stops generating." },
        { label: "Typical use", value: "Summaries. Cleanup. Send yourself a recap of what just happened." },
        { label: "Example", value: "echo a one-line session-ended stamp to the terminal — good first hook." },
      ],
    },
  ],
}

const es = {
  codename: "M10 · HOOKS",
  title: "Hooks — puertas de seguridad y automatización antes y después de cada herramienta.",
  analogy: "Un hook es un script pequeño que corre en un momento que tú eliges.",
  chips: [
    { label: "Se registran en settings.json" },
    { label: "Tres eventos de ciclo de vida" },
    { label: "Incondicionales por diseño" },
  ],
  time: "14 min",
  tabsTitle: "Tres momentos, tres hooks",
  tabsCaption: "Clic en una pestaña para ver cuándo dispara cada evento y para qué sirve.",
  tabs: [
    {
      title: "PreToolUse",
      role: "primary" as const,
      facets: [
        { label: "Cuándo dispara", value: "Antes de que Claude use cualquier herramienta — Bash, Edit, Write, Read." },
        { label: "Uso típico", value: "Bloquear comandos peligrosos. Confirmar una escritura destructiva. Ocultar secretos." },
        { label: "Ejemplo", value: "Busca 'rm -rf' en el input del Bash · salir con 2 bloquea la llamada." },
      ],
    },
    {
      title: "PostToolUse",
      role: "secondary" as const,
      facets: [
        { label: "Cuándo dispara", value: "Después de que una herramienta corrió con éxito y produjo una salida." },
        { label: "Uso típico", value: "Auto-formatear archivos tras una escritura. Registrar lo que cambió. Notificar a otro sistema." },
        { label: "Ejemplo", value: "Corre prettier en cada archivo que Claude acaba de editar — sin aprobar nada." },
      ],
    },
    {
      title: "Stop",
      role: "accent" as const,
      facets: [
        { label: "Cuándo dispara", value: "Cuando la sesión termina o Claude deja de generar." },
        { label: "Uso típico", value: "Resúmenes. Limpieza. Mándate un recap de lo que pasó." },
        { label: "Ejemplo", value: "Imprime una línea de fin de sesión en la terminal — buen primer hook." },
      ],
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
  <PhaseTabs
    :title="t.tabsTitle"
    :caption="t.tabsCaption"
    :tabs="t.tabs"
  />
</template>
