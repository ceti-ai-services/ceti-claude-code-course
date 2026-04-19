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
  title: "Perspective Matrix — CETI Academy · Novice",
  meta: [
    {
      name: "description",
      content:
        "Before you decide anything important, ask who hasn't spoken yet. A habit for convening the voices that weren't in the room.",
    },
  ],
})

const objectives = [
  "See the habit in action",
  "Practice on a real decision",
  "Turn it into a Claude Code workflow",
]

const q1Options = [
  {
    label: "Finance — to sanity-check margin impact",
    correct: false,
    explain:
      "Finance is a real miss, but it's not the only one. Pricing touches sales scripts, billing systems, and customer expectations. Narrowing to one voice is how teams ship changes that break three things they didn't look at.",
  },
  {
    label: "Engineering — to check billing and plan-change plumbing",
    correct: false,
    explain:
      "Engineering matters, but a pricing change isn't only a systems change. You're also changing the customer story and the ops load. One voice is still too few.",
  },
  {
    label: "Customer — to check whether the new price reads as a cut or a hike",
    correct: false,
    explain:
      "Customer is often the forgotten voice, but it's not enough on its own. A pricing decision lands on Finance, Engineering, and Customer at the same time — and usually Ops too.",
  },
  {
    label: "All of the above — Finance, Engineering, and Customer",
    correct: true,
    explain:
      "Correct. A pricing change is a three-voice decision at minimum. Marketing alone produces a pitch that margin can't support, systems can't bill, and customers read as a bait-and-switch. Convene them before you ship.",
  },
]

const q2Options = [
  {
    label: "Missing tone context — Claude had no voice to match",
    correct: true,
    explain:
      "Correct. Claude defaults to neutral-professional with a slight edge. Without an example of how you usually write, or a sentence about who you're writing to, the output drifts. The fix is a perspective: 'write this as me, to a long-time client I respect.'",
  },
  {
    label: "Wrong model — try a bigger one",
    correct: false,
    explain:
      "Model size rarely fixes tone. Tone is a context problem. A smaller model with a good example outperforms a bigger model with a blank instruction.",
  },
  {
    label: "Prompt too short — add more instruction",
    correct: false,
    explain:
      "More instruction often makes it worse. The fix isn't volume, it's the right voice. One good sentence of context beats five sentences of rules.",
  },
]

const q3Options = [
  {
    label: "Build consensus across the group",
    correct: false,
    explain:
      "Consensus is a nice-to-have, not the goal. The point is coverage, not agreement.",
  },
  {
    label: "Surface disagreement you'd miss alone",
    correct: false,
    explain:
      "This is exactly the goal. You want the matrix precisely so disagreement shows up before you ship.",
  },
  {
    label: "Force one view to win",
    correct: true,
    explain:
      "Correct. Forcing a winner defeats the exercise. The matrix is about preserving the sharpest dissent, not crowning a victor. If you were going to rank them anyway, you didn't need the matrix.",
  },
  {
    label: "Catch invisible failures before they ship",
    correct: false,
    explain:
      "This is also a real goal. You're looking for the failure that only one voice can see.",
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
      module-num="N1"
      title="Perspective Matrix — who hasn't spoken yet?"
      time="10 min"
      :objectives="objectives"
    />

    <p class="text-lg text-muted-foreground mt-8 mb-10 leading-relaxed">
      Before you decide, convene the voices that weren't in the room.
    </p>

    <Callout variant="core-idea" title="The habit">
      <p class="mb-2 italic">
        Silence disagreement and you've deleted half the information.
      </p>
      <p>
        For any decision that matters, explicitly name three to five viewpoints —
        Customer, Finance, Operations, Design, Engineering, or the closest
        equivalents in your world. Each one writes its take independently. Only
        then do you compare.
      </p>
    </Callout>

    <h2 class="font-display text-2xl font-bold mt-12 mb-2 tracking-tight">
      Try it on three scenarios
    </h2>
    <p class="text-muted-foreground mb-4">
      Name the missing voice before you read the options.
    </p>

    <Quiz
      prompt="Your team is about to ship a pricing change. You've only talked to Marketing. Who's missing?"
      :options="q1Options"
    />

    <Callout variant="tip" title="Independent first">
      Write each voice's take before comparing. If you synthesize too early, the
      loudest voice wins and the matrix collapses into whatever you already
      thought.
    </Callout>

    <Quiz
      prompt="You ask Claude to draft a follow-up email. It comes out weirdly aggressive. Most likely cause?"
      :options="q2Options"
    />

    <Quiz
      prompt="Which of these is NOT the goal of a Perspective Matrix?"
      :options="q3Options"
    />

    <IxCollapse summary="How to run this with Claude Code in under 5 minutes">
      <p class="mb-3">
        The habit becomes a workflow in three small moves:
      </p>
      <ol class="space-y-2 list-decimal pl-5 marker:text-gold">
        <li>
          Open your project's <code class="font-mono text-sm">CLAUDE.md</code>
          and add one line:
          <em
            >"When I ask for perspectives, draft N independent short takes from
            Customer, Finance, Ops, Legal. Do not synthesize."</em
          >
        </li>
        <li>
          In a session, say: <em>"Give me five perspectives on [the thing]."</em>
          Claude writes each one separately.
        </li>
        <li>
          Read them side-by-side. Circle the sentence that surprises you. That's
          where the failure was hiding.
        </li>
      </ol>
      <p class="mt-3">
        No slash command, no plugin. One line of
        <code class="font-mono text-sm">CLAUDE.md</code> and one sentence in
        chat.
      </p>
    </IxCollapse>

    <Callout variant="warning" title="Don't average the voices">
      Averaging is the enemy. You want the sharpest take from each voice, not a
      blend that offends no one. A blended answer is worse than any individual
      one — it has no edges to push back on.
    </Callout>

    <TryThis time="5 min">
      <p class="mb-3">
        Pick a real decision on your plate right now. Then:
      </p>
      <ol class="space-y-2 list-decimal pl-5 marker:text-gold">
        <li>
          Name three stakeholders who are <em>not</em> in the room when the
          decision gets made.
        </li>
        <li>
          Write one sentence of dissent per stakeholder — the strongest
          argument each would make against your current plan.
        </li>
        <li>
          Note which sentence surprised you. That one is the point of the
          exercise.
        </li>
      </ol>
    </TryThis>

    <Recap>
      <p>
        Named voices catch failures unnamed voices miss. Write each take
        independently, compare second, and keep the dissent sharp. Do not
        average. The matrix is not a vote — it's a map of what you couldn't see
        alone.
      </p>
    </Recap>

    <nav class="flex justify-between gap-3 mt-14 pt-6 border-t border-border">
      <NuxtLink to="/academy">
        <Button variant="outline">
          <ArrowLeft class="w-4 h-4" /> Academy
        </Button>
      </NuxtLink>
      <NuxtLink to="/academy/novice/six-dimensions">
        <Button variant="default">
          Next: Six Dimensions <ArrowRight class="w-4 h-4" />
        </Button>
      </NuxtLink>
    </nav>
  </main>
</template>
