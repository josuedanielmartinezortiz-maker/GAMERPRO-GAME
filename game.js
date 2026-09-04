const game = document.getElementById("game");

// ================================
// 🎬 ESCENAS
// ================================

const escenas = [
    {
        imagen: "./2.jpg",
        dialogo: "Pío pío..."
    },
    {
        imagen: "./3.jpg",
        dialogo: "Pío pío, ¿qué es eso?"
    },
    {
        imagen: "./4.jpg",
        dialogo: ""
    },
    {
        imagen: "./5.jpg",
        dialogo: "¿Y ahora qué hacemos con esto?"
    },
    {
        imagen: "./6.jpg",
        dialogo: "Tal vez debería abrirlo..."
    },
    {
        imagen: "./7.jpg",
        dialogo: "¡Está pasando algo!"
    },
    {
        imagen: "./8.jpg",
        dialogo: ""
    },
    {
        imagen: "./9.jpg",
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

        // 🐔 POLLO NOOB — 98%
        resultado = "./10.jpg";

    } else if (numero < 99) {

        // 🧟 POLLO ZOMBIE — 1%
        resultado = "./10.1.jpg";

    } else {

        // 🐤 POLLITO NOOB — 1%
        resultado = "./10.3.jpg";
    }

    game.innerHTML = `
        <div class="scene">
            <img src="${resultado}" alt="Revelación">
        </div>
    `;
}

// ================================
// ▶️ PLAY — IMAGEN 1.jpg
// ================================

const inicio = document.getElementById("inicio");

inicio.addEventListener("click", () => {

    let indice = 0;

    mostrarEscena(indice);

    const intervalo = setInterval(() => {

        indice++;

        if (indice < escenas.length) {

            mostrarEscena(indice);

        } else {

            clearInterval(intervalo);

            setTimeout(() => {
                revelarHuevo();
            }, 1500);
        }

    }, 3000);
});
