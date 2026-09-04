const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

// ================================
// 🎬 ESCENAS
// ================================

const escenas = [
    {
        imagen: "./2.png",
        dialogo: "Pío pío..."
    },
    {
        imagen: "./3.png",
        dialogo: "Pío pío, ¿qué es eso?"
    },
    {
        imagen: "./4.png",
        dialogo: ""
    },
    {
        imagen: "./5.png",
        dialogo: "¿Y ahora qué hacemos con esto?"
    },
    {
        imagen: "./6.png",
        dialogo: "Tal vez debería abrirlo..."
    },
    {
        imagen: "./7.png",
        dialogo: "¡Está pasando algo!"
    },
    {
        imagen: "./8.png",
        dialogo: ""
    },
    {
        imagen: "./9.png",
        dialogo: ""
    }
];

// ================================
// 🎮 MOSTRAR ESCENA
// ================================

function mostrarEscena(indice) {

    const escena = escenas[indice];

    game.innerHTML = `
        <div class="scene">
            <img src="${escena.imagen}" alt="Escena ${indice + 2}">
            ${
                escena.dialogo
                ? `<div class="dialogo">${escena.dialogo}</div>`
                : ""
            }
        </div>
    `;
}

// ================================
// 🥚 RESULTADO DEL HUEVO
// ================================

function revelarHuevo() {

    const numero = Math.random() * 100;

    let resultado;

    if (numero < 98) {

        // 🐔 98%
        resultado = "./10.png";

    } else if (numero < 99) {

        // 🧟 1%
        resultado = "./10.1.png";

    } else {

        // 🐤 1%
        resultado = "./10.3.png";
    }

    game.innerHTML = `
        <div class="scene">
            <img src="${resultado}" alt="Revelación">
        </div>
    `;
}

// ================================
// ▶️ PLAY
// ================================

playButton.addEventListener("click", () => {

    let indice = 0;

    mostrarEscena(indice);

    const intervalo = setInterval(() => {

        indice++;

        if (indice < escenas.length) {

            mostrarEscena(indice);

        } else {

            clearInterval(intervalo);

            // 🥚 Después de las escenas 2–9
            // hacemos la revelación.
            setTimeout(() => {
                revelarHuevo();
            }, 1500);
        }

    }, 3000);
});
