const TARIFA_BASE = 10000;
const COSTO_POR_KG = 2000;
const PESO_LIMITE_RECARGO = 10;
const PESO_MAXIMO = 50;

// N = 9 (Guapacha Quintero, Jhon Fredy) -> tasaEquipo = (9 % 5) + 5 = 9%
const TASA_EQUIPO = 0.09;

/**
 * Valida que el peso ingresado sea un número válido y esté dentro del rango operativo.
 * @param {number} peso - Peso del paquete en kilogramos.
 * @returns {boolean} true si es válido, lanza Error si no cumple.
 */
function validarPeso(peso) {
  if (typeof peso !== 'number' || Number.isNaN(peso)) {
    throw new Error('El peso debe ser un valor numérico válido.');
  }
  if (peso <= 0) {
    throw new Error('El peso debe ser mayor a 0 kg.');
  }
  if (peso > PESO_MAXIMO) {
    throw new Error('El peso máximo permitido por paquete es de 50 kg.');
  }
  return true;
}

/**
 * Calcula el costo total de un envío aplicando la tasa del equipo (9%) si supera los 10 kg.
 * @param {number} peso - Peso del paquete en kilogramos.
 * @returns {number} Valor total a pagar en COP.
 */
function calcularCostoEnvio(peso) {
  validarPeso(peso);

  const subtotal = TARIFA_BASE + peso * COSTO_POR_KG;

  // Regla de negocio: si pesa más de 10 kg, se aplica recargo del 9% (tasaEquipo)
  if (peso > PESO_LIMITE_RECARGO) {
    const recargo = subtotal * TASA_EQUIPO;
    return subtotal + recargo;
  }

  return subtotal;
}

module.exports = {
  validarPeso,
  calcularCostoEnvio,
  TASA_EQUIPO,
};