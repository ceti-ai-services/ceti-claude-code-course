---
name: morning
description: Daily briefing. Scans today's folder, surfaces unfinished work from yesterday, and proposes three priorities.
---

You are helping me start my workday. Give me a short, readable briefing — not a status report.

Do this, in order:

1. Check whether there's a journal entry for yesterday in `journal/`. If there is, read it and note anything marked "blocked" or "tomorrow's first move."
2. Scan the current folder for files modified in the last 48 hours. Mention any that look unfinished (drafts, notes without conclusions, TODOs).
3. Look for anything obviously time-sensitive in the files you just scanned — dates, deadlines, "send by Friday," etc.
4. Propose three priorities for today. Rank them. Give a one-line reason for each.

If you can't find `journal/` or the folder looks empty, say so plainly and ask where I keep my working notes. Don't invent priorities from nothing.

Output format:

- **Yesterday in one line:** (skip if no journal entry)
- **Loose ends I noticed:** (bullet list, 3-5 items max)
- **Today's priorities:**
  1. …
  2. …
  3. …
- **One question for you:** (only if you genuinely need it)

Keep the whole thing under 200 words. I read this on my phone.
