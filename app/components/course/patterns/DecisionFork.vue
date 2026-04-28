<!--
  DecisionFork — a judgment-call pattern. Question → N role-colored
  buttons. Pick one → that button lifts, others dim, consequence
  appears below. Reset clears.

  Pattern ref: PATTERNS.md §9 · patterns-extended-rb.jsx PDecisionFork
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type Choice = {
  label: string
  role: Role
  consequence: string
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    question: string
    choices: Choice[]
  }>(),
  { caption: "" },
)

const clampedChoices = computed(() => props.choices.slice(0, 4))
const picked = ref<number | null>(null)

function pick(i: number) { picked.value = i }
function reset() { picked.value = null }
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="240">
    <div class="df-wrap">
      <p class="df-question">{{ question }}</p>
      <div class="df-row" role="group" aria-label="Choices">
        <Chip
          v-for="(c, i) in clampedChoices"
          :key="c.label + i"
          :role="c.role"
          size="md"
          clickable
          :active="picked === i"
          :dim="picked !== null && picked !== i"
          class="df-choice"
          :aria-pressed="picked === i"
          @click="pick(i)"
        >
          {{ c.label }}
        </Chip>
      </div>
      <div v-if="picked !== null" class="df-reveal">
        <span class="df-arrow" aria-hidden="true">→</span>
        <span class="df-consequence">{{ clampedChoices[picked]?.consequence }}</span>
        <button type="button" class="df-reset" @click="reset">reset</button>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.df-wrap {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.df-question {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: hsl(var(--foreground));
  text-align: center;
  line-height: 1.45;
  max-width: 420px;
}
.df-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.df-choice {
  min-width: 110px;
}
.df-reveal {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 420px;
  padding: 10px 14px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 10px;
  animation: slide-in 0.3s var(--ease-out-spring);
}
.df-arrow {
  font-family: var(--font-mono);
  color: hsl(var(--accent-edge));
  font-weight: 700;
  flex-shrink: 0;
}
.df-consequence {
  font-size: 11.5px;
  font-style: italic;
  color: hsl(var(--foreground));
  line-height: 1.5;
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}
.df-reset {
  all: unset;
  cursor: pointer;
  font-size: 10.5px;
  font-family: var(--font-mono);
  color: hsl(var(--muted-foreground));
  text-decoration: underline;
  flex-shrink: 0;
}
.df-reset:hover { color: hsl(var(--foreground)); }
.df-reset:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
  border-radius: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .df-reveal { animation: none; }
}

/* Mobile: stack choices vertically (full-width tap targets), and let the
   reveal panel wrap with its arrow becoming a top-pointing chevron. */
@media (max-width: 640px) {
  .df-row {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    width: 100%;
  }
  .df-choice {
    min-width: 0;
    width: 100%;
  }
  .df-reveal {
    flex-wrap: wrap;
    padding: 10px 12px;
  }
  .df-arrow {
    transform: rotate(90deg);
    align-self: flex-start;
  }
  .df-consequence {
    flex: 1 1 100%;
    order: 2;
  }
  .df-reset {
    order: 3;
    margin-left: auto;
  }
}
</style>
