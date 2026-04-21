---
title: Hooks — safety gates and pre/post-tool-use automation
module: "10"
time: "14 min"
tags: [hooks, automation, safety, settings, bronze]
skills_gained: [writing-hooks, lifecycle-events, blocking-bad-commands]
persona_aware: false
---

# Hooks — safety gates and pre/post-tool-use automation

Most of Claude Code is cooperative — Claude proposes, you approve. Hooks are the one place the harness takes a firmer hand. A hook is your script, running at a moment you chose, able to inspect what Claude is about to do and decide what happens next.

## What a hook is

A hook is a small shell command (or script) that runs at a specific lifecycle event during a Claude session. You register it in your `settings.json` — either `.claude/settings.json` in the project, or the global `~/.claude/settings.json`. The hook runs automatically, every time its event fires, without you invoking it.

Three lifecycle events cover almost all practical use cases:

- **`PreToolUse`** — fires before Claude uses a tool. Your hook sees what Claude is about to do and can block it.
- **`PostToolUse`** — fires after a tool ran successfully. Useful for logging, formatting, notifications.
- **`Stop`** — fires when the session ends or Claude stops generating. Useful for summaries, cleanup, alerts.

<Callout variant="core-idea">
A hook is a small script that runs at a moment you choose — before a tool call, after a session, on pre-commit.
</Callout>

## Where hooks live

In your `settings.json`, under a `hooks` object. Each event is a key; each value is a list of matchers and the command to run. A minimal example that blocks `rm -rf` before Claude can run it:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf'; then echo 'blocked: rm -rf'; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

The matcher says "only run this hook when Claude is about to use the Bash tool." The command inspects what Claude plans to run. If the command contains `rm -rf`, the hook exits non-zero with a message, and the harness blocks the call. Claude sees the block and adjusts.

<Callout variant="warning">
A bad `PreToolUse` hook can block every tool call and make Claude useless. Test hooks in a scratch project before putting them in a real workspace. If you lock yourself out, edit `settings.json` directly to remove the hook.
</Callout>

## A safer example — `Stop` for a summary

Blocking hooks are powerful and easy to get wrong. A friendlier first hook is a `Stop` hook that echoes a summary line when Claude finishes:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[claude] session ended at $(date)\""
          }
        ]
      }
    ]
  }
}
```

No blocking. No decisions. Just a line that confirms the session closed and stamps the time. You'll know when it fires because the line shows up in your terminal.

## When to reach for hooks

Hooks are for things you want to happen *every time*, regardless of which prompt kicked them off. Logging. Safety rails. Auto-formatting after a write. A pre-commit check before Claude commits. If the rule is conditional on what you said in the prompt, a slash command or skill is the better tool. If the rule is "this should always happen in this workspace," it's a hook.

<TryThis time="8 min">

Open `.claude/settings.json` in a project folder. If the file doesn't exist, create it with `{}` as the starting contents.

Add a `Stop` hook that echoes a one-line summary when Claude finishes responding. Use the example above. Save.

Start a new Claude session in that folder. Ask it anything — *"what's in this folder?"* — and watch the terminal after the response completes. You should see the `[claude] session ended at …` line.

If you don't see it, the hook isn't registered. Check the JSON is valid (a missing comma will silently kill the hooks block) and restart Claude.

</TryThis>

<Recap>

Hooks are scripts registered in `settings.json` that run at specific lifecycle events — `PreToolUse`, `PostToolUse`, `Stop` are the three that cover most needs. `PreToolUse` can block dangerous calls. `PostToolUse` is for logging and auto-formatting. `Stop` is for session-end summaries. Test hooks in scratch projects before putting them in real workspaces. Use hooks when the behavior should be unconditional — everything else belongs in a command or a skill.

</Recap>
