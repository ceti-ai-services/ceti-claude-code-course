# FEEDBACK LOG — CETI Claude Code Academy

Running record of user-provided direction on the academy. Most recent entry at the top. Used by agents (present and future) as the canonical reference when revising content, tone, and interactivity.

---

## 2026-04-19 — Post Plan v2 Step 7 review (pre Step 8)

**Context.** Manu reviewed the live site after the 34-commit Step 7 close (Bronze reset, full EN rewrite + ES sidecars). Site is stable, content loads. He wants another revision pass before cohort zero.

### Verbatim

> "Ok run the smoke test and let's update the course once more it is not as interactive as I'd like although the copy was decent… a little over the top could veer a bit more neutral and palpable. But on the right track. Let's do some more revision of the content and increase the level of interactivity and styling. We need to include callout boxes, more interactive cards of information. Try using your UI to take a concept and meta prompt to create an interactive element or cards as based on shadcn and our UI and do this twice for each of the sections and Eval which choice is better with another agent and use computer use if needed to review and run more iterations to get a more polished product. I am not quite happy with it yet, it is getting better we have a long way to go"

> "The vibe should feel a bit more like the feeling of embarking on a mission and use analogies and more interactive experiences and cards with the latest of what's possible"

> "Document my feedback and response. The good point is that it is stable and the content does seem to load but needs to be way more visuals… more process highlighting more examples with animation etc"

### Distilled direction

**Working.**
- Site is stable.
- Content loads reliably across pages.

**Not working.**
- Copy is over-the-top; dial toward neutral and palpable.
- Interactivity is too shallow; needs callouts, interactive info cards, more reveals.
- Visual density is too low; more visuals, more animation, more process highlighting, more worked examples.
- Vibe is off; it should feel like *embarking on a mission* — calm operator tone, analogies, "latest of what's possible."

**Approach for this revision pass.**
1. Shadcn-native composition (no new deps without documented payoff).
2. For every section, produce TWO interactive-element variants as real code.
3. Use a sibling agent to evaluate the two variants per section and pick the winner on pedagogical clarity, interactivity depth, visual polish, animation quality, and mission-vibe fit.
4. Keep the winners; integrate with tone rewrites in a single coherent pass.
5. Browser-verify the live preview and iterate. Manu called out "a long way to go" — treat one-shot as insufficient.
6. Do *not* send the cohort-zero link. Manu will send after review.

**Mission-briefing tone cues (reference for future rewrites).**
- Calm confidence, not hype.
- Operator's voice: concrete verbs, real artifacts, no pep-rally.
- Analogies rooted in work (flight ops, expedition, lab notebook, instrument panel) — not breathless startup-ese.
- Process highlighting = the *what happens when you press this key* frame, not "amazing results await!"
- "Latest of what's possible" applies to *how* we show things (animated timelines, staged reveals, branching decision cards, interactive process diagrams) — not to claims we make in copy.

**Banned/avoid phrases (extend `CLAUDE.md` banned list in spirit).**
- "Unlock your potential," "level up," "supercharge," "game-changer," "revolutionize."
- Superlatives without a proof-point.
- Exclamations other than inline quotes.
- Second-person imperatives that assume excitement ("you'll love this").

### Revision workflow for this pass (for the record)

1. Document feedback. *(this file)*
2. Orient — HANDOFF.md, plan, sections, shadcn inventory, baseline screenshots.
3. Run Step 8 smoke matrix. Report only — no cohort-zero link send.
4. Tone audit across `content/start/*.md` + page shells. Flag over-the-top lines + propose neutral rewrites.
5. Per-section meta-prompt → two variants. Build each as real code behind the section's page.
6. Sibling-agent evaluation picks winner per section.
7. Integrate tone + winners in a single pass.
8. Browser review loop on live preview (Vercel auto-deploy). Iterate.
9. Commits are clean and descriptive; do NOT push the cohort link.
10. Deliverable report.

Future revision cycles should extend this file (new entry on top). When the banned-words list in `CLAUDE.md` drifts from the distilled direction above, reconcile there.
