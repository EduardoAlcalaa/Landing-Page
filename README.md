# Pantervil Systems — Landing Page

Site simples em **HTML + CSS + JavaScript puro** (sem frameworks, sem etapa
de build, sem instalar nada). Para ver funcionando, basta abrir o arquivo
`index.html` duas vezes no seu navegador.

## Arquivos

| Arquivo/pasta   | O que tem dentro                                                |
|-----------------|------------------------------------------------------------------|
| `index.html`    | Todo o conteúdo e a estrutura da página, seção por seção         |
| `styles.css`    | Toda a aparência: cores, fontes, espaçamentos, responsividade    |
| `script.js`     | Menu mobile, "sanfona" do FAQ e o carrossel de imagens           |
| `images/*.svg`  | As 4 ilustrações usadas no carrossel da seção "Projetos"         |

Cada arquivo tem comentários explicando as partes principais — vale abrir e
ler por cima antes de mexer.

## Paleta de cores usada

Está toda centralizada no topo do `styles.css` (seção "1. VARIÁVEIS DE
DESIGN"), então dá pra reajustar qualquer tom sem procurar cor por cor no
resto do arquivo:

| Variável             | Cor                        | Onde aparece                          |
|----------------------|-----------------------------|-----------------------------------------|
| `--color-midnight`   | `#111E30` Azul Meia-Noite   | fundo principal do site                 |
| `--color-charcoal`   | `#1C2833` Cinza Chumbo      | fundo das seções alternadas             |
| `--color-neon`       | `#00D2FF` Azul Neon         | botões, destaques, brilho no hover      |
| `--color-metal`      | `#2A80B9` Azul Metálico     | pontinhos do navegador, detalhes        |
| `--color-cyan-soft`  | `#48C9B0` Ciano Suave       | rótulos ("eyebrows") e "SYSTEMS" no logo|
| `--color-ice`        | `#ECF0F1` Branco Gelo       | texto principal sobre o fundo escuro    |

## O carrossel de imagens (seção "Projetos")

As 4 imagens em `images/` são ilustrações (SVG) que representam os formatos
de entrega — não são fotos de projetos reais. Quando você tiver capturas de
tela de projetos de verdade, é só:

1. Colocar a imagem nova dentro da pasta `images/`.
2. No `index.html`, dentro da seção `id="projetos"`, trocar o `src="..."` de
   um `<img>` pelo caminho da sua imagem nova (pode ser `.png` ou `.jpg`
   também, não precisa ser `.svg`).
3. Ajustar o `data-title="..."` daquele slide para o nome do projeto.

Para adicionar um slide novo (em vez de só trocar um existente), copie um
bloco inteiro `<div class="carousel__slide" data-title="..."> ... </div>` e
cole junto dos outros. O `script.js` já detecta o slide novo sozinho — não
precisa mexer no JavaScript.

## O que falta você preencher

Procure por estes textos entre colchetes dentro do `index.html`, na seção de
contato, e troque pelos seus dados reais:

- `[Seu WhatsApp / telefone]`
- `[seuemail@exemplo.com]`

E troque também estes dois links (procure por eles no `index.html`):

- `https://wa.me/5500000000000` → coloque seu número no formato
  `55` + DDD + número, só números (ex.: `5547999998888`).
- `mailto:contato@seudominio.com` → coloque seu e-mail de verdade.

## Como mudar coisas comuns

- **Cor de destaque do site** (o azul neon dos botões): abra `styles.css`,
  vá até o topo do arquivo (seção "1. VARIÁVEIS DE DESIGN") e mude o valor
  de `--color-neon`. Ela é usada em vários lugares automaticamente.
- **Textos**: todos ficam direto no `index.html`, dentro das tags como
  `<h1>`, `<h2>` e `<p>`. É só editar o texto entre as tags.
- **Adicionar uma pergunta no FAQ**: no `index.html`, copie um bloco inteiro
  de `<div class="faq-item"> ... </div>` (dentro da seção `id="faq"`), cole
  logo abaixo, e troque a pergunta e a resposta. Não precisa mexer no
  `script.js` — ele já detecta a pergunta nova sozinho.
- **Adicionar/remover um serviço, um passo do processo, ou um diferencial**:
  mesma lógica — copie o bloco (`<article class="card">`, `<div
  class="step">` ou `<div class="diff">`) e ajuste o texto.

## Como publicar o site na internet

Este projeto não depende de nenhum servidor especial, então qualquer serviço
de hospedagem de sites estáticos funciona. Duas opções bem simples e
gratuitas para começar: **Netlify** ou **Vercel** — ambos permitem arrastar a
pasta do projeto direto no navegador deles e o site já fica no ar com um
link.
