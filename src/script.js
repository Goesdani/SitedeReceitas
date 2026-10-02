/**
 * Script de Cálculo e Auditoria da Receita Artesanal
 * Atende a todos os requisitos do Encontro 15 (Variáveis, tipos, operadores, condicionais, repetições e funções)
 */

// 1. Definição de Variáveis (const e let) e Tipos de Dados (string, number, boolean, array)
const nomeReceita = "Pão Rústico de Fermentação Natural"; // string
const limiteTempoEtapa = 120; // number (limite em minutos)
const exigeAtencaoRedobrada = true; // boolean

// Array contendo os objetos/dados das 6 etapas da receita
const etapasReceita = [
    { id: 1, nome: "Mistura Inicial", tempoMinutos: 15 },
    { id: 2, nome: "Autólise", tempoMinutos: 45 },
    { id: 3, nome: "Sova & Incorporação de Sal", tempoMinutos: 30 },
    { id: 4, nome: "Fermentação em Bulk", tempoMinutos: 240 },
    { id: 5, nome: "Divisão & Modelagem", tempoMinutos: 20 },
    { id: 6, nome: "Forneamento", tempoMinutos: 45 }
];

/**
 * 2. Função para calcular o tempo total acumulado da receita
 * Utiliza operador aritmético (+) e laço de repetição (for...of)
 * @param {Array} etapas - Lista de etapas com seus tempos
 * @returns {number} Tempo total em minutos
 */
function calcularTempoTotal(etapas) {
    let acumulado = 0;
    for (const etapa of etapas) {
        acumulado += etapa.tempoMinutos;
    }
    return acumulado;
}

/**
 * 3. Função para calcular a média de tempo por etapa
 * Utiliza operadores aritméticos (divisão) e chamada de outra função
 * @param {Array} etapas - Lista de etapas
 * @returns {number} Média de minutos por etapa
 */
function calcularMediaEtapas(etapas) {
    if (etapas.length === 0) return 0;
    const total = calcularTempoTotal(etapas);
    return total / etapas.length;
}

/**
 * 4. Função para contar quantas etapas ultrapassam o limite estabelecido
 * Utiliza operador de comparação (>) e operadores lógicos
 * @param {Array} etapas - Lista de etapas
 * @param {number} limite - Limite de minutos tolerado
 * @returns {number} Quantidade de etapas acima do limite
 */
function contarEtapasAcimaDoLimite(etapas, limite) {
    let contador = 0;
    for (const etapa of etapas) {
        if (etapas && etapa.tempoMinutos > limite) {
            contador++;
        }
    }
    return contador;
}

/**
 * 5. Função para classificar a receita com base no tempo total acumulado
 * Utiliza cadeia de condições (if, else if e else)
 * @param {number} tempoTotal - Tempo total em minutos
 * @returns {string} Classificação textual
 */
function classificarReceita(tempoTotal) {
    let classificacao = "";

    if (tempoTotal <= 180) {
        classificacao = "Receita Rápida / Express";
    } else if (tempoTotal > 180 && tempoTotal <= 360) {
        classificacao = "Receita de Complexidade Moderada";
    } else {
        classificacao = "Receita de Longa Fermentação (Artesanal Avançada)";
    }

    return classificacao;
}

// Execução dos cálculos principais
const tempoTotalMinutos = calcularTempoTotal(etapasReceita);
const mediaMinutos = calcularMediaEtapas(etapasReceita);
const quantidadeAcimaLimite = contarEtapasAcimaDoLimite(etapasReceita, limiteTempoEtapa);
const classificacaoFinal = classificarReceita(tempoTotalMinutos);

// Apresentação dos resultados formatados com template literals no Console
console.log("=== RELATÓRIO DE ANÁLISE DA RECEITA ===");
console.log(`Receita: ${nomeReceita}`);
console.log(`Tempo Total de Preparo: ${tempoTotalMinutos} minutos`);
console.log(`Média de Tempo por Etapa: ${mediaMinutos.toFixed(1)} minutos`);
console.log(`Etapas que ultrapassam o limite de ${limiteTempoEtapa} min: ${quantidadeAcimaLimite}`);
console.log(`Classificação da Receita: ${classificacaoFinal}`);
console.log(`Exige Atenção Redobrada? ${exigeAtencaoRedobrada ? "Sim" : "Não"}`);

// Apresentação dos resultados na interface gráfica (HTML) utilizando textContent
window.addEventListener("DOMContentLoaded", () => {
    const elTotal = document.getElementById("res-total");
    const elMedia = document.getElementById("res-media");
    const elAcima = document.getElementById("res-acima");
    const elClassificacao = document.getElementById("res-classificacao");

    if (elTotal) elTotal.textContent = `${tempoTotalMinutos} min`;
    if (elMedia) elMedia.textContent = `${mediaMinutos.toFixed(1)} min`;
    if (elAcima) elAcima.textContent = `${quantidadeAcimaLimite} etapa(s)`;
    if (elClassificacao) elClassificacao.textContent = classificacaoFinal;
});