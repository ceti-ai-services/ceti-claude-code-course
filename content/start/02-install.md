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

- **A Claude.ai subscription** (Pro or Max). If you already pay for Claude in the browser, that same login works for Claude Code. This is the simplest path for most non-developers. There is nothing else to set up.
- **An Anthropic API key.** This is a long string of characters you generate at console.anthropic.com. It charges your account per request. You only need this if you do not have a Claude.ai subscription, or if you need more control over billing and usage.

Pick whichever you already have. If you have neither, a Claude.ai Pro subscription is the path of least resistance.

## The install command

Regardless of operating system, the command that actually installs Claude Code is the same:

```bash
npm install -g @anthropic-ai/claude-code
```

`npm` is the package manager that comes with Node.js. `install -g` means "install globally, so I can run it from anywhere." `@anthropic-ai/claude-code` is the name of the package. After this command finishes, you can type `claude` in any terminal window and it will launch.

The rest of this lesson is about getting to the point where that command works.

## Mac

Open Spotlight — that is Command+Space — and type `Terminal`. Press Return. A plain window appears with a cursor blinking after some text that ends in `$` or `%`. That is the terminal. The `$` or `%` is called the **prompt**. It is waiting for you to type.

Type this and press Return:

```bash
node --version
```

If you see something like `v20.11.1` or any number 18 or higher, Node is already installed. Skip to the install step.

If you see `command not found: node`, you need to install Node. Go to nodejs.org, click the download button marked **LTS** (long-term support — the stable version), run the installer like any other Mac app, and accept the defaults. Close the Terminal window and open a fresh one — installers do not affect terminals that were already open.

With Node installed, run:

```bash
npm install -g @anthropic-ai/claude-code
```

It will print a few lines and return you to the prompt. You may see a warning about permissions — if the install fails with an `EACCES` error, run the same command again with `sudo` at the front:

```bash
sudo npm install -g @anthropic-ai/claude-code
```

It will ask for your Mac password. Type it (the cursor will not move — this is normal), press Return, and the install will proceed.

When it finishes, type `claude` and press Return. You have arrived at the first-launch screen.

## Windows

Windows has two terminals: the old one (Command Prompt, mostly avoid) and the modern one (Windows Terminal or PowerShell). You want PowerShell, which is built in to every Windows 10 and 11 machine. Click the Start button, type `PowerShell`, and open the app that appears.

Check for Node:

```powershell
node --version
```

If Node is missing, go to nodejs.org and download the **LTS** Windows installer. Run it, accept defaults, and open a fresh PowerShell window when it finishes.

Install Claude Code:

```powershell
npm install -g @anthropic-ai/claude-code
```

Then run `claude`.

If `claude` is not found after the install finishes cleanly, or if you hit strange errors that mention permissions or paths, there is a more reliable path on Windows: **WSL**, the Windows Subsystem for Linux. WSL gives you a real Linux terminal inside Windows, and Claude Code tends to run more smoothly there. To install it, open PowerShell **as administrator** (right-click, "Run as administrator") and run:

```powershell
wsl --install
```

Restart your computer when it tells you to. After restarting, a new app called **Ubuntu** will be in your Start menu. Open it. You are now in a Linux terminal. Follow the Linux section below from here.

WSL is not required. Many people run Claude Code on plain PowerShell without trouble. But if the plain-PowerShell path is giving you a week's worth of weird errors, WSL is the escape hatch.

## Linux

You probably already have a terminal open. Check Node:

```bash
node --version
```

If missing, install Node from your distribution's package manager (`apt`, `dnf`, `pacman` — whichever you use), or from nodejs.org if you want the latest LTS build.

Then:

```bash
npm install -g @anthropic-ai/claude-code
```

If you see `EACCES` errors, prefix with `sudo`. Run `claude` to launch.

## The first launch

The first time you type `claude` and press Return, you will see a short welcome screen followed by an authentication prompt. It offers you two paths — the same two from the Prerequisites section above.

**Path 1: Claude.ai subscription.** Choose this option. Claude Code opens a browser tab where you sign in to your Claude account. Once you approve access, the tab confirms and you return to the terminal. You are logged in. This is the recommended path for most readers.

**Path 2: API key.** Go to console.anthropic.com, sign in (or create an account), and find the **API Keys** page in the settings. Click **Create Key**, copy the long string it shows you — it starts with `sk-ant-` — and paste it back into the terminal when Claude Code asks. That key is a password. Do not email it to yourself, do not paste it into a chat window, do not commit it to a public folder. Keep it to yourself.

After authentication, the terminal settles into something that looks roughly like this:

```
> 
```

That single `>` with a blinking cursor is the Claude Code prompt. It's waiting for a question.

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
