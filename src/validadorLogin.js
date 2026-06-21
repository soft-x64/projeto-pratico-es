function validarLogin(email, senha) {
    if (!email || email.trim() === "") {
        return false;
    }

    if (!senha || senha.trim() === "") {
        return false;
    }

    return true;
}

module.exports = validarLogin;

