---
title: This is the one. Pick the task you mildly dread.
module: "06"
time: "45 min"
tags: [real-work, first-task, end-to-end, bronze]
skills_gained: [read-plan-execute, permission-discipline, first-shipped-task]
persona_aware: true
---

# This is the one. Pick the task you mildly dread.

You wrote something down in Module 01. The task you mildly dread on Monday mornings. The weekly thing with too many files, too many tabs, too many copy-pastes. The thing you'd pay $50 to not have to do.

Now you're going to do it with Claude — for the first time. Not a tutorial task. Not a toy example. The real one.

Everything the last five modules gave you — scoped folder, installed tool, approval instincts, a CLAUDE.md that knows who you are — was setup for this hour. This is where the whole course earns itself back.

<Callout variant="stakes">
One real task, done alongside Claude, is the difference between having watched a course and having used the tool. Everything up to now has been practice. This is where you try it on work that actually matters to your week.
</Callout>

## The shape of every real task

Every useful session follows three moves. Memorize the order — it's the whole method.

**Read-only first.** You ask Claude to tell you what's there. No edits. No files written. Just understanding. This is the cheapest way to catch a misunderstanding, before any work lands on the wrong foundation.

**Plan second.** You ask what Claude *would* do. You're asking for the blueprint, not the building. This is where you correct scope, narrow the goal, and make sure you and Claude want the same thing.

**Execute with approvals third.** Now Claude starts producing — writing files, moving documents, drafting the email — and you approve each step. If something goes wrong, you caught it at step two, not step three.

<CourseDiagram id="m06-d1" />

## Your task, your version

The task you wrote down in Module 01 probably matches one of four shapes. Read the one closest to yours. The specifics change. The rhythm doesn't.

<PersonaExample>
  <template #creator>

  **Your task: batch ten Instagram captions from a week of content.**

  You have a folder with ten raw clips from the week — maybe they're in `~/Content/2026-wk-16/`. You usually write captions one by one, late at night, after you've already watched the clip four times. It takes two hours. The captions end up sounding samey because you're tired.

  **Before you open Claude.** Make sure the folder contains the clips plus one file called `last-twenty-captions.md` — paste your last twenty captions there, one per line. That gives Claude your voice to match. Three minutes of copy-paste now saves an hour of tone correction later.

  **Read-only.** `cd` into the folder, launch Claude. First prompt:

  ```
  read every file in this folder and tell me what each clip is about
  in one sentence. no captions yet — just the summaries.
  ```

  Claude tells you what it sees. You skim. If a summary is off ("that clip is about ADHD organization, not productivity"), you correct it in the chat. That correction costs 20 seconds now and saves 20 minutes later.

  **Plan.** Now you shape the batch:

  ```
  draft ten captions — one per clip. my voice is deadpan, no emojis,
  short sentences, hook in the first line, never peppy. show me the first
  three so i can check the tone before you do the rest.
  ```

  Read the three. Too peppy? "Drop the exclamation points and cut every caption by a third." Too formal? "Looser. Like I'm talking to my friend who also has ADHD." Once three feel right, let it finish the other seven.

  **Execute.** `write these ten captions into a file called captions-wk-16.md.` Approve the write. Open the file. Adjust anything that's still off by hand. Ship.

  </template>
  <template #consultant>

  **Your task: draft three client follow-up emails with full context.**

  You've been putting off three emails all week: one unpaid-invoice nudge, one scope clarification, one project status update. Each one requires you to re-read the thread, remember the tone you use with this client, and draft something that doesn't sound like a form letter. You usually do these Friday afternoon and they take ninety minutes.

  **Before you open Claude.** The folder should already hold the files you normally use for this client — the proposal, the statement of work, meeting notes, past email threads you've saved. If past emails aren't saved anywhere, pull the last ten from Gmail: open the thread, three-dot menu → *Download message*, drop the `.eml` files into the folder. Claude reads `.eml` fine.

  **Read-only.** Open Claude in the client folder — `cd ~/Clients/Meridian/` or wherever the correspondence and notes actually live. First prompt:

  ```
  read my correspondence and meeting notes with this client from the
  last 60 days. tell me what's open, what's waiting on me, and what
  tone i tend to use with them.
  ```

  Claude summarizes. You verify. If Claude thinks something's resolved that isn't, correct it now.

  **Plan.** Name what you want drafted:

  ```
  i need three emails: (1) a soft nudge on invoice #441, 30 days past
  due; (2) a clarification on whether the brand guidelines work is in
  scope for phase two or a change order; (3) a status update on the
  current deliverables. match the tone you just described. show me the
  first one before you draft the others.
  ```

  Read the nudge. Adjust — "too apologetic" or "cut the intro, they know me." Once the tone is right, ask for the other two.

  **Execute.** `save these three as follow-up-1.md, follow-up-2.md, follow-up-3.md in this folder.` Approve each write. Open, paste into Gmail, send.

  </template>
  <template #service>

  **Your task: reconcile a week of bookings against your schedule.**

  You have a bookings export (CSV or PDF — whatever your system spits out), your calendar, and the WhatsApp thread where half your clients actually confirm. Once a week you sit down and try to match them up: who actually came, who no-showed, who paid, who owes you. It takes an hour and you always miss one.

  **Before you open Claude.** You need three things in one folder. *Bookings export*: in most booking apps (Square, Booksy, Vagaro, Setmore), go to Reports → Appointments → Export CSV. *Calendar*: Google Calendar → settings gear → Import & Export → Export, which gives you an `.ics` file for all calendars — drop it in. *WhatsApp confirmations*: open the chat → three-dot menu → More → *Export chat* → Without Media. You get a `.txt` file per conversation. Put the CSV, the `.ics`, and the chat exports in the same folder. That's ten minutes of setup, and after this week you have the pattern.

  **Read-only.** Launch Claude in the folder. First prompt:

  ```
  read every file here. tell me what's a booking, what's a confirmation,
  what's a payment. give me a list of every appointment this week with
  who, when, what service, and whether it shows as paid.
  ```

  Claude produces the list. You scan it. Names you recognize — good. Names you don't, or times that don't match your memory — flag those in the chat: "Sofia on Wednesday is wrong, she moved to Thursday."

  **Plan.**

  ```
  now make two lists: (1) appointments that happened and are fully paid,
  (2) appointments that have any gap — no-show, unpaid, or needing
  confirmation. explain what's missing for each one in list 2.
  ```

  **Execute.** `save the full reconciliation as wk-16-bookings.md in this folder.` Approve. Use list 2 to send your Monday morning WhatsApp follow-ups.

  </template>
  <template #realestate>

  **Your task: pull comps and draft a buyer summary for one listing.**

  You have a new listing you're showing Saturday and a buyer who asked for comps on Wednesday. You usually pull the MLS export, open it in a spreadsheet, eyeball the comparables, and then write a two-paragraph summary in email. It's an hour of work and your eyeballing is the part that could be wrong.

  **Before you open Claude.** One folder per transaction. In this one, put: the subject listing's detail sheet (MLS → Print → Save as PDF), your comps CSV (MLS → search comparable actives/solds → Export → CSV), any inspection or disclosure PDFs you've already received, and the email thread with the buyer if it exists (save as `.eml` from Gmail or `.msg` from Outlook). Five minutes of file-dragging. You only do the setup once per listing, and it becomes your working folder for the whole transaction.

  **Read-only.** Launch Claude in the folder. First prompt:

  ```
  read the listing sheet and the comps CSV. tell me the subject
  property's specs and how the comps compare — price per square foot,
  days on market, condition notes. highlight any outliers.
  ```

  Claude pulls the numbers. You verify against your own knowledge of the street. If a comp shouldn't be in the set (different school district, teardown priced as a renovation), say so — Claude excludes it.

  **Plan.**

  ```
  draft a buyer summary email: two short paragraphs. paragraph one is
  the listing in plain English, not MLS-speak. paragraph two is the
  comp analysis — what range i think it should sell at and why.
  ```

  **Execute.** `save as buyer-summary-145-main.md in this folder.` Approve. Open the file — it's plain text you can read like a doc. Copy the two paragraphs, paste into Gmail, send to your buyer. If they prefer SMS, you already have it written — just trim to one paragraph and text it.

  </template>
</PersonaExample>

## The discipline that makes this work

The temptation, as Claude starts producing, is to stop reading the approval prompts. Approve-approve-approve, skim the result, ship. Don't.

<Callout variant="approval">
Every approval is a checkpoint. Especially the first time you run a task end-to-end, read what's about to happen before you say yes. The two seconds per approval you'd "save" by hitting accept-all is the same two seconds that would have caught the file being written to the wrong folder, the tone drifting into something you'd never send, or the summary confidently citing a document that isn't actually there. Read the diff. Read the command. Then approve.
</Callout>

<CourseDiagram id="m06-d2" />

As the task gets familiar — the second, third, fourth time you do your weekly caption batch or follow-up draft — you'll scan faster. That's earned. Not default.

<CourseDiagram id="m06-d3" />

## A few habits that multiply

<CourseDiagram id="m06-d4" />

<TryThis time="45 min">

Block forty-five minutes. Close Slack, close DMs, close the other tabs. This is the session that matters.

Pull up the task you wrote down in Module 01 — the weekly thing you mildly dread. Before you open Claude, write two numbers on paper: roughly how long this task usually takes you, and the quality bar that matters most ("names correct," "tone matches," "shippable without my editing," whatever it is).

Now do the task with Claude. Follow the three moves — read, plan, execute. Approve every step. Correct aggressively when something's off. Don't try to be fast the first time. Try to be *correct*.

When you finish, write down two more numbers: how long it actually took, and how close the result is to your quality bar. Those four numbers are the ROI conversation you'll have with the next person you tell about this.

If the result is worse than doing it by hand, the task was probably the wrong fit — or the folder needed a better CLAUDE.md. Go back to Module 05, sharpen the context, try again. Almost every first-task disappointment disappears on the second run.

</TryThis>

<Recap>

You didn't just learn Claude Code. You *did something* with it — the one weekly task you'd been avoiding, shipped end-to-end using the three-move pattern. Read first, plan second, execute with approvals third. The task is different for everyone. The rhythm is the same for everyone. One finished deliverable now sits in your folder that wasn't there an hour ago — and you know exactly how it got there.

</Recap>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader what task they picked, how long it took, and where Claude got it wrong the first time. Not rendered yet. -->
