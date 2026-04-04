// ================================
// MODAL
// ================================
function abrirModalCategoria() {
    document.getElementById("tituloModalCategoria").innerText = "Nova Categoria";
    document.getElementById("idCategoria").value = "";
    document.getElementById("cat_nome").value = "";
    document.getElementById("modalCategoria").classList.remove("hidden");
}

function fecharModalCategoria() {
    document.getElementById("modalCategoria").classList.add("hidden");
}

// ================================
// SALVAR
// ================================
async function salvarCategoria() {

    const id = document.getElementById("idCategoria").value || null;

    const categoria = {
        id,
        nome: document.getElementById("cat_nome").value.trim()
    };

    if (!categoria.nome) {
        mostrarMensagem("Atenção", "Informe o nome da categoria");
        return;
    }

    try {

        const response = await fetch("/api/categorias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria)
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar");
        }

        fecharModalCategoria();
        listarCategoria();

        mostrarMensagem("Sucesso", id ? "Categoria atualizada!" : "Categoria cadastrada!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao salvar categoria");
    }
}

// ================================
// LISTAR
// ================================
async function listarCategoria() {

    try {

        const response = await fetch("/api/categorias");

        if (!response.ok) throw new Error("Erro ao listar");

        const categorias = await response.json();

        renderizarCategorias(categorias);

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar categorias");
    }
}

// ================================
// RENDER
// ================================
function renderizarCategorias(categorias) {

    const tbody = document.getElementById("listaCategorias");
    tbody.innerHTML = "";

    categorias.forEach(c => {

        tbody.innerHTML += `
            <tr>
                <td>${c.nome}</td>
                <td>
                    <button onclick="editarCategoria(${c.id})">✏️</button>
                    <button onclick="excluirCategoria(${c.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// ================================
// EDITAR
// ================================
async function editarCategoria(id) {

    try {

        const response = await fetch("/api/categorias/" + id);

        if (!response.ok) throw new Error("Erro ao buscar");

        const c = await response.json();

        document.getElementById("tituloModalCategoria").innerText = "Editar Categoria";
        document.getElementById("idCategoria").value = c.id;
        document.getElementById("cat_nome").value = c.nome;

        document.getElementById("modalCategoria").classList.remove("hidden");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar categoria");
    }
}

// ================================
// EXCLUIR
// ================================
function excluirCategoria(id) {

    abrirConfirmacao("Deseja excluir esta categoria?", () => {
        confirmarExclusaoCategoria(id);
    });
}

async function confirmarExclusaoCategoria(id) {

    try {

        const response = await fetch("/api/categorias/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao excluir");

        listarCategoria();

        mostrarMensagem("Sucesso", "Categoria removida!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao excluir categoria");
    }
}

// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", () => {

    listarCategoria();

});


let confirmCallback = null;

function abrirConfirmacao(texto, callback) {

    document.getElementById("confirmTexto").innerText = texto;

    confirmCallback = callback;

    document.getElementById("modalConfirmacao").classList.remove("hidden");
}

function fecharConfirmacao() {
    document.getElementById("modalConfirmacao").classList.add("hidden");
    confirmCallback = null;
}

document.getElementById("btnConfirmar").addEventListener("click", () => {

    if (confirmCallback) {
        confirmCallback();
    }

    fecharConfirmacao();
});