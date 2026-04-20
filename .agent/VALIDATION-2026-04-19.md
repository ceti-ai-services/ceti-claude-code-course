# Validation gate — 2026-04-19 (pm) · MERCURIO + MARS

Pre-cohort-zero validation of the interactive-revision pass (commits `e260a8c..4437c31`). Per `docs/DECISIONS.md`: MERCURIO/MARS runs at each major milestone; this is the Step 8 gate before the cohort link is dispatched.

## Verdict

**YELLOW.** Revision is a real step up — voice holds, M06 visibly more teachable, Spanish mirrors faithful. One pedagogical bug identified and **fixed in this commit**. Remaining Yellow reason is live-browser verification — which is Manu's one-minute job after pushing.

## Minimum unblock for Green

1. `git push origin main` (auto-deploys).
2. Walk `/start/01-mental-model` → `/start/07-next-steps` once on iPhone, paying attention to the five things in `REVISION-REPORT-2026-04-19.md` §4.
3. If nothing breaks, dispatch cohort-zero link.

## Findings

### MERCURIO — reader empathy

A Novice (non-developer solo operator) reading M01→M07 starts off strong. M01's vending-machine-vs-colleague frame is genuinely disarming for a non-developer. Confidence holds through M04 (approval loop explained in first person) and M05 (four filled-in CLAUDE.md templates model the answer).

**First break** identified: **M02**, specifically the middle install section — `EACCES`, `sudo`, PATH errors, and WSL escape hatch in one screen with no "skip if fine" affordance. A Novice who hits a warning is now reading error-recovery material written for a developer. Not fixed in this pass (requires a design pattern the revision hasn't built — an "if that worked, jump here" inline affordance).

### MERCURIO — voice coherence

Voice stays inside `DECISIONS.md` filter. Banned-word grep clean across `content/start/`. The one "leverage" hit is inside a CLAUDE.md example that explicitly tells the reader *not* to use it — meta, intentional.

Mild caution, not fail: M07 L20 ("If you use Claude three times in the next seven days, it sticks") is borderline prescriptive. Tolerable because qualified experientially. Flag for future pass if Manu wants tighter.

Register-mismatch note, not fail: hero chrome labels ("Transmission · M0X", scanning-highlight sweep) lean harder on mission-vibe than the prose does. Copy is operator-calm; chrome is operator-theatrical. Not slop; a style choice worth revisiting if cohort-zero feedback says the UI feels costumey.

### MARS — learning arc

Post-revision abandonment risk moved. **No longer tone, no longer M06.** The new weak link: **M02 → M03 transition**. M02's TryThis ended at `hello, can you see my desktop?` — prompt from an unscoped session. M03 then opens with "don't type anything until you've chosen the folder," which silently invalidates what the Novice just did.

**Fixed in commit `4437c31`**:
- M02 TryThis now requires `cd`-ing into a scoped folder first (Mac "New Terminal at Folder" / Windows Shift+right-click / Linux `cd `+drag). First prompt is now `what's in this folder and what is it for?` — the same first prompt M03 teaches.
- M03 intro acknowledges that readers who did M02's TryThis end-to-end are already physically scoped; the "don't type anything until you've chosen the folder" rule is framed for the skip-aheads.
- Both mirrored in `.es.md` sidecars.

### MARS — highest-leverage next change (recommended, not blocker)

**Boss-encounter checkpoint at the bottom of M02, M04, and M06.** Three-state declaration: *"Prompt is blinking, I'm in"* / *"Installed but something felt off"* / *"Stuck, need a hand."* Writes to `StudentProfile.completedModules` + `reflections` (schema already stubbed per `DECISIONS.md` §future-vision-hooks).

Why disproportionate:
1. Converts the reader from *scroller* to *declarer* at the exact points the arc historically leaks.
2. Populates the reflection store — the future AI assistant gets real data from day one.
3. Delivers the "game-fight / choose-your-adventure" affordance that `DECISIONS.md` §interactive-experience explicitly asked for and is still *missing* from the revision (current primitives are read-interactives, not decision-interactives).
4. One-component build on top of `StackedReveal` + existing `<Callout>` variants. No new deps.

Scope for next pass, not this one. Too much for a validation-gate commit.

## What this validation did NOT cover

- **Uncommitted parallel work**. The working tree has drift from another session: new files (`ApprovalSim.vue`, `ConceptCard.vue`, `M0*HeroA.vue`, `M0*HeroB.vue`), modified `Recap.vue` / `TryThis.vue`. Those are **not** part of the validated commit set. Manu's triage call — they may be higher-polish iterations of the same ideas.
- **Live visual pass**. The Yellow unblock above.

## Commit delta this validation produced

```
4437c31 content(m02,m03): fix scope-habit mismatch flagged by MERCURIO+MARS
```

Full validated range: `e260a8c..4437c31` (7 commits on local `main`, ahead of `origin/main` by 7).
