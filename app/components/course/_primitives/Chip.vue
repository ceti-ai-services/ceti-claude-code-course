<!--
  Chip — the canonical colored node used by every teaching pattern.

  Dual-mode contract:
    Light mode → colored fill, matching foreground text, no border.
    Dark  mode → dark-hue fill with luminous colored border + text.

  Roles (all palette-token driven — never hex):
    primary   — Perceive   (input / read phase)
    secondary — Reason     (plan / think phase)
    accent    — Act        (output / one-pop-per-view CTA)
    support   — Observe    (neutral / confirm / fourth-wheel)

  States:
    active — lifted + scaled, luminous edge shadow in dark
    dim    — 40% opacity (used when siblings should fade)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    role?: "primary" | "secondary" | "accent" | "support"
    active?: boolean
    dim?: boolean
    size?: "xs" | "sm" | "md"
    /** Semantic tag override — default button if clickable is used, else div */
    as?: "div" | "button" | "span"
    clickable?: boolean
    class?: string
  }>(),
  {
    role: "primary",
    active: false,
    dim: false,
    size: "sm",
    as: "div",
    clickable: false,
  },
)

const emit = defineEmits<{ (e: "click"): void }>()
function handleClick() { emit("click") }
</script>

<template>
  <component
    :is="clickable ? 'button' : as"
    class="chip"
    :class="[
      `chip--${role}`,
      `chip--${size}`,
      active && 'chip--active',
      dim && 'chip--dim',
      clickable && 'chip--clickable',
      $props.class,
    ]"
    :type="clickable ? 'button' : undefined"
    @click="clickable && handleClick()"
  >
    <slot />
  </component>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  font-weight: 600;
  line-height: 1.2;
  transition: all 0.22s var(--ease-out-spring);
  border: 1px solid transparent;
  font-family: var(--font-sans);
  white-space: nowrap;
  background-clip: padding-box;
  text-align: center;
}

.chip--xs { padding: 3px 7px;   font-size: 10.5px; border-radius: 6px; }
.chip--sm { padding: 5px 10px;  font-size: 11.5px; }
.chip--md { padding: 7px 12px;  font-size: 13px;   border-radius: 10px; }

/* ─── Role colors — light mode: fill. Dark mode: edge + foreground. ─── */

.chip--primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
:global(body.dark) .chip--primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary-edge) / 0.7);
}

.chip--secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}
:global(body.dark) .chip--secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border-color: hsl(var(--secondary-edge) / 0.7);
}

.chip--accent {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
:global(body.dark) .chip--accent {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  border-color: hsl(var(--accent-edge) / 0.7);
}

.chip--support {
  background: hsl(var(--support));
  color: hsl(var(--support-foreground));
}
:global(body.dark) .chip--support {
  background: hsl(var(--support));
  color: hsl(var(--support-foreground));
  border-color: hsl(var(--support-edge) / 0.7);
}

/* ─── States ─── */
.chip--active {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 16px hsl(var(--foreground) / 0.12);
}
:global(body.dark) .chip--active.chip--primary   { box-shadow: 0 0 0 2px hsl(var(--primary-edge) / 0.3),   0 6px 18px rgba(0,0,0,0.45); }
:global(body.dark) .chip--active.chip--secondary { box-shadow: 0 0 0 2px hsl(var(--secondary-edge) / 0.3), 0 6px 18px rgba(0,0,0,0.45); }
:global(body.dark) .chip--active.chip--accent    { box-shadow: 0 0 0 2px hsl(var(--accent-edge) / 0.3),    0 6px 18px rgba(0,0,0,0.45); }
:global(body.dark) .chip--active.chip--support   { box-shadow: 0 0 0 2px hsl(var(--support-edge) / 0.3),   0 6px 18px rgba(0,0,0,0.45); }

.chip--dim      { opacity: 0.4; }
.chip--clickable { cursor: pointer; }
.chip--clickable:hover:not(.chip--dim) { filter: brightness(1.06); transform: translateY(-1px); }
.chip--clickable:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

@media (prefers-reduced-motion: reduce) {
  .chip, .chip--active, .chip--clickable:hover { transition: none; transform: none; }
}
</style>
