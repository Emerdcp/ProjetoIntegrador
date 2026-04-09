// ================== CARREGAR CATALOGO ==================
async function carregarCatalogo() {

    try {

        // 🔥 ALTERADO: PHP → NODE
        const response = await fetch("/api/catalogo");

        const produtos = await response.json();

        if (!Array.isArray(produtos)) {
            console.error("Erro no retorno:", produtos);
            return;
        }

        const container = document.getElementById("catalogoProdutos");
        container.innerHTML = "";

        produtos.forEach(p => {

            // 🔥 TRATAMENTO DE IMAGEM
            const imagens = p.imagens ? p.imagens.split(",") : ["sem-imagem.png"];

            let imagensHTML = "";

            imagens.forEach((img, i) => {

                // 🔥 ALTERADO: remove BASE_URL
                imagensHTML += `
                <img src="/uploads/produtos/${img}" 
                    class="produto-slide ${i === 0 ? 'ativo' : ''}"
                    onclick="abrirGaleria(${p.id}, ${i})">
                `;
            });

            container.innerHTML += `
            <div class="col-md-3" data-categoria="${p.categoria}">

                <div class="card produto-card">

                    <div class="slider" id="slider-${p.id}">
                        
                        ${imagensHTML}

                        <button class="seta prev" onclick="mudarSlide(${p.id}, -1)">❮</button>
                        <button class="seta next" onclick="mudarSlide(${p.id}, 1)">❯</button>

                    </div>

                    <div class="card-body text-center">
                        <p class="categoria-produto">${p.categoria}</p>
                        <h5>${p.nome}</h5>
                        <p>
                            R$ ${parseFloat(p.preco_venda).toFixed(2)}
                        </p>
                        <button class="btn-comprar"
                        onclick='adicionarCarrinho({
                            id:${p.id},
                            nome:"${p.nome}",
                            preco:${parseFloat(p.preco_venda)}
                        })'>
                        🛒 Adicionar
                        </button>
                    </div>

                </div>

            </div>
            `;

            iniciarSlider(p.id);

        });

    } catch (erro) {

        console.error("Erro ao carregar catálogo", erro);
        

    }

}

document.addEventListener("DOMContentLoaded", carregarCatalogo);


// ================== SLIDER ==================
function iniciarSlider(id) {

    const slides = document.querySelectorAll(`#slider-${id} .produto-slide`);

    if (slides.length === 0) return; // 🔥 proteção

    let index = 0;

    setInterval(() => {

        slides[index].classList.remove("ativo");

        index = (index + 1) % slides.length;

        slides[index].classList.add("ativo");

    }, 3000);

}


// ================== GALERIA ==================
let galeriaImagens = [];
let galeriaIndex = 0;

function abrirGaleria(produtoId, index) {

    document.body.style.overflow = "hidden";

    const slider = document.querySelector(`#slider-${produtoId}`);
    const imgs = slider.querySelectorAll("img");

    galeriaImagens = Array.from(imgs).map(i => i.src);

    galeriaIndex = index;

    document.getElementById("imagemGaleria").src = galeriaImagens[index];

    document.getElementById("galeriaModal").style.display = "flex";
}

function fecharGaleria() {
    document.body.style.overflow = "auto";
    document.getElementById("galeriaModal").style.display = "none";
}

function mudarImagem(dir) {

    galeriaIndex += dir;

    if (galeriaIndex < 0) galeriaIndex = galeriaImagens.length - 1;
    if (galeriaIndex >= galeriaImagens.length) galeriaIndex = 0;

    document.getElementById("imagemGaleria").src = galeriaImagens[galeriaIndex];
}


// ================== SLIDE MANUAL ==================
function mudarSlide(produtoId, dir) {

    const slides = document.querySelectorAll(`#slider-${produtoId} .produto-slide`);

    let ativo = 0;

    slides.forEach((s, i) => {
        if (s.classList.contains("ativo")) ativo = i;
    });

    slides[ativo].classList.remove("ativo");

    ativo += dir;

    if (ativo < 0) ativo = slides.length - 1;
    if (ativo >= slides.length) ativo = 0;

    slides[ativo].classList.add("ativo");
}


// ================== FILTRO ==================
function filtrarCatalogo() {

    const busca = document
        .getElementById("buscarProduto")
        .value
        .toLowerCase()
        .trim();

    const cards = document.querySelectorAll("#catalogoProdutos .col-md-3");

    cards.forEach(card => {

        const nome = card.querySelector("h5").innerText.toLowerCase();
        const categoria = card.dataset.categoria?.toLowerCase() || "";

        if (nome.includes(busca) || categoria.includes(busca)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


// ================== CARRINHO ==================
function abrirCarrinho() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((p, i) => {
        total += p.preco * p.qtd;

        lista.innerHTML += `
        <div class="item-carrinho">
            <strong>${p.nome}</strong><br>
            Quantidade: ${p.qtd}<br>
            R$ ${(p.preco * p.qtd).toFixed(2)}
            <button onclick="removerCarrinho(${i})">❌</button>
        </div>
        `;
    });

    lista.innerHTML += `<hr><h4>Total: R$ ${total.toFixed(2)}</h4>`;

    document.getElementById("carrinhoLateral").classList.add("ativo");
    document.getElementById("overlayCarrinho").classList.remove("hidden");
}

function fecharCarrinho() {
    document.getElementById("carrinhoLateral").classList.remove("ativo");
    document.getElementById("overlayCarrinho").classList.add("hidden");
}

function adicionarCarrinho(produto) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const existente = carrinho.find(p => p.id === produto.id);

    if (existente) {
        existente.qtd += 1;
    } else {
        produto.qtd = 1;
        carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
}

function atualizarCarrinho() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = carrinho.reduce((soma, p) => soma + p.qtd, 0);

    document.getElementById("contadorCarrinho").innerText = total;
}

function removerCarrinho(index) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho[index].qtd > 1) {
        carrinho[index].qtd -= 1;
    } else {
        carrinho.splice(index, 1);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    abrirCarrinho();
    atualizarCarrinho();
}


// ================== PEDIDO ==================
function abrirFormularioPedido() {
    document.getElementById("modalPedido").classList.remove("hidden");
}

function fecharModalPedido() {
    document.getElementById("modalPedido").classList.add("hidden");
}

async function finalizarPedido() {

    const nome = document.getElementById("nomeCliente").value;
    const telefone = document.getElementById("telefoneCliente").value;
    const pagamento = document.getElementById("formaPagamento").value;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (!nome || !telefone || !pagamento) {
        mostrarMensagem("Atenção", "Preencha todos os campos!");
        return;
    }

    // 🔥 AJUSTE AQUI
    const itensFormatados = carrinho.map(p => ({
        id: p.id,
        nome: p.nome,
        quantidade: Number(p.qtd),
        preco: Number(p.preco)
    }));

    const pedido = {
        nome,
        telefone,
        pagamento,
        itens: itensFormatados
    };

    try {

        const response = await fetch("/api/pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();

        if (data.sucesso) {

            let mensagem = `🛒 *Novo Pedido*%0A%0A`;
            mensagem += `👤 Nome: ${nome}%0A`;
            mensagem += `📞 Telefone: ${telefone}%0A`;
            mensagem += `💳 Pagamento: ${pagamento}%0A%0A`;

            let total = 0;

            carrinho.forEach(p => {
                const subtotal = p.preco * p.qtd;
                total += subtotal;

                mensagem += `• ${p.nome}%0A`;
                mensagem += `  Qtd: ${p.qtd}%0A`;
                mensagem += `  R$ ${subtotal.toFixed(2)}%0A%0A`;
            });

            mensagem += `💰 Total: R$ ${total.toFixed(2)}`;

            const url = `https://wa.me/5519981082383?text=${mensagem}`;
            window.open(url, "_blank");

            localStorage.removeItem("carrinho");

            atualizarCarrinho();

            mostrarMensagem(
                "Pedido enviado!",
                "Seu pedido foi enviado com sucesso!",
                () => {
                    fecharModalPedido();
                    fecharCarrinho();
                }
            );

        }

    } catch (e) {
        console.error(e);
        alert("Erro no servidor");
    }
}


// ================== MODAL ==================
function mostrarMensagem(titulo, texto, callback = null) {

    const tituloEl = document.getElementById("modalMensagemTitulo");
    const textoEl = document.getElementById("modalMensagemTexto");

    if (!tituloEl || !textoEl) {
        alert(texto);
        return;
    }

    tituloEl.innerText = titulo;
    textoEl.innerText = texto;

    const btn = document.getElementById("modalBtnConfirmar");

    btn.onclick = function () {
        fecharModalMensagem();
        if (callback) callback();
    };

    document.getElementById("modalMensagem").classList.remove("hidden");
}

function fecharModalMensagem() {
    document.getElementById("modalMensagem").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarCarrinho();
});



function abrirModalLogin() {
    document.getElementById("modalLogin").classList.remove("hidden");
}

function fecharModalLogin() {
    document.getElementById("modalLogin").classList.add("hidden");
}