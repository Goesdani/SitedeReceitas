let receitas = [
    {
        id: 1,
        titulo: "Bolo Caseiro de Chocolate",
        rendimento: "8 porções",
        cuidados: "Pré-aquecer o forno a 180°C e não abrir antes de 20 min.",
        ingredientes: [
            "2 xícaras de farinha de trigo",
            "1 xícaras de achocolatado em pó",
            "1 xícara de açúcar",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "3 ovos inteiros",
            "1 colher de sopa de fermento em pó"
        ],
        etapas: [
            { nome: "Separação e pesagem dos ingredientes", tempo: 10 },
            { nome: "Batimento dos ingredientes líquidos no liquidificador", tempo: 5 },
            { nome: "Mistura dos ingredientes secos em tigela", tempo: 8 },
            { nome: "Unção e enfarinhamento da forma", tempo: 5 },
            { nome: "Assamento no forno pré-aquecido", tempo: 35 },
            { nome: "Resfriamento e desenforme", tempo: 15 }
        ]
    },
    {
        id: 2,
        titulo: "Panqueca Integral de Frango",
        rendimento: "6 unidades",
        cuidados: "Utilizar frigideira antiaderente bem aquecida.",
        ingredientes: [
            "1 xícara de farinha integral",
            "1 xícara de leite desnatado",
            "1 ovo",
            "200g de frango desfiado temperado",
            "1 xícara de molho de tomate",
            "Sal e temperos a gosto"
        ],
        etapas: [
            { nome: "Preparo da massa da panqueca", tempo: 10 },
            { nome: "Descanso da massa", tempo: 10 },
            { nome: "Preparo e cozimento dos discos na frigideira", tempo: 18 },
            { nome: "Recheio dos discos com frango", tempo: 12 },
            { nome: "Montagem em refratário com molho", tempo: 8 },
            { nome: "Gratinado rápido no forno", tempo: 12 }
        ]
    },
    {
        id: 3,
        titulo: "Salada Caesar com Frango Grelhado",
        rendimento: "2 porções",
        cuidados: "Higienizar bem as folhas de alface em solução clorada.",
        ingredientes: [
            "1 pé de alface americana",
            "1 peito de frango em filés",
            "1 xícara de croutons crocantes",
            "1/2 xícara de queijo parmesão ralado",
            "Molho Caesar tradicional",
            "Azeite e limão"
        ],
        etapas: [
            { nome: "Higienização e secagem da alface", tempo: 12 },
            { nome: "Tempero e preparo do frango", tempo: 8 },
            { nome: "Grelhado dos filés de frango", tempo: 10 },
            { nome: "Corte do frango em tiras", tempo: 4 },
            { nome: "Montagem da base com alface", tempo: 5 },
            { nome: "Adição de croutons, parmesão e molho", tempo: 5 }
        ]
    }
];


const LIMITE_ETAPA_MINUTOS = 15;
const CHAVE_LOCAL = "chefdupla_receitas_v1";

function carregarReceitas() {
    try {
        const dadosSalvos = localStorage.getItem(CHAVE_LOCAL);
        if (dadosSalvos) {
            const receitasSalvas = JSON.parse(dadosSalvos);
            if (Array.isArray(receitasSalvas) && receitasSalvas.length > 0) return receitasSalvas;
        }
    } catch (erro) {
        console.warn("Não foi possível carregar as receitas salvas.", erro);
    }
    return receitas;
}

function salvarReceitas() {
    try {
        localStorage.setItem(CHAVE_LOCAL, JSON.stringify(receitas));
    } catch (erro) {
        alert("Não foi possível salvar os dados neste navegador. Verifique o espaço disponível.");
        console.error(erro);
    }
}

function calcularTempoTotal(etapas) {
    let total = 0;
    for (const etapa of etapas) total += Number(etapa.tempo) || 0;
    return total;
}

function calcularMediaEtapas(etapas, tempoTotal) {
    return etapas.length ? tempoTotal / etapas.length : 0;
}

function contarEtapasAcimaLimite(etapas, limite) {
    let total = 0;
    for (const etapa of etapas) {
        if (Number(etapa.tempo) > limite) total++;
    }
    return total;
}

function classificarReceita(tempoTotal) {
    if (tempoTotal <= 45) return "Rápida";
    if (tempoTotal <= 75) return "Moderada";
    return "Demorada";
}

const seletorReceita = document.getElementById("seletor-receita");
const receitaTitulo = document.getElementById("receita-titulo");
const receitaRendimento = document.getElementById("receita-rendimento");
const receitaCuidados = document.getElementById("receita-cuidados");
const listaIngredientes = document.getElementById("lista-ingredientes");
const listaEtapas = document.getElementById("lista-etapas");
const badgeClassificacao = document.getElementById("badge-classificacao");
const resTotal = document.getElementById("res-total");
const resMedia = document.getElementById("res-media");
const resUltrapassam = document.getElementById("res-ultrapassam");
const resClassificacao = document.getElementById("res-classificacao");
const formNovaReceita = document.getElementById("form-nova-receita");

receitas = carregarReceitas();

function atualizarSeletor(idSelecionado) {
    seletorReceita.innerHTML = "";
    for (const receita of receitas) {
        const option = document.createElement("option");
        option.value = receita.id;
        option.textContent = receita.titulo;
        seletorReceita.appendChild(option);
    }
    if (idSelecionado !== undefined) seletorReceita.value = String(idSelecionado);
}

function exibirReceita(idReceita) {
    const receitaAtual = receitas.find(r => String(r.id) === String(idReceita));
    if (!receitaAtual) return;

    receitaTitulo.textContent = receitaAtual.titulo;
    receitaRendimento.textContent = `Rendimento: ${receitaAtual.rendimento}`;
    receitaCuidados.textContent = `Cuidados: ${receitaAtual.cuidados}`;

    listaIngredientes.innerHTML = "";
    for (const ingrediente of receitaAtual.ingredientes) {
        const li = document.createElement("li");
        li.className = "flex items-center gap-2 text-sm text-stone-700";
        li.textContent = "• " + ingrediente;
        listaIngredientes.appendChild(li);
    }

    listaEtapas.innerHTML = "";
    for (const etapa of receitaAtual.etapas) {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between gap-3 rounded-lg bg-stone-50 p-3 text-sm";
        const nome = document.createElement("span");
        nome.className = "text-stone-700";
        nome.textContent = etapa.nome;
        const tempo = document.createElement("strong");
        tempo.className = "shrink-0 text-amber-700";
        tempo.textContent = `${etapa.tempo} min`;
        li.append(nome, tempo);
        listaEtapas.appendChild(li);
    }

    const total = calcularTempoTotal(receitaAtual.etapas);
    const media = calcularMediaEtapas(receitaAtual.etapas, total);
    const acima = contarEtapasAcimaLimite(receitaAtual.etapas, LIMITE_ETAPA_MINUTOS);
    const classificacao = classificarReceita(total);

    resTotal.textContent = `${total} min`;
    resMedia.textContent = `${media.toFixed(1).replace(".", ",")} min`;
    resUltrapassam.textContent = acima;
    resClassificacao.textContent = classificacao;
    badgeClassificacao.textContent = classificacao;
}

formNovaReceita.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("nova-titulo").value.trim();
    const rendimento = document.getElementById("nova-rendimento").value.trim();
    const cuidados = document.getElementById("nova-cuidados").value.trim();
    const ingredientesTexto = document.getElementById("nova-ingredientes").value.trim();

    const tempos = [];
    for (let i = 1; i <= 6; i++) {
        const campo = document.getElementById(`etapa-${i}`);
        const tempo = Number(campo.value);
        if (!Number.isFinite(tempo) || tempo < 1) {
            alert(`Informe um tempo válido para a etapa ${i}.`);
            campo.focus();
            return;
        }
        tempos.push(tempo);
    }

    const nomesEtapas = [
        "Separação dos ingredientes",
        "Preparação inicial",
        "Preparo principal",
        "Cozimento",
        "Finalização",
        "Montagem e serviço"
    ];

    const novaReceita = {
        id: Date.now(),
        titulo,
        rendimento,
        cuidados,
        ingredientes: ingredientesTexto.split(",").map(item => item.trim()).filter(Boolean),
        etapas: tempos.map((tempo, indice) => ({ nome: nomesEtapas[indice], tempo }))
    };

    if (!novaReceita.ingredientes.length) {
        alert("Adicione pelo menos um ingrediente.");
        return;
    }

    receitas.push(novaReceita);
    salvarReceitas();
    atualizarSeletor(novaReceita.id);
    exibirReceita(novaReceita.id);
    formNovaReceita.reset();
    alert("Receita cadastrada e salva neste navegador!");
});

seletorReceita.addEventListener("change", function () {
    exibirReceita(this.value);
});

atualizarSeletor(receitas[0]?.id);
if (receitas.length) exibirReceita(receitas[0].id);
