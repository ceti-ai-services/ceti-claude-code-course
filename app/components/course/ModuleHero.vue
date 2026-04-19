<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target } from "lucide-vue-next"

interface Props {
  tier: "novice" | "experienced" | "expert"
  moduleNum: string
  title: string
  time: string
  objectives: string[]
}

defineProps<Props>()

const tierLabel: Record<Props["tier"], string> = {
  novice: "Novice",
  experienced: "Experienced",
  expert: "Expert",
}
</script>

<template>
  <Card class="border-t-2 border-t-gold border-x-0 border-b-0 rounded-none bg-transparent shadow-none">
    <CardContent class="px-0 pt-8 pb-0">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-3"
      >
        Module {{ moduleNum }} · {{ tierLabel[tier] }}
      </div>
      <h1
        class="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3 leading-tight"
      >
        {{ title }}
      </h1>
      <div class="font-mono text-xs text-muted-foreground mb-6">
        ~{{ time }}
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="obj in objectives"
          :key="obj"
          variant="outline"
          class="border-border-strong text-muted-foreground py-1 px-3 font-normal"
        >
          <Target class="w-3 h-3 text-gold" />
          {{ obj }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
