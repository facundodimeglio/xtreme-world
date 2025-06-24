document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    // Agregar div para mensajes de error a cada form-group
    document.querySelectorAll('.form-group').forEach(group => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        group.appendChild(errorDiv);
    });

    // Agregar div para mensaje de éxito después del formulario
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.display = 'none';
    form.parentElement.insertBefore(successMessage, form.nextSibling);

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar error
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorDisplay.textContent = message;
    }

    // Función para limpiar error
    function clearError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        const errorDisplay = formGroup.querySelector('.error-message');
        errorDisplay.textContent = '';
    }

    // Función para validar un campo
    function validateField(input, fieldName) {
        if (input.value.trim() === '') {
            showError(input, `Por favor, ingrese su ${fieldName}`);
            return false;
        }
        clearError(input);
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const asunto = document.getElementById('asunto');
        const mensaje = document.getElementById('mensaje');

        let isValid = true;

        // Validar nombre
        if (!validateField(nombre, 'nombre')) {
            isValid = false;
        }

        // Validar email
        if (!validateField(email, 'email')) {
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor, ingrese un email válido');
            isValid = false;
        }

        // Validar asunto
        if (!validateField(asunto, 'asunto')) {
            isValid = false;
        }

        // Validar mensaje
        if (!validateField(mensaje, 'mensaje')) {
            isValid = false;
        }

        // Si todo está válido, mostrar mensaje de éxito
        if (isValid) {
            successMessage.style.display = 'block';
            successMessage.textContent = `¡Gracias por su contacto ${nombre.value}! Le responderemos a la brevedad.`;
            form.reset();

            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Limpiar errores cuando el usuario comienza a escribir
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            clearError(input);
        });
    });
}); 