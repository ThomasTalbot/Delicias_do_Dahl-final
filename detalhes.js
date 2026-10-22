const API = 'https://tech4produtos.fly.dev';
const id = new URLSearchParams(window.location.search).get('id');
const areaDetalhe = document.querySelector('#produto-detalhe');
const mensagem = document.querySelector('#mensagem-detalhes');

function mostrarProduto(produto) {
    const imagem = document.createElement('img');
    imagem.src = produto.imagem;
    imagem.alt = produto.produto;

    const conteudo = document.createElement('div');
    conteudo.className = 'prato-info';
    const titulo = document.createElement('h2');
    titulo.textContent = produto.produto;
    const descricao = document.createElement('p');
    descricao.textContent = produto.descricao;
    const botao = document.createElement('button');
    botao.className = 'pedido';
    botao.textContent = 'FAZER PEDIDO';
    botao.addEventListener('click', () => alert('Pedido realizado! O Dahl já está suando na cozinha.'));

    conteudo.append(titulo, descricao, botao);
    areaDetalhe.append(imagem, conteudo);
}

async function carregarDetalhes() {
    if (!id) {
        mensagem.textContent = 'Escolha um prato no cardápio para ver os detalhes.';
        return;
    }

    try {
        const resposta = await fetch(`${API}/produtos/${encodeURIComponent(id)}`);
        if (!resposta.ok) throw new Error('Prato não encontrado.');
        mostrarProduto(await resposta.json());
        mensagem.remove();
    } catch (erro) {
        mensagem.textContent = 'Não foi possível carregar os detalhes deste prato pela API.';
        console.error(erro);
    }
}

carregarDetalhes();
