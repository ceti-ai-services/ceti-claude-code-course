<template>
  <main class="container" style="padding: 60px 24px 40px;">
    <div class="eyebrow">🥉 Bronze Ticket</div>
    <h1>Claude Code: Day One</h1>
    <p class="lead" style="margin-top:16px; max-width:600px;">
      Zero to productive in about 90 minutes. Seven modules, a starter kit, and a
      CLAUDE.md template you'll actually use. Enter your ticket code to begin.
    </p>

    <form class="form" @submit.prevent="submit" style="margin-top:40px;">
      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@company.com"
          required
        >
      </div>
      <div class="field">
        <label for="code">Ticket code</label>
        <input
          id="code"
          v-model="code"
          type="text"
          autocomplete="off"
          placeholder="BRONZE-FRIEND-01"
          required
        >
        <div class="field-hint">Case-insensitive. If you don't have one, reply to the email you received.</div>
      </div>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Checking…' : 'Start the course →' }}
      </button>
    </form>

    <section style="margin-top:64px;">
      <div class="eyebrow" style="color:var(--dim);">What's inside</div>
      <div class="modules">
        <div class="module">
          <div class="module-num">01</div>
          <div class="module-title">What Claude Code is (and isn't) — mental model</div>
          <div class="module-time">12 min</div>
        </div>
        <div class="module">
          <div class="module-num">02</div>
          <div class="module-title">Install on Mac, Windows, or Linux</div>
          <div class="module-time">15 min</div>
        </div>
        <div class="module">
          <div class="module-num">03</div>
          <div class="module-title">First session — ask it something useful</div>
          <div class="module-time">12 min</div>
        </div>
        <div class="module">
          <div class="module-num">04</div>
          <div class="module-title">File permissions — edit a real file, revert</div>
          <div class="module-time">14 min</div>
        </div>
        <div class="module">
          <div class="module-num">05</div>
          <div class="module-title">CLAUDE.md — fill-in-the-blanks template</div>
          <div class="module-time">13 min</div>
        </div>
        <div class="module">
          <div class="module-num">06</div>
          <div class="module-title">One real use case (report, organize, email)</div>
          <div class="module-time">15 min</div>
        </div>
        <div class="module">
          <div class="module-num">07</div>
          <div class="module-title">Next steps → Silver / Gold</div>
          <div class="module-time">10 min</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const email = ref('')
const code = ref('')
const error = ref('')
const loading = ref(false)

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
