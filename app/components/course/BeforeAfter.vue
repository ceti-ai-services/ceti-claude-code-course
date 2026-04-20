<script setup lang="ts">
import { ref, computed } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SideContent {
  label: string // "Vending machine"
  caption: string // short neutral description
  bullets?: string[]
}

interface Props {
  before: SideContent
  after: SideContent
  title?: string // optional "The shift"
  class?: string
}

const props = defineProps<Props>()

const showAfter = ref(false)

const toggleLabel = computed(() =>
  showAfter.value ? props.before.label : props.after.label,
)

function toggle() {
  showAfter.value = !showAfter.value
}
function setSide(val: boolean) {
  showAfter.value = val
}
</script>

<template>
  <Card :class="cn('my-8 overflow-hidden border-border-strong bg-card', props.class)">
    <CardContent class="p-0">
      <!-- Header with toggle pill -->
      <div class="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div class="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
          {{ props.title ?? "Compare" }}
        </div>
        <div class="ba-pill ml-auto" role="tablist" aria-label="Compare">
          <button
            type="button"
            role="tab"
            :aria-selected="!showAfter"
            :class="['ba-pill__btn', !showAfter && 'ba-pill__btn--on']"
            @click="setSide(false)"
          >
            {{ props.before.label }}
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="showAfter"
            :class="['ba-pill__btn', showAfter && 'ba-pill__btn--on']"
            @click="setSide(true)"
          >
            {{ props.after.label }}
          </button>
        </div>
      </div>

      <!-- Morphing panel -->
      <div class="ba-stage">
        <!-- Before panel -->
        <div
          :class="['ba-panel', !showAfter && 'ba-panel--on']"
          :aria-hidden="showAfter"
        >
          <div class="ba-caption">{{ props.before.caption }}</div>
          <ul v-if="props.before.bullets" class="ba-list">
            <li v-for="(b, i) in props.before.bullets" :key="i">{{ b }}</li>
          </ul>
        </div>
        <!-- After panel -->
        <div
          :class="['ba-panel ba-panel--after', showAfter && 'ba-panel--on']"
          :aria-hidden="!showAfter"
        >
          <div class="ba-caption">{{ props.after.caption }}</div>
          <ul v-if="props.after.bullets" class="ba-list">
            <li v-for="(b, i) in props.after.bullets" :key="i">{{ b }}</li>
          </ul>
        </div>
      </div>

      <!-- Tap hint on mobile -->
      <button
        type="button"
        class="ba-tap"
        @click="toggle"
      >
        Tap to switch to {{ toggleLabel }} →
      </button>
    </CardContent>
  </Card>
</template>

<style scoped>
.ba-pill {
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  border-radius: 999px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}
.ba-pill__btn {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  color: var(--color-muted);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 260ms var(--ease-out-spring);
}
.ba-pill__btn--on {
  background: var(--color-gold);
  color: #15110a;
}
.ba-pill__btn:hover:not(.ba-pill__btn--on) {
  color: var(--color-text);
}

.ba-stage {
  position: relative;
  min-height: 180px;
  padding: 22px 20px 6px;
  overflow: hidden;
}

.ba-panel {
  position: absolute;
  inset: 22px 20px 22px;
  opacity: 0;
  transform: translateY(10px) scale(0.99);
  pointer-events: none;
  transition:
    opacity 420ms var(--ease-out-spring),
    transform 420ms var(--ease-out-spring),
    filter 420ms var(--ease-out-spring);
  filter: blur(2px);
}
.ba-panel--on {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
  filter: blur(0);
}
.ba-panel--after {
  border-left: 2px solid transparent;
}
.ba-panel--after.ba-panel--on {
  border-color: rgba(212, 168, 75, 0.4);
  padding-left: 14px;
  margin-left: -14px;
}

.ba-caption {
  color: var(--color-text);
  font-size: 16px;
  line-height: 1.55;
  max-width: 46rem;
}

.ba-list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.6;
  display: grid;
  gap: 6px;
}
.ba-list li {
  padding-left: 18px;
  position: relative;
}
.ba-list li::before {
  content: "→";
  color: var(--color-gold);
  position: absolute;
  left: 0;
}

.ba-tap {
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background: var(--color-raised);
  border: none;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 13px;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: color 220ms ease;
}
.ba-tap:hover {
  color: var(--color-gold);
}

@media (prefers-reduced-motion: reduce) {
  .ba-panel {
    transition: none;
    filter: none;
  }
}
</style>
