<!--
  PaletteToggle — compact palette + mode switcher for the nav.

  Two controls:
    1. Palette dot row — 4 swatches, WAI-ARIA toolbar semantics (arrow-key
       nav between dots, each dot is a toggle-button with aria-pressed).
    2. Mode toggle — sun/moon icon button.

  Note on a11y: we use `role="toolbar"` + `aria-pressed` instead of the
  radiogroup pattern because a radiogroup's "pressing one deselects the
  others automatically" is implicit — toolbar matches the visual "four
  persistent toggle buttons" affordance better.
-->
<script setup lang="ts">
import { PALETTES, PALETTE_META, usePalette, type Palette } from "@/composables/usePalette"
import { Sun, Moon } from "lucide-vue-next"

const { palette, mode, setPalette, toggleMode } = usePalette()

const dotRefs = ref<HTMLElement[]>([])

// Vue's template ref callback on a v-for can pass Element | ComponentPublicInstance | null.
function setDotRef(el: unknown, i: number) {
  if (el instanceof HTMLElement) dotRefs.value[i] = el
}

function onKeydown(e: KeyboardEvent, i: number) {
  const n = PALETTES.length
  let target: number | null = null
  if (e.key === "ArrowRight" || e.key === "ArrowDown") target = (i + 1) % n
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") target = (i - 1 + n) % n
  else if (e.key === "Home") target = 0
  else if (e.key === "End") target = n - 1
  if (target !== null) {
    e.preventDefault()
    const p = PALETTES[target]
    if (p) {
      setPalette(p)
      dotRefs.value[target]?.focus()
    }
  }
}

function swatchClass(p: Palette) {
  return `pt-dot pt-dot--${p}`
}
</script>

<template>
  <div class="pt-wrap" role="toolbar" aria-label="Theme controls">
    <!-- Palette selector: 4 swatches, arrow-key nav -->
    <div class="pt-palettes" role="group" aria-label="Color palette">
      <button
        v-for="(p, i) in PALETTES"
        :key="p"
        :ref="el => setDotRef(el, i)"
        type="button"
        :class="[swatchClass(p), palette === p && 'pt-dot--active']"
        :aria-label="`${PALETTE_META[p].label} palette`"
        :aria-pressed="palette === p"
        :tabindex="palette === p ? 0 : -1"
        @click="setPalette(p)"
        @keydown="onKeydown($event, i)"
      >
        <span class="pt-dot-ring" aria-hidden="true" />
      </button>
    </div>

    <!-- Mode toggle -->
    <button
      type="button"
      class="pt-mode"
      :aria-label="mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-pressed="mode === 'dark'"
      @click="toggleMode"
    >
      <Sun v-if="mode === 'dark'" :size="15" />
      <Moon v-else :size="15" />
    </button>
  </div>
</template>

<style scoped>
.pt-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px 4px 6px;
  background: hsl(var(--card) / 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--border));
  border-radius: 999px;
}

.pt-palettes {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.pt-dot {
  all: unset;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s var(--ease-out-spring);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pt-dot:hover { transform: scale(1.12); }
.pt-dot:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

/* Each dot previews its palette's signature accent. HSL values are
   hardcoded here by necessity — we cannot read OTHER palettes' tokens
   from the currently-active palette's scope. These are the palette
   "brand" values from BRAND_BOOK.md, not decorative choices. */
.pt-dot--boardwalk  { background: linear-gradient(135deg, hsl(265 45% 78%) 0%, hsl(10 62% 76%) 100%); }
.pt-dot--coastal    { background: linear-gradient(135deg, hsl(166 36% 72%) 0%, hsl(14 55% 82%) 100%); }
.pt-dot--greenhouse { background: linear-gradient(135deg, hsl(80 26% 52%) 0%, hsl(14 42% 59%) 100%); }
.pt-dot--neosage    { background: linear-gradient(135deg, hsl(265 32% 65%) 0%, hsl(68 54% 54%) 100%); }

.pt-dot-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  transition: border-color 0.2s var(--ease-out-spring);
}
.pt-dot--active .pt-dot-ring {
  border-color: hsl(var(--foreground));
}

.pt-mode {
  all: unset;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--foreground));
  transition: background-color 0.2s var(--ease-out-spring), transform 0.2s var(--ease-out-spring);
}
.pt-mode:hover {
  background: hsl(var(--muted));
  transform: rotate(-8deg);
}
.pt-mode:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

@media (prefers-reduced-motion: reduce) {
  .pt-dot, .pt-mode { transition: none; }
  .pt-dot:hover, .pt-mode:hover { transform: none; }
}
</style>
