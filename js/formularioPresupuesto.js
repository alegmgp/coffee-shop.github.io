//esperar que DOm cargado
document.addEventListener('DOMContentLoaded', function() {
//recuperar elementos del formulario
    var miForm = document.getElementById('formularioContacto');
    var miBoton = document.getElementById("btnEnviar");
    
    // Si no se encuentra el formulario, detenemos la ejecución.
    if (!miForm) return;

    // Escuchar evento en el botón para forzar el submit y ejecutar la validación
    miBoton.addEventListener("click", (evento) => {
        evento.preventDefault();
        miForm.dispatchEvent(new Event('submit')); 
    });

    // Listener de envío del formulario
    miForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        let formValid = validar(); 

        if (formValid) {
            alert('¡Formulario validado correctamente! Procediendo al envío...');
            // e.currentTarget.submit(); // Descomentar para envío real
        } else {
            // Si falla la validación, el usuario verá los mensajes debajo de cada campo.
            const primerError = document.querySelector('.is-invalid');
            if (primerError) {
                primerError.focus();
            }
        }
    });

//funcion para validacion de los campos y que cumplan ciertos requisitos

    function validar() {
        // Recuperar elementos del HTML
        var name = document.getElementById('inputName');
        var surname = document.getElementById('inputSurname');
        var email = document.getElementById('inputEmail');
        var phone = document.getElementById('inputPhone');
        var privacity = document.getElementById('checkboxPrivacidad');
        
        var tablaProductos = document.getElementById('tabla-productos');
        var opcionesEnvios = document.getElementById('opciones-envios');
        
        // Expresiones Regulares (Regex)
    
        const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,15}$/; 
        const regexSurname = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,40}$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPhone = /^\d{9}$/; 

        let formValid = true; 

        // Ejecutar Validaciones si falla la validación, formValid se convierte en false
        if (!validarCampoTexto(name, regexName, 'El nombre debe tener entre 2 y 15 letras/espacios y no puede contener números.')) formValid = false;
        if (!validarCampoTexto(surname, regexSurname, 'Los apellidos deben tener entre 2 y 40 letras/espacios y no puede contener números.')) formValid = false;
        if (!validarCampoTexto(email, regexEmail, 'Ingresa un formato de correo electrónico válido (ej: nombre@dominio.com).')) formValid = false;
        if (!validarCampoTexto(phone, regexPhone, 'Ingresa un número de teléfono válido (9 dígitos numéricos).')) formValid = false;
        
        // Validación de Presupuesto (Selecciones obligatorias)
        if (!validarSeleccionProductos(tablaProductos)) formValid = false; 
        if (!validarSeleccionEnvio(opcionesEnvios)) formValid = false; 
        
        // Validación del Checkbox privacidad
        if (!validarCheckbox(privacity)) formValid = false; 
        
        // La validación retorna el estado final. Si es false, el envío se detiene.
        return formValid;
    }
    
   
    function validarCampoTexto(inputElement, regex, mensajeError) {
        const value = inputElement.value.trim();
        
        // Obtiene el ID del span de error (ej: 'inputName' -> 'errorName')
        const idSufix = inputElement.id.substring(5); 
        const errorElement = document.getElementById('error' + idSufix);
        
        // Si no existe el span de error, salimos
        if (!errorElement) return true; 

        if (value === '' || !regex.test(value)) {
            // Mostrar error y marcar campo
            errorElement.textContent = mensajeError;
            errorElement.classList.remove('d-none');
            inputElement.classList.add('is-invalid'); 
            inputElement.classList.remove('is-valid');
            return false;
        } else {
            // Ocultar error y marcar como válido
            errorElement.classList.add('d-none');
            errorElement.textContent = '';
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid'); 
            return true;
        }
    }
    
    /*validar selccion productos*/
    function validarSeleccionProductos(tablaProductos) {
        let totalUnidades = 0;
        tablaProductos.querySelectorAll('.unidades').forEach(input => {
            totalUnidades += parseInt(input.value) || 0;
        });

        const errorElement = document.getElementById('errorProductos'); 
        if (!errorElement) return true;

        if (totalUnidades > 0) {
            errorElement.classList.add('d-none');
            return true;
        } else {
            errorElement.textContent = 'Debes seleccionar al menos 1 unidad de café de la variedad que desees.';
            errorElement.classList.remove('d-none');
            return false;
        }
    }
    
    /**validar opcion de envio- debe elegir solo una*/
    function validarSeleccionEnvio(opcionesEnvios) {
        const isValid = opcionesEnvios.value !== ""; 
        const errorElement = document.getElementById('errorEnvios'); 

        if (!errorElement) return true;

        if (!isValid) {
            errorElement.textContent = 'Debes seleccionar un tipo de envío.';
            errorElement.classList.remove('d-none');
            opcionesEnvios.classList.add('is-invalid');
            return false;
        } else {
            errorElement.classList.add('d-none');
            opcionesEnvios.classList.remove('is-invalid');
            opcionesEnvios.classList.add('is-valid');
            return true;
        }
    }

    /**checkbox privacidad debe estar marcado*/

    function validarCheckbox(checkboxElement) {
    const isValid = checkboxElement.checked;
    const errorElement = document.getElementById('errorPrivacity'); 

    if (!errorElement) return true;

    if (!isValid) {
        // MOSTRAR MENSAJE
        errorElement.textContent = 'Debe aceptar la política de privacidad para poder enviar el formulario.';
        errorElement.classList.remove('d-none'); // Asumiendo que .d-none lo oculta por defecto
        return false;
    } else {
        // OCULTAR MENSAJE
        errorElement.classList.add('d-none');
        return true;
    }
}


 // Llamada a calculo totales 
    actualizarTotales();
});


    
//calculos del ppto


document.addEventListener('DOMContentLoaded', function() {
    const tablaProductos = document.getElementById("tabla-productos");
    const opcionesEnvios = document.getElementById("opciones-envios");
    const opcionTarjeta= document.getElementById("tarjetaRegalo");
    const opcionEmbalaje= document.getElementById("embalajeRegalo");
    const totalElement = document.getElementById("totalGeneral");

    // Función para calcular
    function actualizarTotales() {
        let subtotalProductos = 0;

        // Recorre cada fila de producto forEach
        tablaProductos.querySelectorAll('tr[data-precio]').forEach(fila => {
            const precio = parseFloat(fila.dataset.precio);
            const unidadesInput = fila.querySelector('.unidades');
            const unidades = parseInt(unidadesInput.value) || 0; // Asegura que sea un número con parseint
            const totalParcial = precio * unidades;

            // Actualiza el total parcial
            fila.querySelector('.precio-total').textContent = totalParcial.toFixed(2) + "€";
            subtotalProductos += totalParcial;
        });

        // Aplica %del envío si se ha seleccionado uno(no foreach solo es uno..no puede elegir todos)
        let descuentoEnvio = 0;
        if (opcionesEnvios.value) {
            descuentoEnvio = subtotalProductos * parseFloat(opcionesEnvios.value);
        }


        // Calcula total final
        const totalFinal = subtotalProductos - descuentoEnvio;

        // Actualiza con el total
        totalElement.textContent = totalFinal.toFixed(2) +"€"; //poner € para que me lo muestre en total general
    }

    //por si se cambian valores indicados en el ppto
    // Añade event listener cantidad
    tablaProductos.querySelectorAll('.unidades').forEach(input => {
        input.addEventListener('change', actualizarTotales);
        input.addEventListener('keyup', actualizarTotales); // Para cuando se escribe por usuario
    });

    // Añade event listener opciones de envío
    opcionesEnvios.addEventListener('change', actualizarTotales);

      // Añade event listener opciones extras
    opcionTarjeta.addEventListener('change', actualizarTotales);
    opcionEmbalaje.addEventListener('change', actualizarTotales);

    // Llama a la función inicial
    actualizarTotales();
});
