<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Languages } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import PersonaCard from './PersonaCard.vue'
import { useCustomizer } from '@/composables/useCustomizer'
import { PERSONAS, PERSONA_LABELS } from '@/types/customizer'
import type { Persona, Lang } from '@/types/customizer'

const router = useRouter()
const { setCustomizer } = useCustomizer()

type Step = 'persona' | 'lang' | 'done'
const step = ref<Step>('persona')
const pickedPersona = ref<Persona | null>(null)
const pickedLang = ref<Lang | null>(null)

function pickPersona(p: Persona) {
  pickedPersona.value = p
  setCustomizer({ persona: p })
  // Small delay so the selected-state visual reads, then advance.
  window.setTimeout(() => {
    step.value = 'lang'
  }, 250)
}

function pickLang(l: Lang) {
  pickedLang.value = l
  setCustomizer({ lang: l })
  step.value = 'done'
  window.setTimeout(() => {
    void router.push({
      path: '/start/01-mental-model',
      query: {
        lang: l,
        persona: pickedPersona.value ?? 'creator',
      },
    })
  }, 600)
}

function back() {
  if (step.value === 'lang') {
    step.value = 'persona'
  }
}

const doneLabel = (() => {
  const p = pickedPersona.value ?? 'creator'
  return pickedLang.value === 'es'
    ? `Entrando como ${PERSONA_LABELS[p].es} →`
    : `Taking you in as a ${PERSONA_LABELS[p].en} →`
})
</script>

<template>
  <section class="w-full max-w-4xl mx-auto">
    <!-- Step 1: persona -->
    <div
      v-if="step === 'persona'"
      class="transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <h2
        class="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-8"
      >
        What do you do?
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PersonaCard
          v-for="p in PERSONAS"
          :key="p"
          :persona="p"
          :selected="pickedPersona === p"
          @click="pickPersona(p)"
          @keydown.enter.prevent="pickPersona(p)"
          @keydown.space.prevent="pickPersona(p)"
        />
      </div>
    </div>

    <!-- Step 2: language -->
    <div
      v-else-if="step === 'lang'"
      class="transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <button
        type="button"
        class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        @click="back"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Back
      </button>
      <h2
        class="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-8"
      >
        English or Español?
      </h2>
      <div class="flex flex-col md:flex-row gap-4 justify-center items-stretch">
        <Button
          class="min-w-[200px] h-20 text-lg font-semibold"
          @click="pickLang('en')"
        >
          <Languages class="w-5 h-5" />
          English
        </Button>
        <Button
          variant="outline"
          class="min-w-[200px] h-20 text-lg font-semibold border-border-strong"
          @click="pickLang('es')"
        >
          <Languages class="w-5 h-5" />
          Español
        </Button>
      </div>
    </div>

    <!-- Step 3: done (brief flash before router.push) -->
    <div
      v-else
      class="text-center py-16 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <p
        class="font-display uppercase tracking-wider text-lg text-gold animate-pulse"
      >
        {{ doneLabel() }}
      </p>
    </div>
  </section>
</template>
