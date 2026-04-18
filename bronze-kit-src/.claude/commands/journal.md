---
name: journal
description: 5-minute end-of-day reflection. Saves to journal/YYYY-MM-DD.md.
---

Run a short end-of-day reflection. The goal is a useful journal entry in five minutes — not a therapy session, not a status report.

Ask these three questions, one at a time. Wait for an answer before moving to the next.

1. **What got done today?** (Three things max. One sentence each.)
2. **What's blocked or waiting?** (If nothing, say so.)
3. **What's tomorrow's first move?** (One concrete action. Not "plan the week." Something you could start in ten minutes.)

If the user gives a vague answer, ask one follow-up. Don't pile on.

### Write the file

Save the entry to `journal/YYYY-MM-DD.md` relative to the current working directory. Use today's date in ISO format (e.g., `journal/2026-04-18.md`). Create the `journal/` directory if it doesn't exist.

Use this format:

```markdown
# YYYY-MM-DD

## Done

- Thing 1
- Thing 2
- Thing 3

## Blocked / waiting

- …

## Tomorrow's first move

…
```

After saving, confirm the file path to the user in one sentence. Don't summarize the entry back at them — they just wrote it.

If a journal file for today already exists, ask whether to **append**, **overwrite**, or **cancel**. Don't silently clobber their earlier entry.
