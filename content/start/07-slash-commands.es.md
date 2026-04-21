---
title: Comandos slash — prompts reutilizables que construyes una sola vez
module: "07"
time: "12 min"
tags: [slash-commands, reusable-prompts, workflow, bronze]
skills_gained: [writing-slash-commands, command-naming, prompt-reuse]
persona_aware: false
---

# Comandos slash — prompts reutilizables que construyes una sola vez

Para la tercera semana, vas a notar que has tecleado el mismo párrafo de apertura a Claude veinte veces. "Revisa el README, dime qué hace esta carpeta, marca cualquier cosa que esté desactualizada." Cada lunes. Mismo prompt. Los mismos treinta segundos de tecleo.

Para eso también hay un archivo.

## Un comando slash es un prompt con nombre

Un comando slash es un archivo markdown en `.claude/commands/` dentro de tu proyecto. El nombre del archivo se vuelve el comando. Guarda un archivo llamado `morning.md` y reinicia Claude en la carpeta — teclea `/` y ahí está.

<CourseDiagram id="m07-d1" />

El archivo tiene dos partes: un bloque corto de frontmatter que describe el comando, y un cuerpo que corre como el prompt, palabra por palabra.

<CourseDiagram id="m07-d2" />

<Callout variant="core-idea">
Un comando slash es un prompt que escribiste ayer, esperando en un menú.
</Callout>

## Convenciones de nombres que envejecen bien

El nombre del comando es el nombre que vas a teclear bajo presión de tiempo — trátalo como un atajo de teclado, no como un nombre de archivo.

<CourseDiagram id="m07-d3" />

Un comando slash le gana a teclearlo de nuevo por tres razones. Una, el prompt deja de derivar — dejas de agregar ediciones tipo "ah, y también" cada vez que lo tecleas desde cero. Dos, puedes compartir la carpeta con alguien más y los comandos vienen incluidos. Tres, refinar el prompt significa editar un archivo, no tratar de acordarte de qué cambiaste la sesión pasada.

## Cómo esto se diferencia de CLAUDE.md

CLAUDE.md es ambiente. Carga una vez por sesión y moldea todo calladamente. Un comando slash es explícito — lo invocas, corre, ves el output. CLAUDE.md dice *quién eres*. Un comando slash dice *haz esta cosa específica ahora mismo, de la forma en que normalmente la quiero hecha*.

<TryThis time="8 min">

En la carpeta de tu proyecto, crea la ruta `.claude/commands/` si no existe. Dentro, crea un archivo llamado `summarize-readme.md`. Escribe tres líneas — frontmatter con una descripción, y luego un cuerpo que le pida a Claude resumir el README de la carpeta actual en tres viñetas.

```markdown
---
description: Three-bullet summary of the current folder's README
---

Read the README in this folder. Give me three bullets: what this
project does, who it's for, and what state it's currently in.
```

Guarda. Reinicia Claude en esa carpeta. Teclea `/summarize-readme`. Lee la respuesta. Si el output es muy largo, edita el cuerpo para que diga "una oración por viñeta." Guarda, corre de nuevo. Ese es el loop entero.

</TryThis>

## Cuándo crear uno

La regla del tres. Si has tecleado una variante del mismo prompt tres veces, es un comando slash. No dos. Tres. Dos todavía es coincidencia — tres es patrón. El primero que escribes te toma diez minutos porque estás aprendiendo la forma. El segundo toma dos. Después de eso, no cuestan nada.

<CourseDiagram id="m07-d4" />

<Recap>

Los comandos slash viven en `.claude/commands/<nombre>.md`. El frontmatter describe. El cuerpo corre como prompt cuando invocas `/<nombre>`. Hacen que tus prompts repetidos sean concretos, compartibles, y fáciles de refinar. Nombres de verbo cortos, un comando por archivo, y la regla del tres antes de escribir uno. CLAUDE.md es el documento de briefing — los comandos slash son los atajos.

</Recap>
