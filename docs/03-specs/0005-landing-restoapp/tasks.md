# TASKS — SPEC-0005

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Leer [contrato de implementación](../../01-design/implementation-contract.md), [conventions.md](../../00-harness/conventions.md), [design.md](../../design.md) y el Direction contract (`impeccable surface-brief read app/test-1-sin-brief/page.tsx`) → *(prep)*
- [x] T-02 · Esqueleto de ruta: `page.tsx` de servidor con `buildMetadata`, wrapper `.test-1-sin-brief`, `test-1-sin-brief.scss` + `@import` en `styles/custom.scss`; la ruta responde 200 → **AC-7**, **AC-8**

## Construcción

- [x] T-03 · `components/cuenta.ts`: valores de referencia (15 %, USD 120), `calcularCuenta`, umbral (USD 800), `formatUSD` es-VE, `whatsappUrl` con `wa.me/?text=` y `WHATSAPP_NUMERO` vacío → **AC-3**, **AC-6**
- [x] T-04 · Header con wordmark temporal "Resto App" (marcado TEMPORAL), anclas y CTA a WhatsApp; menú móvil en `sm` → **AC-1**
- [x] T-05 · Hero: titular "Haz la cuenta: ¿cuánto se te va en comisiones?" (`display`), bajada, CTA primario + secundario → **AC-2**
- [x] T-06 · Calculadora: `Input` controlado (solo dígitos, vacío = 0), ticket de 3 líneas con punteado y cifras `tnum` a la derecha, banda de total con estado "Te quedas" / "Con este volumen, la comisión te sale más barata · Resto App conviene desde USD 800", `aria-live="polite"`, rótulo "valores de referencia"; probar 0, 500, 8.000 y 999.999.999 → **AC-3**
- [x] T-07 · **Medir el hero** antes de seguir (no hay comp → sin `comp-diff`): `npm run shot -- /test-1-sin-brief --cta <selector>` en `sm`/`md`/`lg`; CTA en el fold, sin scroll horizontal; corregir antes de T-08 → **AC-2**, **AC-7**
- [x] T-08 · Flujo: foto de mostrador (`Media 4/3`, `curl -I` = 200, marcada de muestra) + entra (4) → sale (3) con iconos y texto, no solo color → **AC-4**
- [x] T-09 · Precio: ticket "costo fijo mensual · sin comisión por venta · contrato anual" + banda de total con USD 120 de muestra → **AC-5**
- [x] T-10 · CTA final en `Section tone="inverse"`: demo y prueba 7 días a WhatsApp con mensajes distintos, `target="_blank"` + `rel="noopener noreferrer"` → **AC-6**
- [x] T-11 · Footer mínimo con la nota de "valores de referencia" → **AC-7**
- [x] T-11b · `config/site.ts` → Resto App (`name`, `description`, `seo.*`, `seo.colors`); el `<title>` de la ruta ya no dice "New Project" → *(Alcance 7)*
- [x] T-12 · Tinta azul: ningún texto de la ruta hereda el casi negro de HeroUI (medir `color` computado en Playwright) → **AC-8**
- [x] T-13 · Accesibilidad: controles ≥ 48px, campo ≥ 56px y 16px, foco visible, presión del botón sin movimiento con `prefers-reduced-motion` → **AC-9**

## Cierre

- [x] T-90 · `npm run contract` + greps del contrato sobre los archivos tocados (sin hex/`rgba()` en `.tsx` ni en `test-1-sin-brief.scss`, sin monoespaciada, Oleo Script solo en `display`/`headline`) → *(DoD B)* **AC-8**
- [x] T-91 · `npm run typecheck` (0) y `npm run lint:check` (sin errores nuevos). **No** `npm run lint` (corre `--fix`) ni `npm run build` como verificación → *(DoD A)* **AC-8**
- [x] T-92 · `npm run shot -- /test-1-sin-brief` en `sm`/`md`/`lg`, exit 0, y leer las capturas → *(DoD D)* **AC-7**
- [x] T-93 · Contraste y foco visible medidos; `/impeccable audit` sobre la ruta (ADR-0003) → *(DoD E)* **AC-9**
- [x] T-94 · Pegar bloque de verificación en `spec.md` → *(DoD F)*
- [ ] T-95 · Mover estado de la spec a `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

Todo lo que apareció y no estaba en la spec. Si algo llega aquí, se actualiza la spec
antes de seguir — no se improvisa.

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-10-28 | En la fase de render, el usuario fijó su marca (crema/azul/coral, Oleo Script + Lora) y reemplazó la paleta y fuentes que había propuesto la tarjeta | Render rehecho antes de la spec; `design.md` sobrescrito; ADR-0009 |
| 2026-10-28 | Con 15 % y USD 120, por debajo de USD 800/mes la comisión sale más barata | Decisión del usuario en shape: mostrarlo con honestidad (AC-3, T-06) |
| 2026-10-28 | `impeccable` instalado es 4.7.0 (la skill pide 4.8+) | Los 8 verbos que usa la skill responden; se siguió. Actualizar con `npx impeccable@latest install --global` |
| 2026-10-28 | Build: la sombra de "tecla" del CTA (`0 3px 0`, sin blur) es la sombra en bloque que el craft floor rechaza fuera de un mundo neobrutalista | Sombra de papel `0 3px 6px` que se aplasta al presionar (sigue la presión visible pedida); `design.md` y sidecar actualizados |
| 2026-10-28 | Build: en Lora 700, `tabular-nums` ensancha los espacios ("Te  quedas") | `tnum` solo en las cifras (`.test-1-sin-brief__figure`); los tokens de texto quedan en `lining-nums`; `design.md` actualizado |
| 2026-10-28 | Build: el `<title>` de la ruta termina en "\| New Project": la plantilla `%s \| Marca` sale de `config/site.ts`, fuera de alcance en modo ruta | Usuario: cambiar el nombre en `config/site.ts` a Resto App. Spec actualizada (Alcance 7, Fuera de alcance). `ogFont` sigue en Manrope: no hay TTF de Lora/Oleo en `/fonts` |
| 2026-10-28 | Build: el `secondary` sobre la banda azul (`inverse`) quedaba azul sobre azul; con `flat` + `color` el `!important` de `.btn-flat span` lo anulaba | Tokens `--color-secondary-btn-*` reasignados dentro de `.test-1-sin-brief__inverse` (sin re-estilar el botón) |
| 2026-10-28 | Build: el anillo de foco de HeroUI (box-shadow) lo pisaba la sombra del primario → foco de teclado invisible | `outline` 2px en `.btn-citrica-ui` (`_button.scss`), crema en secciones `inverse` |
| 2026-10-28 | Build: etiqueta y ayuda del `Input` en grises de HeroUI (ayuda ≈2.5:1) | `_input.scss`: `label` y `description` desde tokens con `!important` |
| 2026-10-28 | Build: cifras de 9 dígitos desbordaban la tarjeta en sm | Cifras de línea en `subtitle` bold; la banda de total puede pasar a dos líneas; `USD` y `%` con espacio duro |
