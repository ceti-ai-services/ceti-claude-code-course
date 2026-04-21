<script setup lang="ts">
/**
 * Polyhedron — Buckminster-Fuller-inspired synergetic geometry icons.
 * All shapes are hand-authored SVGs: 2D dimetric/isometric projections
 * of 3D forms. No WebGL, no 3D libraries. stroke="currentColor" for
 * full palette/theme awareness.
 *
 * Shapes + meanings (per Fuller's Synergetics):
 *   tetrahedron        — 4 faces  — foundation, minimum structure
 *   hexahedron         — 6 faces  — stability, the cube
 *   octahedron         — 8 faces  — equilibrium, dual symmetry
 *   dodecahedron       — 12 faces — cosmos, 12-fold completeness
 *   icosahedron        — 20 faces — fluidity, water, maximum roundness
 *   cuboctahedron      — 14 faces — vector equilibrium (Fuller's zero-point)
 *   tetrahelix         — spiral   — growth, helical learning path
 *   vector-equilibrium — same as cuboctahedron, with a pulsing ring on animate
 */

const props = withDefaults(
  defineProps<{
    shape:
      | 'tetrahedron'
      | 'hexahedron'
      | 'octahedron'
      | 'dodecahedron'
      | 'icosahedron'
      | 'cuboctahedron'
      | 'tetrahelix'
      | 'vector-equilibrium'
    size?: number
    animate?: boolean
    ariaLabel?: string
    /**
     * Optional short sentence describing what this shape means in context.
     * Rendered as the browser-native tooltip (`title` attr on the SVG).
     * Intended source: `useModuleGlyph(slug).meaning`.
     */
    meaning?: string
  }>(),
  { size: 32, animate: false },
)
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
    :aria-label="props.ariaLabel ?? props.shape"
    role="img"
    :class="['polyhedron', props.animate && 'polyhedron--animate']"
  >
    <title v-if="props.meaning">{{ props.meaning }}</title>
    <!-- ── TETRAHEDRON ──────────────────────────────────────────────────────
         Dimetric projection: apex above, equilateral base below.
         3 visible faces rendered as: front-left, front-right, and top cap.
         Hidden back edge shown dashed.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-if="props.shape === 'tetrahedron'">
      <!-- Base triangle, perspective-foreshortened horizontally -->
      <polygon points="24,40 8,30 40,30" />
      <!-- Apex -->
      <line x1="24" y1="8" x2="8" y2="30" />
      <line x1="24" y1="8" x2="40" y2="30" />
      <line x1="24" y1="8" x2="24" y2="40" stroke-dasharray="3 3" stroke-width="1" opacity="0.5" />
      <!-- Base center spine (hidden, dashed) -->
      <line x1="24" y1="40" x2="24" y2="30" stroke-dasharray="2 3" stroke-width="1" opacity="0.4" />
      <!-- Base midpoint to apex center reference -->
      <line x1="8" y1="30" x2="40" y2="30" />
    </g>

    <!-- ── HEXAHEDRON (CUBE) ───────────────────────────────────────────────
         Classic isometric cube: top face, left face, right face.
         Hidden back edges dashed at lower opacity.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'hexahedron'">
      <!-- Top face -->
      <polygon points="24,6 40,15 24,24 8,15" />
      <!-- Left face -->
      <polygon points="8,15 24,24 24,40 8,31" />
      <!-- Right face -->
      <polygon points="40,15 24,24 24,40 40,31" />
      <!-- Back edges (hidden) -->
      <line x1="8" y1="31" x2="8" y2="15" stroke-dasharray="2 3" stroke-width="1" opacity="0.35" />
      <line x1="40" y1="31" x2="40" y2="15" stroke-dasharray="2 3" stroke-width="1" opacity="0.35" />
      <line x1="8" y1="31" x2="24" y2="40" stroke-dasharray="2 3" stroke-width="1" opacity="0.35" />
    </g>

    <!-- ── OCTAHEDRON ──────────────────────────────────────────────────────
         Dimetric octahedron: equatorial diamond silhouette, top and bottom
         apex. Four visible faces shown as triangles. Four back faces dashed.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'octahedron'">
      <!-- Equatorial band (4 vertices in a squashed diamond) -->
      <!-- front-left: top-apex → left-eq → front-eq -->
      <polygon points="24,7 8,24 24,31" />
      <!-- front-right: top-apex → front-eq → right-eq -->
      <polygon points="24,7 24,31 40,24" />
      <!-- bottom-left: bottom-apex → left-eq → front-eq -->
      <polygon points="24,41 8,24 24,31" stroke-dasharray="none" opacity="0.75" />
      <!-- bottom-right: bottom-apex → front-eq → right-eq -->
      <polygon points="24,41 24,31 40,24" opacity="0.75" />
      <!-- Hidden back faces (top & bottom via dashes) -->
      <line x1="24" y1="7" x2="8" y2="24" />
      <line x1="24" y1="7" x2="40" y2="24" />
      <line x1="8" y1="24" x2="40" y2="24" stroke-dasharray="3 3" stroke-width="1" opacity="0.4" />
      <line x1="24" y1="41" x2="8" y2="24" stroke-dasharray="3 3" stroke-width="1" opacity="0.4" />
      <line x1="24" y1="41" x2="40" y2="24" stroke-dasharray="3 3" stroke-width="1" opacity="0.4" />
    </g>

    <!-- ── DODECAHEDRON ───────────────────────────────────────────────────
         12 pentagonal faces. 2D projection: front pentagonal cap, ring of
         5 pentagons around equator, and base cap. Simplified as a layered
         pentagonic outline with inner detail ring.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'dodecahedron'">
      <!-- Outer silhouette circle approximation via 10-gon -->
      <polygon points="24,5 34,8 41,17 41,29 34,38 24,41 14,38 7,29 7,17 14,8" />
      <!-- Front pentagonal cap -->
      <polygon points="24,10 31,13 33,21 24,26 15,21 17,13" />
      <!-- 5 equatorial edges to outer ring -->
      <line x1="24" y1="10" x2="24" y2="5" />
      <line x1="31" y1="13" x2="34" y2="8" />
      <line x1="33" y1="21" x2="41" y2="17" />
      <line x1="15" y1="21" x2="7" y2="17" />
      <line x1="17" y1="13" x2="14" y2="8" />
      <!-- Lower equatorial vertices -->
      <line x1="24" y1="26" x2="24" y2="41" />
      <line x1="33" y1="21" x2="41" y2="29" />
      <line x1="15" y1="21" x2="7" y2="29" />
      <!-- Cross-linking lower edges -->
      <line x1="41" y1="29" x2="34" y2="38" stroke-dasharray="3 2" opacity="0.5" />
      <line x1="7" y1="29" x2="14" y2="38" stroke-dasharray="3 2" opacity="0.5" />
      <line x1="34" y1="38" x2="24" y2="41" stroke-dasharray="3 2" opacity="0.5" />
      <line x1="14" y1="38" x2="24" y2="41" stroke-dasharray="3 2" opacity="0.5" />
    </g>

    <!-- ── ICOSAHEDRON ────────────────────────────────────────────────────
         20 triangular faces. Projection: apex at top, 5 upper triangles,
         5 lower triangles inverted, bottom apex. Visible front half solid,
         back half dashed. Uses exact vertex angles: 72° around each band.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'icosahedron'">
      <!-- Top apex to upper ring (5 edges, foreshortened to ~4 visible) -->
      <line x1="24" y1="6" x2="14" y2="18" />
      <line x1="24" y1="6" x2="24" y2="16" />
      <line x1="24" y1="6" x2="34" y2="18" />
      <line x1="24" y1="6" x2="38" y2="22" stroke-dasharray="2 3" opacity="0.45" />
      <line x1="24" y1="6" x2="10" y2="22" stroke-dasharray="2 3" opacity="0.45" />
      <!-- Upper ring (5 vertices) -->
      <polygon points="10,22 14,18 24,16 34,18 38,22 30,26 24,28 18,26" opacity="0.85" />
      <!-- Mid equatorial ring (5 vertices, shifted) -->
      <polygon points="10,28 18,26 24,28 30,26 38,28 34,34 24,36 14,34" opacity="0.75" />
      <!-- Lower ring to bottom apex -->
      <line x1="14" y1="34" x2="24" y2="42" />
      <line x1="24" y1="36" x2="24" y2="42" />
      <line x1="34" y1="34" x2="24" y2="42" />
      <line x1="38" y1="28" x2="24" y2="42" stroke-dasharray="2 3" opacity="0.45" />
      <line x1="10" y1="28" x2="24" y2="42" stroke-dasharray="2 3" opacity="0.45" />
      <!-- Equatorial cross-triangle edges -->
      <line x1="10" y1="22" x2="10" y2="28" />
      <line x1="38" y1="22" x2="38" y2="28" />
    </g>

    <!-- ── CUBOCTAHEDRON ──────────────────────────────────────────────────
         Fuller's vector equilibrium: 14 faces (8 triangular + 6 square).
         Projection: top square face horizontal, 4 triangles up, 4 square
         side faces, 4 triangles down, bottom square.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'cuboctahedron'">
      <!-- Top square (foreshortened into a rhombus) -->
      <polygon points="24,8 35,14 24,20 13,14" />
      <!-- Four upper triangles -->
      <line x1="24" y1="8" x2="24" y2="2" />
      <line x1="35" y1="14" x2="42" y2="10" />
      <line x1="13" y1="14" x2="6" y2="10" />
      <polygon points="24,2 42,10 35,14 24,8 13,14 6,10" />
      <!-- Four side square faces -->
      <line x1="42" y1="10" x2="42" y2="28" />
      <line x1="6" y1="10" x2="6" y2="28" />
      <line x1="42" y1="28" x2="35" y2="34" />
      <line x1="6" y1="28" x2="13" y2="34" />
      <!-- Equatorial ring -->
      <polygon points="42,10 42,28 35,34 24,28 13,34 6,28 6,10 13,14 24,20 35,14" />
      <!-- Bottom rhombus -->
      <polygon points="24,28 35,34 24,40 13,34" />
      <!-- Bottom apex -->
      <line x1="35" y1="34" x2="42" y2="28" stroke-dasharray="2 3" opacity="0.45" />
      <line x1="13" y1="34" x2="6" y2="28" stroke-dasharray="2 3" opacity="0.45" />
      <line x1="24" y1="40" x2="24" y2="46" stroke-dasharray="2 3" opacity="0.45" />
    </g>

    <!-- ── TETRAHELIX ─────────────────────────────────────────────────────
         Fuller's tetrahelix: a helical chain of tetrahedra sharing faces,
         forming a spiral tower. Drawn as a ascending zigzag with triangular
         cross-sections at each node — 5 nodes total.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'tetrahelix'">
      <!-- Central helical spine (S-curve) -->
      <polyline points="20,42 28,34 18,26 30,18 22,10" stroke-width="1.5" />
      <!-- Tetrahedron cross-sections at each node — alternating left/right -->
      <!-- Node 5 (top): apex + base triangle -->
      <polygon points="22,10 14,14 30,14" stroke-width="1.2" />
      <line x1="22" y1="10" x2="24" y2="6" stroke-width="1.2" />
      <!-- Node 4 -->
      <polygon points="30,18 22,22 38,22" stroke-width="1.2" opacity="0.85" />
      <!-- Node 3 -->
      <polygon points="18,26 10,30 26,30" stroke-width="1.2" opacity="0.8" />
      <!-- Node 2 -->
      <polygon points="28,34 20,38 36,38" stroke-width="1.2" opacity="0.7" />
      <!-- Node 1 (bottom) -->
      <line x1="20" y1="42" x2="24" y2="46" stroke-width="1.2" opacity="0.6" />
      <!-- Growth arrows implied by taper — terminal dot -->
      <circle cx="24" cy="5" r="1.5" fill="currentColor" stroke="none" />
    </g>

    <!-- ── VECTOR EQUILIBRIUM ─────────────────────────────────────────────
         Same geometry as cuboctahedron but with an outer reference sphere
         (12 equal radii from center = Fuller's zero-point energy structure).
         When animate=true a pulsing ring surrounds the form.
    ─────────────────────────────────────────────────────────────────────── -->
    <g v-else-if="props.shape === 'vector-equilibrium'">
      <!-- Outer reference circle (the sphere) -->
      <circle cx="24" cy="24" r="20" stroke-width="1" stroke-dasharray="2 3" opacity="0.35" />
      <!-- Animate ring (only when animate prop is true) -->
      <circle
        v-if="props.animate"
        cx="24"
        cy="24"
        r="21"
        stroke-width="0.75"
        opacity="0.4"
        class="ve-pulse"
      />
      <!-- Cuboctahedron interior: top rhombus -->
      <polygon points="24,8 35,14 24,20 13,14" />
      <!-- 4 upper triangles to equatorial vertices -->
      <polygon points="24,4 35,14 13,14" stroke-width="1.2" opacity="0.8" />
      <polygon points="24,4 35,14 42,20" stroke-width="1.2" opacity="0.7" stroke-dasharray="2 3" />
      <polygon points="24,4 13,14 6,20" stroke-width="1.2" opacity="0.7" stroke-dasharray="2 3" />
      <!-- Side square faces -->
      <polygon points="42,20 35,14 35,30 42,36" stroke-width="1.2" opacity="0.75" />
      <polygon points="6,20 13,14 13,30 6,36" stroke-width="1.2" opacity="0.75" />
      <!-- Equatorial band -->
      <polygon points="42,20 6,20 6,36 13,30 24,34 35,30 42,36" opacity="0.6" stroke-dasharray="2 2" />
      <!-- Bottom rhombus -->
      <polygon points="24,34 35,30 24,40 13,30" />
      <!-- 12 vector radii from center -->
      <line x1="24" y1="24" x2="24" y2="8" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="35" y2="14" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="13" y2="14" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="42" y2="20" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="6" y2="20" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="42" y2="36" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="6" y2="36" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="35" y2="30" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="13" y2="30" stroke-width="0.75" opacity="0.3" />
      <line x1="24" y1="24" x2="24" y2="40" stroke-width="0.75" opacity="0.3" />
      <!-- Center dot — the zero-point -->
      <circle cx="24" cy="24" r="1.5" fill="currentColor" stroke="none" />
    </g>
  </svg>
</template>

<style scoped>
.polyhedron {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Hover/focus rotate — disabled under prefers-reduced-motion */
@media (prefers-reduced-motion: no-preference) {
  .polyhedron--animate {
    transition: transform 400ms var(--ease-out-spring, cubic-bezier(0.22, 1, 0.36, 1));
    will-change: transform;
  }

  .polyhedron--animate:hover,
  .polyhedron--animate:focus-within {
    transform: rotate(8deg) scale(1.08);
  }

  /* Stroke draw-in on mount */
  .polyhedron--animate g {
    stroke-dashoffset: 0;
    animation: poly-draw 600ms var(--ease-out-spring, cubic-bezier(0.22, 1, 0.36, 1)) both;
  }

  @keyframes poly-draw {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* Vector equilibrium pulse ring */
  .ve-pulse {
    animation: ve-ring 2.4s ease-in-out infinite;
    transform-origin: 24px 24px;
  }

  @keyframes ve-ring {
    0%, 100% { r: 21; opacity: 0.4; }
    50%       { r: 23; opacity: 0.12; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .polyhedron--animate,
  .polyhedron--animate:hover,
  .polyhedron--animate:focus-within {
    transition: none;
    transform: none;
    animation: none;
  }

  .ve-pulse {
    animation: none;
  }
}
</style>
