---
title: The Mental Model
module: 01
time: "12 min"
---

# The Mental Model

You have probably used ChatGPT or Claude in a browser. You paste something in, it writes something back, you copy the response into the document or spreadsheet that actually needs it. The answer is often good. The workflow is terrible. Every useful output is trapped behind a copy-paste wall, and the AI never sees the actual files you work with.

Claude Code is a different kind of tool for the same underlying model. Before you install anything, it helps to understand what it is, and — more importantly — what it is not.

## What Claude Code actually is

Claude Code is a **terminal-native assistant**. The *terminal* is the text-based window your operating system has had since the 1970s — on a Mac it is called Terminal, on Windows it is PowerShell or Windows Terminal, on Linux it is whatever shell you use. You type a command, it does something, you see the result. Claude Code runs in that window.

Once it is running, Claude can do three things you cannot do in a browser chatbot:

1. **Read files on your computer.** Not just files you upload — any file in the folder where you started it. Ten-year-old Word documents, a CSV full of customers, a folder of meeting transcripts. It reads them directly.
2. **Run commands.** It can open a program, rename files, convert a document, search across a hundred PDFs. With your permission, every time.
3. **Edit files.** It can change the text in a document, reorganize a spreadsheet, rewrite a draft. Again — with your permission, every time.

That last phrase matters. Claude Code is built on an approval model. Before anything on your computer changes, it asks. You see the proposed change. You say yes or no.

## What Claude Code is not

It is not a browser chatbot with a new skin. It is not a plugin inside VS Code, Cursor, or any other editor. It is not a SaaS product you log into at some URL.

It lives in the folder where your work lives. When you start it inside your `Contracts` folder, it sees your contracts. When you start it inside `Downloads`, it sees your downloads. It has no memory of other folders. It has no access to your whole computer — only the one it was started in, and its subfolders.

That scoping is the feature, not a limitation. You decide what it can see by deciding where you launch it.

## The careful junior colleague

Here is the analogy that makes the rest of this course easier to follow.

Think of Claude Code as a **careful junior colleague** who has just joined your team. They are fast, fluent, and they read quickly. But they are new. They do not know which files matter. They have not met the client. They have never used the shared drive before.

A careful junior colleague does three things you want from any new hire:

- **They ask before they touch anything.** "Should I move these files into a subfolder, or leave them as they are?" is a much better sentence than the sound of files being moved.
- **They read before they act.** If you ask them to summarize a folder, they open the folder first. They do not guess.
- **They explain their plan.** When the work is non-trivial, they describe what they are about to do in plain English, and wait for you to nod.

Claude Code behaves this way by default. The discipline is built in. Your job is not to supervise it constantly — it is to give it enough context to be useful, then review its proposals before approving them.

## Vending machine versus colleague

Most people's first instinct with AI is to treat it like a vending machine. You put in a prompt, a response falls out, you walk away. The loop never closes. You copy the output into a Google Doc and massage it into the real deliverable. Nothing the AI produced actually made contact with the real work.

Claude Code is the colleague model. You work in the same folder. The AI opens the same files you would open. When it drafts something, the draft lands in the actual document — not in a separate chat window that you then have to ferry back. When you tell it something about how your team operates, it remembers for that project. The loop closes.

This is the biggest single shift in the rest of this course. You are not going to learn better prompts. You are going to learn to work alongside something that can open the files and do the thing.

## A concrete example

You have forty meeting notes from Q1. Your boss wants a summary of the recurring themes by Thursday.

The vending-machine version: open each note, copy the text, paste into a chatbot, ask for themes, copy the answer, paste into a doc, repeat — or do it all at once and blow past the context window.

The colleague version: open Claude Code inside the folder that contains the forty notes. Ask, "Read everything in this folder and tell me the three most common themes, with quotes." It reads them. It answers. You ask follow-ups. When you like the result, you ask it to write the summary as a Word document in the same folder. It does. Your Thursday deliverable is a real file, not a chat log.

The difference is not the quality of the answer. It is the number of moments where you had to manually shuttle text between windows. That number goes to zero.

## What you just did

You read a definition and an analogy. The definition: Claude Code is a terminal-native AI that reads files, runs commands, and edits code or documents with your approval, scoped to the folder you launch it in. The analogy: a careful junior colleague who reads first, asks before acting, and closes the loop by working in the same files you do. Everything in the next six lessons builds on these two ideas. If one sticks, make it the colleague.

## Try this

Open a plain text file — Notes, TextEdit, Word, whatever you have. Write down one task you do every week that involves **five or more files**. The task should be something tedious that you do not enjoy: compiling a weekly report from multiple sources, cleaning up a shared folder, drafting follow-ups from meeting transcripts, reconciling a spreadsheet against another one, summarizing a batch of contracts. One sentence is enough.

Save the file somewhere you will find it again. You are going to use this task as your real use case in Module 06, and it is going to become the thing you automate.

Do not overthink it. The best candidate is the task you mildly dread on Monday mornings.
