# CETI.AI Bronze — Screencast Production Guide

Companion videos for the Bronze Ticket Claude Code course. Seven episodes, 8–12 minutes each, shot as narrated screencasts with a small amount of talking-head B-roll.

This folder contains the teleprompter scripts and shot lists. Each `.md` file corresponds to one video and is designed to be read straight into a prompter app (Speakflow, PromptSmart, or a tablet prompter) with minimal editing.

---

## Audience

Non-developers. Consultants, operators, writers, designers, analysts. People who have never opened a terminal on purpose but want to do real work with Claude Code this week.

Never assume the viewer saw the previous episode. Every cold open stands on its own.

---

## Voice

Warm. Confident. A little dry. Short sentences. No hype, no catchphrases, no "let's dive in," no "smash that subscribe." Think documentary narrator, not YouTuber. Occasional deadpan is welcome. Enthusiasm is implied by competence, not performed.

When in doubt, read it out loud. If it sounds like marketing, cut it.

---

## Production conventions

### Callouts and on-screen text

- **Font (callouts):** JetBrains Mono, 28px, white on 80% black pill
- **Font (section titles):** Oswald 700, 56px, cream (#E7E1D7) on olive (#262721)
- **Font (body overlays):** DM Sans 400, 32px, cream on slate (#324555)
- **Command annotations:** appear 0.4s after the key press, hold for 2.5s minimum, fade 0.3s
- **Gloss line:** one line, plain English, under the command, DM Sans italic
- **Safe zone:** all callouts within 80% of frame width, 85% of frame height

### Cursor and focus highlights

- **Cursor ring color:** sage (#C7D8B9) at 60% opacity, 2px stroke, 8px radius
- **Cursor hold:** ring appears 0.2s before the moment of interest, holds for 1.2s
- **Click pulse:** sage circle, 40px, fades over 0.5s, one beat per click
- **Window focus:** slight dimming (90% brightness) on non-focus windows, sharp on focus

### Pause beats

- `[PAUSE — 1s beat]` means exactly one second of narration silence with no cuts
- `[PAUSE — 2s beat]` for conceptual transitions, used sparingly (twice per video max)
- The editor should not trim pauses. Pauses are content.

### B-roll

- Talking-head inserts recorded at the same desk, same light
- Diagram B-roll: single-color line art on cream, Oswald labels
- Still frame with arrow: use camel (#A67756) for the arrow, 3px weight

---

## Recording setup

- **Screen capture:** Screen Studio (preferred for auto zoom and cursor smoothing) or OBS
- **Resolution:** 2560×1440 native, exported at 1920×1080 for delivery
- **Frame rate:** 60fps capture, 30fps delivery
- **Audio:** Shure SM7B or equivalent condenser, AAC 256kbps, -14 LUFS target
- **Terminal:** iTerm2 or Terminal.app, JetBrains Mono 16pt, high-contrast theme, window at 120×34
- **Browser (when shown):** Arc or Chrome, bookmarks bar hidden, personal data scrubbed
- **Desktop:** neutral wallpaper, dock hidden, notifications off (Do Not Disturb on)

---

## File naming for exports

```
CETI-BRONZE-0X-<slug>-v<rev>.mp4

examples:
CETI-BRONZE-01-mental-model-v1.mp4
CETI-BRONZE-03-first-session-v2.mp4
CETI-BRONZE-07-next-steps-final.mp4
```

Revision suffixes: `v1`, `v2`, `v3` during review. Final delivery: `-final.mp4`. Upload masters to the CETI Google Drive under `CETI/Training/Bronze/Video/<episode-number>/`.

---

## How to read the teleprompter scripts

Each script is the narration exactly as it should be read. Inline stage directions appear in square brackets:

- `[STAGE DIRECTION: types `claude`]` — an action happening while the narration continues or pauses
- `[CURSOR HIGHLIGHT: the approve dialog]` — cue the editor to emphasize a specific screen region
- `[PAUSE — 1s beat]` — full stop, one second of silence
- `[B-ROLL: split screen of browser and terminal]` — B-roll suggestion for the editor

Stage directions are not read aloud. Everything outside brackets is.

Minute markers (0:00, 2:30, etc.) are approximate. They guide pacing during recording and chapter markers in the final export.

The shot list table at the top of each file is the scene-by-scene plan. The teleprompter script below it is the spoken layer. The on-screen callouts list at the bottom is the complete set of text overlays the editor should place.

---

## Per-episode pairing

| Episode | Bronze module | Approx. runtime |
|---------|---------------|------------------|
| 01 Mental model | Bronze 01 | 8–9 min |
| 02 Install | Bronze 02 | 10–12 min |
| 03 First session | Bronze 03 | 9–10 min |
| 04 File permissions | Bronze 04 | 9–11 min |
| 05 CLAUDE.md | Bronze 05 | 8–10 min |
| 06 Real use case | Bronze 06 | 10–12 min |
| 07 Next steps | Bronze 07 | 8–10 min |

Only episode 07 carries a hard CTA. Episodes 01 through 06 end with a single-sentence tease of the next one.

---

## Accuracy ground rules

- CLAUDE.md is read automatically at session start. It is not a slash command.
- Settings live in `settings.json`. The permissions shape is `{"permissions": {"allow": [...], "deny": [...]}}`.
- There is no `--thinking` flag. There is no `--context` flag. There is no `/memory` command. Do not mention any of these on camera.
- If a UI detail is uncertain, describe it neutrally. Do not invent labels, buttons, or menu items.

---

**Owner:** Manu Mulaveesala · **Last updated:** 2026-04-18 · **Status:** Production-ready
