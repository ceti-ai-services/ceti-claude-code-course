<!--
  LanguageToggle — EN/ES segmented toggle.

  Previous version used `bg-gold` which isn't a registered Tailwind color in
  the palette system — the active state rendered as unstyled text. This one
  uses palette tokens directly via scoped CSS so:
    - active button gets a solid primary-edge fill + high-contrast foreground
    - inactive button dims to muted-foreground
    - focus ring is visible in both modes
-->
<script setup lang="ts">
import { computed } from "vue"
import { useCustomizer } from "@/composables/useCustomizer"
import type { Lang } from "@/types/customizer"

const { lang, setCustomizer } = useCustomizer()
const active = computed<Lang>(() => lang.value)

function pick(next: Lang) {
  if (next === active.value) return
  setCustomizer({ lang: next })
}
</script>

<template>
  <div class="lang-toggle" role="group" aria-label="Language">
    <button
      type="button"
      class="lt-btn"
      :class="{ 'lt-btn--active': active === 'en' }"
      :aria-pressed="active === 'en'"
      @click="pick('en')"
    >
      EN
    </button>
    <span class="lt-divider" aria-hidden="true" />
    <button
      type="button"
      class="lt-btn"
      :class="{ 'lt-btn--active': active === 'es' }"
      :aria-pressed="active === 'es'"
      @click="pick('es')"
    >
      ES
    </button>
  </div>
</template>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0;
  padding: 3px;
  background: hsl(var(--card) / 0.75);
  border: 1px solid hsl(var(--border));
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.lt-btn {
  all: unset;
  padding: 3px 10px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  border-radius: 999px;
  transition: background-color 0.2s var(--ease-out-spring),
              color 0.2s var(--ease-out-spring),
              box-shadow 0.2s var(--ease-out-spring);
  min-width: 30px;
  text-align: center;
}

.lt-btn:hover {
  color: hsl(var(--foreground));
}

.lt-btn--active {
  background: hsl(var(--primary-edge));
  color: hsl(var(--background));
  font-weight: 700;
  box-shadow: 0 1px 6px hsl(var(--primary-edge) / 0.3);
}
:global(body.dark) .lt-btn--active {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  box-shadow: 0 0 0 1px hsl(var(--primary-edge) / 0.65),
              0 0 10px hsl(var(--primary-edge) / 0.35);
}

.lt-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

.lt-divider {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: hsl(var(--border));
}

@media (prefers-reduced-motion: reduce) {
  .lt-btn { transition: none; }
}
</style>
