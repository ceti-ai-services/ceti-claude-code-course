<script setup lang="ts">
import { ref } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleCheck, Plus } from "lucide-vue-next"

interface Item {
  label: string
  summary: string // one-liner
  body?: string // longer HTML / text revealed on open
  code?: string // optional code block
}

interface Props {
  items: Item[]
  title?: string
  eyebrow?: string // "Brief · 4 questions"
  checkable?: boolean // show check state per card
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  checkable: false,
})

const openIdx = ref<number | null>(null)
const checked = ref<Record<number, boolean>>({})

function toggle(i: number) {
  openIdx.value = openIdx.value === i ? null : i
}
function check(i: number, e: Event) {
  e.stopPropagation()
  checked.value = { ...checked.value, [i]: !checked.value[i] }
}
</script>

<template>
  <Card :class="cn('my-8 border-border-strong bg-card', props.class)">
    <CardContent class="px-5 py-6 md:px-7 md:py-7">
      <div
        v-if="props.eyebrow"
        class="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-2"
      >
        <span>{{ props.eyebrow }}</span>
        <span class="h-px flex-1 bg-border" />
      </div>
      <div
        v-if="props.title"
        class="font-display text-xl font-semibold mb-4"
      >
        {{ props.title }}
      </div>

      <ol class="sr-grid">
        <li v-for="(it, i) in props.items" :key="it.label">
          <button
            type="button"
            :class="[
              'sr-card',
              openIdx === i && 'sr-card--open',
              checked[i] && 'sr-card--done',
            ]"
            :aria-expanded="openIdx === i"
            @click="toggle(i)"
          >
            <div class="sr-card__head">
              <div class="sr-card__num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="sr-card__text">
                <div class="sr-card__label">{{ it.label }}</div>
                <div class="sr-card__summary">{{ it.summary }}</div>
              </div>
              <div class="sr-card__actions" v-if="props.checkable">
                <span
                  :class="['sr-check', checked[i] && 'sr-check--on']"
                  @click="(e) => check(i, e)"
                  role="checkbox"
                  :aria-checked="!!checked[i]"
                  tabindex="0"
                  @keydown.space.prevent="(e) => check(i, e)"
                >
                  <CircleCheck v-if="checked[i]" class="w-3.5 h-3.5" />
                  <Plus v-else class="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            <div class="sr-card__body" :hidden="openIdx !== i">
              <div v-if="it.body" v-html="it.body" class="sr-body-text" />
              <pre v-if="it.code" class="sr-code">{{ it.code }}</pre>
            </div>
          </button>
        </li>
      </ol>
    </CardContent>
  </Card>
</template>

<style scoped>
.sr-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.sr-card {
  width: 100%;
  display: block;
  text-align: left;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 14px 16px;
  cursor: pointer;
  transition:
    border-color 260ms var(--ease-out-spring),
    background 260ms var(--ease-out-spring),
    transform 260ms var(--ease-out-spring);
  font: inherit;
  color: inherit;
}
.sr-card:hover {
  border-color: var(--color-border-strong);
}
.sr-card:focus-visible {
  outline: none;
  border-color: var(--color-gold);
}
.sr-card--open {
  border-color: var(--color-gold);
  background: rgba(212, 168, 75, 0.04);
}
.sr-card--done {
  border-color: var(--color-gold-dim);
}

.sr-card__head {
  display: flex;
  align-items: center;
  gap: 14px;
}
.sr-card__num {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--color-dim);
  flex-shrink: 0;
  width: 22px;
}
.sr-card__text {
  flex: 1;
  min-width: 0;
}
.sr-card__label {
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.005em;
}
.sr-card__summary {
  font-size: 13px;
  color: var(--color-muted);
  margin-top: 2px;
  line-height: 1.5;
}

.sr-card__actions {
  flex-shrink: 0;
}
.sr-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid var(--color-border-strong);
  color: var(--color-muted);
  cursor: pointer;
  transition:
    color 220ms ease,
    border-color 220ms ease,
    background 220ms ease;
}
.sr-check:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}
.sr-check--on {
  background: var(--color-gold);
  color: #15110a;
  border-color: var(--color-gold);
}

.sr-card__body {
  overflow: hidden;
  animation: sr-in 320ms var(--ease-out-spring);
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--color-border);
}
.sr-card__body[hidden] {
  display: none;
}

.sr-body-text {
  color: var(--color-text);
  font-size: 14px;
  line-height: 1.65;
}
.sr-body-text :deep(p) {
  margin: 0 0 8px;
}
.sr-body-text :deep(p:last-child) {
  margin-bottom: 0;
}

.sr-code {
  margin: 10px 0 0;
  padding: 10px 12px;
  background: var(--color-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-muted);
  overflow-x: auto;
}

@keyframes sr-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sr-card__body {
    animation: none;
  }
}
</style>
