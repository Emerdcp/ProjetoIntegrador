// ================= CLIENTE =================

// MODAL
function abrirModalCliente() {

    document.getElementById("tituloModalCliente").innerText = "Novo Cliente";

    document.getElementById("idCliente").value = "";
    document.getElementById("cli_nome").value = "";
    document.getElementById("cli_documento").value = "";
    document.getElementById("cli_telefone").value = "";
    document.getElementById("cli_email").value = "";
    document.getElementById("cli_status").value = "A";

    document.getElementById("cli_cep").value = "";
    document.getElementById("cli_endereco").value = "";
    document.getElementById("cli_numero").value = "";
    document.getElementById("cli_bairro").value = "";
    document.getElementById("cli_cidade").value = "";
    document.getElementById("cli_estado").value = "";

    document.getElementById("modalCliente").classList.remove("hidden");
}

function fecharModalCliente() {
    document.getElementById("modalCliente").classList.add("hidden");
}

// ================= SALVAR =================
async function salvarCliente() {

    const id = document.getElementById("idCliente").value || null;

    const cliente = {
        id,
        nome: document.getElementById("cli_nome").value.trim(),
        documento: document.getElementById("cli_documento").value,
        telefone: document.getElementById("cli_telefone").value,
        email: document.getElementById("cli_email").value,
        status: document.getElementById("cli_status").value,
        cep: document.getElementById("cli_cep").value,
        logradouro: document.getElementById("cli_endereco").value,
        numero: document.getElementById("cli_numero").value,
        bairro: document.getElementById("cli_bairro").value,
        cidade: document.getElementById("cli_cidade").value,
        estado: document.getElementById("cli_estado").value
    };

    if (!cliente.nome) {
        mostrarMensagem("Atenção", "Informe o nome");
        return;
    }

    try {

        const response = await fetch("/api/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar cliente");
        }

        fecharModalCliente();
        listarClientes();

        mostrarMensagem("Sucesso", "Cliente salvo com sucesso!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao salvar cliente");
    }
}

// ================= LISTAR =================
async function listarClientes() {

    try {

        const response = await fetch("/api/clientes");

        if (!response.ok) {
            throw new Error("Erro ao carregar clientes");
        }

        const clientes = await response.json();

        renderizarClientes(clientes);

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar clientes");
    }
}

// ================= RENDER =================
function renderizarClientes(clientes) {

    const tbody = document.getElementById("listaClientes");
    tbody.innerHTML = "";

    clientes.forEach(c => {

        tbody.innerHTML += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.telefone || ""}</td>
                <td>${c.email || ""}</td>
                <td>${traduzirStatus(c.status)}</td>
                <td>
                    <button onclick="editarCliente(${c.id})">✏️</button>
                    <button onclick="excluirCliente(${c.id})">🗑️</button>
                    <button onclick="verHistorico(${c.id})">📜</button>
                </td>
            </tr>
        `;
    });
}

// ================= STATUS =================
function traduzirStatus(status) {
    return status === "A"
        ? '<span class="text-success">Ativo</span>'
        : '<span class="text-danger">Inativo</span>';
}

// ================= EDITAR =================
async function editarCliente(id) {

    try {

        const response = await fetch("/api/clientes/" + id);

        if (!response.ok) {
            throw new Error("Erro ao buscar cliente");
        }

        const c = await response.json();

        document.getElementById("tituloModalCliente").innerText = "Editar Cliente";

        document.getElementById("idCliente").value = c.id;
        document.getElementById("cli_nome").value = c.nome || "";
        document.getElementById("cli_documento").value = c.documento || "";
        document.getElementById("cli_telefone").value = c.telefone || "";
        document.getElementById("cli_email").value = c.email || "";
        document.getElementById("cli_status").value = c.status || "A";

        // 🔥 ENDEREÇO (corrigido)
        document.getElementById("cli_cep").value = c.cep || "";
        document.getElementById("cli_endereco").value = c.logradouro || "";
        document.getElementById("cli_numero").value = c.numero || "";
        document.getElementById("cli_bairro").value = c.bairro || "";
        document.getElementById("cli_cidade").value = c.cidade || "";
        document.getElementById("cli_estado").value = c.estado || "";

        document.getElementById("modalCliente").classList.remove("hidden");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar cliente");
    }
}

// ================= EXCLUIR =================
function excluirCliente(id) {

    abrirConfirmacao("Deseja inativar este cliente?", () => {
        confirmarExclusaoCliente(id);
    });

}

async function confirmarExclusaoCliente(id) {

    try {

        const response = await fetch("/api/clientes/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir cliente");
        }

        listarClientes();
        mostrarMensagem("Sucesso", "Cliente inativado!");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao excluir cliente");
    }
}

// ================= MÁSCARAS =================
function aplicarMascara(valor, tipo) {

    valor = valor.replace(/\D/g, "");

    if (tipo === "cpf") {
        return valor
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (tipo === "cnpj") {
        return valor
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    if (tipo === "cep") {
        return valor.replace(/(\d{5})(\d)/, "$1-$2");
    }

    if (tipo === "telefone") {
        return valor
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return valor;
}

// ================= CEP =================
async function buscarCEP(e) {

    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {

        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        if (data.erro) {
            mostrarMensagem("Atenção", "CEP não encontrado");
            return;
        }

        document.getElementById("cli_endereco").value = data.logradouro || "";
        document.getElementById("cli_bairro").value = data.bairro || "";
        document.getElementById("cli_cidade").value = data.localidade || "";
        document.getElementById("cli_estado").value = data.uf || "";

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao buscar CEP");
    }
}

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
        const telefone = document.getElementById("filtroTelefone").value;
        const status = document.getElementById("filtroStatus").value;

        const response = await fetch("/api/clientes/filtrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, telefone, status })
        });

        if (!response.ok) {
            throw new Error("Erro ao filtrar");
        }

        const clientes = await response.json();

        renderizarClientes(clientes);
        fecharFiltro();

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao filtrar clientes");
    }
}

// ================= HISTÓRICO =================
async function verHistorico(id) {

    try {

        const response = await fetch("/api/clientes-historico/" + id);

        if (!response.ok) {
            throw new Error("Erro ao carregar histórico");
        }

        const logs = await response.json();

        const div = document.getElementById("listaHistorico");
        div.innerHTML = "";

        logs.forEach(l => {

            div.innerHTML += `
                <div style="border-bottom:1px solid #ddd; margin-bottom:8px; padding-bottom:8px;">
                    <strong>${new Date(l.data).toLocaleString()}</strong><br>
                    ${l.tipo} - ${l.usuario}
                </div>
            `;
        });

        document.getElementById("modalHistorico").classList.remove("hidden");

    } catch (err) {
        console.error(err);
        mostrarMensagem("Erro", "Erro ao carregar histórico");
    }
}

function fecharHistorico() {
    document.getElementById("modalHistorico").classList.add("hidden");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    listarClientes();

    const doc = document.getElementById("cli_documento");
    const cep = document.getElementById("cli_cep");
    const tel = document.getElementById("cli_telefone");

    if (doc) {
        doc.addEventListener("input", e => {
            let v = e.target.value.replace(/\D/g, "");
            e.target.value = v.length <= 11
                ? aplicarMascara(v, "cpf")
                : aplicarMascara(v, "cnpj");
        });
    }

    if (cep) {
        cep.addEventListener("input", e => {
            e.target.value = aplicarMascara(e.target.value, "cep");
        });

        cep.addEventListener("blur", buscarCEP);
    }

    if (tel) {
        tel.addEventListener("input", e => {
            e.target.value = aplicarMascara(e.target.value, "telefone");
        });
    }

});