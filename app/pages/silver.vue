<template>
  <main class="container" style="padding: 60px 24px 80px;">
    <section>
      <div class="eyebrow">🥈 Silver Ticket</div>
      <h1>Claude Code for Your Work</h1>
      <p class="lead" style="margin-top:16px; max-width:640px;">
        Bronze is where you try it out. Silver is where you wire it into your actual job.
        Four weeks, a cohort of 20, and one real automation shipped by the end.
      </p>
    </section>

    <section style="margin-top:56px;">
      <div class="eyebrow" style="color:var(--dim);">Four weeks · mostly async</div>
      <div class="modules">
        <div class="module">
          <div class="module-num">W1</div>
          <div>
            <div class="module-title">Your real workflow, mapped</div>
            <div class="module-sub">Audit one week of work. Pick three targets worth automating.</div>
          </div>
          <div class="module-time">4–6 hrs</div>
        </div>
        <div class="module">
          <div class="module-num">W2</div>
          <div>
            <div class="module-title">Skills and slash commands</div>
            <div class="module-sub">Reusable prompts, versioned. The 20+ template library is yours.</div>
          </div>
          <div class="module-time">4–6 hrs</div>
        </div>
        <div class="module">
          <div class="module-num">W3</div>
          <div>
            <div class="module-title">MCP — your tools talking to Claude</div>
            <div class="module-sub">MCP is the protocol that lets Claude read and write Gmail, Calendar, Notion, and databases directly.</div>
          </div>
          <div class="module-time">4–6 hrs</div>
        </div>
        <div class="module">
          <div class="module-num">W4</div>
          <div>
            <div class="module-title">Capstone plus production safety</div>
            <div class="module-sub">Ship one automation end to end. Hooks, multi-project setup, team safety.</div>
          </div>
          <div class="module-time">4–6 hrs</div>
        </div>
      </div>
    </section>

    <section style="margin-top:64px;">
      <div class="eyebrow" style="color:var(--dim);">Who this is for</div>
      <div class="persona-grid">
        <div class="card persona">
          <h3>Ops and admin leads</h3>
          <p>The inbox, the spreadsheet, the Monday status doc. The same five tasks every week.</p>
        </div>
        <div class="card persona">
          <h3>Marketers and analysts</h3>
          <p>Buried in reporting. Data in one tool, narrative in another, deck in a third.</p>
        </div>
        <div class="card persona">
          <h3>Founders and operators</h3>
          <p>Early-stage teams consolidating a tool stack that grew faster than the headcount did.</p>
        </div>
      </div>
    </section>

    <section style="margin-top:64px;">
      <div class="eyebrow" style="color:var(--dim);">What you take home</div>
      <ul class="takeaways">
        <li><strong>Your 20+ skill library.</strong> Tailored to your role, not the generic starter set.</li>
        <li><strong>One shipped automation.</strong> The capstone runs on your machine, on your data, by week 4.</li>
        <li><strong>Community access.</strong> Private Slack stays open after the cohort ends. Not a 4-week expiration.</li>
      </ul>
    </section>

    <section style="margin-top:64px;">
      <div class="eyebrow" style="color:var(--dim);">FAQ</div>
      <div class="faq">
        <div class="faq-item">
          <h3>Do I need to know how to code?</h3>
          <p>No. Bronze is the only prerequisite. If you finished Bronze, you have what you need.</p>
        </div>
        <div class="faq-item">
          <h3>What is the time commitment?</h3>
          <p>Four to six hours per week for four weeks. Async except the weekly 60-minute live Q&amp;A.</p>
        </div>
        <div class="faq-item">
          <h3>What if I fall behind?</h3>
          <p>The cohort Slack stays active. Recordings of every live session are available the same day.</p>
        </div>
        <div class="faq-item">
          <h3>Can my company reimburse?</h3>
          <p>Yes. Receipt and invoice available on request. Most teams file it under education or L&amp;D budget.</p>
        </div>
      </div>
    </section>

    <section style="margin-top:72px;">
      <div class="card card-featured" style="max-width:540px;">
        <div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:20px;">
          <h2 style="margin:0;">Silver — $499</h2>
          <span style="color:var(--dim); font-size:13px;">USD · one-time</span>
        </div>
        <ul style="list-style:none; padding:0;">
          <li class="tier-li">4-week cohort · capped at 20</li>
          <li class="tier-li">Weekly 60-min live Q&amp;A</li>
          <li class="tier-li">Private Slack — rolling access</li>
          <li class="tier-li">Custom skills + MCP (Gmail, Calendar, Notion, DBs)</li>
          <li class="tier-li">Hooks, multi-project setups, team safety</li>
          <li class="tier-li">Capstone: each student ships one automation</li>
          <li class="tier-li">Template library (20+ skills, 10+ hooks)</li>
        </ul>
        <button class="btn btn-primary" style="width:100%; margin-top:24px;" :disabled="loading" @click="checkout">
          {{ loading ? 'Redirecting…' : 'Checkout with Stripe →' }}
        </button>
        <p v-if="error" class="form-error" style="margin-top:12px;">{{ error }}</p>
        <p style="margin-top:16px; color:var(--dim); font-size:13px; text-align:center;">
          Secure checkout by Stripe. Full refund up to 7 days after cohort start.
        </p>
      </div>
      <p style="margin-top:20px; color:var(--dim); font-size:14px; max-width:540px;">
        20 seats per cohort. Next cohort starts rolling — exact date confirmed at enrollment.
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
    const res = await $fetch<{ url?: string; error?: string }>('/api/checkout/silver', {
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

.takeaways {
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: grid;
  gap: 12px;
}
.takeaways li {
  color: var(--muted);
  font-size: 15px;
  padding: 14px 18px 14px 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  position: relative;
}
.takeaways li::before {
  content: "→";
  color: var(--gold);
  position: absolute;
  left: 16px;
  top: 14px;
  font-weight: 600;
}
.takeaways strong {
  color: var(--text);
  font-weight: 600;
}

.faq {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}
.faq-item h3 {
  margin-bottom: 6px;
  color: var(--text);
}
.faq-item p {
  font-size: 15px;
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
