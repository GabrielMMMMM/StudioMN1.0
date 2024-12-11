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
      } if (btnId === "about-menu") {
        // Rolagem sem ajuste para o botão "Início"
        $("html, body").animate(
          {
            scrollTop: scrollTo.offset().top + 20,
          },
          900 // Velocidade da animação em milissegundos
        );
      }  else {
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


  const filterButtons = document.querySelectorAll("#portfolio-area .filter-btn");
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
        if (category === "cortes") {
          image.style.display = image.classList.contains("cortes") ? "block" : "none"; // Exibe apenas imagens da categoria 'cortes'
        } else if (category === "unhas") {
          image.style.display = image.classList.contains("unhas") ? "block" : "none"; // Exibe apenas imagens da categoria 'unhas'
        }
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
      image.style.display = "block"; // Exibe as imagens da categoria "Cortes"
    });
  }); 
});

$(document).ready(function () {
  const carouselInner = $("#modalCarousel .carousel-inner"); // Container do carrossel
  const modalLabel = $("#imageModalLabel"); // Título do modal

  // Imagens adicionais para o carrossel (cada grupo de imagens que será adicionado ao carrossel)
  const additionalImages = {
    cabelo1: [
      "img/cabelo1ponto1.jpg",
      "img/cabelo1ponto2.jpg",
      "img/cabelo1ponto3.jpg",
    ],
    cabelo2: ["img/cabelo2ponto1.jpg", "img/cabelo2ponto2.jpg"],
    cabelo3: ["img/cabelo3ponto1.jpg", "img/cabelo3ponto2.jpg"],
    unha1: ["img/unha1.jpg"],
    unha2: ["img/unha2.jpg"],
    unha3: ["img/unha3.jpg"],
  };

  // Função para carregar todas as imagens no carrossel (de todos os grupos)
  function loadCarouselImages(startGroup) {
    carouselInner.empty(); // Limpa o carrossel antes de adicionar novas imagens

    let imageCount = 0;
    let activeIndex = 0;

    // Adiciona todas as imagens de todos os grupos no carrossel
    for (let group in additionalImages) {
      const images = additionalImages[group];

      images.forEach((imgSrc, index) => {
        const imgAlt = imgSrc.split("/").pop(); // Pega o nome do arquivo para ser usado no alt

        // Se a imagem faz parte do grupo clicado, marque a posição correta como "active"
        const activeClass = group === startGroup && index === 0 ? "active" : "";

        carouselInner.append(`
          <div class="carousel-item ${activeClass}">
            <img src="${imgSrc}" class="d-block w-100" alt="${imgAlt}">
          </div>
        `);

        // Contabiliza quantas imagens estão sendo adicionadas
        if (group === startGroup && index === 0) {
          activeIndex = imageCount; // Define o índice ativo como a primeira imagem do grupo clicado
        }
        imageCount++;
      });
    }

    // Retorna o índice da primeira imagem do grupo selecionado
    return activeIndex; // Retorna o índice da primeira imagem do grupo selecionado
  }

  // Evento de clique em cada imagem da galeria
  $(".gallery-img").on("click", function () {
    const group = $(this).data("group"); // Obtém o grupo (ex: 'cabelo1', 'unha1', etc.)

    // Carrega todas as imagens no carrossel e retorna o índice da primeira imagem do grupo selecionado
    const activeIndex = loadCarouselImages(group);

    // Exibe o modal
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();

    // Atualiza o carrossel para mostrar a imagem correta
    $("#modalCarousel .carousel-item").removeClass("active");
    $("#modalCarousel .carousel-item").eq(activeIndex).addClass("active");

    // Atualiza o título com a imagem correta (remover "Galeria de Imagens" e parênteses)
    const currentIndex = activeIndex + 1; // +1 porque o índice começa do 0, mas queremos que o título comece de 1
    const totalImages = 10; // Número fixo de imagens no carrossel (10 imagens)
    modalLabel.text(`${currentIndex}/${totalImages}`); // Atualiza o título corretamente, sem "Galeria de Imagens" e sem parênteses
  });

  // Atualiza o título do modal conforme o índice da imagem no carrossel
  $("#modalCarousel").on("slid.bs.carousel", function (event) {
    const currentIndex = $(event.relatedTarget).index() + 1; // Índice atual do carrossel
    const totalImages = 10; // Número fixo de imagens no carrossel (10 imagens)
    modalLabel.text(`${currentIndex}/${totalImages}`); // Atualiza o título corretamente, sem "Galeria de Imagens" e sem parênteses
  });
});
$(".zoom-btn").click(function () {
  zoomImage(this); // Passa o botão atual como referência
});

// Função para zoom da imagem
function zoomImage(button) {
  const modalImg = document.querySelector(
    "#modalCarousel .carousel-item.active img"
  );

  if (modalImg) {
    // Alterna entre os estados de zoom
    const isZoomed = modalImg.classList.contains("zoomed");

    if (isZoomed) {
      modalImg.style.transform = "scale(1)"; // Reseta o zoom
      modalImg.classList.remove("zoomed");
      button.querySelector("i").classList.remove("fa-search-minus");
      button.querySelector("i").classList.add("fa-search-plus");
    } else {
      modalImg.style.transform = "scale(1.5)"; // Aplica o zoom
      modalImg.classList.add("zoomed");
      button.querySelector("i").classList.remove("fa-search-plus");
      button.querySelector("i").classList.add("fa-search-minus");
    }
  }
}
function toggleFullscreen() {
  const modal = document.getElementById("imageModal");
  const button = document.querySelector(
    ".toolbar-button[onclick='toggleFullscreen()']"
  ); // Localiza o botão
  const icon = button.querySelector("i"); // Localiza o ícone dentro do botão

  if (document.fullscreenElement) {
    // Sai do modo tela cheia
    document
      .exitFullscreen()
      .then(() => {
        if (icon) {
          icon.classList.remove("fa-compress"); // Remove o ícone de "sair da tela cheia"
          icon.classList.add("fa-expand"); // Adiciona o ícone de "entrar em tela cheia"
        }
      })
      .catch((err) =>
        console.error(`Erro ao sair do modo tela cheia: ${err.message}`)
      );
  } else if (modal.classList.contains("show")) {
    // Entra no modo tela cheia
    modal
      .requestFullscreen()
      .then(() => {
        if (icon) {
          icon.classList.remove("fa-expand"); // Remove o ícone de "entrar em tela cheia"
          icon.classList.add("fa-compress"); // Adiciona o ícone de "sair da tela cheia"
        }
      })
      .catch((err) =>
        console.error(`Erro ao entrar no modo tela cheia: ${err.message}`)
      );
  }
}

$(".fullscreen-btn").click(function () {
  toggleFullscreen(this); // Passa o botão como referência
});
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão de fechar pelo seletor
  const closeButton = document.querySelector(
    ".toolbar-button[data-bs-dismiss='modal']"
  );

  // Adiciona o evento de clique
  closeButton.addEventListener("click", () => {
    // Verifica se está em tela cheia
    if (document.fullscreenElement) {
      // Sai do modo tela cheia
      document.exitFullscreen().catch((err) => {
        console.error(`Erro ao sair do modo tela cheia: ${err.message}`);
      });
    }
  });
});



