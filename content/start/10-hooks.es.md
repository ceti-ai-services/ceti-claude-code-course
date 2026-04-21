---
title: Hooks — controles de seguridad y automatización pre/post uso de herramienta
module: "10"
time: "14 min"
tags: [hooks, automation, safety, settings, bronze]
skills_gained: [writing-hooks, lifecycle-events, blocking-bad-commands]
persona_aware: false
---

# Hooks — controles de seguridad y automatización pre/post uso de herramienta

La mayor parte de Claude Code es cooperativa — Claude propone, tú apruebas. Los hooks son el único lugar donde el harness toma un papel más firme. Un hook es tu script, corriendo en un momento que tú elegiste, capaz de inspeccionar lo que Claude está por hacer y decidir qué pasa después.

## Qué es un hook

Un hook es un pequeño comando de shell (o script) que corre en un evento específico del ciclo de vida durante una sesión de Claude. Lo registras en tu `settings.json` — ya sea `.claude/settings.json` en el proyecto, o el global `~/.claude/settings.json`. El hook corre automáticamente, cada vez que su evento dispara, sin que tú lo invoques.

<CourseDiagram id="m10-d1" />

Tres eventos del ciclo de vida cubren casi todos los casos prácticos: `PreToolUse` dispara antes de que Claude use una herramienta y puede bloquearla, `PostToolUse` dispara después de una llamada exitosa, y `Stop` dispara cuando la sesión termina.

<Callout variant="core-idea">
Un hook es un pequeño script que corre en un momento que tú eliges — antes de una llamada a una herramienta, después de una sesión, en pre-commit.
</Callout>

## Dónde viven los hooks

En tu `settings.json`, bajo un objeto `hooks`. Cada evento es una llave; cada valor es una lista de matchers y el comando a correr. Un ejemplo mínimo que bloquea `rm -rf` antes de que Claude pueda correrlo:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf'; then echo 'blocked: rm -rf'; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

<CourseDiagram id="m10-d2" />

<Callout variant="warning">
Un hook `PreToolUse` mal hecho puede bloquear cada llamada de herramienta y dejar a Claude inútil. Prueba los hooks en un proyecto de prueba antes de meterlos en un workspace real. Si te dejas fuera a ti mismo, edita `settings.json` directamente para quitar el hook.
</Callout>

<CourseDiagram id="m10-d4" />

## Un ejemplo más seguro — `Stop` para un resumen

Los hooks que bloquean son poderosos y fáciles de meter la pata. Un primer hook más amigable es un hook `Stop` que imprime una línea de resumen cuando Claude termina:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[claude] session ended at $(date)\""
          }
        ]
      }
    ]
  }
}
```

Sin bloqueos. Sin decisiones. Solo una línea que confirma que la sesión cerró y le pone un timestamp.

## Cuándo echar mano de los hooks

Los hooks son para cosas que quieres que pasen *cada vez*, sin importar qué prompt las arrancó. Logging. Barandales de seguridad. Auto-formateo después de una escritura. Un check de pre-commit antes de que Claude haga commit.

<CourseDiagram id="m10-d3" />

<TryThis time="8 min">

Abre `.claude/settings.json` en una carpeta de proyecto. Si el archivo no existe, créalo con `{}` como contenido inicial.

Agrega un hook `Stop` que imprima un resumen de una línea cuando Claude termine de responder. Usa el ejemplo de arriba. Guarda.

Inicia una sesión nueva de Claude en esa carpeta. Pregúntale lo que sea — *"¿qué hay en esta carpeta?"* — y observa la terminal después de que la respuesta termine. Deberías ver la línea `[claude] session ended at …`.

Si no la ves, el hook no está registrado. Revisa que el JSON sea válido (una coma faltante puede matar silenciosamente el bloque de hooks) y reinicia Claude.

</TryThis>

<Recap>

Los hooks son scripts registrados en `settings.json` que corren en eventos específicos del ciclo de vida — `PreToolUse`, `PostToolUse`, `Stop` son los tres que cubren la mayoría de las necesidades. `PreToolUse` puede bloquear llamadas peligrosas. `PostToolUse` es para logging y auto-formateo. `Stop` es para resúmenes de fin de sesión. Prueba los hooks en proyectos de prueba antes de meterlos en workspaces reales. Usa hooks cuando el comportamiento deba ser incondicional — todo lo demás pertenece a un comando o a un Skill.

</Recap>
