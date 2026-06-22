const validarCarga = require('../src/validadorCarga');

describe('Testes de Validação de Carga - Histórico de Usuário H11', () => {
    
    // Caso de Sucesso
    test('Deve permitir registrar carga quando o peso for maior que zero', () => {
        const resultado = validarCarga(60); // 60 kg é um valor válido
        expect(resultado).toBe(true);
    });

    // Caso de Falha 1: Peso igual a zero
    test('Não deve permitir registrar carga com peso igual a zero', () => {
        const resultado = validarCarga(0);
        expect(resultado).toBe(false);
    });

    // Caso de Falha 2: Peso negativo
    test('Não deve permitir registrar carga com peso menor que zero', () => {
        const resultado = validarCarga(-5);
        expect(resultado).toBe(false);
    });

    // Caso de Falha 3: Peso ausente/não preenchido
    test('Não deve permitir registrar carga se o campo peso estiver vazio', () => {
        const resultado = validarCarga(null);
        expect(resultado).toBe(false);
    });
});