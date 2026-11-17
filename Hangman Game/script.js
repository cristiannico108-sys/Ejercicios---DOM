/*=====================================
            VARIABLES DE ESTADO
=======================================*/
const listaCiudades = ["MADRID", "LONDRES", "PARIS", "TOKIO", "BERLIN", "ROMA", "AMSTERDAM", "GRANADA", "ATENAS", "DUBLIN"];

let palabraElegida = "";
let vidas = 10;
let letrasAdivinadas = [];

/*=================================
                DOM
===================================*/
const palabraOcultaDisplay = document.getElementById("palabra-oculta");
const vidasDisplay = document.getElementById("lives");
// Capturar todos los botones de letras de una sola vez
const botonesLetras = document.querySelectorAll("#letras button");

/*=====================================
            INICIAR JUEGO
=======================================*/
function iniciarJuego() {
    // 1. Elijo una palabra aleatoria del array
    let indiceAleatorio = Math.floor(Math.random() * listaCiudades.length);
    palabraElegida = listaCiudades[indiceAleatorio];
    
    // 2. Reinicio contadores y arrays
    vidas = 10;
    letrasAdivinadas = [];
    vidasDisplay.textContent = vidas;
    
    // 3. Rehabilito todos los botones visualmente
    botonesLetras.forEach(boton => {
        boton.disabled = false;
        boton.style.opacity = "1";
        boton.style.cursor = "pointer";
    });

    // 4. Dibujar los guiones iniciales
    actualizarPalabraOculta();
}

/*=====================================
    PINTAR GUIONES Y LETRAS ACERTADAS
=======================================*/
function actualizarPalabraOculta() {
    let textoMostrar = "";
    let victoria = true; // Asumimos que ha ganado hasta que veamos un guion

    // Recorremos la palabra letra por letra
    for (let i = 0; i < palabraElegida.length; i++) {
        let letra = palabraElegida[i];
        
        if (letrasAdivinadas.includes(letra)) {
            // Si la letra ya fue adivinada, la mostramos
            textoMostrar += letra + " ";
        } else {
            // Si no, muestro un guion
            textoMostrar += "_ ";
            victoria = false; // Como hay un guion, aún no ha ganado
        }
    }

    // Imprimo el texto en pantalla
    palabraOcultaDisplay.textContent = textoMostrar.trim();

    // Compruebo si ya no quedan guiones
    if (victoria) {
        finDelJuego(true);
    }
}

/*=====================================
        LÓGICA AL PULSAR UNA LETRA
=======================================*/
function comprobarLetra(evento) {
    const boton = evento.target; 
    const letraPulsada = boton.textContent.trim().toUpperCase();

    // Desactivo el botón para que no se pueda pulsar dos veces
    boton.disabled = true;
    boton.style.opacity = "0.4";
    boton.style.cursor = "default";

    // Contiene la letra que se ha pulsado?
    if (palabraElegida.includes(letraPulsada)) {
        letrasAdivinadas.push(letraPulsada);
        actualizarPalabraOculta();
    } else {
        // Fallo --> resto una vida
        vidas--;
        vidasDisplay.textContent = vidas;
        
        if (vidas === 0) {
            finDelJuego(false);
        }
    }
}

/*=====================================
            FIN DEL JUEGO
=======================================*/
function finDelJuego(haGanado) {
    // Bloquear todos los botones restantes
    botonesLetras.forEach(boton => {
        boton.disabled = true;
        boton.style.cursor = "default";
    });

    if (haGanado) {
        palabraOcultaDisplay.textContent = "¡GANASTE! " + palabraElegida;
        palabraOcultaDisplay.style.color = "green";
    } else {
        palabraOcultaDisplay.textContent = "GAME OVER " + palabraElegida;
        palabraOcultaDisplay.style.color = "red";
    }
}

/*=====================================
            EVENT LISTENERS
=======================================*/
// Le añadimos el evento 'click' a cada uno de los 26 botones del HTML
botonesLetras.forEach(boton => {
    boton.addEventListener("click", comprobarLetra);
});

// Arrancar el juego nada más cargar la página