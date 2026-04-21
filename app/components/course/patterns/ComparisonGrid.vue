<!--
  ComparisonGrid — N vertical columns sharing identical anatomy
  (eyebrow → chip → body). Dashed dividers between columns. Click a
  column to focus; others dim to ~55%.

  Pattern ref: PATTERNS.md §5 · shadcn-diagrams.jsx ShadComparison
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type Column = {
  eyebrow: string
  tagLabel: string
  tagRole: Role
  body: string
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    columns: Column[]
  }>(),
  { caption: "" },
)

const clamped = computed(() => props.columns.slice(0, 4))
const count = computed(() => clamped.value.length)
const focused = ref(1)

/** Default-focus the middle-ish column if possible. */
onMounted(() => {
  if (count.value > 0) {
    focused.value = Math.min(focused.value, count.value - 1)
  }
})

function focus(i: number) { focused.value = i }
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="240">
    <div
      class="cg-grid"
      :style="{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }"
    >
      <button
        v-for="(c, i) in clamped"
        :key="c.eyebrow + i"
        type="button"
        class="cg-col"
        :class="[
          i > 0 && 'cg-col--sep',
          focused === i ? 'cg-col--on' : 'cg-col--off',
        ]"
        :aria-pressed="focused === i"
        @click="focus(i)"
      >
        <span class="cg-eyebrow">{{ c.eyebrow }}</span>
        <span class="cg-chip-wrap">
          <Chip :role="c.tagRole" size="xs">{{ c.tagLabel }}</Chip>
        </span>
        <span class="cg-body">{{ c.body }}</span>
      </button>
    </div>
  </DiagramShell>
</template>

<style scoped>
.cg-grid {
  display: grid;
  width: 100%;
  gap: 0;
}
.cg-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 14px 16px;
  background: transparent;
  border: none;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  min-width: 0;
  transition: transform 0.24s var(--ease-out-spring),
              opacity 0.24s var(--ease-out-spring);
}
.cg-col:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
  border-radius: 6px;
}
.cg-col--sep { border-left: 1px dashed hsl(var(--border)); }
.cg-col--on  { transform: translateY(-2px); opacity: 1; }
.cg-col--off { opacity: 0.55; }

.cg-eyebrow {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  overflow-wrap: break-word;
  word-break: break-word;
}
.cg-chip-wrap { display: inline-flex; max-width: 100%; }
.cg-body {
  font-size: 12px;
  line-height: 1.55;
  color: hsl(var(--foreground));
  overflow-wrap: break-word;
  word-break: break-word;
}

@media (prefers-reduced-motion: reduce) {
  .cg-col { transition: none; }
  .cg-col--on { transform: none; }
}

/* Mobile: stack columns vertically, replace vertical dashes with horizontal. */
@media (max-width: 640px) {
  .cg-grid {
    grid-template-columns: 1fr !important;
  }
  .cg-col--sep {
    border-left: none;
    border-top: 1px dashed hsl(var(--border));
  }
}
</style>
