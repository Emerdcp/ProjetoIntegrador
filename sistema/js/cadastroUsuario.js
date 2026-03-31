// ########################### USUARIO ##########################

function abrirModalUsuario() {

    document.getElementById("tituloModalUsuario").innerText = "Novo Usuário";

    document.getElementById("idUsuario").value = "";
    document.getElementById("usu_nome").value = "";
    document.getElementById("usu_documento").value = "";
    document.getElementById("usu_status").value = "A";
    document.getElementById("usu_telefone").value = "";
    document.getElementById("usu_email").value = "";
    document.getElementById("usu_perfil").value = "O";
    document.getElementById("usu_senha").value = "";

    document.getElementById("modalUsuario").classList.remove("hidden");
}

function fecharModalUsuario() {
    document.getElementById("modalUsuario").classList.add("hidden");
}

async function salvarUsuario() {

    const id = document.getElementById("idUsuario")?.value || null;

    const usuario = {
        id,
        nome: document.getElementById("usu_nome")?.value.trim(),
        documento: document.getElementById("usu_documento")?.value,
        status: document.getElementById("usu_status")?.value,
        telefone: document.getElementById("usu_telefone")?.value,
        email: document.getElementById("usu_email")?.value,
        perfil: document.getElementById("usu_perfil")?.value,
        senha: document.getElementById("usu_senha")?.value
    };

    if (!usuario.nome) {
        alert("Informe o nome.");
        return;
    }

    await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });

    fecharModalUsuario();
    listarUsuarios();
}

// LISTAR
async function listarUsuarios() {

    const response = await fetch("/api/usuarios");
    const usuarios = await response.json();

    const tbody = document.getElementById("listaUsuarios");
    if (!tbody) return;

    tbody.innerHTML = "";

    usuarios.forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.nome}</td>
                <td>${u.email}</td>
                <td>${traduzirPerfil(u.perfil)}</td>
                <td>${traduzirStatus(u.status)}</td>
                <td>
                    <button onclick="editarUsuario(${u.id})">✏️</button>
                    <button onclick="excluirUsuario(${u.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

function traduzirPerfil(perfil) {
    return {
        A: "Administrador",
        G: "Gerente",
        O: "Operador"
    }[perfil] || perfil;
}

function traduzirStatus(status) {
    return status === "A" ? "Ativo" : "Inativo";
}

// EDITAR
async function editarUsuario(id) {

    const response = await fetch("/api/usuarios/" + id);
    const usuario = await response.json();

    document.getElementById("tituloModalUsuario").innerText = "Editar Usuário";

    document.getElementById("idUsuario").value = usuario.id;
    document.getElementById("usu_nome").value = usuario.nome || "";
    document.getElementById("usu_documento").value = usuario.documento || "";
    document.getElementById("usu_status").value = usuario.status || "A";
    document.getElementById("usu_telefone").value = usuario.telefone || "";
    document.getElementById("usu_email").value = usuario.email || "";
    document.getElementById("usu_perfil").value = usuario.perfil || "O";
    document.getElementById("usu_senha").value = "";

    document.getElementById("modalUsuario").classList.remove("hidden");
}

// EXCLUIR
function excluirUsuario(id) {

    abrirConfirmacao("Deseja inativar este usuário?", () => {
        confirmarExclusao(id);
    });

}

async function confirmarExclusao(id) {

    await fetch("/api/usuarios/" + id, {
        method: "DELETE"
    });

    listarUsuarios();

    mostrarMensagem("Sucesso", "Usuário inativado com sucesso!");
}

let callbackConfirmacao = null;

function abrirConfirmacao(texto, callback) {
    document.getElementById("confirmTexto").innerText = texto;
    document.getElementById("modalConfirmacao").classList.remove("hidden");

    callbackConfirmacao = callback;
}

function fecharConfirmacao() {
    document.getElementById("modalConfirmacao").classList.add("hidden");
    callbackConfirmacao = null;
}

document.getElementById("btnConfirmar").onclick = () => {
    if (callbackConfirmacao) callbackConfirmacao();
    fecharConfirmacao();
};

document.addEventListener("DOMContentLoaded", listarUsuarios);