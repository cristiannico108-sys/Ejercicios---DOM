/*=========================
    OBTENCIÓN DE VARIABLES
===========================*/
const contador = document.getElementById("contador");
const empezar = document.getElementById("btn-empezar");
const parar = document.getElementById("btn-parar");
const resetear = document.getElementById("btn-resetear");


let tiempoInicio;
let enMarcha = false;
let tiempoGuardado = 0;
let intervalo; // Faltaba declarar esta variable

/*=====================================
            FUNCIÓN START
=======================================*/
function start() {
    if (!enMarcha) {
        tiempoInicio = Date.now() - tiempoGuardado;
        
        // Asigno el setInterval a la variable y bajamos a 10ms
        intervalo = setInterval(actualizarPantalla, 10);
        enMarcha = true; // Imprescindible para que funcione el botón parar
    }
}

/*=====================================
            FUNCIÓN DETENER
=======================================*/
function detener() {
    if (enMarcha) {
        clearInterval(intervalo); 
        tiempoGuardado = Date.now() - tiempoInicio;
        enMarcha = false;
    }
}

/*=====================================
            FUNCIÓN REINICIAR
=======================================*/
function reiniciar() {
    clearInterval(intervalo); 
    tiempoGuardado = 0;
    enMarcha = false;
    contador.textContent = "00:00"; // Cambiado a 'contador'
}

/*=====================================
    HACER QUE EL CONTADOR SE MUEVA
=======================================*/
function actualizarPantalla() {
    let tiempoActual = Date.now() - tiempoInicio;

    let segundos = Math.floor((tiempoActual / 1000) % 60);
    let centesimas = Math.floor((tiempoActual % 1000) / 10);

    let segStr = segundos < 10 ? "0" + segundos : segundos;
    let centStr = centesimas < 10 ? "0" + centesimas : centesimas;

    contador.textContent = `${segStr}:${centStr}`; // Cambiado a 'contador'
}

/*=====================================
            EVENT LISTENERS
=======================================*/
// Esto es lo que conecta los clics en el HTML con las funciones de JS
empezar.addEventListener('click', start);
parar.addEventListener('click', detener);
resetear.addEventListener('click', reiniciar);