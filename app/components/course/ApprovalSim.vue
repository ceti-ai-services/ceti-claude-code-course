<script setup lang="ts">
import { ref, computed } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, X, RotateCcw } from "lucide-vue-next"

type SimState = "idle" | "pending" | "approved" | "denied"

interface DiffLine {
  kind: "remove" | "add" | "context" | "meta"
  text: string
}

interface Props {
  title?: string
  prompt?: string // the user's initial question
  filename?: string
  diff?: DiffLine[]
  approveOutcome?: string
  denyOutcome?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: "claude · approval loop",
  prompt: "fix the formatting in meeting-notes.md",
  filename: "meeting-notes.md",
  diff: () => [
    { kind: "context", text: "## Agenda" },
    { kind: "remove", text: "- action items    with spacing" },
    { kind: "add", text: "- Action items with consistent spacing" },
    { kind: "remove", text: "- follow up next week  " },
    { kind: "add", text: "- Follow up next week" },
    { kind: "context", text: "" },
  ],
  approveOutcome: "Applied to meeting-notes.md. No other files touched.",
  denyOutcome: "No changes made. You stay in control.",
})

const state = ref<SimState>("idle")
const typedPrompt = ref("")
const promptDone = ref(false)
let typeTimer: ReturnType<typeof setTimeout> | null = null

function startSim() {
  if (state.value !== "idle") return
  state.value = "pending"
  typedPrompt.value = ""
  promptDone.value = false

  const full = props.prompt ?? ""
  let i = 0
  function typeChar() {
    if (i < full.length) {
      typedPrompt.value += full[i++]
      typeTimer = setTimeout(typeChar, 38 + Math.random() * 30)
    } else {
      promptDone.value = true
    }
  }
  typeChar()
}

function approve() {
  if (state.value !== "pending" || !promptDone.value) return
  state.value = "approved"
}

function deny() {
  if (state.value !== "pending" || !promptDone.value) return
  state.value = "denied"
}

function reset() {
  if (typeTimer) clearTimeout(typeTimer)
  state.value = "idle"
  typedPrompt.value = ""
  promptDone.value = false
}

const diffClass = (kind: DiffLine["kind"]) => {
  if (kind === "remove") return "sim-diff__remove"
  if (kind === "add") return "sim-diff__add"
  if (kind === "meta") return "sim-diff__meta"
  return "sim-diff__context"
}

const prefixChar = (kind: DiffLine["kind"]) => {
  if (kind === "remove") return "−"
  if (kind === "add") return "+"
  return " "
}

const outcomeIsApproved = computed(() => state.value === "approved")
const outcomeIsDenied = computed(() => state.value === "denied")
const showDiff = computed(() => state.value === "pending")
</script>

<template>
  <Card :class="cn('my-8 overflow-hidden border-border-strong bg-card', props.class)">
    <CardContent class="p-0">
      <!-- Terminal chrome -->
      <div class="sim-chrome">
        <span class="sim-dot sim-dot--red" />
        <span class="sim-dot sim-dot--yellow" />
        <span class="sim-dot sim-dot--green" />
        <span class="sim-chrome__title">{{ props.title }}</span>
        <button v-if="state !== 'idle'" type="button" class="sim-reset" @click="reset">
          <RotateCcw class="w-3 h-3" />
          <span>restart</span>
        </button>
      </div>

      <!-- Idle state — start button -->
      <div v-if="state === 'idle'" class="sim-idle">
        <p class="sim-idle__text">Interactive simulation — experience the approval loop</p>
        <Button
          variant="outline"
          size="sm"
          class="border-gold/40 text-gold hover:bg-gold/10 hover:border-gold font-mono text-xs tracking-wider uppercase"
          @click="startSim"
        >
          Run simulation
        </Button>
      </div>

      <!-- Pending state — show prompt typing + diff -->
      <div v-else-if="state === 'pending'" class="sim-body">
        <!-- Typed prompt -->
        <div class="sim-prompt">
          <span class="sim-prompt__dir">~/client-notes/ $</span>
          <span class="sim-prompt__text">{{ typedPrompt }}</span>
          <span v-if="!promptDone" class="sim-cursor" aria-hidden="true" />
        </div>

        <!-- Diff block (appears after prompt typed) -->
        <Transition name="diff-slide">
          <div v-if="promptDone" class="sim-diff-wrap">
            <div class="sim-diff-header">
              Proposing edit to <span class="text-gold">{{ props.filename }}</span>
            </div>
            <div class="sim-diff">
              <div
                v-for="(line, i) in props.diff"
                :key="i"
                :class="['sim-diff__line', diffClass(line.kind)]"
              >
                <span class="sim-diff__prefix" aria-hidden="true">{{ prefixChar(line.kind) }}</span>
                <span>{{ line.text }}</span>
              </div>
            </div>

            <!-- Approve / deny buttons -->
            <div class="sim-actions">
              <span class="sim-actions__label font-mono text-[11px] text-muted-foreground">
                Approve this change?
              </span>
              <div class="flex gap-2">
                <Button
                  size="sm"
                  class="bg-gold text-background hover:bg-gold-hover font-mono text-xs"
                  @click="approve"
                >
                  <Check class="w-3.5 h-3.5 mr-1" />
                  Yes (y)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  class="border-border-strong font-mono text-xs"
                  @click="deny"
                >
                  <X class="w-3.5 h-3.5 mr-1" />
                  No (n)
                </Button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Outcome states -->
      <div v-else class="sim-body">
        <div class="sim-prompt">
          <span class="sim-prompt__dir">~/client-notes/ $</span>
          <span class="sim-prompt__text">{{ props.prompt }}</span>
        </div>
        <div :class="['sim-outcome', outcomeIsApproved ? 'sim-outcome--ok' : 'sim-outcome--deny']">
          <span class="sim-outcome__icon">{{ outcomeIsApproved ? '✓' : '✗' }}</span>
          <span>{{ outcomeIsApproved ? props.approveOutcome : props.denyOutcome }}</span>
        </div>
        <div class="sim-meta font-mono text-[11px] text-muted-foreground mt-2 px-4 pb-4">
          {{ outcomeIsApproved
              ? "(every change goes through this loop — you stay in the chair)"
              : "(nothing was written — deny is always safe)" }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.sim-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--color-raised);
  border-bottom: 1px solid var(--color-border);
}
.sim-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.sim-dot--red { background: #e05b4b; }
.sim-dot--yellow { background: #e8a838; }
.sim-dot--green { background: #5eb765; }
.sim-chrome__title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-muted);
  letter-spacing: 0.08em;
  margin-left: 6px;
}
.sim-reset {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-dim);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 200ms ease;
}
.sim-reset:hover { color: var(--color-gold); }

.sim-idle {
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}
.sim-idle__text {
  color: var(--color-dim);
  font-size: 13px;
  font-family: var(--font-mono);
}

.sim-body {
  padding: 16px 20px;
  min-height: 120px;
}
.sim-prompt {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.sim-prompt__dir {
  color: var(--color-gold);
  opacity: 0.7;
}
.sim-prompt__text { color: var(--color-text); }

.sim-cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  background: var(--color-gold);
  border-radius: 1px;
  animation: blink 1.1s step-end infinite;
  vertical-align: middle;
  margin-left: 2px;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.sim-diff-wrap { margin-top: 4px; }
.sim-diff-header {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-muted);
  margin-bottom: 8px;
}
.sim-diff {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 10px 0;
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-x: auto;
}
.sim-diff__line {
  display: flex;
  gap: 10px;
  padding: 2px 14px;
  line-height: 1.5;
}
.sim-diff__prefix {
  user-select: none;
  width: 12px;
  flex-shrink: 0;
}
.sim-diff__remove {
  background: hsl(var(--accent-edge) / 0.12);
  color: hsl(var(--accent-edge));
}
.sim-diff__add {
  background: hsl(var(--secondary-edge) / 0.12);
  color: hsl(var(--secondary-edge));
}
.sim-diff__context { color: var(--color-dim); }
.sim-diff__meta {
  color: var(--color-gold);
  opacity: 0.8;
}

.sim-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.sim-outcome {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 12px 14px;
  border-radius: var(--radius);
  margin-top: 8px;
}
.sim-outcome--ok {
  background: hsl(var(--secondary-edge) / 0.10);
  border: 1px solid hsl(var(--secondary-edge) / 0.30);
  color: hsl(var(--secondary-edge));
}
.sim-outcome--deny {
  background: rgba(212, 168, 75, 0.08);
  border: 1px solid var(--color-border);
  color: var(--color-muted);
}
.sim-outcome__icon {
  font-size: 14px;
  margin-top: 1px;
  flex-shrink: 0;
}

.sim-meta { color: var(--color-dim); }

/* Diff slide-in transition */
.diff-slide-enter-active {
  transition: all 360ms var(--ease-out-spring);
}
.diff-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.diff-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .sim-cursor { animation: none; opacity: 1; }
  .diff-slide-enter-active { transition: none; }
}
</style>
