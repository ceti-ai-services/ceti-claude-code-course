---
title: Instalar Claude Code
module: "02"
time: "14 min"
tags: [install, setup, bronze]
skills_gained: [install, first-launch, authentication]
persona_aware: false
---

# Instalar Claude Code

Nunca has abierto una terminal. El internet es inútil para los que empiezan — la mayoría de las guías de instalación asumen que ya sabes qué es `npm`, o que "solo corre este comando" te lleva a algún lado útil. Esta no. Camina la instalación desde cero en Mac, Windows y Linux, en ese orden. Al final vas a tener un prompt `>` parpadeando, esperando tu primera pregunta.

## Prerrequisitos

Dos cosas tienen que ser ciertas antes de que Claude Code corra.

**Primero, necesitas Node.js versión 18 o más nueva.** Node.js es un programa que corre pequeñas aplicaciones escritas en JavaScript. Claude Code resulta ser una de esas. Tú no vas a escribir JavaScript — Node es simplemente el motor sobre el que se monta Claude Code. Muchas computadoras ya lo tienen. Muchas no.

**Segundo, necesitas una manera de iniciar sesión.** Hay dos caminos válidos:

- **Una suscripción de Claude.ai** (Pro o Max). Si ya pagas Claude en el navegador, ese mismo login sirve para Claude Code. Es el camino más simple para la mayoría de la gente no técnica. No hay nada más que configurar.
- **Una API key de Anthropic.** Es una cadena larga de caracteres que generas en console.anthropic.com. Te cobra a tu cuenta por request. Solo la necesitas si no tienes suscripción de Claude.ai, o si quieres más control sobre la facturación y el uso.

Escoge la que ya tengas. Si no tienes ninguna, una suscripción Claude.ai Pro es el camino con menos resistencia.

## El comando de instalación

Sin importar el sistema operativo, el comando que realmente instala Claude Code es el mismo:

```bash
npm install -g @anthropic-ai/claude-code
```

`npm` es el gestor de paquetes que viene con Node.js. `install -g` significa "instala de forma global, para que pueda correrlo desde cualquier lugar." `@anthropic-ai/claude-code` es el nombre del paquete. Después de que este comando termine, puedes escribir `claude` en cualquier ventana de terminal y se va a lanzar.

El resto de esta lección es sobre llegar al punto donde ese comando funciona.

## Mac

Abre Spotlight — que en español se llama Foco — con Command+Espacio, y escribe `Terminal`. Presiona Return. Aparece una ventana simple con un cursor parpadeando después de algo de texto que termina en `$` o `%`. Eso es la terminal. El `$` o el `%` se llama el **prompt**. Está esperando a que escribas.

Escribe esto y presiona Return:

```bash
node --version
```

Si ves algo como `v20.11.1` o cualquier número 18 o más alto, Node ya está instalado. Salta al paso de instalación.

Si ves `command not found: node`, necesitas instalar Node. Ve a nodejs.org, dale click al botón de descarga marcado **LTS** (long-term support — la versión estable), corre el instalador como cualquier otra app de Mac, y acepta los defaults. Cierra la ventana de Terminal y abre una nueva — los instaladores no afectan terminales que ya estaban abiertas.

Con Node instalado, corre:

```bash
npm install -g @anthropic-ai/claude-code
```

Va a imprimir unas líneas y te regresa al prompt. Puede que veas una advertencia de permisos — si la instalación falla con un error `EACCES`, corre el mismo comando otra vez con `sudo` al inicio:

```bash
sudo npm install -g @anthropic-ai/claude-code
```

Te va a pedir la contraseña de tu Mac. Escríbela (el cursor no se va a mover — es normal), presiona Return, y la instalación procede.

Cuando termine, escribe `claude` y presiona Return. Llegaste a la pantalla del primer lanzamiento.

## Windows

Windows tiene dos terminales: la vieja (Command Prompt, mejor evítala) y la moderna (Windows Terminal o PowerShell). La que quieres es PowerShell, que viene integrada en toda máquina con Windows 10 y 11. Dale click al botón de Inicio, escribe `PowerShell`, y abre la app que aparece.

Revisa si tienes Node:

```powershell
node --version
```

Si Node no está, ve a nodejs.org y baja el instalador **LTS** para Windows. Córrelo, acepta los defaults, y abre una ventana nueva de PowerShell cuando termine.

Instala Claude Code:

```powershell
npm install -g @anthropic-ai/claude-code
```

Luego corre `claude`.

Si `claude` no se encuentra después de que la instalación terminó limpia, o si chocas con errores raros que mencionan permisos o paths, hay un camino más confiable en Windows: **WSL**, el Windows Subsystem for Linux. WSL te da una terminal Linux real dentro de Windows, y Claude Code tiende a correr más parejo ahí. Para instalarlo, abre PowerShell **como administrador** (click derecho, "Ejecutar como administrador") y corre:

```powershell
wsl --install
```

Reinicia tu computadora cuando te lo pida. Después de reiniciar, una nueva app llamada **Ubuntu** va a estar en tu menú de Inicio. Ábrela. Ahora estás en una terminal Linux. Sigue la sección de Linux de aquí en adelante.

WSL no es obligatorio. Mucha gente corre Claude Code en PowerShell sin problema. Pero si el camino de PowerShell te está dando una semana de errores raros, WSL es la salida de emergencia.

## Linux

Seguro ya tienes una terminal abierta. Revisa Node:

```bash
node --version
```

Si no está, instala Node desde el gestor de paquetes de tu distribución (`apt`, `dnf`, `pacman` — el que uses), o desde nodejs.org si quieres la LTS más reciente.

Luego:

```bash
npm install -g @anthropic-ai/claude-code
```

Si ves errores de `EACCES`, antepón `sudo`. Corre `claude` para lanzar.

## El primer lanzamiento

La primera vez que escribes `claude` y presionas Return, vas a ver una pantalla corta de bienvenida seguida de un prompt de autenticación. Te ofrece los dos caminos — los mismos dos de la sección de Prerrequisitos arriba.

**Camino 1: suscripción Claude.ai.** Escoge esta opción. Claude Code abre una pestaña del navegador donde inicias sesión en tu cuenta de Claude. Una vez que apruebas el acceso, la pestaña confirma y regresas a la terminal. Ya estás dentro. Es el camino recomendado para la mayoría de los lectores.

**Camino 2: API key.** Ve a console.anthropic.com, inicia sesión (o crea una cuenta), y busca la página de **API Keys** en la configuración. Dale click a **Create Key**, copia la cadena larga que te muestra — empieza con `sk-ant-` — y pégala de vuelta en la terminal cuando Claude Code te la pida. Esa key es una contraseña. No te la mandes por correo, no la pegues en una ventana de chat, no la subas a una carpeta pública. Guárdala solo para ti.

Después de autenticarte, la terminal se asienta en algo que se ve más o menos así:

```
> 
```

Ese único `>` con el cursor parpadeando es el prompt de Claude Code. Está esperando una pregunta.

<Recap>

Instalaste un asistente de IA que vive en la terminal. Node.js es el motor, `npm install -g @anthropic-ai/claude-code` es el comando de instalación, y `claude` es cómo lo lanzas. Te autenticaste con una suscripción de Claude.ai o con una API key, y ahora estás sentado frente a un prompt `>` en la carpeta desde la que lanzaste. Esa carpeta es el mundo entero de Claude ahora mismo — exactamente el encuadre que describió la lección pasada.

</Recap>

<TryThis time="4 min">

Antes de preguntarle algo a Claude, dale una carpeta donde trabajar. Elige una pequeña — menos de 20 archivos — que tenga trabajo que quieras revisar. Evita tu Escritorio y tu carpeta personal; ambas son demasiado grandes para una primera sesión.

Si ahora mismo estás en el prompt de Claude de la instalación de arriba, escribe `exit` y presiona Return para cerrarlo. Luego apunta una terminal nueva a la carpeta que elegiste:

- **Mac**: en Finder, clic derecho sobre la carpeta → **Nueva Terminal en la carpeta**.
- **Windows**: en el Explorador de archivos, Shift + clic derecho sobre la carpeta → **Abrir en Terminal** (o **Abrir ventana de PowerShell aquí**).
- **Linux** (o alternativa para cualquier sistema): en la terminal, escribe `cd ` (con un espacio al final), arrastra la carpeta desde tu gestor de archivos a la ventana de la terminal — aparece la ruta — y presiona Return.

Ahora escribe `claude` y presiona Return. Esta vez la sesión está acotada a la carpeta que elegiste.

Pregunta:

```
¿qué hay en esta carpeta y para qué es?
```

Claude abre los archivos, los revisa, y te devuelve un resumen de un párrafo de tu propio trabajo. Eso es la instalación confirmada *y* la idea del siguiente módulo — el alcance — ya físicamente cierta para ti.

Escribe `/exit` para cerrar, o déjala corriendo y continúa.

</TryThis>

<!-- REFLECTION_INPUT_PLACEHOLDER — future AI assistant will ask the reader which OS they installed on and whether they hit any errors. Not rendered yet. -->
