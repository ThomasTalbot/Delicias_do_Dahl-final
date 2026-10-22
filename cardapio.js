const API = 'https://tech4produtos.fly.dev';
const RESTAURANTE = 'Delícias do Dahl';
const lista = document.querySelector('#lista-produtos');
const mensagem = document.querySelector('#mensagem-cardapio');
function criarCard(produto) {
    const card = document.createElement('article'); card.className = 'card';
    const imagem = document.createElement('img'); imagem.src = produto.imagem; imagem.alt = produto.produto;
    const titulo = document.createElement('h3'); titulo.textContent = produto.produto;
    const descricao = document.createElement('p'); descricao.textContent = produto.descricao;
    const link = document.createElement('a'); link.className = 'btn'; link.href = `menu-detalhado.html?id=${encodeURIComponent(produto.id)}`; link.textContent = 'Ver Detalhes';
    card.append(imagem, titulo, descricao, link); return card;
}
async function carregarCardapio() {
    try {
        const resposta = await fetch(`${API}/produtos/restaurante=${encodeURIComponent(RESTAURANTE)}`);
        if (!resposta.ok) throw new Error('Falha ao buscar o cardápio.');
        const produtos = await resposta.json();
        if (!Array.isArray(produtos) || produtos.length === 0) { mensagem.textContent = 'Ainda não há pratos cadastrados para este restaurante.'; return; }
        lista.replaceChildren(...produtos.map(criarCard)); mensagem.remove();
    } catch (erro) { mensagem.textContent = 'Não foi possível carregar o cardápio pela API.'; console.error(erro); }
}
carregarCardapio();
