<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch, CircleCheck } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Option {
  label: string
  slot: string
  xp?: number
}

interface Props {
  prompt: string
  options: Option[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  pick: [payload: { label: string; xp: number }]
}>()

const slots = useSlots()
const pickedIndex = ref<number | null>(null)

const picked = computed(() =>
  pickedIndex.value === null ? null : props.options[pickedIndex.value] ?? null,
)

function pick(i: number) {
  if (pickedIndex.value !== null) return
  pickedIndex.value = i
  const chosen = props.options[i]
  if (!chosen) return
  emit('pick', { label: chosen.label, xp: chosen.xp ?? 0 })
}
</script>

<template>
  <Card class="my-8 border-border bg-card">
    <CardHeader class="pb-3">
      <div
        class="flex items-center gap-2 font-display uppercase tracking-wider text-xs text-gold mb-2"
      >
        <GitBranch class="w-3.5 h-3.5" />
        <span>What would you do?</span>
      </div>
      <CardTitle class="text-xl font-semibold leading-snug">
        {{ props.prompt }}
      </CardTitle>
    </CardHeader>
    <CardContent class="pt-0 space-y-3">
      <Button
        v-for="(opt, i) in props.options"
        :key="i"
        variant="outline"
        :disabled="pickedIndex !== null && pickedIndex !== i"
        :class="cn(
          'w-full justify-start text-left h-auto py-4 px-5 whitespace-normal font-medium text-base',
          'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          pickedIndex === i && 'border-gold text-foreground bg-gold-dim',
          pickedIndex !== null && pickedIndex !== i && 'opacity-40',
        )"
        @click="pick(i)"
      >
        <span class="flex-1">{{ opt.label }}</span>
        <CircleCheck
          v-if="pickedIndex === i"
          class="w-4 h-4 text-gold shrink-0"
        />
      </Button>

      <!-- Revealed content for the chosen option -->
      <div
        v-if="picked && slots[picked.slot]"
        class="fork-reveal mt-6 pt-6 border-t border-border"
      >
        <div
          class="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-gold mb-3"
        >
          <CircleCheck class="w-3.5 h-3.5" />
          <span>You picked: {{ picked.label }}</span>
        </div>
        <div class="text-foreground/90 leading-relaxed">
          <slot :name="picked.slot" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.fork-reveal {
  animation: fork-in 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes fork-in {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    max-height: 2000px;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .fork-reveal {
    animation: none;
  }
}
</style>
