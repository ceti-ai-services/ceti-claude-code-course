<template>
  <main class="lesson">
    <div class="progress-dots">
      <NuxtLink
        v-for="(l, i) in lessons"
        :key="l.slug"
        :to="lessonLink(l.slug)"
        class="dot"
        :class="{ 'dot-done': i < lessonIndex, 'dot-current': i === lessonIndex }"
        :aria-label="`Module ${l.module}: ${l.title}`"
      >
        {{ l.module }}
      </NuxtLink>
    </div>

    <!-- Mission-brief interactive hero for each module.
         Replaces the static eyebrow+h1+meta intro with a per-module briefing
         that composes MissionBrief + a module-specific interactive block. -->
    <component v-if="heroComponent" :is="heroComponent" />
    <template v-else-if="lesson">
      <div class="eyebrow">Module {{ lesson.module }} · Bronze</div>
      <h1>{{ lesson.title }}</h1>
      <div class="lesson-meta">
        ~{{ lesson.time }} · {{ lessonIndex + 1 }} of {{ lessons.length }}
      </div>
    </template>

    <article v-if="lesson" ref="lessonBody" class="lesson-body">
      <div
        v-for="(block, i) in lesson.blocks"
        :key="i"
        class="appear"
        :style="`--appear-delay: ${Math.min(i * 55, 280)}ms`"
      >
        <!-- plain markdown HTML -->
        <div
          v-if="block.kind === 'html'"
          class="lesson-html"
          v-html="block.html"
        />

        <!-- Callout -->
        <Callout
          v-else-if="block.kind === 'callout'"
          :variant="block.variant"
        >
          <div v-html="block.html" />
        </Callout>

        <!-- TryThis -->
        <TryThis v-else-if="block.kind === 'try'" :time="block.time">
          <div v-html="block.html" />
        </TryThis>

        <!-- Recap -->
        <Recap v-else-if="block.kind === 'recap'">
          <div v-html="block.html" />
        </Recap>

        <!-- Quiz -->
        <Quiz
          v-else-if="block.kind === 'quiz'"
          :prompt="block.prompt"
          :options="block.options"
        />

        <!-- PersonaExample: renders only the active persona's slot -->
        <PersonaExample v-else-if="block.kind === 'personaExample'">
          <template #creator>
            <div v-if="block.slots.creator" v-html="block.slots.creator" />
          </template>
          <template #consultant>
            <div
              v-if="block.slots.consultant"
              v-html="block.slots.consultant"
            />
          </template>
          <template #service>
            <div v-if="block.slots.service" v-html="block.slots.service" />
          </template>
          <template #realestate>
            <div
              v-if="block.slots.realestate"
              v-html="block.slots.realestate"
            />
          </template>
        </PersonaExample>
      </div>
    </article>

    <div v-else class="card" style="margin-top: 40px">
      <h2>Lesson not found</h2>
      <p style="margin-top: 12px">
        This module doesn't exist yet.
        <NuxtLink to="/start">Back to start →</NuxtLink>
      </p>
    </div>

    <nav v-if="lesson" class="lesson-nav">
      <NuxtLink
        v-if="prev"
        :to="lessonLink(prev.slug)"
        class="btn btn-secondary"
        >← Module {{ prev.module }}</NuxtLink
      >
      <NuxtLink v-else to="/start" class="btn btn-secondary"
        >← Back to start</NuxtLink
      >

      <NuxtLink
        v-if="next"
        :to="lessonLink(next.slug)"
        class="btn btn-primary"
        >Module {{ next.module }}: {{ next.title }} →</NuxtLink
      >
      <NuxtLink v-else to="/silver" class="btn btn-primary"
        >You're done — see Silver →</NuxtLink
      >
    </nav>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue"
import { marked } from "marked"
import Callout from "@/components/course/Callout.vue"
import TryThis from "@/components/course/TryThis.vue"
import Recap from "@/components/course/Recap.vue"
import Quiz from "@/components/course/Quiz.vue"
import PersonaExample from "@/components/course/PersonaExample.vue"

// Per-module interactive hero blocks. Each composes `MissionBrief` + a
// module-specific interactive primitive (BeforeAfter / ProcessFlow /
// TerminalDemo / StackedReveal). Chosen by sibling-agent evaluation from
// .agent/VARIANTS-M-ALL.md. Static imports so the block renders in SSR.
import M01Hero from "@/components/course/lesson/M01Hero.vue"
import M02Hero from "@/components/course/lesson/M02Hero.vue"
import M03Hero from "@/components/course/lesson/M03Hero.vue"
import M04Hero from "@/components/course/lesson/M04Hero.vue"
import M05Hero from "@/components/course/lesson/M05Hero.vue"
import M06Hero from "@/components/course/lesson/M06Hero.vue"
import M07Hero from "@/components/course/lesson/M07Hero.vue"

import { useCustomizer } from "@/composables/useCustomizer"
import type { Persona } from "@/types/customizer"
import { PERSONAS } from "@/types/customizer"

const heroMap: Record<string, unknown> = {
  "01-mental-model": M01Hero,
  "02-install": M02Hero,
  "03-first-session": M03Hero,
  "04-file-permissions": M04Hero,
  "05-claude-md": M05Hero,
  "06-real-use-case": M06Hero,
  "07-next-steps": M07Hero,
}

type QuizOption = { label: string; correct: boolean; explain: string }

type Block =
  | { kind: "html"; html: string }
  | { kind: "callout"; variant: string; html: string }
  | { kind: "try"; time: string; html: string }
  | { kind: "recap"; html: string }
  | { kind: "quiz"; prompt: string; options: QuizOption[] }
  | {
      kind: "personaExample"
      slots: Partial<Record<Persona, string>>
    }

interface LessonFile {
  slug: string
  lang: "en" | "es"
  data: Record<string, string>
  content: string
}

interface Lesson {
  slug: string
  module: string
  title: string
  time: string
  blocks: Block[]
}

// --- Frontmatter parsing ---------------------------------------------------
function parseFrontmatter(raw: string): {
  data: Record<string, string>
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":")
    if (colon < 1) continue
    const key = line.slice(0, colon).trim()
    let val = line.slice(colon + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }
  return { data, content: match[2] }
}

// --- Persona comment filter ------------------------------------------------
// Strip <!-- persona:X -->...<!-- /persona:X --> blocks that don't match the
// active persona. Matching blocks have their comment wrappers removed.
function filterPersonaComments(md: string, active: Persona): string {
  const re =
    /<!--\s*persona:([a-z]+)\s*-->([\s\S]*?)<!--\s*\/persona:\1\s*-->/g
  return md.replace(re, (_m, p1: string, body: string) => {
    if (p1 === active) return body
    return ""
  })
}

// --- Block tokenizer -------------------------------------------------------
// Walk the raw markdown and split it into a sequence of blocks. Regular
// markdown chunks go through `marked`. Known custom components become
// structured blocks.

function parseAttrs(s: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /(\w+)\s*=\s*"([^"]*)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) attrs[m[1]] = m[2]
  return attrs
}

function stripBlankLeadingTrailing(s: string): string {
  return s.replace(/^\s*\n/, "").replace(/\n\s*$/, "")
}

function mdToHtml(md: string): string {
  return marked.parse(md, { async: false }) as string
}

const CUSTOM_TAGS = [
  "Callout",
  "TryThis",
  "Recap",
  "PersonaExample",
  "Quiz",
] as const

type CustomTag = (typeof CUSTOM_TAGS)[number]

function findNextCustomTag(
  md: string,
  from: number,
): { tag: CustomTag; start: number; openEnd: number; rawOpen: string } | null {
  // Find the first occurrence of any of our custom tags as an opening tag.
  let best: {
    tag: CustomTag
    start: number
    openEnd: number
    rawOpen: string
  } | null = null
  for (const tag of CUSTOM_TAGS) {
    const re = new RegExp(`<${tag}(\\s[^>]*)?>`, "g")
    re.lastIndex = from
    const m = re.exec(md)
    if (m) {
      if (!best || m.index < best.start) {
        best = {
          tag,
          start: m.index,
          openEnd: m.index + m[0].length,
          rawOpen: m[0],
        }
      }
    }
  }
  return best
}

function findMatchingClose(
  md: string,
  tag: CustomTag,
  searchFrom: number,
): number {
  // Handle nested same-tag by counting. (Rare in our content.)
  const openRe = new RegExp(`<${tag}(\\s[^>]*)?>`, "g")
  const closeRe = new RegExp(`</${tag}>`, "g")
  openRe.lastIndex = searchFrom
  closeRe.lastIndex = searchFrom

  let depth = 1
  while (depth > 0) {
    const nextOpen = openRe.exec(md)
    const nextClose = closeRe.exec(md)
    if (!nextClose) return -1
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1
      closeRe.lastIndex = nextOpen.index + nextOpen[0].length
      openRe.lastIndex = nextOpen.index + nextOpen[0].length
    } else {
      depth -= 1
      if (depth === 0) return nextClose.index
      openRe.lastIndex = nextClose.index + nextClose[0].length
    }
  }
  return -1
}

function parsePersonaSlots(inner: string): Partial<Record<Persona, string>> {
  const out: Partial<Record<Persona, string>> = {}
  const re =
    /<template\s+#([a-z]+)\s*>([\s\S]*?)<\/template>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(inner))) {
    const name = m[1] as Persona
    if ((PERSONAS as readonly string[]).includes(name)) {
      out[name] = mdToHtml(stripBlankLeadingTrailing(m[2]))
    }
  }
  return out
}

function parseQuizOptions(inner: string): QuizOption[] {
  // We don't have any <Quiz> in content yet, but support a minimal
  // ":options" JSON attribute if ever used.
  try {
    const match = inner.match(/\{[\s\S]*\}/)
    if (!match) return []
    const parsed = JSON.parse(match[0]) as { options?: QuizOption[] }
    return parsed.options ?? []
  } catch {
    return []
  }
}

function tokenize(md: string): Block[] {
  const blocks: Block[] = []
  let cursor = 0
  while (cursor < md.length) {
    const found = findNextCustomTag(md, cursor)
    if (!found) {
      const rest = md.slice(cursor)
      if (rest.trim()) blocks.push({ kind: "html", html: mdToHtml(rest) })
      break
    }
    // Flush regular markdown before this tag.
    if (found.start > cursor) {
      const chunk = md.slice(cursor, found.start)
      if (chunk.trim()) blocks.push({ kind: "html", html: mdToHtml(chunk) })
    }

    const closeIdx = findMatchingClose(md, found.tag, found.openEnd)
    if (closeIdx < 0) {
      // Malformed — treat the rest as html so we don't lose content.
      const rest = md.slice(found.start)
      blocks.push({ kind: "html", html: mdToHtml(rest) })
      break
    }

    const inner = md.slice(found.openEnd, closeIdx)
    const attrs = parseAttrs(found.rawOpen)

    if (found.tag === "Callout") {
      const variant = attrs.variant ?? "core-idea"
      blocks.push({
        kind: "callout",
        variant,
        html: mdToHtml(stripBlankLeadingTrailing(inner)),
      })
    } else if (found.tag === "TryThis") {
      const time = attrs.time ?? "5 min"
      blocks.push({
        kind: "try",
        time,
        html: mdToHtml(stripBlankLeadingTrailing(inner)),
      })
    } else if (found.tag === "Recap") {
      blocks.push({
        kind: "recap",
        html: mdToHtml(stripBlankLeadingTrailing(inner)),
      })
    } else if (found.tag === "PersonaExample") {
      blocks.push({ kind: "personaExample", slots: parsePersonaSlots(inner) })
    } else if (found.tag === "Quiz") {
      const opts = parseQuizOptions(inner)
      blocks.push({
        kind: "quiz",
        prompt: attrs.prompt ?? "",
        options: opts,
      })
    }

    cursor = closeIdx + `</${found.tag}>`.length
  }
  return blocks
}

// --- Lesson file registry --------------------------------------------------
// Glob-import every Bronze lesson markdown file at build time, English and
// Spanish side-by-side. Language routing: prefer <slug>.<lang>.md, fall back
// to <slug>.md (English).
const raw = import.meta.glob("../../../content/start/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

const files: LessonFile[] = Object.entries(raw).map(([path, content]) => {
  const fname = path.split("/").pop()!.replace(/\.md$/, "")
  // Detect ".es" / ".en" segment.
  const langMatch = fname.match(/^(.+)\.(en|es)$/)
  const slug = langMatch ? langMatch[1] : fname
  const lang = (langMatch ? langMatch[2] : "en") as "en" | "es"
  const { data, content: body } = parseFrontmatter(content)
  return { slug, lang, data, content: body }
})

const allSlugs = Array.from(new Set(files.map((f) => f.slug))).sort()

// --- Route + persona wiring ------------------------------------------------
const route = useRoute()
const { persona, lang } = useCustomizer()
const slug = computed(() => String(route.params.slug || ""))

const activePersona = computed<Persona>(() => persona.value ?? "creator")

function pickFile(slug: string, lang: "en" | "es"): LessonFile | undefined {
  if (lang !== "en") {
    const localized = files.find((f) => f.slug === slug && f.lang === lang)
    if (localized) return localized
  }
  return files.find((f) => f.slug === slug && f.lang === "en")
}

// --- Lessons list (for progress + nav) -------------------------------------
const lessons = computed(() =>
  allSlugs.map((s) => {
    const f = pickFile(s, lang.value)!
    return {
      slug: s,
      module: String(f.data.module ?? s.slice(0, 2)),
      title: String(f.data.title ?? s),
      time: String(f.data.time ?? "12 min"),
    }
  }),
)

const lessonIndex = computed(() =>
  lessons.value.findIndex((l) => l.slug === slug.value),
)

const heroComponent = computed(() => heroMap[slug.value] ?? null)

const lesson = computed<Lesson | undefined>(() => {
  const file = pickFile(slug.value, lang.value)
  if (!file) return undefined
  const filtered = filterPersonaComments(file.content, activePersona.value)
  const blocks = tokenize(filtered)
  return {
    slug: file.slug,
    module: String(file.data.module ?? file.slug.slice(0, 2)),
    title: String(file.data.title ?? file.slug),
    time: String(file.data.time ?? "12 min"),
    blocks,
  }
})

const prev = computed(() =>
  lessonIndex.value > 0 ? lessons.value[lessonIndex.value - 1] : null,
)
const next = computed(() =>
  lessonIndex.value >= 0 && lessonIndex.value < lessons.value.length - 1
    ? lessons.value[lessonIndex.value + 1]
    : null,
)

function lessonLink(s: string): string {
  const p = persona.value
  const l = lang.value
  const params: string[] = []
  if (l) params.push(`lang=${l}`)
  if (p) params.push(`persona=${p}`)
  return `/start/${s}${params.length ? "?" + params.join("&") : ""}`
}

// --- Scroll-triggered appear animations -----------------------------------
// Progressive enhancement: JS adds 'js-ready' to the article so the CSS
// opacity-0 rule only activates when the observer can immediately reveal
// visible blocks. Without JS (SSR/prerender), blocks show immediately.
const lessonBody = ref<HTMLElement | null>(null)
let appearObserver: IntersectionObserver | null = null

function setupAppear(el: HTMLElement) {
  appearObserver?.disconnect()
  el.classList.add("js-ready")
  appearObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible")
          appearObserver?.unobserve(e.target)
        }
      })
    },
    { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
  )
  el.querySelectorAll(".appear").forEach((el) => appearObserver!.observe(el))
}

onMounted(async () => {
  await nextTick()
  if (lessonBody.value) setupAppear(lessonBody.value)
})

watch(lesson, async () => {
  await nextTick()
  if (lessonBody.value) {
    lessonBody.value.classList.remove("js-ready")
    setupAppear(lessonBody.value)
  }
})

onBeforeUnmount(() => appearObserver?.disconnect())

definePageMeta({
  // prerender every lesson at build time
})

useHead(() => ({
  title: lesson.value
    ? `${lesson.value.title} · CETI Claude Code`
    : "Lesson not found",
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
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s ease;
}
.dot:hover {
  border-color: var(--gold);
  color: var(--text);
}
.dot-done {
  color: var(--gold);
  border-color: var(--gold-dim);
}
.dot-current {
  background: var(--gold);
  color: #15110a;
  border-color: var(--gold);
}

.lesson-body :deep(h1) {
  display: none;
}
.lesson-body :deep(.lesson-html p:first-of-type) {
  color: var(--text);
  font-size: 18px;
  margin-bottom: 24px;
}
.lesson-body :deep(h2) {
  position: relative;
  margin: 52px 0 18px;
  padding-top: 22px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.015em;
  border-top: 1px solid var(--border);
}
/* Gold accent mark on section headings */
.lesson-body :deep(h2)::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 36px;
  height: 2px;
  background: var(--gold);
  border-radius: 2px;
}
.lesson-body :deep(h3) {
  margin: 32px 0 12px;
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.005em;
}
.lesson-body :deep(h3)::before {
  content: "//";
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-gold-dim);
  margin-right: 6px;
  font-weight: 400;
}
.lesson-body :deep(p) {
  margin-bottom: 16px;
  color: var(--text);
}
.lesson-body :deep(ul),
.lesson-body :deep(ol) {
  margin: 16px 0 24px 24px;
  color: var(--muted);
}
.lesson-body :deep(li) {
  margin-bottom: 8px;
}
.lesson-body :deep(code) {
  background: var(--raised);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.92em;
}
.lesson-body :deep(pre) {
  background: var(--raised);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  margin: 20px 0;
}
.lesson-body :deep(pre code) {
  background: transparent;
  padding: 0;
}
.lesson-body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}
.lesson-body :deep(blockquote) {
  background: var(--gold-dim);
  border-left: 3px solid var(--gold);
  padding: 16px 20px;
  margin: 24px 0;
  border-radius: 0 10px 10px 0;
}
.lesson-body :deep(blockquote p) {
  margin: 0;
  color: var(--text);
}
.lesson-body :deep(a) {
  color: var(--gold);
}
.lesson-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 32px 0;
}

/* ---- Scroll-triggered appear animations --------------------------------- */
/* Only active after JS adds .js-ready. Without JS all blocks display normally. */
.lesson-body.js-ready .appear {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 520ms var(--ease-out-spring) var(--appear-delay, 0ms),
    transform 520ms var(--ease-out-spring) var(--appear-delay, 0ms);
}
.lesson-body.js-ready .appear.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .lesson-body.js-ready .appear {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
