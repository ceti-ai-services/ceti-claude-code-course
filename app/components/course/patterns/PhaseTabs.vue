<!--
  PhaseTabs — N horizontal tabs with per-phase color. Panel below
  cross-fades on click. NO auto-cycle — the reader drives.

  Pattern ref: PATTERNS.md §4
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type TabFacet = { label: string; value: string }
type Tab = { title: string; role: Role; facets: TabFacet[] }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    tabs: Tab[]
  }>(),
  { caption: "" },
)

const clamped = computed(() => props.tabs.slice(0, 5))
const activeIdx = ref(0)

function pick(i: number) { activeIdx.value = i }

function onKey(e: KeyboardEvent, i: number) {
  const last = clamped.value.length - 1
  if (e.key === "ArrowRight") { activeIdx.value = i === last ? 0 : i + 1; e.preventDefault() }
  else if (e.key === "ArrowLeft") { activeIdx.value = i === 0 ? last : i - 1; e.preventDefault() }
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="280">
    <div class="pt-wrap">
      <div role="tablist" class="pt-tablist" :aria-label="title">
        <button
          v-for="(t, i) in clamped"
          :key="t.title + i"
          :id="`pt-tab-${i}`"
          role="tab"
          type="button"
          :aria-selected="activeIdx === i"
          :aria-controls="`pt-panel-${i}`"
          :tabindex="activeIdx === i ? 0 : -1"
          class="pt-tab"
          :class="[
            `pt-role-${t.role}`,
            activeIdx === i && 'pt-tab--active',
          ]"
          @click="pick(i)"
          @keydown="onKey($event, i)"
        >
          <span class="pt-tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="pt-tab-title">{{ t.title }}</span>
        </button>
      </div>

      <div
        :id="`pt-panel-${activeIdx}`"
        :key="activeIdx"
        role="tabpanel"
        :aria-labelledby="`pt-tab-${activeIdx}`"
        class="pt-panel"
        :class="`pt-panel--${clamped[activeIdx]?.role}`"
      >
        <div class="pt-panel-head">
          <span class="pt-panel-eyebrow">Phase {{ activeIdx + 1 }}</span>
          <span class="pt-panel-title display-italic">
            {{ clamped[activeIdx]?.title }}
          </span>
        </div>

        <dl class="pt-facets">
          <div
            v-for="f in clamped[activeIdx]?.facets ?? []"
            :key="f.label"
            class="pt-facet"
          >
            <dt class="pt-facet-label">{{ f.label }}</dt>
            <dd class="pt-facet-value">{{ f.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.pt-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.pt-tablist {
  display: grid;
  grid-template-columns: repeat(var(--cols, auto-fit), minmax(110px, 1fr));
  gap: 6px;
  width: 100%;
}
.pt-tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--muted) / 0.3);
  color: hsl(var(--muted-foreground));
  font: inherit;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  min-width: 0;
  transition: all 0.22s var(--ease-out-spring);
}
.pt-tab:hover { color: hsl(var(--foreground)); }
.pt-tab:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.pt-tab-num {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  font-weight: 700;
  opacity: 0.7;
}
.pt-tab-title {
  font-size: 12.5px;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-word;
  min-width: 0;
}

.pt-tab--active.pt-role-primary   { background: hsl(var(--primary));   color: hsl(var(--primary-foreground));   }
.pt-tab--active.pt-role-secondary { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
.pt-tab--active.pt-role-accent    { background: hsl(var(--accent));    color: hsl(var(--accent-foreground));    }
.pt-tab--active.pt-role-support   { background: hsl(var(--support));   color: hsl(var(--support-foreground));   }

:global(body.dark) .pt-tab--active.pt-role-primary   { border-color: hsl(var(--primary-edge)   / 0.7); }
:global(body.dark) .pt-tab--active.pt-role-secondary { border-color: hsl(var(--secondary-edge) / 0.7); }
:global(body.dark) .pt-tab--active.pt-role-accent    { border-color: hsl(var(--accent-edge)    / 0.7); }
:global(body.dark) .pt-tab--active.pt-role-support   { border-color: hsl(var(--support-edge)   / 0.7); }

.pt-panel {
  padding: 14px 16px;
  border: 1px solid hsl(var(--border));
  border-radius: 10px;
  background: hsl(var(--muted) / 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: pt-fade 0.3s var(--ease-out-spring);
}
.pt-panel--primary   { border-left: 3px solid hsl(var(--primary-edge));   }
.pt-panel--secondary { border-left: 3px solid hsl(var(--secondary-edge)); }
.pt-panel--accent    { border-left: 3px solid hsl(var(--accent-edge));    }
.pt-panel--support   { border-left: 3px solid hsl(var(--support-edge));   }

.pt-panel-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.pt-panel-eyebrow {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
}
.pt-panel-title {
  font-size: 19px;
  color: hsl(var(--foreground));
  line-height: 1.1;
}
.pt-facets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px 16px;
  margin: 0;
}
.pt-facet {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 0;
  border-top: 1px dashed hsl(var(--border));
}
.pt-facet-label {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  margin: 0;
}
.pt-facet-value {
  font-size: 12.5px;
  color: hsl(var(--foreground));
  margin: 0;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;
}

@keyframes pt-fade {
  from { transform: translateY(4px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .pt-panel { animation: none; }
}
</style>
