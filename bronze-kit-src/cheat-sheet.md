---
title: "Claude Code — Bronze Cheat Sheet"
subtitle: "One page. Keep it near your keyboard."
author: "CETI.AI"
---

# Claude Code — Bronze Cheat Sheet

## Install (one-liner)

```bash
npm install -g @anthropic-ai/claude-code
```

Needs Node 18+. Check with `node -v`. If `npm` complains about permissions, see FAQ — don't reach for `sudo`.

## Launch

```bash
cd ~/path/to/your/folder    # go where your work lives
claude                      # start Claude Code
```

The folder you launch from is the folder Claude sees. If your `CLAUDE.md` is in `~/work/alex/`, launch from `~/work/alex/`.

## Essential keys

| Key | What it does |
|---|---|
| `Enter` | Send your message |
| `y` then `Enter` | Approve an action Claude is asking about |
| `n` then `Enter` | Deny an action |
| `Esc` | Cancel Claude's current response |
| `Ctrl+C` | Exit Claude |
| `/exit` | Also exits, politely |
| `Shift+Enter` | New line in your message (no send) |
| `/` | Show available slash commands |

## Three useful first prompts

1. **"Read CLAUDE.md and tell me what you understood about me."** Catches anything you got wrong in setup.
2. **"Summarize the five most recently modified files in this folder. Three sentences each."** Proves Claude can actually see your files.
3. **"Help me draft a short email to [person] about [topic]. Warm tone, under 120 words."** The everyday workhorse.

## CLAUDE.md anatomy

The file Claude reads automatically. Six sections worth having:

1. **Who I Am** — name, role, one sentence of context
2. **What This Folder Is** — what lives here, rough structure
3. **How I Work** — your conventions (file naming, reading habits)
4. **Default Output Style** — tone, length, sign-off
5. **People I Mention A Lot** — the five to ten names Claude will see most
6. **Do / Don't List** — explicit guardrails

Short, specific, and maintained beats long and forgotten.

## Safety rules

- **Read before you run.** When Claude asks to run a shell command or edit a file, read the prompt before pressing `y`.
- **Never paste API keys into chat.** Put them in `.env` or environment variables.
- **Claude can't undo file deletions.** If you ask it to delete, it will. Ask for a move to `_archive/` instead when in doubt.
- **Client data stays local.** Don't paste confidential information into prompts you wouldn't send in an email.
- **Approval is a feature, not a friction.** If you find yourself approving the same thing twenty times, add it to `.claude/settings.json` on purpose — don't muscle-memory `y`.

## Where to get help

- Official docs: **docs.anthropic.com/claude-code**
- This kit's FAQ: open `FAQ.md` in the folder you unzipped
- If you're in the CETI.AI course: bring the exact error text — screenshot or copy-paste — to the next session
