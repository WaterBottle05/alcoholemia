const listaBebidas = [
    { nombre: 'Tequila', volumen: 70, gradoAlcohol: 40 },
    { nombre: 'Cerveza', volumen: 500, gradoAlcohol: 5 },
    { nombre: 'Vino', volumen: 250, gradoAlcohol: 15 },
    { nombre: 'Hidromiel', volumen: 100, gradoAlcohol: 15 },
    { nombre: 'Sidra', volumen: 500, gradoAlcohol: 5 },
    { nombre: 'Whisky', volumen: 100, gradoAlcohol: 40 },
];

function manejarCalculo(event) {
    event.preventDefault();
    const formulario = event.target;

    const tiposCuerpo = {
        male: [
            { tipo: 'thin', valor: 0.85 },
            { tipo: 'muscular', valor: 0.76 },
            { tipo: 'rounded', valor: 0.64 },
            { tipo: 'average', valor: 0.75 }
        ],
        female: [
            { tipo: 'thin', valor: 0.76 },
            { tipo: 'muscular', valor: 0.67 },
            { tipo: 'rounded', valor: 0.58 },
            { tipo: 'average', valor: 0.67 }
        ]
    };

    const volumenBebida = parseInt(formulario.drinkVolume.value);
    const nivelAlcohol = parseInt(formulario.alcoholLevel.value);

    if (nivelAlcohol < 0 || nivelAlcohol > 115 ) {
        mostrarResultado('El grado de alcohol debe estar entre 0 y 115');
        return;
    }

    const bebidaSeleccionada = formulario.drinkChoice.value;
    const objetoBebida = listaBebidas.find(bebida => bebida.nombre === bebidaSeleccionada);
    const pesoUsuario = parseInt(formulario.userWeight.value);
    const tiempoDesdeUltimaBebida = parseInt(formulario.timeSinceLastDrink.value);
    const genero = formulario.querySelector('input[name="gender"]:checked').value;
    const tipoCuerpo = document.getElementById('bodyType').value;
    const valorTipoCuerpo = tiposCuerpo[genero].find(tipo => tipo.tipo === tipoCuerpo)?.valor || 1;

    const volumenAlcohol = (volumenBebida * nivelAlcohol) / 100;
    const tasaEliminacion = 0.15;
    const masaTotalEtanol = (volumenAlcohol * 0.789).toFixed(1);
    const contenidoAlcoholSangre = masaTotalEtanol / (pesoUsuario * valorTipoCuerpo);
    const BACFinal = Math.max(0, (contenidoAlcoholSangre - tasaEliminacion * tiempoDesdeUltimaBebida)).toFixed(1);

    if (!pesoUsuario || genero === undefined || tipoCuerpo === 'empty') {
        mostrarResultado('Debe completar los campos requeridos');
    } else {
        mostrarResultado(`El alcohol ingerido es ${masaTotalEtanol} gramos. Tu alcoholemia final es de ${BACFinal} g/L.`);
    }
}

function mostrarResultado(mensaje) {
    const contenedorResultados = document.getElementById('resultsContainer');
    contenedorResultados.innerHTML = '';
    const parrafo = document.createElement('p');
    parrafo.innerHTML = mensaje;
    contenedorResultados.appendChild(parrafo);
}

function iniciar() {
    const selectorBebida = document.getElementById('drinkChoice');
    selectorBebida.addEventListener('change', function () {
        const bebidaSeleccionada = selectorBebida.value;
        const objetoBebida = listaBebidas.find(bebida => bebida.nombre === bebidaSeleccionada);

        if (objetoBebida) {
            document.getElementById('alcoholLevel').value = objetoBebida.gradoAlcohol;
            document.getElementById('drinkVolume').value = objetoBebida.volumen;
        }
    });
    
    const formularioAlcohol = document.getElementById("alcoholCheckForm");
    formularioAlcohol.addEventListener('submit', manejarCalculo);
}

document.addEventListener("DOMContentLoaded", iniciar);