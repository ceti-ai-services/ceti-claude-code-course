<script lang="ts">
// Module-scope declarations — referenced by withDefaults() which is hoisted
// outside of setup(). Keep interfaces + default data here.

export interface Phase {
  key: string
  name: string
  mcpHint: string
  accent: "info" | "thought" | "act" | "confirm"
  desc: string
  role: { label: string; text: string }
  fail: string
}

export interface TraceStep {
  phase: "perceive" | "reason" | "act" | "observe"
  label: string
  action: string
  detail: string
}

export const defaultPhases: Phase[] = [
  {
    key: "perceive",
    name: "Perceive",
    mcpHint: "Schemas + Resources",
    accent: "info",
    desc: "At session start, Claude perceives all available tools by reading their schemas — its <strong>capability inventory</strong>. Resources provide context about current external state. Schemas say what it <em>can</em> do; resources say what <em>is</em> true.",
    role: {
      label: "MCP role in Perceive",
      text: "Tool schemas → capability inventory. Resources → current world state. Perception quality depends directly on description quality and resource availability.",
    },
    fail: "<strong>Perceive failure:</strong> Schema description doesn't tell Claude what the tool does, when to use it, or what it returns. Agent picks the wrong tool or skips it.",
  },
  {
    key: "reason",
    name: "Reason",
    mcpHint: "Tool selection + args",
    accent: "thought",
    desc: "Using tool understanding and world state, Claude reasons about <strong>which tools to call and with what arguments</strong>. Tool selection matches requirements to descriptions. Argument construction matches task parameters to schema.",
    role: {
      label: "MCP role in Reason",
      text: "inputSchema tells Claude what arguments exist, which are required, which enum values are valid, what defaults apply. Description guides selection; schema guides construction.",
    },
    fail: "<strong>Reason failure:</strong> Schema is clear but Claude picked the wrong tool or wrong arguments. Often caused by ambiguous descriptions between similar tools (search_issues vs get_issue).",
  },
  {
    key: "act",
    name: "Act",
    mcpHint: "tools/call",
    accent: "act",
    desc: "Claude executes the tool call — a <strong>structured request</strong> with tool name and JSON arguments validated against the input schema. The MCP server executes, returns a content array.",
    role: {
      label: "MCP role in Act",
      text: "tools/call with { name, arguments } → server runs → returns { content: [...] }. Structured and typed, not free-text HTTP. Server validates arguments against schema first.",
    },
    fail: "<strong>Act failure:</strong> Call failed — server error, network issue, or arguments that passed schema but failed server-side logic (non-existent ID, missing auth scope).",
  },
  {
    key: "observe",
    name: "Observe",
    mcpHint: "Results + errors",
    accent: "confirm",
    desc: "Claude reads the result and <strong>updates its understanding</strong>. Success → next planned action, or present results. Error → reason about the error, retry with different arguments, try another tool, or report the failure.",
    role: {
      label: "MCP role in Observe",
      text: "Result content drives the next cycle. Empty search result might trigger a broader query. Error result triggers diagnostic reasoning about what went wrong.",
    },
    fail: "<strong>Observe failure:</strong> Claude misread the result — e.g., treated an empty array as an error instead of \"no matches.\" Usually caused by incomplete return-value documentation.",
  },
]

export const defaultTrace: TraceStep[] = [
  { phase: "perceive", label: "Perceive", action: "Claude reads search_issues schema — learns about query, status, assignee, limit parameters", detail: "tools/list → search_issues schema loaded into session" },
  { phase: "perceive", label: "Perceive", action: "Reads current user resource to get authenticated username", detail: 'resources/read("config://user/current") → { username: "jsmith" }' },
  { phase: "reason", label: "Reason", action: "Matches task to tool: search_issues with assignee=\"jsmith\" and status=\"open\"", detail: "thinking: search_issues matches — need assignee + status filter, query can be empty string" },
  { phase: "act", label: "Act", action: "Executes: search_issues({ query: \"\", assignee: \"jsmith\", status: \"open\" })", detail: 'tools/call → { name: "search_issues", arguments: { query: "", assignee: "jsmith", status: "open" } }' },
  { phase: "observe", label: "Observe", action: "Receives 7 matching issues — presents list to user with IDs, titles, and statuses", detail: "→ [{ id: 142, title: \"Fix auth timeout\", status: \"open\" }, ... 6 more]" },
]
</script>

<script setup lang="ts">
import { ref } from "vue"

interface Props {
  eyebrow?: string
  objective?: string
  phases?: Phase[]
  exampleTitle?: string
  exampleTask?: string
  trace?: TraceStep[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  eyebrow: "Integration",
  objective: "MCP primitives map directly onto the PRAO loop. Resources feed Perception, tool schemas inform Reasoning, tool calls are Actions, results drive Observation. The quality of tool descriptions sets the ceiling on agent performance.",
  phases: () => defaultPhases,
  exampleTitle: "Traced example",
  exampleTask: "\"Find all open issues assigned to current user\"",
  trace: () => defaultTrace,
})

const activeIdx = ref(0)
const revealed = ref<Record<number, boolean>>({})

function selectPhase(i: number) {
  activeIdx.value = i
}

function revealStep(i: number) {
  revealed.value = { ...revealed.value, [i]: true }
}
</script>

<template>
  <section :class="['prao', props.class]">
    <!-- Objective card -->
    <div class="prao-objective">
      <span class="prao-objective__label">{{ props.eyebrow }}</span>
      <p class="prao-objective__text" v-html="props.objective" />
    </div>

    <p class="prao-hint">▸ Click each PRAO phase to see how MCP primitives participate.</p>

    <!-- Phase tabs -->
    <div class="prao-phases" role="tablist">
      <button
        v-for="(p, i) in props.phases"
        :key="p.key"
        type="button"
        role="tab"
        :aria-selected="activeIdx === i"
        :class="['prao-phase', `prao-phase--${p.accent}`, activeIdx === i && 'prao-phase--active']"
        @click="selectPhase(i)"
      >
        <span class="prao-phase__name">{{ p.name }}</span>
        <span class="prao-phase__hint">{{ p.mcpHint }}</span>
      </button>
    </div>

    <!-- Active panel -->
    <div :class="['prao-panel', `prao-panel--${props.phases[activeIdx]!.accent}`]" :key="activeIdx">
      <p class="prao-panel__desc" v-html="props.phases[activeIdx]!.desc" />

      <div class="prao-role">
        <div class="prao-role__label">{{ props.phases[activeIdx]!.role.label }}</div>
        <div class="prao-role__text">{{ props.phases[activeIdx]!.role.text }}</div>
      </div>

      <div class="prao-fail" v-html="props.phases[activeIdx]!.fail" />
    </div>

    <!-- Divider -->
    <hr class="prao-divider" />

    <!-- Traced example -->
    <div class="prao-ex-title">{{ props.exampleTitle }}</div>
    <div class="prao-ex-task">{{ props.exampleTask }}</div>
    <p class="prao-hint">▸ Click each step to reveal the MCP detail — tool name, arguments, or result.</p>

    <ol class="prao-trace">
      <li
        v-for="(s, i) in props.trace"
        :key="i"
        :class="['prao-step', `prao-step--${s.phase}`, revealed[i] && 'prao-step--on']"
        tabindex="0"
        @click="revealStep(i)"
        @keydown.enter.prevent="revealStep(i)"
        @keydown.space.prevent="revealStep(i)"
      >
        <span :class="['prao-step__badge', `prao-step__badge--${s.phase}`]">{{ s.label }}</span>
        <div class="prao-step__body">
          <div class="prao-step__action">{{ s.action }}</div>
          <pre v-if="revealed[i]" class="prao-step__detail">{{ s.detail }}</pre>
          <div v-else class="prao-step__hint">click to reveal detail</div>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.prao {
  font-family: "DM Sans", "Inter", system-ui, sans-serif;
  margin: 24px 0;
  max-width: 760px;
}

/* ─── Objective ─── */
.prao-objective {
  padding: 14px 18px;
  border-radius: 12px;
  background: var(--color-info-bg);
  border: 1px solid var(--color-info-edge);
  margin-bottom: 18px;
}
.prao-objective__label {
  display: block;
  margin-bottom: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-info);
}
.prao-objective__text {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--color-muted);
  margin: 0;
}
.prao-objective__text :deep(strong),
.prao-objective__text :deep(em) {
  color: var(--color-text);
  font-style: normal;
  font-weight: 600;
}

.prao-hint {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--color-dim);
  font-style: italic;
  margin: 0 0 12px;
  padding-left: 2px;
}

/* ─── Phase tabs ─── */
.prao-phases {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
.prao-phase {
  padding: 14px 10px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
  text-align: center;
  font-family: inherit;
  color: inherit;
  transition:
    border-color 350ms var(--ease-out-spring),
    background 350ms var(--ease-out-spring),
    transform 350ms var(--ease-out-spring);
}
.prao-phase:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-1px);
}
.prao-phase__name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);
  transition: color 300ms ease;
}
.prao-phase__hint {
  display: block;
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--color-dim);
  margin-top: 3px;
  transition: color 300ms ease;
}
.prao-phase--active { transform: translateY(-2px); }
.prao-phase--active .prao-phase__name { color: var(--color-text); }
.prao-phase--active .prao-phase__hint { color: var(--color-muted); }

.prao-phase--info.prao-phase--active {
  border-color: var(--color-info);
  background: var(--color-info-bg);
}
.prao-phase--thought.prao-phase--active {
  border-color: var(--color-thought);
  background: var(--color-thought-bg);
}
.prao-phase--act.prao-phase--active {
  border-color: var(--color-act);
  background: var(--color-act-bg);
}
.prao-phase--confirm.prao-phase--active {
  border-color: var(--color-confirm);
  background: var(--color-confirm-bg);
}

/* ─── Panel ─── */
.prao-panel {
  padding: 20px 22px;
  border-radius: 14px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  animation: prao-fade 320ms var(--ease-out-spring);
}
@keyframes prao-fade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.prao-panel__desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-muted);
  margin: 0 0 14px;
}
.prao-panel__desc :deep(strong),
.prao-panel__desc :deep(em) {
  color: var(--color-text);
  font-style: normal;
  font-weight: 600;
}

.prao-role {
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  margin-bottom: 10px;
}
.prao-role__label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-dim);
  margin-bottom: 4px;
}
.prao-role__text {
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--color-muted);
}

.prao-fail {
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(224, 91, 75, 0.06);
  border: 1px solid rgba(224, 91, 75, 0.22);
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--color-muted);
}
.prao-fail :deep(strong) {
  color: var(--color-danger);
  font-weight: 600;
}

.prao-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 26px 0;
}

/* ─── Traced example ─── */
.prao-ex-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}
.prao-ex-task {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--color-act);
  margin-bottom: 12px;
}

.prao-trace {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.prao-step {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
  transition:
    border-color 250ms ease,
    transform 250ms ease,
    background 250ms ease;
}
.prao-step:hover {
  border-color: var(--color-border-strong);
  transform: translateX(2px);
}
.prao-step:focus-visible {
  outline: none;
  border-color: var(--color-gold);
}
.prao-step--on { cursor: default; background: var(--color-raised); }

.prao-step__badge {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 5px;
  min-width: 74px;
  text-align: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.prao-step__badge--perceive {
  background: var(--color-info-bg);
  color: var(--color-info);
  border: 1px solid var(--color-info-edge);
}
.prao-step__badge--reason {
  background: var(--color-thought-bg);
  color: var(--color-thought);
  border: 1px solid var(--color-thought-edge);
}
.prao-step__badge--act {
  background: var(--color-act-bg);
  color: var(--color-act);
  border: 1px solid var(--color-act-edge);
}
.prao-step__badge--observe {
  background: var(--color-confirm-bg);
  color: var(--color-confirm);
  border: 1px solid var(--color-confirm-edge);
}

.prao-step__body { flex: 1; min-width: 0; }
.prao-step__action {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-muted);
}
.prao-step__hint {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--color-dim);
  margin-top: 4px;
  font-style: italic;
}
.prao-step__detail {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--color-muted);
  margin: 6px 0 0;
  white-space: pre-wrap;
  word-break: break-word;
  animation: prao-fade 220ms ease;
}

@media (max-width: 640px) {
  .prao-phases { grid-template-columns: repeat(2, 1fr); }
  .prao-step { flex-direction: column; gap: 8px; }
  .prao-step__badge { min-width: 0; width: max-content; }
}

@media (prefers-reduced-motion: reduce) {
  .prao-panel, .prao-step__detail { animation: none; }
  .prao-phase, .prao-step { transition: none; }
}
</style>
