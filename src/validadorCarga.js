function validarCarga(peso) {
    // O peso precisa ser preenchido, ser um número e ser maior que zero
    if (!peso || typeof peso !== 'number' || peso <= 0) {
        return false;
    }

    return true;
}

module.exports = validarCarga;