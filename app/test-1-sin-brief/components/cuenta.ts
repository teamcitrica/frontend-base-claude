// La cuenta de la comisión — SPEC-0005.
//
// Un solo lugar para los valores de referencia: la calculadora, el precio y
// los CTA leen de aquí. Todos son DE MUESTRA hasta que el cliente confirme
// los reales (spec → Preguntas abiertas, resueltas el 2026-10-28).

/** Comisión por venta de referencia (MUESTRA). */
export const COMISION_REFERENCIA = 0.15;

/** Costo fijo mensual de Resto App en USD (MUESTRA). */
export const COSTO_FIJO_USD = 120;

/** Ventas del mes con las que arranca la calculadora (MUESTRA). */
export const VENTAS_MUESTRA = 8000;

/** Tope del campo: 9 dígitos. */
export const VENTAS_MAX = 999_999_999;

/**
 * Número de WhatsApp de destino (MUESTRA, vacío). Sin número, `wa.me` abre
 * WhatsApp para elegir contacto: nunca se le escribe a un tercero por error.
 */
export const WHATSAPP_NUMERO = "";

export const MENSAJE_DEMO =
  "Hola, quiero ver una demo de Resto App para mi local.";

export const MENSAJE_PRUEBA =
  "Hola, quiero probar Resto App gratis por 7 días.";

export interface Cuenta {
  ventas: number;
  comision: number;
  costoFijo: number;
  /** Lo que se queda la dueña con Resto App frente a la comisión. Negativo si la comisión sale más barata. */
  diferencia: number;
  convieneRestoApp: boolean;
}

export const calcularCuenta = (ventas: number): Cuenta => {
  const comision = ventas * COMISION_REFERENCIA;
  const diferencia = comision - COSTO_FIJO_USD;

  return {
    ventas,
    comision,
    costoFijo: COSTO_FIJO_USD,
    diferencia,
    convieneRestoApp: diferencia > 0,
  };
};

/** Ventas mensuales a partir de las cuales la comisión supera al costo fijo. */
export const umbralConveniencia = () =>
  Math.ceil(COSTO_FIJO_USD / COMISION_REFERENCIA);

/** Deja solo dígitos y respeta el tope. Vacío = 0. */
export const leerVentas = (crudo: string) => {
  const digitos = crudo.replace(/\D/g, "").slice(0, 9);
  const valor = Math.min(Number(digitos || "0"), VENTAS_MAX);

  return { digitos, valor };
};

const numero = new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 });

/**
 * `USD 1.200` — separador de miles con punto, sin decimales. Espacio duro
 * entre la moneda y la cifra: en sm no se separan en dos líneas.
 */
export const formatUSD = (monto: number) =>
  `USD ${numero.format(Math.round(Math.abs(monto)))}`;

/** `15 %` con espacio duro: el signo no queda solo en otra línea. */
export const porcentaje = (fraccion: number) =>
  `${Math.round(fraccion * 100)} %`;

export const whatsappUrl = (mensaje: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

/** Abre WhatsApp en una pestaña nueva sin dar acceso a `window.opener`. */
export const abrirWhatsapp = (mensaje: string) => {
  window.open(whatsappUrl(mensaje), "_blank", "noopener,noreferrer");
};
