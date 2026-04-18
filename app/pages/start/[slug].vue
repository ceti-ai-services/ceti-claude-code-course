<template>
  <main class="lesson">
    <div v-if="lesson" class="eyebrow">Module {{ lesson.module }} · Bronze</div>
    <h1 v-if="lesson">{{ lesson.title }}</h1>
    <div v-if="lesson" class="lesson-meta">~{{ lesson.time }} · {{ lessonIndex + 1 }} of {{ lessons.length }}</div>

    <div class="progress-dots">
      <NuxtLink
        v-for="(l, i) in lessons"
        :key="l.slug"
        :to="`/start/${l.slug}`"
        class="dot"
        :class="{ 'dot-done': i < lessonIndex, 'dot-current': i === lessonIndex }"
        :aria-label="`Module ${l.module}: ${l.title}`"
      >
        {{ l.module }}
      </NuxtLink>
    </div>

    <article v-if="lesson" class="lesson-body" v-html="lesson.html"></article>

    <div v-else class="card" style="margin-top:40px;">
      <h2>Lesson not found</h2>
      <p style="margin-top:12px;">This module doesn't exist yet. <NuxtLink to="/start">Back to start →</NuxtLink></p>
    </div>

    <nav v-if="lesson" class="lesson-nav">
      <NuxtLink
        v-if="prev"
        :to="`/start/${prev.slug}`"
        class="btn btn-secondary"
      >← Module {{ prev.module }}</NuxtLink>
      <NuxtLink
        v-else
        to="/start"
        class="btn btn-secondary"
      >← Back to start</NuxtLink>

      <NuxtLink
        v-if="next"
        :to="`/start/${next.slug}`"
        class="btn btn-primary"
      >Module {{ next.module }}: {{ next.title }} →</NuxtLink>
      <NuxtLink
        v-else
        to="/silver"
        class="btn btn-primary"
      >You're done — see Silver →</NuxtLink>
    </nav>
  </main>
</template>

<script setup lang="ts">
import matter from 'gray-matter'
import { marked } from 'marked'

// Buffer polyfill so gray-matter works in Vite/Nitro builds without extra config
if (typeof globalThis.Buffer === 'undefined') {
  // @ts-ignore
  globalThis.Buffer = { isBuffer: () => false }
}

interface Lesson {
  slug: string
  module: string
  title: string
  time: string
  html: string
}

// Glob-import every Bronze lesson markdown file at build time
const raw = import.meta.glob('../../../content/start/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const lessons: Lesson[] = Object.entries(raw)
  .map(([path, content]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, content: body } = matter(content)
    return {
      slug,
      module: String(data.module ?? slug.slice(0, 2)),
      title: String(data.title ?? slug),
      time: String(data.time ?? '12 min'),
      html: marked.parse(body, { async: false }) as string,
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const lessonIndex = computed(() => lessons.findIndex((l) => l.slug === slug.value))
const lesson = computed<Lesson | undefined>(() => lessons[lessonIndex.value])
const prev = computed(() => (lessonIndex.value > 0 ? lessons[lessonIndex.value - 1] : null))
const next = computed(() =>
  lessonIndex.value >= 0 && lessonIndex.value < lessons.length - 1 ? lessons[lessonIndex.value + 1] : null,
)

definePageMeta({
  // prerender every lesson at build time
})

useHead(() => ({
  title: lesson.value ? `${lesson.value.title} · CETI Claude Code` : 'Lesson not found',
}))
</script>

<style scoped>
.progress-dots {
  display: flex;
  gap: 8px;
  margin: 24px 0 40px;
  flex-wrap: wrap;
}
.dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--raised);
  border: 1px solid var(--border);
  color: var(--dim);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s ease;
}
.dot:hover { border-color: var(--gold); color: var(--text); }
.dot-done { color: var(--gold); border-color: var(--gold-dim); }
.dot-current {
  background: var(--gold);
  color: #15110a;
  border-color: var(--gold);
}
.lesson-body :deep(h1) { display: none; }
.lesson-body :deep(p:first-of-type) { color: var(--text); font-size: 18px; margin-bottom: 24px; }
.lesson-body :deep(h2) { margin: 40px 0 16px; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
.lesson-body :deep(h3) { margin: 28px 0 12px; font-size: 17px; }
.lesson-body :deep(p) { margin-bottom: 16px; color: var(--text); }
.lesson-body :deep(ul), .lesson-body :deep(ol) { margin: 16px 0 24px 24px; color: var(--muted); }
.lesson-body :deep(li) { margin-bottom: 8px; }
.lesson-body :deep(code) { background: var(--raised); padding: 2px 6px; border-radius: 4px; font-size: 0.92em; }
.lesson-body :deep(pre) {
  background: var(--raised);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  margin: 20px 0;
}
.lesson-body :deep(pre code) { background: transparent; padding: 0; }
.lesson-body :deep(strong) { color: var(--text); font-weight: 600; }
.lesson-body :deep(blockquote) {
  background: var(--gold-dim);
  border-left: 3px solid var(--gold);
  padding: 16px 20px;
  margin: 24px 0;
  border-radius: 0 10px 10px 0;
}
.lesson-body :deep(blockquote p) { margin: 0; color: var(--text); }
.lesson-body :deep(a) { color: var(--gold); }
.lesson-body :deep(hr) { border: none; border-top: 1px solid var(--border); margin: 32px 0; }
</style>
