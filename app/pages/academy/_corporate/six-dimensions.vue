<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-vue-next"
import ModuleHero from "@/components/course/ModuleHero.vue"
import Callout from "@/components/course/Callout.vue"
import Quiz from "@/components/course/Quiz.vue"
import IxCollapse from "@/components/course/IxCollapse.vue"
import TryThis from "@/components/course/TryThis.vue"
import Recap from "@/components/course/Recap.vue"

useHead({
  title: "Six Dimensions — CETI Academy · Novice",
  meta: [
    {
      name: "description",
      content:
        "Before you solve a problem, frame it across six dimensions. The one you're weakest on is where your plan is hiding its failure.",
    },
  ],
})

const objectives = [
  "Name the six dimensions",
  "Spot the under-examined one",
  "Frame a real stalled project",
]

const q1Options = [
  {
    label: "Structural clarity — who owns which part of the hire",
    correct: false,
    explain:
      "Structural matters, but 'everyone agrees you need a senior engineer' means the role itself isn't the bottleneck. The argument is probably somewhere else.",
  },
  {
    label: "Temporal alignment — are we aligned on urgency",
    correct: false,
    explain:
      "Possible, but weeks of argument after agreement usually isn't a clock problem. Something deeper is unresolved.",
  },
  {
    label: "Integrative — how the new hire connects to the existing team",
    correct: true,
    explain:
      "Correct. When a team agrees on the what and argues for weeks, the friction is almost always at the seams — reporting lines, overlapping responsibilities, who loses work to the new person. That's integrative, and it's the dimension teams dodge first.",
  },
  {
    label: "Causal — if we hire this role, then X follows",
    correct: false,
    explain:
      "Causal reasoning is useful, but by week three of 'agreeing,' the team isn't arguing about consequences — it's arguing about seams they haven't named.",
  },
]

const q2Options = [
  {
    label: "Cultural — did this honor what users actually value",
    correct: true,
    explain:
      "Correct. 'Customers requested it' is a request, not a value. When usage flops, the miss is almost always that the feature solved a surface ask instead of the underlying preference. Cultural is the dimension that asks 'what do they actually care about here?'",
  },
  {
    label: "Temporal — we shipped too early",
    correct: false,
    explain:
      "Maybe, but timing rarely explains total non-use. If nobody uses it at all, the problem is usually that the feature doesn't map to how users actually work — that's cultural, not temporal.",
  },
  {
    label: "Structural — the feature is in the wrong place in the UI",
    correct: false,
    explain:
      "Placement can hurt adoption, but 'nobody uses it' is a stronger failure than discoverability. The feature probably misses the underlying need.",
  },
  {
    label: "Causal — we didn't trace the if-then",
    correct: false,
    explain:
      "Causal is useful, but the failure pattern here — shipped something users asked for, they ignored it — is the classic cultural miss: literal request, missed value.",
  },
]

const q3Options = [
  {
    label: "Who owns which part? — Structural",
    correct: false,
    explain:
      "Structural questions can help, but six months stuck usually isn't an ownership problem. Ownership gets argued in week two, not month six.",
  },
  {
    label: "What would make this fail? — Epistemic",
    correct: true,
    explain:
      "Correct. Six months stalled almost always means there's an unspoken fear or unknown that nobody has named. Asking 'what would make this fail' is the question that forces the unknown onto the page. Once it's visible, the stall usually breaks.",
  },
  {
    label: "Is this aligned with our mission? — Cultural",
    correct: false,
    explain:
      "Useful, but strategic initiatives rarely stall on mission alignment. They stall on unnamed risk or missing information — that's epistemic.",
  },
]
</script>

<template>
  <main class="container max-w-3xl py-10 md:py-14">
    <div class="mb-6">
      <NuxtLink to="/academy">
        <Button variant="ghost" size="sm">
          <ArrowLeft class="w-4 h-4" /> Academy
        </Button>
      </NuxtLink>
    </div>

    <ModuleHero
      tier="novice"
      module-num="N2"
      title="Six Dimensions — before you solve it, frame it"
      time="12 min"
      :objectives="objectives"
    />

    <p class="text-lg text-muted-foreground mt-8 mb-10 leading-relaxed">
      Most stuck projects are one-dimensional analyses hitting five-dimensional
      reality.
    </p>

    <Callout variant="core-idea" title="The habit">
      <p class="mb-2 italic">
        Solve the right problem at the right scale before you solve it
        brilliantly.
      </p>
      <p>
        Any real problem has up to six orthogonal dimensions. Most people reason
        in one and miss the leverage in the others.
      </p>
    </Callout>

    <h2 class="font-display text-2xl font-bold mt-12 mb-3 tracking-tight">
      The six dimensions
    </h2>
    <dl
      class="grid grid-cols-1 gap-x-6 gap-y-3 mb-8 border-l-2 border-border pl-5"
    >
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
        <dt class="font-display uppercase tracking-wider text-xs text-gold w-28 shrink-0">
          Structural
        </dt>
        <dd class="text-foreground/90">Who owns what, and where are the parts?</dd>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
        <dt class="font-display uppercase tracking-wider text-xs text-gold w-28 shrink-0">
          Temporal
        </dt>
        <dd class="text-foreground/90">When does it need to happen?</dd>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
        <dt class="font-display uppercase tracking-wider text-xs text-gold w-28 shrink-0">
          Causal
        </dt>
        <dd class="text-foreground/90">If X changes, what follows?</dd>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
        <dt class="font-display uppercase tracking-wider text-xs text-gold w-28 shrink-0">
          Epistemic
        </dt>
        <dd class="text-foreground/90">What do we not yet know?</dd>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
        <dt class="font-display uppercase tracking-wider text-xs text-gold w-28 shrink-0">
          Cultural
        </dt>
        <dd class="text-foreground/90">Does this honor what people value?</dd>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
        <dt class="font-display uppercase tracking-wider text-xs text-gold w-28 shrink-0">
          Integrative
        </dt>
        <dd class="text-foreground/90">Where do the pieces touch each other?</dd>
      </div>
    </dl>

    <Callout variant="key-concept" title="The tell">
      The dimension you're weakest on is where your plan is hiding its failure.
      The shortest or vaguest answer points at the real problem.
    </Callout>

    <h2 class="font-display text-2xl font-bold mt-12 mb-2 tracking-tight">
      Spot the under-examined dimension
    </h2>
    <p class="text-muted-foreground mb-4">
      Three common patterns. The right answer is the dimension that no one
      brought up.
    </p>

    <Quiz
      prompt="Your team has been arguing about hiring for weeks. Everyone agrees you need a senior engineer. What's likely missing?"
      :options="q1Options"
    />

    <Quiz
      prompt="You shipped a feature customers requested. Nobody uses it. Most likely under-examined dimension?"
      :options="q2Options"
    />

    <Quiz
      prompt="You have a strategic initiative stalled for six months. What question most likely unblocks it?"
      :options="q3Options"
    />

    <IxCollapse summary="How to use this with Claude Code">
      <p class="mb-3">
        Build a <code class="font-mono text-sm">/six-dimensions</code> slash
        command. Three steps:
      </p>
      <ol class="space-y-2 list-decimal pl-5 marker:text-gold">
        <li>
          Create <code class="font-mono text-sm">.claude/commands/six-dimensions.md</code>
          with an instruction: <em>"Given the project brief I paste, write one
          paragraph per dimension — Structural, Temporal, Causal, Epistemic,
          Cultural, Integrative. Then name the dimension that got the shortest
          or vaguest paragraph."</em>
        </li>
        <li>
          In a session, paste a stalled project brief and run
          <code class="font-mono text-sm">/six-dimensions</code>.
        </li>
        <li>
          The dimension Claude calls out as thin is where your plan is hiding
          its failure. Start there.
        </li>
      </ol>
    </IxCollapse>

    <TryThis time="10 min">
      <p class="mb-3">
        Pick one stalled project you care about. Then:
      </p>
      <ol class="space-y-2 list-decimal pl-5 marker:text-gold">
        <li>
          Write one sentence per dimension — Structural, Temporal, Causal,
          Epistemic, Cultural, Integrative. One sentence each, no more.
        </li>
        <li>
          Find the shortest or vaguest sentence. Circle it. That's the
          under-examined dimension.
        </li>
        <li>
          Spend five minutes writing only in that dimension. Note what shifts.
        </li>
      </ol>
    </TryThis>

    <Recap>
      <p>
        Six questions, one answer each. Spot the weakest one — that's where the
        plan is hiding its failure. Frame before you solve, and you'll stop
        solving the wrong problem brilliantly.
      </p>
    </Recap>

    <nav class="flex justify-between gap-3 mt-14 pt-6 border-t border-border">
      <NuxtLink to="/academy/novice/perspective-matrix">
        <Button variant="outline">
          <ArrowLeft class="w-4 h-4" /> Perspective Matrix
        </Button>
      </NuxtLink>
      <NuxtLink to="/academy">
        <Button variant="default">
          Academy home <ArrowRight class="w-4 h-4" />
        </Button>
      </NuxtLink>
    </nav>
  </main>
</template>
