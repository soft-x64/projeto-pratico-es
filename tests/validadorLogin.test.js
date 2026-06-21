const validarLogin = require('../src/validadorLogin');

test('Login válido', () => {
    expect(
        validarLogin(
            'usuario@email.com',
            '123456'
        )
    ).toBe(true);
});

test('Email vazio', () => {
    expect(
        validarLogin(
            '',
            '123456'
        )
    ).toBe(false);
});

test('Senha vazia', () => {
    expect(
        validarLogin(
            'usuario@email.com',
            ''
        )
    ).toBe(false);
});

test('Email e senha vazios', () => {
    expect(
        validarLogin(
            '',
            ''
        )
    ).toBe(false);
});


