---
title: Git integration — commits, branches, PRs through Claude
module: "12"
time: "12 min"
tags: [git, version-control, commits, pull-requests, bronze]
skills_gained: [git-with-claude, reviewing-diffs, honest-commit-messages]
persona_aware: false
---

# Git integration — commits, branches, PRs through Claude

If you've used git before, everything you know still applies. Claude doesn't replace git — it uses git the way a careful colleague would, stopping to show you what's about to happen at every step that matters.

## The shape of a git session with Claude

You ask Claude to make a change. Claude proposes the plan. You approve. Claude runs the edits. Now there are uncommitted changes in your working tree. This is where git usually begins.

Ask Claude to open a branch, stage the relevant files, and write a commit message. Each of those steps is a tool call you approve. The branch gets created with a name that describes the change. The stage step shows you exactly which files it's adding — read the list before approving, because this is where scope creep sneaks in. Then Claude drafts the commit message.

<Callout variant="core-idea">
Claude can open a branch, make the change, stage it, and write a commit message that tells the truth — you still approve the push.
</Callout>

## Commit messages that tell the truth

Most AI-generated commit messages are bad because they summarize the diff in flattering language. *"Improved error handling and enhanced logging."* Meaningless. Claude, prompted well, writes the opposite kind of message — one that names what changed and why.

Good commit messages from Claude follow a shape: one-line summary in imperative mood, blank line, a paragraph that says what changed, why it changed, and what to watch for. No adjectives. No "improvements." If you read the message and still don't know what the commit does, send it back: *"rewrite — tell me what the behavior was before and what it is now."*

Read every commit message out loud before approving. If it sounds like marketing copy, it's wrong. If it sounds like a note you'd leave for the next engineer, it's right.

## The draft PR pattern

For anything non-trivial, push to a branch and open a draft pull request rather than committing straight to main. Draft PRs are low-stakes — reviewers see the diff, CI runs, and nothing is merged until you flip the draft flag off. Ask Claude: *"push this branch and open a draft PR against main, with a description that summarizes the change and lists what still needs review."*

This is the default on teams. For solo work it's still the safer default, because future-you reviewing a draft PR catches things that current-you approved too fast.

## What to never let Claude do

Three hard rules, worth saying plainly.

**Never force-push.** Force-push rewrites history and can destroy other people's work. If Claude proposes `git push --force` or `--force-with-lease`, stop and think. Almost always there's a safer move — amending a local commit, reverting with a new commit, or asking a human.

**Never skip hooks.** `--no-verify` bypasses pre-commit checks that exist for reasons. If a hook fails, the right move is to fix the underlying issue, not bypass the gate.

**Never commit secrets.** If Claude proposes staging a `.env`, a credentials file, or anything with an API key, reject the stage. Add the file to `.gitignore` and try again.

<Callout variant="warning">
Claude will occasionally try to be helpful in ways that are actively dangerous in a shared repo — force-push to fix a "messy history," `--no-verify` to get past a failing hook, `git add .` that sweeps in a secret. The approval prompt is your last line of defense. Read it.
</Callout>

<TryThis time="8 min">

Open a scratch repo — or clone something small you can throw away. Create a branch with `git checkout -b claude-test` before you start, so you're not in main.

Ask Claude to make one small change. A typo fix in a README. A new line in a config file. Something trivial. Let Claude propose the edit, approve it, then ask: *"stage this file and write a commit message."*

Read the message Claude drafts. Read it out loud. Is it honest? Does it describe what changed and why? If it's vague, ask Claude to rewrite. Once the message is right, approve the commit.

Leave the branch uncommitted to remote. You just walked the full loop — edit, stage, message, commit — with approvals at every step, and nothing left the machine.

</TryThis>

<Recap>

Claude uses git the way you would — branch, edit, stage, commit, push — but every step is a tool call you can read and approve. Commit messages should describe what changed and why, not praise the change. Draft PRs beat direct pushes to main for anything non-trivial. Never let Claude force-push, skip hooks, or commit secrets. Read the message out loud before you approve the commit — the two seconds is how you keep the git history honest.

</Recap>
