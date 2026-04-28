<!--
  FitTree — branching fit-check decision.
  Root question → N branches with labels. Selected branch's chips
  light up; unselected dim. Auto-cycles between branches (1600ms)
  unless prefers-reduced-motion.

  Pattern ref: PATTERNS.md §10 · shadcn-diagrams.jsx ShadFitTree
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type BranchChip = { label: string; role: Role }
type Branch = {
  label: string
  chips: BranchChip[]
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    question: string
    branches: Branch[]
    autoCycleMs?: number
  }>(),
  { caption: "", autoCycleMs: 1600 },
)

const clampedBranches = computed(() => props.branches.slice(0, 3))
const count = computed(() => clampedBranches.value.length)

const activeIdx = ref(0)
const pinned = ref(false)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function pin(i: number) {
  activeIdx.value = i
  pinned.value = true
  if (timer) { clearInterval(timer); timer = null }
}

function startCycle() {
  if (pinned.value || reducedMotion.value || count.value < 2) return
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
  <DiagramShell :title="title" :caption="caption" :min-body-height="300">
    <div class="ft-wrap" :style="{ '--branches': count }">
      <div class="ft-root">
        <div class="ft-root-card">{{ question }}</div>
      </div>
      <div class="ft-labels">
        <div
          v-for="(b, i) in clampedBranches"
          :key="b.label + i"
          class="ft-label"
          :class="{ 'ft-label--active': activeIdx === i }"
        >
          {{ b.label.toUpperCase() }}
        </div>
      </div>
      <svg
        class="ft-lines"
        viewBox="0 0 200 30"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          v-for="(_, i) in clampedBranches"
          :key="i"
          x1="100"
          y1="0"
          :x2="100 + ((i + 0.5) / count - 0.5) * 180"
          y2="28"
          :stroke="activeIdx === i ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.4)'"
          :stroke-width="activeIdx === i ? 2 : 1"
          fill="none"
        />
      </svg>
      <div class="ft-branches">
        <button
          v-for="(b, i) in clampedBranches"
          :key="b.label + 'col' + i"
          type="button"
          class="ft-branch"
          :aria-pressed="activeIdx === i"
          @click="pin(i)"
        >
          <Chip
            v-for="(chip, j) in b.chips"
            :key="chip.label + j"
            :role="chip.role"
            :dim="activeIdx !== i"
            size="sm"
            class="ft-chip"
          >
            {{ chip.label }}
          </Chip>
        </button>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.ft-wrap {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ft-root {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
.ft-root-card {
  padding: 7px 14px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 600;
  color: hsl(var(--foreground));
  text-align: center;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
}
.ft-labels {
  display: grid;
  grid-template-columns: repeat(var(--branches), 1fr);
  gap: 8px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
}
.ft-label--active {
  color: hsl(var(--foreground));
}
.ft-lines {
  width: 100%;
  height: 26px;
  margin: -2px 0;
}
.ft-branches {
  display: grid;
  grid-template-columns: repeat(var(--branches), 1fr);
  gap: 12px;
}
.ft-branch {
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border-radius: 8px;
}
.ft-branch:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.ft-chip { width: fit-content; }

/* Mobile: collapse the branching tree to a vertical stack.
   Hide the SVG fan-lines (decorative). Keep the label row as a compact
   3-column header (labels are short — "FIT" / "MAYBE" / "SKIP"). Each
   branch's chips become a vertically stacked column below — so the user
   reads "labels above" → "matched chip columns below". */
@media (max-width: 640px) {
  .ft-wrap {
    max-width: 100%;
    gap: 8px;
  }
  .ft-lines { display: none; }
  .ft-labels {
    font-size: 9px;
    gap: 4px;
  }
  .ft-branches {
    gap: 8px;
  }
  .ft-branch {
    align-items: center;
    padding: 8px 6px;
    gap: 6px;
  }
  .ft-chip { width: fit-content; }
}
</style>
