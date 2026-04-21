<!--
  CopyButton — shared primitive for copy-to-clipboard UX (v4.3, §D-2026-04-21-copy-visible).

  Usage:
    <div class="relative copy-host">
      <pre><code>...</code></pre>
      <CopyButton :text="snippet" />
    </div>

  Always-visible convention (updated 2026-04-21 user-feedback pass):
    - Button is always visible at opacity 1 on BOTH mobile and desktop.
    - Subtle by default (muted-foreground on card bg); brightens to
      `--primary-edge` on hover / focus / copied state.
    - Rationale: the prior hover-gated desktop variant was invisible to
      users who didn't think to hover — discoverability beats minimalism
      for a pedagogical surface where "paste this" is the whole point.

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

    <span class="copy-label" aria-hidden="true">{{ copied ? "Copied" : "Copy" }}</span>
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
  gap: 5px;
  padding: 4px 8px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  opacity: 1; /* always visible — discoverability over hover */
  transition:
    color 120ms ease,
    background-color 120ms ease,
    border-color 120ms ease;
  z-index: 2;
}

.copy-label {
  font-family: "DM Sans", "Inter", system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  color: inherit;
}

.copy-btn:hover {
  color: hsl(var(--primary-edge));
  background: hsl(var(--muted));
  border-color: hsl(var(--primary-edge) / 0.55);
}

.copy-btn:focus-visible {
  outline: none;
  color: hsl(var(--primary-edge));
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

.copy-btn[data-copied="true"] {
  color: hsl(var(--primary-edge));
  border-color: hsl(var(--primary-edge) / 0.6);
  background: hsl(var(--primary-edge) / 0.08);
}

.copy-ico {
  display: block;
  flex-shrink: 0;
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

@media (prefers-reduced-motion: reduce) {
  .copy-btn {
    transition: none;
  }
}
</style>
