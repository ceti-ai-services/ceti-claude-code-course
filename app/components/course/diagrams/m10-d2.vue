<!--
  m10-d2 — The firing sequence of a PreToolUse hook that blocks rm -rf.
  Pattern: TracedExample. Click a row to see the actual shell the hook
  runs and the exit code the harness reads.
-->
<script setup lang="ts">
import TracedExample from "@/components/course/patterns/TracedExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "A hook firing, step by step",
  caption: "Claude proposes. The hook inspects. Exit 2 means blocked.",
  steps: [
    {
      phase: "propose",
      role: "support" as const,
      action: "Claude decides to run a Bash command",
      artifact: "rm -rf ./build",
    },
    {
      phase: "match",
      role: "primary" as const,
      action: "harness checks matchers on PreToolUse",
      artifact: "matcher: \"Bash\"  →  fires",
    },
    {
      phase: "inspect",
      role: "primary" as const,
      action: "your hook script runs",
      artifactLang: "bash" as const,
      artifact: "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf'; then\n  echo 'blocked: rm -rf'\n  exit 2\nfi",
    },
    {
      phase: "block",
      role: "accent" as const,
      action: "non-zero exit → harness cancels the tool call",
      artifact: "exit 2\n# tool call denied",
    },
    {
      phase: "adjust",
      role: "secondary" as const,
      action: "Claude sees the block and proposes a safer alternative",
      artifact: "# tries targeted delete instead of -rf",
    },
  ],
}

const es = {
  title: "Un hook disparándose, paso a paso",
  caption: "Claude propone. El hook inspecciona. Exit 2 bloquea.",
  steps: [
    {
      phase: "propone",
      role: "support" as const,
      action: "Claude decide ejecutar un comando Bash",
      artifact: "rm -rf ./build",
    },
    {
      phase: "match",
      role: "primary" as const,
      action: "el runtime revisa los matchers de PreToolUse",
      artifact: "matcher: \"Bash\"  →  dispara",
    },
    {
      phase: "inspecciona",
      role: "primary" as const,
      action: "tu script se ejecuta",
      artifactLang: "bash" as const,
      artifact: "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf'; then\n  echo 'bloqueado: rm -rf'\n  exit 2\nfi",
    },
    {
      phase: "bloquea",
      role: "accent" as const,
      action: "salida distinta de cero → el runtime cancela la llamada",
      artifact: "exit 2\n# llamada denegada",
    },
    {
      phase: "ajusta",
      role: "secondary" as const,
      action: "Claude ve el bloqueo y propone una alternativa segura",
      artifact: "# intenta borrado dirigido en vez de -rf",
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
