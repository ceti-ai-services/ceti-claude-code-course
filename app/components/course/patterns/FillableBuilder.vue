<!--
  FillableBuilder — two-column split: labeled inputs on left,
  live-updating monospace preview on right.
  Mobile (<640px): preview stacks below inputs.

  Pattern ref: PATTERNS.md §8 · patterns-extended-rb.jsx PFillableBuilder
-->
<script setup lang="ts">
import DiagramShell from "@/components/course/_primitives/DiagramShell.vue"
import CopyButton from "@/components/course/_primitives/CopyButton.vue"

type Field = {
  label: string
  key: string
  placeholder?: string
  hint?: string
  kind?: "text" | "textarea" | "select"
  options?: string[]
}

const props = withDefaults(
  defineProps<{
    title: string
    caption?: string
    fields: Field[]
    /** Template string with {{key}} placeholders */
    previewTemplate: string
    previewLang?: "markdown" | "bash" | "text"
  }>(),
  { caption: "", previewLang: "markdown" },
)

const clampedFields = computed(() => props.fields.slice(0, 6))

const values = reactive<Record<string, string>>({})

// seed initial values (placeholder or first select option)
clampedFields.value.forEach((f) => {
  if (values[f.key] === undefined) {
    if (f.kind === "select" && f.options?.length) {
      values[f.key] = f.options[0] ?? ""
    } else {
      values[f.key] = f.placeholder ?? ""
    }
  }
})

const rendered = computed(() => {
  return props.previewTemplate.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k: string) => {
    const v = values[k]
    return v === undefined || v === "" ? `·${k}·` : v
  })
})
</script>

<template>
  <DiagramShell :title="title" :caption="caption" :min-body-height="260">
    <div class="fb-grid">
      <div class="fb-inputs">
        <label
          v-for="f in clampedFields"
          :key="f.key"
          class="fb-field"
        >
          <span class="fb-label">{{ f.label.toUpperCase() }}</span>
          <textarea
            v-if="f.kind === 'textarea'"
            v-model="values[f.key]"
            :placeholder="f.placeholder"
            class="fb-textarea"
            rows="2"
          />
          <select
            v-else-if="f.kind === 'select'"
            v-model="values[f.key]"
            class="fb-select"
          >
            <option
              v-for="o in f.options"
              :key="o"
              :value="o"
            >
              {{ o }}
            </option>
          </select>
          <input
            v-else
            v-model="values[f.key]"
            type="text"
            :placeholder="f.placeholder"
            class="fb-input"
          >
          <span v-if="f.hint" class="fb-hint">{{ f.hint }}</span>
        </label>
      </div>
      <div class="fb-preview copy-host" :data-lang="previewLang">
        <pre class="fb-pre"><code>{{ rendered }}</code></pre>
        <CopyButton :text="rendered" label="Copy preview" />
      </div>
    </div>
  </DiagramShell>
</template>

<style scoped>
.fb-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  width: 100%;
  max-width: 560px;
  align-items: stretch;
}
.fb-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fb-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fb-label {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
}
.fb-input, .fb-textarea, .fb-select {
  font: inherit;
  font-size: 11.5px;
  font-family: var(--font-sans);
  color: hsl(var(--foreground));
  background: hsl(var(--muted) / 0.4);
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  padding: 6px 9px;
  outline: none;
  transition: border-color 0.15s var(--ease-out-spring);
  width: 100%;
  box-sizing: border-box;
}
.fb-textarea {
  font-family: var(--font-mono);
  resize: vertical;
  min-height: 40px;
  line-height: 1.45;
}
.fb-input:focus, .fb-textarea:focus, .fb-select:focus {
  border-color: hsl(var(--accent-edge) / 0.6);
  box-shadow: 0 0 0 2px hsl(var(--accent-edge) / 0.18);
}
.fb-hint {
  font-size: 10px;
  color: hsl(var(--muted-foreground));
  font-style: italic;
}
.fb-preview {
  position: relative;
  background: hsl(var(--foreground) / 0.06);
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  padding: 10px 12px;
  overflow: hidden;
  min-height: 160px;
}
:global(body.dark) .fb-preview {
  background: hsl(var(--background) / 0.75);
  border-color: hsl(var(--primary-edge) / 0.3);
}
.fb-pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 10.5px;
  line-height: 1.55;
  color: hsl(var(--foreground));
  white-space: pre-wrap;
  word-break: break-word;
}
@media (max-width: 640px) {
  .fb-grid { grid-template-columns: 1fr; }
}
</style>
