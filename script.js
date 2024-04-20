document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var sexo = document.querySelector('input[name="sexo"]:checked').value;
    var email = document.getElementById('email').value;
    var distrito = document.getElementById('Distrito').value;
    var descripcion = document.getElementById('descripcion').value;
    var recibirInfo = document.getElementById('info').checked;
    var aceptarCondiciones = document.getElementById('condiciones').checked;

    if (existeEmail(email)) {
        alert('Este correo electrónico ya está registrado.');
        return;
    }

    var registro = {
        nombre: nombre,
        apellidos: apellidos,
        sexo: sexo,
        email: email,
        distrito: distrito,
        descripcion: descripcion,
        recibirInfo: recibirInfo,
        aceptarCondiciones: aceptarCondiciones
    };

    agregarRegistroATabla(registro);

    limpiarFormulario();
});

function existeEmail(email) {
    var filas = document.querySelectorAll('#registrosBody tr');
    for (var i = 0; i < filas.length; i++) {
        var correo = filas[i].querySelector('td:nth-child(4)').textContent;
        if (correo === email) {
            return true;
        }
    }
    return false;
}

function agregarRegistroATabla(registro) {
    var tablaBody = document.getElementById('registrosBody');
    var fila = tablaBody.insertRow();

    var campos = ['nombre', 'apellidos', 'sexo', 'email', 'distrito', 'descripcion', 'recibirInfo', 'aceptarCondiciones'];

    campos.forEach(function(campo) {
        var celda = fila.insertCell();
        celda.textContent = registro[campo];
        if (campo === 'sexo') {
            fila.classList.add(registro[campo]);
        }
    });

    var celdaAcciones = fila.insertCell();
    var botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Borrar';
    botonBorrar.addEventListener('click', function() {
        tablaBody.deleteRow(fila.rowIndex);
    });
    celdaAcciones.appendChild(botonBorrar);
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('hombre').checked = false;
    document.getElementById('mujer').checked = false;
    document.getElementById('email').value = '';
    document.getElementById('Distrito').selectedIndex = 0;
    document.getElementById('descripcion').value = '';
    document.getElementById('info').checked = true;
    document.getElementById('condiciones').checked = false;
}
