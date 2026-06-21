function validarCarga(exercicio, peso) {
    if (!exercicio || exercicio.trim() === "") {
        return false;
    }
    
    // O peso precisa existir e ser maior que zero
    if (!peso || peso <= 0) {
        return false;
    }

    return true;
}

module.exports = validarCarga;
