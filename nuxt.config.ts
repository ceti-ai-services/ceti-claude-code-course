// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },
  ssr: true,
  // No preset override — Vercel auto-detects `vercel` preset, so API routes
  // run as serverless functions in production. Locally, `nuxt dev` runs them
  // in the Nitro dev server.
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'CETI.AI — Claude Code Course',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Learn Claude Code. Do real work. For non-developers.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    // server-only
    adminKey: process.env.ADMIN_KEY || '',
    bronzeTicketCodes:
      process.env.BRONZE_TICKET_CODES || 'BRONZE-FRIEND-01,BRONZE-FRIEND-02,CETI-BRONZE-2026',
    stripePaymentLinkSilver: process.env.STRIPE_PAYMENT_LINK_SILVER || '',
    stripePaymentLinkGold: process.env.STRIPE_PAYMENT_LINK_GOLD || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://cetiai.co',
    },
  },
})
