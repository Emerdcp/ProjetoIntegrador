// =====================
// MODAL
// =====================
// function abrirModalProduto() {
//     document.getElementById("tituloModalProduto").innerText = "Novo Produto";
//     document.getElementById("modalProduto").classList.remove("hidden");
// }

function abrirModalProduto() {

    document.getElementById("tituloModalProduto").innerText = "Novo Produto";

    // LIMPAR ID (IMPORTANTE)
    document.getElementById("idProduto").value = "";

    // LIMPAR CAMPOS
    document.getElementById("pro_nome").value = "";
    document.getElementById("pro_categoria").value = "";
    document.getElementById("pro_status").value = "A";
    document.getElementById("pro_controle_estoque").value = "S";
    document.getElementById("pro_unidade").value = "UN";
    document.getElementById("pro_codfabricante").value = "";
    document.getElementById("pro_localizacao").value = "";
    document.getElementById("pro_preco_venda").value = "";
    document.getElementById("pro_preco_custo").value = "";
    document.getElementById("pro_estoque").value = "";
    document.getElementById("pro_envia_catalogo").value = "N";

    // LIMPAR IMAGEM
    document.getElementById("pro_imagens").value = "";

    // ABRIR MODAL
    document.getElementById("modalProduto").classList.remove("hidden");
}

function fecharModalProduto() {
    document.getElementById("modalProduto").classList.add("hidden");
}


// =====================
// LISTAR
// =====================
async function listarProdutos() {

    const response = await fetch("/api/produtos");
    const produtos = await response.json();

    const tbody = document.getElementById("listaProdutos");
    tbody.innerHTML = "";

    produtos.forEach(p => {

        tbody.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.categoria_nome || "-"}</td>
                <td>R$ ${Number(p.preco_venda || 0).toFixed(2)}</td>
                <td>${Number(p.estoque || 0).toFixed(2)}</td>

                <td>
                    ${p.imagem_principal
                ? `<img src="/uploads/produtos/${p.imagem_principal}" class="img-tabela">`
                : "-"
            }
                </td>

                <td>
                    <span class="${p.status === 'A' ? 'status-ativo' : 'status-inativo'}">
                        ${p.status === "A" ? "Ativo" : "Inativo"}
                    </span>
                </td>

                <td>
                    <span class="acao-btn" onclick="editarProduto(${p.id})">✏️</span>
                    <span class="acao-btn" onclick="excluirProduto(${p.id})">🗑️</span>
                </td>
            </tr>
        `;
    });
}


// =====================
// SALVAR
// =====================
async function salvarProduto() {

    const produto = {
        id: document.getElementById("idProduto").value || null,
        nome: document.getElementById("pro_nome").value,
        categoria_id: document.getElementById("pro_categoria").value,
        preco_venda: document.getElementById("pro_preco_venda").value,
        estoque: document.getElementById("pro_estoque").value,
        status: document.getElementById("pro_status").value
    };

    try {

        const res = await fetch("/api/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });

        const data = await res.json();

        // upload imagens
        const files = document.getElementById("pro_imagens").files;

        if (files.length > 0 && data.id) {

            const formData = new FormData();

            for (let file of files) {
                formData.append("imagens", file);
            }

            await fetch("/api/produtos/upload/" + data.id, {
                method: "POST",
                body: formData
            });
        }

        fecharModalProduto();
        listarProdutos();

        mostrarMensagem("Sucesso", "Produto salvo com sucesso!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao salvar produto");
    }
}


// =====================
// EDITAR
// =====================
async function editarProduto(id) {

    const res = await fetch("/api/produtos/" + id);
    const p = await res.json();

    abrirModalProduto();

    document.getElementById("tituloModalProduto").innerText = "Editar Produto";

    document.getElementById("idProduto").value = p.id;
    document.getElementById("pro_nome").value = p.nome;
    document.getElementById("pro_categoria").value = p.categoria_id;
    document.getElementById("pro_preco_venda").value = p.preco_venda;
    document.getElementById("pro_estoque").value = p.estoque;
    document.getElementById("pro_status").value = p.status;
}


// =====================
// EXCLUIR (PADRÃO CLIENTE)
// =====================
function excluirProduto(id) {

    abrirConfirmacao("Deseja excluir este produto?", async () => {

        await fetch("/api/produtos/" + id, {
            method: "DELETE"
        });

        listarProdutos();

        mostrarMensagem("Sucesso", "Produto removido!");
    });
}


// =====================
// CATEGORIAS
// =====================
async function carregarCategorias() {

    try {

        const res = await fetch("/api/categorias");

        if (!res.ok) throw new Error("Erro ao carregar categorias");

        const categorias = await res.json();

        // SELECT DO CADASTRO
        const select = document.getElementById("pro_categoria");

        if (select) {
            select.innerHTML = '<option value="">Selecione</option>';

            categorias.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
            });
        }

        // SELECT DO FILTRO
        const filtro = document.getElementById("filtroCategoria");

        if (filtro) {
            filtro.innerHTML = '<option value="">Todas Categorias</option>';

            categorias.forEach(c => {
                filtro.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
            });
        }

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar categorias");
    }
}
// =====================
document.addEventListener("DOMContentLoaded", () => {
    listarProdutos();
    carregarCategorias();
});


// =====================
// CONFIRMAÇÃO (CORRETO)
// =====================
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




// =====================
// DOM READY (CORRETO)
// =====================
document.addEventListener("DOMContentLoaded", () => {

    listarProdutos();
    carregarCategorias();

    // 👇 AQUI ESTÁ O FIX
    const btn = document.getElementById("btnConfirmar");

    if (btn) {
        btn.addEventListener("click", () => {

            if (confirmCallback) {
                confirmCallback();
            }

            fecharConfirmacao();
        });
    }

});

// ================= FILTRO =================
function abrirFiltro() {
    document.getElementById("modalFiltro").classList.remove("hidden");
}

function fecharFiltro() {
    document.getElementById("modalFiltro").classList.add("hidden");
}

async function aplicarFiltro() {

    try {

        const nome = document.getElementById("filtroNome").value;
        const categoria_id = document.getElementById("filtroCategoria").value;
        const status = document.getElementById("filtroStatus").value;

        const response = await fetch("/api/produtos/filtrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, categoria_id, status })
        });

        if (!response.ok) {
            throw new Error("Erro ao filtrar produtos");
        }

        const produtos = await response.json();

        // reutiliza o listar (boa prática)
        renderizarProdutos(produtos);

        fecharFiltro();

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao filtrar produtos");
    }
}

function renderizarProdutos(produtos) {

    const tbody = document.getElementById("listaProdutos");
    tbody.innerHTML = "";

    produtos.forEach(p => {

        tbody.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.categoria_nome || "-"}</td>
                <td>R$ ${Number(p.preco_venda || 0).toFixed(2)}</td>
                <td>${Number(p.estoque || 0).toFixed(2)}</td>

                <td>
                    ${p.imagem_principal
                ? `<img src="/uploads/produtos/${p.imagem_principal}" class="img-tabela">`
                : "-"
            }
                </td>

                <td>${p.status === "A"
                ? '<span class="text-success">Ativo</span>'
                : '<span class="text-danger">Inativo</span>'}
                </td>

                <td>
                    <button onclick="editarProduto(${p.id})">✏️</button>
                    <button onclick="excluirProduto(${p.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}