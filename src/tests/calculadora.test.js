const { calcularCostoEnvio, validarPeso } = require('../calculadora');

describe('Pruebas unitarias - Calculadora de Envíos (tasaEquipo = 9%)', () => {
  // ==========================================
  // 3 CASOS DE FUNCIONAMIENTO NORMAL
  // ==========================================

  test('Caso Normal 1: Envío estándar sin recargo (5 kg)', () => {
    // Arrange
    const peso = 5;
    const costoEsperado = 20000; // 10.000 + (5 * 2.000)

    // Act
    const resultado = calcularCostoEnvio(peso);

    // Assert
    expect(resultado).toBe(costoEsperado);
  });

  test('Caso Normal 2: Envío con sobrepeso aplicando tasaEquipo del 9% (15 kg)', () => {
    // Arrange
    const peso = 15;
    // Subtotal: 10.000 + (15 * 2.000) = 40.000
    // Recargo 9%: 40.000 * 0.09 = 3.600 -> Total: 43.600
    const costoEsperado = 43600;

    // Act
    const resultado = calcularCostoEnvio(peso);

    // Assert
    expect(resultado).toBe(costoEsperado);
  });

  test('Caso Normal 3: Envío pesado de 20 kg aplicando tasaEquipo del 9%', () => {
    // Arrange
    const peso = 20;
    // Subtotal: 10.000 + (20 * 2.000) = 50.000
    // Recargo 9%: 50.000 * 0.09 = 4.500 -> Total: 54.500
    const costoEsperado = 54500;

    // Act
    const resultado = calcularCostoEnvio(peso);

    // Assert
    expect(resultado).toBe(costoEsperado);
  });

  // ==========================================
  // 3 CASOS BORDE (EDGE CASES)
  // ==========================================

  test('Caso Borde 1 (Valor límite): Exactamente 10 kg NO debe aplicar recargo del 9%', () => {
    // Arrange
    const pesoLimite = 10;
    const costoEsperado = 30000; // 10.000 + (10 * 2.000), sin recargo porque la regla es > 10

    // Act
    const resultado = calcularCostoEnvio(pesoLimite);

    // Assert
    expect(resultado).toBe(costoEsperado);
  });

  test('Caso Borde 2 (Cero y negativos): Peso en 0 kg debe lanzar error de validación', () => {
    // Arrange
    const pesoCero = 0;

    // Act & Assert
    expect(() => calcularCostoEnvio(pesoCero)).toThrow('El peso debe ser mayor a 0 kg.');
  });

  test('Caso Borde 3 (Tipo de dato inválido): Enviar texto en lugar de número debe lanzar error', () => {
    // Arrange
    const entradaInvalida = '15kg';

    // Act & Assert
    expect(() => validarPeso(entradaInvalida)).toThrow('El peso debe ser un valor numérico válido.');
  });
});