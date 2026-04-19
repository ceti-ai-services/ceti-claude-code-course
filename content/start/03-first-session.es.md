---
title: Tu primera sesión real. No un hola. Una respuesta útil.
module: "03"
time: "14 min"
tags: [first-session, scope, folder-discipline, bronze]
skills_gained: [scoping, first-prompt, folder-awareness]
persona_aware: true
---

# Tu primera sesión real. No un hola. Una respuesta útil.

Ya lo instalaste. Corriste `claude` por primera vez. Te dijo algo amable. Ahora estás viendo el cursor, y la verdad es esta: no sabes qué escribir primero.

No escribas "hola." No escribas "qué puedes hacer." No escribas nada hasta que hayas hecho una cosa: elegir la carpeta donde está tu trabajo real.

Este módulo es 80% sobre esa elección. La parte de escribir toma 30 segundos.

## La idea única: el alcance lo es todo

Cuando arrancas Claude Code en una carpeta, Claude puede leer todo lo que está adentro y en sus subcarpetas. No toda tu computadora. No tus otros proyectos. Solo ese árbol.

Eso no es una limitación. Es el feature.

<Callout variant="core-idea">
Donde lances Claude, ese es el universo en el que opera. Mueves el universo moviendo tu punto de arranque.
</Callout>

¿Quieres trabajar con tus borradores de cliente? Abre una terminal en tu carpeta `Clients`. ¿Quieres limpiar un export de tus DMs? Abre una en la carpeta donde está el export. ¿Quieres ordenar recibos? Ve a `Downloads` — o mejor, a una subcarpeta.

Regla general: mientras más pequeña y específica la carpeta, mejor va a ser tu primera sesión. Una carpeta con 10 archivos de una tarea le gana a una con 500 archivos de tres años de tu vida.

## El movimiento

1. Abre tu explorador de archivos (Finder en Mac, Explorer en Windows, Files en Linux).
2. Encuentra una carpeta que tenga **un lote de trabajo relacionado** — no todo tu árbol de Documents, no todo tu escritorio.
3. Click derecho sobre esa carpeta. En Mac: "Nueva Terminal en Carpeta." En Windows/Linux: "Abrir en Terminal" o equivalente. Si esa opción no aparece, abre la Terminal tú mismo y escribe `cd ` seguido de arrastrar la carpeta a la ventana de terminal — eso pega la ruta.
4. Escribe `claude` y presiona enter.

Ya estás dentro de Claude Code, con alcance en esa carpeta. Cada archivo adentro es legible. Nada de afuera lo es.

<Callout variant="warning">
No arranques Claude Code en tu carpeta home (`~` o `/Users/tunombre`) ni en tu escritorio. Ahí vive todo de años atrás — PDFs financieros, screenshots viejos, exports que ya habías olvidado. Arranca con alcance.

Si la carpeta que escogiste tiene trabajo que no te puedes dar el lujo de perder, duplícala primero — click derecho → Duplicar en Mac, Copiar + Pegar en Explorer en Windows. Haz que Claude trabaje contra la copia hasta que le tengas confianza a la sesión. La disciplina completa de deshacer la aprendes en el Módulo 04, pero el hábito de "haz una copia primero" vale la pena empezarlo ya.
</Callout>

## Qué preguntar primero

La mayoría de la gente desperdicia su primer prompt preguntando qué puede hacer Claude. Esa pregunta hazla en la documentación, no en la sesión.

Pregúntale a Claude qué tienes *tú*. Esa es la única pregunta que puede contestar mejor que tú:

> ¿Qué hay en esta carpeta y para qué es?

Ese es tu primer prompt. Es simple. Hace algo potente: Claude abre archivos, los revisa, y te devuelve un resumen de tu propio trabajo en español claro.

Te va a sorprender qué tan seguido el resumen es distinto de lo que *pensabas* que había ahí.

<PersonaExample>
  <template #creator>

  Escoge una carpeta donde has estado soltando activos de contenido — quizás `Content/2026/` o `Marca/Captions-lote/`. Abre Claude ahí. Pregunta "¿qué hay en esta carpeta y para qué es?" Claude te va a decir qué formatos hay, cuántos archivos, y una mejor apuesta sobre el tema. Luego prueba: "Agrúpalos en tres cubetas — publicado, programado, y borradores abandonados. Muéstrame los conteos."

  </template>
  <template #consultant>

  Escoge una carpeta de cliente — un solo cliente, no todo tu árbol `Clients/`. Algo como `Clientes/Acme/2026-Q1/`. Abre Claude ahí. Pregunta "¿qué hay en esta carpeta y para qué es?" Vas a obtener un resumen de briefs, borradores, facturas, notas. Luego prueba: "¿Qué es lo más reciente que hice para este cliente, y qué parece que están esperando de mí?"

  </template>
  <template #service>

  Escoge una carpeta donde guardas archivos operativos — quizás exports de reservas, una lista de precios, formularios de intake. Abre Claude ahí. Pregunta "¿qué hay en esta carpeta y para qué es?" Claude va a resumir los tipos de archivo y el propósito probable. Luego prueba: "Mira mi export de reservas más reciente y dime mis tres días más ocupados de este mes."

  </template>
  <template #realestate>

  Escoge la carpeta de una transacción — una sola propiedad, no toda tu base de datos. Algo como `Transacciones/145-Main-St/`. Abre Claude ahí. Pregunta "¿qué hay en esta carpeta y para qué es?" Claude va a resumir los documentos — contrato de listado, disclosures, inspección, comparables. Luego prueba: "¿Cuál es el documento más reciente, y qué es lo próximo que estoy esperando del otro lado?"

  </template>
</PersonaExample>

## La parte que hace que esto sea una sesión, no una consulta

Aquí está el cambio que la gente se salta: una vez que Claude leyó tu carpeta, estás en una conversación. Puedes seguir preguntando.

"Ahora agrúpalos por estado."
"Escribe un seguimiento para el más viejo."
"Redacta un resumen que pueda mandarle a mi jefe / socio / cliente."

Cada respuesta se queda en contexto. Claude recuerda lo que preguntaste hace dos preguntas. No tienes que volver a explicar.

Esto es lo que hace a Claude Code distinto de la versión chatbot: la sesión se sostiene. Una máquina expendedora se resetea entre transacciones. Un colega recuerda los últimos cinco minutos.

<Callout variant="tip">
Si sientes que deberías "empezar de cero" — no lo hagas. Mantén la sesión. Pregunta lo siguiente. Mientras más aprende Claude de tu carpeta, más afilada se pone cada respuesta.
</Callout>

## Cuándo cerrar la sesión

Escribe `/exit` o cierra la terminal cuando hayas terminado. Todo lo que Claude hizo con tus archivos ya está guardado — no se quedó con nada en la cabeza. La próxima vez que corras `claude` en esa carpeta, vas a arrancar una sesión nueva, y Claude va a volver a leer lo que le apuntes.

Las sesiones son baratas. Las carpetas son lo que importa.

<Recap>

Tu carpeta es tu marco. Arranca Claude Code dentro del pedazo específico de trabajo con el que quieres ayuda — no toda tu vida. Pídele que describa lo que hay antes de pedirle que haga algo. Después mantén la conversación andando. El trabajo mejora mientras Claude aprende qué está viendo.

</Recap>

<TryThis time="8 min">

Escoge una carpeta en tu computadora que tenga entre 5 y 20 archivos que has estado queriendo sacar. No todo tu Documents. El equivalente a una tarea de trabajo.

Abre Claude Code ahí. Pregunta: "¿Qué hay en esta carpeta y para qué es?"

Lee la respuesta. Luego haz una pregunta de seguimiento — algo específico sobre lo que acabas de aprender. A ver qué tan rápido llegas a *"ok, en realidad quiero hacer X con esto."*

Cuando cierres la sesión, escribe dos cosas: la carpeta que escogiste, y la primera cosa útil que Claude te dijo que tú no sabías ya. Guárdalas. Vas a volver a ellas en el Módulo 06.

</TryThis>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader what they found. Not rendered yet. -->
