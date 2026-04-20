<script setup lang="ts">
import { computed } from "vue"
import MissionBrief from "@/components/course/MissionBrief.vue"
import TerminalDemo from "@/components/course/TerminalDemo.vue"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

interface LineDef {
  kind: "prompt" | "out" | "ok" | "warn" | "meta"
  text: string
}

const macLines: LineDef[] = [
  { kind: "prompt", text: "node --version" },
  { kind: "out", text: "v20.11.1" },
  { kind: "prompt", text: "npm install -g @anthropic-ai/claude-code" },
  { kind: "ok", text: "added 1 package in 4s" },
  { kind: "prompt", text: "claude" },
  { kind: "out", text: "Welcome. Sign in with Claude.ai or API key." },
  { kind: "meta", text: "(authentication opens in your browser)" },
]

const winLines: LineDef[] = [
  { kind: "prompt", text: "node --version" },
  { kind: "out", text: "v20.11.1" },
  { kind: "prompt", text: "npm install -g @anthropic-ai/claude-code" },
  { kind: "ok", text: "added 1 package in 5s" },
  { kind: "prompt", text: "claude" },
  { kind: "meta", text: "(if errors persist, try WSL: wsl --install)" },
]

const linLines: LineDef[] = [
  { kind: "prompt", text: "node --version" },
  { kind: "out", text: "v20.11.1" },
  { kind: "prompt", text: "sudo npm install -g @anthropic-ai/claude-code" },
  { kind: "ok", text: "added 1 package" },
  { kind: "prompt", text: "claude" },
]

const en = {
  codename: "M02 · INSTALL",
  title: "Install Claude Code",
  analogy: "Different launch pads. Same install command.",
  chips: [
    { label: "Node 18+" },
    { label: "One npm command" },
    { label: "Pick your OS" },
  ],
  time: "14 min",
  labels: { mac: "Mac", win: "Windows", lin: "Linux" },
}

const es = {
  codename: "M02 · INSTALACIÓN",
  title: "Instalar Claude Code",
  analogy: "Distintas plataformas. Mismo comando de instalación.",
  chips: [
    { label: "Node 18+" },
    { label: "Un comando npm" },
    { label: "Elige tu sistema" },
  ],
  time: "14 min",
  labels: { mac: "Mac", win: "Windows", lin: "Linux" },
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <MissionBrief
    :codename="t.codename"
    :title="t.title"
    :analogy="t.analogy"
    :objectives="t.chips"
    :time="t.time"
  />
  <Tabs default-value="mac" class="my-7">
    <TabsList class="grid w-full grid-cols-3">
      <TabsTrigger value="mac">{{ t.labels.mac }}</TabsTrigger>
      <TabsTrigger value="win">{{ t.labels.win }}</TabsTrigger>
      <TabsTrigger value="lin">{{ t.labels.lin }}</TabsTrigger>
    </TabsList>
    <TabsContent value="mac">
      <TerminalDemo
        title="Terminal · macOS"
        dir="~"
        :lines="macLines"
        :autoplay="true"
        :replayable="true"
      />
    </TabsContent>
    <TabsContent value="win">
      <TerminalDemo
        title="PowerShell · Windows"
        dir="C:\Users\you"
        :lines="winLines"
        :autoplay="true"
        :replayable="true"
      />
    </TabsContent>
    <TabsContent value="lin">
      <TerminalDemo
        title="Terminal · Linux"
        dir="~"
        :lines="linLines"
        :autoplay="true"
        :replayable="true"
      />
    </TabsContent>
  </Tabs>
</template>
