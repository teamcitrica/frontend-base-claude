// La cuenta de Resto App — SPEC-0007.
//
// Un solo lugar para la lógica de la cuenta y los destinos de conversión. Las
// landings de la marca leen de aquí; los valores marcados MUESTRA o PENDIENTE
// se reemplazan cuando el cliente confirme los reales.

/** Comisión por venta con la que arranca la calculadora (valor de ejemplo, editable). */
export const COMISION_EJEMPLO = 0.15;

/** Ventas del mes con las que arranca la calculadora (MUESTRA). */
export const VENTAS_MUESTRA = 8000;

/** Dígitos máximos de cada campo de la calculadora. */
export const DIGITOS_VENTAS = 9;
export const DIGITOS_PORCENTAJE = 2;

/**
 * Número de WhatsApp de destino (PENDIENTE, vacío). Sin número, `wa.me` abre
 * WhatsApp para elegir contacto: nunca se le escribe a un tercero por error.
 */
export const WHATSAPP_NUMERO = "";

export const MENSAJE_DEMO = "Hola, quiero una demo de Resto App para mi local.";

export const MENSAJE_COTIZAR =
  "Hola, quiero cotizar el plan fijo de Resto App para mi local.";

/** Registro de la prueba gratis de 7 días (del brief, verificado: responde 200). */
export const URL_PRUEBA = "https://restoapp.club/registro";

export interface ComisionPerdida {
  mes: number;
  anio: number;
}

/** Lo que se va en comisiones con unas ventas y un porcentaje dados. */
export const comisionPerdida = (
  ventas: number,
  fraccion: number,
): ComisionPerdida => {
  const mes = ventas * fraccion;

  return { mes, anio: mes * 12 };
};

/** Deja solo dígitos, hasta `max`. Vacío = 0. */
export const leerDigitos = (crudo: string, max: number) => {
  const digitos = crudo.replace(/\D/g, "").slice(0, max);

  return { digitos, valor: Number(digitos || "0") };
};

const entero = new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 });
const conCentavos = new Intl.NumberFormat("es-VE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * `USD 1.200` o, con centavos, `USD 12,00`. Espacio duro entre moneda y cifra:
 * en sm no se separan en dos líneas. Siempre en valor absoluto: el signo lo
 * pone la fila.
 */
export const formatUSD = (monto: number, centavos = false) =>
  `USD\u00A0${
    centavos
      ? conCentavos.format(Math.abs(monto))
      : entero.format(Math.round(Math.abs(monto)))
  }`;

/** `15 %` con espacio duro: el signo no queda solo en otra línea. */
export const porcentaje = (fraccion: number) =>
  `${Math.round(fraccion * 100)}\u00A0%`;

export const whatsappUrl = (mensaje: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

/**
 * Abre WhatsApp en una pestaña nueva sin dar acceso a `window.opener`. Solo
 * para controles que no aceptan `href` (el botón del `Header` del toolkit).
 */
export const abrirWhatsapp = (mensaje: string) => {
  window.open(whatsappUrl(mensaje), "_blank", "noopener,noreferrer");
};
