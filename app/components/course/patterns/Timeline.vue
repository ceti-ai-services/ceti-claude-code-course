<!--
  Timeline — N equal-width step cards with numbered circles and arrows.
  Auto-cycling highlight moves through; hover pins a step.

  Pattern ref: PATTERNS.md §13 · max 6 steps.
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type TimelineStep = { label: string; description: string; role: Role }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    steps: TimelineStep[]
    autoCycleMs?: number
  }>(),
  { caption: "", autoCycleMs: 1600 },
)

const clampedSteps = computed(() => props.steps.slice(0, 6))
const count = computed(() => clampedSteps.value.length)

const activeIdx = ref(0)
const hoverIdx = ref<number | null>(null)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const effectiveIdx = computed(() =>
  hoverIdx.value !== null ? hoverIdx.value : activeIdx.value,
)

function startCycle() {
  if (reducedMotion.value || count.value < 2) return
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % count.value
  }, props.autoCycleMs)
}

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  startCycle()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <DiagramShell :title="title" :caption="caption">
    <ol class="tl-track" :style="{ '--count': count }">
      <template v-for="(step, i) in clampedSteps" :key="step.label + i">
        <li
          class="tl-item"
          :class="{ 'tl-item--active': effectiveIdx === i }"
          @mouseenter="hoverIdx = i"
          @mouseleave="hoverIdx = null"
          @focusin="hoverIdx = i"
          @focusout="hoverIdx = null"
        >
          <div class="tl-num" :class="`tl-num--${step.role}`">{{ i + 1 }}</div>
          <Chip :role="step.role" :active="effectiveIdx === i" class="tl-chip">
            <span class="tl-chip-inner">
              <span class="tl-chip-label">{{ step.label }}</span>
              <span class="tl-chip-desc">{{ step.description }}</span>
            </span>
          </Chip>
        </li>
        <li v-if="i < count - 1" class="tl-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 12" width="24" height="12">
            <path
              d="M 0 6 L 20 6 M 14 1 L 20 6 L 14 11"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>
      </template>
    </ol>
  </DiagramShell>
</template>

<style scoped>
.tl-track {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
  gap: 6px;
  width: 100%;
}
.tl-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 4px 2px 6px;
  border-radius: 10px;
  transition: transform 0.28s var(--ease-out-spring);
}
.tl-item--active {
  transform: translateY(-2px);
}
.tl-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  background: hsl(var(--card));
  border: 1.5px solid hsl(var(--border));
  color: hsl(var(--foreground));
  transition: border-color 0.22s var(--ease-out-spring), color 0.22s var(--ease-out-spring);
}
.tl-item--active .tl-num--primary   { border-color: hsl(var(--primary-edge) / 0.8);   color: hsl(var(--primary-edge)); }
.tl-item--active .tl-num--secondary { border-color: hsl(var(--secondary-edge) / 0.8); color: hsl(var(--secondary-edge)); }
.tl-item--active .tl-num--accent    { border-color: hsl(var(--accent-edge) / 0.8);    color: hsl(var(--accent-edge)); }
.tl-item--active .tl-num--support   { border-color: hsl(var(--support-edge) / 0.8);   color: hsl(var(--support-edge)); }

.tl-chip {
  width: 100%;
  white-space: normal;
  padding: 8px 10px;
}
.tl-chip-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.2;
  text-align: center;
}
.tl-chip-label {
  font-size: 12px;
  font-weight: 700;
}
.tl-chip-desc {
  font-size: 10.5px;
  font-weight: 400;
  opacity: 0.78;
}
.tl-arrow {
  flex: 0 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground) / 0.55);
  padding-top: 20px;
}
@media (prefers-reduced-motion: reduce) {
  .tl-item, .tl-item--active { transition: none; transform: none; }
}
</style>
