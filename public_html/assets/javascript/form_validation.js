(function () {
    'use strict';
    window.addEventListener('load', function () {
        var form = document.getElementById('contactForm');

        form.addEventListener('submit', function (event) {
            // Verifica la validación del formulario según las reglas del navegador
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Agrega la clase 'was-validated' para activar los estilos de Bootstrap
            form.classList.add('was-validated');
            
            // Validación específica para el campo de correo electrónico
            var emailInput = document.getElementById('email');
            if (!isValidEmail(emailInput.value)) {
                event.preventDefault();
                event.stopPropagation();
                emailInput.classList.add('is-invalid');
            }
            
            // Validación específica para el campo de celular
            var celularInput = document.getElementById('celular');
            var celularValue = celularInput.value.trim().replace(/\s/g, ''); // Elimina espacios en blanco
            if (!isValidPhoneNumber(celularValue)) {
                event.preventDefault();
                event.stopPropagation();
                celularInput.classList.add('is-invalid');
            }
            
            // Validación específica para el campo de número de documento
            var documentoInput = document.getElementById('documento');
            var documentoValue = documentoInput.value.trim();
            if (!isValidDocumentNumber(documentoValue)) {
                event.preventDefault();
                event.stopPropagation();
                documentoInput.classList.add('is-invalid');
            }
            
            // Validación del reCAPTCHA
            var recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                event.preventDefault();
                event.stopPropagation();
                var recaptchaError = document.getElementById('recaptchaError');
                if (recaptchaError) {
                    recaptchaError.innerHTML = "Por favor, completa el reCAPTCHA.";
                }
            }
        }, false);
    }, false);
})();

// Función para validar correo electrónico
function isValidEmail(email) {
    // Expresión regular para validar correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar número de teléfono (solo números y hasta 10 dígitos)
function isValidPhoneNumber(phoneNumber) {
    // Expresión regular para validar número de teléfono
    var phoneRegex = /^\d{1,10}$/;
    return phoneRegex.test(phoneNumber);
}

// Función para validar número de documento (solo números)
function isValidDocumentNumber(documentNumber) {
    // Expresión regular para validar número de documento
    var documentRegex = /^\d+$/;
    return documentRegex.test(documentNumber);
}
