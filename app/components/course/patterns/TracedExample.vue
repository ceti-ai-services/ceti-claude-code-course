<!--
  TracedExample — vertical ordered list of procedure steps.
  Each step: phase badge (role-colored chip), action description,
  click-to-reveal artifact rendered in mono font.

  Pattern ref: PATTERNS.md §7 · patterns-extended-rb.jsx PTracedExample
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type TracedStep = {
  phase: string
  role: Role
  action: string
  artifact?: string
  artifactLang?: "bash" | "markdown" | "text"
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    steps: TracedStep[]
  }>(),
  { caption: "" },
)

const openIdx = ref<number>(-1)
const clampedSteps = computed(() => props.steps.slice(0, 7))

function toggle(i: number) {
  openIdx.value = openIdx.value === i ? -1 : i
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="240">
    <ol class="te-list">
      <li
        v-for="(step, i) in clampedSteps"
        :key="step.phase + i"
        class="te-item"
        :class="{ 'te-item--open': openIdx === i }"
      >
        <button
          type="button"
          class="te-row"
          :aria-expanded="openIdx === i"
          :aria-controls="`te-artifact-${i}`"
          @click="toggle(i)"
        >
          <Chip :role="step.role" size="xs" class="te-badge">
            {{ step.phase.toUpperCase() }}
          </Chip>
          <span class="te-body">
            <span class="te-num">{{ i + 1 }}.</span>
            <span class="te-action">{{ step.action }}</span>
          </span>
          <span v-if="step.artifact" class="te-caret" aria-hidden="true">
            {{ openIdx === i ? "−" : "+" }}
          </span>
        </button>
        <div
          v-if="step.artifact && openIdx === i"
          :id="`te-artifact-${i}`"
          class="te-artifact"
          :data-lang="step.artifactLang || 'text'"
        >
          <pre class="te-pre"><code>{{ step.artifact }}</code></pre>
        </div>
      </li>
    </ol>
  </DiagramShell>
</template>

<style scoped>
.te-list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.te-item {
  border-radius: 8px;
  transition: background-color 0.2s var(--ease-out-spring);
}
.te-item--open {
  background: hsl(var(--muted) / 0.35);
}
.te-row {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
}
.te-row:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.te-badge {
  flex-shrink: 0;
  margin-top: 2px;
  min-width: 52px;
  letter-spacing: 0.08em;
}
.te-body {
  flex: 1;
  display: flex;
  gap: 6px;
  align-items: baseline;
  line-height: 1.45;
}
.te-num {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: hsl(var(--muted-foreground));
  font-weight: 600;
}
.te-action {
  font-size: 12.5px;
  color: hsl(var(--foreground));
  font-weight: 500;
}
.te-caret {
  font-family: var(--font-mono);
  font-size: 14px;
  color: hsl(var(--muted-foreground));
  flex-shrink: 0;
  padding: 0 4px;
}
.te-artifact {
  padding: 0 12px 10px 74px;
  animation: slide-in 0.2s var(--ease-out-spring);
}
.te-pre {
  margin: 0;
  padding: 8px 10px;
  background: hsl(var(--muted) / 0.5);
  border-left: 2px solid hsl(var(--accent-edge) / 0.55);
  border-radius: 0 6px 6px 0;
  font-family: var(--font-mono);
  font-size: 10.5px;
  line-height: 1.55;
  color: hsl(var(--foreground));
  white-space: pre-wrap;
  word-break: break-word;
}
@media (max-width: 640px) {
  .te-artifact { padding-left: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .te-artifact { animation: none; }
}
</style>
