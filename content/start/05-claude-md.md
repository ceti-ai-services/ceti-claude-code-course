---
title: Teach it once. Let it remember forever.
module: "05"
time: "13 min"
tags: [claude-md, project-memory, context, bronze]
skills_gained: [writing-claude-md, project-memory, persistent-context]
persona_aware: true
---

# Teach it once. Let it remember forever.

Three sessions in, you'll notice it. The same two sentences at the top of every prompt.

*"Just a reminder — I'm a [whatever you are], my clients are [whoever they are], keep the tone [however you want it]."*

You type it. Claude responds well. You close the session. Tomorrow you open a new one and type it again. Maybe with a typo. Maybe missing the third thing you keep meaning to mention. The reintroduction tax is real, and it's paid in the worst currency — the first three minutes of every session, every day.

There is a file that ends this. It's called `CLAUDE.md`. It sits in your folder. Claude reads it automatically at the start of every session in that folder. You write it once. The reintroduction stops.

## What CLAUDE.md actually is

It's a plain text file. Markdown — the same format these lessons are written in. You can make it in any text editor, in Finder, in the terminal, anywhere.

When you start Claude in a folder that contains a `CLAUDE.md`, Claude opens it before it says hello. Whatever is in that file becomes the ambient context for the session. Who you are, what this folder is for, what your standards are — all available to Claude without you having to say any of it out loud.

<Callout variant="core-idea">
CLAUDE.md is not a prompt. It's not a slash command. It's a file that sits in the folder. Claude reads it at session start. That's the entire mechanism.
</Callout>

<CourseDiagram id="m05-d1" />

It's also not magic. If your file says "always use British English" and you ask Claude to "write this one in American," Claude uses American. The file is the default, not a handcuff.

## The four things worth writing down

A useful CLAUDE.md answers four questions. You don't need headers for each — a short paragraph is fine. But these four axes are where the value is.

<CourseDiagram id="m05-d2" />

Keep it short. One screen is ideal. A two-page CLAUDE.md is worse than a six-line one, because your future self has to maintain it.

## Four versions. Pick the one closest to yours.

Here's what this looks like filled out for four very different people. Read the one closest to your work. Steal what's useful. Modify the rest.

<PersonaExample>
  <template #creator>

  ```markdown
  # Context for Claude

  ## Who I am
  I run a newsletter + YouTube channel about home organization for people
  with ADHD. ~18k subs across both. Solo operator.

  ## What this folder is
  Content batches — scripts, caption drafts, newsletter bodies, research
  notes. Organized by week, sometimes by theme.

  ## How I write
  - Short sentences. Deadpan. Never peppy.
  - Never use the words "hack," "life-changing," or "productivity."
  - Examples from my own mess, not other people's.

  ## Audience
  Women 28–45 who already tried the trendy systems and bounced off them.
  They're tired of being sold to. Assume they're smart and burned out.

  ## Never do
  - Suggest I buy apps or courses in the script.
  - Rewrite my voice — tighten it, don't replace it.
  ```

  </template>
  <template #consultant>

  ```markdown
  # Context for Claude

  ## Who I am
  Independent brand strategist. Ten years in. Three retainer clients,
  one project client at a time. I bill hourly and hate scope creep.

  ## What this folder is
  Active client work for Meridian Foods — their rebrand project.
  Briefs, decks, client emails, meeting notes, my own research.

  ## How I work
  - Direct, no fluff. Client is senior — don't over-explain.
  - When I ask for a draft, default to short. I'll ask if I want more.
  - Flag anything that reads like I'm trying too hard.

  ## Audience for outputs
  Meridian's CMO (reads fast, hates adjectives) and their board
  (wants numbers and one-page summaries, not strategy essays).

  ## Never do
  - Propose scope beyond what's in the current SOW.
  - Use the word "leverage" as a verb. Ever.
  ```

  </template>
  <template #service>

  ```markdown
  # Context for Claude

  ## Who I am
  I own a small salon — two chairs, me plus one stylist. We do cuts,
  color, and weddings. Bookings come in through text mostly.

  ## What this folder is
  My business admin — bookings exports, client notes, price list,
  supplier invoices, the WhatsApp history I occasionally export.

  ## How I talk to clients
  - Warm but professional. Usted for new clients, vos for regulars.
  - Never use emojis in price conversations.
  - Confirm appointments with time + service + stylist, nothing else.

  ## Audience for outputs
  Clients via WhatsApp (short, casual) and my accountant (just the
  numbers, in a table).

  ## Never do
  - Invent prices. If you don't see it in price-list.md, ask me.
  - Share or reference other clients' info when drafting a reply.
  ```

  </template>
  <template #realestate>

  ```markdown
  # Context for Claude

  ## Who I am
  Residential broker in Austin. 12 years in. Mostly working with
  buyers $500k–$1.2M, a few listings a quarter.

  ## What this folder is
  One transaction: 145 Main St listing. MLS exports, comps CSVs,
  disclosures, inspection PDFs, my buyer correspondence.

  ## How I write to clients
  - Plain English, not MLS-speak. Buyers are first-timers.
  - Numbers first, narrative second. Never bury the ask.
  - Disclosure language stays exact. Don't paraphrase what the
    inspection report said — quote it.

  ## Audience for outputs
  Buyers (warm, specific), my broker (flag anything requiring a
  second read), the other agent (professional, brief).

  ## Never do
  - Give legal advice. Flag anything that needs the attorney.
  - Invent comps. Only use numbers from the CSVs in /comps.
  ```

  </template>
</PersonaExample>

Notice what's in all four: specific audience, specific voice, specific "never do." Notice what's not: no job description for Claude, no "you are a helpful assistant." You're not prompting Claude — you're briefing it on *you*.

## Project beats global. That's the whole priority rule.

You'll eventually read that Claude Code checks multiple CLAUDE.md files — a global one, a project one, sometimes a local one. Ignore the others for now.

<Callout variant="tip">
The one that matters is the CLAUDE.md sitting in the folder you launched from. That's your project file. It wins over anything global. Ninety percent of your useful context is folder-specific anyway — the client, the tone, the audience, the stakes. Write one good project-level CLAUDE.md and you're done.
</Callout>

If you later find yourself re-typing the same *universal* thing ("I'm in Austin, my work day is 9–6, I prefer American English") into multiple CLAUDE.mds, that's when a global one starts earning its keep. Not before.

## The thing people get wrong

The mistake is writing CLAUDE.md like a prompt. Claude already has a job description — what Claude doesn't have is *you*.

<CourseDiagram id="m05-d3" />

Write the thing only you can write: the specific shape of your work, your clients, your standards, your non-negotiables.

<CourseDiagram id="m05-d4" />

Read it out loud when you're done. If it sounds like a briefing document for a new assistant who just got hired on Monday, it's right. If it sounds like a prompt, rewrite it.

<TryThis time="10 min">

Open the folder you used in Module 03 — the one where you asked Claude to describe what was in it.

Create a file in that folder named exactly `CLAUDE.md`. On Mac: in Finder, right-click → New Document, then rename it. In the terminal: `touch CLAUDE.md`. On Windows: in File Explorer, right-click → New Text Document, rename to `CLAUDE.md` (make sure it's not `CLAUDE.md.txt`).

Paste the template from the persona closest to you. Change three things so it describes your actual work, your actual voice, your actual audience. Save.

Now start a fresh session: exit any existing Claude session, run `claude` again in that folder, and ask the same opening question you asked in Module 03:

```
what's in this folder and what is it for?
```

The answer should land differently. More specific. Less generic. If it still feels generic, your CLAUDE.md is too vague — add one more sharp sentence, save, open a fresh session, ask again. That loop is how you learn what kind of context actually moves Claude.

</TryThis>

<Recap>

CLAUDE.md is the file that ends the daily reintroduction. It lives in your folder, Claude reads it every session, and it holds the four things Claude can't know without you telling it: who you are, what this folder is for, what conventions you care about, and who reads the outputs. It's not a prompt and not a command — it's a briefing document for a colleague who just started. Project-level file, in the folder root. That's the one that matters.

</Recap>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader what's in their CLAUDE.md and where it's still vague. Not rendered yet. -->
