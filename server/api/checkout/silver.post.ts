import { defineEventHandler, createError } from 'h3'

/**
 * Silver checkout — $499 one-time.
 * PLACEHOLDER: returns the Stripe Checkout URL when STRIPE_SECRET_KEY +
 * STRIPE_PRICE_SILVER are set. Otherwise returns a friendly error so the
 * UI doesn't crash during pre-launch.
 *
 * Real implementation:
 *   const stripe = new Stripe(config.stripeSecretKey)
 *   const session = await stripe.checkout.sessions.create({
 *     mode: 'payment',
 *     line_items: [{ price: config.stripePriceSilver, quantity: 1 }],
 *     success_url: `${siteUrl}/thanks?tier=silver`,
 *     cancel_url:  `${siteUrl}/silver`,
 *   })
 *   return { url: session.url }
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const priceId = process.env.STRIPE_PRICE_SILVER

  if (!config.stripeSecretKey || !priceId) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Stripe not configured — email hello@ceti.ai to enroll',
    })
  }

  // Replace this block with a real Stripe SDK call once keys are set.
  return {
    url: `https://checkout.stripe.com/pay/placeholder?price=${priceId}&tier=silver`,
  }
})
