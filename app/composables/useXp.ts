import { ref, readonly, onMounted } from 'vue'

/**
 * XP store — SSR-safe. Initial value 0 until mounted, then hydrates from
 * localStorage. Every increment writes both the running total and appends
 * to a capped event log at `ceti.xp.log.v1` (trailing 50 events).
 */

const LS_XP = 'ceti.xp.v1'
const LS_LOG = 'ceti.xp.log.v1'
const LOG_MAX = 50

interface XpEvent {
  amount: number
  reason: string
  at: number
}

const xp = ref(0)
const hydrated = ref(false)

function readXp(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = window.localStorage.getItem(LS_XP)
    if (!raw) return 0
    const n = Number.parseInt(raw, 10)
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

function readLog(): XpEvent[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LS_LOG)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((e): e is XpEvent =>
      typeof e === 'object' && e !== null
      && typeof (e as XpEvent).amount === 'number'
      && typeof (e as XpEvent).reason === 'string'
      && typeof (e as XpEvent).at === 'number',
    )
  } catch {
    return []
  }
}

function persist(next: number, log: XpEvent[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LS_XP, String(next))
    window.localStorage.setItem(LS_LOG, JSON.stringify(log.slice(-LOG_MAX)))
  } catch {
    /* quota / privacy — ok */
  }
}

export function useXp() {
  onMounted(() => {
    if (hydrated.value) return
    xp.value = readXp()
    hydrated.value = true
  })

  function addXp(amount: number, reason: string) {
    if (typeof window === 'undefined') return
    if (!Number.isFinite(amount) || amount <= 0) return
    const next = xp.value + Math.floor(amount)
    const log = readLog()
    log.push({ amount: Math.floor(amount), reason, at: Date.now() })
    xp.value = next
    persist(next, log)
  }

  function reset() {
    if (typeof window === 'undefined') return
    xp.value = 0
    try {
      window.localStorage.removeItem(LS_XP)
      window.localStorage.removeItem(LS_LOG)
    } catch { /* no-op */ }
  }

  return {
    xp: readonly(xp),
    addXp,
    reset,
  }
}
