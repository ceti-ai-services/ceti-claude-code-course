<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-vue-next"

interface Props {
  summary: string
}

defineProps<Props>()
</script>

<template>
  <Collapsible
    class="my-6 rounded-lg border border-border bg-card overflow-hidden"
  >
    <CollapsibleTrigger
      class="group w-full flex items-center gap-3 px-5 py-4 text-left text-foreground hover:bg-muted-bg/40 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ChevronRight
        class="w-4 h-4 text-gold transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-90"
      />
      <span class="font-medium text-[15px] flex-1">{{ summary }}</span>
    </CollapsibleTrigger>
    <CollapsibleContent
      class="px-5 pb-5 pt-0 text-foreground/90 leading-relaxed"
    >
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
