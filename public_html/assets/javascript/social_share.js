// Función para obtener la URL actual
function getCurrentUrl() {
  return window.location.href;
}

document.addEventListener("DOMContentLoaded", function () {
  var socialButtons = document.querySelectorAll(".social-share-buttons a");

  socialButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var socialNetwork = button.classList.contains("btn-facebook")
        ? "facebook"
        : button.classList.contains("btn-whatsapp")
        ? "whatsapp"
        : button.classList.contains("btn-twitter")
        ? "twitter"
        : button.classList.contains("btn-email")
        ? "email"
        : "";

      if (socialNetwork === "") return;

      var url = getCurrentUrl();

      switch (socialNetwork) {
        case "facebook":
          button.href =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(url);
          break;
        case "whatsapp":
          button.href =
            "whatsapp://send?text=¡Echa un vistazo a este enlace! " +
            encodeURIComponent(url);
          break;
        case "twitter":
          button.href =
            "https://twitter.com/intent/tweet?url=" +
            encodeURIComponent(url) +
            "&text=¡Echa un vistazo a este enlace!";
          break;
        case "email":
          button.href =
            "mailto:?subject=Echa%20un%20vistazo%20a%20este%20enlace&body=¡Echa un vistazo a este enlace! " +
            encodeURIComponent(url);
          break;
        default:
          break;
      }
    });
  });
});
