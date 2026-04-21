---
title: Subagents and parallel work
module: "13"
time: "12 min"
tags: [subagents, parallel-work, delegation, task-tool, bronze]
skills_gained: [delegating-work, parallel-research, when-to-spawn]
persona_aware: false
---

# Subagents and parallel work

Claude in your terminal is one worker with one context window. Most of the time, that's enough. Sometimes the job is too wide for one worker — too many files to read, too many threads to follow, too much context to fit. That's where subagents earn their keep.

## What a subagent is

A subagent is a fresh Claude instance your main session spawns to handle a scoped piece of work. The main session describes the job, hands it off, the subagent runs in its own context, and when it finishes it reports back — usually with a summary. The main session keeps its context clean and decides what to do with the report.

<CourseDiagram id="m13-d1" />

You don't configure this. Claude decides a piece of work is worth delegating, spawns, and either waits or continues while the subagent runs.

<Callout variant="core-idea">
A subagent is a worker Claude delegates to — you describe the job once, a fresh context finishes it.
</Callout>

## When to use one

<CourseDiagram id="m13-d2" />

Three patterns pay off reliably: independent research across files that don't depend on each other, wide searches where you don't know where the thing lives, and long bounded tasks that produce a compact answer. The shape is the same each time — high independence, heavy reading, small return.

<CourseDiagram id="m13-d3" />

## When not to use one

<CourseDiagram id="m13-d4" />

Subagents cost more than a direct call — fresh context, blind to what your main session has seen, coordination overhead. If the task fits in one answer from the main session, use the main session.

The rule of thumb: if you're about to paste a huge block of text into the prompt *"so Claude has the context,"* or if you're about to ask Claude to do five unrelated things in one message, that's when a subagent (or several in parallel) is the move.

## What the main session sees

When a subagent finishes, the main session receives its final message — usually a summary. The main session does not see every tool call, every file read, every intermediate thought. That's the point. You get the answer without the noise.

If you need the intermediate reasoning, ask the subagent to include it in the summary. *"Spawn a research subagent to read these three files and come back with a one-paragraph synthesis plus a bulleted list of the key facts it found in each file."*

<TryThis time="8 min">

Pick a folder with at least three distinct documents — a project folder, a client folder, anything with a few files to read.

Launch Claude in the folder. Ask: *"spawn a research subagent to summarize three files from this folder in parallel — pick the three most important ones — and come back to me with a one-paragraph synthesis of what this folder is for."*

Watch how it runs. Claude should identify three files, spawn the subagent, and produce a synthesis when it returns. Notice what the main session's context looks like afterward — it should hold the synthesis, not the raw contents of each file.

If the answer is thin, it's because the subagent's prompt was thin. Try again: describe the three files specifically, say what kind of synthesis you want, and name the format. *"One paragraph, no lists, written as if you were describing this folder to a new hire."*

</TryThis>

<Recap>

A subagent is a fresh Claude instance spawned from your main session to handle a scoped task. Use them for independent research, wide searches, and long tasks that produce compact answers. Don't use them for single edits or questions the main session can answer directly. The main session only sees the subagent's final report — keep the main context clean and the detail inside the subagent. One good delegation beats ten bad ones.

</Recap>
