# Stripe — Minimal Setup

The checkout integration uses **Stripe Payment Links** instead of Checkout Sessions. This is the fastest path from zero to a working paid enrollment — no secret keys in the app, no webhook config, no server-side SDK. Six clicks in the Stripe dashboard, two environment variables, done.

## End-to-end (≈5 minutes)

### 1. Create two Payment Links

1. Sign in at https://dashboard.stripe.com (create a free account if you don't have one).
2. Top-right toggle: **flip to Test mode** for initial testing. Flip to Live mode when ready to take real money.
3. Left sidebar → **Payment Links** → **+ New**.
4. Click **+ Add a product** and enter:
   - Product name: `CETI Claude Code — Silver Ticket`
   - Price: `$499.00` · One-time
5. Scroll down to **After payment**:
   - Select **Don't show confirmation page** → redirect to: `https://learn.cetiai.co/thanks?tier=silver` (or your Vercel URL).
6. Click **Create link** and copy the URL (looks like `https://buy.stripe.com/test_xxxxx`).
7. Repeat for Gold:
   - Product name: `CETI Claude Code — Gold Ticket`
   - Price: `$2,500.00` · One-time
   - Redirect: `.../thanks?tier=gold`

### 2. Paste URLs into `.env`

```bash
STRIPE_PAYMENT_LINK_SILVER=https://buy.stripe.com/test_xxxxxxxxxxxxxx
STRIPE_PAYMENT_LINK_GOLD=https://buy.stripe.com/test_yyyyyyyyyyyyyy
```

### 3. Restart dev server / redeploy

```bash
npm run dev
# or on Vercel: add the two env vars in Project Settings → Environment Variables,
# then redeploy with `npx vercel --prod --yes`
```

### 4. Test end-to-end

- Visit `/silver` → click checkout → Stripe's hosted page → fill test card `4242 4242 4242 4242` with any future expiry and any CVC → success → land on `/thanks?tier=silver`.
- Repeat for `/gold`.

## Admin bypass (no Stripe needed)

For walking the flow end-to-end without touching Stripe at all:

- Bronze: enter email + `MERCURIOP0656` as the ticket code → lands at `/start/01-mental-model`.
- Silver: visit `/silver?admin=MERCURIOP0656` → click checkout → lands at `/thanks?tier=silver&admin=1` (no payment taken, page shows admin test banner).
- Gold: visit `/gold?admin=MERCURIOP0656` → same behavior.

This works from the moment `.env` is saved — no Stripe setup required. It's purely for dev/test, never exposed in UI.

## Going live

When you're ready to take real payments:

1. In Stripe dashboard, flip to **Live mode** (top-right toggle).
2. Recreate the two Payment Links under Live mode (Stripe keeps test- and live-mode objects separate).
3. Update the two `STRIPE_PAYMENT_LINK_*` env vars in Vercel Project Settings.
4. Test with a real card (you can refund yourself immediately via the dashboard).

## Why Payment Links instead of Checkout Sessions?

- **Zero secret keys in the app** — no `STRIPE_SECRET_KEY` to rotate or leak.
- **No webhook handling** — Stripe's hosted confirmation page handles post-payment UX, our `/thanks` page is reached via redirect.
- **Refund + dashboard workflows** are identical to full Checkout.
- Harder to customize (no dynamic quantities, no complex line items) — but for a 2-SKU course product, it's strictly better.

If the business evolves to need coupons, subscriptions, or dynamic pricing, switch to Checkout Sessions — the `/api/checkout/*` handlers are the only files that change.
