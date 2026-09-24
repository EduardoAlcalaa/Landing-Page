/**
 * script.js
 * ---------------------------------------------------------------------------
 * Todo o JavaScript do site fica neste único arquivo, dividido em pequenas
 * funções independentes. Cada função cuida de UM comportamento:
 *
 *   1. initMobileMenu()    -> abre/fecha o menu no celular
 *   2. initFaqAccordion()  -> abre/fecha as respostas do FAQ
 *   3. initCarousel()      -> o carrossel de imagens da seção "Projetos"
 *
 * Para adicionar uma funcionalidade nova no futuro, o mais simples é copiar
 * o "molde" de uma função como as de baixo (pegar elemento(s) com
 * document.querySelector, escutar um evento com addEventListener, e reagir
 * a esse evento) e chamá-la lá embaixo, dentro do DOMContentLoaded.
 * ---------------------------------------------------------------------------
 */

/**
 * Controla o botão de hambúrguer do cabeçalho no celular.
 * A lógica é simples: ligamos/desligamos a classe "is-open" no <header>,
 * e é o CSS (em styles.css) quem decide o que aparece ou some quando essa
 * classe está presente.
 */
function initMobileMenu() {
  const header = document.getElementById("cabecalho");
  const toggleButton = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("menuMobile");

  if (!header || !toggleButton || !mobileMenu) return;

  function closeMenu() {
    header.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Abrir menu");
  }

  function toggleMenu() {
    const isOpen = header.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  }

  toggleButton.addEventListener("click", toggleMenu);

  // Fecha o menu automaticamente quando o visitante clica em algum link dele
  // (senão o menu ficaria aberto tampando a seção para onde ele acabou de ir).
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/**
 * Controla as perguntas do FAQ: clicar em uma pergunta abre a resposta
 * (e fecha qualquer outra que estivesse aberta, no estilo "acordeão").
 * Clicar de novo na mesma pergunta fecha ela.
 *
 * Importante: essa função funciona para QUALQUER quantidade de perguntas.
 * Se você copiar um bloco ".faq-item" inteiro no HTML para criar uma
 * pergunta nova, ela já vai funcionar sozinha, sem precisar tocar neste
 * arquivo.
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-item__question");
    if (!question) return;

    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");

      // Fecha todas as perguntas...
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        otherItem.querySelector(".faq-item__question")?.setAttribute("aria-expanded", "false");
      });

      // ...e reabre só a que foi clicada, se ela estava fechada antes.
      // (Isso é o que dá o efeito de "só uma resposta aberta por vez".)
      if (!wasOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * Controla o carrossel de imagens da seção "Projetos".
 *
 * Como funciona por dentro:
 * - Todos os slides ficam lado a lado dentro de ".carousel__track"
 *   (isso é feito no CSS, com display:flex).
 * - Para "andar" entre os slides, a gente só move essa faixa inteira para a
 *   esquerda ou direita com transform: translateX(), em vez de esconder e
 *   mostrar elementos. É esse deslocamento que dá a sensação de deslizar.
 * - Os pontinhos (dots) são criados aqui pelo próprio JavaScript, um para
 *   cada slide encontrado — então funciona automaticamente se você
 *   adicionar ou remover uma imagem do carrossel no HTML.
 */
function initCarousel() {
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("carouselTrack");
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");
  const dotsWrapper = document.getElementById("carouselDots");
  const titleLabel = document.getElementById("carouselTitle");
  const countLabel = document.getElementById("carouselCount");

  if (!carousel || !track || !dotsWrapper) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  // O título de cada slide vem do atributo "data-title" no HTML
  // (ex.: <div class="carousel__slide" data-title="Site institucional">).
  const slideTitles = slides.map((slide) => slide.dataset.title || "");

  let currentIndex = 0;
  let autoplayTimer = null;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cria um botão-pontinho para cada slide.
  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Ir para o projeto ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsWrapper.appendChild(dot);
    return dot;
  });

  function updateUI() {
    // Move a faixa de slides: cada slide ocupa 100% da largura do carrossel,
    // então "andar" um slide é mover -100%, dois slides é -200%, etc.
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });

    if (titleLabel) titleLabel.textContent = slideTitles[currentIndex] || "";
    if (countLabel) countLabel.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  function goToSlide(index) {
    // O "% slides.length" faz o carrossel voltar ao início depois do
    // último slide (e ir para o último se você clicar "anterior" no primeiro).
    currentIndex = (index + slides.length) % slides.length;
    updateUI();
  }

  function goToNext() {
    goToSlide(currentIndex + 1);
  }

  function goToPrev() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (prefersReducedMotion) return; // respeita quem pediu menos animações
    stopAutoplay();
    autoplayTimer = window.setInterval(goToNext, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  prevButton?.addEventListener("click", () => {
    goToPrev();
    startAutoplay(); // reinicia a contagem para não trocar de novo logo em seguida
  });

  nextButton?.addEventListener("click", () => {
    goToNext();
    startAutoplay();
  });

  // Pausa o autoplay quando o mouse está em cima ou quando algum botão do
  // carrossel está focado (por exemplo, navegando com Tab pelo teclado).
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  updateUI();
  startAutoplay();
}

// Espera o HTML inteiro carregar antes de procurar os elementos acima.
// Sem isso, o script poderia rodar antes do botão/menu existirem na página.
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initFaqAccordion();
  initCarousel();
});
