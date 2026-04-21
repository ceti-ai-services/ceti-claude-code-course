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

A subagent is a fresh Claude instance that your main Claude session spawns to handle a scoped piece of work. The main session describes the job, hands it off, and the subagent runs in its own context. When it finishes, the subagent reports back — usually with a summary, a result, or a list of findings. The main session keeps its own context clean and decides what to do with the report.

Claude delegates through a built-in mechanism — you don't have to configure it. Your main Claude decides a piece of work is worth delegating, spawns a subagent with a prompt, and either waits for the result or continues while the subagent runs.

<Callout variant="core-idea">
A subagent is a worker Claude delegates to — you describe the job once, a fresh context finishes it.
</Callout>

## When to use one

Three patterns pay off reliably.

**Independent research.** You need summaries of five different files, or answers from five different sources, and none of them depend on each other. One subagent per file, all running in parallel, each reporting back a short summary. The main session synthesizes.

**Wide searches.** You're looking for something in a large codebase or document pile and you don't know where it lives. Spawn a subagent to do the search — it burns through the reading in its own context without polluting yours with every file it looked at.

**Long, bounded tasks.** A task that requires a lot of reading or tool use but produces a compact answer. Running it as a subagent keeps the main session's context focused on the decisions, not the details.

## When not to use one

Subagents cost more than a direct call. They spin up a whole new context, they can't see what your main session has seen, and coordinating them adds overhead. If the task fits in one answer from the main session, use the main session.

Don't spawn a subagent for a single-file edit. Don't spawn one to answer a question Claude can answer from the folder it's already in. Don't spawn three subagents when one would do.

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
