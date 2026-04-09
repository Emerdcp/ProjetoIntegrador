async function listarPedidosCatalogo() {

    const res = await fetch("/api/pedido");
    const pedidos = await res.json();

    const tbody = document.getElementById("listarCatalogoVendas");
    tbody.innerHTML = "";

    pedidos.forEach(p => {

        tbody.innerHTML += `
            <tr>
                <td>${p.cliente_nome}</td>
                <td>${p.telefone}</td>
                <td>R$ ${parseFloat(p.total).toFixed(2)}</td>
                <td>${new Date(p.data_pedido).toLocaleString()}</td>
                <td>${p.status}</td>
                <td>
                    <button onclick="verItens(${p.id})">👁</button>
                </td>
            </tr>
        `;
    });
}

async function verItens(id) {

    const res = await fetch("/api/pedido/" + id);
    const itens = await res.json();

    const div = document.getElementById("listaItensPedido");
    div.innerHTML = "";

    itens.forEach(i => {
        div.innerHTML += `
            <p>${i.nome_produto} - ${i.quantidade}x - R$ ${i.valor}</p>
        `;
    });

    document.getElementById("modalItens").classList.remove("hidden");
}

function fecharModalItens() {
    document.getElementById("modalItens").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", listarPedidosCatalogo);