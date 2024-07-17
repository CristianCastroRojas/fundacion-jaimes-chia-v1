document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".impacto-counter");
  const speed = 200; // La velocidad del contador

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0; // Inicializar el contador en 0

    // Función para actualizar el contador
    const updateCount = () => {
      const inc = target / speed;
      count = Math.ceil(count + inc);

      if (count < target) {
        counter.innerText = `+ ${count}`;
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = `+ ${target}`;
      }
    };

    // Función para verificar si el elemento está visible en la ventana gráfica (viewport)
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Función para ejecutar el contador si el elemento está visible en la ventana gráfica
    const runCounter = () => {
      if (isElementInViewport(counter)) {
        updateCount(); // Iniciar la actualización del contador
        window.removeEventListener("scroll", runCounter);
      }
    };

    window.addEventListener("scroll", runCounter);
    runCounter();
  });
});
