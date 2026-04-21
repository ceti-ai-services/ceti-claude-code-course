<!--
  SequentialPulse — 3–5 ordered chips connected by thin lines.
  A traveling dot pulses across connectors; the active chip lifts.

  Pattern ref: PATTERNS.md §1 · shadcn-diagrams.jsx ShadSequentialPulse
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type Step = { title: string; subtitle?: string; role: Role }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    steps: Step[]
    autoCycle?: boolean
    cycleMs?: number
  }>(),
  { autoCycle: true, cycleMs: 1100, caption: "" },
)

const activeIdx = ref(0)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const clampedSteps = computed(() => props.steps.slice(0, 5))
const count = computed(() => clampedSteps.value.length)

function pin(i: number) {
  activeIdx.value = i
  if (timer) { clearInterval(timer); timer = null }
}

function startCycle() {
  if (!props.autoCycle || reducedMotion.value || count.value < 2) return
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % count.value
  }, props.cycleMs)
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
    <ol class="sp-track" :style="{ '--count': count }">
      <template v-for="(step, i) in clampedSteps" :key="step.title + i">
        <li class="sp-item">
          <Chip
            :role="step.role"
            :active="activeIdx === i"
            clickable
            class="sp-chip"
            @click="pin(i)"
          >
            <span class="sp-chip-inner">
              <span class="sp-chip-title">{{ step.title }}</span>
              <span v-if="step.subtitle" class="sp-chip-sub">{{ step.subtitle }}</span>
            </span>
          </Chip>
        </li>
        <li v-if="i < count - 1" class="sp-connector" aria-hidden="true">
          <span class="sp-rail" />
          <span
            class="sp-dot"
            :class="{ 'sp-dot--live': activeIdx === i && !reducedMotion }"
          />
        </li>
      </template>
    </ol>
  </DiagramShell>
</template>

<style scoped>
.sp-track {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
  gap: 6px;
  width: 100%;
}
.sp-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
}
.sp-chip {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.sp-chip-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.15;
}
.sp-chip-title {
  font-size: 12px;
  font-weight: 700;
}
.sp-chip-sub {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.78;
}
.sp-connector {
  position: relative;
  flex: 0 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sp-rail {
  display: block;
  width: 100%;
  height: 2px;
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 2px;
}
.sp-dot {
  position: absolute;
  top: 50%;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: hsl(var(--accent-edge));
  box-shadow: 0 0 0 2px hsl(var(--background));
  transform: translate(-4px, -50%);
  opacity: 0;
  transition: opacity 0.2s var(--ease-out-spring);
}
.sp-dot--live {
  opacity: 1;
  animation: sp-travel 1s var(--ease-out-spring) forwards;
}
@keyframes sp-travel {
  0%   { left: 0%;  opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .sp-dot--live { animation: none; opacity: 0; }
}
</style>
