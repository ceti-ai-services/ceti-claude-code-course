---
title: CLAUDE.md — Giving Context Once
module: 05
time: "13 min"
---

# CLAUDE.md — Giving Context Once

By your third session you will notice a pattern: you type the same thing into Claude every time you start. "I'm a marketing lead at a mid-sized software company." "Our clients are in healthcare, not tech." "Always use British English." "This folder is for client proposals — every document here is confidential." You are typing these sentences because Claude has no memory between sessions, and every new conversation starts blank.

There is a file that fixes this. It is called `CLAUDE.md`, it sits in your folder, and Claude reads it automatically at the start of every session in that folder. You write it once. You never have to re-introduce yourself again.

## What CLAUDE.md is

`CLAUDE.md` is a plain text file in Markdown format — the same format these lessons are written in. The `.md` extension tells your computer it is Markdown. Claude Code looks for this file by exact name when it starts, and if it finds one in the folder you launched from, it reads it before answering your first question.

The content is simply *context you would otherwise type every session*. Who you are. What this folder is for. What conventions matter. What the intended audience is for anything Claude produces here. You write it in normal sentences, as if you were onboarding a new colleague.

It is not a prompt. You do not paste it into the conversation. You do not run a slash command to "activate" it. You save the file in the folder, and it just works from the next session onward.

It is also not magic. Claude will not follow instructions in `CLAUDE.md` that contradict what you say in the session. If your file says "always respond in British English" and you then ask, "actually, use American for this one," Claude uses American. The file is the default context, not a handcuff.

## What to put in it

A good `CLAUDE.md` answers four questions. You do not need headers for each — write it as prose if you want — but these are the four axes of useful context.

**Who am I?** One sentence. Your role, your organization, what you do. "I run operations at a 30-person logistics company." "I'm a partner at a small law firm focused on commercial leases." The more specific, the better the defaults Claude picks for tone and vocabulary.

**What is this folder for?** One or two sentences. The purpose of the folder and the kind of work that happens in it. "This folder contains active client contracts and the associated correspondence. Each client has a subfolder." Claude will stop guessing, because it does not have to.

**What conventions matter?** Anything that keeps coming up. Naming patterns ("all invoices are named YYYY-MM-client.pdf"). Language preferences ("use British English, and never use the word 'leverage'"). Structural norms ("when summarizing, start with a three-sentence executive summary, then bullets"). Confidentiality notes ("never paste any content from this folder into an external tool or email draft").

**Who is the audience for outputs?** If most things produced here are meant for a specific reader, say so. "Drafts in this folder are read by our CFO, who wants numbers first and prose second." "Summaries in this folder are for internal engineers who already know the domain, so skip background explanations."

Keep it short. One screen, ideally. A two-page `CLAUDE.md` is worse than a six-line one — Claude will read it either way, but your future self has to maintain it.

## A template to start from

Copy this into a file called `CLAUDE.md` in the folder you want to set context for. Replace the bracketed parts.

```markdown
# Context for Claude

## Who I am
[One sentence: role, organization, area of focus.]

## What this folder is
[One or two sentences: purpose of the folder, how it is organized.]

## Conventions I care about
- [Naming convention for files, if any.]
- [Language/style preferences — formal/casual, regional, vocabulary to avoid.]
- [Structural preferences — how summaries should be formatted, etc.]

## Audience for outputs
[Who reads the things produced in this folder, and what they care about.]

## Things to never do
- [Actions that are off-limits — e.g., "never delete anything without explicit confirmation."]
```

That template is not sacred. Delete sections that do not apply. Add a section for anything specific to your work. The only rule is that the file lives at the root of the folder and is named exactly `CLAUDE.md`.

## The hierarchy

Claude Code actually reads three kinds of `CLAUDE.md` files, in order. Most non-developers only ever need one of them, but it is worth knowing the full picture so nothing surprises you later.

**Global**, at `~/.claude/CLAUDE.md` on your computer. This is context that applies *everywhere* you run Claude Code — your name, your general profession, any universal preferences. Most people skip this and add it later, after they have a feel for what belongs there.

**Project**, at `CLAUDE.md` in the folder you launched from. This is the one you will actually use. The four-question template above goes here. Ninety percent of your useful context is folder-specific, and folder-specific context belongs in the folder.

**Local**, at `./.claude/CLAUDE.md`. This is a hidden subfolder (the leading dot makes it hidden on Mac and Linux) that holds context specific to *your* copy of a shared folder. If the folder is synced with a team, everyone sees the main `CLAUDE.md` but your own notes and quirks live in the local one. Skip this until you genuinely have a shared-folder situation.

Most non-developers only need the project one. If you are not sure whether you need the others, you do not.

## It is memory, not a command

This bears repeating because the distinction trips people up. `CLAUDE.md` is **project memory**. It is not a prompt template — you are not writing instructions like "Please always respond in the style of..." as if you were crafting a clever opening message. You are writing the context that any reasonable colleague would need on day one.

It is also not a slash command. You do not type `/claude-md` or `/memory` to invoke it. There is no command. The file exists, Claude reads it at session start, the context is in the room.

The practical consequence is that `CLAUDE.md` should read like a briefing document, not like a prompt. "I run ops at a logistics company" is good. "You are a helpful assistant specializing in logistics operations" is worse — that is writing a prompt, which Claude already has. You are giving it *your* specifics, not describing its job.

## What you just did

You learned that `CLAUDE.md` is a plain Markdown file Claude reads automatically at the start of every session in that folder, and that it is the right place for the context you would otherwise retype every time: who you are, what the folder is for, what conventions you care about, and who reads the outputs. You learned the four-section template, and you learned that while there is a three-level hierarchy of global, project, and local files, the project-level file in the folder root is the only one most people need. It is project memory, not a command.

## Try this

Go back to the folder you used in Module 03 — the one where you asked Claude to explain itself. Create a new file in that folder called exactly `CLAUDE.md`. On Mac you can do this from Finder (right-click → New Document, rename to `CLAUDE.md`), from a text editor (File → New, save with that exact name), or from the terminal (`touch CLAUDE.md` in Mac/Linux, or `New-Item CLAUDE.md` in PowerShell).

Paste the template from earlier in this lesson into the file. Fill out three sections — who you are, what the folder is for, and one convention that matters. Leave the rest if you are not sure. Save.

Now start a fresh Claude session in that folder (`exit` out of any existing one, then `claude` again). Ask the same opening question you asked before:

```
what's in this folder and what is it for?
```

The answer should feel different — more specific, more confident, less generic. Claude is not guessing at context anymore. It has read your file.

If the answer still feels generic, your `CLAUDE.md` is too vague. Open it, add one more specific sentence, save, start a fresh session, ask again. This iteration loop is how people learn what kind of context actually moves the needle.
