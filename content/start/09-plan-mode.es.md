---
title: Modo plan — piensa antes de actuar, haz dry-run de tu trabajo
module: "09"
time: "10 min"
tags: [plan-mode, safety, dry-run, bronze]
skills_gained: [using-plan-mode, reviewing-plans, safe-execution]
persona_aware: false
---

# Modo plan — piensa antes de actuar, haz dry-run de tu trabajo

Hay un hueco entre *"Claude, renombra estos veinte archivos"* y el primer archivo efectivamente renombrado. Ese hueco es donde una mala idea o se atrapa o se compromete. El modo plan ensancha el hueco a propósito.

## Qué es el modo plan

Modo plan es un estado en el que Claude corre donde puede leer tus archivos, buscar, y pensar, pero no puede escribir, editar, correr comandos de shell, ni mutar nada. Pides un cambio. En lugar de hacerlo, Claude produce un plan — una lista numerada de lo que haría, a qué archivos, en qué orden. Lees el plan. Apruebas, rechazas, o redirijes.

<CourseDiagram id="m09-d1" />

Entras al modo plan con `shift-tab` (cicla entre modos) o diciéndole a Claude sin rodeos: *"usa modo plan para esto."* De ese punto en adelante, cualquier operación que cambie archivos es un dry-run hasta que salgas.

<Callout variant="core-idea">
El modo plan te deja ver el plan antes de ver la edición — dry-run, solo lectura.
</Callout>

## Cuándo usarlo

Cada vez que el cambio toca más de un archivo. Cada vez que la operación es difícil de deshacer. Cada vez que no estás seguro de que Claude entendió el alcance. El costo del modo plan son veinte segundos de lectura. El costo de saltártelo es como haya quedado la peor versión de la edición.

<CourseDiagram id="m09-d3" />

## Aprobar, rechazar, redirigir

Cuando Claude te da el plan, tienes tres respuestas — y la tercera es la que más gente olvida.

<CourseDiagram id="m09-d2" />

Redirigir es el movimiento que importa. *"Los pasos uno al cuatro están bien. El paso cinco está mal — no toques nada en la carpeta `archive/`."* Claude revisa. Tú relees. Ese es el loop completo.

<CourseDiagram id="m09-d4" />

<TryThis time="8 min">

Crea una carpeta de prueba en cualquier lado — `~/Documents/claude-plan-test/`. Mete tres archivos de texto dummy con el contenido que quieras.

Lanza Claude en esa carpeta. Prende el modo plan (`shift-tab` hasta que veas el indicador) o di *"usa modo plan."* Pídele a Claude: *"renombra los tres archivos para que usen la fecha de hoy como prefijo y normaliza los nombres a minúsculas con guiones."*

Lee el plan. Nota qué propone hacer Claude, en qué orden, a qué archivos. Si se ve bien, sal del modo plan y déjalo correr. Si le falta un archivo o está proponiendo algo que no querías, redirige — dile qué cambiar. Relee el plan revisado. Luego ejecuta.

</TryThis>

<Recap>

El modo plan es solo lectura. Pides un cambio, Claude produce un plan en dry-run, apruebas o redirijes antes de que cualquier archivo sea tocado. Entras con `shift-tab` o diciéndolo. Úsalo cuando la operación abarque más de un archivo o sea difícil de deshacer. Planear, leer, aprobar, ejecutar — el minuto extra al inicio te ahorra la hora de limpieza al final.

</Recap>
