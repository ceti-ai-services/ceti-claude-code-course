---
title: Ya tienes IA. Lo que pasa es que la estás usando mal.
module: "01"
time: "12 min"
tags: [mental-model, fundamentals, bronze]
skills_gained: [framing, correct-expectations, first-shift]
persona_aware: true
---

# Ya tienes IA. Lo que pasa es que la estás usando mal.

Ya has estado aquí antes. De noche. Una pestaña abierta, ChatGPT o Claude en el navegador. Escribes. Te da una buena respuesta. La copias. La pegas en otro lado — el documento, el DM, la hoja de cálculo, el correo — y te pasas otros veinte minutos acomodándola para que encaje.

Hiciste el trabajo dos veces. La IA respondió una. La segunda vuelta — la parte donde de verdad entregaste — la hiciste solo.

Ese es el problema. No es la IA. Es la forma en que la estás usando.

<!-- persona:creator -->
<Callout variant="core-idea">
Ya conoces el movimiento: abres el chatbot, escribes "reescribe este caption para que quede más atractivo." Te llega la respuesta. La pegas. Arreglas tres cosas a mano. La publicas igual, aunque no suene del todo a ti.
</Callout>
<!-- /persona:creator -->

<!-- persona:consultant -->
<Callout variant="core-idea">
Ya conoces el movimiento: le pides al chatbot que te ayude a redactar un seguimiento a un cliente. Te responde. Lo copias a Gmail. Reescribes la mitad para que suene a ti. Envías.
</Callout>
<!-- /persona:consultant -->

<!-- persona:service -->
<Callout variant="core-idea">
Ya conoces el movimiento: pegas el mensaje de un cliente en el chatbot. Le pides una respuesta amable. Copias lo que te devolvió a WhatsApp. Ajustas el tono porque suena demasiado formal para tus clientes. Envías.
</Callout>
<!-- /persona:service -->

<!-- persona:realestate -->
<Callout variant="core-idea">
Ya conoces el movimiento: pegas la consulta de un prospecto en el chatbot. Le pides una respuesta cálida con contexto del mercado. Copias la respuesta a tu SMS o correo. Reescribes los comparables porque conoces tu mercado mejor. Envías.
</Callout>
<!-- /persona:realestate -->

## La forma que todavía no has usado

Claude Code es el mismo Claude que vienes usando en el navegador. Forma distinta. No vive en una página web. Vive en tu computadora, dentro de la carpeta donde está tu trabajo de verdad.

Esa es la idea entera. Déjame decir qué significa, porque la mayoría de la gente no dimensiona lo grande que es.

Ahora mismo, tu trabajo está en carpetas. El brief de un cliente es un Google Doc en `~/Documents/Clients/`. Tu calendario está en una app. Tus recibos son una pila de screenshots en `~/Downloads`. Los borradores de tus correos están en Gmail. El backlog de captions es un archivo de Notas.

Cada vez que quieres *hacer* algo con ese trabajo — resumirlo, reorganizarlo, redactar a partir de él, limpiarlo — tienes que (a) copiar y pegar en un chatbot o (b) hacerlo tú mismo. Las dos son lentas.

Claude Code elimina el paso (a). Abres una ventana de terminal, la apuntas a la carpeta, y ahora la IA puede leer los archivos directamente. No subidos. No resumidos. Los archivos reales. Y puede editarlos, con tu permiso, paso a paso.

<TryThis time="2 min">

Piensa en la última vez que le pediste a ChatGPT o a Claude (el del navegador) ayuda con algo real. No curiosidad — trabajo de verdad.

- ¿Qué preguntaste?
- ¿Qué hiciste con la respuesta después?
- ¿Cuánto te tomó el *después*?

Ese "después" es donde Claude Code se gana el sueldo.

</TryThis>

## El modelo mental que arregla esto

Hay un encuadre que hace que todo encaje. Se lo he enseñado a miles de personas, y es el que se queda.

Claude Code no es una máquina expendedora. Es un colega.

Una máquina expendedora toma tu input, te da un output. Transacción cerrada. Te vas. Eso es ChatGPT en el navegador. Tú le pides, te contesta, el resto lo haces tú.

Un colega es distinto. Un colega se sienta en el mismo cuarto que tú. Ve los mismos archivos. Te pide que aclares cuando eres vago. Te muestra lo que está a punto de cambiar antes de cambiarlo. Hace las partes aburridas para que tú hagas las partes que te necesitan a ti.

<Callout variant="tip">
Un buen colega no necesita que le transcribas la situación. La ve. Eso es lo que realmente te cambia al pasar de "chatbot" a "Claude Code."
</Callout>

## Qué significa esto para tu semana

No en abstracto. En concreto.

<PersonaExample>
  <template #creator>

  Esta semana, seguro gastaste dos horas en operaciones de contenido: renombrando exports, moviendo archivos entre borradores y programados, escribiendo captions que combinen con los anteriores, respondiendo DMs que preguntan más o menos lo mismo. La versión máquina expendedora de la IA te ayuda a escribir *un* caption. La versión colega lee tus últimos 20 captions, entiende tu voz, redacta 5 nuevos y los archiva en la carpeta correcta. El mismo trabajo que ya estabas haciendo — con la mayor parte de lo mecánico quitado.

  </template>
  <template #consultant>

  Esta semana, seguro redactaste el mismo tipo de correo tres o cuatro veces: seguimiento a una factura vencida, aclaración de alcance, actualización de status a un cliente. La versión máquina expendedora te ayuda a escribir *un* correo. La versión colega lee la correspondencia del último mes con ese cliente, entiende tu relación y tu tono, redacta la versión correcta con tu voz, y la entrega. Tú apruebas. Listo.

  </template>
  <template #service>

  Esta semana, seguro te llegó la misma pregunta de cliente diez veces por canales distintos: "¿cuáles son sus horarios?", "¿tienes disponibilidad el sábado?", "¿cuánto cuesta X?". La versión máquina expendedora te ayuda a escribir *una* respuesta. La versión colega revisa tu agenda, lee el historial del cliente, redacta una respuesta que le calza, y marca el mensaje como contestado. Tú apruebas. Listo.

  </template>
  <template #realestate>

  Esta semana, seguro sacaste comparables, escribiste un seguimiento a un comprador, y respondiste preguntas de disclosure sobre dos propiedades. La versión máquina expendedora te ayuda con una de esas. La versión colega lee la carpeta de la propiedad, saca los comparables del CSV que ya descargaste, redacta el seguimiento con la voz que usas con ese comprador, y te marca las preguntas de disclosure que tienes que escalar a tu bróker. Tú apruebas.

  </template>
</PersonaExample>

## Lo que viene

En los siguientes seis módulos, vas a instalar Claude Code, a correr tu primera sesión real, y a construir desde ahí. Al final, vas a tener una cosa real funcionando en tu computadora — algo que de verdad haces cada semana, ahora hecho con un colega.

Una nota antes de seguir. La versión de este curso que estás leyendo es la primera. Más adelante, habrá un asistente aquí mismo en esta página que recuerde lo que dijiste en tus reflexiones, note dónde te trabaste, y ajuste el siguiente módulo para ti específicamente. Todavía no está. Cuando esté, te vas a dar cuenta.

<Recap>

Vienes usando la IA en una forma que la hace hacer la mitad fácil de tu trabajo y te deja a ti la mitad difícil. Claude Code es la misma IA en otra forma — una donde puede ver tus archivos y hacer el trabajo contigo. Colega, no máquina expendedora. Esa es la única idea que necesitas de este módulo. El resto es mecánica.

</Recap>

<TryThis time="5 min">

Antes de empezar el Módulo 02, escribe una tarea que haces cada semana que implica abrir más de cinco archivos o mensajes. Un reporte semanal. Un montón de DMs. Una pila de recibos. Un calendario de contenido. Un update a un cliente.

Una oración. Guárdala en un lugar donde la vuelvas a encontrar. Vas a usar esta tarea como tu ejemplo real en el Módulo 06 — y si cuadra bien, para el final de la próxima semana, ya no la vas a estar haciendo a la antigua.

Mientras más dolorosa la tarea, mejor el encaje.

</TryThis>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will prompt the reader here. Not rendered yet. -->
