---
description: Crea una spec nueva desde la plantilla e inicia la fase SPEC del flujo SDD
argument-hint: <slug-en-kebab>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Vas a crear la spec `$1` siguiendo el flujo SDD de este repo.

## 1. Contexto (lee antes de escribir nada)

- @docs/00-harness/sdd-workflow.md — el flujo y sus puertas
- @docs/03-specs/README.md — índice y numeración
- @docs/product.md — usuarios, principios, anti-referencias

## 2. Asigna número

Mira `docs/03-specs/` y usa el siguiente entero libre, con cuatro dígitos. Los números
no se reutilizan aunque una spec esté `dropped`.

```bash
ls docs/03-specs/
```

## 3. Crea la carpeta

```bash
cp -r docs/03-specs/_template docs/03-specs/NNNN-$1
```

## 4. Escribe `spec.md`

Llena el frontmatter (`id`, `slug`, `titulo`, `creada`, `superficie`) y el cuerpo.

**Antes de redactar, entrevista al usuario.** No inventes el problema ni los criterios
de aceptación: pregunta lo que falte. Un supuesto no verificado que se cuela en una
spec se convierte en código equivocado.

Reglas de redacción:

- El **Problema** se escribe en términos del usuario, nunca de la solución.
  Malo: "falta una sección de precios". Bueno: "el visitante llega al CTA sin saber
  cuánto cuesta y abandona".
- **Fuera de alcance** no es opcional. Es la sección que impide que el build se
  desborde. Si está vacía, la spec no está lista.
- Cada criterio de aceptación va en `Dado / Cuando / Entonces` y debe poder
  comprobarse mirando la pantalla o corriendo un comando. Si no se puede comprobar,
  reescríbelo.
- Marca solo las **restricciones heredadas** que de verdad aplican y borra el resto.

## 5. Registra en el índice

Agrega la fila a la tabla de `docs/03-specs/README.md` con estado `draft`.

## 6. Cierra

Reporta al usuario:

- Ruta de la spec creada
- Un resumen de dos líneas del problema y el alcance
- Las **preguntas abiertas** que quedaron, explícitamente

**No pases a planear ni a construir.** La spec debe aprobarse primero: cambia el estado
a `approved` solo cuando el usuario lo confirme y no queden preguntas abiertas.
