---
title: MCP — dale a Claude las herramientas que tu trabajo ya usa.
module: "11"
time: "14 min"
tags: [mcp, tools, integration, bronze]
skills_gained: [mcp-mental-model, prao-loop, first-connector]
persona_aware: false
---

# MCP — dale a Claude las herramientas que tu trabajo ya usa.

Hasta ahora, Claude puede ver archivos en tu carpeta. Eso es mucho. No es todo.

Tu lunes vive en Gmail, tu semana vive en Calendar, tus clientes viven en una base de datos de Notion, y tus números viven en un Google Sheet. Claude Code lee la carpeta. No lee esos. No hasta que los conectes.

**MCP — Model Context Protocol** — es el cable. Un protocolo, muchas herramientas. Cada MCP server expone tres primitivas — Tools, Resources, Prompts — y Claude corre el mismo loop sobre todas.

<CourseDiagram id="m11-d1" />

El loop es lo que importa. Cuando Claude resuelve lo que sea con una herramienta externa, corre cuatro fases: **Perceive → Reason → Act → Observe.** PRAO. El loop reinicia en cada turno nuevo. Entender PRAO es cómo entiendes *por qué* un agente elige la herramienta equivocada y *por qué* la calidad de la descripción de una herramienta decide el techo de lo útil que puede ser.

<Callout variant="core-idea">
MCP es el protocolo. PRAO es el loop que Claude corre dentro de ese protocolo. Cada llamada MCP — Gmail, Calendar, Notion, el Sheet — recorre el mismo loop.
</Callout>

## El loop, una fase a la vez

<CourseDiagram id="m11-d2" />

## Qué instalar primero

Si este es tu primer conector, instala uno donde el beneficio sea inmediato y el modo de falla sea seguro.

**Gmail (solo lectura)** — Claude puede leer inbox e hilos pero no puede enviar sin tu aprobación explícita. Buen primer conector porque el valor (triage de inbox, redacción de respuestas) aparece en la primera sesión.

<CourseDiagram id="m11-d3" />

**Google Calendar (solo lectura)** — Claude ve tu semana, propone franjas horarias, redacta texto de invitaciones. Combínalo con Gmail y cubres ~70% de tu trabajo recurrente de texto.

**Notion o Google Drive (lectura)** — si tu material fuente vive ahí, tu CLAUDE.md aterriza más ligero porque Claude puede ir a buscar contexto en lugar de que tú lo pegues.

<CourseDiagram id="m11-d4" />

<Callout variant="tip">
Empieza en solo lectura. Sube a escritura habilitada cuando el loop se sienta aburrido. El hábito de respaldar primero del Módulo 04 aplica al doble cuando un conector puede mutar estado en una herramienta externa.
</Callout>

<TryThis time="8 min">

Instala un conector MCP hoy. Gmail es el primero recomendado.

1. En Claude Code, corre `/mcp` — verás la lista de conectores actualmente conectados a tu sesión.
2. Sigue el prompt para agregar Gmail (o escoge otro de la lista). Claude Code abre una pestaña del navegador para el OAuth — aprueba el mínimo scope que pida.
3. De vuelta en la terminal, pregunta: `¿cuál es el correo no leído más viejo en mi inbox de alguien a quien ya le había respondido antes?` Observa a Claude correr el loop PRAO — percibe la herramienta, razona sobre la query, actúa con una llamada al API, observa el resultado.
4. Lee la respuesta. Nota: esta pregunta te tomaría tres minutos de scrollear. El loop le tomó a Claude quince segundos.

Si el primer conector funciona, instala uno más esta semana. Si no — el conector pidió un scope que no te sentiste cómodo otorgando, o el resultado está mal — ciérralo, sigue adelante, y prueba de nuevo después del Módulo 12 (integración con Git) donde verás el loop PRAO aplicado a una herramienta que entiendes a fondo.

</TryThis>

<Recap>

MCP conecta a Claude a las herramientas donde vive tu trabajo de verdad — Gmail, Calendar, Notion, tu base de datos. El protocolo expone tres primitivas (Tools, Resources, Prompts), y cada llamada recorre el mismo loop PRAO de cuatro fases: Perceive → Reason → Act → Observe. Empieza con un conector en solo lectura. Deja que el loop se sienta aburrido antes de graduarte a herramientas con escritura habilitada.

</Recap>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask which connector the reader picked and whether the OAuth scope ask was comfortable. -->
