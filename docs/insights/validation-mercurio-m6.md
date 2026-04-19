# MERCURIO M6 — Bronze EN Corpus Validation

**Date**: 2026-04-18
**Scope**: 7 Bronze modules + academy landing hero, against `docs/DECISIONS.md` voice contract.
**Verdict (TL;DR)**: GREEN-LIGHT with three targeted edits.

---

## Perspectives

### 1. The Creator (never opened a terminal)
- **Confidence**: 0.82
- **Sharpest critique**: `01-mental-model.md:87` — "renaming exports, moving files between drafts and scheduled" assumes a content-ops vocabulary (exports/drafts/scheduled) that a newsletter-only creator won't recognize. Narrow or diversify.
- **Lands well**: `01:12` hook "Late night. Tab open, ChatGPT or Claude in the browser." — physical, time-of-day specific, instantly familiar.

### 2. The Service business owner
- **Confidence**: 0.88
- **Sharpest critique**: `05-claude-md.md:113` salon template says "Medellín" + "Usted/vos" — great for Latam ES, but the reader of the EN page may be a US salon owner who reads that and concludes "this isn't for me."
- **Lands well**: `06-real-use-case.md:100` — "WhatsApp thread where half your clients actually confirm" is exactly the messy reality of this persona.

### 3. The Real estate broker
- **Confidence**: 0.90
- **Sharpest critique**: `06-real-use-case.md:149` — "`buyer-summary-145-main.md`" implies the broker will open a markdown file and paste it into email. Realistic? A broker not in the terminal world will expect an email draft, not a `.md`.
- **Lands well**: `05:158` "Don't paraphrase what the inspection report said — quote it." — that is a broker's actual liability thinking, not pasted-in office examples.

### 4. The skeptical professional (10 AI courses in)
- **Confidence**: 0.86
- **Sharpest critique**: `07-next-steps.md:55` — "Those aren't guesses" is assertive, but the preceding paragraph makes four specific time-reduction claims with no sourcing. Reads slightly like marketing bait despite otherwise clean voice.
- **Lands well**: `01:74` "Claude Code is not a vending machine. It's a colleague." — lands because it's a working metaphor, not a slogan, and the rest of the module earns it.

### 5. The Spanish-speaking founder reading EN
- **Confidence**: 0.78
- **Sharpest critique**: `02-install.md:42` "Open Spotlight — that is Command+Space" — Spotlight is a Mac concept; a reader on a Spanish-locale Mac sees "Foco" in the menu bar. Minor but the ES translation pass must catch it.
- **Lands well**: `05:91` Meridian Foods consultant template — genuinely international-flavored, doesn't scream US-centric.

### 6. Manu's voice check
- **Confidence**: 0.83
- **Sharpest critique**: `academy/index.vue:58` — "5,000+ people. 100 organizations. 20 countries." three clipped sentences then a long explanation — the rhythm works, but the opening h1 "Different shape." echoes the module titles almost verbatim. Feels like the landing is borrowing the body's best line.
- **Lands well**: `04-file-permissions.md:67` "You will throw away the backup ninety-five percent of the time. The other five percent, the thirty seconds you spent copying will feel like the best investment of your day." — this is Manu at a whiteboard, not a marketing page.

---

## Synthesis

**Convergence.** All six lenses agree the voice contract holds: no banned words, no "let's dive in," hook-first rhythm intact, persona blocks authored (not defaulted), the vending-machine/colleague frame is the spine and earns itself. The `<TryThis>` exercises are concrete enough to actually complete.

**Divergence.** Creator vs. Service-owner pull opposite directions on specificity: Creator wants more variety in the content-ops example (DMs, not just captions); Service owner already feels seen but the Medellín detail risks localizing away US readers. Tradeoff: broadening the service example dilutes Latam authenticity; keeping it loses some US salon/cleaner readers. Resolution: keep Medellín in ES, swap to a neutral US city in EN.

**Minority voice to preserve.** The Spanish-speaking founder (0.78) flagged the Spotlight/Foco localization issue that no one else would catch. Matters because ES readers will read EN first (ES ships later), and Mac UI vocabulary doesn't translate invisibly — the ES version needs a translator's note, not a string swap.

**Top 3 concrete improvements (ranked by impact).**

1. `content/start/05-claude-md.md:113` — salon template. Change "salon in Medellín" to a neutral placeholder ("salon — two chairs, me + one stylist") and move the Medellín/usted-vos version to the ES sidecar. The EN template should read universally; the ES can be idiomatically Latam.
2. `content/start/06-real-use-case.md:149` — add one line after "save as buyer-summary-145-main.md" saying "Open the file, paste into Gmail, hit send" so the broker isn't left wondering why the deliverable is a markdown file.
3. `content/start/07-next-steps.md:31-53` — the by-Friday time-reduction claims ("forty minutes instead of two hours") are unsourced. Either soft-pedal with "in our cohorts" / "what we've seen" or cut to one claim with a direct reader-applicable range. Skeptics clock the specificity-without-attribution immediately.

**Ship decision.** GREEN-LIGHT. Ship to ES translation + cohort-zero link — the three edits above are 15 minutes total and don't block the Sunday deploy.
