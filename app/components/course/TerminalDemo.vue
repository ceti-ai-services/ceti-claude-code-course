<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface Line {
  kind: "prompt" | "out" | "ok" | "warn" | "meta" // prompt = user types, out = claude response, etc.
  text: string
  delay?: number // ms before starting this line
  speed?: number // chars per tick override
}

interface Props {
  title?: string // "First session · scoped to a folder"
  dir?: string // e.g. "~/Clients/Meridian/"
  lines: Line[]
  autoplay?: boolean
  replayable?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  replayable: true,
})

interface RenderedLine {
  kind: Line["kind"]
  text: string
  done: boolean
}

const rendered = ref<RenderedLine[]>([])
const running = ref(false)

const prefersReduced = computed(() => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
})

let cancelRequested = false
let timeouts: number[] = []

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const t = window.setTimeout(resolve, ms)
    timeouts.push(t)
  })
}

async function typeLine(line: Line, index: number) {
  if (cancelRequested) return
  const defaultDelay = index === 0 ? 180 : 280
  await wait(line.delay ?? defaultDelay)
  if (cancelRequested) return

  // Seed the line with empty text marked 'in progress'
  rendered.value.push({ kind: line.kind, text: "", done: false })

  const perChar = line.speed
    ?? (line.kind === "prompt" ? 28 : line.kind === "out" ? 14 : 8)

  if (prefersReduced.value) {
    rendered.value[rendered.value.length - 1]!.text = line.text
    rendered.value[rendered.value.length - 1]!.done = true
    return
  }

  for (let c = 1; c <= line.text.length; c++) {
    if (cancelRequested) return
    rendered.value[rendered.value.length - 1]!.text = line.text.slice(0, c)
    // Small jitter so it doesn't feel metronomic
    const jitter = Math.random() * 12 - 6
    await wait(Math.max(4, perChar + jitter))
  }
  rendered.value[rendered.value.length - 1]!.done = true
}

async function play() {
  if (running.value) return
  cancelRequested = false
  running.value = true
  rendered.value = []
  for (let i = 0; i < props.lines.length; i++) {
    if (cancelRequested) break
    await typeLine(props.lines[i]!, i)
  }
  running.value = false
}

function replay() {
  if (running.value) {
    cancelRequested = true
    // Give in-flight tick a moment to bail
    setTimeout(() => {
      play()
    }, 40)
  } else {
    play()
  }
}

onMounted(() => {
  if (props.autoplay) play()
})
onBeforeUnmount(() => {
  cancelRequested = true
  timeouts.forEach(clearTimeout)
})
</script>

<template>
  <Card :class="cn('my-7 overflow-hidden border-border-strong bg-card', props.class)">
    <CardContent class="p-0">
      <!-- Title bar (chrome-like) -->
      <div class="term-chrome">
        <div class="term-dots" aria-hidden="true">
          <span class="term-dot term-dot--red" />
          <span class="term-dot term-dot--yellow" />
          <span class="term-dot term-dot--green" />
        </div>
        <div class="term-title">
          {{ props.title ?? "terminal" }}
          <span v-if="props.dir" class="term-dir"> · {{ props.dir }}</span>
        </div>
        <button
          v-if="props.replayable"
          type="button"
          class="term-replay"
          @click="replay"
          :aria-label="running ? 'Restart' : 'Replay'"
        >
          <RotateCw class="w-3.5 h-3.5" :class="running && 'animate-spin'" />
          <span>{{ running ? "Running" : "Replay" }}</span>
        </button>
      </div>

      <!-- Body -->
      <pre class="term-body"><template v-for="(l, i) in rendered" :key="i"><span :class="['term-line', `term-line--${l.kind}`]"><span
              v-if="l.kind === 'prompt'"
              class="term-arrow"
            >{{ props.dir ? "➜ " : "$ " }}</span><span>{{ l.text }}</span><span
              v-if="!l.done"
              class="term-caret"
            /></span><br v-if="i < rendered.length - 1" /></template><span
          v-if="!running && rendered.length === 0"
          class="term-line term-line--meta"
        >[ ready ]</span></pre>
    </CardContent>
  </Card>
</template>

<style scoped>
.term-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-raised);
}

.term-dots {
  display: inline-flex;
  gap: 6px;
}
.term-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: block;
}
.term-dot--red {
  background: #ff5f57;
}
.term-dot--yellow {
  background: #febc2e;
}
.term-dot--green {
  background: #28c840;
}

.term-title {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-muted);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.term-dir {
  color: var(--color-gold);
}

.term-replay {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: color 180ms ease, border-color 180ms ease;
}
.term-replay:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

.term-body {
  margin: 0;
  padding: 16px 18px 18px;
  background: #0b0b0d;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.55;
  min-height: 160px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.term-line {
  display: inline;
}
.term-line--prompt {
  color: var(--color-text);
}
.term-line--out {
  color: var(--color-muted);
}
.term-line--ok {
  color: var(--color-gold);
}
.term-line--warn {
  color: var(--color-danger);
}
.term-line--meta {
  color: var(--color-dim);
  font-style: italic;
}
.term-arrow {
  color: var(--color-gold);
}
.term-caret {
  display: inline-block;
  width: 7px;
  height: 1em;
  background: var(--color-gold);
  margin-left: 1px;
  vertical-align: -2px;
  animation: term-blink 900ms steps(1) infinite;
}
@keyframes term-blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .term-caret {
    animation: none;
  }
}
</style>
