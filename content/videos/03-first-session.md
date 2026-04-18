# Video 03 — Your First Session
**Duration target:** 9–10 min · **Module pairing:** Bronze 03

## Cold open (0:00–0:20)

[B-ROLL: A folder icon in Finder labeled "sample-project." Inside, a dozen files of different kinds — a PDF, three text notes, a spreadsheet, a draft document, an image. Cursor hovers over the folder.]

The first useful thing Claude Code does is almost boring. You open a folder of your own stuff, ask it what is in there, and it tells you. No setup, no prompt engineering. That is the job.

[PAUSE — 1s beat]

## Shot list

| #  | Time       | Shot                                               | Notes |
|----|------------|----------------------------------------------------|-------|
| 1  | 0:00–0:20  | B-roll: Finder window of sample-project            | Slow zoom in |
| 2  | 0:20–0:50  | Talking head                                       | Frame the session: open in folder, ask, read |
| 3  | 0:50–1:40  | Screen capture: Terminal, cd into folder           | Show the folder path clearly |
| 4  | 1:40–2:30  | Screen capture: launching `claude` in folder       | First question typed |
| 5  | 2:30–3:40  | Screen capture: Claude reads files, responds       | Scroll through the summary |
| 6  | 3:40–4:40  | Screen capture: follow-up for a table              | Claude formats a table |
| 7  | 4:40–5:30  | Talking head                                       | Why this is different from paste-into-chatbot |
| 8  | 5:30–6:30  | Screen capture: a narrow ask, one file             | Show scoping to a single file |
| 9  | 6:30–7:40  | Talking head with diagram overlay                  | Warning: do not run in home folder |
| 10 | 7:40–8:40  | Diagram: scope pyramid — home, project, subfolder  | Visualize the right level |
| 11 | 8:40–9:30  | Talking head with end card                         | Outro and tease |

## Teleprompter script

[STAGE DIRECTION: Shot 2 — talking head.]

A first session has three moves. You open a terminal. You move into a folder. You ask a question about what is in there. Everything else grows out of those three moves.

[PAUSE — 1s beat]

I am going to use a folder called `sample-project` in my Documents directory. It has the kind of mix you probably have somewhere on your own machine. A few notes, a draft, a spreadsheet, a PDF, an image. Ordinary.

[STAGE DIRECTION: Shot 3 — screen capture. Terminal open with a fresh prompt.]

[STAGE DIRECTION: types `cd ~/Documents/sample-project` and presses return. The prompt updates to show the new folder.]

[CURSOR HIGHLIGHT: the updated prompt showing the folder name]

First move. `cd`. That is short for "change directory." The tilde is shorthand for your home folder. So this says: take me into the sample-project folder inside Documents, inside my home folder.

[PAUSE — 1s beat]

If you are nervous about the terminal, just know this. `cd` is the only navigation command we need for this whole course. It goes into a folder. Nothing else happens.

[STAGE DIRECTION: types `ls`. Hits return. A listing of the files appears.]

One more housekeeping command. `ls`. That lists what is in the folder. This is optional. I like to eyeball it before I start, so I know what Claude is about to see.

[STAGE DIRECTION: Shot 4 — launches `claude`. Welcome banner appears.]

[STAGE DIRECTION: types `claude` and hits return. The assistant prompt appears.]

Second move. `claude`. This launches the assistant inside this folder. The assistant now has the folder as its working context. It has not read anything yet, but it knows where it is.

[PAUSE — 1s beat]

Third move. Ask the question.

[STAGE DIRECTION: Shot 5 — types the prompt slowly enough to read.]

[STAGE DIRECTION: prompt typed: "What is in this folder and what is it for?"]

[CURSOR HIGHLIGHT: the prompt text as it is typed]

That is the prompt. Eleven words. I am not being clever. I am being specific. "What is in this folder" is a factual question. "What is it for" is an interpretive question. I want both.

[STAGE DIRECTION: presses return. Claude begins streaming a response. The response includes a file-by-file summary and a paragraph guessing at the project.]

[STAGE DIRECTION: scroll through the response so the viewer can see it.]

What is happening under the hood: Claude is looking at the file names, reading the contents of the readable ones, skipping or describing the binary ones. A PDF, it can read. A photo, it can describe but not see in detail. A spreadsheet, it can read the cells.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 6 — follow-up prompt.]

[STAGE DIRECTION: types: "Turn that into a table. Columns: file, type, one-line summary, date."]

Follow-up. I want this as a table. Notice the form of the request. I am naming the columns. I am not hoping Claude will guess what I want. When you ask for a specific shape, you get that shape.

[STAGE DIRECTION: presses return. A markdown table streams out. Rows for each file.]

[CURSOR HIGHLIGHT: the table as it renders]

There is the table. Copy it into a document, a message, wherever. Done.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 7 — talking head.]

This is the part that is different. In a browser chatbot, to get here, you would have had to describe the folder in words. Or copy file contents one at a time. Or upload every file. With Claude Code, the folder is the input. You do not restate it. You point, and the agent looks.

[PAUSE — 1s beat]

That is worth sitting with for a second. The shape of your question changes. You stop saying "here is a document, please do X." You start saying "in this folder, please do X." It sounds small. It changes the whole rhythm of the work.

[STAGE DIRECTION: Shot 8 — screen capture. A narrower follow-up.]

[STAGE DIRECTION: types: "Open meeting-notes-march.txt and tell me the three decisions we made."]

You can also scope down. Here I am naming one file. "Open meeting-notes-march dot txt and tell me the three decisions." Claude opens that file, reads it, pulls out the three decisions. If the decisions are not obvious, it tells me they are not obvious, instead of inventing them.

[STAGE DIRECTION: presses return. Claude responds with a short bulleted answer.]

[CURSOR HIGHLIGHT: the three-bullet response]

Short answer. Right file. No speculation.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 9 — talking head. Overlay: a small diagram in the lower third showing a pyramid with "Home folder" at the wide bottom, "Project folder" in the middle, "One subfolder" at the peak.]

One rule before we stop. Do not run `claude` in your home folder.

Your home folder is enormous. It has your browser downloads, your half-finished drafts from two years ago, photos, cache files, configuration files you have forgotten about. When you start `claude` there, you have just told the agent the entire scope of its work is your whole life on this machine. That is slow. It is also confusing, because the agent will make guesses based on things you did not remember were there.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 10 — diagram: scope pyramid. Three horizontal bands. Bottom band, wide: "Home folder (too big)." Middle band: "Project folder (good)." Top band, narrow: "One subfolder (focused)." Arrow on the side labeled "Fewer files = sharper answers."]

The sweet spot is a project folder. Thirty files, three hundred files, that kind of scale. Big enough that Claude can orient. Small enough that every file is actually relevant. When you want to be even more focused, `cd` into a subfolder first, so the agent only sees what matters for the task in front of you.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 11 — talking head with end card: "Next: File permissions."]

So that is a first session. Three commands, one question, one follow-up, one rule about where you run it.

## On-screen callouts (complete list)

- [0:05] Title card: "Your First Session" — Oswald 700, cream on olive, 2s hold
- [1:05] Command annotation: `cd ~/Documents/sample-project` — "Move into the folder you want to work in"
- [1:30] Command annotation: `ls` — "List the files in this folder"
- [1:45] Command annotation: `claude` — "Launch the assistant in this folder"
- [2:15] Prompt callout: "What is in this folder and what is it for?" — JetBrains Mono, persistent while prompt is on screen
- [2:45] Gloss: "A factual question plus an interpretive question" — italic DM Sans, 3s hold
- [3:45] Prompt callout: "Turn that into a table. Columns: file, type, one-line summary, date."
- [4:10] Gloss: "Name the shape you want" — italic DM Sans, 3s hold
- [5:35] Prompt callout: "Open meeting-notes-march.txt and tell me the three decisions we made."
- [6:00] Callout pill: "Name the file. Name the shape." — sage, 3s hold
- [6:45] Warning pill: "Do not run `claude` in your home folder" — camel background, 4s hold
- [7:50] Diagram labels: "Home folder (too big)," "Project folder (good)," "One subfolder (focused)" — persistent through shot
- [9:00] End card: "Next: File permissions" — JetBrains Mono, bottom-right, 3s hold

## Outro (last 20s)

[STAGE DIRECTION: talking head, end card visible.]

Next video, we watch the approval dance when Claude wants to change a file.
