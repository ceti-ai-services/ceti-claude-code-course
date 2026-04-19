<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CircleCheck, CircleAlert, Sparkles, ArrowRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useXp } from '@/composables/useXp'

interface Option {
  label: string
  correct: boolean
  explain: string
}

interface Props {
  moduleSlug: string
  question: string
  options: Option[]
  xp?: number
  nextModule?: string
  nextModuleTitle?: string
  modelValue?: boolean
  showTimer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  xp: 25,
  modelValue: false,
  showTimer: false,
})

const emit = defineEmits<{
  'update:modelValue': [open: boolean]
  'complete': [payload: { moduleSlug: string; xpAwarded: number }]
}>()

const LS_DONE = 'ceti.completed.v1'
const TIMER_SECS = 30

const { addXp } = useXp()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

type Phase = 'ask' | 'feedback' | 'complete'
const phase = ref<Phase>('ask')
const pickedIndex = ref<number | null>(null)
const attempts = ref(0)
const timeLeft = ref(TIMER_SECS)
let timerId: ReturnType<typeof setInterval> | null = null

const picked = computed(() =>
  pickedIndex.value === null ? null : props.options[pickedIndex.value] ?? null,
)

const progressValue = computed(() =>
  Math.max(0, (timeLeft.value / TIMER_SECS) * 100),
)

function startTimer() {
  if (!props.showTimer) return
  timeLeft.value = TIMER_SECS
  stopTimer()
  timerId = setInterval(() => {
    timeLeft.value = Math.max(0, timeLeft.value - 1)
    if (timeLeft.value === 0) stopTimer()
  }, 1000)
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

function readCompleted(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LS_DONE)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

function markCompleted(slug: string) {
  if (typeof window === 'undefined') return
  const list = readCompleted()
  if (list.includes(slug)) return
  list.push(slug)
  try {
    window.localStorage.setItem(LS_DONE, JSON.stringify(list))
  } catch { /* no-op */ }
}

function pick(i: number) {
  if (phase.value !== 'ask') return
  pickedIndex.value = i
  phase.value = 'feedback'
  stopTimer()
}

function retry() {
  attempts.value += 1
  pickedIndex.value = null
  phase.value = 'ask'
  startTimer()
}

function finalize() {
  const correct = !!picked.value?.correct
  if (!correct) return
  // Half XP on a successful retry, full XP on first try.
  const awarded = attempts.value === 0 ? props.xp : Math.max(1, Math.floor(props.xp / 2))
  addXp(awarded, `boss:${props.moduleSlug}`)
  markCompleted(props.moduleSlug)
  emit('complete', { moduleSlug: props.moduleSlug, xpAwarded: awarded })
  phase.value = 'complete'
}

function goNext() {
  if (!props.nextModule) {
    open.value = false
    return
  }
  // Navigation is delegated to the parent page; close the dialog and let the
  // parent react on the `complete` event or subsequent link press.
  open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    phase.value = 'ask'
    pickedIndex.value = null
    attempts.value = 0
    startTimer()
  }
  else {
    stopTimer()
  }
})

onMounted(() => {
  if (open.value) startTimer()
})
onBeforeUnmount(() => stopTimer())
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-xl">
      <!-- ASK -->
      <template v-if="phase === 'ask'">
        <DialogHeader>
          <div
            class="flex items-center gap-2 font-display uppercase tracking-wider text-xs text-gold mb-1"
          >
            <Sparkles class="w-3.5 h-3.5" />
            <span>Checkpoint</span>
          </div>
          <DialogTitle class="text-2xl font-semibold leading-snug">
            {{ props.question }}
          </DialogTitle>
          <DialogDescription class="text-muted-foreground">
            One decision. Pick carefully.
          </DialogDescription>
        </DialogHeader>

        <div v-if="props.showTimer" class="mb-2">
          <Progress :model-value="progressValue" class="h-1" />
        </div>

        <div class="space-y-2">
          <Button
            v-for="(opt, i) in props.options"
            :key="i"
            variant="outline"
            class="w-full justify-start text-left h-auto py-3 px-4 whitespace-normal font-normal"
            @click="pick(i)"
          >
            {{ opt.label }}
          </Button>
        </div>
      </template>

      <!-- FEEDBACK -->
      <template v-else-if="phase === 'feedback'">
        <DialogHeader>
          <div
            :class="cn(
              'flex items-center gap-2 font-display uppercase tracking-wider text-xs mb-1',
              picked?.correct ? 'text-gold' : 'text-destructive',
            )"
          >
            <CircleCheck v-if="picked?.correct" class="w-3.5 h-3.5" />
            <CircleAlert v-else class="w-3.5 h-3.5" />
            <span>{{ picked?.correct ? 'You got it' : 'Not quite' }}</span>
          </div>
          <DialogTitle class="text-xl font-semibold leading-snug">
            {{ picked?.label }}
          </DialogTitle>
          <DialogDescription class="text-foreground/90 leading-relaxed pt-2">
            {{ picked?.explain }}
          </DialogDescription>
        </DialogHeader>

        <div class="flex gap-3 justify-end pt-2">
          <Button
            v-if="!picked?.correct && attempts === 0"
            variant="outline"
            @click="retry"
          >
            Try once more
          </Button>
          <Button
            v-if="picked?.correct"
            @click="finalize"
          >
            Claim {{ attempts === 0 ? props.xp : Math.max(1, Math.floor(props.xp / 2)) }} XP
          </Button>
          <Button
            v-else-if="attempts >= 1"
            variant="outline"
            @click="open = false"
          >
            Close
          </Button>
        </div>
      </template>

      <!-- COMPLETE -->
      <template v-else>
        <DialogHeader>
          <div
            class="flex items-center gap-2 font-display uppercase tracking-wider text-xs text-gold mb-1"
          >
            <Sparkles class="w-3.5 h-3.5" />
            <span>Level complete</span>
          </div>
          <DialogTitle class="text-3xl font-semibold leading-snug">
            Module cleared.
          </DialogTitle>
          <DialogDescription class="text-muted-foreground">
            {{
              attempts === 0
                ? `${props.xp} XP banked. Carry it forward.`
                : `${Math.max(1, Math.floor(props.xp / 2))} XP banked. Onward.`
            }}
          </DialogDescription>
        </DialogHeader>

        <div class="flex justify-end pt-2">
          <Button v-if="props.nextModule" @click="goNext">
            Next: {{ props.nextModuleTitle ?? props.nextModule }}
            <ArrowRight class="w-4 h-4" />
          </Button>
          <Button v-else variant="outline" @click="open = false">
            Close
          </Button>
        </div>
      </template>
    </DialogContent>
  </Dialog>
</template>
