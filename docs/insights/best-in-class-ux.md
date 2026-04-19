# Best-in-Class Course UX — Scouting Report

For the Bronze rebuild. Audience: non-dev solo founders. Stack: Nuxt 4 + Tailwind v4 + shadcn-vue. Dark near-black + single gold accent.

## 1. boot.dev breakdown (primary reference)

Live site returned 403; synthesized from their blog, Technology Munch review, and community writeups.

- **Signature pattern:** the lesson is a **split screen** — left pane is instruction (dark, JetBrains-Mono for code), right pane is a live playground you actually run. "Run Code" is a primary CTA; success animates the output panel green. The thing that makes it "feel like a game" is **community boss fights** — seasonal time-boxed events where all users' earned XP pools into a shared HP bar on a boss (e.g. "Hound of Zaggoroth"). You see the bar drain in near-real-time.
- **Lesson arc:** (1) short hook/context paragraph, (2) concept with code snippet, (3) **fill-in-the-blank playground** (not a blank editor — scaffold is pre-filled, user completes 2-3 tokens), (4) Run → green tick + XP counter rolls up → "Next Lesson" button unlocks with a soft glow.
- **Micro-interactions:** XP counter rolls digits (odometer effect); streak flame icon in topnav with day count; "Boots" AI mentor appears as a chat drawer (Claude 3.7 Sonnet); level-up triggers a full-width banner.
- **Three wow moments:** (1) first Run-success → XP animates from 0 → earned value, (2) first streak day increments the flame, (3) first glimpse of the shared boss fight progress bar ("88M XP / 90M needed").

## 2. Three more best-in-class references

**Josh Comeau — CSS for JS Devs.** Pattern to steal: **inline interactive widgets that let you manipulate the variable being taught.** His "Will It Collapse?" drags a margin value and shows live whether boxes collide — learning happens through touch, not reading. For us: **shadcn `Slider` + reactive `Card` preview** where a non-dev founder drags "specificity" (prompt temperature, audience size) and sees the AI output morph live.

**Brilliant.org (redesigned by ustwo, animations in Rive).** Pattern to steal: **the Level Gameboard** — lessons are nodes on a path, each node color-coded by topic, completed nodes have a subtle glow. Their correct-answer moment is a short spring-bounce scale (1 → 1.08 → 1) plus a color flash. For us: **shadcn `Card` grid with Tailwind `scale-105 transition-transform duration-200`** for node-to-node progression.

**Duolingo.** Pattern to steal: **the pulsating progress bar that fills in chunks per question, plus confetti on lesson completion.** Progress bar is grey base, green fill; each correct answer adds a chunk with a pulse. For us: **shadcn `Progress` with Tailwind `animate-pulse` on the last-filled segment**, gold not green.

## 3. "Game fight experience" — 3 concrete patterns for Bronze

1. **XP Orb (primary reward).** Gold circular badge in the top-right topnav. Every completed lesson adds XP; the number rolls up with a CSS `@property --num` counter transition. Primitives: shadcn `Badge` + Tailwind `transition-all duration-700`. No new deps.
2. **Forced-choice moment cards.** Mid-lesson, screen presents two large Cards ("Apply this to your real estate listing" vs "Apply this to your consulting funnel"). Clicking one animates the other out (`translate-x-full opacity-0`), and the next screen loads with persona-tagged content. Primitives: shadcn `Card` + `Dialog` for the reveal transition.
3. **Module-end checkpoint ("the Boss").** End of each of the 7 modules shows a full-viewport gate: a large prompt-engineering challenge, a countdown of "XP to unlock next module," a single gold button. No fail state (non-dev audience), just an unlock moment. Primitives: shadcn `Dialog` (full-screen variant) + `Progress` + `Button`.

**Flag:** time pressure is risky for non-devs — kill it. Keep the urgency purely visual (pulsing gold ring), not a ticking clock.

## 4. Choose-your-own-adventure — how it branches

We already branch at the hero via persona + language picker. Inside a lesson, add **exactly one mid-lesson fork** per module (not per lesson) — a forced-choice card between the "concept" and "apply" sections. Each fork has 2 branches tagged by use case, not persona (e.g. "client acquisition" vs "content creation"), because personas are too coarse and would explode content 4×. Total content factor: 7 modules × 2 fork branches = 14 branch variants, not 7 × 4 × 2 = 56. The **persona picker filters which examples appear inside each branch**, not which branches exist. Languages stay a pure i18n layer.

## 5. Code-animation patterns adapted for non-devs

1. **Prompt-typing effect.** Instead of typing code, type a *prompt* letter-by-letter into a `Card` styled like Claude's chat input, then show the AI response stream in below. Implementation: Vue `<TransitionGroup>` with per-character delay, no lib needed.
2. **Diff highlight on prompt edits.** Show "before" prompt in muted cream, "after" in gold with removed words strikethrough. Teaches the *why* of prompt edits. Pure Tailwind.
3. **Output-morph slider.** Slider controls one variable (e.g. tone: "formal" ↔ "casual"); the output Card's text crossfades between two pre-written variants. No real LLM call — canned content. shadcn `Slider` + `transition-opacity`.

## 6. Anti-patterns to avoid

1. **Terminal/CLI aesthetics** — alienates non-devs; they don't know what a terminal is. Our "code" is prompts.
2. **Live code editor (Monaco/CodeMirror)** — heavy dep, wrong signal, breaks our Nuxt SSR story.
3. **Hearts/HP-drain on wrong answer** — punishes an audience already scared of tech. Use XP-gain only, never XP-loss.
4. **Streak guilt** — Duolingo's "don't break the streak" is toxic for adult solo founders. Show streak *gently*, no red warnings.
5. **Rive/Lottie animation dependencies** — adds ~200KB + a player runtime. For this weekend, stay on CSS transitions + Tailwind utilities. Revisit for v3.

## 7. Prioritized integration list for this weekend

1. **Must-have — XP Orb + gold ring progression.** Top-right `Badge` that increments per lesson completed, plus a `Progress` ring around the persona avatar filling as modules complete. Without this, the demo looks like any other course site. Primitives: `badge`, `progress`, `card`. ~2 hours.
2. **Must-have — forced-choice fork card mid-module.** One fork per module, 2 branches, animated card exit. This is the "choose-your-own-adventure" the user asked for, delivered concretely. Primitives: `card`, `button`, `dialog`. ~3 hours (incl. content variants).
3. **Should-have — module-end checkpoint dialog ("the Boss").** Full-screen `Dialog` at module 7 end (and ideally each module) with a gold-pulsing unlock button. Primitives: `dialog`, `progress`, `button`. ~2 hours.
4. **Could-have — output-morph slider widget** inside one hero lesson. High wow, but scoped risk if content variants aren't written. Primitives: `tabs` or a custom slider on `card`. ~3 hours.

Budget: 3 items × ~2.5h = fits under 8 hours of the 48-hour window, leaves room for content and polish.

---

**Sources consulted:** boot.dev blog (bootdev-beat-2025-03), Technology Munch boot.dev review 2026, Usability Geek Duolingo case study, ustwo Brilliant.org case study, Rive blog on Brilliant animations, css-for-js.dev marketing copy, joshwcomeau.com. Live fetches for bootcamp.dev/boot.dev returned 403 — synthesized from secondary sources.
