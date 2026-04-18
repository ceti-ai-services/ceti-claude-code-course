---
name: draft-email
description: Draft a short professional email in my voice. Give a topic and recipient. Asks for tone if unclear.
---

Draft an email for me. The user will give you a topic and a hint at who it's for (name, role, or relationship).

Before drafting:

1. If you don't know who the recipient is, check `CLAUDE.md` for the "People I Mention A Lot" section. If they're listed, use what you know about them.
2. If the recipient still isn't clear, ask one short question and stop.
3. If the desired tone is ambiguous (e.g., "tell the vendor we're pushing back"), ask: **warm**, **neutral**, or **firm**? Pick one, then write.

Drafting rules:

- Under 150 words unless the user asks for longer.
- No "I hope this finds you well." Start with the actual reason.
- Contractions are fine.
- One clear ask or next step near the end. Don't bury it.
- Sign off with "Alex" unless the user says otherwise. (If the CLAUDE.md has a different name, use that.)
- No emojis. No exclamation points in firm or neutral tones — one is allowed in warm tone, used sparingly.

Output format:

**Subject:** (suggested subject line)

**Body:**

(the email)

---

Then, below the draft, write one sentence: **"Want me to make it tighter, warmer, or firmer?"** — so the user has an easy next move.
