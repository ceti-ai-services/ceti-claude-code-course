<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sparkles } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  xp: number
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: false,
})

// Current displayed value — separate from the incoming prop so we can animate.
const displayed = ref(props.xp)
const previous = ref(props.xp)
const pulsing = ref(false)
const rolling = ref(false)

watch(
  () => props.xp,
  (next, prev) => {
    if (next === prev) return
    previous.value = prev ?? next
    rolling.value = true
    pulsing.value = true
    // After the slide-up lands, swap displayed to the new total and stop rolling.
    window.setTimeout(() => {
      displayed.value = next
      rolling.value = false
    }, 400)
    // Pulse fades shortly after.
    window.setTimeout(() => {
      pulsing.value = false
    }, 700)
  },
)
</script>

<template>
  <Badge
    :class="cn(
      'gap-1.5 px-2.5 py-1 bg-card border border-border text-foreground',
      'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
      pulsing && 'scale-110',
    )"
    aria-live="polite"
    :aria-label="`${props.xp} XP`"
  >
    <Sparkles class="w-4 h-4 text-gold" />
    <span class="xp-digits font-mono text-xs font-semibold tabular-nums">
      <span v-if="!rolling" class="xp-current">{{ displayed }}</span>
      <span v-else class="xp-rolling">
        <span class="xp-prev">{{ previous }}</span>
        <span class="xp-next">{{ props.xp }}</span>
      </span>
    </span>
    <span
      v-if="props.showLabel"
      class="text-[10px] uppercase tracking-wider text-muted-foreground"
    >
      XP
    </span>
  </Badge>
</template>

<style scoped>
.xp-digits {
  display: inline-block;
  overflow: hidden;
  height: 1em;
  line-height: 1;
  min-width: 1.25em;
  text-align: right;
}
.xp-current {
  display: inline-block;
  line-height: 1;
}
.xp-rolling {
  display: inline-flex;
  flex-direction: column;
  line-height: 1;
  animation: xp-roll 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.xp-prev,
.xp-next {
  display: block;
  line-height: 1;
}
@keyframes xp-roll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-1em);
  }
}
@media (prefers-reduced-motion: reduce) {
  .xp-rolling {
    animation: none;
    transform: translateY(-1em);
  }
}
</style>
