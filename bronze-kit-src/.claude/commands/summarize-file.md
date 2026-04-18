---
name: summarize-file
description: Summarize a file. Pass a path. Returns a 3-sentence TL;DR, 5 key bullets, and any open questions.
---

Summarize the file at the path the user gives you. If no path is provided, ask which file they mean and stop.

Before summarizing, actually read the file. Don't guess from the filename.

Output exactly this structure, nothing else:

### TL;DR

Three sentences. No more. Lead with the single most important thing.

### Key points

- Bullet 1
- Bullet 2
- Bullet 3
- Bullet 4
- Bullet 5

Keep bullets to one line each. If the file doesn't have five meaningful points, give fewer — don't pad.

### Open questions

Any genuine ambiguity or missing context that would change the summary. If there are none, write "None."

### Worth flagging

Anything the user probably didn't read carefully but should. Skip this section if nothing applies.

Tone: direct, professional, mildly dry. No "Great question!" or "This document is fascinating." Just the summary.
