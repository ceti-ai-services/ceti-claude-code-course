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
  title: "Debugging AI loops — CETI Academy · Experienced",
  meta: [
    {
      name: "description",
      content:
        "When Claude gets stuck repeating itself, the cause is almost always missing context or an ambiguous goal. Three symptoms, three fixes.",
    },
  ],
})

const objectives = [
  "Name the four phases of a Claude session",
  "Spot three loop symptoms",
  "Give Claude the one thing it's missing",
  "Break a loop without starting over",
]

const q1Options = [
  {
    label: "Claude didn't understand the prompt, so repeat it louder.",
    correct: false,
    explain:
      "Reading the same file is not a reading-comprehension problem. Claude already has the file; it's stuck deciding what to do with it. Repeating the prompt won't add information.",
  },
  {
    label:
      "Claude is missing a fact it needs to commit to an action — give it the fact, not a nudge.",
    correct: true,
    explain:
      "Correct. Repeated reads of the same file with no edit means Claude cannot decide. The unblock is concrete context: the constraint, the convention, or the acceptance test it's looking for.",
  },
  {
    label: "Claude is being careful — wait longer and it will finish.",
    correct: false,
    explain:
      "Careful work looks like read → edit → read-to-verify. Three reads with no edit is not caution; it's indecision. Waiting keeps you paying for the same pass.",
  },
]

const q2Options = [
  {
    label: "The prompt is too long.",
    correct: false,
    explain:
      "Long prompts can cause other issues, but \"try again with the same goal\" loops are almost always caused by an under-specified goal or a missing success criterion, not length.",
  },
  {
    label: "The task has no clear success signal, so every attempt looks the same to Claude.",
    correct: true,
    explain:
      "Correct. If the goal is \"make it better,\" every output is equally plausible. Add a concrete done-test — passing tests, a specific output shape, a user-visible behavior — and Claude stops guessing.",
  },
  {
    label: "Claude is rate-limited.",
    correct: false,
    explain:
      "Rate limits produce hard errors, not polite re-attempts. A session that keeps producing new variants of the same output is a specification problem, not a quota problem.",
  },
]

const q3Options = [
  {
    label: "It's stuck in the thinking phase — interrupt and re-run.",
    correct: false,
    explain:
      "Interrupting discards the state that might have unblocked the next pass. First try giving Claude the missing piece; interrupt only if there is nothing useful to add.",
  },
  {
    label: "It's in a reflection loop — add a hard constraint or an example of \"good enough.\"",
    correct: true,
    explain:
      "Correct. Reflection loops happen when Claude can always find one more caveat. An explicit stop rule (\"ship the first version that passes tests\") or a concrete example pulls it out.",
  },
  {
    label: "The model is broken — switch models.",
    correct: false,
    explain:
      "Model swaps rarely fix specification problems. If every model loops on the same task, the task definition is the variable that changed.",
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
      tier="experienced"
      module-num="04"
      title="Debugging AI loops"
      time="15 min"
      :objectives="objectives"
    />

    <p class="text-lg text-muted-foreground mt-8 mb-10 leading-relaxed">
      When Claude repeats itself, the cause is almost never the model. It's
      missing context, an ambiguous goal, or no clear stop condition.
    </p>

    <Callout variant="core-idea" title="Why loops happen">
      A Claude session moves through four phases in order: perceive, reason,
      act, observe. Loops happen when Claude can't get out of the first two —
      it keeps re-reading the same file or re-reasoning over the same facts
      because it's missing the one thing it needs to commit to an action.
    </Callout>

    <h2
      class="font-display text-2xl font-bold mt-12 mb-2 tracking-tight"
    >
      Three symptoms, three root causes
    </h2>
    <p class="text-muted-foreground mb-4">
      Name the symptom first. The fix is almost always specific to the cause,
      not the prompt.
    </p>

    <Quiz
      prompt="Claude keeps re-reading the same file and never edits it. What's the likely cause?"
      :options="q1Options"
    />

    <Callout variant="tip" title="Unblock, don't restart">
      Restarting the session throws away the work Claude has already done.
      Before you kill it, try naming the missing piece out loud in the next
      message: "You need X before you can decide."
    </Callout>

    <Quiz
      prompt="You keep saying 'try again' and Claude keeps producing different, equally-plausible outputs. What's wrong?"
      :options="q2Options"
    />

    <Quiz
      prompt="Claude writes code, immediately rewrites it, critiques it, rewrites it again, and never ships. What pattern is this?"
      :options="q3Options"
    />

    <Callout variant="approval" title="Pattern that works">
      Give Claude one concrete reference point. A passing test, a file that
      already follows the convention, or an example of "good enough." Constraint
      beats encouragement.
    </Callout>

    <IxCollapse summary="Deep dive · the four phases, plainly">
      <p class="mb-3">
        Every Claude session, no matter how short, moves through four phases:
      </p>
      <ul class="space-y-2 text-foreground/90 pl-5 list-disc marker:text-gold">
        <li>
          <strong>Perceive</strong> — Claude reads files, listens to the
          prompt, looks at what's on disk. Fast.
        </li>
        <li>
          <strong>Reason</strong> — Claude plans. "I should edit this, then run
          the tests, then report back." Invisible unless you ask for a plan.
        </li>
        <li>
          <strong>Act</strong> — Claude edits, runs a command, or calls a
          tool. This is the phase you see most. Every action goes through
          approval.
        </li>
        <li>
          <strong>Observe</strong> — Claude reads the result of its action and
          decides what to do next. Healthy sessions always come back here
          before acting again.
        </li>
      </ul>
      <p class="mt-3">
        Loops are almost always the Perceive and Reason phases repeating
        because Claude cannot see a path to Act. Your job is to make one
        visible.
      </p>
    </IxCollapse>

    <Callout variant="warning" title="The 'try again' trap">
      Re-prompting with "try again" or "do better" rarely works. It tells
      Claude nothing about what went wrong. Instead, give it the specific
      information it was missing: the constraint you forgot to mention, the
      file you didn't point it at, the output shape you actually need.
    </Callout>

    <TryThis time="5 min">
      <p class="mb-3">
        Open a Claude session that has been stuck for more than a few minutes.
        Don't close it. Instead:
      </p>
      <ol class="space-y-2 list-decimal pl-5 marker:text-gold">
        <li>Write the symptom in one line. "Keeps re-reading config.json."</li>
        <li>
          Write your hypothesis. "It doesn't know which environment to use."
        </li>
        <li>
          Try exactly one fix: give it the missing fact, add a success
          criterion, or add a hard stop rule. One change, not three.
        </li>
      </ol>
      <p class="mt-3 text-muted-foreground text-sm">
        If the first fix doesn't work, write down what happened and pick the
        next one. Debugging is a loop you run on purpose.
      </p>
    </TryThis>

    <Recap>
      <p>
        Loops are a specification problem, not a model problem. Name the
        symptom, guess the missing piece, add exactly one concrete thing — a
        fact, a success criterion, or a stop rule — and let Claude keep the
        state it already has.
      </p>
    </Recap>

    <nav class="flex justify-between gap-3 mt-14 pt-6 border-t border-border">
      <NuxtLink to="/academy">
        <Button variant="outline">
          <ArrowLeft class="w-4 h-4" /> Academy
        </Button>
      </NuxtLink>
      <NuxtLink to="#">
        <Button variant="default">
          Next: Monitoring Claude <ArrowRight class="w-4 h-4" />
        </Button>
      </NuxtLink>
    </nav>
  </main>
</template>
