---
title: Your first real session. Not a hello. A useful answer.
module: "03"
time: "14 min"
tags: [first-session, scope, folder-discipline, bronze]
skills_gained: [scoping, first-prompt, folder-awareness]
persona_aware: true
---

# Your first real session. Not a hello. A useful answer.

You've installed it. You ran `claude` for the first time. If you did the Module 02 TryThis end-to-end, you already pointed it at a scoped folder and asked your first real question — so the idea of this module is already physically true for you. This module names it, shows you where the next two sessions should go, and gets you a habit worth keeping.

If you skipped ahead and you're staring at a cursor in a fresh terminal right now, don't type "hi." Don't type "what can you do." Don't type anything until you've done one thing: chosen the folder where your real work lives.

This module is 80% about that choice. The typing part takes 30 seconds.

## The one idea: scope is everything

When you start Claude Code in a folder, Claude can read everything inside that folder and its subfolders. Not your whole computer. Not your other projects. Just that one tree.

This is not a limitation. It's the feature.

<Callout variant="core-idea">
Wherever you launch Claude, that's the universe it operates in. Move the universe by moving your starting point.
</Callout>

You want to work with your client drafts? Open a terminal in your `Clients` folder. You want to clean up your DMs export? Open one in the folder where the export lives. You want to sort through receipts? Go to `Downloads` — or better, a subfolder.

Rule of thumb: the smaller and more specific the folder, the better your first session will be. A folder with 10 files related to one task beats a folder with 500 files from three years of your life.

## The move

1. Open your file manager (Finder on Mac, Explorer on Windows, Files on Linux).
2. Find one folder that holds **one batch of related work** — not your whole Documents tree, not your whole Desktop.
3. Right-click that folder. On Mac: "New Terminal at Folder." On Windows/Linux: "Open in Terminal" or equivalent. If that option isn't there, open Terminal yourself and type `cd ` followed by dragging the folder onto the terminal window — that pastes the path.
4. Type `claude` and press enter.

You're now inside Claude Code, scoped to that folder. Every file in there is readable. Nothing outside is.

<Callout variant="warning">
Do not start Claude Code in your home folder (`~` or `/Users/you`) or on your Desktop. That's where years of everything lives — financial PDFs, old screenshots, exports you forgot about. Start scoped.

If the folder you picked holds work you cannot afford to lose, duplicate it first — right-click → Duplicate on Mac, Copy + Paste in Explorer on Windows. Work Claude against the copy until you trust the session. You'll learn the full undo discipline in Module 04, but the "make a copy first" habit is worth starting now.
</Callout>

## What to ask first

Most people waste their first prompt asking what Claude can do. Ask that in the documentation, not in the session.

Ask Claude what *you* have. That's the one question it can answer better than you can:

> What's in this folder and what is it for?

That's your first prompt. It's simple. It does something powerful: Claude opens files, skims them, and gives you a summary of your own work back in plain English.

You'll be surprised how often the summary is different from what you *thought* was in there.

<PersonaExample>
  <template #creator>

  Pick a folder where you've been dumping content assets — maybe `Content/2026/` or `Brand/Captions-batch/`. Open Claude there. Ask "what's in this folder and what is it for?" Claude will tell you what formats are present, how many files, and a best guess at the theme. Then try: "Group these into three buckets — posted, scheduled, and abandoned drafts. Show me the counts."

  </template>
  <template #consultant>

  Pick a client folder — one client, not your full `Clients/` tree. Something like `Clients/Acme/2026-Q1/`. Open Claude there. Ask "what's in this folder and what is it for?" You'll get a summary of briefs, drafts, invoices, notes. Then try: "What's the most recent thing I did for this client, and what does it look like they're waiting on from me?"

  </template>
  <template #service>

  Pick a folder where you keep operational files — maybe bookings exports, a price list, intake forms. Open Claude there. Ask "what's in this folder and what is it for?" Claude will summarize the file types and likely purpose. Then try: "Look at my most recent bookings export and tell me my three busiest days this month."

  </template>
  <template #realestate>

  Pick one transaction folder — a single property, not your whole database. Something like `Transactions/145-Main-St/`. Open Claude there. Ask "what's in this folder and what is it for?" Claude will summarize the docs — listing agreement, disclosures, inspection, comps. Then try: "What's the most recent document, and what's the next thing I'm waiting on from the other side?"

  </template>
</PersonaExample>

## The part that makes this a session, not a query

Here's the shift people miss: once Claude has read your folder, you're in a conversation. You can keep asking.

"Now group those by status."
"Write a follow-up email for the one that's oldest."
"Draft a summary I can send my boss / partner / the client."

Each answer stays in context. Claude remembers what you asked two questions ago. You don't have to re-explain.

This is what makes Claude Code different from the chatbot version: the session holds. A vending machine resets between transactions. A colleague remembers the last five minutes.

<Callout variant="tip">
If you feel like you should "start fresh" — don't. Keep the session. Ask the next thing. The more Claude learns about your folder, the sharper each answer gets.
</Callout>

## When to end the session

Type `/exit` or close the terminal when you're done. Everything Claude did to your files is already saved — it didn't hold anything in its head. Next time you run `claude` in that folder, you'll start a new session, and Claude will re-read whatever you point it at.

Sessions are cheap. Folders are the thing that matters.

<Recap>

Your folder is your frame. Start Claude Code inside the specific piece of work you want help with — not your whole life. Ask it to describe what's there before you ask it to do anything. Then keep the conversation going. The work gets better as Claude learns what it's looking at.

</Recap>

<TryThis time="8 min">

Pick one folder on your computer that holds 5–20 files you've been meaning to get through. Not your entire Documents. One task's worth of work.

Open Claude Code there. Ask: "What's in this folder and what is it for?"

Read the answer. Then ask one follow-up — something specific to what you just learned. See how fast you can get to *"okay, I actually want to do X with this."*

When you close the session, write down two things: the folder you picked, and the first useful thing Claude told you that you didn't already know. Save them. You'll come back to them in Module 06.

</TryThis>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader what they found. Not rendered yet. -->
