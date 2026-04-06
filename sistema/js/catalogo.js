// ================= GALERIA =================

let imagensGaleria = [];
let indexAtual = 0;

// ABRIR
function abrirGaleria(imagens, index) {

    imagensGaleria = imagens;
    indexAtual = index;

    document.getElementById("galeriaModal").style.display = "flex";

    atualizarImagem();
}

// FECHAR
function fecharGaleria() {
    document.getElementById("galeriaModal").style.display = "none";
}

// ATUALIZAR IMG
function atualizarImagem() {
    document.getElementById("imgGaleria").src = imagensGaleria[indexAtual];
}

// TROCAR IMG
function trocarImagem(direcao) {

    indexAtual += direcao;

    if (indexAtual < 0) indexAtual = imagensGaleria.length - 1;
    if (indexAtual >= imagensGaleria.length) indexAtual = 0;

    atualizarImagem();
}

// ESC fecha
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        fecharGaleria();
    }
});

// clicar fora fecha
document.addEventListener("click", function(e) {
    const modal = document.getElementById("galeriaModal");

    if (modal && e.target === modal) {
        fecharGaleria();
    }
});