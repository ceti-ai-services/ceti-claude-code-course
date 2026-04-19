/**
 * StudentProfile — future-hook stub.
 *
 * This type contract exists so the dynamic AI assistant we'll plug in later
 * can read from a single known shape. Nothing in the app currently writes
 * to this — it's scaffolding for the next phase.
 *
 * See docs/DECISIONS.md → "Future-vision hooks".
 */

import type { Persona, Lang } from './customizer'

export interface Reflection {
  /** Module slug the reflection is attached to, e.g. "01-mental-model". */
  moduleSlug: string
  /** Free-text response from the student. */
  body: string
  /** Unix ms captured. */
  at: number
}

export interface StudentProfile {
  /** Stable anonymous ID — localStorage `ceti.profile.id`. */
  id: string
  persona: Persona | null
  lang: Lang
  completedModules: string[]
  reflections: Reflection[]
  /** When the profile was first seen. */
  createdAt: number
  /** When last touched. */
  updatedAt: number
  /** Opaque bag the AI assistant can write to without schema changes. */
  signals: Record<string, unknown>
}

export const EMPTY_PROFILE: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'> = {
  persona: null,
  lang: 'en',
  completedModules: [],
  reflections: [],
  signals: {},
}
