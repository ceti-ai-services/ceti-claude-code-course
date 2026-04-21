<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Sparkles,
  Info,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  Flame,
  ShieldAlert,
  Star,
  CircleHelp,
} from "lucide-vue-next"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// Callout variants — the semantic pin-points across the course.
// Phase-accent variants (info/caution/important/reflect) use the extended
// palette tokens added to main.css. Gold-tinted variants are the legacy set
// used throughout Bronze v1/v2 lesson bodies.
const calloutVariants = cva(
  "border border-border bg-card pl-5 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
  {
    variants: {
      variant: {
        // Legacy set — kept for backward compatibility with existing lesson MD
        "core-idea":    "border-l-4 border-l-gold",
        "tip":          "border-l-4 border-l-gold",
        "warning":      "border-l-4 border-l-destructive",
        "key-concept":  "border-l-4 border-l-gold",
        "approval":     "border-l-4 border-l-gold",
        "definition":   "border-l-4 border-l-border-strong",
        "stakes":       "border-l-4 border-l-destructive",
        // New extended set — richer semantic palette per Manu 2026-04-20
        "info":         "border-l-4 border-l-info",
        "caution":      "border-l-4 border-l-caution",
        "important":    "border-l-4 border-l-important",
        "reflect":      "border-l-4 border-l-reflect",
      },
    },
    defaultVariants: {
      variant: "core-idea",
    },
  },
)

type Variant = NonNullable<VariantProps<typeof calloutVariants>["variant"]>

interface Props {
  variant?: Variant
  title?: string
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "core-idea",
})

const iconMap = {
  "core-idea":   Sparkles,
  "tip":         Info,
  "warning":     AlertTriangle,
  "key-concept": Lightbulb,
  "approval":    CheckCircle2,
  "definition":  BookOpen,
  "stakes":      Flame,
  "info":        Info,
  "caution":     ShieldAlert,
  "important":   Star,
  "reflect":     CircleHelp,
} as const

const labelMap: Record<Variant, string> = {
  "core-idea":   "Core idea",
  "tip":         "Tip",
  "warning":     "Watch out",
  "key-concept": "Key concept",
  "approval":    "Approved pattern",
  "definition":  "Definition",
  "stakes":      "The stakes",
  "info":        "Info",
  "caution":     "Caution",
  "important":   "Important",
  "reflect":     "Reflect",
}

const iconColorMap: Record<Variant, string> = {
  "core-idea":   "text-gold",
  "tip":         "text-gold",
  "warning":     "text-destructive",
  "key-concept": "text-gold",
  "approval":    "text-gold",
  "definition":  "text-muted-foreground",
  "stakes":      "text-destructive",
  "info":        "text-info",
  "caution":     "text-caution",
  "important":   "text-important",
  "reflect":     "text-reflect",
}

const Icon = computed(() => iconMap[props.variant])
const label = computed(() => labelMap[props.variant])
const iconColor = computed(() => iconColorMap[props.variant])
</script>

<template>
  <Alert :class="cn(calloutVariants({ variant }), props.class)">
    <component :is="Icon" :class="cn('w-4 h-4', iconColor)" />
    <AlertTitle
      class="font-display uppercase tracking-wider text-xs text-muted-foreground mb-1"
    >
      {{ title ?? label }}
    </AlertTitle>
    <AlertDescription class="text-foreground/90 text-[15px] leading-relaxed">
      <slot />
    </AlertDescription>
  </Alert>
</template>
