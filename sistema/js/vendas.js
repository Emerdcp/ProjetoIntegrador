let itensVenda = [];
let vendas = [];
let listaProdutos = []; // 🔥 para pegar preço

// ================= COMBOS =================

async function carregarClientes() {

    const res = await fetch("/api/clientes");
    const clientes = await res.json();

    const select = document.getElementById("ven_cliente");
    select.innerHTML = '<option value="">Selecione</option>';

    clientes.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
    });

    const filtro = document.getElementById("filtroCliente");
    if (filtro) {
        filtro.innerHTML = '<option value="">Todos</option>';
        clientes.forEach(c => {
            filtro.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
        });
    }
}

async function carregarProdutos() {

    const res = await fetch("/api/produtos");
    listaProdutos = await res.json();

    const select = document.getElementById("ven_produto");
    select.innerHTML = '<option value="">Selecione</option>';

    listaProdutos.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.nome}</option>`;
    });
}

// 🔥 AUTO PREENCHER VALOR
document.addEventListener("change", function(e) {

    if (e.target.id === "ven_produto") {

        const id = e.target.value;

        const produto = listaProdutos.find(p => p.id == id);

        if (produto) {
            document.getElementById("ven_valor").value = produto.preco_venda;
        }
    }

});

// ================= LISTAR =================
async function listarVendas() {

    const res = await fetch("/api/vendas");

    if (!res.ok) return;

    vendas = await res.json();

    const tbody = document.getElementById("listaVendas");
    tbody.innerHTML = "";

    vendas.forEach(v => {
        tbody.innerHTML += `
            <tr>
                <td>${new Date(v.data_pedido).toLocaleString()}</td>
                <td>${v.cliente_nome}</td>
                <td>R$ ${parseFloat(v.valor_total).toFixed(2)}</td>
                <td>${v.status}</td>
                <td>
                    <button onclick="editarVenda(${v.id})">✏️</button>
                    <button onclick="excluirVenda(${v.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// ================= MODAL =================
function abrirModalVenda() {

    itensVenda = [];

    document.getElementById("ven_id").value = "";
    document.getElementById("ven_cliente").value = "";
    document.getElementById("ven_valor").value = "";
    document.getElementById("ven_qtd").value = "";

    renderItens();

    document.getElementById("modalVenda").classList.remove("hidden");
}

// ================= EDITAR =================
async function editarVenda(id) {

    const res = await fetch("/api/vendas/" + id);
    const venda = await res.json();

    document.getElementById("ven_id").value = venda.id;
    document.getElementById("ven_cliente").value = venda.cliente_id;

    itensVenda = venda.itens.map(i => ({
        produto_id: i.produto_id,
        nome: i.produto_nome,
        quantidade: i.quantidade,
        valor: i.valor_unitario,
        subtotal: i.subtotal
    }));

    renderItens();

    document.getElementById("modalVenda").classList.remove("hidden");
}

// ================= ITENS =================
function addItemVenda() {

    const produto = document.getElementById("ven_produto");
    const qtd = document.getElementById("ven_qtd").value;
    const valor = document.getElementById("ven_valor").value;

    if (!produto.value || !qtd || !valor) {
        mostrarMensagem("Atenção", "Preencha os campos");
        return;
    }

    const subtotal = qtd * valor;

    itensVenda.push({
        produto_id: produto.value,
        nome: produto.options[produto.selectedIndex].text,
        quantidade: Number(qtd),
        valor: Number(valor),
        subtotal: Number(subtotal)
    });

    renderItens();
}

function renderItens() {

    let total = 0;
    const tbody = document.getElementById("itensVenda");
    tbody.innerHTML = "";

    itensVenda.forEach((i, index) => {

        const qtd = Number(i.quantidade);
        const valor = Number(i.valor);
        const subtotal = Number(i.subtotal);

        total += subtotal;

        tbody.innerHTML += `
            <tr>
                <td>${i.nome}</td>
                <td>${qtd}</td>
                <td>${valor.toFixed(2)}</td>
                <td>${subtotal.toFixed(2)}</td>
                <td><button onclick="removerItem(${index})">❌</button></td>
            </tr>
        `;
    });

    document.getElementById("totalVenda").innerText = total.toFixed(2);
}

function removerItem(index) {
    itensVenda.splice(index, 1);
    renderItens();
}

// ================= SALVAR =================
async function salvarVenda() {

    const venda = {
        id: document.getElementById("ven_id").value,
        cliente_id: document.getElementById("ven_cliente").value,
        forma_pagamento: document.getElementById("ven_forma").value,
        itens: itensVenda
    };

    const metodo = venda.id ? "PUT" : "POST";
    const url = venda.id ? "/api/vendas/" + venda.id : "/api/vendas";

    const res = await fetch(url, {
        method: metodo,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(venda)
    });

    if (!res.ok) {
        mostrarMensagem("Erro", "Erro ao salvar");
        return;
    }

    mostrarMensagem("Sucesso", "Venda salva!");
    fecharModal("modalVenda");
    listarVendas();
}

// ================= EXCLUIR =================
function excluirVenda(id) {

    abrirConfirmacao("Deseja excluir esta venda?", async () => {

        await fetch("/api/vendas/" + id, {
            method: "DELETE"
        });

        listarVendas();
        mostrarMensagem("Sucesso", "Venda excluída!");
    });
}

// ================= FILTRO =================
async function aplicarFiltroVenda() {

    const filtros = {
        cliente_id: document.getElementById("filtroCliente").value,
        status: document.getElementById("filtroStatus").value,
        data_inicio: document.getElementById("filtroDataInicio").value,
        data_fim: document.getElementById("filtroDataFim").value
    };

    const res = await fetch("/api/vendas/filtrar", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(filtros)
    });

    vendas = await res.json();
    listarVendas();

    fecharModal("modalFiltroVenda");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();
    carregarProdutos();
    listarVendas();
});

// ===== CONFIRMAÇÃO =====
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

document.addEventListener("DOMContentLoaded", () => {

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