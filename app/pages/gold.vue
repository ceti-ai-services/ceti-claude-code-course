<template>
  <main class="container" style="padding: 60px 24px 80px;">
    <section>
      <div class="eyebrow">🥇 Gold Ticket</div>
      <h1>Claude Code in Your Business</h1>
      <p class="lead" style="margin-top:16px; max-width:640px;">
        Not a course. A built-for-you integration. We audit your calendar, write a custom
        CLAUDE.md in your voice, and wire MCP into the tools your team already uses — Gmail,
        Calendar, Notion, Airtable, Linear, whatever's on your stack.
      </p>
    </section>

    <section style="margin-top:56px;">
      <div class="eyebrow" style="color:var(--dim);">The engagement · four 60-min sessions</div>
      <div class="modules">
        <div class="module">
          <div class="module-num">S1</div>
          <div>
            <div class="module-title">Workflow audit</div>
            <div class="module-sub">We watch how you work for a week via logged notes. Identify the tasks worth replacing first.</div>
          </div>
          <div class="module-time">60 min</div>
        </div>
        <div class="module">
          <div class="module-num">S2</div>
          <div>
            <div class="module-title">Custom CLAUDE.md plus 5 skills</div>
            <div class="module-sub">Tailored to your voice, your role, your team conventions. Not a generic template.</div>
          </div>
          <div class="module-time">60 min</div>
        </div>
        <div class="module">
          <div class="module-num">S3</div>
          <div>
            <div class="module-title">MCP wiring</div>
            <div class="module-sub">Gmail, Calendar, Notion, Airtable, Linear, databases — whatever your stack is. Live, tested, working.</div>
          </div>
          <div class="module-time">60 min</div>
        </div>
        <div class="module">
          <div class="module-num">S4</div>
          <div>
            <div class="module-title">Handoff and team playbook</div>
            <div class="module-sub">Recorded walkthrough plus internal docs you can share with the rest of your team.</div>
          </div>
          <div class="module-time">60 min</div>
        </div>
      </div>
    </section>

    <section style="margin-top:64px;">
      <div class="eyebrow" style="color:var(--dim);">What you leave with</div>
      <ul class="deliverables">
        <li><strong>Custom CLAUDE.md.</strong> Yours, on your machine, in your voice.</li>
        <li><strong>5+ bespoke slash commands.</strong> Built around your actual role, not a demo workflow.</li>
        <li><strong>Live MCP connections.</strong> To the tools your business already runs on.</li>
        <li><strong>Recorded handoff.</strong> For teammates, contractors, or your future self.</li>
        <li><strong>30-day Slack access.</strong> For follow-up questions, debugging, or edge cases.</li>
      </ul>
    </section>

    <section style="margin-top:64px;">
      <div class="eyebrow" style="color:var(--dim);">Who this is for</div>
      <div class="persona-grid">
        <div class="card persona">
          <h3>Founders and operators</h3>
          <p>The week runs through your calendar. The bottleneck has your name on it.</p>
        </div>
        <div class="card persona">
          <h3>Team leads evaluating rollout</h3>
          <p>Piloting AI tooling before committing the team. You want a working reference install.</p>
        </div>
        <div class="card persona">
          <h3>Solo professionals</h3>
          <p>Consultants, lawyers, doctors. High-value expertise plus a predictable admin tax.</p>
        </div>
      </div>
    </section>

    <section style="margin-top:56px;">
      <div class="callout">
        <p>
          <strong>$1,000/mo optional retainer after.</strong> Ongoing skill additions, MCP maintenance, and
          a quarterly workflow audit. Cancel any time. Only offered after a Gold engagement completes.
        </p>
      </div>
    </section>

    <section style="margin-top:56px;">
      <div class="card card-featured" style="max-width:540px;">
        <div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:20px;">
          <h2 style="margin:0;">Gold — $2,500</h2>
          <span style="color:var(--dim); font-size:13px;">USD · one-time</span>
        </div>
        <ul style="list-style:none; padding:0;">
          <li class="tier-li">4 × 1:1 hours with Manu or lead instructor</li>
          <li class="tier-li">Built-for-you CLAUDE.md, skills, MCP config</li>
          <li class="tier-li">Workflow audit — what Claude Code replaces in your week</li>
          <li class="tier-li">Recorded handoff and team playbook</li>
          <li class="tier-li">30-day post-engagement Slack support</li>
          <li class="tier-li">Optional $1,000/mo retainer after</li>
        </ul>
        <button class="btn btn-primary" style="width:100%; margin-top:24px;" :disabled="loading" @click="checkout">
          {{ loading ? 'Redirecting…' : 'Book Gold — $2,500 →' }}
        </button>
        <p v-if="error" class="form-error" style="margin-top:12px;">{{ error }}</p>
        <p style="margin-top:16px; color:var(--dim); font-size:13px; text-align:center;">
          After payment we'll schedule your intake call within 2 business days.
        </p>
      </div>
      <p style="margin-top:20px; color:var(--dim); font-size:14px; max-width:540px;">
        Capped at 5 Gold engagements per quarter. If none are open, we add you to the priority waitlist.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(false)
const error = ref('')

// Admin bypass: append ?admin=MERCURIOP0656 to the URL to skip Stripe and land on /thanks.
const adminKey = computed(() => (typeof route.query.admin === 'string' ? route.query.admin : ''))

async function checkout() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ url?: string; error?: string }>('/api/checkout/gold', {
      method: 'POST',
      body: adminKey.value ? { adminKey: adminKey.value } : {},
    })
    if (res.url) {
      window.location.href = res.url
    } else {
      error.value = res.error || 'Stripe is not configured yet. Email hello@ceti.ai.'
    }
  } catch (e: any) {
    error.value = e?.data?.error || 'Checkout failed. Try again or email hello@ceti.ai.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.module {
  align-items: flex-start;
}
.module-num {
  padding-top: 2px;
}
.module > div:nth-child(2) {
  flex: 1;
}
.module-sub {
  color: var(--muted);
  font-size: 13px;
  margin-top: 4px;
  line-height: 1.5;
}
.module-time {
  align-self: flex-start;
  padding-top: 2px;
}

.deliverables {
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: grid;
  gap: 12px;
}
.deliverables li {
  color: var(--muted);
  font-size: 15px;
  padding: 14px 18px 14px 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  position: relative;
}
.deliverables li::before {
  content: "→";
  color: var(--gold);
  position: absolute;
  left: 16px;
  top: 14px;
  font-weight: 600;
}
.deliverables strong {
  color: var(--text);
  font-weight: 600;
}

.persona-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 24px;
}
.persona {
  padding: 22px;
}
.persona h3 {
  margin-bottom: 8px;
  color: var(--text);
}
.persona p {
  font-size: 14px;
  line-height: 1.55;
}

.tier-li {
  padding: 6px 0 6px 22px;
  position: relative;
  color: var(--muted);
  font-size: 14px;
}
.tier-li::before {
  content: "→";
  color: var(--gold);
  position: absolute;
  left: 0;
}
</style>
