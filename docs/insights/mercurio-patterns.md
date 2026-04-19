# MERCURIO — Patterns for the Academy

*Source: parallel research subagent, 2026-04-19.*

## The system
MERCURIO is a Mixture-of-Experts orchestrator: it launches 3–7 parallel expert perspectives on a question, scores each with confidence (0.0–1.0), synthesizes them while **explicitly preserving minority views**, and outputs a structured recommendation with quantified uncertainty.

## Essence
**Silence disagreement and you've deleted half the information; surface it, weight it, preserve it, and you've built real wisdom.**

## Three teachable patterns for non-devs

### Pattern 1 — Perspective Matrix
**The habit**: before deciding, ask "who hasn't spoken yet?" For any plan, convene at least these voices: Customer, Finance, Operations, Design, Engineer (or the closest analogues in your domain). Have each write 2–3 sentences *independently* before comparing notes. You'll catch failures of coherence you'd never have spotted alone.

**Academy demo**: a Claude Code workflow that takes a draft email or plan and replies from N different perspectives as drafts you review side-by-side.

### Pattern 2 — Confidence Scoring
**The habit**: instead of "I think this will work," say "I'm 85% sure the market exists, 40% sure our pricing is right, 95% sure the tech is feasible." Named uncertainty is easier to act on than vague doubt.

**Academy demo**: a `CLAUDE.md` snippet that instructs Claude to tag every claim in its output with a `[conf: 0.XX]` marker. Students learn to debug low-confidence claims instead of treating outputs as uniformly true.

### Pattern 3 — Minority Voice Protection
**The habit**: when synthesizing a decision, allocate at least 20% of your write-up to the *best-argued dissent*. Even if you reject it, you will have understood it.

**Academy demo**: a slash command `/dissent` that rewrites a user's own argument as the most persuasive counter, forcing them to steelman before shipping.

## What to leave behind
- The `moe::(||):sample^n` shell syntax and convergence algorithms (Bayesian fusion, Delphi method) — too abstract for non-devs.
- The 7×7 esoteric matrix — domain-specific, doesn't port.
- `NOUS.md` as knowledge-graph infrastructure — useful for us internally, not a student-facing artifact.

## Where these patterns live in the academy

| Tier | Pattern coverage |
|------|------------------|
| Novice | Pattern 1 (Perspective Matrix) + Pattern 2 (Confidence Scoring) — introduced as one-page reference, no orchestration |
| Experienced | All three, with Claude Code automation (multi-persona drafts, confidence-tagged outputs, `/dissent` command) |
| Expert | Full MoE orchestration — spawning parallel Claude sessions, synthesis composable, audit-trail commits |
