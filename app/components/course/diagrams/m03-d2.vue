<!--
  M03-D2 — The four-step "move" to open Claude in the right folder.
  Storyboard pattern — a left rail of steps with prose on the right.
-->
<script setup lang="ts">
import Storyboard from "@/components/course/patterns/Storyboard.vue"
import { useCustomizer } from "@/composables/useCustomizer"

const { lang } = useCustomizer()

const en = {
  title: "The move",
  caption: "Four clicks. Thirty seconds. One scoped session.",
  phases: [
    {
      title: "Open file manager",
      role: "support" as const,
      note: "Finder on Mac, Explorer on Windows, Files on Linux. Don't use the terminal yet.",
    },
    {
      title: "Pick one batch of work",
      role: "primary" as const,
      note: "One task, one project, one quarter. Not Documents. Not Desktop. The smaller, the sharper the first answer.",
    },
    {
      title: "Open terminal at folder",
      role: "secondary" as const,
      note: "Right-click the folder. Mac: 'New Terminal at Folder.' Windows/Linux: 'Open in Terminal.' If missing, drag the folder onto an open terminal after typing cd.",
    },
    {
      title: "Type claude",
      role: "accent" as const,
      note: "Press enter. You're now scoped to that folder. Everything inside is readable. Nothing outside is.",
    },
  ],
}

const es = {
  title: "El movimiento",
  caption: "Cuatro clics. Treinta segundos. Una sesión con alcance.",
  phases: [
    {
      title: "Abre el explorador",
      role: "support" as const,
      note: "Finder en Mac, Explorer en Windows, Files en Linux. Aún no uses la terminal.",
    },
    {
      title: "Escoge un lote de trabajo",
      role: "primary" as const,
      note: "Una tarea, un proyecto, un trimestre. No Documents. No el escritorio. Mientras más chico, más afilada la primera respuesta.",
    },
    {
      title: "Abre terminal en la carpeta",
      role: "secondary" as const,
      note: "Click derecho a la carpeta. Mac: 'Nueva Terminal en Carpeta.' Windows/Linux: 'Abrir en Terminal.' Si falta, arrastra la carpeta a una terminal abierta después de escribir cd.",
    },
    {
      title: "Escribe claude",
      role: "accent" as const,
      note: "Presiona enter. Ya estás con alcance en esa carpeta. Todo adentro es legible. Nada de afuera lo es.",
    },
  ],
}

const t = computed(() => (lang.value === "es" ? es : en))
</script>

<template>
  <Storyboard :title="t.title" :caption="t.caption" :phases="t.phases" />
</template>
