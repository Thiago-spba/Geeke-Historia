document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html')) {
        carregarArtigos();
    } else if (currentPage.includes('adicionar.html')) {
        configurarFormularioAdicionar();
    } else if (currentPage.includes('deletar.html')) {
        carregarArtigosDeletar();
    }

    configurarBotaoFlutuante();
});

// Função para carregar e exibir os artigos na página inicial
async function carregarArtigos() {
    try {
        // Carrega o JSON diretamente do arquivo db.json para uso no GitHub Pages
        const response = await fetch('./db.json'); // Carrega o JSON localmente
        if (!response.ok) throw new Error('Erro ao carregar os artigos');

        const dados = await response.json();
        const artigos = dados.artigos; // Obtém os artigos do JSON
        const gradeArtigos = document.getElementById('grade-artigos');
        gradeArtigos.innerHTML = ''; // Limpa o conteúdo existente

        artigos.forEach((artigo) => {
            const card = criarCardArtigo(artigo);
            gradeArtigos.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os artigos:', error);
    }
}

// Função para criar o card do artigo com imagem e conteúdo
function criarCardArtigo(artigo) {
    const card = document.createElement('div');
    card.className = 'artigo-card';

    const imagemSrc = artigo.imagem ? artigo.imagem : "https://link-da-imagem-padrao.com/imagem-padrao.jpg";

    card.innerHTML = `
        <h3>${artigo.titulo}</h3>
        <p>${artigo.preview}</p>
        <img src="${imagemSrc}" alt="Imagem do artigo" style="max-width:100%; height:auto;">
        <button class="botao-ler-artigo">Ler Artigo</button>
    `;

    const botaoLer = card.querySelector('.botao-ler-artigo');
    botaoLer.addEventListener('click', () => {
        abrirPopup(artigo.titulo, artigo.conteudo, imagemSrc);
    });

    return card;
}

// Função para abrir o pop-up com o conteúdo do artigo
function abrirPopup(titulo, conteudo, imagemSrc) {
    const popup = document.getElementById('popup');
    const tituloArtigo = document.getElementById('titulo-artigo');
    const conteudoArtigo = document.getElementById('conteudo-artigo');
    const imagemArtigo = document.getElementById('imagem-artigo');

    tituloArtigo.textContent = titulo;
    conteudoArtigo.textContent = conteudo;
    imagemArtigo.src = imagemSrc;

    popup.style.display = 'block';
}

// Função para fechar o pop-up
function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
}

// Função para carregar artigos na página de deletar
async function carregarArtigosDeletar() {
    try {
        const response = await fetch('./db.json'); // Carrega o JSON localmente
        if (!response.ok) throw new Error('Erro ao carregar os artigos para deletar');

        const dados = await response.json();
        const artigos = dados.artigos;
        const gradeArtigosDeletar = document.getElementById('grade-artigos-deletar');
        gradeArtigosDeletar.innerHTML = '';

        artigos.forEach((artigo) => {
            const card = document.createElement('div');
            card.className = 'artigo-card';

            card.innerHTML = `
                <h3>${artigo.titulo}</h3>
                <p>${artigo.preview}</p>
                <button onclick="deletarArtigo(${artigo.id})" class="botao-deletar">Deletar</button>
            `;

            gradeArtigosDeletar.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os artigos para deletar:', error);
    }
}

// Função para deletar um artigo (apenas informativa para GitHub Pages)
function deletarArtigo(id) {
    alert('Esta função de deleção não é suportada no GitHub Pages, pois requer um backend.');
}

// Configura o botão flutuante para mostrar as opções
function configurarBotaoFlutuante() {
    const floatButton = document.getElementById('float-button');
    const floatOptions = document.getElementById('float-options');

    if (floatButton && floatOptions) {
        floatButton.addEventListener('click', () => {
            floatOptions.style.display = floatOptions.style.display === 'block' ? 'none' : 'block';
        });
    } else {
        console.error("Elementos do botão flutuante não encontrados");
    }
}

// Função para configurar o formulário de adicionar artigo (apenas informativa para GitHub Pages)
function configurarFormularioAdicionar() {
    alert('Esta função de adição não é suportada no GitHub Pages, pois requer um backend.');
}
