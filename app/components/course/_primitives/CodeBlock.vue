<!--
  CodeBlock — chrome wrapper for every copyable code surface (v4.3).

  Replaces the raw `<pre><code>` path in the markdown renderer so every
  fenced block gets:
    · a thin 14px-ish top bar with the lang label
    · palette-driven background (--terminal-bg) so dark mode goes dark,
      light mode stays warm-cream
    · an always-visible CopyButton
    · themed syntax highlighting via Shiki (dual-theme: github-light +
      github-dark-dimmed, switched by body.dark class). Highlighting is
      dynamic-imported post-mount so SSR + static prerender ship a plain
      escaped fallback and Shiki hydrates in on the client. Result: no
      build-time slowdown, static HTML is readable even without JS, and
      the bundle payload is deferred to route chunks that actually need it.

  Also used for inline JSON / bash / text surfaces embedded inside hero
  or diagram components when the content is a verbatim-copyable artifact
  (e.g. the M10 hooks settings.json block).

  Props:
    - code (required): the raw text to render + copy
    - lang (optional): language label shown in the top bar. If it matches
                       a Shiki-supported alias (bash / json / markdown /
                       powershell / ts / yaml / …), the block is syntax-
                       highlighted. Unknown langs fall through to plain.
-->
<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import CopyButton from "@/components/course/_primitives/CopyButton.vue"

const props = withDefaults(
  defineProps<{
    code: string
    lang?: string
  }>(),
  {
    lang: "",
  },
)

// Highlighted HTML produced by Shiki. Empty string = fall back to the
// plain `<pre><code>` path rendered in the template. Set post-mount only,
// so SSR output is deterministic (plain escaped text) and hydration is
// seamless. The block is readable without JS.
const highlightedHtml = ref<string>("")

async function hydrate() {
  if (!props.lang) return
  try {
    // Dynamic import — Shiki stays out of any route chunk that doesn't
    // actually mount a CodeBlock.
    const { highlight } = await import("@/utils/highlighter")
    highlightedHtml.value = await highlight(props.code, props.lang)
  } catch {
    // Silent fallback — plain `<pre>` already in the DOM.
  }
}

onMounted(hydrate)
watch(
  () => [props.code, props.lang],
  () => {
    highlightedHtml.value = ""
    hydrate()
  },
)
</script>

<template>
  <div class="code-block copy-host">
    <div v-if="lang" class="code-block-chrome">
      <span class="code-block-lang">{{ lang }}</span>
    </div>
    <!-- Highlighted path (post-mount): Shiki renders its own <pre><code>.
         We tag the wrapper so the scoped + main.css rules can style tokens. -->
    <div
      v-if="highlightedHtml"
      class="code-block-shiki"
      :class="{ 'code-block-shiki--no-chrome': !lang }"
      v-html="highlightedHtml"
    />
    <!-- Plain fallback (SSR / no lang / hydration in flight). -->
    <pre
      v-else
      class="code-block-pre"
      :class="{ 'code-block-pre--no-chrome': !lang }"
    ><code>{{ code }}</code></pre>
    <CopyButton :text="code" :label="`Copy ${lang || 'code'}`" />
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  margin: 20px 0;
  border-radius: var(--radius-lg);
  border: 1px solid hsl(var(--border));
  background: hsl(var(--terminal-bg));
  overflow: hidden;
  box-shadow: 0 1px 2px hsl(var(--foreground) / 0.05);
}
:global(body.dark) .code-block {
  box-shadow: 0 0 0 1px hsl(var(--border)), 0 6px 20px rgba(0, 0, 0, 0.35);
}

.code-block-chrome {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  background: hsl(var(--foreground) / 0.04);
  border-bottom: 1px solid hsl(var(--border));
}
:global(body.dark) .code-block-chrome {
  background: hsl(var(--foreground) / 0.06);
}

.code-block-lang {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.code-block-pre {
  margin: 0;
  padding: 14px 16px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.6;
  color: hsl(var(--terminal-fg));
  background: transparent;
  overflow-x: auto;
  white-space: pre;
  -webkit-font-smoothing: antialiased;
}
.code-block-pre--no-chrome {
  padding-right: 60px; /* room for the always-visible copy button */
}

.code-block-pre code {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: transparent !important;
  padding: 0 !important;
}

/* Shiki-rendered path. Shiki emits its own <pre class="shiki …"><code>
   with inline `color:` (light) + `--shiki-dark` (dark) styles per token.
   We nudge typography + padding to match the plain path and use the
   custom-property switch to pick the right token color per theme. */
.code-block-shiki {
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.code-block-shiki :deep(pre.shiki) {
  margin: 0;
  padding: 14px 16px;
  background: transparent !important;
  overflow-x: auto;
  white-space: pre;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.code-block-shiki--no-chrome :deep(pre.shiki) {
  padding-right: 60px;
}
.code-block-shiki :deep(pre.shiki code) {
  background: transparent !important;
  padding: 0 !important;
  font-family: inherit;
  font-size: inherit;
}

/* Dual-theme switch — Shiki's defaultColor:false mode emits tokens like:
     <span style="color:#24292e;--shiki-dark:#adbac7">...
   Light mode uses the inline `color:` (default). Dark mode swaps in the
   `--shiki-dark` custom property. */
:global(body.dark) .code-block-shiki :deep(pre.shiki),
:global(body.dark) .code-block-shiki :deep(pre.shiki span) {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg, transparent) !important;
}

@media (max-width: 640px) {
  .code-block-pre,
  .code-block-shiki {
    font-size: 11.5px;
  }
  .code-block-pre {
    padding: 12px 14px;
  }
  .code-block-shiki :deep(pre.shiki) {
    padding: 12px 14px;
  }
}
</style>
