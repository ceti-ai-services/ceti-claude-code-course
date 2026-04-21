<!--
  TradeoffMatrix — two role-colored header chips, N rows each with a
  central label column and left/right values separated by dashed lines.

  Pattern ref: PATTERNS.md §16 · shadcn-diagrams.jsx ShadTradeoffMatrix
  · max 6 rows.
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type HeaderSpec = { label: string; sublabel?: string; role: Role }
type MatrixRow = { key: string; left: string; right: string }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    leftHeader: HeaderSpec
    rightHeader: HeaderSpec
    rows: MatrixRow[]
    alternating?: boolean
    alternateMs?: number
  }>(),
  { caption: "", alternating: false, alternateMs: 2600 },
)

const clampedRows = computed(() => props.rows.slice(0, 6))

const tick = ref(0)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function startCycle() {
  if (!props.alternating || reducedMotion.value) return
  if (timer) clearInterval(timer)
  timer = setInterval(() => { tick.value = (tick.value + 1) % 2 }, props.alternateMs)
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
    <div class="tm-wrap">
      <header class="tm-head">
        <Chip :role="leftHeader.role" :active="alternating && tick === 0" class="tm-head-chip">
          <span class="tm-head-inner">
            <span class="tm-head-label">{{ leftHeader.label }}</span>
            <span v-if="leftHeader.sublabel" class="tm-head-sub">{{ leftHeader.sublabel }}</span>
          </span>
        </Chip>
        <span class="tm-spacer" aria-hidden="true" />
        <Chip :role="rightHeader.role" :active="alternating && tick === 1" class="tm-head-chip">
          <span class="tm-head-inner">
            <span class="tm-head-label">{{ rightHeader.label }}</span>
            <span v-if="rightHeader.sublabel" class="tm-head-sub">{{ rightHeader.sublabel }}</span>
          </span>
        </Chip>
      </header>

      <dl class="tm-rows">
        <div v-for="row in clampedRows" :key="row.key" class="tm-row">
          <dd class="tm-left">{{ row.left }}</dd>
          <dt class="tm-key">{{ row.key }}</dt>
          <dd class="tm-right">{{ row.right }}</dd>
        </div>
      </dl>
    </div>
  </DiagramShell>
</template>

<style scoped>
.tm-wrap {
  width: 100%;
  max-width: 520px;
}
.tm-head {
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: end;
  margin-bottom: 10px;
  gap: 0;
}
.tm-head-chip {
  width: 100%;
  white-space: normal;
  padding: 8px 10px;
}
.tm-head-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.2;
  text-align: center;
}
.tm-head-label { font-size: 13px; font-weight: 700; }
.tm-head-sub   { font-size: 10.5px; font-weight: 400; opacity: 0.78; }
.tm-spacer { display: block; }

.tm-rows { margin: 0; padding: 0; }
.tm-row {
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: center;
  padding: 9px 0;
  border-top: 1px dashed hsl(var(--border));
}
.tm-left {
  font-size: 11.5px;
  text-align: right;
  color: hsl(var(--foreground));
  padding-right: 12px;
  margin: 0;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}
.tm-key {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-align: center;
  text-transform: uppercase;
  margin: 0;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}
.tm-right {
  font-size: 11.5px;
  color: hsl(var(--foreground));
  padding-left: 12px;
  margin: 0;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Mobile: stack row as three lines (left / key / right) instead of 3-col grid. */
@media (max-width: 640px) {
  .tm-head { grid-template-columns: 1fr 1fr; gap: 8px; }
  .tm-spacer { display: none; }
  .tm-row {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 4px;
    padding: 10px 0;
  }
  .tm-left, .tm-right {
    text-align: left;
    padding: 0;
  }
  .tm-key {
    text-align: left;
    order: -1;
  }
}
</style>
