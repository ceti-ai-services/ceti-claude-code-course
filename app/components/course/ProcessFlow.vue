<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-vue-next"

interface Step {
  label: string // "Read-only"
  body: string // short operator description
  aside?: string // optional code/terminal snippet
}

interface Props {
  steps: Step[]
  title?: string // "The shape of every real task"
  auto?: boolean // cycle highlight automatically
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  auto: true,
})

const active = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const prefersReduced = computed(() => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
})

onMounted(() => {
  if (!props.auto || prefersReduced.value) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % props.steps.length
  }, 2600)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function select(i: number) {
  active.value = i
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
</script>

<template>
  <Card :class="cn('my-8 border-border-strong bg-card', props.class)">
    <CardContent class="px-5 py-6 md:px-7 md:py-8">
      <div
        v-if="props.title"
        class="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-5"
      >
        <span>Process</span>
        <span class="h-px flex-1 bg-border" />
        <span class="text-muted-foreground font-normal tracking-normal normal-case">
          {{ props.title }}
        </span>
      </div>

      <!-- Step timeline -->
      <ol class="flow-grid">
        <li
          v-for="(step, i) in props.steps"
          :key="step.label"
          :class="[
            'flow-step',
            active === i && 'flow-step--active',
            active > i && 'flow-step--past',
          ]"
          @mouseenter="select(i)"
          @focusin="select(i)"
          tabindex="0"
        >
          <div class="flow-node">
            <span class="flow-num">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="flow-text">
            <div class="flow-label">{{ step.label }}</div>
            <div class="flow-body">{{ step.body }}</div>
            <pre v-if="step.aside" class="flow-aside">{{ step.aside }}</pre>
          </div>
          <ArrowRight
            v-if="i < props.steps.length - 1"
            class="flow-arrow"
            aria-hidden="true"
          />
        </li>
      </ol>
    </CardContent>
  </Card>
</template>

<style scoped>
.flow-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

@media (min-width: 760px) {
  .flow-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0;
  }
}

.flow-step {
  position: relative;
  display: flex;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
  cursor: pointer;
  transition:
    border-color 320ms var(--ease-out-spring),
    background-color 320ms var(--ease-out-spring),
    transform 320ms var(--ease-out-spring);
}

.flow-step:focus-visible {
  outline: none;
  border-color: var(--color-gold);
}

@media (min-width: 760px) {
  .flow-step {
    flex-direction: column;
    gap: 8px;
    border-radius: 0;
    border-right: none;
  }
  .flow-step:first-child {
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .flow-step:last-child {
    border-right: 1px solid var(--color-border);
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
}

.flow-step--past {
  border-color: var(--color-gold-dim);
  background: rgba(212, 168, 75, 0.04);
}

.flow-step--active {
  border-color: var(--color-gold);
  background: rgba(212, 168, 75, 0.08);
  transform: translateY(-1px);
}

.flow-node {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-muted);
  flex-shrink: 0;
  transition:
    border-color 320ms var(--ease-out-spring),
    color 320ms var(--ease-out-spring),
    box-shadow 320ms var(--ease-out-spring);
}

.flow-step--past .flow-node,
.flow-step--active .flow-node {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.flow-step--active .flow-node {
  box-shadow: 0 0 0 3px var(--color-gold-dim);
}

.flow-num {
  letter-spacing: 0.06em;
}

.flow-text {
  min-width: 0;
}

.flow-label {
  font-weight: 700;
  font-size: 14px;
  color: var(--color-text);
  letter-spacing: -0.005em;
}

.flow-body {
  color: var(--color-muted);
  font-size: 13px;
  margin-top: 4px;
  line-height: 1.5;
}

.flow-aside {
  margin-top: 8px;
  background: var(--color-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 8px 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-muted);
  overflow-x: auto;
}

.flow-arrow {
  display: none;
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-border-strong);
  background: var(--color-bg);
  padding: 1px;
  z-index: 1;
  transition: color 320ms var(--ease-out-spring);
}

@media (min-width: 760px) {
  .flow-arrow {
    display: block;
  }
}

.flow-step--past .flow-arrow,
.flow-step--active .flow-arrow {
  color: var(--color-gold);
}
</style>
