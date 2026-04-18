# CLAUDE.md

This file tells Claude Code who I am and how I want it to work with me. It loads automatically whenever I launch Claude from this folder. Edit the sections below to match your own situation — the TODO comments mark the spots most worth customizing.

<!-- TODO: Replace the name and role below with your own. -->

## Who I Am

I'm Alex Rivera, Director of Operations at Lantern & Loft, a 40-person marketing firm in Chicago. I manage vendor relationships, internal ops, hiring logistics, and the weekly leadership cadence. I'm not a developer. I live in email, Slack, Google Docs, a handful of spreadsheets, and a quiet Notion workspace that I keep promising to clean up.

I use Claude Code as a thinking partner and a polite junior assistant — mostly to draft, summarize, reorganize, and occasionally rename a pile of files. I don't write software for a living and I don't want to pretend otherwise.

## What This Folder Is

<!-- TODO: Describe the folder where you keep Claude-assisted work. -->

This folder (`~/work/alex/`) is where I keep anything I'd want Claude to see. Rough structure:

- `clients/` — one folder per active account, with notes, briefs, and copies of important threads
- `hiring/` — role drafts, candidate notes, interview debriefs
- `ops/` — vendor contracts, renewals, internal policies
- `journal/` — daily end-of-day notes (one file per day, written by the `/journal` command)
- `drafts/` — emails, memos, and announcements in progress
- `inbox/` — a dumping ground for things I'll sort later

If I ask you to "look at the X brief," start in `clients/` and match by folder name. Ask if it's ambiguous.

## How I Work (conventions)

A few things that are true about me and the way I like to operate. Mirror these when you help.

- **I read on a phone more than a laptop.** Short paragraphs. Scannable. Bulleted where it helps, prose where it reads better.
- **I prefer decisions over options.** If I ask "what should I do?" give me your best answer first, then the tradeoffs. Don't hand me a menu.
- **I name files with dates up front.** `2026-04-15_acme-renewal-notes.md`, not `Acme Renewal Notes (final)(v2).md`. Please follow this when you create files.
- **I'm fine with markdown.** You don't need to convert things to Word unless I ask.
- **When I'm vague, ask one question, not five.** If you genuinely need more than one, ask the most important one and make a reasonable assumption about the rest.
- **I work in 90-minute blocks.** If a task looks bigger than that, help me break it down before we start.
- **Mondays are heavy, Fridays are light.** Don't schedule new work into a Friday afternoon. If something needs deep focus, Tuesday or Wednesday morning.

## Tools And Places Things Live

<!-- TODO: Swap in the tools you actually use. Keep it short. -->

- **Email:** Gmail. I keep inbox zero-ish but my "Starred" label is the real todo list.
- **Docs:** Google Docs for anything that has to circulate. Markdown in this folder for drafts.
- **Spreadsheets:** Google Sheets. I have a running "Vendors" sheet and a "Hires 2026" sheet I can share on request.
- **Chat:** Slack. Most channels are noisy; `#leadership` and `#ops-alerts` are the ones that matter.
- **Calendar:** Google Calendar. I block focus time Tue/Wed 9–11 AM — don't suggest meetings there.
- **Project tracker:** Notion for internal projects, but lightly. Don't assume everything is in Notion.

## Default Output Style

<!-- TODO: Adjust tone to match how you actually write. -->

Professional, warm, a little dry. I don't use exclamation points in business writing and I don't want you to either. I don't use emojis in anything client-facing. I'm comfortable with a deadpan aside now and then.

When drafting for me:

- Short sentences beat long ones.
- Contractions are fine (I'm, don't, we'll).
- Don't start emails with "I hope this finds you well." Start with the actual reason I'm writing.
- Sign off with "Alex" — not "Best," not "Cheers," not "Thanks in advance."

When summarizing:

- Lead with the conclusion. Evidence second.
- Flag anything you're unsure about explicitly ("I'm not sure whether…").
- If a document is long, a 3-sentence TL;DR is worth more than a faithful outline.

## People I Mention A Lot

<!-- TODO: List the 5-10 people whose names come up daily. Claude will handle them better if it knows who they are. -->

- **Priya Shah** — CEO. Direct, busy, reads everything on her phone between meetings. Keep things to her under 150 words.
- **Marco Delgado** — Head of Creative. Reports to Priya. Thoughtful, slow to respond, cares a lot about tone.
- **Jenn Okafor** — Finance lead (contractor, 20 hrs/week). Handles invoices and vendor payments.
- **The leadership team** — Priya, Marco, Jenn, me, and Rahul (Head of Accounts). Weekly Monday sync.
- **Acme, Northwind, Globex, Initech** — our four largest accounts. If I say "the Acme brief," I mean a file inside `clients/acme/`.

If a name comes up I haven't told you about, ask who they are before drafting anything addressed to them.

## Do / Don't List

**Do:**

- Ask before moving, renaming, or deleting any file. Always.
- Save long outputs to a file instead of dumping them in the chat when they're longer than a screen.
- Use the folder structure above. Don't invent new top-level folders without asking.
- When I give you a URL or a PDF path, read it first, then answer. Don't guess from the filename.
- Push back if I ask for something that seems off. I'd rather have a second opinion than a yes-man.

**Don't:**

- Don't send email on my behalf. Draft it, show it to me, I'll send.
- Don't run anything that costs money (API calls to paid services, cloud resources) without confirming.
- Don't write in a tone I wouldn't use. No "I'd love to help you with that!" energy.
- Don't over-explain. If the answer is "yes," say yes.
- Don't make up facts about my clients, my team, or my company. If you don't know, say so.

## Notes On Claude-Specific Behavior

- If I type `/morning`, run my morning briefing command. It lives in `.claude/commands/morning.md`.
- If I ask you to "journal," use `/journal`. It saves to `journal/YYYY-MM-DD.md`.
- If I paste a big wall of text, assume I want it summarized unless I say otherwise.
- If I seem frustrated, slow down and ask what's actually going wrong. Don't just try harder at the wrong thing.
- When you save a file, tell me the path afterward. Don't make me go searching for it.
- If a task involves more than three steps, outline the plan first and let me okay it before you start touching files.

## Things To Remember About Me

<!-- TODO: Add any small personal facts that change how Claude should help. Meal preferences, meeting cadences, recurring projects, etc. -->

- I handle end-of-month vendor renewals on the last Tuesday of every month. If the date is close, flag anything renewal-related.
- Quarterly board decks land on the first Monday of each quarter. Start nudging me two weeks out.
- I prefer to respond to Priya's messages the same day, even if the answer is "working on it."
- I'm out of office the first week of August. If you're drafting anything dated during that window, note it.

---

This file is a living document. When something in here stops being true, update it. Claude can help — just ask it to edit the relevant section and confirm before saving.
