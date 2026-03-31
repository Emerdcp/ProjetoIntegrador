async function carregarDashboard() {

    // 🔥 DADOS MOCK (depois vamos ligar no banco)
    document.getElementById("faturamento").innerText = "R$ 12.500,00";
    document.getElementById("pedidos").innerText = "32";
    document.getElementById("produtos").innerText = "18";
    document.getElementById("clientes").innerText = "45";

    // TABELA
    const pedidos = [
        { cliente: "João", valor: "R$ 200,00", data: "25/03" },
        { cliente: "Maria", valor: "R$ 350,00", data: "25/03" }
    ];

    const tbody = document.getElementById("listaPedidos");

    pedidos.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.cliente}</td>
                <td>${p.valor}</td>
                <td>${p.data}</td>
            </tr>
        `;
    });
}

document.addEventListener("DOMContentLoaded", carregarDashboard);