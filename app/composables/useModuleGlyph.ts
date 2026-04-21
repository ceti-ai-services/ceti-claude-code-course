/**
 * useModuleGlyph — maps each Bronze module to its Buckminster-Fuller
 * synergetic polyhedron anchor + semantic meaning.
 *
 * Geometry rationale (per Fuller's Synergetics + module content):
 *   01 — Tetrahedron     : minimum system in universe; the foundational concept
 *   02 — Hexahedron      : cube = stable structure; installing the environment
 *   03 — Octahedron      : two tetrahedra in dual equilibrium; first two-way contact
 *   04 — Icosahedron     : 20 faces, maximum roundness = maximum boundary surface
 *   05 — Dodecahedron    : 12 pentagonal faces = container, memory vessel
 *   06 — Cuboctahedron   : vector equilibrium, zero-point; the balanced real task
 *   07 — Tetrahelix      : helical growth; reusable commands as growth nodes
 *   08 — Vector Equil.   : packaged capability; equilibrium of a full toolkit
 *   09 — Octahedron      : plan (up-tetra) / act (down-tetra) dual action
 *   10 — Hexahedron      : cube = gate and guard; structured boundary (hooks)
 *   11 — Icosahedron     : 12 vertices = 12 MCP connection points; network
 *   12 — Tetrahelix      : branching history; commits as growth helix
 *   13 — Cuboctahedron   : 4 sq + 8 tri faces = parallel balanced workstreams
 *   14 — Dodecahedron    : 12 faces = the wider world; cosmic completeness
 */

export type PolyhedronShape =
  | 'tetrahedron'
  | 'hexahedron'
  | 'octahedron'
  | 'dodecahedron'
  | 'icosahedron'
  | 'cuboctahedron'
  | 'tetrahelix'
  | 'vector-equilibrium'

export interface ModuleGlyph {
  shape: PolyhedronShape
  meaning: string
}

export const moduleGlyph: Record<string, ModuleGlyph> = {
  '01': { shape: 'tetrahedron',       meaning: 'foundation — minimum system' },
  '02': { shape: 'hexahedron',        meaning: 'structure — stable installation' },
  '03': { shape: 'octahedron',        meaning: 'first contact — dual equilibrium' },
  '04': { shape: 'icosahedron',       meaning: 'boundary / membrane — maximum surface' },
  '05': { shape: 'dodecahedron',      meaning: 'container — memory vessel' },
  '06': { shape: 'cuboctahedron',     meaning: 'equilibrium — the real task, zero-point' },
  '07': { shape: 'tetrahelix',        meaning: 'reusable growth — command helix' },
  '08': { shape: 'vector-equilibrium', meaning: 'packaged capability — full toolkit' },
  '09': { shape: 'octahedron',        meaning: 'plan / act — dual tetrahedra' },
  '10': { shape: 'hexahedron',        meaning: 'gate / guard — structured boundary' },
  '11': { shape: 'icosahedron',       meaning: 'network / connection — 12 vertices' },
  '12': { shape: 'tetrahelix',        meaning: 'branching history — commit helix' },
  '13': { shape: 'cuboctahedron',     meaning: 'parallel balance — workstream equilibrium' },
  '14': { shape: 'dodecahedron',      meaning: 'the wider world — cosmic completeness' },
} as const

/**
 * Resolves the glyph for a given module identifier.
 * Accepts either a 2-digit string ('01') or a full slug ('01-mental-model').
 *
 * @example
 * const { shape, meaning } = useModuleGlyph('01-mental-model')
 * // → { shape: 'tetrahedron', meaning: 'foundation — minimum system' }
 */
export function useModuleGlyph(moduleOrSlug: string): ModuleGlyph {
  // Extract leading digits from slug like '01-mental-model' → '01'
  const key = moduleOrSlug.match(/^(\d{2})/)?.[1] ?? moduleOrSlug
  return moduleGlyph[key] ?? { shape: 'tetrahedron', meaning: 'foundation' }
}
