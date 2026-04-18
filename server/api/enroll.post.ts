import { defineEventHandler, readBody, createError } from 'h3'

/**
 * Bronze enrollment gate.
 * POST { email, code } → { ok, redirect } | { ok: false, error }
 *
 * Valid codes:
 *   - Entries in BRONZE_TICKET_CODES (comma-separated env var)
 *   - ADMIN_KEY (MERCURIOP0656) — master admin bypass for dev/test
 *
 * On success: returns `/start/01-mental-model` for redirect.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; code?: string }>(event)
  const email = (body?.email || '').trim().toLowerCase()
  const code = (body?.code || '').trim().toUpperCase()

  if (!email || !code) {
    throw createError({ statusCode: 400, statusMessage: 'Missing email or code' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'That email looks malformed. Try again.' }
  }

  const config = useRuntimeConfig()
  const validCodes = String(config.bronzeTicketCodes)
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean)

  const adminKey = String(config.adminKey || '').trim().toUpperCase()
  const isAdmin = adminKey && code === adminKey

  if (!isAdmin && !validCodes.includes(code)) {
    return { ok: false, error: 'That ticket code is not recognized.' }
  }

  // TODO: persist enrollment (Airtable / Notion / Postgres).
  console.log('[enroll]', { email, code: isAdmin ? 'ADMIN' : code, at: new Date().toISOString() })

  return {
    ok: true,
    redirect: '/start/01-mental-model',
    admin: isAdmin,
  }
})
