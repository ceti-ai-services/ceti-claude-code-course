<template>
  <main class="container" style="padding: 60px 24px 80px;">
    <div class="eyebrow">🥇 Gold Ticket</div>
    <h1>Claude Code in Your Business</h1>
    <p class="lead" style="margin-top:16px; max-width:620px;">
      1:1 integration for founders, operators, and solo professionals. We audit your
      week, build the CLAUDE.md, skills, and MCP connections your work actually needs,
      and stay on-call for 30 days. Capped at 5 per quarter.
    </p>

    <div class="card" style="margin-top:40px; max-width:540px;">
      <div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:20px;">
        <h2 style="margin:0;">Gold — $2,500</h2>
        <span style="color:var(--dim); font-size:13px;">USD · one-time</span>
      </div>
      <ul style="list-style:none; padding:0;">
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> 4 × 1:1 hours with Manu or lead instructor</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Built-for-you CLAUDE.md, skills, MCP config</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Workflow audit — what Claude Code replaces in your week</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> 30-day post-engagement Slack support</li>
        <li style="padding:6px 0 6px 22px; position:relative; color:var(--muted);"><span style="color:var(--gold); position:absolute; left:0;">→</span> Optional $500/mo retainer after</li>
      </ul>
      <button class="btn btn-primary" style="width:100%; margin-top:24px;" :disabled="loading" @click="checkout">
        {{ loading ? 'Redirecting…' : 'Book Gold — $2,500 →' }}
      </button>
      <p v-if="error" class="form-error" style="margin-top:12px;">{{ error }}</p>
      <p style="margin-top:16px; color:var(--dim); font-size:13px; text-align:center;">
        After payment we'll schedule your intake call within 2 business days.
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
    const res = await $fetch<{ url?: string; error?: string }>('/api/checkout/gold', {
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
