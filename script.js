document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html')) {
        carregarArtigos(); // Chama a função para carregar os artigos na página inicial
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
        // Tente carregar o arquivo db.json, certifique-se de que o caminho está correto
        const response = await fetch('/db.json'); // Caminho absoluto para o JSON
        if (!response.ok) throw new Error('Erro ao carregar os artigos. Verifique se o arquivo db.json está no local correto.');

        const dados = await response.json();
        const artigos = dados.artigos;
        console.log('Artigos carregados:', artigos); // Log para verificar os dados

        const gradeArtigos = document.getElementById('grade-artigos');
        
        // Verificação adicional para garantir que o elemento existe
        if (!gradeArtigos) {
            throw new Error('Elemento grade-artigos não encontrado no DOM.');
        }

        gradeArtigos.innerHTML = ''; // Limpa o conteúdo existente

        artigos.forEach((artigo) => {
            const card = criarCardArtigo(artigo);
            gradeArtigos.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os artigos:', error); // Log para capturar qualquer erro
    }
}

// Função para criar o card de um artigo com imagem
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

// Função para configurar o botão flutuante
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
