# Video 06 — One Real Use Case: Organize the Downloads Folder
**Duration target:** 10–12 min · **Module pairing:** Bronze 06

## Cold open (0:00–0:20)

[B-ROLL: A Finder window titled "Downloads." It is a mess. 147 files. Screenshots, PDFs, zips, images, random installers from 2023, three files named "Untitled.pdf." Slow pan across the chaos. Hold 3 seconds.]

Everyone has this folder. Nobody wants to clean this folder. We are going to clean this folder. It will take eight minutes, most of which you will spend watching.

[PAUSE — 1s beat]

## Shot list

| #  | Time        | Shot                                                  | Notes |
|----|-------------|-------------------------------------------------------|-------|
| 1  | 0:00–0:20   | B-roll: messy Downloads folder in Finder              | Slow pan, dramatic lighting |
| 2  | 0:20–0:50   | Talking head                                          | Preview the three phases: look, plan, execute |
| 3  | 0:50–1:40   | Screen capture: `cd ~/Downloads` and `claude`         | The usual entry |
| 4  | 1:40–2:50   | Screen capture: read-only tour                        | "Tell me what is in here. Do not change anything yet." |
| 5  | 2:50–4:20   | Screen capture: ask for a plan                        | "How would you group these?" |
| 6  | 4:20–5:30   | Talking head                                          | Why we plan before we execute |
| 7  | 5:30–7:30   | Screen capture: execute with approvals                | Watch the approvals roll through |
| 8  | 7:30–8:30   | Finder split: before / after                          | Side-by-side reveal |
| 9  | 8:30–9:30   | Screen capture: a small repair                        | One file was miscategorized |
| 10 | 9:30–10:30  | Talking head                                          | The pattern: look, plan, execute |
| 11 | 10:30–11:10 | Talking head with end card                            | Outro and tease |

## Teleprompter script

[STAGE DIRECTION: Shot 2 — talking head.]

The task today is organizing a Downloads folder. I picked it because it is universal. Everyone has one, nobody has cleaned one in years, and it is the kind of job where the mental barrier is bigger than the actual work. It is also visual. You will see the payoff on camera.

[PAUSE — 1s beat]

Three phases. First, we look. Claude reads the folder, tells us what is in there. Second, we plan. Claude proposes a structure. We push back, refine it. Third, we execute. Claude moves the files, one approval at a time. That is the pattern for almost everything you will do with this tool.

[STAGE DIRECTION: Shot 3 — screen capture. Terminal open.]

[STAGE DIRECTION: types `cd ~/Downloads`, then `claude`.]

[CURSOR HIGHLIGHT: the prompt showing the Downloads folder]

I am in the Downloads folder. I launch `claude`. Ready.

[STAGE DIRECTION: Shot 4 — screen capture. Types a prompt.]

[STAGE DIRECTION: types: "Tell me what is in this folder. Group by rough category. Do not change anything yet."]

Phase one. Look.

The prompt is "Tell me what is in this folder. Group by rough category. Do not change anything yet." Three sentences. The third one is the one that matters. "Do not change anything yet" is me setting expectations. I want analysis, not action.

[STAGE DIRECTION: presses return. Claude responds with a categorized summary. Categories might be "Screenshots," "Installers," "PDFs and documents," "Images," "Zipped archives," "Miscellaneous."]

[CURSOR HIGHLIGHT: the response as it streams]

Categorized summary. Six rough buckets. Notice Claude is not guessing wildly. It is reading file names and extensions. It is also flagging a handful of files it cannot confidently place. That is good. An honest "I do not know" is more useful than a confident wrong answer.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 5 — screen capture. Next prompt.]

[STAGE DIRECTION: types: "Propose a folder structure. Use at most five folders. Show me the plan before moving anything."]

Phase two. Plan.

"Propose a folder structure. Use at most five folders. Show me the plan before moving anything." I am constraining the solution. At most five folders, because I know from experience that if I let Claude propose fifteen, I will end up with an elegant taxonomy I will never maintain.

[STAGE DIRECTION: presses return. Claude proposes a structure: `Screenshots/`, `Installers-and-software/`, `Documents/`, `Images/`, `Archive-2023-and-older/`. For each, it lists the files that would go there.]

[CURSOR HIGHLIGHT: the proposed folder list]

Five folders. A description of each. A full list of which files go where. Nothing has moved yet.

I read through it. I disagree with one thing. Claude wants to put my scanned tax receipts in Documents. I want them in a Tax subfolder. I push back.

[STAGE DIRECTION: types: "Good plan. One change: put tax receipts in Documents/Tax/, not loose in Documents/."]

[CURSOR HIGHLIGHT: the follow-up prompt]

"Good plan. One change: put tax receipts in Documents slash Tax slash, not loose in Documents."

[STAGE DIRECTION: Claude acknowledges and updates the plan to reflect the change.]

Updated plan. Tax receipts now have a home. Everything else stays. Good.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 6 — talking head.]

Pause for a second on why planning matters. If I had jumped from "look" straight to "do it," I would have gotten a cleaner folder, but it would have been Claude's taxonomy, not mine. And I would not have caught the tax receipts thing until after the move.

[PAUSE — 1s beat]

Planning is the cheap place to argue. Once files are moved, a revert is work. A revert in the plan phase is one sentence. "Put tax receipts in Documents slash Tax." Done.

[STAGE DIRECTION: Shot 7 — screen capture. Next prompt.]

[STAGE DIRECTION: types: "Now execute the plan. Create the folders. Move the files. Ask before each move."]

Phase three. Execute.

"Now execute the plan. Create the folders. Move the files. Ask before each move."

[STAGE DIRECTION: presses return. Claude begins creating folders. First approval: create Screenshots folder. Approved.]

[CURSOR HIGHLIGHT: the first approval dialog]

First approval. "Create folder Screenshots slash." Approve.

[STAGE DIRECTION: next approval: move 34 screenshots into Screenshots/. Approved.]

Second approval. "Move 34 files into Screenshots slash." I can expand the list if I want. I scan it. Looks right. Approve.

[STAGE DIRECTION: sequence speeds up slightly. A series of approvals go by: Installers-and-software, Documents, Documents/Tax, Images, Archive-2023-and-older.]

[B-ROLL: time-lapse effect on the approvals, maybe 3 seconds covering 6 steps.]

And so on. For the Documents folder I scan more carefully, because my work PDFs are in there. For the Screenshots folder I glance and approve. The approval speed is yours to set.

[STAGE DIRECTION: final approval: move stragglers to a `_unsorted` folder. Approved.]

Last approval. Stragglers. The twelve files Claude could not confidently place are going into a folder called underscore unsorted. Good. Those I will handle manually, when I have coffee.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 8 — split screen. Left: the original messy Downloads. Right: the new clean Downloads with five folders and an underscore unsorted.]

[CURSOR HIGHLIGHT: the before / after reveal]

Before. After. Same folder, different morning.

[B-ROLL: pan of the new structure, 3 seconds of satisfaction.]

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 9 — screen capture. One file is clearly in the wrong folder.]

One small repair. Here is a file that got put in Documents that should have been an Installer. Half a percent of the work will land wrong. That is fine. You just tell Claude.

[STAGE DIRECTION: types: "Move dmg-from-march-2024.dmg from Documents/ to Installers-and-software/."]

"Move dmg-from-march-2024 dot dmg from Documents slash to Installers-and-software slash."

[STAGE DIRECTION: approval appears. Approved. File moves.]

Approval. Approve. Done.

[PAUSE — 1s beat]

[STAGE DIRECTION: Shot 10 — talking head.]

Look, plan, execute. That is the pattern. You can apply it to almost anything.

Cleaning a folder. Summarizing a stack of meeting notes. Renaming photos from a trip. Turning a directory of markdown drafts into a cleaner structure. Going through a year of expense receipts. Building an outline from a research folder.

[PAUSE — 1s beat]

The mistake I see people make the most is to skip the middle phase. They look, and then they say "do it." They skip planning because it feels slow. Planning is not slow. Planning is where you get to redirect the work before it becomes real. Five extra minutes there saves you twenty minutes of undoing.

[PAUSE — 2s beat]

[STAGE DIRECTION: Shot 11 — talking head with end card: "Next: Where to go from here."]

One more time, because I want it in your head. Look. Plan. Execute. Every real task.

## On-screen callouts (complete list)

- [0:05] Title card: "One Real Use Case" — Oswald 700, cream on olive, 2s hold
- [0:12] Subtitle: "Organize the Downloads folder" — DM Sans, 2s hold
- [0:25] Three-phase overlay: "Look" / "Plan" / "Execute" — stagger in 0.3s apart, persistent
- [1:10] Command annotation: `cd ~/Downloads` — "Move into the folder we are cleaning"
- [1:25] Command annotation: `claude` — "Launch the assistant here"
- [1:45] Prompt callout: "Tell me what is in this folder. Group by rough category. Do not change anything yet."
- [2:10] Callout pill: "Do not change anything yet = analysis only" — sage, 4s hold
- [3:00] Prompt callout: "Propose a folder structure. Use at most five folders. Show me the plan before moving anything."
- [3:30] Callout pill: "Constrain the solution" — italic DM Sans, 3s hold
- [4:05] Prompt callout: "Good plan. One change: put tax receipts in Documents/Tax/, not loose in Documents/."
- [4:35] Callout pill: "Argue in the plan, not in the file system" — sage, 4s hold
- [5:40] Prompt callout: "Now execute the plan. Create the folders. Move the files. Ask before each move."
- [5:55] Dialog arrow: "Approval for each step" — camel, persistent
- [7:45] Split-screen labels: "Before" / "After" — Oswald, persistent through split
- [8:45] Prompt callout: "Move dmg-from-march-2024.dmg from Documents/ to Installers-and-software/."
- [9:40] Pattern callout: "Look. Plan. Execute." — large Oswald, cream on olive, 5s hold
- [10:15] Warning pill: "Skipping Plan is the most common mistake" — camel, 4s hold
- [10:50] End card: "Next: Where to go from here" — JetBrains Mono, bottom-right, 3s hold

## Outro (last 20s)

[STAGE DIRECTION: talking head, end card visible.]

Next video, we wrap up and I tell you what comes after Bronze.
