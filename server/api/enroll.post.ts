import { defineEventHandler, readBody, createError } from 'h3'

/**
 * Bronze enrollment gate.
 * POST { email, code } → { ok, redirect } | { ok: false, error }
 *
 * Codes are stored in runtime config as a comma-separated string.
 * In production, swap the in-memory enrollments log for a real store
 * (Airtable, Notion, Postgres, ConvertKit — whatever captures the list).
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

  if (!validCodes.includes(code)) {
    return { ok: false, error: 'That ticket code is not recognized.' }
  }

  // TODO: persist enrollment (Airtable / Notion / Postgres).
  // For now, log server-side so we have a trail during the friends launch.
  console.log('[enroll]', { email, code, at: new Date().toISOString() })

  return {
    ok: true,
    redirect: '/start/01-mental-model',
  }
})
