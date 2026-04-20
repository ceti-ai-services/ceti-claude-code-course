<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Radio } from "lucide-vue-next"

interface Objective {
  label: string
}

interface Props {
  codename: string // e.g. "M01 · MENTAL MODEL"
  title: string // "You already have AI..."
  analogy?: string // short operator-voice subtitle: "Think vending machine vs. colleague"
  objectives?: Objective[]
  time?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  objectives: () => [],
})

const visible = ref(false)
onMounted(() => {
  // Stagger-in next tick so CSS transitions fire
  requestAnimationFrame(() => {
    requestAnimationFrame(() => (visible.value = true))
  })
})
</script>

<template>
  <Card
    :class="cn(
      'mission-brief relative overflow-hidden border-border-strong bg-card/90',
      'backdrop-blur my-8',
      props.class,
    )"
  >
    <!-- Scanning highlight line -->
    <div class="scan-line" aria-hidden="true" />

    <CardContent class="relative px-6 py-7 md:px-8 md:py-9">
      <!-- Codename + signal -->
      <div
        class="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4"
        :class="visible ? 'mb-4' : ''"
      >
        <Radio class="w-3 h-3 animate-pulse" />
        <span>Transmission · {{ props.codename }}</span>
        <span v-if="props.time" class="ml-auto text-muted-foreground tracking-normal normal-case font-normal">
          {{ props.time }}
        </span>
      </div>

      <!-- Title staggered reveal -->
      <h1
        class="font-display text-3xl md:text-[40px] font-bold tracking-tight leading-[1.1] text-foreground"
        :class="[
          'reveal-line',
          visible && 'reveal-line--on',
        ]"
        style="--reveal-delay: 60ms"
      >
        {{ props.title }}
      </h1>

      <!-- Analogy line -->
      <p
        v-if="props.analogy"
        class="mt-4 text-lg md:text-xl text-muted-foreground leading-snug max-w-2xl"
        :class="['reveal-line', visible && 'reveal-line--on']"
        style="--reveal-delay: 220ms"
      >
        {{ props.analogy }}
      </p>

      <!-- Objective chips -->
      <div
        v-if="props.objectives.length"
        class="mt-6 flex flex-wrap gap-2"
        :class="['reveal-line', visible && 'reveal-line--on']"
        style="--reveal-delay: 380ms"
      >
        <Badge
          v-for="(obj, i) in props.objectives"
          :key="obj.label"
          variant="outline"
          class="border-border-strong text-muted-foreground py-1 px-3 font-normal"
          :style="{ transitionDelay: `${420 + i * 70}ms` }"
        >
          <span class="text-gold mr-1.5">•</span>
          {{ obj.label }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.mission-brief {
  --brief-radius: 14px;
  border-radius: var(--brief-radius);
  background:
    linear-gradient(180deg, rgba(212, 168, 75, 0.04) 0%, transparent 70%),
    var(--color-surface);
}

/* Subtle top gold hairline */
.mission-brief::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-gold) 30%,
    var(--color-gold) 70%,
    transparent 100%
  );
  opacity: 0.5;
}

/* Soft scanning sweep on mount */
.scan-line {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 168, 75, 0.06) 48%,
    rgba(212, 168, 75, 0.16) 50%,
    rgba(212, 168, 75, 0.06) 52%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: scan-sweep 1.4s var(--ease-out-spring) 0.2s 1 both;
}

@keyframes scan-sweep {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

/* Staggered line reveal */
.reveal-line {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 560ms var(--ease-out-spring),
    transform 560ms var(--ease-out-spring);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal-line--on {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .scan-line {
    animation: none;
    opacity: 0;
  }
  .reveal-line {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
