<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
</script>

<template>
  <Card class="my-6 bg-muted-bg border-border">
    <CardHeader class="pb-2">
      <div
        class="font-display uppercase tracking-wider text-xs text-muted-foreground"
      >
        What you just did
      </div>
    </CardHeader>
    <CardContent class="pt-0 text-foreground/90 leading-relaxed">
      <slot />
    </CardContent>
  </Card>
</template>
