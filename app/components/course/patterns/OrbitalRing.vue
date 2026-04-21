<!--
  OrbitalRing — 3–5 nodes on a circle. A dot orbits continuously via
  SVG <animateMotion>. Center label shows the currently "live" node.

  Pattern ref: PATTERNS.md §2 · shadcn-diagrams.jsx ShadOrbitalRing
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type Node = { label: string; role: Role }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    nodes: Node[]
    centerLabel?: string
  }>(),
  { caption: "", centerLabel: "NOW" },
)

const clamped = computed(() => props.nodes.slice(0, 5))
const count = computed(() => clamped.value.length)

const reducedMotion = ref(false)
const activeIdx = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

/** Geometry */
const R = 74
const CX = 120
const CY = 104
const BOX_W = 240
const BOX_H = 208
/** Per-node duration beat for the chip highlight — matches one quarter of the orbit. */
const CYCLE_MS = 1400

const points = computed(() => {
  const n = count.value || 1
  return clamped.value.map((_, i) => {
    const t = -Math.PI / 2 + (i * (2 * Math.PI)) / n
    return { x: CX + Math.cos(t) * R, y: CY + Math.sin(t) * R }
  })
})

/** Build the closed circle path for animateMotion. */
const orbitPath = computed(
  () =>
    `M ${CX} ${CY - R} ` +
    `A ${R} ${R} 0 0 1 ${CX + R} ${CY} ` +
    `A ${R} ${R} 0 0 1 ${CX} ${CY + R} ` +
    `A ${R} ${R} 0 0 1 ${CX - R} ${CY} ` +
    `A ${R} ${R} 0 0 1 ${CX} ${CY - R}`,
)

const orbitDuration = computed(() => `${(CYCLE_MS * (count.value || 4)) / 1000}s`)

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!reducedMotion.value && count.value > 1) {
    timer = setInterval(() => {
      activeIdx.value = (activeIdx.value + 1) % count.value
    }, CYCLE_MS)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <DiagramShell :title="title" :caption="caption">
    <div class="or-stage" :style="{ width: `${BOX_W}px`, height: `${BOX_H}px` }">
      <svg
        class="or-svg"
        :width="BOX_W"
        :height="BOX_H"
        :viewBox="`0 0 ${BOX_W} ${BOX_H}`"
        aria-hidden="true"
      >
        <circle
          :cx="CX"
          :cy="CY"
          :r="R"
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.35)"
          stroke-dasharray="3 4"
          stroke-width="1.2"
        />
        <circle
          r="5"
          fill="hsl(var(--accent-edge))"
          stroke="hsl(var(--background))"
          stroke-width="1.5"
        >
          <animateMotion
            v-if="!reducedMotion && count > 1"
            :dur="orbitDuration"
            repeatCount="indefinite"
            :path="orbitPath"
          />
        </circle>
      </svg>

      <div
        v-for="(p, i) in points"
        :key="(clamped[i]?.label ?? '') + i"
        class="or-node"
        :style="{ left: `${p.x}px`, top: `${p.y}px` }"
      >
        <Chip
          v-if="clamped[i]"
          :role="clamped[i]!.role"
          :active="activeIdx === i"
          size="xs"
        >
          {{ clamped[i]!.label }}
        </Chip>
      </div>

      <div class="or-center" aria-live="polite">
        <span class="or-center-eyebrow">{{ centerLabel }}</span>
        <span :key="activeIdx" class="or-center-label display-italic">
          {{ clamped[activeIdx]?.label }}
        </span>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.or-stage {
  position: relative;
}
.or-svg {
  position: absolute;
  inset: 0;
}
.or-node {
  position: absolute;
  transform: translate(-50%, -50%);
}
.or-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  pointer-events: none;
  text-align: center;
}
.or-center-eyebrow {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
}
.or-center-label {
  font-size: 16px;
  font-weight: 600;
  color: hsl(var(--foreground));
  animation: or-slide-in 0.35s var(--ease-out-spring);
}
@keyframes or-slide-in {
  from { transform: translateY(4px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .or-center-label { animation: none; }
}
</style>
