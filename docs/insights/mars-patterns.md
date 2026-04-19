# MARS — Patterns for the Academy

*Source: parallel research subagent, 2026-04-19.*

## The system
MARS is a Multi-Agent Research Synthesis orchestrator: it decomposes a complex problem into 5–12 orthogonal domains, runs parallel research on each, synthesizes cross-domain leverage points, tests against real-world constraints, and iterates. A full run is 15–25 minutes.

## Essence
**Solve the right problem at the right scale before you solve it brilliantly.**

## Five teachable patterns for non-devs

### Pattern 1 — Domain Decomposition (the six-dimension template)
**The habit**: before attacking a problem, decompose it into up to six dimensions: Structural (who/what), Temporal (when), Causal (if X then Y), Epistemic (what do we not know), Cultural (does this honor values), Integrative (where do pieces touch). Most people analyze only one and miss the leverage in the others.

**Academy demo**: a `/six-dimensions` slash command that asks Claude to generate one paragraph per dimension for the user's current problem, then identify which one is under-examined.

### Pattern 2 — Timeline Layers
**The habit**: different interventions take different time windows. Five layers:
- **Immediate** (hours–days) — real-time feedback, quick decisions
- **Tactical** (weeks) — sprint adjustments, experiments
- **Operational** (1–6 months) — skill building, process
- **Strategic** (6–24 months) — culture, org transformation
- **Existential** (3+ years) — legacy

Most frustration comes from expecting immediate results from strategic-layer work.

**Academy demo**: a weekly-planning CLAUDE.md snippet that asks "which layer is this task operating in?" before estimating timelines.

### Pattern 3 — Leverage Point Hierarchy (Meadows)
**The habit**: rank interventions by leverage, not by ease:
1. **Paradigm shift** (highest leverage — exponential, 2+ years)
2. **Goals**
3. **Self-organization**
4. **Feedback loops**
5. **Information availability**
6. **System structure**
7. **Parameters** (budget, staffing — lowest leverage)

Ask: am I working on parameter tuning (point 7) when the actual problem is misaligned goals (point 2)?

**Academy demo**: a slash command `/leverage` that takes a user's current initiative and rates which Meadows level they're operating at, suggesting a higher-leverage intervention.

### Pattern 4 — Constraint-Driven Feasibility Testing
**The habit**: after planning, run a 5-constraint check before committing — Budget, Timeline, Skills, Stakeholder buy-in, Regulatory. Fail any one and re-plan, don't execute through it.

**Academy demo**: `/feasibility` command that asks Claude to challenge a plan against the 5 constraints, explicit go/no-go recommendation.

### Pattern 5 — Integration-Point Mapping
**The habit**: when multiple teams or workflows depend on each other, map the integration points explicitly: "if marketing delays, what cascades into operations?" Invisible integration friction kills more initiatives than any single-domain failure.

**Academy demo**: Claude-assisted dependency mapping from a project brief — produces a simple visual or table of who needs what from whom and when.

## What to leave behind
- "Consciousness querying" and token budgeting (too meta).
- Hekat DSL orchestration syntax — students aren't spawning agent swarms.
- The six-dimension playbook *theology* — reduce to the 6-question checklist, drop the agent-mode framing.
- SpaceX metaphor — off-brand for "use Claude Code for your actual job."

## Where these patterns live in the academy

| Tier | Pattern coverage |
|------|------------------|
| Novice | Pattern 1 (Six Dimensions) + Pattern 4 (5-Constraint Check) — taught as simple checklists, no Claude Code automation yet |
| Experienced | Patterns 2, 3, 5 added with Claude Code slash commands (`/leverage`, `/timeline-layer`, `/dependency-map`) |
| Expert | Full multi-domain research synthesis — parallel Claude sessions doing domain research, cross-synthesis, constraint validation on real plans |
