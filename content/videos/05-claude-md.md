# Video 05 — CLAUDE.md
**Duration target:** 8–10 min · **Module pairing:** Bronze 05

## Cold open (0:00–0:20)

[B-ROLL: A text editor opens an empty file. The title bar reads `CLAUDE.md`. The cursor blinks on line 1. Hold 2 seconds.]

This is the single file that teaches Claude who you are, what this folder is, and how you want the work to sound. You write it once. Claude reads it every time.

[PAUSE — 1s beat]

## Shot list

| #  | Time       | Shot                                              | Notes |
|----|------------|---------------------------------------------------|-------|
| 1  | 0:00–0:20  | B-roll: empty CLAUDE.md in an editor              | Static, cursor blinking |
| 2  | 0:20–1:00  | Talking head                                      | What CLAUDE.md is, and is not |
| 3  | 1:00–2:00  | Overlay graphic: three-section template           | Who I am, what this folder is, output style |
| 4  | 2:00–3:30  | Screen capture: create CLAUDE.md in the folder    | Fill in "Who I am" section live |
| 5  | 3:30–4:30  | Screen capture: fill in "What this folder is"     | Two or three lines |
| 6  | 4:30–5:30  | Screen capture: fill in "Output style"            | Concrete rules |
| 7  | 5:30–6:30  | Screen capture: save, launch a fresh `claude`     | Show it picks up the context |
| 8  | 6:30–7:30  | Screen capture: ask a question, compare before/after | Same question, better answer |
| 9  | 7:30–8:30  | Talking head                                      | What not to put in it |
| 10 | 8:30–9:10  | Talking head with end card                        | Outro and tease |

## Teleprompter script

[STAGE DIRECTION: Shot 2 — talking head.]

CLAUDE dot MD, in all capitals with a dot MD, is a plain markdown file that lives in your project folder. When you start a Claude Code session in that folder, it reads this file automatically. You do not call it. You do not invoke it. It is just there, and Claude picks it up.

[PAUSE — 1s beat]

The purpose is simple. Instead of re-explaining who you are and what this project is every session, you explain it once, in this file. From then on, Claude starts with that context already loaded.

[STAGE DIRECTION: Shot 3 — overlay graphic. Three labeled boxes stacked vertically. Box 1: "Who I am." Box 2: "What this folder is." Box 3: "Output style."]

I teach this as three sections. You can add more later. These three are enough to start.

One. Who I am. A few lines about you, professionally. What you do, what your audience is, what your constraints are. Two. What this folder is. One paragraph describing the project, its purpose, and the key people or facts involved. Three. Output style. The rules about how you want Claude to write. Tone, format, length, things to avoid.

[PAUSE — 1s beat]

Three sections. We are going to write one, together, right now.

[STAGE DIRECTION: Shot 4 — screen capture. Terminal is in a project folder. Text editor opens a new file.]

[STAGE DIRECTION: creates a new file called `CLAUDE.md` in the folder. Editor shows an empty file.]

I open a blank file. I name it `CLAUDE.md`, all caps on the name, lowercase `md`. Case matters. If you name it `claude.md` or `Claude.md` it may not be found.

[STAGE DIRECTION: types the first section heading and content.]

```
# Who I am

I am Manu, a consultant who teaches AI tools to non-developers.
Most of my writing is for clients who want plain English, no jargon,
and clear next steps.
```

Three lines. Who I am, who I write for, what I need. I am not writing my resume. I am writing the thing Claude needs to know about me to be useful.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 5 — screen capture. Types the second section.]

```
# What this folder is

This folder contains materials for a Bronze-level training cohort
on Claude Code. Outputs include teleprompter scripts, shot lists,
and short written lessons. The audience is non-developers.
Target tone is warm, confident, and dry.
```

That is section two. Four lines, and already Claude knows what the files are likely to be, who the audience is, and the register I want. Notice I said "warm, confident, and dry." Those are style words, not vibes. They will matter in a minute.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 6 — screen capture. Types the third section.]

```
# Output style

- Short sentences.
- No hype words: "dive in," "unlock," "revolutionize," "game-changer."
- When proposing changes, show the smallest possible diff.
- If you are unsure, ask me before editing.
- Prefer plain markdown. No tables unless I ask for one.
```

Section three. Five bullets. These are rules. Claude treats them as rules.

The one that earns its keep most often is the fourth bullet. "If you are unsure, ask me before editing." That line alone reduces the number of bad suggestions I see by about half.

[STAGE DIRECTION: saves the file.]

[CURSOR HIGHLIGHT: the save indicator / filename]

Save. That is the whole file for now.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 7 — screen capture. Back in the terminal. Types `claude` to launch a fresh session.]

Now I start a new Claude session in the same folder.

[STAGE DIRECTION: types `claude`. The assistant launches. A small note may appear indicating context has been loaded.]

[CURSOR HIGHLIGHT: the launch banner]

Claude reads CLAUDE.md on startup. That is it. There is no command, no flag, no invocation. It is read automatically.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 8 — screen capture. A test question.]

Let me test it. Same question I might have asked yesterday.

[STAGE DIRECTION: types: "Write an intro paragraph for the Bronze 05 lesson."]

"Write an intro paragraph for the Bronze 05 lesson." Press return.

[STAGE DIRECTION: Claude responds with a short paragraph. The paragraph is in short sentences, avoids hype words, and matches the described tone.]

[CURSOR HIGHLIGHT: the response]

Look at what just happened. Short sentences. No hype. No "let's dive in." Warm, confident, dry. I did not have to prompt for any of that. CLAUDE.md did it.

Before CLAUDE.md, I would have had to repeat those rules every session. Or paste them into every prompt. Or correct Claude three times before it settled into the right voice. Now it is the default.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 9 — talking head.]

Two things not to put in CLAUDE.md.

One. Secrets. No API keys, no passwords, no client names if those are confidential. The file often ends up in source control. Assume it is visible.

Two. Long background reading. CLAUDE.md is a cheat sheet, not a dossier. If you find yourself writing a third page, stop. Link to another document, or break the project into smaller folders, each with its own CLAUDE.md. Short is the whole point.

[PAUSE — 1s beat]

One more quick note. CLAUDE.md is read at session start. If you edit it mid-session, the changes do not take effect until you start a new session. Save the file. Quit with Ctrl-C. Run `claude` again. The new version is live.

[STAGE DIRECTION: Shot 10 — talking head with end card: "Next: A real use case."]

You write this file once per project. You tune it over time. It is the single biggest upgrade to your daily workflow.

## On-screen callouts (complete list)

- [0:05] Title card: "CLAUDE.md" — Oswald 700, cream on olive, 2s hold
- [0:25] Callout pill: "Read automatically at session start" — sage, 4s hold
- [1:05] Three-box overlay: "Who I am" / "What this folder is" / "Output style" — Oswald labels, persistent
- [2:05] Filename label: `CLAUDE.md` — camel arrow, 3s hold
- [2:10] Warning pill: "Case matters: all caps on the name" — sage, 3s hold
- [2:30] Section label: "Who I am" — Oswald, overlay, 3s hold
- [3:40] Section label: "What this folder is" — Oswald, overlay, 3s hold
- [4:35] Section label: "Output style" — Oswald, overlay, 3s hold
- [5:10] Callout pill: "Rules, not vibes" — sage, 3s hold
- [5:50] Command annotation: `claude` — "Launch a new session so the file is loaded"
- [6:20] Gloss: "No command invokes CLAUDE.md. It is read on startup." — italic DM Sans, 4s hold
- [6:40] Prompt callout: "Write an intro paragraph for the Bronze 05 lesson."
- [7:10] Callout on response: "Short sentences. No hype. Warm and dry." — sage, 4s hold
- [7:45] Warning pill: "Do not put secrets in CLAUDE.md" — camel, 4s hold
- [8:10] Callout: "Edits take effect on the next session" — italic DM Sans, 4s hold
- [8:50] End card: "Next: A real use case" — JetBrains Mono, bottom-right, 3s hold

## Outro (last 20s)

[STAGE DIRECTION: talking head, end card visible.]

Next video, we take everything so far and do a real, messy, useful task end to end.
