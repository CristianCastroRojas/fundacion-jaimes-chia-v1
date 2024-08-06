// Filtrar con barra de blog
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona todos los elementos con la clase "filtro"
  var filtros = document.querySelectorAll(".filtro");

  // Agrega un evento de clic a cada elemento de filtro
  filtros.forEach(function (filtro) {
    filtro.addEventListener("click", function () {
      // Obtiene la categoría del filtro
      var categoria = filtro.getAttribute("data-categoria");

      // Selecciona todas las tarjetas de noticias
      var tarjetas = document.querySelectorAll(".card");

      // Itera sobre todas las tarjetas de noticias
      tarjetas.forEach(function (tarjeta) {
        // Si la categoría de la tarjeta de noticias coincide con la categoría del filtro o es "todos", muestra la tarjeta de noticias, de lo contrario, oculta la tarjeta de noticias
        if (
          categoria === "todos" ||
          tarjeta.classList.contains("filtro-" + categoria)
        ) {
          tarjeta.parentElement.style.display = "block"; // Muestra la tarjeta de noticias
        } else {
          tarjeta.parentElement.style.display = "none"; // Oculta la tarjeta de noticias
        }
      });
    });
  });
});

//Boton de cargar mas noticias
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("noticias-container");
  const botonCargarMas = document.getElementById("cargar-mas");

  // Selecciona todas las noticias
  const todasLasNoticias = Array.from(container.querySelectorAll(".col-sm-12"));

  // Número de noticias a mostrar inicialmente
  const noticiasPorPagina = 4;
  let indexActual = 0;

  function mostrarNoticias() {
    // Mostrar un número específico de noticias
    const noticiasAmostrar = todasLasNoticias.slice(
      indexActual,
      indexActual + noticiasPorPagina
    );
    noticiasAmostrar.forEach((noticia) => (noticia.style.display = "block"));
    indexActual += noticiasPorPagina;

    // Oculta el botón si ya no hay más noticias para mostrar
    if (indexActual >= todasLasNoticias.length) {
      botonCargarMas.style.display = "none";
    }
  }

  // Inicialmente, oculta todas las noticias
  todasLasNoticias.forEach((noticia) => (noticia.style.display = "none"));

  // Muestra las primeras noticias al cargar
  mostrarNoticias();

  // Agrega el evento click al botón
  botonCargarMas.addEventListener("click", mostrarNoticias);
});
