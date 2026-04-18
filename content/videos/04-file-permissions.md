# Video 04 — File Permissions
**Duration target:** 9–11 min · **Module pairing:** Bronze 04

## Cold open (0:00–0:20)

[B-ROLL: Screen capture. A terminal, mid-session. Claude is about to edit a file. An approval prompt is on screen, asking "approve" or "deny." The cursor hovers on "approve." Hold 2 seconds.]

This is the most important screen in the whole tool. Right here. When Claude wants to change a file, you see exactly what it wants to change, before it happens. You say yes. Or you say no.

[PAUSE — 1s beat]

## Shot list

| #  | Time        | Shot                                                  | Notes |
|----|-------------|-------------------------------------------------------|-------|
| 1  | 0:00–0:20   | B-roll: close-up of the approve prompt                | Hold steady, no motion |
| 2  | 0:20–1:00   | Talking head                                          | Why permissions exist. Trust but verify |
| 3  | 1:00–2:00   | Screen capture: setup — a small text file open        | Show the file before Claude touches it |
| 4  | 2:00–3:00   | Screen capture: backup command                        | `cp meeting-notes.txt meeting-notes.txt.bak` |
| 5  | 3:00–4:30   | Screen capture: ask Claude to edit                    | The prompt and the approval dialog |
| 6  | 4:30–5:30   | Screen capture: approve, see the diff, file on disk   | Open the file after |
| 7  | 5:30–6:30   | Screen capture: a second ask, deny this time          | Claude pivots |
| 8  | 6:30–7:30   | Screen capture: revert from the backup                | `cp meeting-notes.txt.bak meeting-notes.txt` |
| 9  | 7:30–9:00   | Talking head + overlay                                | Permission modes briefly |
| 10 | 9:00–9:40   | Talking head with end card                            | Outro and tease |

## Teleprompter script

[STAGE DIRECTION: Shot 2 — talking head.]

Claude Code is built on a trust-but-verify model. The default is cautious. The agent reads freely. It will not write to a file, and it will not run a command, without stopping to show you what it is about to do. This video is about that moment.

[PAUSE — 1s beat]

We are going to make a small edit to a real file. We are going to practice saying yes. We are going to practice saying no. And we are going to install a habit before we even start, which is making a backup.

[STAGE DIRECTION: Shot 3 — screen capture. Terminal is in a folder with a file called `meeting-notes.txt`. The file is shown in a text editor or by printing it to screen.]

[B-ROLL: the file contents are visible. Three short paragraphs of meeting notes.]

Here is my file. `meeting-notes.txt`. Three short paragraphs. I am about to ask Claude to tighten the wording. Before I do anything, I make a copy.

[STAGE DIRECTION: Shot 4 — types `cp meeting-notes.txt meeting-notes.txt.bak`.]

[CURSOR HIGHLIGHT: the command]

`cp meeting-notes.txt meeting-notes.txt.bak`. Translation: copy this file to a file of the same name plus dot bak. The dot bak at the end is a convention. It means "backup." It is not magic, it is just a filename.

[STAGE DIRECTION: presses return. No output. Prompt returns.]

Silence is the terminal saying "done." Now I have two files. The original, and a copy I can always come back to.

[PAUSE — 1s beat]

This habit is cheap. Ten seconds. It is also the single biggest reason I have never been sad about an edit Claude made. If I hate the result, I overwrite the original with the backup. That is it.

[STAGE DIRECTION: Shot 5 — screen capture. `claude` is already running. Types a prompt.]

[STAGE DIRECTION: types: "Tighten the wording in meeting-notes.txt. Keep the same facts. Cut filler."]

[CURSOR HIGHLIGHT: the prompt]

The ask. "Tighten the wording in meeting-notes dot txt. Keep the same facts. Cut filler."

[PAUSE — 1s beat]

[STAGE DIRECTION: presses return. Claude thinks. An approval prompt appears, showing the proposed change with a diff.]

[CURSOR HIGHLIGHT: the approval dialog]

Here is the dialog. This is the screen from the cold open. You can see the file name at the top. You can see the proposed new content below. Two choices. Approve. Deny.

[B-ROLL: zoom slightly on the diff. Minus lines in one color, plus lines in another.]

Read the diff before you approve. Always. This is twenty seconds of your life that saves you from weird edits.

[STAGE DIRECTION: selects "approve."]

I approve. Claude writes the file. The prompt returns. Claude gives me a one-line summary of what it changed.

[STAGE DIRECTION: Shot 6 — opens the file. Shows the new tighter version.]

[CURSOR HIGHLIGHT: the first changed paragraph]

And there is the file on disk, tighter. Same facts. Less fluff. Exactly what I asked for.

[PAUSE — 1s beat]

Now. The other direction.

[STAGE DIRECTION: Shot 7 — back in the terminal. Another prompt.]

[STAGE DIRECTION: types: "Add a section at the top summarizing next steps in bullet points."]

Another ask. "Add a section at the top summarizing next steps in bullet points."

[STAGE DIRECTION: presses return. Approval prompt appears again, showing the proposed addition.]

[CURSOR HIGHLIGHT: the proposed bullet list in the dialog]

Claude shows me what it would add. Four bullets. I read them. The third bullet is wrong. Claude guessed, and it guessed badly. I do not want this change.

[STAGE DIRECTION: selects "deny."]

I deny. Claude does not write. Claude acknowledges the denial and asks me what it should do instead.

[PAUSE — 1s beat]

[STAGE DIRECTION: types: "Never mind on the top section. Ignore my last request."]

I tell it to drop the request. It drops it. We move on. No file was touched.

That is the full shape of a denial. The agent did not sulk. It did not argue. It did not write the file anyway. It stopped and asked what to do next.

[STAGE DIRECTION: Shot 8 — screen capture. A demonstration of the revert.]

Suppose, hypothetically, I had approved that bad edit. Here is how I would undo it. Outside of `claude`, in a normal terminal tab.

[STAGE DIRECTION: types `cp meeting-notes.txt.bak meeting-notes.txt`.]

[CURSOR HIGHLIGHT: the command]

`cp meeting-notes.txt.bak meeting-notes.txt`. Overwrite the main file with the backup. The dot bak file becomes the source of truth, and the original is restored.

[STAGE DIRECTION: presses return. Prompt returns silently.]

Done. The file is back to the state it was in before I ever asked Claude to touch it. This is why we made the backup in the first place.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 9 — talking head. Overlay: three pills, labeled "default," "acceptEdits," "plan."]

One more thing, and then we stop. Claude Code has three permission modes. The default one is what we have been using in this video. It asks before every edit. There is a mode called acceptEdits, which auto-approves edits inside the folder but still asks for commands. And there is a mode called plan, where Claude is in read-only thinking mode and will not touch anything.

[CURSOR HIGHLIGHT: the "default" pill]

For everything you do this week, default. Ask before every edit. Read the diff. Approve, or do not. Over time, you will develop a feel for when to relax into acceptEdits for routine work. But that feel comes from watching the approvals, not from skipping them.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 10 — talking head with end card: "Next: CLAUDE.md."]

Backup first. Read the diff. Approve or deny. That is the loop.

## On-screen callouts (complete list)

- [0:05] Title card: "File Permissions" — Oswald 700, cream on olive, 2s hold
- [0:25] Callout pill: "Trust, but verify" — sage, 3s hold
- [1:20] Filename label: `meeting-notes.txt` — pointing arrow, camel, 2s hold
- [2:10] Command annotation: `cp meeting-notes.txt meeting-notes.txt.bak` — "Make a backup before asking for edits"
- [2:40] Callout pill: "Backup first. Always." — sage, 4s hold
- [3:05] Prompt callout: "Tighten the wording in meeting-notes.txt. Keep the same facts. Cut filler."
- [3:30] Dialog arrow: "Read the diff before you approve" — camel, points at the diff area, 4s hold
- [4:15] Approve label: "Approve" — persistent on the dialog
- [4:40] Gloss after approval: "Claude wrote the file" — italic DM Sans, 3s hold
- [5:40] Prompt callout: "Add a section at the top summarizing next steps in bullet points."
- [6:05] Dialog arrow: "Something is wrong in this proposal" — camel, 4s hold
- [6:20] Deny label: "Deny" — persistent on the dialog
- [6:40] Gloss after denial: "No file was written" — italic DM Sans, 3s hold
- [6:50] Command annotation: `cp meeting-notes.txt.bak meeting-notes.txt` — "Restore the backup if you approved something you regret"
- [7:45] Three-pill overlay: "default" / "acceptEdits" / "plan" — JetBrains Mono, persistent
- [8:15] Callout under "default": "Use this for the first month" — italic DM Sans, 4s hold
- [9:10] End card: "Next: CLAUDE.md" — JetBrains Mono, bottom-right, 3s hold

## Outro (last 20s)

[STAGE DIRECTION: talking head, end card visible.]

Next video, we give Claude a cheat sheet about your project so it stops guessing.
