$(document).ready(function () {
  // Seletor para os itens de navegação
  let navBtn = $(".nav-link");

  // Seções para rolagem suave
  let homeSection = $("#home"); // Nova seção principal
  let aboutSection = $("#about-area");
  let servicesSection = $("#services-area");
  let portfolioSection = $("#portfolio-area");
  let contactSection = $("#contact-area");

  let scrollTo;

  // Ação ao clicar nos botões de navegação
  $(navBtn).click(function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Obtém o ID do botão clicado
    let btnId = $(this).attr("id");

    // Define qual seção rolar com base no botão clicado
    switch (btnId) {
      case "home-menu": // Para o botão "Início"
        scrollTo = homeSection;
        break;
      case "about-menu":
        scrollTo = aboutSection;
        break;
      case "services-menu":
        scrollTo = portfolioSection;
        break;
      case "especialidades-menu":
        scrollTo = servicesSection;
        break;
      case "contact-menu":
        scrollTo = contactSection;
        break;
      default:
        scrollTo = homeSection;
    }

    // Verifique se a seção existe antes de tentar acessar a posição
    if (scrollTo.length) {
      if (btnId === "home-menu") {
        // Rolagem sem ajuste para o botão "Início"
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top - 70,
          },
          900 // Velocidade da animação em milissegundos
        );
      }
      if (btnId === "about-menu") {
        // Rolagem sem ajuste para o botão "Início"
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top + 20,
          },
          900 // Velocidade da animação em milissegundos
        );
      } else {
        // Rolagem com ajuste para outros botões
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top - 70 + 30, // Ajuste da posição
          },
          900 // Velocidade da animação em milissegundos
        );
      }
    }
  });

  const filterButtons = document.querySelectorAll(
    "#portfolio-area .filter-btn"
  );
  const images = document.querySelectorAll(".project-box");

  // Função para filtrar as imagens
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove a classe 'active' de todos os botões
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona a classe 'active' ao botão clicado
      button.classList.add("active");

      // Aplica o filtro baseado na categoria do botão clicado
      const category = button.id.replace("-btn", ""); // Extrai a categoria do id do botão
      images.forEach((image) => {
        image.style.display = image.classList.contains(category)
          ? "block"
          : "none";
      });
    });
  });

  // Inicializa a página com o filtro "Cortes" ativo e exibe apenas as imagens da categoria "Cortes"
  document.addEventListener("DOMContentLoaded", () => {
    const activeButton = document.querySelector("#cortes-btn"); // Seleciona o botão "Cortes"
    activeButton.classList.add("active"); // Torna o botão "Cortes" ativo inicialmente
    images.forEach((image) => {
      // Oculta todas as imagens inicialmente
      image.style.display = "none";
    });

    // Exibe apenas as imagens da categoria "Cortes" (as 3 primeiras)
    const cortesImages = document.querySelectorAll(".project-box.cortes");
    cortesImages.forEach((image) => {
      image.style.display = "block";
    });
  });
});

$(document).ready(function () {
  const modalElement = document.getElementById("imageModal");
  const carouselInner = $("#modalCarousel .carousel-inner");
  const modalLabel = $("#imageModalLabel");

  // Grupos de imagens para os modais
  const images = {
    cortes1: [
      "img/cabelo1ponto1.jpg",
      "img/cabelo1ponto2.jpg",
      "img/cabelo1ponto3.jpg",
    ],
    cortes2: ["img/cabelo2ponto1.jpg", "img/cabelo2ponto2.jpg"],
    cortes3: ["img/cabelo3ponto1.jpg", "img/cabelo3ponto2.jpg"],
    unha1: ["img/unha1.jpg"],
    unha2: ["img/unha2.jpg"],
    unha3: ["img/unha3.jpg"],
  };

  function loadCarouselImages(group, selectedIndex) {
    carouselInner.empty();

    if (!images[group]) {
      console.error("Grupo de imagens não encontrado:", group);
      return;
    }

    const groupImages = images[group];
    let activeIndex = selectedIndex;

    groupImages.forEach((imgSrc, index) => {
      const imgAlt = imgSrc.split("/").pop();
      const activeClass = index === selectedIndex ? "active" : "";

      carouselInner.append(`
        <div class="carousel-item ${activeClass}">
          <img src="${imgSrc}" class="d-block w-100" alt="${imgAlt}">
        </div>
      `);
    });

    return activeIndex;
  }

  // Evento ao clicar na imagem da galeria
  $(".gallery-img").on("click", function () {
    const group = $(this).data("group");
    const clickedIndex = $(this).index();

    const activeIndex = loadCarouselImages(group, clickedIndex);

    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    const currentIndex = activeIndex + 1;
    const totalImages = carouselInner.children().length;
    modalLabel.text(`${currentIndex}/${totalImages}`);
  });

  // Atualiza o número da imagem ativa quando a navegação do carousel ocorrer
  $("#modalCarousel").on("slid.bs.carousel", function (event) {
    const currentIndex = $(event.relatedTarget).index() + 1;
    const totalImages = carouselInner.children().length;
    modalLabel.text(`${currentIndex}/${totalImages}`);
  });

  // Função de zoom nas imagens do modal
  $(".zoom-btn").click(function () {
    const modalImg = $("#modalCarousel .carousel-item.active img")[0];

    if (modalImg) {
      const isZoomed = modalImg.classList.contains("zoomed");

      if (isZoomed) {
        modalImg.style.transform = "scale(1)";
        modalImg.classList.remove("zoomed");
        $(this)
          .find("i")
          .removeClass("fa-search-minus")
          .addClass("fa-search-plus");
      } else {
        modalImg.style.transform = "scale(1.5)";
        modalImg.classList.add("zoomed");
        $(this)
          .find("i")
          .removeClass("fa-search-plus")
          .addClass("fa-search-minus");
      }
    }
  });

  window.toggleFullscreen = function () {
    const modal = document.getElementById("imageModal");
    const buttonIcon = document.querySelector(".fullscreen-btn i");

    if (!buttonIcon) {
      console.error("Elemento do ícone não encontrado.");
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        buttonIcon.classList.remove("fa-compress");
        buttonIcon.classList.add("fa-expand");
      });
    } else if (modal.classList.contains("show")) {
      modal.requestFullscreen().then(() => {
        buttonIcon.classList.remove("fa-expand");
        buttonIcon.classList.add("fa-compress");
      });
    }
  };

  // Resetar os ícones e estado de fullscreen ao fechar o modal
  $("#imageModal").on("hidden.bs.modal", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Erro ao sair do modo tela cheia: ${err.message}`);
      });
    }

    $(".zoom-btn i").removeClass("fa-search-minus").addClass("fa-search-plus");
    const buttonIcon = document.querySelector(".fullscreen-btn i");
    if (buttonIcon) {
      buttonIcon.classList.remove("fa-compress");
      buttonIcon.classList.add("fa-expand");
    }
  });
});
// Selecione o botão de zoom
// Selecionar o botão de zoom
const zoomButton = document.querySelector(".zoom-btn");
const carousels = document.getElementById("modalCarousel");

// Variável para armazenar se o zoom foi ativado
let isZoomed = false;

// Função para aplicar ou desativar o zoom na imagem
function toggleZoom() {
  const carouselItem = carousels.querySelector(".carousel-item.active img");

  // Se a imagem estiver com o zoom, remova o zoom
  if (isZoomed) {
    carouselItem.style.transform = "scale(1)";
    carouselItem.style.transition = "transform 0.3s ease"; // Opcional, para transição suave
    isZoomed = false;
    zoomButton.querySelector("i").classList.remove("fa-search-minus");
    zoomButton.querySelector("i").classList.add("fa-search-plus");
  } else {
    // Se o zoom não estiver ativado, ative-o
    carouselItem.style.transform = "scale(1.5)"; // Ajuste o valor do zoom conforme necessário
    carouselItem.style.transition = "transform 0.3s ease"; // Opcional, para transição suave
    isZoomed = true;
    zoomButton.querySelector("i").classList.remove("fa-search-plus");
    zoomButton.querySelector("i").classList.add("fa-search-minus");
  }
}

// Detecta quando o carrossel muda de imagem
carousels.addEventListener("slid.bs.carousel", function () {
  // Reseta o estado do zoom quando a imagem for trocada
  resetZoom();
});

// Função para resetar o zoom
function resetZoom() {
  const carouselItem = carousel.querySelector(".carousel-item.active img");
  carouselItem.style.transform = "scale(1)"; // Reseta o zoom para o estado original
  isZoomed = false; // Marca que o zoom foi desativado
  zoomButton.querySelector("i").classList.remove("fa-search-minus");
  zoomButton.querySelector("i").classList.add("fa-search-plus"); // Troca o ícone de volta
}

// Adiciona evento de clique ao botão de zoom
zoomButton.addEventListener("click", toggleZoom);

const carousel = document.querySelector("#modalCarousel");

let startX;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX; // Coordenada inicial do toque
});

carousel.addEventListener("touchmove", (e) => {
  if (!startX) return;
  let deltaX = e.touches[0].clientX - startX;

  if (deltaX > 50) {
    // Gesto para a direita (slide anterior)
    bootstrap.Carousel.getInstance(carousel).prev();
    startX = null;
  } else if (deltaX < -50) {
    // Gesto para a esquerda (próximo slide)
    bootstrap.Carousel.getInstance(carousel).next();
    startX = null;
  }
});
const carouselElement = document.querySelector("#modalCarousel");
if (!bootstrap.Carousel.getInstance(carouselElement)) {
  const carousel = new bootstrap.Carousel(carouselElement);
}
if (carouselElement) {
  let startX = null;

  carouselElement.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX; // Coordenada inicial do toque
  });

  carouselElement.addEventListener("touchmove", (e) => {
    if (!startX) return;

    const deltaX = e.touches[0].clientX - startX;

    const carouselInstance = bootstrap.Carousel.getInstance(carouselElement);

    if (carouselInstance) {
      if (deltaX > 50) {
        carouselInstance.prev(); // Gesto para a direita
      } else if (deltaX < -50) {
        carouselInstance.next(); // Gesto para a esquerda
      }
    }

    startX = null;
  });
}
// Quando o modal abrir, adicionar a classe "modal-active" ao html e body
$("#imageModal").on("show.bs.modal", function () {
  $("html").addClass("modal-active");
  $("body").addClass("modal-active");
});

// Quando o modal for fechado, remover a classe "modal-active"
$("#imageModal").on("hidden.bs.modal", function () {
  $("html").removeClass("modal-active");
  $("body").removeClass("modal-active");
});