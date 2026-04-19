---
title: Archivos, permisos, y deshacer
module: "04"
time: "12 min"
tags: [permissions, approval, safety, bronze]
skills_gained: [approval-flow, permission-modes, backup-habit]
persona_aware: false
---

# Archivos, permisos, y deshacer

Hasta aquí solo le has pedido a Claude que lea. El siguiente paso — y el que más pone nerviosa a la gente — es dejarlo cambiar cosas. Esta lección cubre el sistema de permisos que te mantiene en control, los modos que ajustan qué tan seguido Claude pregunta, y un pequeño hábito previo al despegue que hace que "deshacer" casi siempre sea posible.

## El ciclo de aprobación

Cada acción que cambia un archivo en tu computadora pasa por el mismo patrón:

1. Le pides a Claude que haga algo.
2. Claude decide que hace falta una edición y la propone.
3. Claude te muestra el cambio propuesto y te pide aprobación.
4. Apruebas o rechazas.
5. Solo después de aprobar el archivo cambia de verdad.

Por defecto, no hay manera de saltarse el paso 3. Claude no puede reescribir un documento en silencio. No puede borrar un archivo sin decirte. No va a correr un comando de shell sin sacarlo a la superficie primero. Cuando quiere hacer algo, aparece un prompt en la terminal — usualmente con el nombre del archivo, un resumen del cambio, y opciones como "Sí," "No," o "Sí, y haz cosas similares automáticamente por el resto de esta tarea."

<Callout variant="approval">
Lee cada prompt. Sobre todo al principio. Dos segundos de fricción por aprobación es el precio de saber exactamente qué le pasó a tus archivos. Conforme vas construyendo confianza, vas a empezar a escanear las aprobaciones en lugar de leer cada línea — eso está bien, eso se gana. En la primera semana, léelas.
</Callout>

Cuando rechazas, Claude no se molesta. Se ajusta. Puede preguntar algo para aclarar, proponer un cambio más chico, o decirte que no puede seguir sin eso que acabas de rechazar. Ese ida y vuelta es el feature de seguridad funcionando.

## Qué te muestra el prompt de aprobación

Para ediciones a archivos de texto — Markdown, texto plano, código, CSV — el prompt de aprobación te muestra un **diff**: una comparación lado a lado del texto viejo y el nuevo, con los cambios resaltados. Las líneas que se están quitando se marcan de una forma, las que se agregan de otra. No necesitas entender cada detalle del diff — estás buscando dos cosas. Primero, *¿solo está cambiando la parte que dijo que iba a cambiar?* Segundo, *¿la versión nueva se ve sensata?* Si las dos, aprueba. Si alguna está rara, rechaza y pídele a Claude que achique el cambio.

Para mover archivos, crear archivos, o comandos de shell, el prompt te muestra el comando exacto que está a punto de correr. "Mover 3 archivos de /Downloads a /Downloads/archive." "Borrar thumbs.db." "Crear carpeta llamada 2025-Q1." Las mismas dos preguntas: ¿es lo que pedí, y se ve sensato?

## Modos de permiso

Hay tres modos con los que te vas a topar, que controlan qué tan seguido Claude pregunta:

**Modo default** (a veces llamado *ask*): el comportamiento descrito arriba. Claude propone, tú apruebas, cada acción. Aquí es donde debes vivir hasta que la herramienta se sienta natural — probablemente tus primeras semanas.

**Modo acceptEdits**: Claude deja de pedir aprobaciones para ediciones de archivo dentro de la sesión actual. Los comandos de shell siguen pidiendo aprobación. Es la marcha intermedia. Sirve cuando estás en una tarea larga y repetitiva de edición y confías en el patrón de Claude — reformatear veinte notas de reunión, por ejemplo, donde la primera edición ya te enseñó cómo queda el resultado. No arranques una sesión nueva en este modo.

**Modo plan**: Claude no cambia absolutamente nada. Planea — describe en español claro qué haría, lista los archivos que tocaría, y se detiene. Tú lees el plan, decides si te gusta, y te cambias a un modo normal para ejecutar. Es el modo para carpetas sensibles o territorio desconocido. "Muéstrame qué harías, pero no lo hagas todavía."

Durante la primera semana, quédate en modo default. Puedes cambiar de modo desde dentro de Claude escribiendo un slash command (el prompt `>` los acepta), pero el modo que quieres al principio es el que pregunta cada vez. La fricción es el feature.

## La respuesta real a deshacer es git

Si esta frase no te dice nada, sáltate el párrafo y lee la sección siguiente. Para quienes ya saben: si la carpeta donde estás trabajando es un repositorio git, deshacer es gratis. Los cambios de Claude aterrizan como ediciones sin commit, `git diff` te muestra todo lo que cambió en esta sesión, y `git checkout .` revierte todo. El control de versiones es la red de seguridad canónica, y si haces algún trabajo serio en Claude Code eventualmente vas a querer aprenderlo — pero no hoy. No lo necesitas para empezar.

## La copia previa al despegue

Para todos los que no están usando git — que es la mayoría de quienes leen esto — el deshacer práctico es un hábito más simple: **antes de pedirle a Claude que edite un archivo, duplícalo primero.**

Digamos que tienes un archivo llamado `notas-reunion.md` en tu escritorio. Antes de dejar que Claude lo reformatee, haz una copia:

```bash
cp notas-reunion.md notas-reunion.backup.md
```

O simplemente click derecho al archivo en Finder o en el Explorador y escoge "Duplicar." El objetivo es idéntico: una segunda copia del archivo al lado del original, con un nombre ligeramente distinto. Si la edición de Claude sale mal — no te gusta el resultado, se quitó algo importante, el formato quedó peor que antes — borras la versión editada y renombras el backup.

Para carpetas con unos cuantos archivos importantes, duplica la carpeta entera. Para una sesión larga, hazlo una vez al principio. Vas a tirar el backup el noventa y cinco por ciento de las veces. El otro cinco por ciento, los treinta segundos que gastaste copiando se van a sentir como la mejor inversión de tu día.

Esto no es una estrategia sofisticada de control de versiones. Es el equivalente manual de git para un documento. Ese es el punto. Es lo bastante rápido como para que de hecho lo hagas.

## Cuándo aprobar, cuándo rechazar

Aprueba cuando:

- El diff o el comando calza con lo que pediste.
- El archivo que se está cambiando es el que querías cambiar.
- Puedes explicar, en una oración, qué está a punto de pasar.

Rechaza cuando:

- El cambio es más grande de lo que esperabas. Que Claude proponga editar seis archivos cuando le preguntaste sobre uno es razón para detenerte y preguntarle qué cree que está haciendo.
- Algo está a punto de borrarse y no estás 100% seguro de quererlo.
- Un comando de shell hace referencia a una ruta fuera de la carpeta donde estás trabajando.
- No hiciste un backup del archivo, y el archivo importa.

Rechazar no es fracaso. Es parte de la conversación. "No hagas eso — achiquemos el alcance. Solo cambia el primer párrafo" es un turno siguiente completamente válido, y Claude se va a ajustar.

<Recap>

Cada acción que cambia archivos en Claude Code pasa por un prompt de aprobación — un diff para ediciones de texto, el comando exacto para todo lo demás. Tres modos de permiso: default (preguntar cada vez), acceptEdits (ediciones de archivo en silencio, comandos siguen con aprobación), plan (nada cambia, Claude solo describe). Default es donde vives hasta que la herramienta se sienta natural. El hábito de deshacer más útil: duplica el archivo antes de dejar que Claude lo toque.

</Recap>

<TryThis time="8 min">

Encuentra un archivo de texto corto en tu computadora — notas de una reunión, un borrador de correo, un párrafo que escribiste en un `.txt` o `.md`. Algo de menos de una página. Duplícalo primero.

Ahora abre Claude Code en la misma carpeta (`cd` dentro, luego `claude`) y pregunta:

```
lee notas-reunion.md y arregla su formato — viñetas consistentes, encabezados correctos, sin espacios en blanco al final
```

Usa el nombre real de tu archivo. Claude va a leer el archivo y a proponer una edición. Mira el diff. Apruébalo si se ve bien. Rechaza si no, y pide un cambio más acotado.

Cuando la edición esté hecha, abre el archivo y lee el resultado. Si te gusta, borra el backup. Si no, borra la versión editada y renombra el backup — ese es tu deshacer. De cualquier modo, acabas de pasar por el ciclo completo de una edición real, bajo aprobación, con red de seguridad. Cada edición futura es una variación de este mismo patrón.

</TryThis>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader whether they approved or denied, and what the diff caught that they might have missed. Not rendered yet. -->
