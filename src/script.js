// ==========================================
// DADOS INICIAIS (Array, Strings, Numbers, Booleans)
// ==========================================
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

// ==========================================
// FUNÇÕES COM PARÂMETROS E RETORNO (Mínimo de 3)
// ==========================================

// Função 1: Calcula o tempo total somando as etapas
function calcularTempoTotal(etapas) {
    let total = 0;
    for (const etapa of etapas) {
        total += etapa.tempo;
    }
    return total;
}

// Função 2: Calcula a média aritmética do tempo por etapa
function calcularMediaEtapas(etapas, tempoTotal) {
    if (etapas.length === 0) return 0;
    return tempoTotal / etapas.length;
}

// Função 3: Conta quantas etapas ultrapassam o limite estipulado
function contarEtapasAcimaLimite(etapas, limite) {
    let contador = 0;
    for (const etapa of etapas) {
        if (etapa.tempo > limite) {
            contador++;
        }
    }
    return contador;
}

// Função 4: Classifica a receita utilizando cadeia if, else if e else
function classificarReceita(tempoTotal) {
    let classificacao = "";
    let statusAtivo = true; // Exemplo de uso de boolean

    if (tempoTotal <= 45 && statusAtivo) {
        classificacao = "Rápida";
    } else if (tempoTotal > 45 && tempoTotal <= 75) {
        classificacao = "Moderada";
    } else {
        classificacao = "Demorada";
    }

    return classificacao;
}

// ==========================================
// MANIPULAÇÃO DA INTERFACE (DOM e Eventos)
// ==========================================

const seletorReceita = document.getElementById("seletor-receita");
const receitaTitulo = document.getElementById("receita-titulo");
const receitaRendimento = document.getElementById("receita-rendimento");
const receitaCuidados = document.getElementById("receita-cuidados");
const listaIngredientes = document.getElementById("lista-ingredientes");
const listaEtapas = document.getElementById("lista-etapas");
const badgeClassificacao = document.getElementById("badge-classificacao");

// Elementos de Resultados no HTML (usando textContent)
const resTotal = document.getElementById("res-total");
const resMedia = document.getElementById("res-media");
const resUltrapassam = document.getElementById("res-ultrapassam");
const resClassificacao = document.getElementById("res-classificacao");

// Formulário de nova receita
const formNovaReceita = document.getElementById("form-nova-receita");

// Preenche o dropdown de seleção de receitas
function atualizarSeletor() {
    seletorReceita.innerHTML = "";
    for (const receita of receitas) {
        const option = document.createElement("option");
        option.value = receita.id;
        option.textContent = receita.titulo;
        seletorReceita.appendChild(option);
    }
}

// Exibe a receita selecionada na interface
function exibirReceita(idReceita) {
    let receitaAtual = null;
    for (const r of receitas) {
        if (r.id == idReceita) {
            receitaAtual = r;
            break;
        }
    }

    if (!receitaAtual) return;

    // Atualiza textos básicos
    receitaTitulo.textContent = receitaAtual.titulo;
    receitaRendimento.textContent = `Rendimento: ${receitaAtual.rendimento}`;
    receitaCuidados.textContent = `Cuidados: ${receitaAtual.cuidados}`;

    // Preenche lista de ingredientes
    listaIngredientes.innerHTML = "";
    for (const ingrediente of receitaAtual.ingredientes) {
        const li = document.createElement("li");
        li.className = "flex items-center gap-2 text-sm