<script setup lang="ts">
import { computed } from "vue"
import { ArrowRight } from "lucide-vue-next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HeroCustomizer from "@/components/course/HeroCustomizer.vue"
import PersonaExample from "@/components/course/PersonaExample.vue"
import { useCustomizer } from "@/composables/useCustomizer"
import { PERSONA_LABELS } from "@/types/customizer"

useHead({
  title: "CETI · The Academy",
  meta: [
    {
      name: "description",
      content:
        "Same Claude you already use. Different shape. The one that sits in the folder with you.",
    },
  ],
})

const { persona, lang } = useCustomizer()

const continueHref = computed(() => {
  const p = persona.value ?? "creator"
  return `/start/01-mental-model?lang=${lang.value}&persona=${p}`
})

const continueLabel = computed(() => {
  const p = persona.value
  if (!p) return ""
  const label = PERSONA_LABELS[p][lang.value]
  return lang.value === "es"
    ? `Continuar como ${label}`
    : `Continue as ${label}`
})
</script>

<template>
  <main class="container max-w-5xl py-16 md:py-24">
    <!-- Hero -->
    <section class="mb-14 md:mb-20">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-5"
      >
        CETI · The Academy
      </div>
      <h1
        class="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
      >
        The same Claude you already use. Different shape.
      </h1>
      <p class="text-lg md:text-xl text-foreground/90 max-w-2xl mb-5">
        Not a chatbot in a tab. A colleague in the folder where your work
        actually lives.
      </p>
      <p class="text-base text-muted-foreground max-w-2xl leading-relaxed">
        5,000+ people. 100 organizations. 20 countries. One thing most of them
        had in common when they started: they were using AI the slow way —
        asking in one window, pasting the answer into another, then redoing
        half of it by hand. This fixes that.
      </p>
    </section>

    <!-- Primary CTA: HeroCustomizer -->
    <section class="mb-14 md:mb-20">
      <HeroCustomizer />
    </section>

    <!-- Already-picked continuation -->
    <section v-if="persona" class="mb-14 md:mb-20">
      <Card class="border-gold/40 bg-gold/5">
        <CardContent class="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div
              class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-1"
            >
              {{ lang === "es" ? "Ya elegiste" : "Already picked" }}
            </div>
            <p class="text-foreground/90 text-sm">
              {{
                lang === "es"
                  ? "Retomamos donde lo dejaste."
                  : "Pick up where you left off."
              }}
            </p>
          </div>
          <NuxtLink :to="continueHref">
            <Button variant="default" class="whitespace-nowrap">
              {{ continueLabel }}
              <ArrowRight class="w-4 h-4" />
            </Button>
          </NuxtLink>
        </CardContent>
      </Card>
    </section>

    <!-- By-the-end cards -->
    <section class="mb-14 md:mb-20">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-5"
      >
        By the end of this
      </div>
      <Card class="border-border">
        <CardContent class="py-6">
          <PersonaExample>
            <template #creator>
              <p class="text-foreground/90 leading-relaxed">
                By the end of this, your caption batch and DM triage will take
                a quarter of the time — and sound more like you, not less.
              </p>
            </template>
            <template #consultant>
              <p class="text-foreground/90 leading-relaxed">
                By the end of this, your invoice follow-ups and client status
                updates will take a quarter of the time — drafted in your
                voice, ready for you to approve.
              </p>
            </template>
            <template #service>
              <p class="text-foreground/90 leading-relaxed">
                By the end of this, your bookings reconciliation and repeat
                customer replies will take a quarter of the time — handled
                without you retyping anything.
              </p>
            </template>
            <template #realestate>
              <p class="text-foreground/90 leading-relaxed">
                By the end of this, your MLS lead replies and listing
                follow-ups will take a quarter of the time — written in the
                voice you already use with each buyer.
              </p>
            </template>
          </PersonaExample>

          <p class="text-sm text-muted-foreground mt-4 leading-relaxed">
            Pick a persona above to see what that looks like for your work
            specifically.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Future-vision note -->
    <section class="max-w-2xl">
      <p class="text-sm text-muted-foreground italic leading-relaxed">
        Later, an assistant on this page will remember what you've done and
        adjust the next module for you specifically. It's not there yet. When
        it is, you'll know.
      </p>
    </section>
  </main>
</template>
