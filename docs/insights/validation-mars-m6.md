# MARS validation — Bronze EN corpus (M6 ship)

**Date**: 2026-04-18 · **Scope**: `content/start/01..07` EN + `app/pages/academy/index.vue` · **Contract**: `docs/DECISIONS.md` 2026-04-19 entry.
**Verdict**: Yellow — fix M03 backup line first.

## Domain decomposition

The corpus teaches against seven implicit domains:

1. Folder discipline / scope-as-universe (M03, restated M05)
2. Conversational-AI-as-colleague pattern (M01, M03)
3. Trust calibration / approval discipline (M04, M06)
4. Project memory / persistent context (M05)
5. Real-task closure / last-mile execution (M06, M07)
6. Habit formation / weekly integration (M07)
7. OS + install literacy (M02)

## Integration map

M06 hard-depends on M01 (task name), M03 (folder), M04 (approval instinct), M05 (CLAUDE.md). All four are named explicitly inside M06 — dependency graph is honored. M05 hard-depends on M03's folder; also honored. M07 depends on M06's shipped file; honored.

**Weak joint**: the backup-first habit is introduced in M04, but M03's TryThis asks the reader to run Claude against "5–20 files" *without* telling them to duplicate the folder first. A novice doing M03 on a precious folder is unprotected for one module. Move one sentence of the backup habit up into M03's warning block.

## Leverage point (Meadows)

Goals and paradigm levels are correctly set — "colleague not vending machine" is a paradigm-shift framing (level 2), and "ship one real thing" is a goal-shift (level 3). Both are the highest-leverage moves in the corpus and they land.

**The highest-leverage missing move is feedback-loop structure (level 6–7).** DECISIONS explicitly defers the AI assistant, which is fine. But the current corpus has no *paper-grade* loop either. M06 ends with "write down four numbers" — good — but M07 never asks the reader to retrieve them. No return artifact, no URL to come back to, no checklist that reads last week's commits. The week-long shift M07 promises has nothing to close it.

## Synthesis (200w)

The corpus works as a system. The spine — M01 paradigm → M03 scope → M05 memory → M06 execute → M07 habit — is a clean S-curve of increasing commitment. Voice is consistent. The four personas carry specificity without fragmenting the throughline. The "read → plan → execute" triad in M06 is the pedagogical keystone, correctly placed late. Banned-words discipline is holding.

The biggest structural weakness is a **pedagogy gap between M06 and M07**. M06 closes a *session* loop cleanly (one file, four numbers). M07 opens a *week* loop ("three habits by Friday") with no artifact to close it against. The reader who finishes M06 Sunday night has no checkpoint, no return page, no "what did you do this week" — only text telling them it should have happened. M01's paradigm shift is session-grade; the behavioral shift M07 promises is week-grade. The corpus ships the first loop without the second. This is the dependency the future AI assistant is designed to fill, which is correct, but the corpus ships *without an interim artifact* bridging the gap.

## Validate

- **Does the corpus satisfy the DECISIONS goal** (meet solo founders where they are, one real thing shipped by end of week)? **Yes for the session. Partial for the week.** M01–M06 meet the audience and ship one thing. M07 names the week-shift but gives the reader no mechanism to stay in the loop.
- **Biggest latent risk**: the Service persona's M06 TryThis assumes the reader can assemble a CSV + calendar export + WhatsApp screenshots in one folder. A non-developer salon owner doesn't know how to export WhatsApp. They hit that wall, feel stupid, close the tab. Cohort-zero abandonment probability is highest at M06 for Service + Realestate, where *data-gathering* — not Claude — is the blocker.
- **Go/no-go for ES + cohort launch**: **Yellow — ship but watch.** Corpus is strong, single structural gap is addressable in under an hour. Do not block ES translation on it. Do ship fix #1 before cohort-zero link send.

## Top 3 improvements (ranked by leverage)

**1. `content/start/06-real-use-case.md` — add a "gather the inputs" preamble per persona.**
The Creator and Consultant walkthroughs start from a folder the reader already has. Service and Realestate assume CSV exports, WhatsApp screenshots, MLS downloads already sitting in the folder. That step is invisible to a novice and is the single most likely abandonment point. Add a one-paragraph "Before you open Claude: here's what goes in the folder, and how to get it there" per persona, specifically naming the export step for the non-obvious cases (WhatsApp → three-dot menu → Export chat; MLS → listing → Export comps CSV). Two sentences each, four personas, ~120 words total.

**2. `content/start/07-next-steps.md` — give the week-loop a single artifact.**
The three habits are good. The close is not. Add zero-code return: a `<TryThis time="2 min">` at the end of M07 that writes the three habits as three sendable lines per persona and tells the reader to paste them into their own SMS or set three Google Calendar reminders (Mon/Wed/Fri 9am). That closes the week loop with the reader's own phone — no component needed.

**3. `content/start/03-first-session.md` — lift the backup sentence forward.**
M04 teaches `cp file file.backup` as the universal undo, but M03's TryThis tells the reader to run Claude on "5–20 files" before that habit is introduced. Add one line to M03's existing warning callout: *"If the folder holds work you cannot afford to lose, duplicate it first — right-click → Duplicate. You'll learn why in Module 04."* One sentence closes the only dependency the corpus violates.
