function inicializaciondeMazo() {
    let valores = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let cartas = ['CorazonRojo ' , 'BrilloRojo ' , 'CorazonNegro ' , 'TrebolNegro '];
    mazo = [];

    for (let i = 0; i < cartas.length; i++) { 
        for (let j = 0; j < valores.length; j++) { 
            mazo.push(valores[j] + '-' + cartas[i]); 
        }
    }
    
}

let jugador = [];
let pc = [];
let puntosJugador = 0;
let puntosPc = 0;
let mazo
function barajear() {
    for (let i = 0; i < mazo.length; i++) { 
        let j = Math.floor(Math.random() * mazo.length);
        let temp = mazo[i];
        mazo[i] = mazo[j]; 
        mazo[j] = temp;

    }
}
function repartodecartas() {
    for (let i = 0; i < 2; i++) {
        let cartaJugador = mazo[mazo.length - 1];
        let cartaPc = mazo[mazo.length - 2];

        jugador.push(cartaJugador);
        pc.push(cartaPc);

        puntosJugador += recibirvalor(cartaJugador);
        puntosPc += recibirvalor(cartaPc);

        mazo.length -= 2;
    }
    mostrarCartas();
    actualizarPuntosPc();
}

function mostrarCartas() {
    document.getElementById('cartasJugador').textContent = jugador.toString();

    var cartasPcTexto = '';
    for (var i = 0; i < pc.length; i++) {
        if (i === 0) {
            cartasPcTexto += pc[i];
        } else {
            cartasPcTexto += ', ' + pc[i];
        }
    }
    document.getElementById('cartasPc').textContent = cartasPcTexto;

    document.getElementById('puntosJugador').textContent = 'Puntos del Jugador: ' + puntosJugador;
}

mostrarCartas();


mostrarCartas();

function pedirCarta() {
    let carta = mazo[mazo.length - 1];
    jugador.push(carta); 
    puntosJugador += recibirvalor(carta);

    mazo.length--;

    mostrarCartas();

    if (puntosJugador > 21) {
        Finishcomplete();
    }
}
function recibirvalor(card) {
    let datos = card.split('-'); 
    let valor = datos[0];

    if (isNaN(valor)) {
        if (valor === 'As') {
            return 1;
        }
        else{
            return 10;
        }
    }
    return parseInt(valor);
}

function actualizarPuntosPc() {
    document.getElementById('puntosPc').textContent = 'Puntos de la IA: ' + puntosPc;
}
function Finishcomplete() {
    while (puntosPc < 17) {
        let carta = mazo[mazo.length - 1];
        pc.push(carta);
        puntosPc += recibirvalor(carta);

        mazo.length--;
    }

    let resultado = '';
    if (puntosJugador > 21 || (puntosPc <= 21 && puntosPc > puntosJugador)) {
        resultado = '¡La IA gana!';
    } else if (puntosPc > 21 || (puntosJugador <= 21 && puntosJugador > puntosPc)) {
        resultado = '¡El Jugador gana!';
    } else {
        resultado = '¡Es un empate!';
    }

    document.getElementById('cartasPc').textContent = pc.toString();
    actualizarPuntosPc();
    document.getElementById('resultado').textContent = resultado;
}


window.onload = function () {
    reiniciar();
    document.getElementById('empezar').addEventListener('click', reiniciar); 
    document.getElementById('pedirCarta').addEventListener('click', pedirCarta); 
    document.getElementById('finalizar').addEventListener('click', Finishcomplete); 
}

function reiniciar() {
    inicializaciondeMazo();
    barajear();
    jugador = [];
    pc = [];
    puntosJugador = 0;
    puntosPc = 0;
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('cartasPc').textContent = '';
    document.getElementById('puntosPc').textContent = '';
    repartodecartas();
}