const validarCarga = require('../src/validadorCarga');

describe('Testes de Validação de Registro de Cargas (H11)', () => {
    
    // Teste 1: Sucesso
    test('Deve permitir registrar carga com dados válidos', () => {
        const resultado = validarCarga('Supino Reto', 60);
        expect(resultado).toBe(true);
    });

    // Teste 2: Falha (Exercício vazio)
    test('Não deve permitir registro sem o nome do exercício', () => {
        const resultado = validarCarga('', 60);
        expect(resultado).toBe(false);
    });

    // Teste 3: Falha (Peso inválido)
    test('Não deve permitir peso menor ou igual a zero', () => {
        const resultado = validarCarga('Supino Reto', 0);
        expect(resultado).toBe(false);
    });
});
