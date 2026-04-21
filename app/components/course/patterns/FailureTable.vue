<!--
  FailureTable — three text columns (WRONG / TRAP / RIGHT), N rows,
  dashed row separators. Wrong chip → accent. Right chip → secondary.
  Click a row to highlight it.

  Pattern ref: PATTERNS.md §6 · shadcn-diagrams.jsx ShadFailureTable
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type FailureRow = { wrong: string; trap: string; right: string }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    rows: FailureRow[]
  }>(),
  { caption: "" },
)

const clamped = computed(() => props.rows.slice(0, 4))
const openIdx = ref(0)

function toggle(i: number) { openIdx.value = i }
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="240">
    <div class="ft-wrap" role="table" :aria-label="title">
      <div class="ft-head" role="row">
        <span role="columnheader" class="ft-head-cell">WRONG</span>
        <span role="columnheader" class="ft-head-cell">TRAP</span>
        <span role="columnheader" class="ft-head-cell">RIGHT</span>
      </div>

      <button
        v-for="(r, i) in clamped"
        :key="r.wrong + i"
        type="button"
        role="row"
        class="ft-row"
        :class="openIdx === i && 'ft-row--open'"
        :aria-pressed="openIdx === i"
        @click="toggle(i)"
      >
        <span role="cell" class="ft-cell">
          <Chip role="accent" size="xs">{{ r.wrong }}</Chip>
        </span>
        <span role="cell" class="ft-cell ft-trap">{{ r.trap }}</span>
        <span role="cell" class="ft-cell">
          <Chip role="secondary" size="xs">{{ r.right }}</Chip>
        </span>
      </button>
    </div>
  </DiagramShell>
</template>

<style scoped>
.ft-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ft-head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 0 4px 4px;
}
.ft-head-cell {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
}
.ft-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px 4px;
  border-top: 1px dashed hsl(var(--border));
  background: transparent;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.22s var(--ease-out-spring);
}
.ft-row:hover { background: hsl(var(--muted) / 0.25); }
.ft-row:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px hsl(var(--ring));
  border-radius: 6px;
}
.ft-row--open { background: hsl(var(--primary) / 0.18); }
:global(body.dark) .ft-row--open { background: hsl(var(--primary-edge) / 0.1); }

.ft-cell {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}
.ft-trap {
  font-size: 11px;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  line-height: 1.4;
}

@media (prefers-reduced-motion: reduce) {
  .ft-row { transition: none; }
}
</style>
