const validarAluno = require('../src/validadorAluno');

test('Aluno válido', () => {
    expect(
        validarAluno(
            'João',
            'joao@email.com',
            'Hipertrofia'
        )
    ).toBe(true);
});

test('Nome vazio', () => {
    expect(
        validarAluno(
            '',
            'joao@email.com',
            'Hipertrofia'
        )
    ).toBe(false);
});

test('Contato vazio', () => {
    expect(
        validarAluno(
            'João',
            '',
            'Hipertrofia'
        )
    ).toBe(false);
});

test('Objetivo vazio', () => {
    expect(
        validarAluno(
            'João',
            'joao@email.com',
            ''
        )
    ).toBe(false);
});

