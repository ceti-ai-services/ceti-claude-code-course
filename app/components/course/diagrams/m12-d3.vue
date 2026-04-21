<!--
  m12-d3 — Git anti-patterns: force-push, --no-verify, amend-pushed, secrets.
  Pattern: FailureTable
  Position: inside "What to never let Claude do", replacing the three
  bullet paragraphs with a scannable row-by-row failure map.
-->
<script setup lang="ts">
import FailureTable from "@/components/course/patterns/FailureTable.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "What to never let Claude do",
  caption: "Four moves that look helpful and are actively dangerous. Reject the approval.",
  rows: [
    {
      wrong: "git push --force",
      trap: "Rewrites history on the remote — teammates lose commits",
      right: "Revert with a new commit",
    },
    {
      wrong: "git commit --no-verify",
      trap: "Bypasses pre-commit hooks that exist for a reason",
      right: "Fix the hook failure",
    },
    {
      wrong: "git commit --amend (after push)",
      trap: "Changes a commit everyone else already pulled",
      right: "Add a follow-up commit",
    },
    {
      wrong: "git add . on a dirty tree",
      trap: "Sweeps in a .env or credentials file by accident",
      right: "Stage files by name",
    },
  ],
}

const es = {
  title: "Lo que nunca le dejes hacer a Claude",
  caption: "Cuatro movidas que parecen útiles y son peligrosas. Rechaza la aprobación.",
  rows: [
    {
      wrong: "git push --force",
      trap: "Reescribe la historia remota — los demás pierden commits",
      right: "Revierte con un nuevo commit",
    },
    {
      wrong: "git commit --no-verify",
      trap: "Se salta hooks de pre-commit que existen por algo",
      right: "Arregla lo que falla en el hook",
    },
    {
      wrong: "git commit --amend (tras push)",
      trap: "Cambia un commit que los demás ya descargaron",
      right: "Agrega un commit de seguimiento",
    },
    {
      wrong: "git add . en un árbol sucio",
      trap: "Se lleva un .env o credenciales por accidente",
      right: "Stagea archivos por nombre",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <FailureTable
    :title="t.title"
    :caption="t.caption"
    :rows="t.rows"
  />
</template>
