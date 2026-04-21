<!--
  CodeBlock — chrome wrapper for every copyable code surface (v4.2).

  Replaces the raw `<pre><code>` path in the markdown renderer so every
  fenced block gets:
    · a thin 14px-ish top bar with the lang label
    · palette-driven background (--terminal-bg) so dark mode goes dark,
      light mode stays warm-cream
    · an always-on CopyButton (per §copy-decision) — hover-revealed on
      desktop via `.copy-host`, always visible on mobile

  Also used for inline JSON / bash / text surfaces embedded inside hero
  or diagram components when the content is a verbatim-copyable artifact
  (e.g. the M10 hooks settings.json block).

  Props:
    - code (required): the raw text to render + copy
    - lang (optional): language label shown in the top bar (e.g. "json").
                       Purely decorative — no syntax highlighting.
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    code: string
    lang?: string
  }>(),
  {
    lang: "",
  },
)

import CopyButton from "@/components/course/_primitives/CopyButton.vue"
</script>

<template>
  <div class="code-block copy-host">
    <div v-if="lang" class="code-block-chrome">
      <span class="code-block-lang">{{ lang }}</span>
    </div>
    <pre class="code-block-pre" :class="{ 'code-block-pre--no-chrome': !lang }"><code>{{ code }}</code></pre>
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
  padding-right: 44px; /* room for the copy button when chrome is absent */
}

.code-block-pre code {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: transparent !important;
  padding: 0 !important;
}

@media (max-width: 640px) {
  .code-block-pre {
    font-size: 11.5px;
    padding: 12px 14px;
  }
}
</style>
