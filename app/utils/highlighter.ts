/**
 * highlighter.ts — themed syntax highlighting via Shiki (fine-grained bundle).
 *
 * Strategy:
 *   - Dual-theme output via Shiki's `defaultColor: false` flag. Shiki emits a
 *     single <pre> whose tokens carry both `color:` (light) and `--shiki-dark`
 *     (dark) custom properties. A tiny CSS switch in main.css selects the
 *     right color per body theme class.
 *   - We use shiki/core + the JS engine (no WASM) + only the languages we
 *     actually ship in lesson fences (bash/powershell/json/markdown, plus
 *     text fallback). Bundle target: ~120–180 KB gzip on the client chunk
 *     that imports this utility.
 *   - Singleton highlighter — created on first call, reused for every
 *     subsequent invocation (getHighlighter caches the promise).
 *
 * Public API:
 *   - highlight(code, lang) → Promise<string>
 *     Returns a <pre class="shiki …"><code>…</code></pre> string. Unknown
 *     langs fall through to HTML-escaped plain text wrapped in the same
 *     shell — no throw.
 *   - SUPPORTED_LANGS — exported whitelist for callers that want to normalise
 *     the lang hint before calling.
 */

import type { HighlighterCore } from "shiki/core"
import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

// Languages we actively ship in lesson content fences. Scope is intentionally
// narrow — each added language adds another Vite chunk to the client bundle.
// If a new lang shows up in content/, add it here + to LANG_ALIASES.
const LANG_LOADERS = {
  bash: () => import("shiki/langs/bash.mjs").then((m) => m.default),
  powershell: () => import("shiki/langs/powershell.mjs").then((m) => m.default),
  json: () => import("shiki/langs/json.mjs").then((m) => m.default),
  markdown: () => import("shiki/langs/markdown.mjs").then((m) => m.default),
} as const

// Canonical lang IDs (what Shiki expects) + aliases users may write in
// markdown fences. Unknown → treated as "text", no highlighting.
export const LANG_ALIASES: Record<string, keyof typeof LANG_LOADERS> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  powershell: "powershell",
  ps1: "powershell",
  pwsh: "powershell",
  json: "json",
  jsonc: "json",
  markdown: "markdown",
  md: "markdown",
}

export const SUPPORTED_LANGS = Object.keys(LANG_ALIASES)

let highlighterPromise: Promise<HighlighterCore> | null = null
const loadedLangs = new Set<string>()

async function getHighlighter(): Promise<HighlighterCore> {
  if (highlighterPromise) return highlighterPromise
  highlighterPromise = (async () => {
    const [githubLight, githubDarkDimmed] = await Promise.all([
      import("shiki/themes/github-light.mjs").then((m) => m.default),
      import("shiki/themes/github-dark-dimmed.mjs").then((m) => m.default),
    ])
    return createHighlighterCore({
      themes: [githubLight, githubDarkDimmed],
      langs: [], // loaded lazily per-call — see ensureLang()
      engine: createJavaScriptRegexEngine(),
    })
  })()
  return highlighterPromise
}

async function ensureLang(
  hl: HighlighterCore,
  lang: keyof typeof LANG_LOADERS,
): Promise<void> {
  if (loadedLangs.has(lang)) return
  const grammar = await LANG_LOADERS[lang]()
  await hl.loadLanguage(grammar)
  loadedLangs.add(lang)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function plainFallback(code: string): string {
  return `<pre class="shiki shiki-plain"><code>${escapeHtml(code)}</code></pre>`
}

/**
 * Highlight `code` with `lang` using Shiki. Returns a `<pre class="shiki">`
 * HTML string suitable for `v-html`. Safe to call with an empty / unknown
 * lang — returns the plain-escaped fallback.
 */
export async function highlight(code: string, lang: string): Promise<string> {
  const key = (lang || "").toLowerCase().trim()
  const canonical = LANG_ALIASES[key]
  if (!canonical) return plainFallback(code)
  try {
    const hl = await getHighlighter()
    await ensureLang(hl, canonical)
    return hl.codeToHtml(code, {
      lang: canonical,
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      defaultColor: false,
    })
  } catch {
    return plainFallback(code)
  }
}
