<!--
  FileTree — indented tree with folder/file glyphs in mono font.
  Key nodes get a role-colored highlight background. Hover tooltip
  shows purpose. Up to 4 levels deep, 10 rows visible at once.

  Pattern ref: PATTERNS.md §11 · patterns-extended-rb.jsx PFileTree
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"

type Role = "primary" | "secondary" | "accent" | "support"
type FileNode = {
  name: string
  kind: "folder" | "file"
  role?: Role
  tooltip?: string
  children?: FileNode[]
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    tree: FileNode[]
  }>(),
  { caption: "" },
)

type FlatRow = {
  name: string
  kind: "folder" | "file"
  role?: Role
  tooltip?: string
  depth: number
  key: string
}

function flatten(nodes: FileNode[], depth = 0, prefix = ""): FlatRow[] {
  const rows: FlatRow[] = []
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (!n) continue
    const key = `${prefix}${i}-${n.name}`
    if (depth < 4) {
      rows.push({
        name: n.name,
        kind: n.kind,
        role: n.role,
        tooltip: n.tooltip,
        depth,
        key,
      })
      if (n.children?.length) {
        rows.push(...flatten(n.children, depth + 1, `${key}/`))
      }
    }
  }
  return rows
}

const rows = computed(() => flatten(props.tree).slice(0, 10))
const hoverIdx = ref<number>(-1)

function glyph(kind: "folder" | "file") {
  return kind === "folder" ? "▸" : "·"
}
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="240">
    <ul
      class="ftr-list"
      role="tree"
      :aria-label="title"
    >
      <li
        v-for="(row, i) in rows"
        :key="row.key"
        class="ftr-row"
        role="treeitem"
        :aria-level="row.depth + 1"
        :class="[row.role && `ftr-row--${row.role}`]"
        :style="{ '--depth': row.depth }"
        @mouseenter="hoverIdx = i"
        @mouseleave="hoverIdx = -1"
        @focusin="hoverIdx = i"
        @focusout="hoverIdx = -1"
        tabindex="0"
      >
        <span class="ftr-glyph" aria-hidden="true">{{ glyph(row.kind) }}</span>
        <span class="ftr-name" :class="{ 'ftr-name--folder': row.kind === 'folder' }">
          {{ row.name }}
        </span>
        <span v-if="row.tooltip && hoverIdx === i" class="ftr-tooltip">
          — {{ row.tooltip }}
        </span>
      </li>
    </ul>
  </DiagramShell>
</template>

<style scoped>
.ftr-list {
  list-style: none;
  margin: 0;
  padding: 8px 4px;
  width: 100%;
  max-width: 520px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.6;
  color: hsl(var(--foreground));
}
.ftr-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 8px 3px calc(8px + var(--depth, 0) * 20px);
  border-radius: 4px;
  transition: background-color 0.15s var(--ease-out-spring);
  cursor: default;
  outline: none;
}
.ftr-row:hover,
.ftr-row:focus-visible {
  background: hsl(var(--muted) / 0.45);
}
.ftr-row:focus-visible {
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.ftr-glyph {
  flex-shrink: 0;
  width: 10px;
  color: hsl(var(--muted-foreground));
}
.ftr-name {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 500;
}
.ftr-name--folder { font-weight: 700; }
.ftr-tooltip {
  font-family: var(--font-sans);
  font-size: 10.5px;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  margin-left: 4px;
}

/* Role highlights — light mode: fill + foreground · dark mode: edge-tinted */
.ftr-row--primary .ftr-name {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
.ftr-row--secondary .ftr-name {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}
.ftr-row--accent .ftr-name {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
.ftr-row--support .ftr-name {
  background: hsl(var(--support));
  color: hsl(var(--support-foreground));
}
:global(body.dark) .ftr-row--primary   .ftr-name { border: 1px solid hsl(var(--primary-edge) / 0.55); }
:global(body.dark) .ftr-row--secondary .ftr-name { border: 1px solid hsl(var(--secondary-edge) / 0.55); }
:global(body.dark) .ftr-row--accent    .ftr-name { border: 1px solid hsl(var(--accent-edge) / 0.55); }
:global(body.dark) .ftr-row--support   .ftr-name { border: 1px solid hsl(var(--support-edge) / 0.55); }

@media (max-width: 640px) {
  .ftr-tooltip { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ftr-row {
    transition: none !important;
  }
}
</style>
