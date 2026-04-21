/**
 * CourseDiagram registry.
 *
 * Every mid-lesson diagram is registered here by its `id` ("m<NN>-d<1..4>").
 * The tokenizer in `app/pages/start/[slug].vue` sees `<CourseDiagram id="..." />`
 * in module markdown and looks up the corresponding component here.
 *
 * Contract: each diagram is a single Vue SFC at
 *   `app/components/course/diagrams/<id>.vue`
 * and is a thin wrapper that:
 *   - imports one pattern from `app/components/course/patterns/`
 *   - imports `useCustomizer()` for EN/ES copy switching
 *   - defines `en` + `es` dicts and binds them via `:title`, `:caption`, etc.
 *
 * Static imports so the component ships with SSR and dev HMR works.
 *
 * Extending this registry:
 *   1. Create `<id>.vue` under `diagrams/`
 *   2. Add `import X from "./X.vue"` + entry in `REGISTRY`
 *   3. Embed `<CourseDiagram id="<id>" />` in the module's markdown
 */

import type { Component } from "vue"

// ─── Module 01 ───────────────────────────────────────────
import M01D1 from "./m01-d1.vue"
import M01D2 from "./m01-d2.vue"
import M01D3 from "./m01-d3.vue"
import M01D4 from "./m01-d4.vue"

// ─── Module 02 ───────────────────────────────────────────
import M02D1 from "./m02-d1.vue"
import M02D2 from "./m02-d2.vue"
import M02D3 from "./m02-d3.vue"
import M02D4 from "./m02-d4.vue"

// ─── Module 03 ───────────────────────────────────────────
import M03D1 from "./m03-d1.vue"
import M03D2 from "./m03-d2.vue"
import M03D3 from "./m03-d3.vue"
import M03D4 from "./m03-d4.vue"

// ─── Module 04 ───────────────────────────────────────────
import M04D1 from "./m04-d1.vue"
import M04D2 from "./m04-d2.vue"
import M04D3 from "./m04-d3.vue"
import M04D4 from "./m04-d4.vue"

// ─── Module 05 ───────────────────────────────────────────
import M05D1 from "./m05-d1.vue"
import M05D2 from "./m05-d2.vue"
import M05D3 from "./m05-d3.vue"
import M05D4 from "./m05-d4.vue"

// ─── Module 06 ───────────────────────────────────────────
import M06D1 from "./m06-d1.vue"
import M06D2 from "./m06-d2.vue"
import M06D3 from "./m06-d3.vue"
import M06D4 from "./m06-d4.vue"

// ─── Module 07 ───────────────────────────────────────────
import M07D1 from "./m07-d1.vue"
import M07D2 from "./m07-d2.vue"
import M07D3 from "./m07-d3.vue"
import M07D4 from "./m07-d4.vue"

// ─── Module 08 ───────────────────────────────────────────
import M08D1 from "./m08-d1.vue"
import M08D2 from "./m08-d2.vue"
import M08D3 from "./m08-d3.vue"
import M08D4 from "./m08-d4.vue"

// ─── Module 09 ───────────────────────────────────────────
import M09D1 from "./m09-d1.vue"
import M09D2 from "./m09-d2.vue"
import M09D3 from "./m09-d3.vue"
import M09D4 from "./m09-d4.vue"

// ─── Module 10 ───────────────────────────────────────────
import M10D1 from "./m10-d1.vue"
import M10D2 from "./m10-d2.vue"
import M10D3 from "./m10-d3.vue"
import M10D4 from "./m10-d4.vue"

// ─── Module 11 ───────────────────────────────────────────
import M11D1 from "./m11-d1.vue"
import M11D2 from "./m11-d2.vue"
import M11D3 from "./m11-d3.vue"
import M11D4 from "./m11-d4.vue"

// ─── Module 12 ───────────────────────────────────────────
import M12D1 from "./m12-d1.vue"
import M12D2 from "./m12-d2.vue"
import M12D3 from "./m12-d3.vue"
import M12D4 from "./m12-d4.vue"

// ─── Module 13 ───────────────────────────────────────────
import M13D1 from "./m13-d1.vue"
import M13D2 from "./m13-d2.vue"
import M13D3 from "./m13-d3.vue"
import M13D4 from "./m13-d4.vue"

// ─── Module 14 ───────────────────────────────────────────
import M14D1 from "./m14-d1.vue"
import M14D2 from "./m14-d2.vue"
import M14D3 from "./m14-d3.vue"
import M14D4 from "./m14-d4.vue"

export const DIAGRAM_REGISTRY: Record<string, Component> = {
  "m01-d1": M01D1, "m01-d2": M01D2, "m01-d3": M01D3, "m01-d4": M01D4,
  "m02-d1": M02D1, "m02-d2": M02D2, "m02-d3": M02D3, "m02-d4": M02D4,
  "m03-d1": M03D1, "m03-d2": M03D2, "m03-d3": M03D3, "m03-d4": M03D4,
  "m04-d1": M04D1, "m04-d2": M04D2, "m04-d3": M04D3, "m04-d4": M04D4,
  "m05-d1": M05D1, "m05-d2": M05D2, "m05-d3": M05D3, "m05-d4": M05D4,
  "m06-d1": M06D1, "m06-d2": M06D2, "m06-d3": M06D3, "m06-d4": M06D4,
  "m07-d1": M07D1, "m07-d2": M07D2, "m07-d3": M07D3, "m07-d4": M07D4,
  "m08-d1": M08D1, "m08-d2": M08D2, "m08-d3": M08D3, "m08-d4": M08D4,
  "m09-d1": M09D1, "m09-d2": M09D2, "m09-d3": M09D3, "m09-d4": M09D4,
  "m10-d1": M10D1, "m10-d2": M10D2, "m10-d3": M10D3, "m10-d4": M10D4,
  "m11-d1": M11D1, "m11-d2": M11D2, "m11-d3": M11D3, "m11-d4": M11D4,
  "m12-d1": M12D1, "m12-d2": M12D2, "m12-d3": M12D3, "m12-d4": M12D4,
  "m13-d1": M13D1, "m13-d2": M13D2, "m13-d3": M13D3, "m13-d4": M13D4,
  "m14-d1": M14D1, "m14-d2": M14D2, "m14-d3": M14D3, "m14-d4": M14D4,
}

export function getDiagram(id: string): Component | undefined {
  return DIAGRAM_REGISTRY[id]
}
