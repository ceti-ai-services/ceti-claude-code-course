<!--
  CopyButton — shared primitive for copy-to-clipboard UX (v4.2, §D-2026-04-21-copy).

  Usage:
    <div class="relative copy-host">
      <pre><code>...</code></pre>
      <CopyButton :text="snippet" />
    </div>

  Hover-visibility convention:
    - On mobile / narrow viewports (<640px) the button is ALWAYS visible.
    - On desktop (>=640px) the button is opacity: 0 by default and fades
      to opacity: 1 when the parent element matching `.copy-host` is hovered
      OR when the button itself has keyboard focus (so keyboard users can
      still see it).
    - Consumers are expected to add the `copy-host` class (and
      `position: relative`) to the container that wraps the copyable
      surface. The button itself is absolutely positioned top-right.

  Keyboard / a11y:
    - Native <button> element — focus ring via `hsl(var(--ring))`.
    - aria-live="polite" announcement toggles to "Copied" for ~1200ms.
    - prefers-reduced-motion is respected: no transform, minimal transition.

  Props:
    - text (required):    the string to copy
    - label (optional):   aria-label override (default: "Copy")
    - class (optional):   additional class merge hook
-->
<script setup lang="ts">
import { ref } from "vue"

const props = withDefaults(
  defineProps<{
    text: string
    label?: string
    class?: string
  }>(),
  {
    label: "Copy",
  },
)

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
      resetTimer = null
    }, 1200)
  } catch {
    // Clipboard API can fail in non-secure contexts (e.g. http://) or if
    // permission is denied. Swallow silently — the button simply won't
    // flash a checkmark. Consumer can still hand-select + copy.
  }
}
</script>

<template>
  <button
    type="button"
    class="copy-btn"
    :class="$props.class"
    :aria-label="copied ? 'Copied' : label"
    :data-copied="copied ? 'true' : 'false'"
    @click="handleCopy"
  >
    <!-- Icon: clipboard (default) / check (copied) -->
    <svg
      v-if="!copied"
      class="copy-ico"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
    <svg
      v-else
      class="copy-ico"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>

    <span class="sr-only" aria-live="polite">
      {{ copied ? "Copied" : "" }}
    </span>
  </button>
</template>

<style scoped>
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 6px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--muted) / 0.9);
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  opacity: 1; /* always visible on mobile */
  transition: opacity 90ms ease, color 120ms ease, background-color 120ms ease, border-color 120ms ease;
  z-index: 2;
}

.copy-btn:hover {
  color: hsl(var(--foreground));
  background: hsl(var(--muted));
  border-color: hsl(var(--primary-edge) / 0.45);
}

.copy-btn:focus-visible {
  outline: none;
  color: hsl(var(--foreground));
  box-shadow: 0 0 0 2px hsl(var(--ring));
  opacity: 1;
}

.copy-btn[data-copied="true"] {
  color: hsl(var(--primary-edge));
  border-color: hsl(var(--primary-edge) / 0.6);
}

.copy-ico {
  display: block;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Desktop: hover-visible. Consumer parent must have `.copy-host` class. */
@media (min-width: 640px) {
  .copy-btn {
    opacity: 0;
  }
  :global(.copy-host:hover) .copy-btn,
  :global(.copy-host:focus-within) .copy-btn,
  .copy-btn:focus-visible {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .copy-btn {
    transition: opacity 90ms ease;
  }
}
</style>
