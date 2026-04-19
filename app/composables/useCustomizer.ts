import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Persona, Lang } from '~/types/customizer'
import { isPersona, isLang, DEFAULT_CUSTOMIZER } from '~/types/customizer'

const LS_KEY = 'ceti.customizer.v1'

interface StoredState {
  persona: Persona | null
  lang: Lang
  at: number
}

function readStored(): Partial<StoredState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(LS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Partial<StoredState>
    return parsed
  } catch {
    return {}
  }
}

function writeStored(next: Partial<StoredState>) {
  if (typeof window === 'undefined') return
  const merged: StoredState = {
    persona: next.persona ?? null,
    lang: next.lang ?? 'en',
    at: Date.now(),
  }
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(merged))
  } catch {
    /* quota / privacy mode — fine, URL is source of truth anyway */
  }
}

/**
 * Minimal customizer — URL-param is the source of truth.
 * localStorage is convenience (so returning visitors see "Continue as X").
 *
 * See docs/DECISIONS.md → "i18n approach".
 */
export function useCustomizer() {
  const route = useRoute()
  const router = useRouter()

  const persona = computed<Persona | null>(() => {
    const q = route.query.persona
    if (typeof q === 'string' && isPersona(q)) return q
    return null
  })

  const lang = computed<Lang>(() => {
    const q = route.query.lang
    if (typeof q === 'string' && isLang(q)) return q
    return DEFAULT_CUSTOMIZER.lang
  })

  function setCustomizer(next: { persona?: Persona | null; lang?: Lang }) {
    const nextQuery: Record<string, string> = { ...(route.query as Record<string, string>) }
    if (next.persona !== undefined) {
      if (next.persona === null) delete nextQuery.persona
      else nextQuery.persona = next.persona
    }
    if (next.lang !== undefined) nextQuery.lang = next.lang
    writeStored({ persona: next.persona ?? persona.value, lang: next.lang ?? lang.value })
    void router.replace({ query: nextQuery })
  }

  function restoreFromStorage() {
    const stored = readStored()
    if (!stored || typeof window === 'undefined') return
    const patches: Record<string, string> = {}
    if (!route.query.persona && stored.persona && isPersona(stored.persona)) {
      patches.persona = stored.persona
    }
    if (!route.query.lang && stored.lang && isLang(stored.lang)) {
      patches.lang = stored.lang
    }
    if (Object.keys(patches).length) {
      void router.replace({ query: { ...route.query, ...patches } as Record<string, string> })
    }
  }

  return {
    persona,
    lang,
    setCustomizer,
    restoreFromStorage,
  }
}
