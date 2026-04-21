---
title: Subagentes y trabajo en paralelo
module: "13"
time: "12 min"
tags: [subagents, parallel-work, delegation, task-tool, bronze]
skills_gained: [delegating-work, parallel-research, when-to-spawn]
persona_aware: false
---

# Subagentes y trabajo en paralelo

Claude en tu terminal es un trabajador con una ventana de contexto. La mayor parte del tiempo, eso alcanza. A veces el trabajo es demasiado ancho para un solo trabajador — demasiados archivos que leer, demasiados hilos que seguir, demasiado contexto que no cabe. Ahí es donde los subagentes se ganan su lugar.

## Qué es un subagente

Un subagente es una instancia fresca de Claude que tu sesión principal lanza para manejar una pieza acotada de trabajo. La sesión principal describe el trabajo, lo entrega, el subagente corre en su propio contexto, y cuando termina reporta de vuelta — normalmente con un resumen. La sesión principal mantiene su contexto limpio y decide qué hacer con el reporte.

<CourseDiagram id="m13-d1" />

Esto no se configura. Claude decide que una pieza de trabajo vale la pena delegarla, lanza, y o espera o sigue mientras el subagente corre.

<Callout variant="core-idea">
Un subagente es un trabajador al que Claude delega — describes el trabajo una vez, un contexto fresco lo termina.
</Callout>

## Cuándo usar uno

<CourseDiagram id="m13-d2" />

Tres patrones pagan confiablemente: investigación independiente sobre archivos que no dependen uno del otro, búsquedas amplias donde no sabes dónde vive la cosa, y tareas largas acotadas que producen una respuesta compacta. La forma es la misma cada vez — alta independencia, lectura pesada, retorno pequeño.

<CourseDiagram id="m13-d3" />

## Cuándo no usar uno

<CourseDiagram id="m13-d4" />

Los subagentes cuestan más que una llamada directa — contexto fresco, ciego a lo que tu sesión principal ha visto, overhead de coordinación. Si la tarea cabe en una respuesta de la sesión principal, usa la sesión principal.

La regla general: si estás por pegar un bloque gigante de texto en el prompt *"para que Claude tenga el contexto,"* o si estás por pedirle a Claude que haga cinco cosas no relacionadas en un mensaje, ese es el momento para un subagente (o varios en paralelo).

## Qué ve la sesión principal

Cuando un subagente termina, la sesión principal recibe su mensaje final — normalmente un resumen. La sesión principal no ve cada llamada de herramienta, cada archivo leído, cada pensamiento intermedio. Ese es el punto. Obtienes la respuesta sin el ruido.

Si necesitas el razonamiento intermedio, pídele al subagente que lo incluya en el resumen. *"Lanza un subagente de research para leer estos tres archivos y regresa con una síntesis de un párrafo más una lista con viñetas de los datos clave que encontró en cada archivo."*

<TryThis time="8 min">

Escoge una carpeta con al menos tres documentos distintos — una carpeta de proyecto, una carpeta de cliente, lo que tenga unos cuantos archivos que leer.

Lanza Claude en la carpeta. Pregunta: *"lanza un subagente de research para resumir tres archivos de esta carpeta en paralelo — escoge los tres más importantes — y regrésame con una síntesis de un párrafo sobre para qué es esta carpeta."*

Observa cómo corre. Claude debería identificar tres archivos, lanzar el subagente, y producir una síntesis cuando regrese. Nota cómo se ve el contexto de la sesión principal después — debería tener la síntesis, no los contenidos crudos de cada archivo.

Si la respuesta es floja, es porque el prompt del subagente fue flojo. Prueba otra vez: describe los tres archivos específicamente, di qué tipo de síntesis quieres, y nombra el formato. *"Un párrafo, sin listas, escrito como si le estuvieras describiendo esta carpeta a alguien nuevo en el equipo."*

</TryThis>

<Recap>

Un subagente es una instancia fresca de Claude lanzada desde tu sesión principal para manejar una tarea acotada. Úsalos para investigación independiente, búsquedas amplias, y tareas largas que producen respuestas compactas. No los uses para ediciones sueltas o preguntas que la sesión principal puede contestar directamente. La sesión principal solo ve el reporte final del subagente — mantén limpio el contexto principal y el detalle adentro del subagente. Una buena delegación le gana a diez malas.

</Recap>
