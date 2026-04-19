<script setup lang="ts">
import { computed } from 'vue'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCustomizer } from '@/composables/useCustomizer'
import type { Lang } from '@/types/customizer'

const { lang, setCustomizer } = useCustomizer()

const active = computed<Lang>(() => lang.value)

function pick(next: Lang) {
  if (next === active.value) return
  setCustomizer({ lang: next })
}
</script>

<template>
  <Card
    class="flex p-1 gap-1 bg-card border-border min-w-[100px] rounded-[var(--radius)] shadow-none"
  >
    <button
      type="button"
      :aria-pressed="active === 'en'"
      :class="cn(
        'flex-1 px-3 py-1 text-xs font-semibold rounded-[calc(var(--radius)-2px)]',
        'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        active === 'en'
          ? 'bg-gold text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )"
      @click="pick('en')"
    >
      EN
    </button>
    <button
      type="button"
      :aria-pressed="active === 'es'"
      :class="cn(
        'flex-1 px-3 py-1 text-xs font-semibold rounded-[calc(var(--radius)-2px)]',
        'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        active === 'es'
          ? 'bg-gold text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )"
      @click="pick('es')"
    >
      ES
    </button>
  </Card>
</template>
