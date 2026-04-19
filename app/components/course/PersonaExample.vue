<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { Camera, Briefcase, Wrench, Home } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
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

if (import.meta.dev && typeof window !== 'undefined' && !hasSlot.value) {
  // Dev-mode warning when a persona-specific example is missing.
  // eslint-disable-next-line no-console
  console.warn(
    `[PersonaExample] No slot content for persona "${activePersona.value}". Add a <template #${activePersona.value}>…</template>.`,
  )
}

const fallback = computed(() =>
  lang.value === 'es'
    ? 'Ejemplo próximamente — cada persona tendrá uno.'
    : 'Example coming soon — every persona will have one.',
)
</script>

<template>
  <Card class="my-6 border-l-4 border-l-gold">
    <CardContent class="pt-5 pb-5">
      <div
        class="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-gold mb-3"
      >
        <component :is="Icon" class="w-3.5 h-3.5" />
        <span>{{ eyebrow }}</span>
      </div>

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
        <p class="text-muted-foreground text-sm leading-relaxed">
          {{ fallback }}
        </p>
      </template>
    </CardContent>
  </Card>
</template>
