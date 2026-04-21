---
title: Slash commands — reusable prompts you build once
module: "07"
time: "12 min"
tags: [slash-commands, reusable-prompts, workflow, bronze]
skills_gained: [writing-slash-commands, command-naming, prompt-reuse]
persona_aware: false
---

# Slash commands — reusable prompts you build once

By week three, you'll notice you've typed the same opening paragraph at Claude twenty times. "Look at the README, tell me what this folder does, flag anything that's out of date." Every Monday. Same prompt. Same thirty seconds of typing.

There's a file for that too.

## A slash command is a prompt with a name

A slash command is a markdown file in `.claude/commands/` inside your project. The filename becomes the command. `.claude/commands/morning.md` becomes `/morning`. You type the slash in Claude, pick from the list, and the prompt runs as if you'd typed it by hand.

The file has two parts: a short frontmatter block and a body. Frontmatter describes the command. Body is the prompt itself, word for word.

```markdown
---
description: Summarize what changed in this folder since yesterday
---

Look at the files in this folder. Tell me what changed in the last
24 hours and flag anything that looks half-finished or abandoned.
```

Save that as `.claude/commands/morning.md`. Restart Claude in the folder. Type `/`. There it is.

<Callout variant="core-idea">
A slash command is a prompt you wrote yesterday, waiting in a menu.
</Callout>

## Naming conventions that age well

Short verbs beat long nouns. `/morning` reads better than `/daily-folder-summary`. `/draft-email` beats `/compose-a-client-facing-email-message`. The command name is the name you'll type under time pressure — treat it like a keyboard shortcut, not a filename.

Group related commands with a common prefix when the set gets bigger. `/draft-email`, `/draft-invoice`, `/draft-follow-up`. The list sorts itself and you can scan by intent.

A slash command beats retyping for three reasons. One, the prompt stops drifting — you stop adding "oh, and also" edits every time you type it fresh. Two, you can share the folder with someone else and the commands come along. Three, refining the prompt means editing one file, not trying to remember what you changed last session.

## How this differs from CLAUDE.md

CLAUDE.md is ambient. It loads once per session and quietly shapes everything. A slash command is explicit — you invoke it, it runs, you see the output. CLAUDE.md says *who you are*. A slash command says *do this specific thing right now, the way I usually want it done*.

<TryThis time="8 min">

In your project folder, create the path `.claude/commands/` if it doesn't exist. Inside it, make a file called `summarize-readme.md`. Write three lines — frontmatter with a description, then a body that asks Claude to summarize the current folder's README in three bullets.

```markdown
---
description: Three-bullet summary of the current folder's README
---

Read the README in this folder. Give me three bullets: what this
project does, who it's for, and what state it's currently in.
```

Save. Restart Claude in that folder. Type `/summarize-readme`. Read the answer. If the output is too long, edit the body to say "one sentence per bullet." Save, run again. That's the whole loop.

</TryThis>

## When to make one

The rule of three. If you've typed a variant of the same prompt three times, it's a slash command. Not two. Three. Two is still a coincidence — three is a pattern. The first one you write takes ten minutes because you're learning the shape. The second takes two. After that, they cost nothing.

<Recap>

Slash commands live in `.claude/commands/<name>.md`. Frontmatter describes. Body runs as a prompt when you invoke `/<name>`. They make your repeated prompts concrete, shareable, and easy to refine. Short verb names, one command per file, and the rule of three before you write one. CLAUDE.md is the briefing document — slash commands are the shortcuts.

</Recap>
