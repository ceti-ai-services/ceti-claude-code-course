<script setup lang="ts">
import { ref } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ConceptItem {
  icon?: string // lucide icon name, rendered via dynamic component
  number?: string // "01" etc — displayed if no icon
  label: string // "Same model"
  body: string // short description
  detail?: string // longer HTML revealed on hover/focus
}

interface Props {
  items: ConceptItem[]
  eyebrow?: string
  class?: string
}

const props = defineProps<Props>()
const hovered = ref<number | null>(null)
</script>

<template>
  <div :class="cn('concept-grid my-8', props.class)">
    <div
      v-if="props.eyebrow"
      class="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4"
    >
      <span>{{ props.eyebrow }}</span>
      <span class="h-px flex-1 bg-border" />
    </div>

    <div class="grid gap-3" :class="items.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : items.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'">
      <div
        v-for="(item, i) in props.items"
        :key="item.label"
        class="concept-tile"
        :class="{ 'concept-tile--hovered': hovered === i }"
        tabindex="0"
        @mouseenter="hovered = i"
        @mouseleave="hovered = null"
        @focusin="hovered = i"
        @focusout="hovered = null"
      >
        <!-- Number badge -->
        <div class="concept-tile__num">{{ item.number ?? String(i + 1).padStart(2, '0') }}</div>

        <!-- Content -->
        <div class="concept-tile__content">
          <div class="concept-tile__label">{{ item.label }}</div>
          <div class="concept-tile__body">{{ item.body }}</div>

          <!-- Detail panel — fade in on hover/focus -->
          <div
            v-if="item.detail"
            class="concept-tile__detail"
            :class="hovered === i && 'concept-tile__detail--on'"
            v-html="item.detail"
          />
        </div>

        <!-- Active accent bar -->
        <div class="concept-tile__bar" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.concept-tile {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: default;
  transition:
    border-color 280ms var(--ease-out-spring),
    box-shadow 280ms var(--ease-out-spring),
    transform 280ms var(--ease-out-spring);
  outline: none;
  overflow: hidden;
}
.concept-tile:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
.concept-tile--hovered {
  border-color: rgba(212, 168, 75, 0.35);
  box-shadow: 0 0 0 1px rgba(212, 168, 75, 0.12), 0 4px 20px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

.concept-tile__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 340ms var(--ease-out-spring);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}
.concept-tile--hovered .concept-tile__bar {
  transform: scaleX(1);
}

.concept-tile__num {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-gold);
  margin-bottom: 12px;
  opacity: 0.7;
}
.concept-tile__label {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
  font-family: var(--font-display);
  letter-spacing: -0.01em;
}
.concept-tile__body {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.6;
}
.concept-tile__detail {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.6;
  margin-top: 10px;
  border-top: 1px solid var(--color-border);
  padding-top: 10px;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 400ms var(--ease-out-spring),
    opacity 300ms ease;
}
.concept-tile__detail--on {
  max-height: 200px;
  opacity: 1;
}
.concept-tile__content :deep(p) { margin: 0; }

@media (prefers-reduced-motion: reduce) {
  .concept-tile,
  .concept-tile__bar,
  .concept-tile__detail {
    transition: none;
    animation: none;
  }
}
</style>
