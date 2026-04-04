async function verificarLogin() {

    const response = await fetch("/api/auth/sessao");

    if (!response.ok) {
        window.location.href = "/";
        return;
    }

    const data = await response.json();

    if (!data.logado) {
        window.location.href = "/";
    } else {
        // document.getElementById("usuarioLogadoNome").innerText = data.usuario.nome;
        const el = document.getElementById("usuarioLogadoNome");
        if (el) {
            el.innerText = data.usuario.nome;
        }
    }
}

document.addEventListener("DOMContentLoaded", verificarLogin);