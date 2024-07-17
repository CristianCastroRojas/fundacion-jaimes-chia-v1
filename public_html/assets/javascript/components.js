// Funciones de utilidad
function fetchAndAppendComponent(componentId, componentPath, callback) {
  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      const fragment = document.createRange().createContextualFragment(data);
      document.getElementById(componentId).appendChild(fragment);
      if (callback) callback();
    })
    .catch(error => {
      console.error(`Error al cargar el componente ${componentId}:`, error);
    });
}

function addEventListenerToButton(buttonId, event, callback) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener(event, callback);
  } else {
    console.error(`Botón con ID '${buttonId}' no encontrado.`);
  }
}

function addEventListenerToWindow(event, callback) {
  window.addEventListener(event, callback);
}

// Cargar componentes al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
  const components = [
    { id: "navbar-componente", path: "components/navbar.html" },
    { id: "swiper-componente", path: "components/swiper.html", callback: initializeSwiper },
    { id: "footer-componente", path: "components/footer.html" },
    { id: "social-componente", path: "components/social.html" },
    { id: "donacion-componente", path: "components/boton_donacion.html", callback: addScrollArrowFunctionality },
    { id: "discapacidad-componente", path: "components/boton_accesibilidad.html", callback: addAccessibilityFunctionality },
  ];

  components.forEach(component => {
    fetchAndAppendComponent(component.id, component.path, component.callback);
  });
});

// Funciones específicas de los componentes
function initializeSwiper() {
  new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    allowTouchMove: true,
    effect: "fade",
    autoplay: { delay: 6000 },
    keyboard: { enabled: true },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

function addScrollArrowFunctionality() {
  addEventListenerToWindow("scroll", function () {
    const scrollArrow = document.querySelector(".scroll-arrow");
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;
    const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;

    scrollArrow.style.opacity = scrollPercent > 85 ? 1 : 0;
  });

  addEventListenerToButton("scroll-arrow-componente", "click", function (e) {
    if (e.target.classList.contains("arrow")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

function addAccessibilityFunctionality() {
  addEventListenerToButton("accessibility-button", "click", function () {
    const panel = document.getElementById("accessibility-panel");
    const button = document.getElementById("accessibility-button");
    panel.classList.toggle("active");
    button.classList.toggle("active");
  });

  addEventListenerToButton("increase-font", "click", () => changeFontSize(2));
  addEventListenerToButton("decrease-font", "click", () => changeFontSize(-2));
  addEventListenerToButton("toggle-contrast", "click", toggleContrast);
  addEventListenerToButton("toggle-cursor", "click", toggleZoom);
  addEventListenerToButton("toggle-narrator", "click", toggleNarrator);
  addEventListenerToButton("reset-styles", "click", resetStyles);

  function changeFontSize(increment) {
    document.querySelectorAll("body, body *").forEach(element => {
      const currentFontSize = parseFloat(getComputedStyle(element).fontSize) || 16;
      element.style.fontSize = `${currentFontSize + increment}px`;
    });
  }

  let isContrastMode = false;
  let originalStyles = new Map();

  function toggleContrast() {
    const elements = document.querySelectorAll("*");
    elements.forEach(element => {
      if (!isContrastMode) {
        originalStyles.set(element, {
          backgroundColor: element.style.backgroundColor,
          color: element.style.color
        });

        element.style.backgroundColor = "#f0f0f0";
        element.style.color = "#333";

        if (element.classList.contains("boton")) {
          element.style.backgroundColor = "#6495ED";
          element.style.color = "#fff";
        }
        if (element.classList.contains("enlace")) {
          element.style.color = "#800080";
        }
      } else {
        restoreOriginalStyles();
      }
    });

    isContrastMode = !isContrastMode;
    document.getElementById("accessibility-panel").style.display = "block";
  }

  function restoreOriginalStyles() {
    originalStyles.forEach((styles, element) => {
      Object.assign(element.style, styles);
    });
  }

  let isZoomed = false;

  function toggleZoom() {
    document.body.style.zoom = isZoomed ? "100%" : "120%";
    isZoomed = !isZoomed;
    document.getElementById("accessibility-panel").style.display = "block";
  }

  let isNarrating = false;
  let synth = window.speechSynthesis;
  let utterance;

  function toggleNarrator() {
    if (!isNarrating) {
      utterance = new SpeechSynthesisUtterance(document.body.innerText);
      utterance.lang = "es-ES";
      synth.speak(utterance);
    } else {
      synth.cancel();
    }

    isNarrating = !isNarrating;
    document.getElementById("accessibility-panel").style.display = "block";
  }

  function resetStyles() {
    document.body.style.fontSize = "";
    document.querySelectorAll("body *").forEach(element => {
      element.style.fontSize = "";
    });
    restoreOriginalStyles();
    document.body.style.zoom = "100%";
    if (isNarrating) {
      synth.cancel();
      isNarrating = false;
    }
    isContrastMode = false;
    isZoomed = false;
    document.getElementById("accessibility-panel").style.display = "block";
  }
}
