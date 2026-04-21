/**
 * usePalette — drives the <body class="palette-{name} {mode}"> switch.
 *
 * Four palettes × two modes. One shared, reactive state across the whole app.
 * Persists selection to localStorage. Hydration-safe (reads from localStorage
 * only on the client, defaults to boardwalk/dark on the server).
 */

export type Palette = "boardwalk" | "coastal" | "greenhouse" | "neosage"
export type Mode = "light" | "dark"

export const PALETTES: Palette[] = ["boardwalk", "coastal", "greenhouse", "neosage"]
export const PALETTE_META: Record<Palette, { label: string; emoji: string; blurb: string }> = {
  boardwalk:  { label: "Boardwalk",  emoji: "🎡", blurb: "warm, human — default" },
  coastal:    { label: "Coastal",    emoji: "🌊", blurb: "tradeoffs, balance" },
  greenhouse: { label: "Greenhouse", emoji: "🌿", blurb: "systems, growth" },
  neosage:    { label: "Neo Sage",   emoji: "⚡", blurb: "electric, high energy" },
}

const KEY_PALETTE = "ceti-palette"
const KEY_MODE = "ceti-mode"
const DEFAULT_PALETTE: Palette = "boardwalk"
const DEFAULT_MODE: Mode = "dark"

// Module-scope shared refs (one per tab). Nuxt composables auto-deduplicate.
const _palette = ref<Palette>(DEFAULT_PALETTE)
const _mode = ref<Mode>(DEFAULT_MODE)
let _hydrated = false

function applyToDocument() {
  if (typeof document === "undefined") return
  const body = document.body
  // Strip any stale palette-* or light/dark classes.
  Array.from(body.classList).forEach((c) => {
    if (c.startsWith("palette-") || c === "light" || c === "dark") {
      body.classList.remove(c)
    }
  })
  body.classList.add(`palette-${_palette.value}`, _mode.value)
}

function hydrate() {
  if (_hydrated || typeof window === "undefined") return
  _hydrated = true
  const p = localStorage.getItem(KEY_PALETTE) as Palette | null
  const m = localStorage.getItem(KEY_MODE) as Mode | null
  if (p && PALETTES.includes(p)) _palette.value = p
  if (m === "light" || m === "dark") _mode.value = m
  applyToDocument()

  watch(_palette, (v) => {
    localStorage.setItem(KEY_PALETTE, v)
    applyToDocument()
  })
  watch(_mode, (v) => {
    localStorage.setItem(KEY_MODE, v)
    applyToDocument()
  })
}

export function usePalette() {
  // Run hydration on mount (client-only).
  onMounted(() => hydrate())

  return {
    palette: _palette,
    mode: _mode,
    setPalette: (p: Palette) => { _palette.value = p },
    setMode: (m: Mode) => { _mode.value = m },
    toggleMode: () => { _mode.value = _mode.value === "dark" ? "light" : "dark" },
    cyclePalette: () => {
      const i = PALETTES.indexOf(_palette.value)
      const next = PALETTES[(i + 1) % PALETTES.length]
      if (next) _palette.value = next
    },
  }
}
