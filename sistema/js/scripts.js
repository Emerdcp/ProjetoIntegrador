// ===== ABRIR MODAL =====
function abrirModal(id) {
    document.getElementById(id).classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

// ===== FECHAR MODAL =====
function fecharModal(id) {
    document.getElementById(id).classList.add("hidden");
    document.body.style.overflow = "auto";
}

// ===== FECHAR AO CLICAR FORA =====
document.addEventListener("click", function(e) {

    if (e.target.classList.contains("modal-sistema")) {
        e.target.classList.add("hidden");
        document.body.style.overflow = "auto";
    }

});