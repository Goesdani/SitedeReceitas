# ChefIA - Organizador de Receitas

## Executar com Docker
1. Abra um terminal na pasta do projeto.
2. Execute `docker compose up` para compilar o CSS do Tailwind em modo de observação.
3. Para visualizar, abra `src/index.html` no navegador. Para o primeiro build, também pode executar `npm install` e `npm run build:css`.

## Executar sem Docker
1. Instale Node.js.
2. Na pasta do projeto, execute `npm install`.
3. Execute `npm run build:css`.
4. Abra `src/index.html` no navegador.

## Funcionalidades
- Três receitas iniciais com ingredientes, rendimento, seis etapas, orientações e cuidados.
- Navegação lateral para trocar de receita e acessar seções.
- Adição de receitas com formulário.
- Cálculo de tempo total, média, etapas acima do limite e classificação Rápida/Moderada/Demorada.
- Integrantes: Daniel Augusto Silva de Góes e Maria da Guia Ferreira da Silva — TSI, 2º Período.

Observação: receitas adicionadas pelo formulário permanecem na memória enquanto a página estiver aberta. Para cadastrar ingredientes e orientações específicos, edite os dados no início de `src/script.js`.
