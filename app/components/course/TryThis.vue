<script setup lang="ts">
import Polyhedron from "@/components/course/_primitives/Polyhedron.vue"
import { useCustomizer } from "@/composables/useCustomizer"
import { useLabels } from "@/utils/i18nLabels"

defineProps<{ time?: string; title?: string }>()

const { lang } = useCustomizer()
const L = useLabels(lang)
</script>

<template>
  <div class="try-this">
    <!-- Gold top-sweep line -->
    <div class="try-this__sweep" aria-hidden="true" />

    <div class="try-this__header">
      <!-- Cuboctahedron: equilibrium-through-action (Fuller's "doing" state) -->
      <Polyhedron
        shape="cuboctahedron"
        :size="36"
        class="try-this__glyph"
        aria-hidden="true"
      />

      <div class="try-this__header-text">
        <span class="try-this__eyebrow">{{ L('TRY_THIS') }}</span>
        <span v-if="title" class="try-this__title">{{ title }}</span>
      </div>

      <span v-if="time" class="try-this__timer">
        <span class="try-this__timer-dot" aria-hidden="true" />
        {{ time }}
      </span>
    </div>

    <div class="try-this__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.try-this {
  position: relative;
  margin: 28px 0;
  border-radius: 14px;
  border: 1px solid hsl(var(--accent-edge) / 0.28);
  background: hsl(var(--muted));
  overflow: hidden;
}

/* Dark mode: deeper background + glow border */
:global(body.dark) .try-this {
  background: hsl(var(--card));
  border-color: hsl(var(--accent-edge) / 0.22);
  box-shadow: inset 3px 0 0 0 hsl(var(--accent-edge)),
              0 0 24px -8px hsl(var(--accent-edge) / 0.18);
}

/* Animated accent sweep on mount */
.try-this__sweep {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsl(var(--accent-edge)) 40%,
    hsl(var(--accent-edge)) 60%,
    transparent 100%
  );
  transform: scaleX(0);
  transform-origin: left;
  animation: sweep-in 800ms var(--ease-out-spring) 200ms both;
}

@keyframes sweep-in {
  to { transform: scaleX(1); }
}

.try-this__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-bottom: 1px dashed hsl(var(--accent-edge) / 0.22);
}

.try-this__glyph {
  color: hsl(var(--accent-edge));
  flex-shrink: 0;
}

.try-this__header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.try-this__eyebrow {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: hsl(var(--accent-edge));
}

.try-this__title {
  font-family: var(--font-display);
  font-weight: 300;
  font-style: italic;
  font-size: 20px;
  line-height: 1.2;
  color: hsl(var(--foreground));
  letter-spacing: -0.01em;
}

.try-this__timer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: hsl(var(--muted-foreground));
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.try-this__timer-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: hsl(var(--accent-edge));
  opacity: 0.7;
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.try-this__body {
  padding: 18px 20px 22px;
  color: hsl(var(--foreground));
  font-size: 15px;
  line-height: 1.68;
}

.try-this__body :deep(p) { margin: 0 0 13px; }
.try-this__body :deep(p:last-child) { margin-bottom: 0; }

.try-this__body :deep(ul),
.try-this__body :deep(ol) {
  margin: 8px 0 14px 0;
  padding: 0;
  list-style: none;
}
.try-this__body :deep(li) {
  padding-left: 20px;
  position: relative;
  margin-bottom: 7px;
  color: hsl(var(--foreground));
}
.try-this__body :deep(ul li::before) {
  content: "→";
  position: absolute;
  left: 0;
  color: hsl(var(--accent-edge));
}
.try-this__body :deep(ol) { counter-reset: steps; }
.try-this__body :deep(ol li) { counter-increment: steps; }
.try-this__body :deep(ol li::before) {
  content: counter(steps, decimal-leading-zero);
  position: absolute;
  left: 0;
  color: hsl(var(--accent-edge));
  font-family: var(--font-mono);
  font-size: 12px;
}

.try-this__body :deep(code) {
  background: hsl(var(--muted));
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 0.89em;
  color: hsl(var(--foreground));
}

.try-this__body :deep(strong) {
  color: hsl(var(--foreground));
  font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {
  .try-this__sweep { animation: none; transform: scaleX(1); }
  .try-this__timer-dot { animation: none; opacity: 0.7; }
}
</style>
