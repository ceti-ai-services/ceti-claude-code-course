<!--
  ScatterFlow — points scattered on a 2D effort x fit axis. A dashed
  animated path connects only the fit points; a dot travels along. Hover
  any point for a detail tooltip.

  Pattern ref: PATTERNS.md §17 · diagrams-rb.jsx V5ScatterFlow
  · max 8 points.
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type ScatterPoint = {
  x: number /* 0-100 */
  y: number /* 0-100 */
  label: string
  fit: boolean
  role: Role
  detail?: string
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    xLabel?: string
    yLabel?: string
    points: ScatterPoint[]
  }>(),
  {
    caption: "",
    xLabel: "repeats weekly →",
    yLabel: "← spans many files",
  },
)

const LABEL_MAX = 12

/** Soft-cap any label longer than 12 chars with ellipsis — full text
 * is preserved on the point for the SVG <title> tooltip + detail panel. */
function displayLabel(label: string): string {
  if (!label) return ""
  return label.length > LABEL_MAX ? label.slice(0, LABEL_MAX - 1).trimEnd() + "\u2026" : label
}

const clampedPoints = computed(() => props.points.slice(0, 8))

// Plot geometry — percentages over a 360x240 box.
const W = 360
const H = 240
const padL = 24
const padR = 16
const padT = 18
const padB = 32

function px(p: ScatterPoint) {
  return padL + ((W - padL - padR) * p.x) / 100
}
function py(p: ScatterPoint) {
  // Invert Y so 100 = top.
  return padT + ((H - padT - padB) * (100 - p.y)) / 100
}

const fitPoints = computed(() =>
  clampedPoints.value.filter((p) => p.fit),
)

const pathD = computed(() => {
  const pts = fitPoints.value
  if (pts.length === 0) return ""
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${px(p)} ${py(p)}`).join(" ")
})

const hovered = ref<number | null>(null)
const reducedMotion = ref(false)

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
})

function roleVar(role: Role, edge = false) {
  const key = edge ? `${role}-edge` : role
  return `hsl(var(--${key}))`
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="260">
    <div class="sf-wrap">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        :width="W"
        :height="H"
        role="img"
        class="sf-svg"
      >
        <!-- Axes -->
        <line
          :x1="padL" :y1="H - padB" :x2="W - padR" :y2="H - padB"
          stroke="hsl(var(--foreground) / 0.45)" stroke-width="1.2"
        />
        <line
          :x1="padL" :y1="padT" :x2="padL" :y2="H - padB"
          stroke="hsl(var(--foreground) / 0.45)" stroke-width="1.2"
        />
        <text
          :x="W - padR" :y="H - padB + 14"
          font-size="9" text-anchor="end"
          fill="hsl(var(--muted-foreground))"
          font-family="var(--font-mono)"
        >{{ xLabel }}</text>
        <text
          :x="padL - 8" :y="padT"
          font-size="9" text-anchor="end"
          fill="hsl(var(--muted-foreground))"
          font-family="var(--font-mono)"
          :transform="`rotate(-90 ${padL - 8} ${padT})`"
        >{{ yLabel }}</text>

        <!-- Flow path (only fit points) -->
        <path
          v-if="pathD"
          :d="pathD"
          fill="none"
          stroke="hsl(var(--foreground) / 0.55)"
          stroke-width="1.6"
          stroke-dasharray="6 4"
          :class="{ 'sf-path--animated': !reducedMotion }"
        />
        <!-- Traveling dot -->
        <circle
          v-if="pathD && !reducedMotion"
          r="4"
          fill="hsl(var(--accent-edge))"
          stroke="hsl(var(--background))"
          stroke-width="1.2"
        >
          <animateMotion dur="4s" repeatCount="indefinite" :path="pathD" />
        </circle>

        <!-- Points -->
        <g v-for="(p, i) in clampedPoints" :key="p.label + i">
          <circle
            :cx="px(p)"
            :cy="py(p)"
            :r="p.fit ? 7 : 5"
            :fill="roleVar(p.role)"
            :stroke="roleVar(p.role, true)"
            :stroke-width="p.fit ? 1.6 : 1.2"
            :opacity="p.fit ? 1 : 0.55"
            class="sf-point"
            @mouseenter="hovered = i"
            @mouseleave="hovered = null"
            @focus="hovered = i"
            @blur="hovered = null"
            tabindex="0"
            :aria-label="p.label"
          >
            <title>{{ p.label }}</title>
          </circle>
          <text
            :x="px(p) + (p.fit ? 12 : 10)"
            :y="py(p) + 3"
            font-size="10"
            font-family="var(--font-mono)"
            :fill="p.fit ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'"
            :opacity="p.fit ? 1 : 0.75"
            :font-weight="p.fit ? 600 : 500"
          ><title>{{ p.label }}</title>{{ displayLabel(p.label) }}</text>
        </g>
      </svg>

      <div
        v-if="hovered !== null && clampedPoints[hovered]?.detail"
        class="sf-tip"
        role="status"
      >
        <span class="sf-tip-title">{{ clampedPoints[hovered]!.label }}</span>
        <span class="sf-tip-body">{{ clampedPoints[hovered]!.detail }}</span>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.sf-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}
.sf-svg { max-width: 100%; height: auto; }
.sf-point {
  cursor: pointer;
  transition: transform 0.2s var(--ease-out-spring);
  transform-box: fill-box;
  transform-origin: center;
}
.sf-point:hover, .sf-point:focus-visible {
  transform: scale(1.2);
  outline: none;
}
.sf-path--animated {
  animation: sf-dash 1.4s linear infinite;
}
@keyframes sf-dash {
  to { stroke-dashoffset: -20; }
}
.sf-tip {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 4px 12px hsl(var(--foreground) / 0.12);
  max-width: 260px;
  pointer-events: none;
}
.sf-tip-title {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  color: hsl(var(--foreground));
  overflow-wrap: break-word;
  word-break: break-word;
  min-width: 0;
}
.sf-tip-body {
  font-size: 11px;
  color: hsl(var(--muted-foreground));
  line-height: 1.4;
  overflow-wrap: break-word;
  word-break: break-word;
}
@media (prefers-reduced-motion: reduce) {
  .sf-path--animated { animation: none; }
  .sf-point { transition: none; }
}

/* Mobile: 2D scatter doesn't reflow well as a vertical list — labels overlap
   at small viewports. The SVG already scales (max-width:100%, height:auto)
   via .sf-svg, so we just give the wrapper horizontal-scroll headroom and
   keep tooltips readable.
   TODO mobile: convert scatter to grouped-list (by quadrant) for true vertical flow. */
@media (max-width: 640px) {
  .sf-wrap {
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    justify-content: flex-start;
    padding-bottom: 4px;
  }
  .sf-svg {
    min-width: 320px;
  }
  .sf-tip {
    left: 12px;
    transform: none;
    max-width: calc(100% - 24px);
  }
}
</style>
