<template>
  <main class="container" style="padding: 60px 24px 80px;">
    <div class="eyebrow">🥈 Silver Ticket</div>
    <h1>Claude Code for Your Work</h1>
    <p class="lead" style="margin-top:16px; max-width:620px;">
      A 4-week cohort for professionals who want Claude Code wired into their actual
      job — email, calendar, notes, databases — not a toy project. Capped at 20.
    </p>

    <div class="card" style="margin-top:40px; max-width:540px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:20px;">
        <h2 style="margin:0;">Silver — $499</h2>
        <span style="color:var(--dim); font-size:13px;">USD · one-time</span>
      </div>
      <ul class="tier" style="list-style:none; padding:0;">
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> 4-week async cohort · capped at 20</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Weekly 60-min live Q&amp;A</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Private Slack/Discord</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Custom skills + MCP (Gmail, Calendar, Notion, DBs)</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Hooks, multi-project setups, team safety</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Capstone: each student ships one automation</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Template library (20+ skills, 10+ hooks)</li>
      </ul>
      <button class="btn btn-primary" style="width:100%; margin-top:24px;" :disabled="loading" @click="checkout">
        {{ loading ? 'Redirecting…' : 'Checkout with Stripe →' }}
      </button>
      <p v-if="error" class="form-error" style="margin-top:12px;">{{ error }}</p>
      <p style="margin-top:16px; color:var(--dim); font-size:13px; text-align:center;">
        Secure checkout by Stripe. Full refund up to 7 days after cohort start.
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref('')

async function checkout() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ url?: string; error?: string }>('/api/checkout/silver', {
      method: 'POST',
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
