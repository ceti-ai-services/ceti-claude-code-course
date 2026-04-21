---
title: Skills — capacidades empacadas que Claude carga cuando las necesita
module: "08"
time: "12 min"
tags: [skills, capabilities, expertise, bronze]
skills_gained: [writing-skills, skill-triggers, skill-vs-command]
persona_aware: false
---

# Skills — capacidades empacadas que Claude carga cuando las necesita

Un comando slash es un prompt que invocas. Un Skill es un cuerpo de conocimiento que se carga solo cuando el momento lo pide. No lo convocas. Claude nota la forma de lo que estás pidiendo, la empata con la descripción de un Skill, y mete el Skill al contexto antes de responder.

## Dónde viven los Skills

Un Skill es una carpeta. Vive en `.claude/skills/<skill-name>/` y contiene, como mínimo, un archivo llamado `SKILL.md`. La carpeta también puede guardar documentos de referencia, plantillas, ejemplos de output — cualquier cosa que Claude pueda necesitar cuando el Skill esté activo.

<CourseDiagram id="m08-d1" />

<CourseDiagram id="m08-d2" />

El campo `description` en el frontmatter carga el peso. Claude lee todas las descripciones de los Skills al inicio de la sesión y las usa para decidir cuándo jalar un Skill. Descripción vaga, el Skill nunca carga. Descripción afilada con las frases que el usuario de verdad dice ("status update," "recap del viernes"), el Skill carga en el momento correcto.

<CourseDiagram id="m08-d3" />

<Callout variant="core-idea">
Un Skill es una carpeta de experiencia que Claude puede cargar cuando la tarea coincide.
</Callout>

## En qué se diferencian los Skills de los comandos slash

Un comando slash es un prompt. Un Skill es un pequeño manual de instrucciones. El comando slash corre una vez y se va. El Skill se queda cargado el resto de la conversación y sigue moldeando cada respuesta relacionada.

Usa un comando slash cuando quieras el mismo output cada vez. Usa un Skill cuando quieras la *forma* consistente pero el contenido variable.

## Qué va en la carpeta

Empieza solo con `SKILL.md`. Si el Skill crece — material de referencia, ejemplos de output, plantillas — agrégalos como archivos hermanos. Claude puede leerlos cuando el Skill esté activo. Una carpeta de Skill para redactar correos a clientes podría tener `SKILL.md` más un `examples/` con tres correos reales que hayas escrito, para que Claude tenga tono que igualar.

<CourseDiagram id="m08-d4" />

<TryThis time="10 min">

Crea `.claude/skills/weekly-status/` en una carpeta donde trabajes seguido. Dentro, crea `SKILL.md`. Usa la plantilla de arriba pero reescribe las tres secciones con tus propias palabras — lo que de verdad registras cada semana.

La línea de descripción es la que hay que atinar. Escríbela como si le estuvieras diciendo a un asistente nuevo *"usa esto cuando diga X, Y, o Z."* Nombra las frases exactas que usas cuando pides este tipo de output.

Guarda. Inicia una sesión nueva de Claude en esa carpeta. Di "redacta mi status update de esta semana." Observa la forma del output. Si Claude se saltó tus secciones o agregó las suyas, el Skill no está cargando — afila la descripción, guarda, prueba otra vez.

</TryThis>

<Recap>

Los Skills viven en `.claude/skills/<nombre>/SKILL.md`. El frontmatter con `name` y `description` le dice a Claude cuándo cargar el Skill. El cuerpo le enseña a Claude cómo manejar un tipo recurrente de tarea. Los comandos slash son invocaciones explícitas, los Skills son activadores ambientes — la descripción del Skill es el activador. Empieza con una carpeta, un SKILL.md, y afila la descripción hasta que el Skill cargue en los momentos correctos.

</Recap>
