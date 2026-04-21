<script setup lang="ts">
import SequentialPulse from "@/components/course/patterns/SequentialPulse.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  eyebrow: "CETI.AI · CLAUDE CODE ACADEMY",
  headline: "Claude Code,\nfrom zero to actually useful.",
  lede: "A structured path for non-developers — marketers, ops leads, lawyers, founders — who want an AI agent that edits their files, runs their commands, and handles the work they were going to do anyway.",
  proof: "5,000+ professionals trained · 100+ organizations · 20+ countries",
  diagramTitle: "The Bronze arc",
  diagramCaption: "Seven modules. One working setup. About 90 minutes.",
  modules: [
    { title: "Mental model", subtitle: "what Claude Code is", role: "primary" as const },
    { title: "Install", subtitle: "Mac / Win / Linux", role: "secondary" as const },
    { title: "First session", subtitle: "scoped to your files", role: "accent" as const },
    { title: "Permissions + CLAUDE.md", subtitle: "approve, guide, remember", role: "support" as const },
    { title: "One real task", subtitle: "end-to-end", role: "primary" as const },
  ],
  tiersEyebrow: "THREE TIERS",
  tiersHeadline: "Where you start, how far you go.",
  tiers: [
    {
      medal: "🥉",
      name: "Bronze",
      subtitle: "Claude Code: Day One",
      desc: "Seven self-serve modules. Install, first session, permissions, CLAUDE.md, slash commands, and one real task — end-to-end.",
      price: "Free",
      priceNote: "invite only · ~90 min · 14 modules",
      cta: "Start free →",
      href: "/start",
      primary: true,
      badge: null,
    },
    {
      medal: "🥈",
      name: "Silver",
      subtitle: "Claude Code for Your Work",
      desc: "Four-week async cohort. Weekly live Q&A. Custom skills, MCP integrations, hooks, and a capstone automation you ship.",
      price: "$499",
      priceNote: "4-week cohort · capped at 20",
      cta: "Enroll in Silver",
      href: "/silver",
      primary: false,
      badge: "Most Popular",
    },
    {
      medal: "🥇",
      name: "Gold",
      subtitle: "Claude Code in Your Business",
      desc: "Four 1:1 hours with Manu. Built-for-you CLAUDE.md, skills, and MCP. Workflow audit. Thirty-day Slack support.",
      price: "$2,500",
      priceNote: "4× 1:1 hours · capped at 5 / quarter",
      cta: "Book Gold",
      href: "/gold",
      primary: false,
      badge: null,
    },
  ],
  pillarsEyebrow: "HOW YOU LEARN",
  pillarsHeadline: "Not a video course. A working setup.",
  pillars: [
    {
      mono: "$ claude",
      title: "Real terminal, first session",
      desc: "You run the actual command in module three. Not a simulation.",
    },
    {
      mono: "~/your-files",
      title: "Scoped to your work",
      desc: "Claude Code touches your folder. The exercises use material you already have.",
    },
    {
      mono: "70+ diagrams",
      title: "Visual teaching throughout",
      desc: "Every concept gets a live diagram. Dual light/dark mode. Dual language.",
    },
    {
      mono: "CLAUDE.md",
      title: "Skills you keep",
      desc: "The starter kit — CLAUDE.md template, five slash commands, cheat sheet — goes home with you.",
    },
  ],
  footerCta: "Enter Bronze →",
}

const es = {
  eyebrow: "CETI.AI · ACADEMIA CLAUDE CODE",
  headline: "Claude Code,\nde cero a realmente útil.",
  lede: "Un camino estructurado para no-desarrolladores — directores de marketing, operaciones, abogados, fundadores — que quieren un agente IA que edite sus archivos, ejecute sus comandos y haga el trabajo que igual tendrían que hacer.",
  proof: "5.000+ profesionales formados · 100+ organizaciones · 20+ países",
  diagramTitle: "El arco Bronze",
  diagramCaption: "Siete módulos. Un setup funcional. Unos 90 minutos.",
  modules: [
    { title: "Modelo mental", subtitle: "qué es Claude Code", role: "primary" as const },
    { title: "Instalación", subtitle: "Mac / Win / Linux", role: "secondary" as const },
    { title: "Primera sesión", subtitle: "en tus archivos", role: "accent" as const },
    { title: "Permisos + CLAUDE.md", subtitle: "aprobar, guiar, recordar", role: "support" as const },
    { title: "Una tarea real", subtitle: "de principio a fin", role: "primary" as const },
  ],
  tiersEyebrow: "TRES NIVELES",
  tiersHeadline: "Dónde empiezas, hasta dónde llegas.",
  tiers: [
    {
      medal: "🥉",
      name: "Bronze",
      subtitle: "Claude Code: Día Uno",
      desc: "Siete módulos autoguiados. Instalación, primera sesión, permisos, CLAUDE.md, comandos slash y una tarea real completa.",
      price: "Gratis",
      priceNote: "solo por invitación · ~90 min · 14 módulos",
      cta: "Empezar gratis →",
      href: "/start",
      primary: true,
      badge: null,
    },
    {
      medal: "🥈",
      name: "Silver",
      subtitle: "Claude Code para Tu Trabajo",
      desc: "Cohorte asíncrona de cuatro semanas. Q&A en vivo semanal. Skills propias, integraciones MCP, hooks y una automatización que entregas.",
      price: "$499",
      priceNote: "cohorte 4 semanas · máx. 20 personas",
      cta: "Inscribirse en Silver",
      href: "/silver",
      primary: false,
      badge: "Más Popular",
    },
    {
      medal: "🥇",
      name: "Gold",
      subtitle: "Claude Code en Tu Negocio",
      desc: "Cuatro horas 1:1 con Manu. CLAUDE.md, skills y MCP hechos para ti. Auditoría de workflows. Soporte por Slack 30 días.",
      price: "$2.500",
      priceNote: "4× horas 1:1 · máx. 5 / trimestre",
      cta: "Reservar Gold",
      href: "/gold",
      primary: false,
      badge: null,
    },
  ],
  pillarsEyebrow: "CÓMO APRENDES",
  pillarsHeadline: "No es un curso de video. Es un setup que funciona.",
  pillars: [
    {
      mono: "$ claude",
      title: "Terminal real desde la primera sesión",
      desc: "El comando real en el módulo tres. Sin simulaciones.",
    },
    {
      mono: "~/tus-archivos",
      title: "En tus propios archivos",
      desc: "Claude Code toca tu carpeta. Los ejercicios usan material que ya tienes.",
    },
    {
      mono: "70+ diagramas",
      title: "Enseñanza visual en todo el curso",
      desc: "Cada concepto tiene un diagrama en vivo. Modo claro/oscuro. Dos idiomas.",
    },
    {
      mono: "CLAUDE.md",
      title: "Skills que te llevas",
      desc: "El starter kit — plantilla CLAUDE.md, cinco comandos slash, cheat sheet — es tuyo para siempre.",
    },
  ],
  footerCta: "Entrar a Bronze →",
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <main>
    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero-section container">
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="lp-eyebrow">{{ t.eyebrow }}</div>
          <h1 class="hero-headline display-italic">{{ t.headline }}</h1>
          <p class="hero-lede">{{ t.lede }}</p>
          <div class="hero-cta-row">
            <NuxtLink to="/start" class="btn btn-primary lp-cta-primary">{{ t.tiers[0].cta }}</NuxtLink>
            <NuxtLink to="/silver" class="btn btn-secondary">{{ t.tiers[1].cta }}</NuxtLink>
          </div>
          <p class="proof-line">{{ t.proof }}</p>
        </div>

        <div class="hero-diagram">
          <SequentialPulse
            :title="t.diagramTitle"
            :caption="t.diagramCaption"
            :steps="t.modules"
            :cycle-ms="1400"
          />
        </div>
      </div>
    </section>

    <!-- ── Tier grid ──────────────────────────────────────────── -->
    <section class="lp-section container">
      <div class="section-header">
        <div class="lp-eyebrow">{{ t.tiersEyebrow }}</div>
        <h2 class="section-headline display-italic">{{ t.tiersHeadline }}</h2>
      </div>

      <div class="tiers-grid">
        <article
          v-for="tier in t.tiers"
          :key="tier.name"
          class="tier-card"
          :class="{ 'tier-card--featured': tier.badge }"
        >
          <div v-if="tier.badge" class="tier-badge">{{ tier.badge }}</div>
          <div class="tier-card-header">
            <span class="tier-medal">{{ tier.medal }}</span>
            <div>
              <div class="lp-eyebrow" style="margin-bottom:2px">{{ tier.name }}</div>
              <div class="tier-subtitle">{{ tier.subtitle }}</div>
            </div>
          </div>
          <p class="tier-desc">{{ tier.desc }}</p>
          <div class="tier-price">{{ tier.price }}</div>
          <div class="tier-price-note">{{ tier.priceNote }}</div>
          <NuxtLink
            :to="tier.href"
            :class="tier.primary ? 'btn btn-primary' : 'btn btn-secondary'"
            class="tier-btn"
          >{{ tier.cta }}</NuxtLink>
        </article>
      </div>
    </section>

    <!-- ── How you learn ──────────────────────────────────────── -->
    <section class="lp-section container">
      <div class="section-header">
        <div class="lp-eyebrow">{{ t.pillarsEyebrow }}</div>
        <h2 class="section-headline display-italic">{{ t.pillarsHeadline }}</h2>
      </div>

      <div class="pillars-grid">
        <div v-for="pillar in t.pillars" :key="pillar.mono" class="pillar-card">
          <div class="pillar-mono">{{ pillar.mono }}</div>
          <div class="pillar-title">{{ pillar.title }}</div>
          <p class="pillar-desc">{{ pillar.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── Footer CTA ─────────────────────────────────────────── -->
    <section class="footer-cta-section container">
      <NuxtLink to="/start" class="btn btn-primary lp-cta-primary">{{ t.footerCta }}</NuxtLink>
      <p class="footer-cta-note">{{ t.proof }}</p>
    </section>
  </main>
</template>

<style scoped>
/* ── Layout ────────────────────────────────────────────────────── */
.hero-section {
  padding: 72px 0 56px;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

@media (max-width: 820px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* ── Hero copy ─────────────────────────────────────────────────── */
.lp-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
  margin-bottom: 18px;
}

.hero-headline {
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: hsl(var(--foreground));
  margin: 0 0 22px;
  white-space: pre-line;
}

.hero-lede {
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.65;
  color: hsl(var(--muted-foreground));
  max-width: 52ch;
  margin: 0 0 32px;
}

.hero-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.lp-cta-primary {
  font-size: 15px;
  padding: 13px 26px;
}

.proof-line {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground) / 0.65);
  margin: 0;
}

/* ── Hero diagram ──────────────────────────────────────────────── */
.hero-diagram {
  padding-top: 4px;
}

/* ── Section shared ────────────────────────────────────────────── */
.lp-section {
  padding: 56px 0;
  border-top: 1px solid hsl(var(--border));
}

.section-header {
  margin-bottom: 36px;
}

.section-headline {
  font-size: clamp(1.6rem, 3.5vw, 2.25rem);
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: hsl(var(--foreground));
  margin: 0;
}

/* ── Tier cards ────────────────────────────────────────────────── */
.tiers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .tiers-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
}

.tier-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 24px;
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  /* Light-mode: soft drop shadow matching DiagramShell glow rule */
  box-shadow:
    0 1px 2px hsl(var(--foreground) / 0.06),
    0 8px 24px -12px hsl(var(--foreground) / 0.10);
  transition:
    border-color 220ms var(--ease-out-spring),
    box-shadow 220ms var(--ease-out-spring);
}

:global(body.dark) .tier-card {
  box-shadow:
    0 0 0 1px hsl(var(--border)),
    0 0 32px -10px hsl(var(--primary-edge) / 0.18);
}

.tier-card--featured {
  border-color: hsl(var(--primary-edge) / 0.7);
}

:global(body.dark) .tier-card--featured {
  box-shadow:
    0 0 0 1px hsl(var(--border)),
    0 0 40px -8px hsl(var(--primary-edge) / 0.28);
}

.tier-badge {
  position: absolute;
  top: -11px;
  left: 22px;
  background: hsl(var(--primary-edge));
  color: hsl(var(--background));
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 4px;
}

.tier-card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}

.tier-medal {
  font-size: 26px;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.tier-subtitle {
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  line-height: 1.3;
}

.tier-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: hsl(var(--muted-foreground));
  margin: 0 0 20px;
  flex: 1;
}

.tier-price {
  font-family: var(--font-mono);
  font-size: 26px;
  font-weight: 700;
  color: hsl(var(--primary-edge));
  line-height: 1;
  margin-bottom: 4px;
}

.tier-price-note {
  font-size: 12px;
  color: hsl(var(--muted-foreground) / 0.7);
  margin-bottom: 20px;
}

.tier-btn {
  width: 100%;
  text-align: center;
}

/* ── Pillars ───────────────────────────────────────────────────── */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}

.pillar-card {
  padding: 20px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  box-shadow:
    0 1px 2px hsl(var(--foreground) / 0.04),
    0 4px 14px -8px hsl(var(--foreground) / 0.08);
}

:global(body.dark) .pillar-card {
  box-shadow:
    0 0 0 1px hsl(var(--border)),
    0 0 22px -10px hsl(var(--support-edge) / 0.18);
}

.pillar-mono {
  font-family: var(--font-mono);
  font-size: 11px;
  color: hsl(var(--accent-edge));
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}

.pillar-title {
  font-size: 14px;
  font-weight: 600;
  color: hsl(var(--foreground));
  line-height: 1.3;
  margin-bottom: 8px;
}

.pillar-desc {
  font-size: 13px;
  line-height: 1.6;
  color: hsl(var(--muted-foreground));
  margin: 0;
}

/* ── Footer CTA ────────────────────────────────────────────────── */
.footer-cta-section {
  padding: 56px 0 80px;
  border-top: 1px solid hsl(var(--border));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.footer-cta-note {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground) / 0.55);
  margin: 0;
}
</style>
