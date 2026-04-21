<template>
  <main>
    <section class="hero container">
      <div class="eyebrow">CETI.AI · Claude Code Course</div>
      <h1>Stop asking AI to help.<br>Start having it do the work.</h1>
      <p class="lead">
        Three tiers. One tool. Claude Code — the terminal-grade AI that edits your files,
        runs your commands, and does the thing you were going to do anyway. Faster, and
        without opening a second tab.
      </p>
      <div class="cta-row">
        <NuxtLink to="/academy" class="btn btn-primary">Start the Academy</NuxtLink>
        <NuxtLink to="/silver" class="btn btn-secondary">See the cohort →</NuxtLink>
      </div>
    </section>

    <section class="container">
      <div class="tiers">
        <article class="card tier">
          <div class="tier-medal">🥉</div>
          <h2>Bronze</h2>
          <p>Claude Code: Day One</p>
          <div class="price">Free<span style="font-size:14px; color:var(--color-dim); margin-left:8px;">· invite only</span></div>
          <div class="price-note">~3 hours · self-serve · 14 modules</div>
          <ul>
            <li>Install on Mac, Windows, or Linux</li>
            <li>First session, file permissions, CLAUDE.md</li>
            <li>Slash commands, skills, plan mode, hooks</li>
            <li>MCP, git, subagents</li>
            <li>Starter kit + cheat sheet + FAQ</li>
          </ul>
          <NuxtLink to="/start" class="btn btn-secondary">Enter ticket code</NuxtLink>
        </article>

        <article class="card tier card-featured">
          <div class="tier-medal">🥈</div>
          <h2>Silver</h2>
          <p>Claude Code for Your Work</p>
          <div class="price">$499</div>
          <div class="price-note">4-week cohort · capped at 20</div>
          <ul>
            <li>Weekly 60-min live Q&amp;A</li>
            <li>Private Slack/Discord</li>
            <li>Custom skills + MCP (Gmail, Calendar, Notion)</li>
            <li>Hooks, multi-project setups, team safety</li>
            <li>Capstone: ship one automation</li>
            <li>Template library (20+ skills, 10+ hooks)</li>
          </ul>
          <NuxtLink to="/silver" class="btn btn-primary">Enroll in Silver</NuxtLink>
        </article>

        <article class="card tier">
          <div class="tier-medal">🥇</div>
          <h2>Gold</h2>
          <p>Claude Code in Your Business</p>
          <div class="price">$2,500</div>
          <div class="price-note">4× 1:1 hours · capped at 5/quarter</div>
          <ul>
            <li>Built-for-you CLAUDE.md, skills, MCP</li>
            <li>Workflow audit — what Claude Code replaces</li>
            <li>30-day post-engagement Slack support</li>
            <li>Optional $1,000/mo retainer</li>
          </ul>
          <NuxtLink to="/gold" class="btn btn-secondary">Book Gold</NuxtLink>
        </article>
      </div>
    </section>
  </main>
</template>
