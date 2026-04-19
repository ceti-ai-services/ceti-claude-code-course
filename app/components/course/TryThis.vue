<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Clock } from "lucide-vue-next"

interface Props {
  time: string
}

defineProps<Props>()
</script>

<template>
  <Card class="my-6 border-l-4 border-l-gold">
    <CardHeader class="pb-2">
      <div class="flex items-center gap-2 font-display uppercase tracking-wider text-xs text-gold">
        <Clock class="w-3.5 h-3.5" />
        <span>Try this</span>
        <span class="text-muted-foreground font-normal tracking-normal normal-case">
          · {{ time }}
        </span>
      </div>
    </CardHeader>
    <CardContent class="pt-0 text-foreground/90 leading-relaxed">
      <slot />
    </CardContent>
  </Card>
</template>
