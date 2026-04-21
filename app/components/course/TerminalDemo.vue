<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCw } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import CopyButton from "@/components/course/_primitives/CopyButton.vue"

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

// Whole-block copy text = every line's raw source joined with newlines,
// using the same '$ '/'➜ ' prefix readers see in the UI so the pasted
// transcript matches the visible replay. Per §copy-decision we pick
// whole-block here because TerminalDemo mixes prompt + out + ok lines in
// a narrative sequence; individual prompt-line copy would lose the
// output context.
const fullTranscript = computed(() => {
  return props.lines
    .map((l) => {
      if (l.kind === "prompt") {
        return `${props.dir ? "➜ " : "$ "}${l.text}`
      }
      return l.text
    })
    .join("\n")
})

onMounted(() => {
  if (props.autoplay) play()
})
onBeforeUnmount(() => {
  cancelRequested = true
  timeouts.forEach(clearTimeout)
})
</script>

<template>
  <Card :class="cn('my-7 overflow-hidden term-card copy-host', props.class)">
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
      <CopyButton :text="fullTranscript" label="Copy transcript" />
    </CardContent>
  </Card>
</template>

<style scoped>
/* Palette-aware terminal card — §Terminal surface rule.
   Dark mode: deeper than card bg, hue-tinted (--terminal-bg).
   Light mode: warm-cream (--terminal-bg). */
.term-card {
  background: hsl(var(--terminal-bg));
  border: 1px solid hsl(var(--border));
  position: relative;
}
:global(body.dark) .term-card {
  box-shadow: 0 0 0 1px hsl(var(--border)), 0 6px 20px rgba(0, 0, 0, 0.35);
}

.term-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid hsl(var(--border));
  background: hsl(var(--foreground) / 0.05);
}
:global(body.dark) .term-chrome {
  background: hsl(var(--foreground) / 0.06);
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
/* Traffic-light dots map to palette edge colors so each mode still has
   the mac-terminal cue but it harmonizes with the selected palette. */
.term-dot--red {
  background: hsl(var(--accent-edge));
}
.term-dot--yellow {
  background: hsl(var(--primary-edge));
}
.term-dot--green {
  background: hsl(var(--secondary-edge));
}

.term-title {
  font-family: var(--font-mono);
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.term-dir {
  color: hsl(var(--primary-edge));
}

.term-replay {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: transparent;
  border: 1px solid hsl(var(--border));
  border-radius: 999px;
  color: hsl(var(--muted-foreground));
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: color 180ms ease, border-color 180ms ease;
}
.term-replay:hover {
  color: hsl(var(--primary-edge));
  border-color: hsl(var(--primary-edge));
}

.term-body {
  margin: 0;
  padding: 16px 18px 18px;
  background: hsl(var(--terminal-bg));
  color: hsl(var(--terminal-fg));
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
  color: hsl(var(--terminal-fg));
}
.term-line--out {
  color: hsl(var(--muted-foreground));
}
.term-line--ok {
  color: hsl(var(--secondary-edge));
}
.term-line--warn {
  color: hsl(var(--accent-edge));
}
.term-line--meta {
  color: hsl(var(--muted-foreground) / 0.7);
  font-style: italic;
}
.term-arrow {
  color: hsl(var(--primary-edge));
}
.term-caret {
  display: inline-block;
  width: 7px;
  height: 1em;
  background: hsl(var(--primary-edge));
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
