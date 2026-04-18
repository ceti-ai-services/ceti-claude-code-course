<template>
  <main class="container" style="padding: 80px 24px 120px; text-align:center;">
    <div class="eyebrow">{{ isAdmin ? 'Admin test · payment skipped' : "You're in" }}</div>
    <h1>{{ heading }}</h1>
    <p class="lead" style="margin: 20px auto 0; max-width: 540px;">
      <template v-if="isAdmin">
        This is the admin test path — no payment was taken. In production, this page shows
        after Stripe returns a successful payment for <strong>{{ tierLabel }}</strong>.
      </template>
      <template v-else>
        You'll get an email within a few minutes with your onboarding packet and the
        calendar link for your first session. If it doesn't arrive, check spam, then email
        <a href="mailto:hello@ceti.ai">hello@ceti.ai</a>.
      </template>
    </p>
    <div style="margin-top:40px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
      <NuxtLink to="/" class="btn btn-secondary">← Back to home</NuxtLink>
      <NuxtLink v-if="isAdmin" to="/start" class="btn btn-primary">Test Bronze flow →</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const tier = computed(() => String(route.query.tier || ''))
const isAdmin = computed(() => route.query.admin === '1')

const tierLabel = computed(() => {
  if (tier.value === 'silver') return 'Silver — $499'
  if (tier.value === 'gold') return 'Gold — $2,500'
  return 'this tier'
})

const heading = computed(() => {
  if (isAdmin.value && tier.value) return `${tierLabel.value} — admin bypass successful.`
  return 'Thanks — payment received.'
})
</script>
