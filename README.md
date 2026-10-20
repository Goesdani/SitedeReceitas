# ChefIA — Organizador de Receitas

Projeto em HTML, CSS e JavaScript com Vite para executar localmente ou pelo Docker.

## Executar com npm

Requisitos: Node.js 20 ou superior. Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

Abra http://localhost:5173. O Vite usa a pasta `src` como raiz do site, onde estão o `index.html`, `script.js` e `output.css`.

## Executar com Docker

Na pasta onde está o `compose.yaml`, execute:

```bash
docker compose up --build
```

Abra http://localhost:5173. Para parar, use `Ctrl+C` e depois `docker compose down`.

## Persistência local

As receitas cadastradas são salvas no `localStorage` do navegador. Permanecem após atualizar a página ou reiniciar o Docker, desde que seja usado o mesmo navegador e endereço. Limpar os dados do navegador remove as receitas. O armazenamento não é compartilhado entre computadores ou navegadores.

## Funcionalidades

- Três receitas iniciais.
- Cadastro de receitas com ingredientes e seis etapas.
- Cálculo do tempo total, média por etapa, etapas acima de 15 minutos e classificação.
