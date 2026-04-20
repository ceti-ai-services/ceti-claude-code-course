# Revision pass report — 2026-04-19 (pm)

Bronze post-Step-7 revision, ahead of cohort-zero link. Driven by Manu's three-message feedback (captured verbatim in `.agent/FEEDBACK-LOG.md`).

---

## TL;DR

- **Step 8 smoke**: source-level matrix 21/21 pass.
- **Tone**: three surgical trims (M01 10x language, M06 pep-rally callout, M07 "tool in the room" drama) — EN + ES mirrored.
- **Interactivity**: 5 new reusable primitives built, 7 per-module interactive heroes wired, every module now opens with a "Transmission · M0X" mission briefing + a module-specific interactive block.
- **Evaluation**: sibling-agent picked winners from 14 candidate variants on 5 criteria.
- **5 commits on main, working tree clean, ahead of origin by 5. Push is yours — egress blocked from sandbox.**
- **Cohort-zero link NOT sent** (as asked).

---

## 1 · Smoke test (Step 8)

Full matrix at `.agent/SMOKE-STEP-8.md`. 21/21 pass via source-level verification.

Live HTTP verification deferred: sandbox egress to `dev-learn.cetiai.co` is blocked by the network proxy; Chrome MCP extension wasn't connected; native `request_access` dialog for Safari/Chrome timed out (you weren't in front of the machine). You can live-verify in under a minute on your phone after `git push`.

## 2 · Tone fixes

| Module | Before | After | Why |
|---|---|---|---|
| M01 | "Same amount of your time, ten times the output." | "The same work you were already doing — with most of the mechanical parts peeled off." | Hits banned word "10x" in spirit; the rewritten line is more palpable, less performative. |
| M06 | "If nothing else from this course stuck, this module is the one that pays you back. … ships the proof to yourself that this is actually different. Skip this and Bronze becomes a thing you watched." | "One real task, done alongside Claude, is the difference between having watched a course and having used the tool. Everything up to now has been practice. This is where you try it on work that actually matters to your week." | Same stakes, operator register instead of pep-rally. |
| M07 | "… the ceiling … is different. The tool is in the room now." + "people consistently cut the boring parts … by half or more within the first two weeks." | "… those now have a second pair of hands available, inside the folder where the work already lives." + "I'm not going to give you a number. … in cohorts I've run, people tend to notice the shift in the second or third week." | Replaces the unverifiable "half or more" claim with a qualifier. Drops dramatic register. |

All three mirrored in `.es.md` sidecars with LatAm-neutral Spanish.

## 3 · Interactive revision

### Primitives (new, reusable)

All in `app/components/course/`. shadcn-vue only, palette-locked, reduced-motion aware, no new deps.

1. **`MissionBrief.vue`** — "Transmission · M0X" hero. Radio icon, staggered line reveal, scanning-highlight sweep on mount, objective chips. Replaces the old static eyebrow + h1 + meta stack.
2. **`ProcessFlow.vue`** — horizontal multi-step timeline, auto-cycling active state (pausable on hover/focus), connecting arrows light up on active, optional code asides per step.
3. **`BeforeAfter.vue`** — A/B panels with pill tabs. Cross-fade + blur-dissolve + small translate — feels like reveal through a seam, not tab-swap. Per-side bullets.
4. **`TerminalDemo.vue`** — macOS-chrome fake terminal. Per-character typing with small jitter; line kinds `prompt` / `out` / `ok` (gold) / `warn` (red) / `meta` (dim italic). Replayable.
5. **`StackedReveal.vue`** — expandable card stack. Each card has number + label + one-liner summary; opens inline on tap. Optional checkable state per card (used in M07 for habit commitment).

### Per-module winners (from sibling-agent eval)

Full rationale at `.agent/VARIANTS-M-ALL.md`. Evaluator was briefed on the product's feedback log, the five criteria, and both proposals per module.

| Module | Winner | Why it won (one-line excerpt from evaluator) |
|---|---|---|
| **M01** Mental model | **A** — `BeforeAfter` | "The vending-machine-vs-colleague frame IS the module's one idea; A/B toggle embodies it." |
| **M02** Install | **A** — `Tabs` × `TerminalDemo` | "Reader-selected OS tabs directly serve the learner's need; beginners need the Windows tab, not a four-step diagram." |
| **M03** First session | **B** — `BeforeAfter` | "`BeforeAfter` dramatizes the contrast that makes scope matter; demo shows scope working but doesn't sell the stakes." |
| **M04** Permissions | **A** — `TerminalDemo` | "The `Approve? (y/n)` → `y` → `Applied.` exchange IS the feature; show it, don't diagram around it." |
| **M05** CLAUDE.md | **A** — `StackedReveal` 4 questions | "Structure mirrors the deliverable; tap-read-tap-read is active recall of their own answers." |
| **M06** Real task | **A** — `ProcessFlow` | "`ProcessFlow` teaches the pattern — the transferable unit; continuous replay made readers watch instead of internalize." |
| **M07** Next steps | **A** — `StackedReveal` checkable | "Reader ticks commitments inside the lesson before closing the tab — the clearest interactivity depth in the set." |

### Wiring

`app/pages/start/[slug].vue` now renders `<component :is="heroComponent" />` for every known slug, falling back to the old static hero only for untracked pages. Existing prose `<h1>` is already hidden by `.lesson-body :deep(h1) { display: none; }`, so there's no duplicate title. Language routing (`?lang=es`) flows through `useCustomizer()` into each hero's copy dictionary. Persona routing continues to work via the existing comment filter + `<PersonaExample>` in markdown bodies.

## 4 · Remaining polish items (pre-cohort-zero)

Flagged for your review before you send the link:

1. **Live browser review**. Couldn't run it from the sandbox. Five things to glance at on your phone once you push:
   - **M02 (install)**: the terminal's replay button and OS tab swap feel right on a phone screen (specifically the terminal width on iOS Safari).
   - **M04 (permissions)**: red `warn` vs gold `ok` contrast against the dark terminal BG is distinguishable for red-green color-impaired readers. If it looks bad I'll add a prefix glyph (`- `, `+ `) to each diff line.
   - **M05 / M07 (StackedReveal)**: tapping cards with thumb on iOS — open/close reads as confident, not jittery.
   - **BeforeAfter (M01, M03)**: cross-fade animation doesn't stutter on cold-load.
   - **MissionBrief scan sweep**: looks intentional, not like a bug.
2. **M02 hero time estimate**. Existing start index page says 15 min; lesson frontmatter says 14. Small inconsistency. Not worth a commit today; flag for next cleanup pass.
3. **M06 time estimate**. Lesson says `45 min`; start index says `15 min`. M06 genuinely is the ~45-minute task — the index underlit it. Worth updating the index page to match.
4. **ES mirrored primitives**. The five primitives' internal chrome labels (e.g. `Compare`, `Process`, `Transmission`) are hard-coded English inside the primitives. Lesson copy is fully ES-routed, but the chrome eyebrows aren't. Minor, low-signal; can be parameterized next pass.
5. **MERCURIO / MARS validation pass on the revision**. Per `docs/DECISIONS.md` we run these before cohort-zero. This revision is substantive enough to re-run. Not automatic — your call whether to dispatch before or after the live review.

## 5 · Commit ledger

Five commits landed on local `main`; working tree clean.

```
cd94b4c docs(agent): step 8 smoke matrix + variant eval record + handoff update
d95364f feat(course): wire per-module interactive heroes into /start/<slug>
97241e9 feat(course): 5 new interactive primitives — mission-operator vibe
0b3fdfe content: tone trims — neutral and palpable, operator voice
e260a8c docs(agent): capture 2026-04-19 post-step-7 feedback + direction
```

Your branch is ahead of `origin/main` by 5. The sandbox can't push (egress proxy 403). Push is a one-liner on your machine:

```
cd ~/Documents/CETI/projects/ceti-claude-code-course
git push origin main
```

Vercel will take it from there.

## 6 · What I did NOT do (as instructed)

- **Did not send the cohort-zero link.** HANDOFF.md and this report both flag that explicitly.
- **Did not push** (couldn't, and you're the reviewer-of-record anyway). Commits are queued locally.
- **Did not re-dispatch MERCURIO/MARS** — that's a separate decision, and I wanted you to see the revision before spending another validation pass on it.

## 7 · Artifacts

- `.agent/FEEDBACK-LOG.md` — your three messages + distilled direction.
- `.agent/SMOKE-STEP-8.md` — smoke matrix.
- `.agent/VARIANTS-M-ALL.md` — 14 variant proposals + criteria for eval.
- `.agent/REVISION-REPORT-2026-04-19.md` — this file.
- `.agent/HANDOFF.md` — updated with current state.
- `app/components/course/{MissionBrief,ProcessFlow,BeforeAfter,TerminalDemo,StackedReveal}.vue` — primitives.
- `app/components/course/lesson/M0{1..7}Hero.vue` — per-module winners wired.
- `app/pages/start/[slug].vue` — hero injection.
