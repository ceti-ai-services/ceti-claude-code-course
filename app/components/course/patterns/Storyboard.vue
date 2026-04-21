<!--
  Storyboard — left rail of clickable phase chips, right panel shows the
  active phase's prose with a cross-fade. Auto-cycles slowly so readers
  can read; first user click pins.

  Pattern ref: PATTERNS.md §3 · shadcn-diagrams.jsx ShadStoryboard
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type Phase = { title: string; role: Role; note: string }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    phases: Phase[]
    autoCycleMs?: number
  }>(),
  { caption: "", autoCycleMs: 2200 },
)

const clamped = computed(() => props.phases.slice(0, 5))
const count = computed(() => clamped.value.length)

const activeIdx = ref(0)
const pinned = ref(false)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function pin(i: number) {
  activeIdx.value = i
  pinned.value = true
  if (timer) { clearInterval(timer); timer = null }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!reducedMotion.value && count.value > 1 && !pinned.value) {
    timer = setInterval(() => {
      if (pinned.value) return
      activeIdx.value = (activeIdx.value + 1) % count.value
    }, props.autoCycleMs)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="260">
    <div class="sb-wrap">
      <ol class="sb-rail">
        <li v-for="(p, i) in clamped" :key="p.title + i">
          <button
            type="button"
            class="sb-rail-btn"
            :class="[
              `sb-role-${p.role}`,
              activeIdx === i && 'sb-rail-btn--active',
            ]"
            :aria-pressed="activeIdx === i"
            @click="pin(i)"
          >
            <span class="sb-num">{{ i + 1 }}</span>
            <span class="sb-rail-title">{{ p.title }}</span>
          </button>
        </li>
      </ol>

      <div :key="activeIdx" class="sb-panel">
        <div class="sb-panel-eyebrow">
          Step {{ activeIdx + 1 }} of {{ count }}
        </div>
        <div class="sb-panel-title display-italic">
          {{ clamped[activeIdx]?.title }}
        </div>
        <p class="sb-panel-note">{{ clamped[activeIdx]?.note }}</p>

        <div class="sb-dots" aria-hidden="true">
          <span
            v-for="(p, i) in clamped"
            :key="'dot-' + i"
            class="sb-dot"
            :class="[
              i <= activeIdx && `sb-dot--on-${p.role}`,
            ]"
          />
        </div>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.sb-wrap {
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: stretch;
}
.sb-rail {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 0 auto;
  min-width: 136px;
}
.sb-rail-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: hsl(var(--muted-foreground));
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.22s var(--ease-out-spring);
}
.sb-rail-btn:hover { color: hsl(var(--foreground)); }
.sb-rail-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.sb-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: hsl(var(--background) / 0.9);
  color: hsl(var(--foreground));
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.sb-rail-title {
  line-height: 1.15;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Active rail states — color-as-fill in light, edge+text in dark. */
.sb-rail-btn--active { transform: translateX(4px); }
.sb-rail-btn--active.sb-role-primary   { background: hsl(var(--primary));   color: hsl(var(--primary-foreground)); }
.sb-rail-btn--active.sb-role-secondary { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
.sb-rail-btn--active.sb-role-accent    { background: hsl(var(--accent));    color: hsl(var(--accent-foreground)); }
.sb-rail-btn--active.sb-role-support   { background: hsl(var(--support));   color: hsl(var(--support-foreground)); }

:global(body.dark) .sb-rail-btn--active.sb-role-primary   { border-color: hsl(var(--primary-edge)   / 0.7); }
:global(body.dark) .sb-rail-btn--active.sb-role-secondary { border-color: hsl(var(--secondary-edge) / 0.7); }
:global(body.dark) .sb-rail-btn--active.sb-role-accent    { border-color: hsl(var(--accent-edge)    / 0.7); }
:global(body.dark) .sb-rail-btn--active.sb-role-support   { border-color: hsl(var(--support-edge)   / 0.7); }

.sb-panel {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px 12px;
  background: hsl(var(--muted) / 0.35);
  border: 1px solid hsl(var(--border));
  border-radius: 10px;
  animation: sb-fade-in 0.32s var(--ease-out-spring);
}
.sb-panel-eyebrow {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
}
.sb-panel-title {
  font-size: 20px;
  color: hsl(var(--foreground));
  line-height: 1.1;
  overflow-wrap: break-word;
  word-break: break-word;
}
.sb-panel-note {
  font-size: 13px;
  color: hsl(var(--foreground));
  line-height: 1.55;
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}
.sb-dots {
  margin-top: auto;
  display: flex;
  gap: 4px;
  padding-top: 10px;
}
.sb-dot {
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: hsl(var(--muted-foreground) / 0.22);
  transition: background 0.22s var(--ease-out-spring);
}
.sb-dot--on-primary   { background: hsl(var(--primary-edge)); }
.sb-dot--on-secondary { background: hsl(var(--secondary-edge)); }
.sb-dot--on-accent    { background: hsl(var(--accent-edge)); }
.sb-dot--on-support   { background: hsl(var(--support-edge)); }

@keyframes sb-fade-in {
  from { transform: translateY(4px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .sb-panel { animation: none; }
  .sb-rail-btn--active { transform: none; }
}
</style>
