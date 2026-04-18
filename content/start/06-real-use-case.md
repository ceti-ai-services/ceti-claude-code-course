---
title: One Real Use Case, End to End
module: 06
time: "14 min"
---

# One Real Use Case, End to End

Everything so far has been preparation. You know the mental model, you have the tool installed, you can start sessions safely, you understand the approval loop, and you have written context into `CLAUDE.md`. Now you are going to do actual work with Claude Code — the task you wrote down at the end of Module 01. By the end of this lesson you should have one tangible deliverable produced in roughly the time it took you to read this course so far.

## The shape of every real task

Almost every useful Claude Code session follows three stages:

**Read-only.** You start by asking Claude to tell you what is there. No edits, no file changes, no shell commands — just understanding. This is where you catch misunderstandings cheaply, before any work gets done on the wrong foundation.

**Plan.** Once Claude has read, you ask what it *would* do. You are asking for the blueprint, not the building. This stage is where you correct scope, narrow the goal, and make sure you and Claude want the same thing.

**Execute with approvals.** Only now does Claude start producing the deliverable — writing files, moving documents, drafting the email. You approve each step. If something goes wrong, you caught it early, because you planned first.

The rest of this lesson walks through three archetypes of task so you can recognize yours. Whichever one matches, the three-stage pattern is the same.

## Archetype 1: Report from many inputs

You have a folder full of raw inputs — meeting notes, call transcripts, status updates, research documents — and you need to produce a single synthesized document. A monthly summary. A board update. A competitor analysis. A themes report from ten customer interviews.

**Read-only stage.** `cd` into the folder. Launch Claude. First question:

```
read everything in this folder and give me a one-paragraph summary of what's here
```

Claude reads. You verify the summary matches your memory of the folder. If it mentions files you do not recognize, or misses ones you know are there, you clarify. This takes thirty seconds and saves an hour later.

**Plan stage.** Now you describe the deliverable:

```
I need to produce a monthly summary of recurring themes from these meeting notes, 
for a one-page executive update. What's your plan for that?
```

Claude will describe its approach: which files it would read more deeply, what structure it would use for the final document, what it would flag as uncertain. Read the plan. Adjust. "Group by customer instead of by theme." "The executive cares about blockers most — lead with those."

**Execute stage.** Approve the plan and let Claude produce the output — usually in a new file it creates in the same folder:

```
write the monthly summary to a new file called 2025-march-summary.md
```

Claude writes the file. You approve the creation. You open the file and read. You edit yourself, or ask Claude to revise specific sections.

## Archetype 2: Organize a messy folder

Your Downloads folder, or a shared drive corner, or an old project directory — hundreds of files with no structure. You want it organized. Archived. Renamed consistently. Duplicates removed.

**Read-only stage.**

```
read the filenames in this folder and tell me what kinds of things are here. 
group them into categories you would use if you were organizing this
```

Claude will propose categories — invoices, contracts, photos, random downloads, duplicates, ambiguous items it cannot classify. Look at the proposed categories. Do they match how you think about this folder? If not, say so. "Group the invoices by year, not by client." "Treat the Zoom recordings as their own category, they should be deleted."

**Plan stage.**

```
propose a folder structure and explain what you'd move where. 
don't move anything yet — just describe it
```

Claude writes the plan in plain English. It might say "I would create four subfolders — Contracts, Invoices, Media, Archive — and move 47 files into them. 3 files I cannot classify confidently; I would leave those in place and flag them." You read the plan. You probably want to change something. "Don't create an 'Archive' folder, just delete the duplicates." "Contracts should be organized by client name, not by year."

**Execute stage.** Approve the cleanup in stages. Create the folders first — approve. Move the first category — approve. Inspect the folder. If it looks right, continue with the next category. If something is off, pause and course-correct. This is exactly the case where the default approval mode earns its keep: you are doing an irreversible thing on files that matter, and every approval is a chance to catch a mistake before it cascades.

## Archetype 3: Draft from a source

You have a transcript, a contract, a specification, or a thread — and you need to produce a shorter, targeted document from it. A follow-up email summarizing a sales call. A plain-English summary of a ten-page legal document. A proposal draft based on a client's RFP.

**Read-only stage.**

```
read transcript.txt and tell me the key moments — who said what, 
what the main outcomes were, what's unresolved
```

Claude reads and summarizes. You verify — you were in the call, you know the real shape of the conversation. If Claude missed the commitment someone made in the last five minutes, you catch it now.

**Plan stage.**

```
I need to send a follow-up email to the client. it should confirm what we agreed, 
restate the open questions, and propose next steps. what's your draft approach?
```

Claude describes the email it would write: tone, structure, what to include and leave out. You adjust. "The client is fairly formal — match that." "Don't include the pricing discussion; we haven't finalized that internally yet."

**Execute stage.**

```
write the email as a new file called follow-up-draft.md
```

Claude writes the draft. You read it. You either approve it as-is and copy it into your email client, or you ask for specific revisions. "Second paragraph is too long — cut it in half." "Change 'we will' to 'I will' throughout." Revision cycles are fast — this is where Claude Code starts feeling genuinely collaborative.

## The small habits that multiply

A few patterns that will pay off across every archetype.

**Ask for structure on output.** "As a table." "As a bulleted list with three levels." "As a two-paragraph summary followed by action items." Structure is cheap for Claude, valuable for you. Default prose is rarely the most useful shape.

**Push back when something is off.** "That's not what I asked for." "You missed the point of the third bullet." Claude responds well to plain correction. It does not need to be polished — it needs to be specific.

**Ask for uncertainty.** "What are you unsure about in this document?" "Which of these files did you skim versus read fully?" "Where did you have to guess?" These questions surface the edges of Claude's confidence, and those edges are where you want human judgment most.

**Close the loop.** At the end, ask Claude what it changed and what is left undone. "Summarize what we did this session and what you would recommend for a follow-up." That exit question is the single cheapest habit for catching things you missed.

## What you just did

You worked through a real task end to end — the one you wrote down in Module 01 — using the three-stage pattern: read-only first, plan second, execute with approvals third. Whichever archetype your task matched — a report from many inputs, an organizational cleanup, or a targeted draft from a source — the shape was the same. You read before you acted, you planned before you built, and every file change was approved. You should have one finished deliverable sitting in your folder right now.

## Try this

Pull out the task you wrote down at the end of Module 01 — the weekly task involving five or more files that you mildly dread. Before you open Claude, note two things on paper: roughly how long this task usually takes you (in minutes), and the single quality criterion that matters most for the output ("accuracy on names and dates," "readable on mobile," "short enough to send without editing," whatever applies).

Now do the task with Claude Code. Follow the three-stage pattern — read-only, plan, execute. Use the archetype that matches: report, organize, or draft. Approve each step. Revise aggressively when something is off.

When you finish, note two new things: how long it actually took, and how close the result is to your quality bar on the first pass. Keep those four numbers. The gap between your usual time and today's time is the ROI you will quote when you tell a colleague about this. The gap on quality is your honest assessment of where you still need to do the work yourself versus where Claude handled it well enough.

If the result was worse than doing it by hand, the task was probably the wrong archetype — or the folder needed a better `CLAUDE.md`. Revisit Module 05 and try again with more context. Most first-task disappointments disappear the second time around.
