<script setup lang="ts">
// No props — Recap is a fixed structural block
</script>

<template>
  <div class="debrief">
    <div class="debrief__header">
      <span class="debrief__badge" aria-hidden="true">✓</span>
      <span class="debrief__label">Debrief</span>
      <div class="debrief__line" aria-hidden="true" />
    </div>

    <div class="debrief__body">
      <slot />
    </div>

    <!-- Bottom accent -->
    <div class="debrief__base" aria-hidden="true" />
  </div>
</template>

<style scoped>
.debrief {
  position: relative;
  margin: 32px 0;
  border-radius: 14px;
  background: var(--color-raised);
  border: 1px solid var(--color-border-strong);
  overflow: hidden;
}

.debrief__header {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--color-border);
}

.debrief__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(212, 168, 75, 0.15);
  border: 1px solid rgba(212, 168, 75, 0.4);
  color: var(--color-gold);
  font-size: 11px;
  flex-shrink: 0;
  line-height: 1;
}

.debrief__label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.debrief__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--color-border), transparent);
}

.debrief__body {
  padding: 20px 20px 22px;
  color: var(--color-text);
  font-size: 15px;
  line-height: 1.68;
}

.debrief__body :deep(p) { margin: 0 0 13px; }
.debrief__body :deep(p:last-child) { margin-bottom: 0; }

.debrief__body :deep(strong) {
  color: var(--color-text);
  font-weight: 700;
}

/* Subtle gold scan-line at bottom */
.debrief__base {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 168, 75, 0.35) 50%,
    transparent 100%
  );
  animation: base-pulse 3s ease-in-out infinite;
}

@keyframes base-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .debrief__base { animation: none; opacity: 0.5; }
}
</style>
