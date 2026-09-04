const game = document.getElementById("game");

// ================================
// ▶️ HITBOX OFICIAL DEL PLAY
// ================================

const BIENVENIDO_PLAY_HITBOX = {
    id: 'play',
    x: 0.284,
    y: 0.515,
    w: 0.267,
    h: 0.194,
    center_x: 0.417,
    center_y: 0.612
};

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
// ⚡ PRECARGAR ESCENAS
// ================================

const imagenesPrecargadas = {};

function precargarEscenas() {

    escenas.forEach(escena => {

        const img = new Image();

        img.src = escena.imagen;

        img.decoding = "async";

        imagenesPrecargadas[escena.imagen] = img;
    });
}

precargarEscenas();

// ================================
// 🎬 MOSTRAR ESCENA
// ================================

function mostrarEscena(indice) {

    const escena = escenas[indice];

    if (!escena) return;

    game.innerHTML = `
        <div class="scene">

            <img
                src="${escena.imagen}"
                alt="Escena ${indice + 2}"
                decoding="async"
            >

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

            <img
                src="${resultado}"
                alt="Revelación"
                decoding="async"
            >

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
                decoding="async"
            >

            <div id="nidos"></div>

        </div>
    `;

    crearNidos();

    // 💾 Restaurar colores guardados
    cargarNidosGuardados();
}

// ================================
// 🪹 CREAR LOS 20 NIDOS
// ================================

function crearNidos() {

    const contenedor =
        document.getElementById("nidos");

    if (!contenedor) return;

    GALLINERO_20_VACIO.forEach(nido => {

        const boton =
            document.createElement("button");

        boton.type = "button";

        boton.className = "nido";

        boton.dataset.id = nido.id;

        boton.setAttribute(
            "aria-label",
            `Nido ${nido.id}`
        );

        boton.style.left =
            `${nido.x * 100}%`;

        boton.style.top =
            `${nido.y * 100}%`;

        boton.style.width =
            `${nido.w * 100}%`;

        boton.style.height =
            `${nido.h * 100}%`;

        boton.addEventListener(
            "click",
            () => {

                abrirEditorNido(nido.id);

            }
        );

        contenedor.appendChild(boton);
    });
}

// ================================
// 🎨 EDITOR REAL DEL NIDO
// ================================

let nidoEditando = null;

let colorTemporal = null;

// ================================
// 🪹 ABRIR EDITOR
// ================================

function abrirEditorNido(id) {

    // Primero cerrar cualquier editor anterior
    cerrarEditorNido();

    const nido = document.querySelector(
        `.nido[data-id="${id}"]`
    );

    if (!nido) return;

    nidoEditando = id;

    // Recuperar color actual
    colorTemporal =
        nido.dataset.color || "#ffffff";

    const editor =
        document.createElement("div");

    editor.id = "editorNido";

    editor.innerHTML = `

        <div class="editor-panel">

            <div class="editor-header">

                <div>

                    <span class="editor-icon">
                        🪹
                    </span>

                    <div>

                        <h2>
                            NIDO ${String(id).padStart(2, "0")}
                        </h2>

                        <p>
                            Personaliza este nido
                        </p>

                    </div>

                </div>

                <button
                    type="button"
                    class="editor-x"
                    id="cerrarEditorX"
                    aria-label="Cerrar editor">
                    ✕
                </button>

            </div>

            <div class="editor-preview">

                <div
                    class="preview-nido"
                    id="previewNido">
                    🪹
                </div>

            </div>

            <div class="editor-section">

                <h3>
                    🎨 Color del nido
                </h3>

                <div class="colores">

                    <button
                        type="button"
                        class="color-option"
                        data-color="#ffffff"
                        style="background:#ffffff"
                        aria-label="Blanco">
                    </button>

                    <button
                        type="button"
                        class="color-option"
                        data-color="#ff4d4d"
                        style="background:#ff4d4d"
                        aria-label="Rojo">
                    </button>

                    <button
                        type="button"
                        class="color-option"
                        data-color="#ffd43b"
                        style="background:#ffd43b"
                        aria-label="Amarillo">
                    </button>

                    <button
                        type="button"
                        class="color-option"
                        data-color="#4dabf7"
                        style="background:#4dabf7"
                        aria-label="Azul">
                    </button>

                    <button
                        type="button"
                        class="color-option"
                        data-color="#69db7c"
                        style="background:#69db7c"
                        aria-label="Verde">
                    </button>

                    <button
                        type="button"
                        class="color-option"
                        data-color="#b197fc"
                        style="background:#b197fc"
                        aria-label="Morado">
                    </button>

                    <button
                        type="button"
                        class="color-option"
                        data-color="#ff922b"
                        style="background:#ff922b"
                        aria-label="Naranja">
                    </button>

                </div>

            </div>

            <div class="editor-info">

                <div>

                    <span>🪹</span>

                    <strong>
                        Nido
                    </strong>

                    <small>
                        #${String(id).padStart(2, "0")}
                    </small>

                </div>

                <div>

                    <span>🔓</span>

                    <strong>
                        Estado
                    </strong>

                    <small>
                        Disponible
                    </small>

                </div>

            </div>

            <div class="editor-actions">

                <button
                    type="button"
                    class="btn-cancelar"
                    id="cancelarEditor">
                    CANCELAR
                </button>

                <button
                    type="button"
                    class="btn-guardar"
                    id="guardarEditor">
                    💾 GUARDAR
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(editor);

    // ================================
    // 👁️ PREVIEW INICIAL
    // ================================

    actualizarPreviewNido();

    // ================================
    // 🎨 COLORES
    // ================================

    const opcionesColor =
        editor.querySelectorAll(
            ".color-option"
        );

    opcionesColor.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                colorTemporal =
                    boton.dataset.color;

                actualizarPreviewNido();

            }
        );
    });

    // ================================
    // 💾 GUARDAR
    // ================================

    document
        .getElementById("guardarEditor")
        .addEventListener(
            "click",
            () => {

                guardarNido(
                    id,
                    colorTemporal
                );

            }
        );

    // ================================
    // ❌ CANCELAR
    // ================================

    document
        .getElementById("cancelarEditor")
        .addEventListener(
            "click",
            () => {

                cerrarEditorNido();

            }
        );

    // ================================
    // ❌ X
    // ================================

    document
        .getElementById("cerrarEditorX")
        .addEventListener(
            "click",
            () => {

                cerrarEditorNido();

            }
        );

    // ================================
    // 🌑 CLIC FUERA DEL PANEL
    // ================================

    editor.addEventListener(
        "click",
        event => {

            if (
                event.target === editor
            ) {

                cerrarEditorNido();

            }

        }
    );
}

// ================================
// 👁️ ACTUALIZAR PREVIEW
// ================================

function actualizarPreviewNido() {

    const preview =
        document.getElementById(
            "previewNido"
        );

    if (!preview) return;

    preview.style.boxShadow = `
        0 0 15px ${colorTemporal},
        0 0 30px ${colorTemporal}
    `;
}

// ================================
// 💾 GUARDAR NIDO
// ================================

function guardarNido(id, color) {

    const nido = document.querySelector(
        `.nido[data-id="${id}"]`
    );

    if (!nido) return;

    // Guardar visualmente
    nido.dataset.color = color;

    nido.style.boxShadow = `
        0 0 12px ${color},
        0 0 25px ${color}
    `;

    // Guardar configuración
    localStorage.setItem(
        `gamerpro_nido_${id}`,
        JSON.stringify({
            id: id,
            color: color
        })
    );

    cerrarEditorNido();
}

// ================================
// 💾 CARGAR NIDOS GUARDADOS
// ================================

function cargarNidosGuardados() {

    GALLINERO_20_VACIO.forEach(
        nido => {

            const datos =
                localStorage.getItem(
                    `gamerpro_nido_${nido.id}`
                );

            if (!datos) return;

            try {

                const configuracion =
                    JSON.parse(datos);

                const elemento =
                    document.querySelector(
                        `.nido[data-id="${nido.id}"]`
                    );

                if (!elemento) return;

                if (
                    configuracion &&
                    configuracion.color
                ) {

                    elemento.dataset.color =
                        configuracion.color;

                    elemento.style.boxShadow = `
                        0 0 12px ${configuracion.color},
                        0 0 25px ${configuracion.color}
                    `;
                }

            } catch (error) {

                console.warn(
                    `No se pudo cargar el nido ${nido.id}`,
                    error
                );
            }
        }
    );
}

// ================================
// ❌ CERRAR EDITOR
// ================================

function cerrarEditorNido() {

    const editor =
        document.getElementById(
            "editorNido"
        );

    if (editor) {

        editor.remove();

    }

    nidoEditando = null;

    colorTemporal = null;
                }
