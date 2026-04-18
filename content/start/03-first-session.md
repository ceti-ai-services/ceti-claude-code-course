---
title: Your First Real Session
module: 03
time: "12 min"
---

# Your First Real Session

You have Claude Code installed and you have seen the `>` prompt. Now you need something to actually do with it. This lesson is about starting in the right folder, asking a good first question, and noticing where Claude reads first versus where it guesses. These three habits set the tone for every session after.

## Start in a scoped folder

Claude Code sees whatever folder you launched it in. If you launch from your home directory — which is the default when you open a fresh terminal — it can see everything: Desktop, Documents, Downloads, iCloud, the whole surface of your personal life. That is a lot of context for a first session. It is also a lot of things for Claude to read before it can answer anything useful.

The first habit, then: **before you type `claude`, move into a smaller folder.** The command to do this is `cd`, which stands for *change directory*. You give it a path — the location of a folder — and it moves your terminal into that folder. From then on, every command you run is relative to that folder.

On a Mac, say you want to work inside `Documents/contracts`:

```bash
cd ~/Documents/contracts
```

The `~` is shorthand for your home folder. On Windows PowerShell the idea is identical, though the slashes may flip:

```powershell
cd ~\Documents\contracts
```

If you are not sure whether the folder exists, or you want to see what is in the folder you are currently in, type `ls` (Mac/Linux) or `dir` (Windows). It prints the list.

A shortcut worth knowing: on Mac, you can drag a folder from Finder into the Terminal window and it will paste the full path automatically. Type `cd ` (with a space after), drag the folder in, press Return. Windows supports the same drag-and-drop trick in most terminals.

Once you are inside a reasonable folder — one that has somewhere between five and a few hundred files, not your entire home directory — launch Claude:

```bash
claude
```

The `>` prompt comes back, but now it is scoped to the folder you are in. That is the working context for this entire session.

## Ask a real first question

The best first question is almost always the same one:

```
what's in this folder and what is it for?
```

Claude will read the folder. Not just the filenames — it will open the documents that seem most important and skim them. Then it will tell you, in plain English, what kind of folder this is: a project, a client archive, a research pile, a mess. It will name the main documents and guess at their purpose.

This question is useful for two reasons. First, it is diagnostic for you — if you inherited this folder or have not touched it in a year, Claude's summary tells you what you forgot. Second, it is diagnostic for Claude — you are watching it read, and you can tell from its answer whether it actually opened the right things or jumped to conclusions. If the summary is wrong, correct it now, before you ask for anything that matters.

A weaker version of the same question is "what files are here?" Claude will answer that too, but the answer is just a list. The stronger version forces Claude to read and interpret, which is what you actually need.

## Shape the output

Claude's default answer to the first question is a paragraph. That is fine, sometimes. Often you want something more structured. You do not need to start over — you just ask.

```
rewrite that as a table with three columns: file name, type, one-sentence purpose
```

Or:

```
give me a bullet list of just the documents that look client-facing
```

Or:

```
which of these files are duplicates or near-duplicates of each other?
```

This is the single biggest habit shift from browser chatbots: you are not trying to write the perfect first prompt. You are having a conversation. The first answer gets you oriented. The second, third, and fourth answers refine it. The conversation is the tool.

Claude remembers the earlier turns in the same session. You do not need to repaste the folder contents. "Rewrite that as a table" works because *that* is unambiguous — it refers to the answer you are both looking at.

## Read versus guess

Claude Code cannot guess its way to the content of your files. It has to read them. If you ask "what are the main themes in the attached PDF?" without any PDFs actually being in the folder, Claude will tell you there are no PDFs here. It will not hallucinate a summary of a file it has not seen.

The corollary is the opposite: if you ask a question that *does* require reading, Claude will actually read. Sometimes several files. You will see it mention the files as it goes, which is your signal that it is looking at real content rather than making things up.

You can lean on this. Ask specific, grounded questions:

- "Which of these contracts mention exclusivity?"
- "What is the deadline mentioned across these meeting notes, and who owns it?"
- "Are there any inconsistencies between the two versions of the proposal in this folder?"

Each of those is a question Claude will answer by reading. Each answer will cite which files it used. That citation habit is worth rewarding — if Claude gives you an answer without pointing to files, ask it to show its work.

## A brief caution

Do not run Claude Code in your home directory for a first session. Not because anything catastrophic will happen — the approval system prevents accidents — but because the context is so broad that every question gets slow, and the answers are diluted across hundreds of irrelevant files. Start small. A single project folder. A client subfolder. The `Downloads` folder is a decent middle ground for an organizational exercise, but not for real work.

If you ever open Claude Code and realize you are in the wrong folder, type `exit` to leave, then `cd` into the right one, then `claude` again. It is a clean way to reset.

## What you just did

You learned the one-command habit that makes every session better: `cd` into a scoped folder before you launch Claude. You asked the strongest possible first question — what is this folder and what is it for — and watched Claude actually read before answering. You saw that the conversation continues across turns, so you can reshape the output without restarting. And you learned that Claude will not guess at file contents it has not read, which is the property that makes its answers trustworthy.

## Try this

Pick a folder on your computer that you inherited from someone else, or that you have not opened in at least six months. Good candidates: a copy of a shared drive someone sent you, an old project folder, a client archive, a mystery folder on your desktop called "stuff."

Open a fresh terminal, `cd` into that folder, launch `claude`, and ask:

```
what's in this folder and what is it for? explain it to me as if I were a new coworker
```

When Claude answers, ask one follow-up that forces it to read more deeply:

```
which three documents are the most important, and why?
```

You should finish the exercise with a paragraph-long understanding of a folder you previously had no memory of. If Claude's answers feel vague or generic, that is a clue — either the folder is genuinely messy, or Claude is skimming instead of reading. Push back. Ask it which specific files it opened to produce each claim.
