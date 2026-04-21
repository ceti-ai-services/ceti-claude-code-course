<!--
  DiagramShell — the canonical frame every teaching pattern sits inside.
  Reusable across 18 patterns. Zero logic. Pure composition.

  Visual anatomy:
    ┌─ eyebrow (uppercase, tracking, muted-foreground) ───────┐
    │   LIVE DIAGRAM                                          │
    │                                                          │
    │   Fraunces 300 italic title                              │
    │  ────────────────────────────────────────────────────── │
    │                                                          │
    │            [slot: the diagram body]                      │
    │                                                          │
    │  caption (italic, muted-foreground)                      │
    └─────────────────────────────────────────────────────────┘

  Props are all optional except title.
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    caption?: string
    eyebrow?: string
    /** Min-height of the body slot (so every card aligns). Default 180px. */
    minBodyHeight?: number | string
    /** Optional external class-merge hook for consumers. */
    class?: string
  }>(),
  {
    eyebrow: "LIVE DIAGRAM",
    caption: "",
    minBodyHeight: 200,
  },
)
</script>

<template>
  <figure class="ds" :class="$props.class">
    <header class="ds-header">
      <span class="ds-eyebrow">{{ eyebrow }}</span>
      <h3 class="ds-title display-italic">{{ title }}</h3>
    </header>

    <div
      class="ds-body"
      :style="{
        minHeight: typeof minBodyHeight === 'number' ? `${minBodyHeight}px` : minBodyHeight,
      }"
    >
      <slot />
    </div>

    <figcaption v-if="caption" class="ds-caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.ds {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 22px 18px;
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  margin: 0;
  /* Light-mode default: soft drop shadow so every card has depth without
     gradient soup. Per §D-2026-04-21-glow. Dark-mode override below. */
  box-shadow:
    0 1px 2px hsl(var(--foreground) / 0.06),
    0 8px 24px -12px hsl(var(--foreground) / 0.10);
  transition: border-color 220ms var(--ease-out-spring),
              background-color 220ms var(--ease-out-spring),
              box-shadow 220ms var(--ease-out-spring);
}

/* Dark-mode: luminous-edge glow using the palette's primary-edge token.
   §D-2026-04-21-glow — applied universally so every diagram reads with
   the same "edge of light" signature. */
:global(body.dark) .ds {
  box-shadow:
    0 0 0 1px hsl(var(--border)),
    0 0 32px -10px hsl(var(--primary-edge) / 0.18);
}

.ds-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ds-eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
}

.ds-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.15;
  color: hsl(var(--foreground));
}

.ds-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ds-caption {
  font-size: 12px;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
  margin-top: 4px;
}
</style>
