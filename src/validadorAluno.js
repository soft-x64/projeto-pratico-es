function validarAluno(nome, contato, objetivo) {
    if (!nome || nome.trim() === "") {
        return false;
    }

    if (!contato || contato.trim() === "") {
        return false;
    }

    if (!objetivo || objetivo.trim() === "") {
        return false;
    }

    return true;
}

module.exports = validarAluno;

