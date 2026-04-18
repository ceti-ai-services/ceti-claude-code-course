import { defineEventHandler, createError } from 'h3'

/**
 * Gold checkout — $2,500 one-time.
 * PLACEHOLDER: see server/api/checkout/silver.post.ts for the real pattern.
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const priceId = process.env.STRIPE_PRICE_GOLD

  if (!config.stripeSecretKey || !priceId) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Stripe not configured — email hello@ceti.ai to book',
    })
  }

  return {
    url: `https://checkout.stripe.com/pay/placeholder?price=${priceId}&tier=gold`,
  }
})
