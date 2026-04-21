<!--
  CheckableStack — vertical stack of expandable rows with per-row checkbox.
  Click row → expand/collapse. Click checkbox → toggle commitment.

  Pattern ref: PATTERNS.md §14 · shadcn-diagrams.jsx ShadCheckList · max 6 items.
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type CheckItem = { title: string; body: string; role: Role }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    items: CheckItem[]
  }>(),
  { caption: "" },
)

const emit = defineEmits<{
  (e: "update:checked", index: number, checked: boolean): void
}>()

const clampedItems = computed(() => props.items.slice(0, 6))
const openIdx = ref<number | null>(null)
const checkedState = ref<boolean[]>([])

watch(
  clampedItems,
  (next) => {
    checkedState.value = next.map((_, i) => checkedState.value[i] ?? false)
  },
  { immediate: true },
)

function toggleOpen(i: number) {
  openIdx.value = openIdx.value === i ? null : i
}

function toggleCheck(i: number, event: Event) {
  event.stopPropagation()
  const next = !checkedState.value[i]
  checkedState.value[i] = next
  emit("update:checked", i, next)
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption">
    <ul class="cs-list">
      <li
        v-for="(item, i) in clampedItems"
        :key="item.title + i"
        class="cs-row"
        :class="[`cs-row--${item.role}`, { 'cs-row--open': openIdx === i, 'cs-row--done': checkedState[i] }]"
      >
        <button
          type="button"
          class="cs-head"
          :aria-expanded="openIdx === i"
          @click="toggleOpen(i)"
        >
          <span
            class="cs-check"
            :class="{ 'cs-check--on': checkedState[i] }"
            role="checkbox"
            :aria-checked="checkedState[i]"
            tabindex="0"
            @click="toggleCheck(i, $event)"
            @keydown.space.prevent="toggleCheck(i, $event)"
            @keydown.enter.prevent="toggleCheck(i, $event)"
          >
            <svg
              v-if="checkedState[i]"
              viewBox="0 0 14 14"
              width="10"
              height="10"
              aria-hidden="true"
            >
              <path
                d="M 2 7 L 6 11 L 12 3"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="cs-num">{{ String(i + 1).padStart(2, "0") }}</span>
          <span class="cs-title">{{ item.title }}</span>
          <span class="cs-caret" aria-hidden="true">{{ openIdx === i ? "–" : "+" }}</span>
        </button>
        <div v-show="openIdx === i" class="cs-body">
          <p>{{ item.body }}</p>
        </div>
      </li>
    </ul>
  </DiagramShell>
</template>

<style scoped>
.cs-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.cs-row {
  border-radius: 10px;
  background: hsl(var(--muted) / 0.32);
  border: 1px solid hsl(var(--border));
  overflow: hidden;
  transition: background-color 0.22s var(--ease-out-spring), border-color 0.22s var(--ease-out-spring);
}
.cs-row--open { background: hsl(var(--muted) / 0.55); }
.cs-row--done { border-color: hsl(var(--secondary-edge) / 0.5); }

.cs-head {
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: var(--font-sans);
}
.cs-head:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.cs-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid hsl(var(--muted-foreground) / 0.6);
  background: hsl(var(--background));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s var(--ease-out-spring);
  color: hsl(var(--foreground));
  flex: 0 0 18px;
}
.cs-check:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
.cs-row--primary   .cs-check--on { background: hsl(var(--primary));   border-color: hsl(var(--primary-edge));   color: hsl(var(--primary-foreground)); }
.cs-row--secondary .cs-check--on { background: hsl(var(--secondary)); border-color: hsl(var(--secondary-edge)); color: hsl(var(--secondary-foreground)); }
.cs-row--accent    .cs-check--on { background: hsl(var(--accent));    border-color: hsl(var(--accent-edge));    color: hsl(var(--accent-foreground)); }
.cs-row--support   .cs-check--on { background: hsl(var(--support));   border-color: hsl(var(--support-edge));   color: hsl(var(--support-foreground)); }

.cs-num {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: hsl(var(--muted-foreground));
}
.cs-title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: hsl(var(--foreground));
  text-align: left;
}
.cs-row--done .cs-title { color: hsl(var(--muted-foreground)); text-decoration: line-through; text-decoration-thickness: 1px; }

.cs-caret {
  font-family: var(--font-mono);
  font-size: 14px;
  color: hsl(var(--muted-foreground));
  width: 14px;
  text-align: center;
}

.cs-body {
  padding: 0 14px 12px 44px;
  font-size: 12px;
  line-height: 1.55;
  color: hsl(var(--foreground) / 0.88);
  animation: cs-reveal 0.25s var(--ease-out-spring);
}
.cs-body p { margin: 0; }

@keyframes cs-reveal {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cs-row, .cs-check, .cs-body { transition: none; animation: none; }
}
</style>
