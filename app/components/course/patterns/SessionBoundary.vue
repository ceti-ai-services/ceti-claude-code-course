<!--
  SessionBoundary — outer solid-border card (persistent) containing an
  inner dashed-border "session" box with ephemeral chips. The evaporates
  label pulses subtly.

  Pattern ref: PATTERNS.md §15 · shadcn-diagrams.jsx ShadSessionBoundary.
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import Chip from "@/components/course/_primitives/Chip.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type BoundaryChip = { label: string; role: Role }

withDefaults(
  defineProps<{
    title: string
    caption?: string
    persistentLabel: string
    ephemeralLabel?: string
    sessionTag?: string
    chips: BoundaryChip[]
  }>(),
  { caption: "", ephemeralLabel: "evaporates", sessionTag: "SESSION" },
)

const reducedMotion = ref(false)
onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
})
</script>

<template>
  <DiagramShell :title="title" :caption="caption">
    <div class="sb-wrap">
      <div class="sb-outer">
        <span class="sb-swatch" aria-hidden="true" />
        <span class="sb-persist">{{ persistentLabel }}</span>
        <span class="sb-tag">persists</span>
      </div>
      <div class="sb-inner">
        <span class="sb-session-tag">{{ sessionTag }}</span>
        <div class="sb-chips">
          <Chip
            v-for="(c, i) in chips"
            :key="c.label + i"
            :role="c.role"
            size="xs"
          >
            {{ c.label }}
          </Chip>
          <span class="sb-evaporate" :class="{ 'sb-evaporate--static': reducedMotion }">
            {{ ephemeralLabel }}
          </span>
        </div>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.sb-wrap {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.sb-outer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid hsl(var(--foreground) / 0.65);
  border-radius: 10px;
  background: hsl(var(--card));
}
:global(body.dark) .sb-outer {
  border-color: hsl(var(--primary-edge) / 0.55);
}
.sb-swatch {
  width: 14px;
  height: 10px;
  border-radius: 3px;
  background: hsl(var(--primary));
  border: 1px solid hsl(var(--primary-edge) / 0.55);
  flex: 0 0 auto;
}
.sb-persist {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: hsl(var(--foreground));
  flex: 1;
}
.sb-tag {
  font-size: 10px;
  font-style: italic;
  color: hsl(var(--muted-foreground));
}

.sb-inner {
  position: relative;
  border: 1.5px dashed hsl(var(--foreground) / 0.42);
  border-radius: 10px;
  padding: 18px 14px 14px;
  background: hsl(var(--secondary) / 0.18);
}
:global(body.dark) .sb-inner {
  border-color: hsl(var(--primary-edge) / 0.45);
  background: hsl(var(--foreground) / 0.03);
}
.sb-session-tag {
  position: absolute;
  top: -9px;
  left: 14px;
  background: hsl(var(--card));
  padding: 0 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: hsl(var(--foreground));
}
.sb-chips {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
.sb-evaporate {
  margin-left: auto;
  font-size: 10.5px;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  animation: sb-breathe 2.8s ease-in-out infinite;
}
.sb-evaporate--static { animation: none; opacity: 0.7; }

@keyframes sb-breathe {
  0%, 100% { opacity: 0.45; }
  50%      { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .sb-evaporate { animation: none; opacity: 0.7; }
}
</style>
