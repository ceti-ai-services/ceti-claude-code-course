/**
 * i18nLabels — canonical EN/ES map for primitive eyebrow + action labels.
 *
 * Why this file exists:
 *   Several teaching primitives (DiagramShell, TryThis, Recap, CopyButton)
 *   render short hardcoded strings for eyebrows ("LIVE DIAGRAM", "TRY THIS",
 *   "RECAP") and action buttons ("Copy" / "Copied"). Before this helper,
 *   toggling the customizer EN → ES left these strings in English. This
 *   module is the single source of truth for those labels.
 *
 * Scope:
 *   - Primitive/eyebrow labels that live in code, not in markdown content.
 *   - Short action labels (Copy / Copied).
 *
 * Out of scope:
 *   - Technical terms (file paths, flags, command names, product names like
 *     "Claude Code", "MCP", "Git"). Never translated.
 *   - User-supplied title / content strings passed via props from markdown.
 *     Those are author responsibility, handled per-diagram via the EN/ES
 *     objects each diagram wrapper already maintains.
 *
 * Usage:
 *   import { useCustomizer } from '@/composables/useCustomizer'
 *   import { useLabels } from '@/utils/i18nLabels'
 *
 *   const { lang } = useCustomizer()
 *   const L = useLabels(lang)
 *   // in template: {{ L('LIVE_DIAGRAM') }}
 *
 * Tone:
 *   Neutral Latin-American Spanish. Uppercase where the consumer's CSS
 *   applies `text-transform: uppercase` (i.e. all the mono-eyebrow slots).
 */

import type { Ref } from 'vue'

export const LABELS_EN = {
  // Eyebrows (mono, CSS-uppercased)
  LIVE_DIAGRAM: 'LIVE DIAGRAM',
  TIP: 'TIP',
  TRY_THIS: 'TRY THIS',
  RECAP: 'RECAP',
  BRIEF: 'MISSION BRIEF',
  WARNING: 'WARNING',
  CAUTION: 'CAUTION',
  NOTE: 'NOTE',
  DECISION: 'DECISION',
  APPROVAL: 'APPROVAL',
  STRUCTURE: 'STRUCTURE',
  DEFINITION: 'DEFINITION',
  SYNTHESIS: 'SYNTHESIS',
  REFLECT: 'REFLECT',
  IMPORTANT: 'IMPORTANT',
  INFO: 'INFO',
  CORE_IDEA: 'CORE IDEA',
  STAKES: 'STAKES',
  READ: 'READ',
  PLAN: 'PLAN',
  EXECUTE: 'EXECUTE',
  TRANSMISSION: 'Transmission',
  // Action labels (title-case, not CSS-uppercased)
  COPY: 'Copy',
  COPIED: 'Copied',
} as const

export type LabelKey = keyof typeof LABELS_EN

export const LABELS_ES: Record<LabelKey, string> = {
  LIVE_DIAGRAM: 'DIAGRAMA',
  TIP: 'CONSEJO',
  TRY_THIS: 'PRUEBA ESTO',
  RECAP: 'RESUMEN',
  BRIEF: 'MISIÓN',
  WARNING: 'ATENCIÓN',
  CAUTION: 'PRECAUCIÓN',
  NOTE: 'NOTA',
  DECISION: 'DECISIÓN',
  APPROVAL: 'APROBACIÓN',
  STRUCTURE: 'ESTRUCTURA',
  DEFINITION: 'DEFINICIÓN',
  SYNTHESIS: 'SÍNTESIS',
  REFLECT: 'REFLEXIÓN',
  IMPORTANT: 'IMPORTANTE',
  INFO: 'INFORMACIÓN',
  CORE_IDEA: 'IDEA CLAVE',
  STAKES: 'EN JUEGO',
  READ: 'LEE',
  PLAN: 'PLAN',
  EXECUTE: 'EJECUTA',
  TRANSMISSION: 'Transmisión',
  COPY: 'Copiar',
  COPIED: 'Copiado',
}

/**
 * Returns a translator function bound to the given reactive lang Ref.
 * Call the returned function in templates / computed getters — reactivity
 * on `lang.value` is preserved.
 */
export function useLabels(lang: Ref<'en' | 'es'>) {
  return (key: LabelKey): string =>
    lang.value === 'es' ? LABELS_ES[key] : LABELS_EN[key]
}
