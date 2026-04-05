// ================= FORNECEDOR =================

// ===== MODAL =====
function abrirModalFornecedor() {
    document.getElementById("tituloModalFornecedor").innerText = "Novo Fornecedor";

    document.getElementById("idFornecedor").value = "";
    document.getElementById("for_nome").value = "";
    document.getElementById("for_documento").value = "";
    document.getElementById("for_telefone").value = "";
    document.getElementById("for_email").value = "";
    document.getElementById("for_status").value = "A";

    document.getElementById("for_cep").value = "";
    document.getElementById("for_endereco").value = "";
    document.getElementById("for_numero").value = "";
    document.getElementById("for_bairro").value = "";
    document.getElementById("for_cidade").value = "";
    document.getElementById("for_estado").value = "";

    abrirModal("modalFornecedor");
}

function fecharModalFornecedor() {
    fecharModal("modalFornecedor");
}

// ===== SALVAR =====
async function salvarFornecedor() {

    const id = document.getElementById("idFornecedor").value || null;

    const documentoInput = document.getElementById("for_documento").value.trim();

    const fornecedor = {
        id,
        tipo: "F",
        nome: document.getElementById("for_nome").value.trim(),
        documento: documentoInput || null,
        telefone: document.getElementById("for_telefone").value,
        email: document.getElementById("for_email").value,
        status: document.getElementById("for_status").value,
        cep: document.getElementById("for_cep").value,
        logradouro: document.getElementById("for_endereco").value,
        numero: document.getElementById("for_numero").value,
        complemento: "",
        bairro: document.getElementById("for_bairro").value,
        cidade: document.getElementById("for_cidade").value,
        estado: document.getElementById("for_estado").value
    };

    if (!fornecedor.nome) {
        mostrarMensagem("Atenção", "Informe o nome do fornecedor");
        return;
    }

    try {

        const response = await fetch("/api/fornecedores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fornecedor)
        });

        if (!response.ok) {
            const erro = await response.text();
            console.error("Erro backend:", erro);
            throw new Error();
        }

        fecharModalFornecedor();
        listarFornecedores();

        mostrarMensagem("Sucesso", id ? "Fornecedor atualizado!" : "Fornecedor cadastrado!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao salvar fornecedor");
    }
}

// ===== LISTAR =====
async function listarFornecedores() {

    try {

        const response = await fetch("/api/fornecedores");

        if (!response.ok) throw new Error();

        const fornecedores = await response.json();

        renderizarFornecedores(fornecedores);

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar fornecedores");
    }
}

// ===== RENDER =====
function renderizarFornecedores(fornecedores) {

    const tbody = document.getElementById("listaFornecedores");
    tbody.innerHTML = "";

    fornecedores.forEach(f => {

        tbody.innerHTML += `
            <tr>
                <td>${f.nome}</td>
                <td>${f.telefone || ""}</td>
                <td>${f.email || ""}</td>
                <td>${traduzirStatusFornecedor(f.status)}</td>
                <td>
                    <button onclick="editarFornecedor(${f.id})">✏️</button>
                    <button onclick="excluirFornecedor(${f.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// ===== STATUS =====
function traduzirStatusFornecedor(status) {
    if (status === "A") return '<span class="text-success">Ativo</span>';
    if (status === "B") return '<span class="text-warning">Bloqueado</span>';
    if (status === "I") return '<span class="text-danger">Inativo</span>';
    return status;
}

// ===== EDITAR =====
async function editarFornecedor(id) {

    try {

        const response = await fetch("/api/fornecedores/" + id);

        if (!response.ok) throw new Error();

        const f = await response.json();

        document.getElementById("tituloModalFornecedor").innerText = "Editar Fornecedor";

        document.getElementById("idFornecedor").value = f.id;
        document.getElementById("for_nome").value = f.nome || "";
        document.getElementById("for_documento").value = f.documento || "";
        document.getElementById("for_telefone").value = f.telefone || "";
        document.getElementById("for_email").value = f.email || "";
        document.getElementById("for_status").value = f.status || "A";

        document.getElementById("for_cep").value = f.cep || "";
        document.getElementById("for_endereco").value = f.logradouro || "";
        document.getElementById("for_numero").value = f.numero || "";
        document.getElementById("for_bairro").value = f.bairro || "";
        document.getElementById("for_cidade").value = f.cidade || "";
        document.getElementById("for_estado").value = f.estado || "";

        abrirModal("modalFornecedor");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar fornecedor");
    }
}

// ===== EXCLUIR =====
function excluirFornecedor(id) {

    abrirConfirmacao("Deseja excluir este fornecedor?", () => {
        confirmarExclusaoFornecedor(id);
    });
}

async function confirmarExclusaoFornecedor(id) {

    try {

        const response = await fetch("/api/fornecedores/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error();

        listarFornecedores();
        mostrarMensagem("Sucesso", "Fornecedor excluído com sucesso!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao excluir fornecedor");
    }
}

// ===== CONFIRMAÇÃO (PADRÃO) =====
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

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    listarFornecedores();
});