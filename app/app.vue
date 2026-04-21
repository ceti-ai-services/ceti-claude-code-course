<script setup lang="ts">
import LanguageToggle from '@/components/course/LanguageToggle.vue'
import PaletteToggle from '@/components/course/PaletteToggle.vue'
import { usePalette } from '@/composables/usePalette'

// Initialize — reads from localStorage on mount and applies the body class.
usePalette()

// Inject a tiny pre-hydration script so the <body> class is correct on first
// paint (no palette flash). Must run before Vue hydrates.
useHead({
  script: [
    {
      innerHTML: `
        (function(){
          try {
            var p = localStorage.getItem('ceti-palette') || 'boardwalk';
            var m = localStorage.getItem('ceti-mode')    || 'dark';
            document.body.classList.add('palette-' + p, m);
          } catch (e) {
            document.body.classList.add('palette-boardwalk', 'dark');
          }
        })();
      `,
      type: 'text/javascript',
      tagPosition: 'bodyOpen',
    },
  ],
})
</script>

<template>
  <div>
    <nav class="nav">
      <div class="nav-inner">
        <NuxtLink to="/" class="brand">CETI<span>.AI</span></NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/start">Bronze</NuxtLink>
          <NuxtLink to="/academy">Academy</NuxtLink>
          <NuxtLink to="/silver">Silver</NuxtLink>
          <NuxtLink to="/gold">Gold</NuxtLink>
          <PaletteToggle />
          <LanguageToggle />
        </div>
      </div>
    </nav>
    <NuxtPage />
    <footer class="footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} CETI.AI — Claude Code course · <a href="mailto:hello@ceti.ai">hello@ceti.ai</a></p>
      </div>
    </footer>
  </div>
</template>
