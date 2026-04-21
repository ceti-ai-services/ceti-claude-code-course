---
title: Skills — packaged capabilities Claude loads on demand
module: "08"
time: "12 min"
tags: [skills, capabilities, expertise, bronze]
skills_gained: [writing-skills, skill-triggers, skill-vs-command]
persona_aware: false
---

# Skills — packaged capabilities Claude loads on demand

A slash command is a prompt you invoke. A skill is a body of knowledge that loads itself when the moment calls for it. You don't summon it. Claude notices the shape of what you're asking, matches it to a skill description, and pulls the skill into context before answering.

## Where skills live

A skill is a folder. It sits at `.claude/skills/<skill-name>/` and contains at minimum one file called `SKILL.md`. The folder can also hold reference documents, templates, example outputs — anything Claude might need once the skill is active.

<CourseDiagram id="m08-d1" />

<CourseDiagram id="m08-d2" />

The `description` field in the frontmatter is load-bearing. Claude reads all skill descriptions at session start and uses them to decide when to pull a skill in. Vague description, skill never loads. Sharp description with the phrases the user actually says ("status update," "Friday recap"), skill loads at the right moment.

<CourseDiagram id="m08-d3" />

<Callout variant="core-idea">
A skill is a folder of expertise Claude can load when the task matches.
</Callout>

## How skills differ from slash commands

A slash command is a prompt. A skill is a small instruction manual. The slash command runs once and is gone. The skill stays loaded for the rest of the conversation and keeps shaping every related answer.

Use a slash command when you want the same output every time. Use a skill when you want the *shape* consistent but the content variable.

## What goes in the folder

Start with just `SKILL.md`. If the skill grows — reference material, example outputs, templates — add them as sibling files. Claude can read them once the skill is active. A skill folder for drafting client emails might have `SKILL.md` plus `examples/` containing three real emails you've written, so Claude has tone to match.

<CourseDiagram id="m08-d4" />

<TryThis time="10 min">

Create `.claude/skills/weekly-status/` in a folder you work in regularly. Inside it, make `SKILL.md`. Use the template above but rewrite the three sections in your own words — what you actually track each week.

The description line is the one to get right. Write it as if you're telling a new assistant *"use this when I say X, Y, or Z."* Name the exact phrases you use when you ask for this kind of output.

Save. Start a new Claude session in that folder. Say "draft my status update for this week." Watch the shape of the output. If Claude skipped your sections or added its own, the skill isn't loading — sharpen the description, save, try again.

</TryThis>

<Recap>

Skills live at `.claude/skills/<name>/SKILL.md`. Frontmatter with `name` and `description` tells Claude when to load the skill. The body teaches Claude how to handle a recurring kind of task. Slash commands are explicit invocations, skills are ambient triggers — the skill's description is the trigger. Start with one folder, one SKILL.md, and sharpen the description until the skill loads at the right moments.

</Recap>
