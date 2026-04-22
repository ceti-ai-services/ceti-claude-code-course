<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Polyhedron from "@/components/course/_primitives/Polyhedron.vue"
import { moduleGlyph } from "@/composables/useModuleGlyph"

interface Objective {
  label: string
}

interface Props {
  codename: string       // e.g. "M02 · INSTALL"
  moduleNumber?: string  // e.g. "02" — overrides auto-detect from codename
  title: string
  analogy?: string
  objectives?: Objective[]
  time?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  objectives: () => [],
})

// Auto-detect the two-digit module number from either the explicit prop or
// the codename string (e.g. "M02 · INSTALL" → "02").
const moduleNum = computed<string>(() => {
  if (props.moduleNumber) return props.moduleNumber.padStart(2, '0')
  const match = props.codename.match(/M(\d{1,2})/)
  return match ? match[1].padStart(2, '0') : '01'
})

const glyph = computed(() => moduleGlyph[moduleNum.value] ?? moduleGlyph['01'])

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
        <!-- Per-module polyhedron glyph -->
        <span class="mb-glyph">
          <Polyhedron
            :shape="glyph.shape"
            :size="28"
            :meaning="glyph.meaning"
            class="brief-glyph"
            aria-hidden="true"
          />
          <svg
            class="mb-transmission"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="2" />
            <path d="M8 8 C5 11 5 13 8 16" />
            <path d="M16 8 C19 11 19 13 16 16" />
          </svg>
        </span>
        <span class="mb-eyebrow">Transmission · {{ props.codename }}</span>
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

/* Glyph + antenna wrapper */
.mb-glyph {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

/* Per-module polyhedron — uses primary-edge for luminous stroke */
.brief-glyph {
  color: hsl(var(--primary-edge));
  opacity: 0.85;
  flex-shrink: 0;
}

/* Antenna SVG flair */
.mb-transmission {
  color: hsl(var(--muted-foreground));
  opacity: 0.65;
  flex-shrink: 0;
}

/* Eyebrow text — Space Mono tracking already on the parent flex */
.mb-eyebrow {
  /* inherits font-mono, tracking-[0.2em], uppercase from parent */
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
