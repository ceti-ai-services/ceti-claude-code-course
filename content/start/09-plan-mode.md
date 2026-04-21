---
title: Plan mode — think before acting, dry-run your work
module: "09"
time: "10 min"
tags: [plan-mode, safety, dry-run, bronze]
skills_gained: [using-plan-mode, reviewing-plans, safe-execution]
persona_aware: false
---

# Plan mode — think before acting, dry-run your work

There's a gap between *"Claude, rename these twenty files"* and the first file actually getting renamed. That gap is where a bad idea either gets caught or gets committed. Plan mode widens the gap on purpose.

## What plan mode is

Plan mode is a state Claude runs in where it can read your files, search, and think, but cannot write, edit, run shell commands, or mutate anything. You ask for a change. Instead of making it, Claude produces a plan — a numbered list of what it would do, to which files, in what order. You read the plan. You approve, reject, or redirect.

You enter plan mode with `shift-tab` (cycle through modes) or by telling Claude plainly: *"use plan mode for this."* You'll see the indicator change. From that point on, any file-changing operation is a dry run until you exit.

<Callout variant="core-idea">
Plan mode lets you see the plan before you see the edit — dry run, read only.
</Callout>

## When to use it

Any time the change touches more than one file. Any time the operation is hard to undo. Any time you're not sure Claude understood the scope. The cost of plan mode is twenty seconds of reading. The cost of skipping it is whatever the worst version of the edit looked like.

Common moments where plan mode earns its keep: renaming a batch of files, restructuring a folder, refactoring anything, running a find-and-replace across documents, drafting a set of emails that will overwrite existing drafts.

For single-file edits to a scratch document, plan mode is overkill. You can see the diff in the approval prompt anyway. Save plan mode for the operations where the blast radius is wider than one file.

## Approving, rejecting, redirecting

When Claude gives you the plan, you have three responses.

**Approve.** You read it, the shape is right, the files are right. Exit plan mode and let Claude run it. The approvals still come one step at a time during execution — plan mode doesn't replace per-step approval, it layers on top of it.

**Reject.** The plan is wrong and you want to start over. Say so. Claude drops the plan. You restate the task more clearly.

**Redirect.** The plan is mostly right but one step is off. Tell Claude which step and why. *"Steps one through four are fine. Step five is wrong — don't touch anything in the `archive/` folder."* Claude revises. You re-read.

<TryThis time="8 min">

Make a scratch folder somewhere — `~/Documents/claude-plan-test/`. Drop in three dummy text files with any content you like.

Launch Claude in that folder. Turn on plan mode (`shift-tab` until you see the indicator) or say *"use plan mode."* Ask Claude: *"rename all three files to use today's date as a prefix and normalize the filenames to lowercase with hyphens."*

Read the plan. Notice what Claude proposes to do, in what order, to which files. If it looks right, exit plan mode and let it run. If it's missing a file or proposing something you didn't want, redirect — tell it what to change. Re-read the revised plan. Then execute.

</TryThis>

<Recap>

Plan mode is read-only. You ask for a change, Claude produces a dry-run plan, you approve or redirect before any file gets touched. Enter with `shift-tab` or by saying so. Use it whenever the operation spans more than one file or is hard to undo. Plan, read, approve, execute — the extra minute at the front saves the hour of cleanup at the back.

</Recap>
