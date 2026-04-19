<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Compass } from "lucide-vue-next"
import Callout from "@/components/course/Callout.vue"
import { cn } from "@/lib/utils"

useHead({
  title: "The CETI Academy — Learn Claude Code at your level",
  meta: [
    {
      name: "description",
      content:
        "Novice, Experienced, Expert — pick your tier and work through Claude Code by skill level, not pricing.",
    },
  ],
})

type Tier = "novice" | "experienced" | "expert"

interface Question {
  prompt: string
  yes: "continue" | Tier
  no: Tier
}

const questions: Question[] = [
  {
    prompt: "Have you used Claude Code before?",
    no: "novice",
    yes: "continue",
  },
  {
    prompt: "Have you set up an MCP connection to one of your tools?",
    no: "experienced",
    yes: "continue",
  },
  {
    prompt:
      "Have you built a custom MCP server, shared skill libraries, or rolled Claude Code out to a team?",
    no: "experienced",
    yes: "expert",
  },
]

const step = ref(0)
const result = ref<Tier | null>(null)

function answer(yes: boolean) {
  const q = questions[step.value]
  if (!q) return
  const next = yes ? q.yes : q.no
  if (next === "continue") {
    step.value += 1
    return
  }
  result.value = next
}

function back() {
  if (result.value) {
    result.value = null
    step.value = Math.max(0, questions.length - 1)
    return
  }
  step.value = Math.max(0, step.value - 1)
}

function restart() {
  step.value = 0
  result.value = null
}

const current = computed(() => questions[step.value])

const tierCards: Array<{
  id: Tier
  label: string
  definition: string
  outcome: string
  featured?: boolean
}> = [
  {
    id: "novice",
    label: "Novice",
    definition: "Professional who has never opened a terminal.",
    outcome: "Install Claude Code, do one real thing this week.",
  },
  {
    id: "experienced",
    label: "Experienced",
    definition: "Comfortable with basics, wants real integration depth.",
    outcome: "Wire Claude Code into your job, ship one automation.",
    featured: true,
  },
  {
    id: "expert",
    label: "Expert",
    definition: "Treating Claude Code as core infrastructure.",
    outcome: "Architect team rollouts, custom MCP, hook-based governance.",
  },
]

const firstRouteFor: Record<Tier, string> = {
  novice: "/start/01-mental-model",
  experienced: "/academy/experienced/debugging-ai-loops",
  expert: "/academy/experienced/debugging-ai-loops",
}

const threads: Array<{ thread: string; novice: string; experienced: string; expert: string }> = [
  {
    thread: "Mental model",
    novice: "What Claude Code is and isn't",
    experienced: "The 5 layers of a real workflow",
    expert: "Agentic systems architecture",
  },
  {
    thread: "Daily practice",
    novice: "First session, first edit, first CLAUDE.md",
    experienced: "Skills, slash commands, hooks, multi-project",
    expert: "Team governance, shared skill libraries, hook-based safety",
  },
  {
    thread: "Tool integration",
    novice: "File system, one useful prompt",
    experienced: "MCP: Gmail, Calendar, Notion, databases",
    expert: "Custom MCP servers, OAuth for teams, security model",
  },
  {
    thread: "Decision-making",
    novice: "Perspective Matrix + Six Dimensions as references",
    experienced: "Dissent, leverage, feasibility as slash commands",
    expert: "MoE orchestration, multi-domain research, parallel dispatch",
  },
  {
    thread: "Scaling and safety",
    novice: "Approve or deny, the backup-first habit",
    experienced: "Production patterns, team CLAUDE.md, hooks",
    expert: "Org-wide rollout, audit trails, compliance",
  },
]
</script>

<template>
  <main class="container max-w-4xl py-16 md:py-20">
    <section class="mb-16">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-4"
      >
        The Academy
      </div>
      <h1
        class="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-4"
      >
        Learn Claude Code at your level.
      </h1>
      <p class="text-lg text-muted-foreground max-w-2xl">
        Three tiers by skill, not price. Pick where you actually are today.
      </p>
    </section>

    <section class="mb-20">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-4 flex items-center gap-2"
      >
        <Compass class="w-3.5 h-3.5" />
        Place yourself · 30 seconds
      </div>

      <Card v-if="!result" class="border-border">
        <CardHeader>
          <div class="text-xs text-muted-foreground font-mono mb-2">
            Question {{ step + 1 }} of {{ questions.length }}
          </div>
          <CardTitle class="text-xl md:text-2xl font-semibold leading-snug">
            {{ current?.prompt }}
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-3">
          <Button variant="default" @click="answer(true)">Yes</Button>
          <Button variant="outline" @click="answer(false)">No</Button>
        </CardContent>
        <CardFooter class="justify-between">
          <Button
            variant="ghost"
            size="sm"
            :disabled="step === 0"
            @click="back"
          >
            <ArrowLeft class="w-4 h-4" /> Back
          </Button>
          <span class="text-xs text-muted-foreground"
            >No email, no forms.</span
          >
        </CardFooter>
      </Card>

      <div v-else>
        <Callout variant="core-idea" :title="`Start here · ${result}`">
          <p v-if="result === 'novice'">
            Begin with the Novice track. Install, first session, first real
            edit, first CLAUDE.md. Short, interactive, no terminal experience
            assumed.
          </p>
          <p v-else-if="result === 'experienced'">
            You know the basics. Next step: wire Claude Code into an actual
            workflow and ship one automation. Start with debugging AI loops so
            nothing you build later gets stuck.
          </p>
          <p v-else>
            You are past the basics. The Expert track treats Claude Code as
            infrastructure: team rollouts, custom MCP, hook-based governance.
          </p>
          <div class="flex flex-wrap gap-3 mt-4">
            <NuxtLink :to="firstRouteFor[result]">
              <Button variant="default">
                Start the {{ result }} track
                <ArrowRight class="w-4 h-4" />
              </Button>
            </NuxtLink>
            <Button variant="ghost" size="sm" @click="restart">
              <ArrowLeft class="w-4 h-4" /> Redo the placement
            </Button>
          </div>
        </Callout>
      </div>
    </section>

    <section class="mb-20">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-4"
      >
        Three tiers
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          v-for="tier in tierCards"
          :key="tier.id"
          :class="
            cn(
              'flex flex-col',
              tier.featured && 'border-gold ring-1 ring-gold/30',
            )
          "
        >
          <CardHeader>
            <div
              class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-2"
            >
              {{ tier.label }}
            </div>
            <CardTitle class="text-xl font-semibold">
              {{ tier.definition }}
            </CardTitle>
          </CardHeader>
          <CardContent class="flex-1 text-muted-foreground">
            {{ tier.outcome }}
          </CardContent>
          <CardFooter>
            <NuxtLink :to="firstRouteFor[tier.id]" class="w-full">
              <Button
                :variant="tier.featured ? 'default' : 'outline'"
                class="w-full justify-between"
              >
                Browse {{ tier.label }}
                <ArrowRight class="w-4 h-4" />
              </Button>
            </NuxtLink>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section class="mb-20">
      <div
        class="font-display uppercase tracking-[0.14em] text-xs text-gold mb-4"
      >
        Cross-tier threads
      </div>
      <p class="text-muted-foreground mb-5 max-w-2xl">
        Each tier covers the same five threads at a different depth. You can
        follow one thread vertically, from Novice to Expert, and stay coherent.
      </p>
      <Card class="border-border">
        <CardContent class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full text-sm min-w-[640px]">
              <thead>
                <tr
                  class="text-left font-display uppercase tracking-wider text-xs text-muted-foreground border-b border-border"
                >
                  <th class="px-4 py-3 font-semibold">Thread</th>
                  <th class="px-4 py-3 font-semibold">Novice</th>
                  <th class="px-4 py-3 font-semibold text-gold">Experienced</th>
                  <th class="px-4 py-3 font-semibold">Expert</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in threads"
                  :key="row.thread"
                  class="border-b border-border last:border-b-0 align-top"
                >
                  <td class="px-4 py-3 font-semibold text-foreground">
                    {{ row.thread }}
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">
                    {{ row.novice }}
                  </td>
                  <td class="px-4 py-3 text-foreground">
                    {{ row.experienced }}
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">
                    {{ row.expert }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  </main>
</template>
