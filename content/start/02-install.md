---
title: Install Claude Code
module: "02"
time: "14 min"
tags: [install, setup, bronze]
skills_gained: [install, first-launch, authentication]
persona_aware: false
---

# Install Claude Code

You've never opened a terminal. The internet is useless for first-timers — most install guides assume you already know what `npm` is, or that "just run this command" lands somewhere useful. This one doesn't. It walks the install from a cold start on Mac, Windows, and Linux, in that order. By the end you'll have a blinking `>` prompt waiting for your first question.

## Prerequisites

Two things must be true before Claude Code will run.

**First, you need Node.js version 18 or newer.** Node.js is a program that runs small applications written in JavaScript. Claude Code happens to be one of them. You will not write any JavaScript yourself — Node is simply the engine that Claude Code sits on top of. Many computers already have it. Many do not.

**Second, you need a way to sign in.** There are two valid paths:

- **A Claude.ai subscription** (Pro or Max). If you already pay for Claude in the browser, that same login works for Claude Code. This is the simplest path for most non-developers.
- **An Anthropic API key.** A long string of characters you generate at console.anthropic.com. It charges your account per request.

<CourseDiagram id="m02-d1" />

## The install command

Regardless of operating system, the command that actually installs Claude Code is the same:

```bash
npm install -g @anthropic-ai/claude-code
```

`npm` is the package manager that comes with Node.js. `install -g` means "install globally." `@anthropic-ai/claude-code` is the package. After it finishes, typing `claude` in any terminal launches the app.

<CourseDiagram id="m02-d3" />

## Open a terminal and run it

The shape is the same on every OS: open the right terminal, check for Node, install Claude Code, launch. The shell differs, and each platform has one escape hatch worth knowing.

<CourseDiagram id="m02-d2" />

Two notes the panel above doesn't fit:

- On **Mac or Linux**, if the install fails with an `EACCES` error, re-run the same command with `sudo` in front. Mac will ask for your password — the cursor won't move as you type it. That's normal.
- On **Windows**, `wsl --install` has to be run from a PowerShell opened **as administrator**. After you restart, you'll have a new app called **Ubuntu** in your Start menu — that's a real Linux terminal inside Windows.

## The first launch

The first time you type `claude` and press Return, you see a short welcome screen followed by an authentication prompt. Sign in with the path you picked earlier. If it's the API key path, note this: the key starts with `sk-ant-`, and it's a password. Don't email it to yourself, don't paste it into a chat window, don't commit it anywhere public.

After authentication, the terminal settles into a single `>` with a blinking cursor. That's Claude Code, waiting for a question.

<CourseDiagram id="m02-d4" />

<Recap>

You installed a terminal-native AI assistant. Node.js is the engine, `npm install -g @anthropic-ai/claude-code` is the install command, and `claude` is how you launch it. You authenticated with either a Claude.ai subscription or an API key, and you're now sitting at a `>` prompt in the folder you launched from. That folder is Claude's entire world right now — exactly the scoping the last lesson described.

</Recap>

<TryThis time="4 min">

Before you ask Claude anything, give it a folder to work in. Pick a small one — under 20 files — that holds work you'd like to look at. Avoid your Desktop and your home folder; both are too big for a first session.

If you're at the Claude prompt right now from the install above, type `exit` and press Return to close it. Then point a fresh terminal at your chosen folder:

- **Mac**: in Finder, right-click the folder → **New Terminal at Folder**.
- **Windows**: in File Explorer, Shift+right-click the folder → **Open in Terminal** (or **Open PowerShell window here**).
- **Linux** (or fallback for any OS): in the terminal, type `cd ` (with a trailing space), drag the folder from your file manager onto the terminal window — the path appears — and press Return.

Now type `claude` and press Return. This time the session is scoped to the folder you picked.

Ask:

```
what's in this folder and what is it for?
```

Claude opens the files, skims them, and gives you a one-paragraph summary of your own work back. That's the install confirmed *and* the next module's idea — scope — already physically true for you.

Type `/exit` to close, or leave it running and continue.

</TryThis>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader which OS they installed on and whether they hit any errors. Not rendered yet. -->
