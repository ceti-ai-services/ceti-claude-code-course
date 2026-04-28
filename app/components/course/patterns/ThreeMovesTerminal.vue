<!--
  ThreeMovesTerminal — three phase-stamp chips in a row, three lines of
  terminal dialogue below. Stamps and lines reveal in sequence; active
  line has a blinking cursor. Auto-cycles at 2400ms.

  Pattern ref: PATTERNS.md §18 · diagrams-rb.jsx V6ThreeMoves.
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import CopyButton from "@/components/course/_primitives/CopyButton.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type TermMove = { stamp: string; role: Role; line: string; reply?: string }

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    dir?: string
    moves: TermMove[]
    cycleMs?: number
  }>(),
  { caption: "", dir: "~/Clients/Meridian", cycleMs: 2400 },
)

const clampedMoves = computed(() => props.moves.slice(0, 3))

const step = ref(0)
const reducedMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function startCycle() {
  if (reducedMotion.value || clampedMoves.value.length < 2) {
    step.value = clampedMoves.value.length - 1
    return
  }
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    step.value = (step.value + 1) % clampedMoves.value.length
  }, props.cycleMs)
}

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  startCycle()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function roleEdge(role: Role) {
  return `hsl(var(--${role}-edge))`
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="260">
    <div class="tm-frame" role="group" :aria-label="title">
      <header class="tm-stamps">
        <span
          v-for="(m, i) in clampedMoves"
          :key="m.stamp + i"
          class="tm-stamp"
          :class="[`tm-stamp--${m.role}`, { 'tm-stamp--on': step >= i }]"
        >
          {{ m.stamp }}
        </span>
      </header>

      <div class="tm-chrome">
        <span class="tm-dot tm-dot--accent" aria-hidden="true" />
        <span class="tm-dot tm-dot--primary" aria-hidden="true" />
        <span class="tm-dot tm-dot--secondary" aria-hidden="true" />
        <span class="tm-path">{{ dir }}</span>
      </div>

      <div class="tm-body">
        <div
          v-for="(m, i) in clampedMoves"
          :key="m.line + i"
          class="tm-block"
          :class="{ 'tm-block--revealed': step >= i }"
        >
          <div class="tm-cmd copy-host">
            <span class="tm-prompt" :style="{ color: roleEdge(m.role) }">›</span>
            <span class="tm-text">{{ m.line }}</span>
            <CopyButton :text="m.line" label="Copy command" class="tm-copy" />
          </div>
          <div v-if="m.reply" class="tm-reply">
            {{ m.reply }}
            <span v-if="step === i && !reducedMotion" class="tm-cursor">▌</span>
          </div>
        </div>
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.tm-frame {
  width: 100%;
  max-width: 460px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 10px;
  padding: 12px 14px 14px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: hsl(var(--foreground));
  box-shadow: 0 2px 8px hsl(var(--foreground) / 0.08);
}
:global(body.dark) .tm-frame {
  box-shadow: 0 0 0 1px hsl(var(--border)), 0 6px 18px rgba(0, 0, 0, 0.35);
}

.tm-stamps {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}
.tm-stamp {
  font-size: 9.5px;
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.35;
  transition: opacity 0.3s var(--ease-out-spring);
}
.tm-stamp--on { opacity: 1; }
.tm-stamp--primary   { background: hsl(var(--primary));   color: hsl(var(--primary-foreground)); }
.tm-stamp--secondary { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
.tm-stamp--accent    { background: hsl(var(--accent));    color: hsl(var(--accent-foreground)); }
.tm-stamp--support   { background: hsl(var(--support));   color: hsl(var(--support-foreground)); }
:global(body.dark) .tm-stamp--primary   { border: 1px solid hsl(var(--primary-edge) / 0.6); }
:global(body.dark) .tm-stamp--secondary { border: 1px solid hsl(var(--secondary-edge) / 0.6); }
:global(body.dark) .tm-stamp--accent    { border: 1px solid hsl(var(--accent-edge) / 0.6); }
:global(body.dark) .tm-stamp--support   { border: 1px solid hsl(var(--support-edge) / 0.6); }

.tm-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-bottom: 1px solid hsl(var(--border));
  margin-bottom: 10px;
}
.tm-dot {
  width: 8px; height: 8px; border-radius: 50%;
  flex: 0 0 8px;
}
.tm-dot--accent    { background: hsl(var(--accent-edge)); }
.tm-dot--primary   { background: hsl(var(--primary-edge)); }
.tm-dot--secondary { background: hsl(var(--secondary-edge)); }
.tm-path {
  flex: 1;
  text-align: center;
  font-size: 10px;
  color: hsl(var(--muted-foreground));
}

.tm-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tm-block {
  opacity: 0.25;
  transition: opacity 0.4s var(--ease-out-spring);
}
.tm-block--revealed { opacity: 1; }

.tm-cmd {
  display: flex;
  gap: 6px;
  line-height: 1.45;
  position: relative;
  padding-right: 30px;
}
.tm-cmd :deep(.tm-copy) {
  top: -2px;
  right: 0;
  width: 22px;
  height: 22px;
  padding: 0;
  background: transparent;
  border-color: hsl(var(--border) / 0.6);
}
.tm-prompt { font-weight: 700; }
.tm-text { flex: 1; }

.tm-reply {
  color: hsl(var(--muted-foreground));
  padding-left: 14px;
  font-size: 11px;
  line-height: 1.45;
  margin-top: 2px;
}
.tm-cursor {
  display: inline-block;
  margin-left: 2px;
  animation: tm-blink 1s steps(2, end) infinite;
  color: hsl(var(--foreground));
}

@keyframes tm-blink {
  0%, 60% { opacity: 1; }
  70%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .tm-block, .tm-stamp { transition: none; }
  .tm-cursor { animation: none; opacity: 1; }
}

/* Mobile: allow the stamps row to wrap, tighten chrome, and reduce text. */
@media (max-width: 640px) {
  .tm-frame { padding: 10px 12px 12px; }
  .tm-stamps {
    flex-wrap: wrap;
    gap: 4px;
  }
  .tm-stamp {
    font-size: 9px;
    padding: 3px 6px;
  }
  .tm-path {
    font-size: 9.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tm-cmd { font-size: 11px; }
  .tm-reply { font-size: 10.5px; }
}
</style>
