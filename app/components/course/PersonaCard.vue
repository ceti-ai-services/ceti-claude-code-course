<script setup lang="ts">
import { computed } from 'vue'
import { Camera, Briefcase, Wrench, Home } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCustomizer } from '@/composables/useCustomizer'
import type { Persona } from '@/types/customizer'
import { PERSONA_LABELS } from '@/types/customizer'

interface Props {
  persona: Persona
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
})

const { lang } = useCustomizer()

const iconMap = {
  creator: Camera,
  consultant: Briefcase,
  service: Wrench,
  realestate: Home,
} as const

const Icon = computed(() => iconMap[props.persona])
const label = computed(() => PERSONA_LABELS[props.persona][lang.value])
const oneLine = computed(() => PERSONA_LABELS[props.persona].oneLine[lang.value])
</script>

<template>
  <Card
    :class="cn(
      'flex flex-col items-center justify-center text-center gap-3 min-h-[180px] p-6',
      'rounded-[var(--radius-xl)] cursor-pointer select-none',
      'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
      'hover:-translate-y-0.5 hover:ring-2 hover:ring-gold hover:ring-offset-2 hover:ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      selected
        ? 'border-gold bg-gold-dim ring-2 ring-gold ring-offset-2 ring-offset-background'
        : 'border-border',
    )"
    tabindex="0"
    role="button"
    :aria-pressed="selected"
  >
    <component
      :is="Icon"
      :class="cn(
        'transition-colors duration-200',
        selected ? 'text-gold' : 'text-muted-foreground',
      )"
      :size="48"
      :stroke-width="1.5"
    />
    <div
      class="font-display uppercase tracking-wider text-base font-semibold text-foreground"
    >
      {{ label }}
    </div>
    <div class="text-xs text-muted-foreground leading-snug max-w-[22ch]">
      {{ oneLine }}
    </div>
  </Card>
</template>
