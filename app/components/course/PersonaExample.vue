<script setup lang="ts">
import { computed, useSlots, ref, watch } from 'vue'
import { Camera, Briefcase, Wrench, Home } from 'lucide-vue-next'
import { useCustomizer } from '@/composables/useCustomizer'
import { PERSONA_LABELS } from '@/types/customizer'

const { persona, lang } = useCustomizer()
const slots = useSlots()

const iconMap = {
  creator: Camera,
  consultant: Briefcase,
  service: Wrench,
  realestate: Home,
} as const

const activePersona = computed(() => persona.value ?? 'creator')
const Icon = computed(() => iconMap[activePersona.value])

const personaLabel = computed(() =>
  PERSONA_LABELS[activePersona.value][lang.value],
)

const eyebrow = computed(() =>
  lang.value === 'es'
    ? `Para ti como ${personaLabel.value}`
    : `For you as a ${personaLabel.value}`,
)

const hasSlot = computed(() => !!slots[activePersona.value])

const fallback = computed(() =>
  lang.value === 'es'
    ? 'Ejemplo próximamente — cada persona tendrá uno.'
    : 'Example coming soon — every persona will have one.',
)

// Trigger a CSS animation whenever the active persona changes
const contentKey = ref(0)
watch(activePersona, () => { contentKey.value++ })
</script>

<template>
  <div class="scenario">
    <!-- Header: persona indicator -->
    <div class="scenario__header">
      <div class="scenario__icon-wrap" aria-hidden="true">
        <component :is="Icon" class="scenario__icon" />
      </div>
      <div class="scenario__meta">
        <div class="scenario__label">{{ eyebrow }}</div>
        <div class="scenario__note">
          {{ lang === 'es' ? 'Escenario personalizado' : 'Personalised scenario' }}
        </div>
      </div>
      <div class="scenario__indicator" aria-hidden="true">
        <span class="scenario__dot" />
      </div>
    </div>

    <!-- Body: animates on persona switch -->
    <div :key="contentKey" class="scenario__body">
      <template v-if="activePersona === 'creator' && slots.creator">
        <slot name="creator" />
      </template>
      <template v-else-if="activePersona === 'consultant' && slots.consultant">
        <slot name="consultant" />
      </template>
      <template v-else-if="activePersona === 'service' && slots.service">
        <slot name="service" />
      </template>
      <template v-else-if="activePersona === 'realestate' && slots.realestate">
        <slot name="realestate" />
      </template>
      <template v-else>
        <p class="scenario__fallback">{{ fallback }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.scenario {
  position: relative;
  margin: 24px 0;
  border-radius: 14px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  overflow: hidden;
}

/* Left gold accent */
.scenario::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--color-gold) 0%, rgba(212,168,75,0.3) 100%);
}

.scenario__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(212, 168, 75, 0.04);
}

.scenario__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(212, 168, 75, 0.12);
  border: 1px solid rgba(212, 168, 75, 0.25);
  flex-shrink: 0;
}

.scenario__icon {
  width: 14px;
  height: 14px;
  color: var(--color-gold);
}

.scenario__meta {
  flex: 1;
  min-width: 0;
}

.scenario__label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gold);
  line-height: 1.3;
}

.scenario__note {
  font-size: 12px;
  color: var(--color-dim);
  margin-top: 2px;
}

.scenario__indicator {
  flex-shrink: 0;
}

.scenario__dot {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-gold);
  animation: scenario-pulse 2.4s ease-in-out infinite;
}

@keyframes scenario-pulse {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.25); }
}

/* Content area with slide-in on persona switch */
.scenario__body {
  padding: 20px 20px 22px 22px;
  color: var(--color-text);
  font-size: 15px;
  line-height: 1.68;
  animation: scenario-body-in 380ms var(--ease-out-spring) both;
}

@keyframes scenario-body-in {
  from { opacity: 0; transform: translateX(8px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Prose style from markdown */
.scenario__body :deep(p)          { margin: 0 0 14px; }
.scenario__body :deep(p:last-child) { margin-bottom: 0; }
.scenario__body :deep(h2),
.scenario__body :deep(h3)         { margin: 20px 0 10px; font-size: 17px; font-weight: 700; }
.scenario__body :deep(ul),
.scenario__body :deep(ol)         { margin: 10px 0 14px 0; padding: 0; list-style: none; }
.scenario__body :deep(li)         { padding-left: 20px; position: relative; margin-bottom: 7px; }
.scenario__body :deep(ul li::before) {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-gold);
}
.scenario__body :deep(ol)         { counter-reset: scenario-steps; }
.scenario__body :deep(ol li)      { counter-increment: scenario-steps; }
.scenario__body :deep(ol li::before) {
  content: counter(scenario-steps, decimal) ".";
  position: absolute;
  left: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 12px;
}
.scenario__body :deep(code) {
  background: var(--color-raised);
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 0.89em;
}
.scenario__body :deep(pre) {
  background: var(--color-raised);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 16px;
  overflow-x: auto;
  font-size: 13px;
  margin: 14px 0;
}
.scenario__body :deep(strong)     { color: var(--color-text); font-weight: 700; }

.scenario__fallback {
  color: var(--color-muted);
  font-size: 14px;
}

@media (prefers-reduced-motion: reduce) {
  .scenario__dot  { animation: none; opacity: 0.7; }
  .scenario__body { animation: none; }
}
</style>
