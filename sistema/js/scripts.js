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

async function fazerLogin() {

    const email = document.getElementById("login_email").value;
    const senha = document.getElementById("login_senha").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(data);
        alert(data.erro || "Erro ao logar");
        return;
    }

    // 🔥 REDIRECIONA
    window.location.href = "/pages/dashboard.html";
}

// ===== MENSAGEM PADRÃO =====
function mostrarMensagem(titulo, texto) {
    document.getElementById("msgTitulo").innerText = titulo;
    document.getElementById("msgTexto").innerText = texto;

    document.getElementById("modalMensagem").classList.remove("hidden");
}

function fecharMensagem() {
    document.getElementById("modalMensagem").classList.add("hidden");
}

