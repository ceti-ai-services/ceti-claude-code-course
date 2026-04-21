<!--
  M12Hero — "Git integration — commits, branches, PRs through Claude"

  Composition: MissionBrief (transmission-style header) + Timeline
  (five equal git steps: Branch → Edit → Stage → Commit → Review PR).

  Plan ref: docs/MODULE-VISUAL-PLAN.md §12
-->
<script setup lang="ts">
import MissionBrief from "@/components/course/MissionBrief.vue"
import Timeline from "@/components/course/patterns/Timeline.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  codename: "M12 · GIT INTEGRATION",
  title: "Git integration — commits, branches, PRs through Claude.",
  analogy: "Claude can branch, edit, stage, commit, PR — you still approve the push.",
  chips: [
    { label: "Read the diff before you stage" },
    { label: "Honest commit messages" },
    { label: "Draft PR, not direct push" },
  ],
  time: "12 min",
  flowTitle: "One change, five approvals",
  flowCaption: "Hover a step to pin it. Each step is a tool call you can read before you OK.",
  steps: [
    {
      label: "Branch",
      description: "git checkout -b claude/rename-exports",
      role: "primary" as const,
    },
    {
      label: "Edit",
      description: "Claude proposes each change, you approve",
      role: "secondary" as const,
    },
    {
      label: "Stage",
      description: "Claude lists the diff, you confirm it's honest",
      role: "accent" as const,
    },
    {
      label: "Commit",
      description: "Claude writes the message — verify it tells the truth",
      role: "primary" as const,
    },
    {
      label: "Review PR",
      description: "push, open draft PR, read it on your phone",
      role: "support" as const,
    },
  ],
}

const es = {
  codename: "M12 · INTEGRACIÓN CON GIT",
  title: "Git con Claude — ramas, commits y PRs.",
  analogy: "Claude puede ramificar, editar, preparar, commitear, abrir PR — tú sigues aprobando el push.",
  chips: [
    { label: "Lee el diff antes de preparar" },
    { label: "Mensajes de commit honestos" },
    { label: "PR en borrador, no push directo" },
  ],
  time: "12 min",
  flowTitle: "Un cambio, cinco aprobaciones",
  flowCaption: "Pasa el cursor sobre un paso para fijarlo. Cada paso es una tool call que puedes leer antes de dar OK.",
  steps: [
    {
      label: "Rama",
      description: "git checkout -b claude/rename-exports",
      role: "primary" as const,
    },
    {
      label: "Editar",
      description: "Claude propone cada cambio, tú apruebas",
      role: "secondary" as const,
    },
    {
      label: "Preparar",
      description: "Claude lista el diff, tú confirmas que es honesto",
      role: "accent" as const,
    },
    {
      label: "Commit",
      description: "Claude escribe el mensaje — verifica que diga la verdad",
      role: "primary" as const,
    },
    {
      label: "Revisar PR",
      description: "push, abre PR en borrador, léelo desde el celular",
      role: "support" as const,
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
  <Timeline
    :title="t.flowTitle"
    :caption="t.flowCaption"
    :steps="t.steps"
  />
</template>
