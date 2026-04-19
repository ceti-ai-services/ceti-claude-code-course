---
title: Enséñale una vez. Deja que recuerde para siempre.
module: "05"
time: "13 min"
tags: [claude-md, project-memory, context, bronze]
skills_gained: [writing-claude-md, project-memory, persistent-context]
persona_aware: true
---

# Enséñale una vez. Deja que recuerde para siempre.

Tres sesiones adentro, lo vas a notar. Las mismas dos oraciones al principio de cada prompt.

*"Solo un recordatorio — soy [lo que seas], mis clientes son [quienes sean], mantén el tono [como lo quieras]."*

Lo escribes. Claude responde bien. Cierras la sesión. Mañana abres una nueva y lo escribes otra vez. Quizás con un typo. Quizás sin la tercera cosa que siempre se te olvida mencionar. El impuesto de reintroducción es real, y se paga en la peor moneda — los primeros tres minutos de cada sesión, cada día.

Hay un archivo que termina con esto. Se llama `CLAUDE.md`. Vive en tu carpeta. Claude lo lee automáticamente al principio de cada sesión en esa carpeta. Lo escribes una vez. La reintroducción se acaba.

## Qué es CLAUDE.md en realidad

Es un archivo de texto plano. Markdown — el mismo formato en el que están escritas estas lecciones. Lo puedes hacer en cualquier editor de texto, en Finder, en la terminal, donde sea.

Cuando arrancas Claude en una carpeta que tiene un `CLAUDE.md`, Claude lo abre antes de decir hola. Lo que esté en ese archivo se convierte en el contexto ambiente de la sesión. Quién eres, para qué es esta carpeta, cuáles son tus estándares — todo disponible para Claude sin que tengas que decir nada en voz alta.

<Callout variant="core-idea">
CLAUDE.md no es un prompt. No es un slash command. Es un archivo que vive en la carpeta. Claude lo lee al inicio de la sesión. Ese es el mecanismo entero.
</Callout>

Tampoco es magia. Si tu archivo dice "siempre usa inglés británico" y tú le pides a Claude que "escribe este en americano," Claude usa americano. El archivo es el default, no una esposa. No pierdes control al escribirlo — estás fijando el piso.

## Las cuatro cosas que vale la pena escribir

Un CLAUDE.md útil responde cuatro preguntas. No necesitas encabezados para cada una. Lo puedes escribir como un párrafo corto. Pero estos cuatro ejes son donde está el valor.

**¿Quién soy?** Una oración. Tu rol, qué haces, para quién. Mientras más específico, mejor quedan los defaults de Claude.

**¿Para qué es esta carpeta?** Una o dos oraciones. El propósito de esta carpeta en específico y qué tipo de trabajo vive en ella.

**¿Qué convenciones me importan?** Cualquier cosa que te encuentres re-explicando. Patrones de nombres. Tono. Palabras que no usas. Formas de output que prefieres.

**¿Quién lee lo que sale de aquí?** Si la mayoría de lo que se produce en esta carpeta va a una audiencia específica — clientes, tu pareja, una demografía específica de Instagram, un inspector — ponles nombre.

Mantenlo corto. Una pantalla es ideal. Un CLAUDE.md de dos páginas es peor que uno de seis líneas, porque tu yo futuro tiene que mantenerlo.

## Cuatro versiones. Escoge la más cercana a la tuya.

Así se ve esto llenado para cuatro personas muy distintas. Lee la más cercana a tu trabajo. Roba lo que te sirva. Modifica el resto.

<PersonaExample>
  <template #creator>

  ```markdown
  # Contexto para Claude

  ## Quién soy
  Llevo un newsletter + canal de YouTube sobre organización del hogar
  para gente con TDAH. ~18k subs entre los dos. Operación solo.

  ## Para qué es esta carpeta
  Lotes de contenido — guiones, borradores de caption, cuerpos de
  newsletter, notas de investigación. Organizados por semana, a veces
  por tema.

  ## Cómo escribo
  - Oraciones cortas. Seco. Nunca efusivo.
  - Nunca uses las palabras "hack," "cambia-vidas," o "productividad."
  - Ejemplos sacados de mi propio desastre, no del de otros.

  ## Audiencia
  Mujeres de 28 a 45 que ya probaron los sistemas de moda y rebotaron.
  Están cansadas de que les vendan. Asume que son inteligentes y están
  quemadas.

  ## Nunca hagas
  - Sugerir que compre apps o cursos en el guion.
  - Reescribir mi voz — apriétala, no la reemplaces.
  ```

  </template>
  <template #consultant>

  ```markdown
  # Contexto para Claude

  ## Quién soy
  Estratega de marca independiente. Diez años adentro. Tres clientes de
  retainer, un cliente de proyecto a la vez. Cobro por hora y detesto
  que se expanda el alcance.

  ## Para qué es esta carpeta
  Trabajo activo de cliente para Meridian Foods — su proyecto de
  rebranding. Briefs, decks, correos al cliente, notas de reunión,
  mi propia investigación.

  ## Cómo trabajo
  - Directo, sin relleno. El cliente es senior — no sobreexpliques.
  - Cuando pido un borrador, default corto. Yo pido si quiero más.
  - Marca cualquier cosa que suene a que estoy tratando demasiado.

  ## Audiencia de los outputs
  La CMO de Meridian (lee rápido, odia los adjetivos) y su junta
  (quieren números y resúmenes de una página, no ensayos de estrategia).

  ## Nunca hagas
  - Proponer alcance más allá del SOW vigente.
  - Usar "potenciar" como verbo. Jamás.
  ```

  </template>
  <template #service>

  ```markdown
  # Contexto para Claude

  ## Quién soy
  Tengo un salón pequeño en Medellín — dos sillas, yo más una estilista.
  Hacemos cortes, color, y novias. Las reservas entran sobre todo por
  mensaje de texto.

  ## Para qué es esta carpeta
  La administración de mi negocio — exports de reservas, notas de
  clientas, lista de precios, facturas de proveedores, el historial de
  WhatsApp que a veces exporto.

  ## Cómo les hablo a las clientas
  - Cálida pero profesional. Usted para clientas nuevas, vos para las
    de cajón.
  - Nunca uses emojis en conversaciones de precio.
  - Confirma las citas con hora + servicio + estilista, nada más.

  ## Audiencia de los outputs
  Clientas por WhatsApp (corto, casual) y mi contador (solo los
  números, en una tabla).

  ## Nunca hagas
  - Inventar precios. Si no lo ves en lista-precios.md, pregúntame.
  - Compartir o mencionar info de otras clientas cuando redactes
    una respuesta.
  ```

  </template>
  <template #realestate>

  ```markdown
  # Contexto para Claude

  ## Quién soy
  Bróker residencial en Ciudad de México. 12 años adentro. Trabajo
  sobre todo con compradores de 3 a 8 millones de pesos, unas cuantas
  propiedades en listado por trimestre.

  ## Para qué es esta carpeta
  Una transacción: el listado de Av. Reforma 145. Exports del MLS
  (el sistema de listados que uses), CSVs de comparables, disclosures,
  PDFs de inspección, mi correspondencia con compradores.

  ## Cómo les escribo a los clientes
  - Español claro, nada de jerga del MLS. Los compradores son
    primerizos.
  - Números primero, narrativa después. Nunca entierres la petición.
  - El lenguaje de disclosure queda exacto. No parafrasees lo que
    dijo el reporte de inspección — cítalo.

  ## Audiencia de los outputs
  Compradores (cálido, específico), mi bróker (marca cualquier cosa
  que necesite una segunda lectura), el otro agente (profesional,
  breve).

  ## Nunca hagas
  - Dar consejo legal. Marca cualquier cosa que necesite al abogado.
  - Inventar comparables. Solo usa números de los CSVs en /comps.
  ```

  </template>
</PersonaExample>

Fíjate en lo que hay en las cuatro: audiencia específica, voz específica, "nunca hagas" específico. Fíjate en lo que no hay: ninguna descripción de puesto para Claude, ningún "eres un asistente útil." No le estás haciendo prompt a Claude — le estás dando un briefing sobre *ti*.

## Proyecto le gana a global. Esa es la regla de prioridad entera.

Eventualmente vas a leer que Claude Code revisa varios archivos CLAUDE.md — uno global, uno de proyecto, a veces uno local. Por ahora ignora los demás.

<Callout variant="tip">
El que importa es el CLAUDE.md que vive en la carpeta desde la que lanzaste. Ese es tu archivo de proyecto. Gana sobre cualquier global. El noventa por ciento de tu contexto útil es específico de la carpeta de todos modos — el cliente, el tono, la audiencia, lo que está en juego. Escribe un CLAUDE.md de proyecto bueno y ya está.
</Callout>

Si más adelante te encuentras re-escribiendo lo mismo *universal* ("estoy en México, mi jornada es de 9 a 6, prefiero español de México") en varios CLAUDE.mds, ese es el momento en que uno global empieza a ganarse su lugar. Antes no.

## Lo que la gente entiende mal

El error es escribir CLAUDE.md como si fuera un prompt.

"Eres un asistente útil especializado en bienes raíces, con un tono cálido pero profesional, que siempre considera las necesidades de los compradores primerizos…"

Bórralo. Claude ya tiene descripción de puesto. Lo que Claude no tiene es a *ti*. Escribe la cosa que solo tú puedes escribir — la forma específica de tu trabajo, tus clientes, tus estándares, tus no-negociables.

Léelo en voz alta cuando termines. Si suena a un documento de briefing para un asistente nuevo que entró el lunes, está bien. Si suena a un prompt que pegarías en un chatbot, reescríbelo.

<TryThis time="10 min">

Abre la carpeta que usaste en el Módulo 03 — esa donde le pediste a Claude que describiera lo que había.

Crea un archivo en esa carpeta que se llame exactamente `CLAUDE.md`. En Mac: en Finder, click derecho → Nuevo Documento, y luego renombra. En la terminal: `touch CLAUDE.md`. En Windows: en el Explorador, click derecho → Nuevo Documento de Texto, renombra a `CLAUDE.md` (asegúrate de que no sea `CLAUDE.md.txt`).

Pega el template de la persona más cercana a ti. Cambia tres cosas para que describa tu trabajo real, tu voz real, tu audiencia real. Guarda.

Ahora arranca una sesión nueva: sal de cualquier sesión de Claude que tengas abierta, corre `claude` otra vez en esa carpeta, y haz la misma pregunta de apertura que hiciste en el Módulo 03:

```
¿qué hay en esta carpeta y para qué es?
```

La respuesta debería caer distinto. Más específica. Menos genérica. Si todavía se siente genérica, tu CLAUDE.md está muy vago — agrega una oración afilada más, guarda, abre una sesión nueva, pregunta otra vez. Ese ciclo es cómo aprendes qué tipo de contexto sí mueve a Claude.

</TryThis>

<Recap>

CLAUDE.md es el archivo que termina la reintroducción diaria. Vive en tu carpeta, Claude lo lee cada sesión, y sostiene las cuatro cosas que Claude no puede saber sin que se las digas: quién eres, para qué es esta carpeta, qué convenciones te importan, y quién lee los outputs. No es un prompt y no es un comando — es un documento de briefing para un colega que acaba de empezar. Archivo de proyecto, en la raíz de la carpeta. Ese es el que importa.

</Recap>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader what's in their CLAUDE.md and where it's still vague. Not rendered yet. -->
