<script setup lang="ts">
import { ref } from "vue"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, X, HelpCircle } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  correct: boolean
  explain: string
}

interface Props {
  prompt: string
  options: Option[]
}

const props = defineProps<Props>()

const selectedIndex = ref<number | null>(null)

function select(i: number) {
  selectedIndex.value = i
}

function reset() {
  selectedIndex.value = null
}
</script>

<template>
  <Card class="my-6 border-border">
    <CardHeader class="pb-3">
      <div
        class="font-display uppercase tracking-wider text-xs text-gold mb-1 flex items-center gap-2"
      >
        <HelpCircle class="w-3.5 h-3.5" /> Check yourself
      </div>
      <CardTitle class="text-lg font-semibold leading-snug">
        {{ prompt }}
      </CardTitle>
    </CardHeader>
    <CardContent class="pt-0 space-y-2">
      <Button
        v-for="(opt, i) in props.options"
        :key="i"
        variant="outline"
        :disabled="selectedIndex !== null && selectedIndex !== i"
        :class="
          cn(
            'w-full justify-start text-left h-auto py-3 px-4 whitespace-normal font-normal',
            'transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            selectedIndex === i && opt.correct && 'border-gold text-foreground',
            selectedIndex === i && !opt.correct && 'border-destructive text-foreground',
          )
        "
        @click="select(i)"
      >
        <span class="flex-1">{{ opt.label }}</span>
        <Check
          v-if="selectedIndex === i && opt.correct"
          class="w-4 h-4 text-gold shrink-0"
        />
        <X
          v-if="selectedIndex === i && !opt.correct"
          class="w-4 h-4 text-destructive shrink-0"
        />
      </Button>

      <Alert
        v-if="selectedIndex !== null"
        :class="
          cn(
            'mt-4 border-l-4',
            props.options[selectedIndex]?.correct
              ? 'border-l-gold'
              : 'border-l-destructive',
          )
        "
      >
        <Check
          v-if="props.options[selectedIndex]?.correct"
          class="w-4 h-4 text-gold"
        />
        <X v-else class="w-4 h-4 text-destructive" />
        <AlertDescription class="text-foreground/90 text-sm leading-relaxed">
          {{ props.options[selectedIndex]?.explain }}
        </AlertDescription>
      </Alert>

      <div v-if="selectedIndex !== null" class="pt-2">
        <Button variant="ghost" size="sm" @click="reset">Try again</Button>
      </div>
    </CardContent>
  </Card>
</template>
