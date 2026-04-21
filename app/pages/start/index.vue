<template>
  <main class="gate">
    <!-- Header: mission brief style -->
    <header class="gate-header">
      <div class="gate-eyebrow">
        <span class="gate-radio" aria-hidden="true" />
        <span>CETI · Claude Code Academy · Bronze</span>
      </div>
      <h1 class="gate-title">Claude Code: Day One</h1>
      <p class="gate-lead">
        Zero to productive in 90 minutes. Seven modules, a starter kit, and a
        CLAUDE.md template built for your work — not the generic tutorial.
      </p>
    </header>

    <!-- Module manifest -->
    <section class="manifest" aria-label="Course modules">
      <div class="manifest-label">Mission briefing · {{ modules.length }} modules · {{ liveCount }} live</div>
      <ol class="manifest-list">
        <li
          v-for="(m, i) in modules"
          :key="m.num"
          :class="['manifest-item', !m.live && 'manifest-item--planned']"
          :style="`--item-delay: ${i * 45}ms`"
        >
          <span class="manifest-num">{{ m.num }}</span>
          <span class="manifest-title">{{ m.title }}</span>
          <span v-if="m.live" class="manifest-time">{{ m.time }}</span>
          <span v-else class="manifest-badge">Planned</span>
        </li>
      </ol>
    </section>

    <!-- Access form -->
    <section class="gate-form-wrap">
      <div class="gate-form-eyebrow">
        <span class="gate-form-dot" aria-hidden="true" />
        Enter your ticket to begin
      </div>
      <form class="gate-form" @submit.prevent="submit">
        <div class="gate-field">
          <label for="email" class="gate-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="you@company.com"
            class="gate-input"
            required
          >
        </div>
        <div class="gate-field">
          <label for="code" class="gate-label">Ticket code</label>
          <input
            id="code"
            v-model="code"
            type="text"
            autocomplete="off"
            placeholder="BRONZE-FRIEND-01"
            class="gate-input"
            required
          >
          <div class="gate-hint">Case-insensitive. No code? Reply to the email you received.</div>
        </div>
        <p v-if="error" class="gate-error" role="alert">{{ error }}</p>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Checking…' : 'Start the course →' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
const email = ref('')
const code = ref('')
const error = ref('')
const loading = ref(false)

const liveCount = computed(() => modules.filter(m => m.live).length)

// 14-module Bronze shape — Foundations (1–6), Real work (6–7),
// Toolkit (7–10), Integration (11–12), Going further (13–14).
// Modules currently live are marked `live: true`. The rest appear on the
// manifest with a `planned` marker so the full scope is visible on day one.
const modules = [
  { num: '01', title: 'What Claude Code is — and how it differs from the browser chatbot', time: '12 min', live: true },
  { num: '02', title: 'Install on Mac, Windows, or Linux', time: '14 min', live: true },
  { num: '03', title: 'Your first real session — scoped to a folder', time: '14 min', live: true },
  { num: '04', title: 'File permissions — read the diff, approve the change', time: '12 min', live: true },
  { num: '05', title: 'CLAUDE.md — write it once, stop explaining yourself', time: '13 min', live: true },
  { num: '06', title: 'One real task, end-to-end', time: '45 min', live: true },
  { num: '07', title: 'Slash commands — reusable prompts you build once', time: '12 min', live: false },
  { num: '08', title: 'Skills — packaged capabilities Claude loads on demand', time: '12 min', live: false },
  { num: '09', title: 'Plan mode — think before acting, dry-run your work', time: '10 min', live: false },
  { num: '10', title: 'Hooks — safety gates and pre/post-tool-use automation', time: '14 min', live: false },
  { num: '11', title: 'MCP basics — connect Gmail, Calendar, Notion, your files', time: '14 min', live: true },
  { num: '12', title: 'Git integration — commits, branches, PRs through Claude', time: '12 min', live: false },
  { num: '13', title: 'Subagents and parallel work', time: '12 min', live: false },
  { num: '14', title: 'Next steps — habits and the wider agentic toolkit', time: '10 min', live: false },
]

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const res = await $fetch<{ ok: boolean; redirect?: string; error?: string }>(
      '/api/enroll',
      { method: 'POST', body: { email: email.value, code: code.value } },
    )
    if (res.ok && res.redirect) {
      await navigateTo(res.redirect)
    } else {
      error.value = res.error || 'That code did not match. Try again.'
    }
  } catch (e: any) {
    error.value = e?.data?.error || 'Something broke on our end. Try again in a moment.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.gate {
  max-width: 720px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 52px;
}

/* ---- Header ---- */
.gate-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gate-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.gate-radio {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-gold);
  animation: radio-pulse 2s ease-in-out infinite;
}

@keyframes radio-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.gate-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--color-text);
}

.gate-lead {
  max-width: 560px;
  font-size: 17px;
  line-height: 1.65;
  color: var(--color-muted);
}

/* ---- Module manifest ---- */
.manifest {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.manifest-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-dim);
}

.manifest-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.manifest-item {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  transition: border-color 220ms var(--ease-out-spring), background 220ms var(--ease-out-spring);
  animation: manifest-item-in 480ms var(--ease-out-spring) var(--item-delay, 0ms) both;
}

.manifest-item:hover {
  border-color: var(--color-border-strong);
  background: var(--color-raised);
}

@keyframes manifest-item-in {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}

.manifest-num {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: 0.06em;
}

.manifest-title {
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text);
}

.manifest-time {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-dim);
  white-space: nowrap;
}

.manifest-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-dim);
  padding: 2px 8px;
  border: 1px dashed var(--color-border-strong);
  border-radius: 4px;
  white-space: nowrap;
}

.manifest-item--planned {
  opacity: 0.58;
}
.manifest-item--planned:hover {
  opacity: 0.85;
}
.manifest-item--planned .manifest-num {
  color: var(--color-dim);
}
.manifest-item--planned .manifest-title {
  color: var(--color-muted);
}

/* ---- Form ---- */
.gate-form-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  border: 1px solid var(--color-border-strong);
  border-radius: 14px;
  background: var(--color-surface);
  position: relative;
}

.gate-form-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
  opacity: 0.5;
}

.gate-form-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.gate-form-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-gold);
  animation: radio-pulse 2.4s ease-in-out infinite;
}

.gate-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.gate-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gate-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

.gate-input {
  background: var(--color-raised);
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
  font: inherit;
  font-size: 15px;
  padding: 12px 14px;
  border-radius: 8px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  outline: none;
}
.gate-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px var(--color-gold-dim);
}
.gate-input::placeholder { color: var(--color-dim); }

.gate-hint {
  font-size: 12px;
  color: var(--color-dim);
  line-height: 1.5;
}

.gate-error {
  font-size: 13px;
  color: var(--color-danger);
  font-family: var(--font-mono);
}

@media (prefers-reduced-motion: reduce) {
  .gate-radio,
  .gate-form-dot {
    animation: none;
    opacity: 0.8;
  }
  .manifest-item { animation: none; }
}
</style>
