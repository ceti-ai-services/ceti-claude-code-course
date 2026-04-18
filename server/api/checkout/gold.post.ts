import { defineEventHandler, readBody } from 'h3'

/**
 * Gold checkout — $2,500.
 * Same pattern as silver.post.ts — see that file for full docs.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ adminKey?: string }>(event).catch(() => ({}))
  const config = useRuntimeConfig()

  const provided = String(body?.adminKey || '').trim().toUpperCase()
  const adminKey = String(config.adminKey || '').trim().toUpperCase()
  if (adminKey && provided === adminKey) {
    return { url: '/thanks?tier=gold&admin=1' }
  }

  const paymentLink = String(config.stripePaymentLinkGold || '').trim()
  if (paymentLink) {
    return { url: paymentLink }
  }

  return {
    error:
      'Stripe payment link not configured yet. Email hello@ceti.ai to book, or pass the admin key if you are testing.',
  }
})
