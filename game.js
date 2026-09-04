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
// ▶️ PLAY
// ================================

const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {

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

                // 🐔 Después de mostrar el resultado,
                // entrar al gallinero
                setTimeout(() => {

                    mostrarGallinero();

                }, 3000);

            }, 1500);
        }

    }, 3000);
});
// ================================
// 🐔 GALLINERO — 20 NIDOS
// ================================

const GALLINERO_20_VACIO = [
    {id:1, x:0.193, y:0.156, w:0.071, h:0.128},
    {id:2, x:0.289, y:0.147, w:0.071, h:0.128},
    {id:3, x:0.371, y:0.147, w:0.071, h:0.128},
    {id:4, x:0.457, y:0.147, w:0.071, h:0.128},
    {id:5, x:0.542, y:0.147, w:0.071, h:0.128},
    {id:6, x:0.625, y:0.147, w:0.071, h:0.128},
    {id:7, x:0.737, y:0.156, w:0.071, h:0.128},

    {id:8, x:0.193, y:0.310, w:0.071, h:0.128},
    {id:9, x:0.193, y:0.464, w:0.071, h:0.128},
    {id:10, x:0.193, y:0.618, w:0.071, h:0.128},

    {id:11, x:0.737, y:0.310, w:0.071, h:0.128},
    {id:12, x:0.737, y:0.464, w:0.071, h:0.128},
    {id:13, x:0.737, y:0.618, w:0.071, h:0.128},

    {id:14, x:0.193, y:0.735, w:0.071, h:0.128},
    {id:15, x:0.276, y:0.742, w:0.071, h:0.128},
    {id:16, x:0.362, y:0.742, w:0.071, h:0.128},
    {id:17, x:0.448, y:0.742, w:0.071, h:0.128},
    {id:18, x:0.546, y:0.742, w:0.071, h:0.128},
    {id:19, x:0.632, y:0.742, w:0.071, h:0.128},
    {id:20, x:0.737, y:0.735, w:0.071, h:0.128}
];


// ================================
// 🐔 MOSTRAR GALLINERO
// ================================

function mostrarGallinero() {

    game.innerHTML = `
        <div class="gallinero">

            <img
                src="./11.jpg"
                alt="Gallinero"
                class="gallinero-fondo"
            >

            <div id="nidos"></div>

        </div>
    `;

    crearNidos();
}


// ================================
// 🪹 CREAR LOS 20 NIDOS
// ================================

function crearNidos() {

    const contenedor = document.getElementById("nidos");

    GALLINERO_20_VACIO.forEach(nido => {

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "nido";
        boton.dataset.id = nido.id;

        boton.setAttribute(
            "aria-label",
            `Nido ${nido.id}`
        );

        boton.style.left = `${nido.x * 100}%`;
        boton.style.top = `${nido.y * 100}%`;
        boton.style.width = `${nido.w * 100}%`;
        boton.style.height = `${nido.h * 100}%`;

        boton.addEventListener("click", () => {

            abrirEditorNido(nido.id);

        });

        contenedor.appendChild(boton);
    });
}


// ================================
// 🎨 EDITOR TEMPORAL DEL NIDO
// ================================

function abrirEditorNido(id) {

    const colores = [
        "#ffffff",
        "#ff4d4d",
        "#ffd43b",
        "#4dabf7",
        "#69db7c",
        "#b197fc",
        "#ff922b"
    ];

    const botones = colores.map(color => `
        <button
            type="button"
            class="color-option"
            style="background:${color}"
            onclick="seleccionarColorNido(${id}, '${color}')">
        </button>
    `).join("");

    const editor = document.createElement("div");

    editor.id = "editorNido";

    editor.innerHTML = `
        <div class="editor-panel">

            <h2>🪹 NIDO ${String(id).padStart(2, "0")}</h2>

            <p>Elige un color</p>

            <div class="colores">
                ${botones}
            </div>

            <button
                type="button"
                class="cerrar-editor"
                onclick="cerrarEditorNido()">
                CERRAR
            </button>

        </div>
    `;

    document.body.appendChild(editor);
}


// ================================
// 🎨 SELECCIONAR COLOR
// ================================

function seleccionarColorNido(id, color) {

    const nido = document.querySelector(
        `.nido[data-id="${id}"]`
    );

    if (!nido) return;

    nido.style.boxShadow = `
        0 0 12px ${color},
        0 0 25px ${color}
    `;

    nido.dataset.color = color;

    cerrarEditorNido();
}


// ================================
// ❌ CERRAR EDITOR
// ================================

function cerrarEditorNido() {

    const editor = document.getElementById("editorNido");

    if (editor) {
        editor.remove();
    }
    }
