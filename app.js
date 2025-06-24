// Estruturas de dados em memória
let cidades = [];
let projetos = [];
let participantes = [];
let feedPosts = [];

// Novos arrays para jogadores e clubes/olheiros
let jogadores = [];
let clubes = [];

// Navegação de páginas
function mostrarPagina(pagina) {
    const ids = [
        'pagina-home', 'pagina-jogadores', 'pagina-clubes',
        'pagina-login', 'pagina-cadastro-jogador', 'pagina-cadastro-clube',
        'pagina-perfil-jogador', 'pagina-perfil-clube'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === 'pagina-' + pagina) ? '' : 'none';
    });
    // Atualiza listas ao entrar nas páginas
    if (pagina === 'jogadores') renderizarJogadores();
    if (pagina === 'clubes') renderizarClubes();
}

// Cadastro fake de jogador
function cadastrarJogador(event) {
    event.preventDefault();
    jogadores.push({
        nome: document.getElementById('nome-jogador').value,
        email: document.getElementById('email-jogador').value,
        cidade: document.getElementById('cidade-jogador').value,
        posicao: document.getElementById('posicao-jogador').value,
        descricao: document.getElementById('descricao-jogador').value,
        contato: document.getElementById('contato-jogador').value,
        video: document.getElementById('video-jogador').value
    });
    alert('Jogador cadastrado com sucesso!');
    mostrarPagina('jogadores');
    renderizarJogadores();
    event.target.reset();
}

// Cadastro fake de clube/olheiro
function cadastrarClube(event) {
    event.preventDefault();
    clubes.push({
        nome: document.getElementById('nome-clube').value,
        email: document.getElementById('email-clube').value,
        cidade: document.getElementById('cidade-clube').value,
        contato: document.getElementById('contato-clube').value,
        interesse: document.getElementById('interesse-clube').value
    });
    alert('Clube/Olheiro cadastrado com sucesso!');
    mostrarPagina('clubes');
    renderizarClubes();
    event.target.reset();
}

// Renderização de cards de jogadores
function renderizarJogadores(filtroCidade = '', filtroPosicao = '') {
    const lista = document.getElementById('lista-jogadores');
    if (!lista) return;
    let filtrados = jogadores;
    if (filtroCidade) filtrados = filtrados.filter(j => j.cidade.toLowerCase().includes(filtroCidade.toLowerCase()));
    if (filtroPosicao) filtrados = filtrados.filter(j => j.posicao === filtroPosicao);
    if (filtrados.length === 0) {
        lista.innerHTML = '<p style="color:#888;text-align:center;">Nenhum jogador encontrado.</p>';
        return;
    }
    lista.innerHTML = filtrados.map((j, idx) => `
        <div class="card-jogador" onclick="abrirPerfilJogador(${jogadores.indexOf(j)})" style="cursor:pointer;">
            <h3>${j.nome}</h3>
            <p><strong>Posição:</strong> ${j.posicao}</p>
            <p><strong>Cidade:</strong> ${j.cidade}</p>
            <p><strong>Estilo de jogo:</strong> ${j.descricao}</p>
            <p><strong>Contato:</strong> ${j.contato}</p>
            ${j.video ? `<a href="${j.video}" target="_blank">Ver vídeo</a>` : ''}
        </div>
    `).join('');
}

// Renderização de cards de clubes/olheiros
function renderizarClubes(filtroCidade = '') {
    const lista = document.getElementById('lista-clubes');
    if (!lista) return;
    let filtrados = clubes;
    if (filtroCidade) filtrados = filtrados.filter(c => c.cidade.toLowerCase().includes(filtroCidade.toLowerCase()));
    if (filtrados.length === 0) {
        lista.innerHTML = '<p style="color:#888;text-align:center;">Nenhum clube/olheiro encontrado.</p>';
        return;
    }
    lista.innerHTML = filtrados.map((c, idx) => `
        <div class="card-clube" onclick="abrirPerfilClube(${clubes.indexOf(c)})" style="cursor:pointer;">
            <h3>${c.nome}</h3>
            <p><strong>Cidade:</strong> ${c.cidade}</p>
            <p><strong>Contato:</strong> ${c.contato}</p>
            <p><strong>Tipo de interesse:</strong> ${c.interesse}</p>
        </div>
    `).join('');
}

// Exibir perfil do jogador
function abrirPerfilJogador(idx) {
    const j = jogadores[idx];
    if (!j) return;
    const div = document.getElementById('perfil-jogador-detalhe');
    div.innerHTML = `
        <h3>${j.nome}</h3>
        <p><strong>E-mail:</strong> ${j.email}</p>
        <p><strong>Cidade:</strong> ${j.cidade}</p>
        <p><strong>Posição:</strong> ${j.posicao}</p>
        <p><strong>Estilo de jogo:</strong> ${j.descricao}</p>
        <p><strong>Contato:</strong> ${j.contato}</p>
        ${j.video ? `<p><a href="${j.video}" target="_blank">Ver vídeo do jogador</a></p>` : ''}
    `;
    mostrarPagina('perfil-jogador');
}

// Exibir perfil do clube/empresário
function abrirPerfilClube(idx) {
    const c = clubes[idx];
    if (!c) return;
    const div = document.getElementById('perfil-clube-detalhe');
    div.innerHTML = `
        <h3>${c.nome}</h3>
        <p><strong>E-mail:</strong> ${c.email}</p>
        <p><strong>Cidade:</strong> ${c.cidade}</p>
        <p><strong>Contato:</strong> ${c.contato}</p>
        <p><strong>Tipo de interesse:</strong> ${c.interesse}</p>
    `;
    mostrarPagina('perfil-clube');
}

// Filtros
function filtrarJogadores(event) {
    event.preventDefault();
    const cidade = document.getElementById('filtro-cidade-jogador').value;
    const posicao = document.getElementById('filtro-posicao-jogador').value;
    renderizarJogadores(cidade, posicao);
}
function filtrarClubes(event) {
    event.preventDefault();
    const cidade = document.getElementById('filtro-cidade-clube').value;
    renderizarClubes(cidade);
}

// Login fake
function loginFake(event) {
    event.preventDefault();
    alert('Login simulado! (Funcionalidade fake)');
    mostrarPagina('home');
}

// Feed de notícias
function adicionarPostFeed(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo-feed').value.trim();
    const mensagem = document.getElementById('mensagem-feed').value.trim();
    if (titulo && mensagem) {
        feedPosts.unshift({
            titulo,
            mensagem,
            data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
        });
        document.getElementById('titulo-feed').value = '';
        document.getElementById('mensagem-feed').value = '';
        renderizarFeed();
    }
}

function renderizarFeed() {
    const feedDiv = document.getElementById('feed-lista');
    if (!feedDiv) return;
    if (feedPosts.length === 0) {
        feedDiv.innerHTML = '<p style="color:#888;text-align:center;">Nenhuma postagem ainda. Compartilhe oportunidades, peneiras, campeonatos ou novidades!</p>';
        return;
    }
    feedDiv.innerHTML = feedPosts.map(post => `
        <div class="feed-card">
            <h3>${post.titulo}</h3>
            <p>${post.mensagem}</p>
            <div class="feed-data">${post.data}</div>
        </div>
    `).join('');
}

// Consulta API ViaCEP para preencher cidade no cadastro de jogador
function buscarCepJogador() {
    const cep = document.getElementById('cep-jogador').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('Digite um CEP válido com 8 dígitos.');
        return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('cidade-jogador').value = data.localidade + (data.uf ? ' - ' + data.uf : '');
                document.getElementById('rua-jogador').value = data.logradouro || '';
            }
        })
        .catch(() => alert('Erro ao consultar o CEP.'));
}

// Inicialização
window.onload = () => {
    atualizarSelects();
    renderizarFeed();
    mostrarPagina('home');
};
