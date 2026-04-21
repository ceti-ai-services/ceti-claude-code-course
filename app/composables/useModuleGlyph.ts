/**
 * useModuleGlyph — maps each Bronze module to a polyhedron anchor.
 *
 * Three lineages converge on each shape:
 *   · Platonic/Classical (fire, earth, air, water, cosmos)
 *   · Fuller/Synergetics (what the shape *does* in Bucky's geometry)
 *   · Pedagogical       (what kind of concept the shape teaches best)
 *
 * The 14 modules collapse onto 8 shapes. Repetition is intentional — a
 * shape that reappears becomes a word in the reader's vocabulary. By the
 * end of Bronze, the glyph nav is a small visual grammar:
 *
 *   tetrahedron     — firsts; the atomic idea                 (M01)
 *   hexahedron      — foundation / gate; hard boundary        (M02, M10)
 *   octahedron      — duality / exchange between two sides    (M03, M09)
 *   dodecahedron    — the container / cosmos of a thing       (M05, M14)
 *   icosahedron     — membrane with many contact points       (M04, M11)
 *   cuboctahedron   — balanced real task (intentional 1-of)   (M06)
 *   tetrahelix      — compounding reuse; helical growth       (M07, M12)
 *   vector-equil.   — packaged working wholeness, dispatched  (M08, M13)
 *
 * See `.agent/polyhedra-symbology.md` for the long-form archetype notes.
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

/**
 * Module-by-module rationale (shape : why this shape, not another):
 *
 *   01 · tetrahedron        — the minimum system; "what Claude Code is"
 *                             is the single irreducible idea the course begins with.
 *   02 · hexahedron         — laying the ground. Install = earth element = stable
 *                             tessellation that everything else sits on.
 *   03 · octahedron         — the first two-way contact (user ↔ agent). Two
 *                             tetrahedra apex-to-apex = the dialogue shape.
 *   04 · icosahedron        — the approval membrane. 20 faces, 12 contact vertices:
 *                             the boundary between you and what Claude is about to do.
 *   05 · dodecahedron       — CLAUDE.md is the *project's cosmos*. 12 pentagonal
 *                             faces = aether, the container that holds everything else.
 *   06 · cuboctahedron      — the balanced real task. All forces in proportion
 *                             (tetra + octa wearing each other). Intentional singleton:
 *                             M06 is the one-off "equilibrium of a real deliverable."
 *   07 · tetrahelix         — slash commands grow by reuse. Each command reuses the
 *                             face of the last. Pure Fuller: growth with minimum
 *                             structural change.
 *   08 · vector-equilibrium — a skill is a packaged capability Claude loads on
 *                             demand. VE = cuboctahedron + 12 radii from center,
 *                             the "complete toolkit held in equilibrium."
 *   09 · octahedron         — plan mode = think-then-act. Up-tetra / down-tetra.
 *                             Echoes M03's exchange, now as a self-dialogue.
 *   10 · hexahedron         — hooks are hard gates. Same cube as install, now as
 *                             guard rather than ground. Rhyme intentional.
 *   11 · icosahedron        — MCP is the same membrane shape as permissions, now
 *                             outward: 12 vertices = 12 connectors into your body
 *                             of work. The reader should feel the echo.
 *   12 · tetrahelix         — git is a helix of commits, each one reusing the
 *                             face (parent) of the last. Fuller's DNA shape.
 *   13 · vector-equilibrium — a subagent is a packaged worker dispatched from
 *                             center, returning with a summary. Same VE as Skills:
 *                             capability held in equilibrium, sent to do work.
 *   14 · dodecahedron       — the wider agentic toolkit beyond Bronze. 12-face
 *                             cosmos again — now the world *outside* this course.
 */
export const moduleGlyph: Record<string, ModuleGlyph> = {
  '01': { shape: 'tetrahedron',        meaning: 'first principle — the minimum system' },
  '02': { shape: 'hexahedron',         meaning: 'foundation — stable ground to build on' },
  '03': { shape: 'octahedron',         meaning: 'first exchange — you and the agent meeting' },
  '04': { shape: 'icosahedron',        meaning: 'the approval membrane — boundary of control' },
  '05': { shape: 'dodecahedron',       meaning: 'project cosmos — the container of meaning' },
  '06': { shape: 'cuboctahedron',      meaning: 'vector equilibrium — a real task in balance' },
  '07': { shape: 'tetrahelix',         meaning: 'compounding reuse — commands that grow' },
  '08': { shape: 'vector-equilibrium', meaning: 'packaged capability — a toolkit in equilibrium' },
  '09': { shape: 'octahedron',         meaning: 'think / act — plan mode as self-dialogue' },
  '10': { shape: 'hexahedron',         meaning: 'gates and guards — boundary enforcement' },
  '11': { shape: 'icosahedron',        meaning: 'the connector membrane — twelve contact points' },
  '12': { shape: 'tetrahelix',         meaning: 'branching history — commits as DNA' },
  '13': { shape: 'vector-equilibrium', meaning: 'delegated wholeness — a worker dispatched' },
  '14': { shape: 'dodecahedron',       meaning: 'the wider cosmos — what lies beyond Bronze' },
} as const

/**
 * Symbology reference — classical + synergetics + pedagogical use, per shape.
 * Consumed by tooltips, hover cards, and future glossary surfaces.
 * Keep parallel with `.agent/polyhedra-symbology.md` (long-form reference).
 */
export interface ShapeSymbology {
  classical: string
  synergetics: string
  teaches: string
}

export const symbology: Record<PolyhedronShape, ShapeSymbology> = {
  'tetrahedron': {
    classical: 'Fire — the spark, ignition, the active element.',
    synergetics: 'Fuller\'s atomic unit. Volume itself is counted in tetrahedra.',
    teaches: 'Firsts. Atomic, irreducible ideas.',
  },
  'hexahedron': {
    classical: 'Earth — ground, walls, the immovable.',
    synergetics: 'Derived (three tetrahedra in a cube costume); serves as structure and enclosure.',
    teaches: 'Foundation, gates, hard boundaries.',
  },
  'octahedron': {
    classical: 'Air — breath, the medium of exchange, the between.',
    synergetics: 'Two tetrahedra apex-to-apex: the dual/dialogue shape.',
    teaches: 'Duality. Two sides meeting — approve/deny, think/act.',
  },
  'dodecahedron': {
    classical: 'Aether — the shape Plato reserved for arranging the cosmos.',
    synergetics: 'The outer shell of nested polyhedra; holds the whole system.',
    teaches: 'Wholeness, containers, the cosmos of a thing.',
  },
  'icosahedron': {
    classical: 'Water — flow, fluidity, membrane.',
    synergetics: 'Twelve vertices as connection nodes; tensegrity favourite.',
    teaches: 'Membranes with many contact points; networks.',
  },
  'cuboctahedron': {
    classical: 'An Archimedean solid — tetra and octa wearing each other.',
    synergetics: 'The cuboctahedron = Fuller\'s Vector Equilibrium (unlabeled).',
    teaches: 'Balance. A working real-world task with all forces in proportion.',
  },
  'tetrahelix': {
    classical: 'Not Platonic. A helical chain found in DNA and phyllotaxis.',
    synergetics: 'Growth with minimum structural change — each step reuses the last face.',
    teaches: 'Compounding reuse, helical learning, commits as narrative.',
  },
  'vector-equilibrium': {
    classical: 'Not Platonic — Fuller\'s naming for the cuboctahedron with its 12 radii drawn.',
    synergetics: '"The zero-starting-point for happenings or non-happenings" — all forces balance.',
    teaches: 'Packaged wholeness, a capability held ready, dispatched from center.',
  },
}

/**
 * Resolves the glyph for a given module identifier.
 * Accepts either a 2-digit string ('01') or a full slug ('01-mental-model').
 *
 * @example
 * const { shape, meaning } = useModuleGlyph('01-mental-model')
 * // → { shape: 'tetrahedron', meaning: 'first principle — the minimum system' }
 */
export function useModuleGlyph(moduleOrSlug: string): ModuleGlyph {
  // Extract leading digits from slug like '01-mental-model' → '01'
  const key = moduleOrSlug.match(/^(\d{2})/)?.[1] ?? moduleOrSlug
  return moduleGlyph[key] ?? { shape: 'tetrahedron', meaning: 'first principle' }
}

/**
 * Resolves the symbology (classical + synergetics + pedagogical) for a shape.
 * Useful for tooltips and the glossary view.
 *
 * @example
 * const { classical, synergetics, teaches } = useGlyphSymbology('tetrahedron')
 */
export function useGlyphSymbology(shape: PolyhedronShape): ShapeSymbology {
  return symbology[shape]
}
