---
title: Files, Permissions, and Undo
module: 04
time: "12 min"
---

# Files, Permissions, and Undo

So far you have only asked Claude to read. The next step — and the one most people are nervous about — is letting it change things. This lesson covers the permission system that keeps you in control, the modes that adjust how often Claude asks, and a simple pre-flight habit that makes "undo" almost always possible.

## The approval loop

Every action that changes a file on your computer goes through the same pattern:

1. You ask Claude to do something.
2. Claude decides an edit is needed and proposes it.
3. Claude shows you the proposed change and asks for approval.
4. You approve or deny.
5. Only after approval does the file actually change.

There is no way around step 3 by default. Claude cannot silently rewrite a document. It cannot delete a file without telling you. It will not run a shell command without surfacing it first. When it wants to do something, a prompt appears in the terminal — usually with the file name, a summary of the change, and options like "Yes," "No," or "Yes, and do similar things automatically for the rest of this task."

Read every prompt. Especially at the start. A few seconds of friction per approval is the price of knowing exactly what happened to your files. As you build trust with the tool, you will start scanning approvals instead of reading every line, and that is fine — but in the first week, read them.

When you deny, Claude does not get mad. It adjusts. It might ask a clarifying question, or propose a smaller change, or tell you it cannot proceed without the thing you just refused. That back-and-forth is the safety feature working.

## What the approval prompt shows you

For edits to text files — Markdown, plain text, code, CSV — the approval prompt shows a **diff**: a side-by-side comparison of the old text and the new text, with changes highlighted. Lines being removed are marked one way, lines being added are marked another. You do not need to understand every detail of the diff — you are looking for two things. First, *is it only changing the part it said it would change?* Second, *does the new version look sane?* If both, approve. If either is off, deny and ask Claude to narrow the change.

For file-moving, file-creating, or shell commands, the prompt shows the exact command that is about to run. "Move 3 files from /Downloads to /Downloads/archive." "Delete thumbs.db." "Create folder called 2025-Q1." Same two questions: is this the thing I asked for, and does it look sane.

## Permission modes

There are three modes you will encounter, controlling how often Claude asks:

**Default mode** (sometimes called *ask*): the behavior described above. Claude proposes, you approve, every single action. This is where you should live until the tool feels natural — probably for your first few weeks.

**acceptEdits mode**: Claude stops asking for file-edit approvals within the current session. Shell commands still require approval. This is the middle gear. It is useful when you are doing a long, repetitive editing task and you trust Claude on the pattern — reformatting twenty meeting notes, for instance, where the first edit taught you what the result looks like. Do not start a fresh session in this mode.

**Plan mode**: Claude does not change anything at all. It plans — it describes what it would do in plain English, lists the files it would touch, and stops. You read the plan, decide whether you like it, and switch back to a normal mode to execute. This is the mode for sensitive folders or unfamiliar territory. "Show me what you would do, but don't do it yet."

For the first week, stay in default mode. You can switch modes from inside Claude by typing a slash command (the prompt `>` accepts them), but the mode you want at the start is the one that asks every time. The friction is the feature.

## The real answer to undo is git

If this sentence means nothing to you, skip the paragraph and read the next section. For those who know: if the folder you are working in is a git repository, undo is free. Claude's changes land as uncommitted edits, and `git diff` shows you everything that changed in this session, and `git checkout .` rolls everything back. Version control is the canonical safety net, and if you do any serious work in Claude Code you will eventually want to learn it — but not today. You do not need it to get started.

## The pre-flight copy

For everyone who is not using git — which is most people reading this — the practical undo is a simpler habit: **before you ask Claude to edit a file, duplicate it first.**

Say you have a file called `meeting-notes.md` on your desktop. Before you let Claude reformat it, make a copy:

```bash
cp meeting-notes.md meeting-notes.backup.md
```

Or just right-click the file in Finder or File Explorer and choose "Duplicate." The goal is identical: a second copy of the file sitting next to the original, with a slightly different name. If Claude's edit goes wrong — you do not like the result, something important got removed, the formatting is worse than before — you delete the edited version and rename the backup.

For folders with a few important files, duplicate the whole folder. For a long session, do it once at the start. You will throw away the backup ninety-five percent of the time. The other five percent, the thirty seconds you spent copying will feel like the best investment of your day.

This is not a sophisticated version control strategy. It is the manual equivalent of git for one document. That is the point. It is fast enough that you will actually do it.

## When to approve, when to deny

Approve when:

- The diff or command matches what you asked for.
- The file being changed is the file you intended to change.
- You could explain, in one sentence, what is about to happen.

Deny when:

- The change is bigger than you expected. Claude proposing to edit six files when you asked about one is a reason to stop and ask what it thinks it is doing.
- Something is about to be deleted and you are not 100% sure you want that.
- A shell command references a path outside the folder you are working in.
- You have not made a backup of the file, and the file matters.

Denying is not failure. It is part of the conversation. "Don't do that — let's narrow the scope. Only change the first paragraph" is a completely valid next turn, and Claude will adjust.

## What you just did

You learned that every file-changing action in Claude Code flows through an approval prompt, which shows you a diff for text edits and the exact command for everything else. You learned there are three permission modes — default (ask every time), acceptEdits (file edits silent, commands still approved), and plan (nothing changes, Claude just describes) — and that default is where you want to be until the tool feels natural. And you learned the single most useful undo habit for beginners: duplicate the file before you let Claude touch it.

## Try this

Find a short text file on your computer — meeting notes, a draft email, a paragraph you wrote in a `.txt` or `.md` file. Something under a page. Duplicate it first.

Now open Claude Code in the same folder (`cd` into it, then `claude`) and ask:

```
read meeting-notes.md and fix its formatting — consistent bullets, proper headings, no trailing whitespace
```

Use your actual file name. Claude will read the file and propose an edit. Look at the diff. Approve it if it looks right. Deny it if it does not, and ask for a narrower change.

When the edit is done, open the file and read the result. If you like it, delete the backup. If you do not, delete the edited version and rename the backup — that is your undo. Either way, you just went through the full loop of a real edit, under approval, with a safety net. Every future edit is a variation on this exact pattern.
