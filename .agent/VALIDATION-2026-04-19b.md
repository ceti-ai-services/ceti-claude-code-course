# Re-validation — 2026-04-19 (late pm) · second revision pass

Second MERCURIO/MARS-style pass, triggered by the two commits that landed on `main` after the first validation:

- `a05c44f feat(course): body animations + enhanced components — second revision pass`
- `6df3842 feat(gate): mission-briefing redesign for /start gate`

First validation at `.agent/VALIDATION-2026-04-19.md` (YELLOW + fix-and-document). This one evaluates the delta only.

## Verdict

**Still YELLOW.** Product is live-worthy. Drift identified this pass is style, not correctness. Minimum unblock is additive.

## Delta summary

| Change | Verdict |
|---|---|
| `ApprovalSim.vue` replaces `TerminalDemo` on M04 | **Net upgrade.** First gate wanted "show the approval, don't diagram around it." This does. Deny path is a first-class outcome, not a footnote — which is the actual M04 lesson. Idle "Run simulation" gate is the right call: it makes approval a deliberate act, not an autoplay the reader scrolls past. |
| M04 analogy reframed to "Every change goes through you. That friction is the feature." | Aligns with what the widget does. Fine. |
| `Recap.vue` → "Debrief" block with pulsing gold scan-line | **Register drift** — see finding §1 below. |
| `TryThis.vue` → "Field assignment" with decimal-leading-zero `<ol>` counter + animated sweep | **Register drift** — see finding §1 below. |
| `/start` gate redesign as Mission briefing · 7 modules manifest | **Lands.** Eyebrow is context not theater; "briefing" is defensible because what follows is literally a list. Form card reads as gate, not demo. Keep. |
| Body-block `.appear` stagger in `[slug].vue` | Restrained. Fine. |

## Findings

### §1 · Register drift worsened (style, not pedagogy)

First gate flagged *"hero chrome leans harder on mission-vibe than the prose does"*. This pass pushed further:

- `Recap.vue` renamed *What you just did* → **Debrief**, added a **continuously pulsing gold scan-line** at the bottom of every recap block. A recap summarizes two sentences of plain prose; the ornament is louder than the content.
- `TryThis.vue` renamed *Try this* → **Field assignment**, added `decimal-leading-zero` gold counters (`01 / 02 / 03`) on ordered lists. These collide with the M0X codenames in heroes and the `01..07` manifest on `/start` — the whole page starts to feel like the narrator numbers everything.

**Concrete tighten (taste-level, not blocker)** — if you agree the chrome got louder than the prose, revert the two labels while keeping the visual treatment. Five-minute edit:

```
# app/components/course/Recap.vue line 9
- <span class="debrief__label">Debrief</span>
+ <span class="debrief__label">Recap</span>

# app/components/course/TryThis.vue line 14
- <span class="assignment__eyebrow">Field assignment</span>
+ <span class="assignment__eyebrow">Try this</span>
```

Keep the gold sweep, keep the pulsing dot, keep the gradient tint. Operator-calm prose + operator-calm labels + operator-theatrical visuals is the balance you're after; the visual weight already carries the mission register.

The evaluator's own framing: *"ship as-is and let cohort-zero feedback settle it — this is taste-level, not pedagogy-level."* Your call.

### §2 · Two small pedagogical risks introduced

**(a) ApprovalSim's idle gate.** A "Run simulation" button above the prose risks a *click → approve → scroll* pattern that skips the explanatory paragraphs below. The widget teaches mechanics; the prose teaches *why*. The `sim-meta` footer line ("every change goes through this loop — you stay in the chair") partly mitigates this; worth keeping.

**(b) `<ol>` decimal counter collision.** The gold `01/02/03` counters in `TryThis`/assignments visually conflict with the gold `M0X` hero codenames and the gold `01..07` manifest on `/start`. In isolation each is fine; on the same page at once it reads like everything is narratively numbered. Not a blocker; something to eyeball on the iPhone walk.

### §3 · Gate redesign is a clear win

`/start` went from `🥉 Bronze Ticket` emoji eyebrow to a proper mission-briefing frame that still sets the right expectations (seven modules, timed, 90 minutes). The stagger-in animation is restrained (60ms per item × 7, one-time on mount). No hype, no overclaim. Ship.

### §4 · No regressions

- Banned-words grep on all new files: clean.
- Script/template tag balance on all new files: clean.
- All new primitives honor `prefers-reduced-motion`.
- The M02→M03 scope-habit fix from the first validation still stands.

### §5 · Minor flag (not blocker)

`app/pages/start/index.vue` is English-only — no `useCustomizer()` wiring on the gate. A Spanish-speaking reader who lands on `/start?lang=es` sees English copy until they submit and reach a module page. Whole gate is ~7 short strings; worth a 10-minute pass if you want full ES parity before Ormus + friends.

## Minimum unblock for Green — additive to first validation

1. **(carry-over from first validation)** Push, walk `/start/01-mental-model` → `/start/07-next-steps` once on iPhone with a Novice lens.
2. **(new)** Walk `/start` itself on iPhone. Confirm the 7-item stagger doesn't jank on a cold load.
3. **(new)** On `/start/04-file-permissions`, click *Run simulation*. Approve once. Click *restart*. Deny once. Confirm both outcome strings render and the reset is clean.
4. **(optional, 5 min)** Rename `Debrief` → `Recap` and `Field assignment` → `Try this` per §1 if you agree the chrome outran the prose. Or don't — taste-level call.

If all four pass, flip Green and dispatch.

## What this validation did NOT cover

- **Uncommitted parallel work** still present in the working tree: `M01HeroA/B.vue`, `M02HeroA/B.vue`, `M03HeroA/B.vue`, `M04HeroA.vue`. Not wired in `[slug].vue`. They're either dead scaffold or design-doc-as-code — your triage call.
- **Live visual pass** — still the Green gate.
