import { defineEventHandler, readBody } from 'h3'

/**
 * Silver checkout — $499.
 *
 * Minimal-setup path: reads STRIPE_PAYMENT_LINK_SILVER and returns it.
 * To enable: create a Payment Link at https://dashboard.stripe.com/payment-links
 * and paste its URL into .env (or Vercel env vars).
 *
 * Admin bypass: if `adminKey` in body matches ADMIN_KEY env, skip Stripe and
 * redirect straight to /thanks?tier=silver&admin=1 so the full flow can be
 * walked end-to-end without a real payment.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ adminKey?: string }>(event).catch(() => ({}))
  const config = useRuntimeConfig()

  const provided = String(body?.adminKey || '').trim().toUpperCase()
  const adminKey = String(config.adminKey || '').trim().toUpperCase()
  if (adminKey && provided === adminKey) {
    return { url: '/thanks?tier=silver&admin=1' }
  }

  const paymentLink = String(config.stripePaymentLinkSilver || '').trim()
  if (paymentLink) {
    return { url: paymentLink }
  }

  return {
    error:
      'Stripe payment link not configured yet. Email hello@ceti.ai to enroll, or pass the admin key if you are testing.',
  }
})
