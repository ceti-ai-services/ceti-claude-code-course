<!--
  TerminalReplay — mac-style terminal chrome with traffic-light dots
  in role colors; typed prompt + response lines in semantic colors.
  Auto-replays on loop. Emits approve/deny events at optional
  approval step.

  Pattern ref: PATTERNS.md §12 · shadcn-diagrams.jsx ShadTerminal
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type TermLine = {
  prompt?: boolean
  role?: Role
  text: string
  /** show only after this step index (0-indexed) */
  step?: number
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    dir?: string
    lines: TermLine[]
    /** approval interactive step shows after this index */
    approvalAt?: number
  }>(),
  { caption: "", dir: "~/project · claude" },
)

const emit = defineEmits<{
  (e: "approve"): void
  (e: "deny"): void
}>()

const clampedLines = computed(() => props.lines.slice(0, 12))

// Determine how many "reveal" steps the replay has
const maxStep = computed(() => {
  let m = 0
  for (const l of clampedLines.value) {
    if (typeof l.step === "number" && l.step > m) m = l.step
  }
  if (typeof props.approvalAt === "number" && props.approvalAt > m) m = props.approvalAt
  return m
})

const phase = ref(0)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function advance() {
  const total = maxStep.value + 2 // include approval window + reset
  phase.value = (phase.value + 1) % total
}

function schedule() {
  if (reducedMotion.value) { phase.value = maxStep.value; return }
  if (timer) clearTimeout(timer)
  const atApproval =
    typeof props.approvalAt === "number" && phase.value === props.approvalAt
  const delay = atApproval ? 2400 : phase.value === 0 ? 1200 : 1800
  timer = setTimeout(() => {
    advance()
    schedule()
  }, delay)
}

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  schedule()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

function visible(line: TermLine) {
  const s = line.step ?? 0
  return phase.value >= s
}

function showApproval() {
  return typeof props.approvalAt === "number" && phase.value === props.approvalAt
}

function onApprove() {
  emit("approve")
  advance()
}
function onDeny() {
  emit("deny")
  advance()
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="260">
    <div class="tr-frame">
      <div class="tr-chrome">
        <span class="tr-dot tr-dot--accent" aria-hidden="true" />
        <span class="tr-dot tr-dot--primary" aria-hidden="true" />
        <span class="tr-dot tr-dot--secondary" aria-hidden="true" />
        <span class="tr-dir">{{ dir }}</span>
      </div>
      <div class="tr-body">
        <div
          v-for="(line, i) in clampedLines"
          v-show="visible(line)"
          :key="i"
          class="tr-line"
          :class="line.role && `tr-line--${line.role}`"
        >
          <span v-if="line.prompt" class="tr-caret">›</span>
          <span class="tr-text">{{ line.text }}</span>
        </div>
        <div v-if="showApproval()" class="tr-approval">
          <button type="button" class="tr-btn tr-btn--approve" @click="onApprove">
            [y] approve
          </button>
          <button type="button" class="tr-btn tr-btn--deny" @click="onDeny">
            [n] deny
          </button>
          <span class="tr-cursor" aria-hidden="true">▌</span>
        </div>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.tr-frame {
  width: 100%;
  max-width: 520px;
  border-radius: 10px;
  overflow: hidden;
  background: hsl(var(--foreground));
  color: hsl(var(--background));
  box-shadow: 0 8px 22px hsl(var(--foreground) / 0.18);
  font-family: var(--font-mono);
}
:global(body.dark) .tr-frame {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  box-shadow: 0 0 0 1px hsl(var(--border)), 0 8px 22px rgba(0, 0, 0, 0.45);
}
.tr-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: hsl(var(--foreground) / 0.15);
  border-bottom: 1px solid hsl(var(--border) / 0.3);
}
:global(body.dark) .tr-chrome {
  background: hsl(var(--card));
}
.tr-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
}
.tr-dot--primary   { background: hsl(var(--primary-edge)); }
.tr-dot--secondary { background: hsl(var(--secondary-edge)); }
.tr-dot--accent    { background: hsl(var(--accent-edge)); }
.tr-dir {
  flex: 1;
  text-align: center;
  font-size: 10.5px;
  color: hsl(var(--background) / 0.6);
}
:global(body.dark) .tr-dir { color: hsl(var(--muted-foreground)); }
.tr-body {
  padding: 12px 14px;
  font-size: 11px;
  line-height: 1.55;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tr-line {
  animation: slide-in 0.3s var(--ease-out-spring);
  display: flex;
  gap: 6px;
  align-items: baseline;
}
.tr-caret {
  color: hsl(var(--secondary-edge));
  font-weight: 700;
  flex-shrink: 0;
}
.tr-text { white-space: pre-wrap; }
.tr-line--primary   .tr-text { color: hsl(var(--primary-edge)); }
.tr-line--secondary .tr-text { color: hsl(var(--secondary-edge)); }
.tr-line--accent    .tr-text { color: hsl(var(--accent-edge)); }
.tr-line--support   .tr-text { color: hsl(var(--support-edge)); }

.tr-approval {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  align-items: center;
  animation: slide-in 0.3s var(--ease-out-spring);
}
.tr-btn {
  all: unset;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 4px;
  color: hsl(var(--foreground));
}
:global(body.dark) .tr-btn { color: hsl(var(--background)); }
.tr-btn--approve { background: hsl(var(--secondary-edge)); }
.tr-btn--deny    { background: hsl(var(--accent-edge)); }
.tr-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.tr-btn:hover { filter: brightness(1.08); }
.tr-cursor {
  color: hsl(var(--background) / 0.55);
  animation: fade-blink 1s infinite;
}
:global(body.dark) .tr-cursor { color: hsl(var(--foreground) / 0.5); }
@media (prefers-reduced-motion: reduce) {
  .tr-line, .tr-approval { animation: none; }
  .tr-cursor { animation: none; opacity: 0.5; }
}
</style>
