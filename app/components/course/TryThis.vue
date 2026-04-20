<script setup lang="ts">
import { Target } from "lucide-vue-next"

defineProps<{ time: string }>()
</script>

<template>
  <div class="assignment">
    <!-- Gold top-sweep line -->
    <div class="assignment__sweep" aria-hidden="true" />

    <div class="assignment__header">
      <Target class="assignment__icon" aria-hidden="true" />
      <span class="assignment__eyebrow">Field assignment</span>
      <span class="assignment__timer">
        <span class="assignment__timer-dot" aria-hidden="true" />
        {{ time }}
      </span>
    </div>

    <div class="assignment__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.assignment {
  position: relative;
  margin: 28px 0;
  border-radius: 14px;
  border: 1px solid rgba(212, 168, 75, 0.28);
  background: linear-gradient(
    160deg,
    rgba(212, 168, 75, 0.06) 0%,
    rgba(212, 168, 75, 0.02) 40%,
    transparent 100%
  );
  overflow: hidden;
}

/* Animated gold sweep on mount */
.assignment__sweep {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-gold) 40%,
    var(--color-gold) 60%,
    transparent 100%
  );
  transform: scaleX(0);
  transform-origin: left;
  animation: sweep-in 800ms var(--ease-out-spring) 200ms both;
}

@keyframes sweep-in {
  to { transform: scaleX(1); }
}

.assignment__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-bottom: 1px dashed rgba(212, 168, 75, 0.22);
}

.assignment__icon {
  width: 13px;
  height: 13px;
  color: var(--color-gold);
  flex-shrink: 0;
}

.assignment__eyebrow {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  flex: 1;
}

.assignment__timer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-muted);
  letter-spacing: 0.04em;
}

.assignment__timer-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-gold);
  opacity: 0.7;
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.assignment__body {
  padding: 18px 20px 22px;
  color: var(--color-text);
  font-size: 15px;
  line-height: 1.68;
}

.assignment__body :deep(p) { margin: 0 0 13px; }
.assignment__body :deep(p:last-child) { margin-bottom: 0; }

.assignment__body :deep(ul),
.assignment__body :deep(ol) {
  margin: 8px 0 14px 0;
  padding: 0;
  list-style: none;
}
.assignment__body :deep(li) {
  padding-left: 20px;
  position: relative;
  margin-bottom: 7px;
  color: var(--color-text);
}
.assignment__body :deep(ul li::before) {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-gold);
}
.assignment__body :deep(ol) { counter-reset: steps; }
.assignment__body :deep(ol li) { counter-increment: steps; }
.assignment__body :deep(ol li::before) {
  content: counter(steps, decimal-leading-zero);
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-family: var(--font-mono);
  font-size: 12px;
}

.assignment__body :deep(code) {
  background: var(--color-raised);
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 0.89em;
  color: var(--color-text);
}

.assignment__body :deep(strong) {
  color: var(--color-text);
  font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {
  .assignment__sweep { animation: none; transform: scaleX(1); }
  .assignment__timer-dot { animation: none; opacity: 0.7; }
}
</style>
