// Variables globales
let asientos = [];
let asientosSeleccionados = [];
let precioAsiento = 10;
let totalPagar = 0;

// Función para generar asientos
function generarAsientos() {
    for (let i = 0; i < 50; i++) {
        asientos.push({
            id: i,
            ocupado: false,
            seleccionado: false
        });
    }
    mostrarAsientos();
}

// Función para mostrar asientos
function mostrarAsientos() {
    let html = '';
    asientos.forEach(asiento => {
        if (asiento.ocupado) {
            html += `<div class="asiento ocupado" data-id="${asiento.id}">${asiento.id + 1}</div>`;
        } else if (asiento.seleccionado) {
            html += `<div class="asiento seleccionado" data-id="${asiento.id}">${asiento.id + 1}</div>`;
        } else {
            html += `<div class="asiento" data-id="${asiento.id}">${asiento.id + 1}</div>`;
        }
    });
    document.getElementById('asientos').innerHTML = html;
    agregarEventosAsientos();
}

// Función para agregar eventos a los asientos
function agregarEventosAsientos() {
    let asientosElementos = document.querySelectorAll('.asiento');
    asientosElementos.forEach(asiento => {
        asiento.addEventListener('click', () => {
            let idAsiento = parseInt(asiento.getAttribute('data-id'));
            seleccionarAsiento(idAsiento);
        });
    });
}

// Función para seleccionar asiento
function seleccionarAsiento(idAsiento) {
    let asiento = asientos.find(asiento => asiento.id === idAsiento);
    if (asiento.ocupado) {
        alert('Este asiento ya está ocupado');
        return;
    }
    if (asiento.seleccionado) {
        asiento.seleccionado = false;
        asientosSeleccionados = asientosSeleccionados.filter(id => id !== idAsiento);
        totalPagar -= precioAsiento;
    } else {
        asiento.seleccionado = true;
        asientosSeleccionados.push(idAsiento);
        totalPagar += precioAsiento;
    }
    mostrarAsientos();
    mostrarResumenCompra();
}

// Función para mostrar resumen de compra
function mostrarResumenCompra() {
    document.getElementById('asientos-seleccionados').innerText = `Asientos seleccionados: ${asientosSeleccionados.length}`;
    document.getElementById('total-pagar').innerText = `Total a pagar: $${totalPagar}`;
}

// Función para generar factura
function generarFactura() {
    let html = '';
    html += `<p>Factura</p>`;
    html += `<p>Asientos seleccionados:</p>`;
    asientosSeleccionados.forEach(idAsiento => {
        html += `<p>Asiento ${idAsiento + 1}</p>`;
    });
    html += `<p>Total a pagar: $${totalPagar}</p>`;
    document.getElementById('detalle-factura').innerHTML = html;
}

// Evento para reservar asientos
document.getElementById('btn-reservar').addEventListener('click', () => {
    if (asientosSeleccionados.length === 0) {
        alert('Debes seleccionar al menos un asiento');
        return;
    }
    asientosSeleccionados.forEach(idAsiento => {
        let asiento = asientos.find(asiento => asiento.id === idAsiento);
        asiento.ocupado = true;
        asiento.seleccionado = false;
    });
    generarFactura();
    asientosSeleccionados = [];
    totalPagar = 0;
    mostrarAsientos();
    mostrarResumenCompra();
});

// Inicializar
generarAsientos();
