---
title: Esta es la buena. Escoge la tarea que detestas un poquito.
module: "06"
time: "45 min"
tags: [real-work, first-task, end-to-end, bronze]
skills_gained: [read-plan-execute, permission-discipline, first-shipped-task]
persona_aware: true
---

# Esta es la buena. Escoge la tarea que detestas un poquito.

Escribiste algo en el Módulo 01. La tarea que detestas un poquito los lunes por la mañana. La cosa semanal con demasiados archivos, demasiadas pestañas, demasiado copia-pega. La cosa por la que pagarías cincuenta dólares con tal de no hacerla.

Ahora la vas a hacer con Claude — por primera vez. No una tarea de tutorial. No un ejemplo de juguete. La tarea real.

Todo lo que los últimos cinco módulos te dieron — carpeta con alcance, herramienta instalada, instintos de aprobación, un CLAUDE.md que ya sabe quién eres — fue setup para esta hora. Aquí es donde el curso entero se paga a sí mismo.

<Callout variant="stakes">
Si ninguna otra cosa de este curso se te queda, este módulo es el que te devuelve lo invertido. Una tarea real, hecha al lado de Claude, te manda la prueba a ti mismo de que esto sí es distinto. Sáltatela y el Bronze se vuelve una cosa que viste. Hazla y se vuelve una cosa que usas.
</Callout>

## La forma de cada tarea real

Cada sesión útil sigue tres movimientos. Memoriza el orden — ese es el método entero.

**Solo lectura primero.** Le pides a Claude que te diga qué hay. Sin ediciones. Sin archivos escritos. Solo entender. Esta es la manera más barata de atrapar un malentendido, antes de que cualquier trabajo aterrice sobre los cimientos equivocados.

**Plan segundo.** Le preguntas qué *haría* Claude. Estás pidiendo el plano, no el edificio. Aquí corriges el alcance, acotas la meta, y te aseguras de que tú y Claude quieren lo mismo.

**Ejecutar con aprobaciones, tercero.** Ahora Claude empieza a producir — escribiendo archivos, moviendo documentos, redactando el correo — y tú apruebas cada paso. Si algo sale mal, lo atrapaste en el paso dos, no en el tres.

Leer → planear → ejecutar. Tres movimientos. Cada tarea.

## Tu tarea, tu versión

La tarea que escribiste en el Módulo 01 seguramente calza con una de cuatro formas. Lee la más cercana a la tuya. Los detalles cambian. El ritmo no.

<PersonaExample>
  <template #creator>

  **Tu tarea: juntar diez captions de Instagram a partir de una semana de contenido.**

  Tienes una carpeta con diez clips en crudo de la semana — quizás están en `~/Content/2026-sem-16/`. Normalmente escribes captions uno por uno, tarde en la noche, después de haber visto el clip cuatro veces. Te toma dos horas. Los captions terminan sonando iguales porque estás cansada.

  **Antes de abrir Claude.** Asegúrate de que la carpeta tenga los clips más un archivo llamado `ultimos-veinte-captions.md` — pega tus últimos veinte captions ahí, uno por línea. Eso le da a Claude tu voz para igualar. Tres minutos de copia-pega ahora te ahorran una hora de corregir el tono después.

  **Solo lectura.** `cd` a la carpeta, lanza Claude. Primer prompt:

  ```
  lee cada archivo en esta carpeta y dime de qué es cada clip
  en una oración. todavía sin captions — solo los resúmenes.
  ```

  Claude te dice lo que ve. Revisas por encima. Si un resumen está mal ("ese clip es sobre organización con TDAH, no sobre productividad"), lo corriges en el chat. Esa corrección cuesta 20 segundos ahora y ahorra 20 minutos después.

  **Plan.** Ahora le das forma al lote:

  ```
  redacta diez captions — uno por clip. mi voz es seca, sin emojis,
  oraciones cortas, hook en la primera línea, nunca efusiva. muéstrame los
  primeros tres para revisar el tono antes de hacer el resto.
  ```

  Lee los tres. ¿Muy efusivos? "Quita los signos de exclamación y corta cada caption un tercio." ¿Muy formales? "Más suelto. Como si le hablara a mi amiga que también tiene TDAH." Cuando los tres se sientan bien, deja que termine los otros siete.

  **Ejecutar.** `escribe estos diez captions en un archivo llamado captions-sem-16.md.` Aprueba la escritura. Abre el archivo. Ajusta a mano lo que todavía esté fuera de lugar. Publica.

  </template>
  <template #consultant>

  **Tu tarea: redactar tres correos de seguimiento a clientes con contexto completo.**

  Llevas toda la semana posponiendo tres correos: un recordatorio de una factura sin pagar, una aclaración de alcance, una actualización de status de proyecto. Cada uno requiere que releas el hilo, que recuerdes el tono que usas con ese cliente, y que redactes algo que no suene a carta formato. Normalmente haces esto los viernes por la tarde y te toma noventa minutos.

  **Antes de abrir Claude.** La carpeta ya debería tener los archivos que usas para este cliente — la propuesta, el SOW, notas de reunión, hilos de correo viejos que hayas guardado. Si los correos viejos no están guardados en ningún lado, saca los últimos diez de Gmail: abre el hilo en Gmail → los tres puntos → *Descargar mensaje*, mete los archivos `.eml` en la carpeta. Claude lee `.eml` sin problema.

  **Solo lectura.** Abre Claude en la carpeta del cliente — `cd ~/Clientes/Meridian/` o donde vivan de verdad la correspondencia y las notas. Primer prompt:

  ```
  lee mi correspondencia y notas de reunión con este cliente de los
  últimos 60 días. dime qué está abierto, qué está esperando de mí, y qué
  tono tiendo a usar con ellos.
  ```

  Claude resume. Tú verificas. Si Claude cree que algo está resuelto y no lo está, corrige ahora.

  **Plan.** Nombra lo que quieres redactado:

  ```
  necesito tres correos: (1) un recordatorio suave sobre la factura #441,
  30 días vencida; (2) una aclaración sobre si el trabajo de guía de
  marca entra en el alcance de la fase dos o es una orden de cambio;
  (3) una actualización de status sobre los entregables actuales. iguala
  el tono que acabas de describir. muéstrame el primero antes de redactar
  los otros.
  ```

  Lee el recordatorio. Ajusta — "muy apologético" o "corta la intro, ya me conocen." Cuando el tono esté bien, pídele los otros dos.

  **Ejecutar.** `guarda estos tres como seguimiento-1.md, seguimiento-2.md, seguimiento-3.md en esta carpeta.` Aprueba cada escritura. Abre, pega en Gmail, envía.

  </template>
  <template #service>

  **Tu tarea: reconciliar una semana de reservas contra tu agenda.**

  Tienes un export de reservas (CSV o PDF — lo que escupa tu sistema), tu calendario, y el hilo de WhatsApp donde la mitad de tus clientes de verdad confirman. Una vez a la semana te sientas y tratas de emparejarlos: quién de verdad vino, quién no se presentó, quién pagó, quién te debe. Te toma una hora y siempre se te pasa uno.

  **Antes de abrir Claude.** Necesitas tres cosas en una carpeta. *Export de reservas*: en la mayoría de los sistemas que uses para reservas (Square, Booksy, Vagaro, Setmore, o cualquier sistema que uses para reservas), ve a Reportes → Citas → Exportar CSV. *Calendario*: Google Calendar → engrane de configuración → Importar y Exportar → Exportar, te da un archivo `.ics` con todos los calendarios — mételo. *Confirmaciones de WhatsApp*: abre el chat → los tres puntos → Más → *Exportar chat* → Sin Media. Te da un archivo `.txt` por conversación. Pon el CSV, el `.ics`, y los exports del chat en la misma carpeta. Son diez minutos de setup, y de la siguiente semana ya tienes el patrón.

  **Solo lectura.** Lanza Claude en la carpeta. Primer prompt:

  ```
  lee cada archivo aquí. dime qué es una reserva, qué es una
  confirmación, qué es un pago. dame una lista de cada cita de esta
  semana con quién, cuándo, qué servicio, y si figura como pagada.
  ```

  Claude produce la lista. La revisas. Nombres que reconoces — bien. Nombres que no, u horas que no calzan con tu memoria — márcalos en el chat: "Sofía el miércoles está mal, se movió al jueves."

  **Plan.**

  ```
  ahora haz dos listas: (1) citas que pasaron y están totalmente
  pagadas, (2) citas que tienen cualquier hueco — no show, sin pagar,
  o que necesitan confirmación. explica qué falta para cada una de la
  lista 2.
  ```

  **Ejecutar.** `guarda la reconciliación completa como sem-16-reservas.md en esta carpeta.` Aprueba. Usa la lista 2 para mandar tus seguimientos del lunes por la mañana por WhatsApp.

  </template>
  <template #realestate>

  **Tu tarea: sacar comparables y redactar un resumen de compra para un listado.**

  Tienes un listado nuevo que vas a mostrar el sábado y un comprador que pidió comparables el miércoles. Normalmente sacas el export del MLS, lo abres en una hoja de cálculo, revisas los comparables a ojo, y luego escribes un resumen de dos párrafos en un correo. Es una hora de trabajo y el "a ojo" es la parte que podría estar mal.

  **Antes de abrir Claude.** Una carpeta por transacción. En esta, mete: la ficha del listado objetivo (MLS → Imprimir → Guardar como PDF), tu CSV de comparables (MLS → buscar activos/vendidos comparables → Exportar → CSV), cualquier PDF de inspección o disclosures que ya hayas recibido, y el hilo de correo con el comprador si existe (guarda como `.eml` desde Gmail o `.msg` desde Outlook). Cinco minutos de arrastrar archivos. El setup lo haces una sola vez por listado, y se vuelve tu carpeta de trabajo para toda la transacción.

  **Solo lectura.** Lanza Claude en la carpeta. Primer prompt:

  ```
  lee la ficha del listado y el CSV de comparables. dime las
  especificaciones de la propiedad objetivo y cómo se comparan los
  comparables — precio por metro cuadrado, días en mercado, notas de
  condición. marca cualquier outlier.
  ```

  Claude saca los números. Los verificas contra tu propio conocimiento de la zona. Si un comparable no debería estar en el set (otra colonia, demolición vendida como remodelación), dilo — Claude lo excluye.

  **Plan.**

  ```
  redacta un correo de resumen para el comprador: dos párrafos cortos.
  el párrafo uno es el listado en español claro, sin jerga del MLS.
  el párrafo dos es el análisis de comparables — en qué rango creo
  que debería venderse y por qué.
  ```

  **Ejecutar.** `guarda como resumen-comprador-145-main.md en esta carpeta.` Aprueba. Abre el archivo — es texto plano que puedes leer como un documento. Copia los dos párrafos, pega en Gmail, manda al comprador. Si prefiere SMS, ya lo tienes escrito — solo recorta a un párrafo y mándalo.

  </template>
</PersonaExample>

## La disciplina que hace que esto funcione

La tentación, conforme Claude empieza a producir, es dejar de leer los prompts de aprobación. Aprueba-aprueba-aprueba, revisas de reojo el resultado, entregas. No lo hagas.

<Callout variant="approval">
Cada aprobación es un checkpoint. Sobre todo la primera vez que corres una tarea de principio a fin, lee qué está a punto de pasar antes de decir que sí. Los dos segundos por aprobación que te "ahorrarías" presionando aceptar-todo son los mismos dos segundos que hubieran atrapado el archivo escribiéndose en la carpeta equivocada, el tono derivando a algo que nunca mandarías, o el resumen citando con toda confianza un documento que ni siquiera está. Lee el diff. Lee el comando. Luego aprueba.
</Callout>

Conforme la tarea se vuelve familiar — la segunda, tercera, cuarta vez que haces tu lote semanal de captions o tu borrador de seguimiento — vas a revisar más rápido. Eso se gana. No es el default.

## Unos cuantos hábitos que multiplican

**Pide estructura.** "Como tabla." "Como lista de viñetas." "Dos párrafos cortos, no más." La forma prosa por default rara vez es la más útil. Especifica.

**Corrige rápido y directo.** "Eso no es lo que pedí." "Te perdiste el punto del segundo." "Más corto." Claude responde bien a la corrección directa. No necesita ser educada. Necesita ser específica.

**Pregunta qué no tiene claro.** Antes de entregar, pregunta: "¿Qué revisaste por encima versus qué leíste completo? ¿Dónde tuviste que adivinar?" Esos bordes de confianza son justo donde quieres que caiga tu juicio humano.

**Cierra el ciclo.** Al final: "Resume qué hicimos y qué queda." Vas a atrapar el archivo que se le olvidó, o la decisión que querías tomar y no tomaste.

<TryThis time="45 min">

Bloquea cuarenta y cinco minutos. Cierra Slack, cierra DMs, cierra las otras pestañas. Esta es la sesión que importa.

Saca la tarea que escribiste en el Módulo 01 — la cosa semanal que detestas un poquito. Antes de abrir Claude, escribe dos números en papel: más o menos cuánto te toma normalmente esta tarea, y la barra de calidad que más importa ("nombres correctos," "tono calza," "entregable sin que yo lo edite," lo que sea).

Ahora haz la tarea con Claude. Sigue los tres movimientos — leer, planear, ejecutar. Aprueba cada paso. Corrige agresivamente cuando algo esté fuera. No trates de ser rápido la primera vez. Trata de ser *correcto*.

Cuando termines, escribe dos números más: cuánto te tomó de verdad, y qué tan cerca está el resultado de tu barra de calidad. Esos cuatro números son la conversación de ROI que vas a tener con la próxima persona a la que le cuentes de esto.

Si el resultado está peor que hacerlo a mano, la tarea probablemente no era la indicada — o la carpeta necesitaba un mejor CLAUDE.md. Regresa al Módulo 05, afila el contexto, prueba otra vez. Casi toda decepción de la primera tarea se desvanece en la segunda corrida.

</TryThis>

<Recap>

No solo aprendiste Claude Code. *Hiciste algo* con él — la tarea semanal que venías evitando, entregada de principio a fin usando el patrón de tres movimientos. Leer primero, planear segundo, ejecutar con aprobaciones tercero. La tarea es distinta para cada quien. El ritmo es el mismo para todos. Un entregable terminado vive ahora en tu carpeta que no estaba ahí hace una hora — y sabes exactamente cómo llegó ahí.

</Recap>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader what task they picked, how long it took, and where Claude got it wrong the first time. Not rendered yet. -->
