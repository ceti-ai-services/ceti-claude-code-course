---
title: Integración con Git — commits, branches, PRs a través de Claude
module: "12"
time: "12 min"
tags: [git, version-control, commits, pull-requests, bronze]
skills_gained: [git-with-claude, reviewing-diffs, honest-commit-messages]
persona_aware: false
---

# Integración con Git — commits, branches, PRs a través de Claude

Si ya has usado Git antes, todo lo que sabes sigue aplicando. Claude no reemplaza Git — usa Git como lo haría un colega cuidadoso, parando para mostrarte qué está a punto de pasar en cada paso que importa.

## La forma de una sesión de Git con Claude

Le pides a Claude que haga un cambio. Claude propone el plan. Apruebas. Claude corre las ediciones. Ahora hay cambios sin commit en tu working tree. Aquí es donde normalmente empieza Git.

Pídele a Claude abrir una branch, hacer staging de los archivos relevantes, y escribir un commit message. Cada uno de esos pasos es una llamada de herramienta que apruebas. La branch se crea con un nombre que describe el cambio. El paso de staging te muestra exactamente qué archivos está agregando — lee la lista antes de aprobar, porque aquí es donde se cuela el scope creep. Luego Claude redacta el commit message.

<Callout variant="core-idea">
Claude puede abrir una branch, hacer el cambio, hacer staging, y escribir un commit message que diga la verdad — tú sigues aprobando el push.
</Callout>

## Commit messages que dicen la verdad

La mayoría de los commit messages generados por IA son malos porque resumen el diff en lenguaje adulador. *"Improved error handling and enhanced logging."* Sin significado. Claude, bien prompteado, escribe el tipo opuesto de mensaje — uno que nombra qué cambió y por qué.

<CourseDiagram id="m12-d1" />

Si lees el mensaje y todavía no sabes qué hace el commit, devuélvelo: *"reescríbelo — dime cómo era el comportamiento antes y cómo es ahora."* Lee cada commit message en voz alta antes de aprobar. Si suena a copy de marketing, está mal. Si suena a una nota que le dejarías al siguiente ingeniero, está bien.

## El patrón del PR en draft

Para cualquier cosa no trivial, pushea a una branch y abre un pull request en draft en lugar de hacer commit directo a main. Pídele a Claude: *"pushea esta branch y abre un PR en draft contra main, con una descripción que resuma el cambio y liste qué todavía necesita revisión."*

<CourseDiagram id="m12-d2" />

## Qué nunca dejar que Claude haga

<CourseDiagram id="m12-d3" />

<Callout variant="warning">
Claude a veces intenta ser útil de formas que son activamente peligrosas en un repo compartido — force-push para arreglar una "historia desordenada," `--no-verify` para pasar un hook que falla, `git add .` que barre un secreto. El prompt de aprobación es tu última línea de defensa. Léelo.
</Callout>

<CourseDiagram id="m12-d4" />

<TryThis time="8 min">

Abre un repo de prueba — o clona algo pequeño que puedas tirar. Crea una branch con `git checkout -b claude-test` antes de empezar, para que no estés en main.

Pídele a Claude hacer un cambio pequeño. Un fix de typo en un README. Una línea nueva en un archivo de config. Algo trivial. Deja que Claude proponga la edición, apruébala, y luego pregunta: *"haz staging de este archivo y escribe un commit message."*

Lee el mensaje que Claude redacta. Léelo en voz alta. ¿Es honesto? ¿Describe qué cambió y por qué? Si es vago, pídele a Claude reescribirlo. Cuando el mensaje esté bien, aprueba el commit.

Deja la branch sin pushear al remote. Acabas de recorrer el loop completo — editar, stagear, mensaje, commit — con aprobaciones en cada paso, y nada salió de la máquina.

</TryThis>

<Recap>

Claude usa Git como tú lo harías — branch, editar, stagear, commit, push — pero cada paso es una llamada de herramienta que puedes leer y aprobar. Los commit messages deben describir qué cambió y por qué, no elogiar el cambio. Los PRs en draft le ganan a los pushes directos a main para cualquier cosa no trivial. Nunca dejes que Claude haga force-push, se salte hooks, ni haga commit de secretos. Lee el mensaje en voz alta antes de aprobar el commit — los dos segundos son cómo mantienes la historia de Git honesta.

</Recap>
