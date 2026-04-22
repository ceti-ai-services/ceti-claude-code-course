<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { cva, type VariantProps } from "class-variance-authority"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import Polyhedron from "@/components/course/_primitives/Polyhedron.vue"
import { useCustomizer } from "@/composables/useCustomizer"

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
        "core-idea":    "border-l-4 border-l-[hsl(var(--primary-edge))]",
        "tip":          "border-l-4 border-l-[hsl(var(--primary-edge))]",
        "warning":      "border-l-4 border-l-[hsl(var(--accent-edge))]",
        "key-concept":  "border-l-4 border-l-[hsl(var(--primary-edge))]",
        "approval":     "border-l-4 border-l-[hsl(var(--secondary-edge))]",
        "definition":   "border-l-4 border-l-[hsl(var(--support-edge))]",
        "stakes":       "border-l-4 border-l-[hsl(var(--accent-edge))]",
        // New extended set — richer semantic palette per Manu 2026-04-20
        "info":         "border-l-4 border-l-[hsl(var(--support-edge))]",
        "caution":      "border-l-4 border-l-[hsl(var(--accent-edge))]",
        "important":    "border-l-4 border-l-[hsl(var(--primary-edge))]",
        "reflect":      "border-l-4 border-l-[hsl(var(--secondary-edge))]",
        // New type-aligned variants
        "decision":     "border-l-4 border-l-[hsl(var(--secondary-edge))]",
        "structure":    "border-l-4 border-l-[hsl(var(--support-edge))]",
        "brief":        "border-l-4 border-l-[hsl(var(--primary-edge))]",
        "recap":        "border-l-4 border-l-[hsl(var(--secondary-edge))]",
        "try":          "border-l-4 border-l-[hsl(var(--accent-edge))]",
        "synthesis":    "border-l-4 border-l-[hsl(var(--primary-edge))]",
      },
    },
    defaultVariants: {
      variant: "core-idea",
    },
  },
)

type Variant = NonNullable<VariantProps<typeof calloutVariants>["variant"]>

// The `type` prop drives the polyhedron shape.
// When not provided, it is inferred from `variant`.
type CalloutType = 'tip' | 'warning' | 'decision' | 'structure' | 'brief' | 'recap' | 'try' | 'synthesis'

interface Props {
  variant?: Variant
  type?: CalloutType
  title?: string
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "core-idea",
})

// Map variant → callout type (for shape derivation when type is absent)
const variantToType: Record<Variant, CalloutType> = {
  "core-idea":   "tip",
  "tip":         "tip",
  "warning":     "warning",
  "key-concept": "tip",
  "approval":    "decision",
  "definition":  "structure",
  "stakes":      "warning",
  "info":        "tip",
  "caution":     "warning",
  "important":   "tip",
  "reflect":     "synthesis",
  "decision":    "decision",
  "structure":   "structure",
  "brief":       "brief",
  "recap":       "recap",
  "try":         "try",
  "synthesis":   "synthesis",
}

// Map callout type → polyhedron shape
const typeToShape: Record<CalloutType, string> = {
  "tip":        "tetrahedron",        // Spark / minimum useful unit
  "warning":    "tetrahelix",         // Off-axis spiral = "don't get drawn in"
  "decision":   "octahedron",         // Duality, pivot, approve/deny
  "structure":  "hexahedron",         // Foundation; gate/guard
  "brief":      "icosahedron",        // Systems-view; what-is-connected-to-what
  "recap":      "dodecahedron",       // The whole / completeness / cosmos
  "try":        "cuboctahedron",      // Equilibrium-through-action
  "synthesis":  "vector-equilibrium", // Packaged balance
}

// Map callout type → role color class (for glyph colorization)
const typeToGlyphColor: Record<CalloutType, string> = {
  "tip":        "callout-glyph--primary",
  "warning":    "callout-glyph--accent",
  "decision":   "callout-glyph--secondary",
  "structure":  "callout-glyph--support",
  "brief":      "callout-glyph--primary",
  "recap":      "callout-glyph--secondary",
  "try":        "callout-glyph--accent",
  "synthesis":  "callout-glyph--primary",
}

// Title rendered inside the callout (font-display italic, not uppercased).
// Kept in title-case on both languages to match the existing visual style.
// User-supplied `title` prop always wins — we only localize the default.
const labelMapEn: Record<Variant, string> = {
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
  "decision":    "Decision",
  "structure":   "Structure",
  "brief":       "Mission brief",
  "recap":       "Recap",
  "try":         "Try this",
  "synthesis":   "Synthesis",
}

const labelMapEs: Record<Variant, string> = {
  "core-idea":   "Idea clave",
  "tip":         "Consejo",
  "warning":     "Atención",
  "key-concept": "Concepto clave",
  "approval":    "Patrón aprobado",
  "definition":  "Definición",
  "stakes":      "En juego",
  "info":        "Información",
  "caution":     "Precaución",
  "important":   "Importante",
  "reflect":     "Reflexión",
  "decision":    "Decisión",
  "structure":   "Estructura",
  "brief":       "Misión",
  "recap":       "Resumen",
  "try":         "Prueba esto",
  "synthesis":   "Síntesis",
}

const { lang } = useCustomizer()

const resolvedType = computed<CalloutType>(
  () => props.type ?? variantToType[props.variant ?? "core-idea"]
)

const shape = computed(() => typeToShape[resolvedType.value] as Parameters<typeof Polyhedron>[0] extends { shape: infer S } ? S : never)
const glyphColorClass = computed(() => typeToGlyphColor[resolvedType.value])
const label = computed(() => {
  const map = lang.value === "es" ? labelMapEs : labelMapEn
  return map[props.variant ?? "core-idea"]
})
</script>

<template>
  <Alert :class="cn(calloutVariants({ variant }), 'callout-block', props.class)">
    <!-- Polyhedron glyph — shape encodes intent -->
    <Polyhedron
      :shape="(shape as any)"
      :size="28"
      :class="['callout-glyph', glyphColorClass]"
      :aria-hidden="true"
    />

    <AlertTitle
      class="font-display italic font-light text-base text-foreground/80 mb-1"
    >
      {{ title ?? label }}
    </AlertTitle>

    <AlertDescription class="text-foreground/90 text-[15px] leading-relaxed">
      <slot />
    </AlertDescription>
  </Alert>
</template>

<style scoped>
.callout-block {
  position: relative;
}

/* Glyph colors via role tokens — no hex */
.callout-glyph {
  flex-shrink: 0;
}

.callout-glyph--primary {
  color: hsl(var(--primary-edge));
}

.callout-glyph--secondary {
  color: hsl(var(--secondary-edge));
}

.callout-glyph--accent {
  color: hsl(var(--accent-edge));
}

.callout-glyph--support {
  color: hsl(var(--support-edge));
}

@media (prefers-reduced-motion: reduce) {
  .callout-block {
    transition: none;
  }
}
</style>
