<script setup lang="ts">
import LanguageToggle from '@/components/course/LanguageToggle.vue'
</script>

<template>
  <div>
    <nav class="nav">
      <div class="nav-inner">
        <NuxtLink to="/" class="brand">CETI<span>.AI</span></NuxtLink>
        <div class="nav-links flex items-center gap-5">
          <NuxtLink to="/start">Bronze</NuxtLink>
          <NuxtLink to="/academy">Academy</NuxtLink>
          <LanguageToggle />
          <NuxtLink to="/silver">Silver</NuxtLink>
          <NuxtLink to="/gold">Gold</NuxtLink>
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
