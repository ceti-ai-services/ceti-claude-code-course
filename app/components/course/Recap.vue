<script setup lang="ts">
import Polyhedron from "@/components/course/_primitives/Polyhedron.vue"
// No props — Recap is a fixed structural block
</script>

<template>
  <div class="recap">
    <div class="recap__header">
      <!-- Dodecahedron: the whole / completeness / cosmos -->
      <Polyhedron
        shape="dodecahedron"
        :size="28"
        class="recap__glyph"
        aria-hidden="true"
      />
      <span class="recap__label">Recap</span>
      <div class="recap__line" aria-hidden="true" />
    </div>

    <div class="recap__body">
      <slot />
    </div>

    <!-- Subtle secondary scan-line at bottom -->
    <div class="recap__base" aria-hidden="true" />
  </div>
</template>

<style scoped>
.recap {
  position: relative;
  margin: 32px 0;
  border-radius: 14px;
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--border));
  overflow: hidden;
}

/* Dark mode: deeper bg + secondary-edge glow */
:global(body.dark) .recap {
  background: hsl(var(--card));
  border-color: hsl(var(--secondary-edge) / 0.28);
  box-shadow: inset 3px 0 0 0 hsl(var(--secondary-edge)),
              0 0 24px -8px hsl(var(--secondary-edge) / 0.14);
}

.recap__header {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 18px;
  border-bottom: 1px solid hsl(var(--border));
}

.recap__glyph {
  color: hsl(var(--secondary-edge));
  flex-shrink: 0;
}

.recap__label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.recap__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, hsl(var(--border)), transparent);
}

.recap__body {
  padding: 20px 20px 22px;
  color: hsl(var(--foreground));
  font-size: 15px;
  line-height: 1.68;
}

.recap__body :deep(p) { margin: 0 0 13px; }
.recap__body :deep(p:last-child) { margin-bottom: 0; }

.recap__body :deep(ul),
.recap__body :deep(ol) {
  margin: 8px 0 14px 0;
  padding: 0;
  list-style: none;
}
.recap__body :deep(li) {
  padding-left: 20px;
  position: relative;
  margin-bottom: 7px;
  color: hsl(var(--foreground));
}
.recap__body :deep(ul li::before) {
  content: "→";
  position: absolute;
  left: 0;
  color: hsl(var(--secondary-edge));
}

.recap__body :deep(strong) {
  color: hsl(var(--foreground));
  font-weight: 700;
}

/* Subtle secondary scan-line at bottom */
.recap__base {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsl(var(--secondary-edge) / 0.35) 50%,
    transparent 100%
  );
  animation: base-pulse 3s ease-in-out infinite;
}

@keyframes base-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .recap__base { animation: none; opacity: 0.5; }
}
</style>
