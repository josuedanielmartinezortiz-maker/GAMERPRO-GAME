import * as THREE from "three";

const game =
    document.getElementById("game");

// =====================================================
// ▶️ BOTÓN PLAY
// =====================================================

const playButton = document.getElementById("playButton");

if (playButton) {

    playButton.addEventListener("click", () => {

        console.log("▶️ PLAY PRESIONADO");

        iniciarSecuencia();

    });

}
// =====================================================
// ▶️ PLAY
// =====================================================

const BIENVENIDO_PLAY_HITBOX = {

    id: "play",

    x: 0.284,
    y: 0.515,

    w: 0.267,
    h: 0.194,

    center_x: 0.417,
    center_y: 0.612

};


// =====================================================
// 👤 JUGADOR
// =====================================================

let jugadorSeleccionado = null;

let jugador = {

    genero: null,

    imagen: null,

    spritesheet: null

};


// =====================================================
// 🎞️ SPRITESHEETS
// =====================================================

const PLAYER_SPRITESHEETS = {

    hombre:
        "./mono_N_boy_spritesheet.png",

    mujer:
        "./mono_N_girl_spritesheet.png"

};


// =====================================================
// 🌎 ZONAS
// =====================================================

const ZONAS = {

    granja: {

        id: "granja",

        nombre: "Granja",

        imagen:
            "./Granja.jpg",

        desbloqueada: true

    },

    bosque: {

        id: "bosque",

        nombre: "Bosque",

        imagen:
            "./Bosque.jpg",

        desbloqueada: false

    },

    pesca: {

        id: "pesca",

        nombre: "Pesca",

        imagen:
            "./Pesca.jpg",

        desbloqueada: false

    }

};


// =====================================================
// 🎬 ESCENAS
// =====================================================

const escenas = [

    {

        imagen:
            "./2.jpg",

        dialogo:
            "Pío pío..."

    },

    {

        imagen:
            "./3.jpg",

        dialogo:
            "Pío pío, ¿qué es eso?"

    },

    {

        imagen:
            "./4.jpg",

        dialogo:
            ""

    },

    {

        imagen:
            "./5.jpg",

        dialogo:
            "¿Y ahora qué hacemos con esto?"

    },

    {

        imagen:
            "./6.jpg",

        dialogo:
            "Tal vez debería abrirlo..."

    },

    {

        imagen:
            "./7.jpg",

        dialogo:
            "¡Está pasando algo!"

    },

    {

        imagen:
            "./8.jpg",

        dialogo:
            ""

    },

    {

        imagen:
            "./9.jpg",

        dialogo:
            ""

    }

];


// =====================================================
// ⚡ PRECARGA
// =====================================================

const imagenesPrecargadas = {};

function precargarEscenas() {

    const recursos = [

        ...escenas.map(
            escena =>
                escena.imagen
        ),

        "./10.jpg",

        "./10.1.jpg",

        "./10.3.jpg",

        "./11.jpg",

        "./hombre.jpg",

        "./mujer.jpg",

        "./Granja.jpg",

        "./Bosque.jpg",

        "./Pesca.jpg",

        "./mono_N_boy_spritesheet.png",

        "./mono_N_girl_spritesheet.png"

    ];


    recursos.forEach(
        src => {

            const img =
                new Image();

            img.src =
                src;

            img.decoding =
                "async";

            imagenesPrecargadas[src] =
                img;

        }
    );

}

precargarEscenas();


// =====================================================
// 🎮 ESTADO DE LA SECUENCIA
// =====================================================

let secuenciaIniciada =
    false;


// =====================================================
// 🥚 RESULTADO ACTUAL
// =====================================================

let resultadoHuevo =
    null;


// =====================================================
// 🎬 MOSTRAR ESCENA
// =====================================================

function mostrarEscena(
    indice
) {

    const escena =
        escenas[indice];


    if (!escena) {

        return;

    }


    let cinematico =
        document.getElementById(
            "cinematico"
        );


    if (!cinematico) {

        cinematico =
            document.createElement(
                "div"
            );

        cinematico.id =
            "cinematico";

        game.appendChild(
            cinematico
        );

    }


    cinematico.innerHTML = `

        <div class="scene">

            <img
                src="${escena.imagen}"
                alt="Escena ${indice + 2}"
                decoding="async"
            >

            ${
                escena.dialogo
                    ? `
                        <div class="dialogo">
                            ${escena.dialogo}
                        </div>
                    `
                    : ""
            }

        </div>

    `;


    cinematico.style.display =
        "block";


    const inicio =
        document.getElementById(
            "inicio"
        );


    const mundo =
        document.getElementById(
            "mundo3D"
        );


    const gallinero =
        document.getElementById(
            "gallinero"
        );


    if (inicio) {

        inicio.style.display =
            "none";

    }


    if (mundo) {

        mundo.style.display =
            "none";

    }


    if (gallinero) {

        gallinero.style.display =
            "none";

    }

}

// =====================================================
// ▶️ INICIAR JUEGO / SECUENCIA
// =====================================================

let escenaActual = 0;

function iniciarSecuencia() {

    if (secuenciaIniciada) {
        return;
    }

    secuenciaIniciada = true;
    escenaActual = 0;

    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "none";
    }

    mostrarEscena(escenaActual);
            }
// =====================================================
// 🥚 REVELAR HUEVO
// =====================================================

function revelarHuevo() {

    const numero =
        Math.random() * 100;


    if (numero < 98) {

        resultadoHuevo =
            "./10.jpg";

    }

    else if (numero < 99) {

        resultadoHuevo =
            "./10.1.jpg";

    }

    else {

        resultadoHuevo =
            "./10.3.jpg";

    }


    let cinematico =
        document.getElementById(
            "cinematico"
        );


    if (!cinematico) {

        cinematico =
            document.createElement(
                "div"
            );

        cinematico.id =
            "cinematico";

        game.appendChild(
            cinematico

        );

    }


    cinematico.innerHTML = `

        <div class="scene">

            <img
                src="${resultadoHuevo}"
                alt="Resultado del huevo"
                decoding="async"
            >

        </div>

    `;


    cinematico.style.display =
        "block";

}


// =====================================================
// 👤 SELECCIÓN DE PERSONAJE
// =====================================================

function mostrarSeleccionPersonaje() {

    let seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );


    if (!seleccion) {

        seleccion =
            document.createElement(
                "div"
            );


        seleccion.id =
            "seleccionPersonaje";


        seleccion.innerHTML = `

            <div class="selector-panel">

                <h1>
                    ELIGE TU PERSONAJE
                </h1>

                <p>
                    Selecciona tu personaje
                </p>


                <div class="personajes-opciones">


                    <button
                        type="button"
                        class="personaje-opcion"
                        data-genero="hombre"
                    >

                        <img
                            src="./hombre.jpg"
                            alt="Hombre"
                        >

                        <strong>
                            🧑 HOMBRE
                        </strong>

                    </button>


                    <button
                        type="button"
                        class="personaje-opcion"
                        data-genero="mujer"
                    >

                        <img
                            src="./mujer.jpg"
                            alt="Mujer"
                        >

                        <strong>
                            👩 MUJER
                        </strong>

                    </button>


                </div>

            </div>

        `;


        game.appendChild(
            seleccion
        );


        seleccion
            .querySelectorAll(
                ".personaje-opcion"
            )
            .forEach(
                boton => {

                    boton.addEventListener(
                        "click",
                        () => {

                            seleccionarPersonaje(
                                boton.dataset.genero
                            );

                        }
                    );

                }
            );

    }


    const inicio =
        document.getElementById(
            "inicio"
        );


    const cinematico =
        document.getElementById(
            "cinematico"
        );


    const mundo =
        document.getElementById(
            "mundo3D"
        );


    if (inicio) {

        inicio.style.display =
            "none";

    }


    if (cinematico) {

        cinematico.style.display =
            "none";

    }


    if (mundo) {

        mundo.style.display =
            "none";

    }


    seleccion.style.display =
        "flex";

}


// =====================================================
// 👤 SELECCIONAR PERSONAJE
// =====================================================

function seleccionarPersonaje(
    genero
) {

    if (
        genero !== "hombre" &&
        genero !== "mujer"
    ) {

        return;

    }


    jugador.genero =
        genero;


    jugador.imagen =
        genero === "hombre"

            ? "./hombre.jpg"

            : "./mujer.jpg";


    jugador.spritesheet =
        PLAYER_SPRITESHEETS[
            genero
        ];


    jugadorSeleccionado =
        jugador;


    // =================================================
    // 💾 GUARDAR
    // =================================================

    localStorage.setItem(

        "gamerpro_personaje",

        JSON.stringify(
            jugador
        )

    );


    // =================================================
    // 🧹 CERRAR SELECTOR
    // =================================================

    const seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );


    if (seleccion) {

        seleccion.remove();

    }


    // =================================================
    // 🌾 ENTRAR A LA GRANJA
    // =================================================

    iniciarZonaGranja();

}


// =====================================================
// 💾 CARGAR PERSONAJE GUARDADO
// =====================================================

function cargarPersonajeGuardado() {

    const datos =
        localStorage.getItem(
            "gamerpro_personaje"
        );


    if (!datos) {

        return;

    }


    try {

        const personaje =
            JSON.parse(
                datos
            );


        if (
            !personaje ||
            (
                personaje.genero !==
                    "hombre" &&

                personaje.genero !==
                    "mujer"
            )
        ) {

            return;

        }


        jugador =
            personaje;


        jugador.spritesheet =
            PLAYER_SPRITESHEETS[
                personaje.genero
            ];


        jugadorSeleccionado =
            jugador;


    }

    catch (error) {

        console.warn(
            "No se pudo cargar el personaje:",
            error
        );

    }

}


// =====================================================
// 🐔 ESTADO DEL GALLINERO
// =====================================================

let gallineroAbierto =
    false;

let dentroGallinero =
    false;


// =====================================================
// 🐔 DATOS DEL GALLINERO
// =====================================================

const GALLINERO = {

    minX: -13,

    maxX: 13,

    minZ: 9,

    maxZ: 26,

    entradaMinX: -3,

    entradaMaxX: 3,

    entradaZ: 10

};


// =====================================================
// 🐔 ABRIR GALLINERO
// =====================================================

function mostrarGallinero() {

    gallineroAbierto =
        true;


    const gallinero =
        document.getElementById(
            "gallinero"
        );


    if (gallinero) {

        gallinero.style.display =
            "block";

    }


    console.log(
        "🐔 Gallinero abierto"
    );

        }
// =====================================================
// 🌍 BLOQUE 2/6 — MUNDO 3D Y ESTRUCTURAS
// =====================================================


// =====================================================
// 🎮 ESTADO DEL MUNDO
// =====================================================

let renderer = null;

let scene3D = null;

let camera = null;

let terrain = null;

let playerSprite = null;

let animationFrame = null;

let reloj = null;


// =====================================================
// ⌨️ TECLADO
// =====================================================

const teclas = {};


// =====================================================
// 📱 MOVIMIENTO TÁCTIL
// =====================================================

const movimientoTouch = {

    arriba: false,

    abajo: false,

    izquierda: false,

    derecha: false

};


// =====================================================
// 👤 POSICIÓN DEL JUGADOR
// =====================================================

const playerPosition = {

    x: 0,

    y: 0,

    z: 18

};


// =====================================================
// 🎞️ CONFIGURACIÓN DEL SPRITESHEET
// =====================================================

const PLAYER_SPRITE_CONFIG = {

    columnas: 4,

    filas: 4,

    velocidadAnimacion: 10

};


// =====================================================
// 🌍 CONFIGURACIÓN DEL MUNDO
// =====================================================

const WORLD = {

    width: 80,

    depth: 60,

    playerSpeed: 7,

    playerHeight: 2.6,


    spawn: {

        x: 0,

        z: 18

    },


    limites: {

        minX: -38,

        maxX: 38,

        minZ: -27,

        maxZ: 27

    },


    // -----------------------------------------------
    // 🐔 CORRAL
    // -----------------------------------------------

    corral: {

        minX: -12,

        maxX: 12,

        minZ: 10,

        maxZ: 25

    },


    salidaCorral: {

        minX: -3,

        maxX: 3,

        z: 10

    }

};


// =====================================================
// 🏠 ESTRUCTURAS
// =====================================================

const ESTRUCTURAS = {

    casa: {

        minX: -35,

        maxX: -18,

        minZ: -20,

        maxZ: -5

    },


    almacen: {

        minX: 18,

        maxX: 34,

        minZ: -20,

        maxZ: -5

    },


    tienda: {

        minX: -8,

        maxX: 8,

        minZ: -25,

        maxZ: -18

    },


    gallinero: {

        minX: -13,

        maxX: 13,

        minZ: 9,

        maxZ: 26

    }

};


// =====================================================
// 📦 OBTENER CAJA 3D
// =====================================================

function obtenerCajaEstructura(
    estructura
) {

    return new THREE.Box3(

        new THREE.Vector3(

            estructura.minX,

            0,

            estructura.minZ

        ),

        new THREE.Vector3(

            estructura.maxX,

            10,

            estructura.maxZ

        )

    );

}


// =====================================================
// ⛰️ ALTURA DEL TERRENO
// =====================================================

function obtenerAlturaTerreno(
    x,
    z
) {

    // Terreno plano por ahora.
    // Esto hace que el personaje
    // permanezca correctamente sobre
    // la superficie.

    return 0;

}


// =====================================================
// 🌱 CREAR TERRENO
// =====================================================

function crearTerreno() {

    const geometria =
        new THREE.PlaneGeometry(

            WORLD.width,

            WORLD.depth,

            20,

            20

        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x4f8f3a,

            roughness: 1,

            metalness: 0

        });


    terrain =
        new THREE.Mesh(

            geometria,

            material

        );


    terrain.rotation.x =
        -Math.PI / 2;


    terrain.position.y =
        0;


    terrain.receiveShadow =
        true;


    scene3D.add(
        terrain
    );

}


// =====================================================
// 🌾 REFERENCIA VISUAL DE LA GRANJA
// =====================================================

function crearReferenciaVisualGranja() {

    // -----------------------------------------------
    // Camino principal
    // -----------------------------------------------

    const caminoGeometria =
        new THREE.BoxGeometry(

            8,

            0.08,

            60

        );


    const caminoMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xc49a6c,

            roughness: 1

        });


    const camino =
        new THREE.Mesh(

            caminoGeometria,

            caminoMaterial

        );


    camino.position.set(

        0,

        0.05,

        0

    );


    scene3D.add(
        camino
    );


    // -----------------------------------------------
    // Corral
    // -----------------------------------------------

    const corralMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x9b6b3f,

            roughness: 1

        });


    const altura =
        1.5;


    const grosor =
        0.25;


    // Parte trasera

    const vallaTrasera =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                24,

                altura,

                grosor

            ),

            corralMaterial

        );


    vallaTrasera.position.set(

        0,

        altura / 2,

        25

    );


    scene3D.add(
        vallaTrasera
    );


    // Parte izquierda

    const vallaIzquierda =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                grosor,

                altura,

                15

            ),

            corralMaterial

        );


    vallaIzquierda.position.set(

        -12,

        altura / 2,

        17.5

    );


    scene3D.add(
        vallaIzquierda
    );


    // Parte derecha

    const vallaDerecha =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                grosor,

                altura,

                15

            ),

            corralMaterial

        );


    vallaDerecha.position.set(

        12,

        altura / 2,

        17.5

    );


    scene3D.add(
        vallaDerecha
    );


    // -----------------------------------------------
    // Entrada del corral
    // -----------------------------------------------

    const entradaIzquierda =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                9,

                altura,

                grosor

            ),

            corralMaterial

        );


    entradaIzquierda.position.set(

        -7.5,

        altura / 2,

        10

    );


    scene3D.add(
        entradaIzquierda
    );


    const entradaDerecha =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                9,

                altura,

                grosor

            ),

            corralMaterial

        );


    entradaDerecha.position.set(

        7.5,

        altura / 2,

        10

    );


    scene3D.add(
        entradaDerecha
    );

}


// =====================================================
// 💡 ILUMINACIÓN
// =====================================================

function crearIluminacion() {

    const luzAmbiente =
        new THREE.HemisphereLight(

            0xffffff,

            0x446644,

            2

        );


    scene3D.add(
        luzAmbiente
    );


    const luzSol =
        new THREE.DirectionalLight(

            0xffffff,

            2

        );


    luzSol.position.set(

        20,

        30,

        10

    );


    luzSol.castShadow =
        true;


    scene3D.add(
        luzSol
    );

}


// =====================================================
// 🐔 CREAR GALLINERO 3D
// =====================================================

function crearGallinero3D() {

    const grupo =
        new THREE.Group();


    grupo.name =
        "GALLINERO_3D";


    // =================================================
    // 📐 DIMENSIONES
    // =================================================

    const ancho =
        26;

    const profundidad =
        17;

    const alto =
        7;


    const x =
        0;

    const z =
        17.5;


    // =================================================
    // 🎨 MATERIALES
    // =================================================

    const madera =
        new THREE.MeshStandardMaterial({

            color: 0x8b5a2b,

            roughness: 0.9

        });


    const maderaOscura =
        new THREE.MeshStandardMaterial({

            color: 0x5c3a21,

            roughness: 0.9

        });


    const techoMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xb33b2e,

            roughness: 0.8

        });


    const paja =
        new THREE.MeshStandardMaterial({

            color: 0xd8b45a,

            roughness: 1

        });


    // =================================================
    // 🪵 PISO
    // =================================================

    const piso =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                ancho,

                0.4,

                profundidad

            ),

            madera

        );


    piso.position.set(

        x,

        0.2,

        z

    );


    grupo.add(
        piso
    );


    // =================================================
    // 🧱 PARED TRASERA
    // =================================================

    const paredTrasera =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                ancho,

                alto,

                0.4

            ),

            maderaOscura

        );


    paredTrasera.position.set(

        x,

        alto / 2,

        z + profundidad / 2

    );


    grupo.add(
        paredTrasera
    );


    // =================================================
    // 🧱 PARED IZQUIERDA
    // =================================================

    const paredIzquierda =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.4,

                alto,

                profundidad

            ),

            maderaOscura

        );


    paredIzquierda.position.set(

        x - ancho / 2,

        alto / 2,

        z

    );


    grupo.add(
        paredIzquierda
    );


    // =================================================
    // 🧱 PARED DERECHA
    // =================================================

    const paredDerecha =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.4,

                alto,

                profundidad

            ),

            maderaOscura

        );


    paredDerecha.position.set(

        x + ancho / 2,

        alto / 2,

        z

    );


    grupo.add(
        paredDerecha
    );


    // =================================================
    // 🏠 TECHO
    // =================================================

    const techo =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                ancho + 1,

                0.6,

                profundidad + 1

            ),

            techoMaterial

        );


    techo.position.set(

        x,

        alto + 0.3,

        z

    );


    grupo.add(
        techo
    );


    // =================================================
    // 🚪 ENTRADA
    // =================================================

    const marcoEntradaIzq =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.5,

                4,

                0.5

            ),

            madera

        );


    marcoEntradaIzq.position.set(

        -3,

        2,

        z - profundidad / 2

    );


    grupo.add(
        marcoEntradaIzq
    );


    const marcoEntradaDer =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.5,

                4,

                0.5

            ),

            madera

        );


    marcoEntradaDer.position.set(

        3,

        2,

        z - profundidad / 2

    );


    grupo.add(
        marcoEntradaDer
    );


    // =================================================
    // 🪵 VIGA SUPERIOR
    // =================================================

    const viga =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                6.5,

                0.5,

                0.5

            ),

            maderaOscura

        );


    viga.position.set(

        0,

        4,

        z - profundidad / 2

    );


    grupo.add(
        viga
    );


    // =================================================
    // 🥚 CAJAS DE HUEVOS
    // =================================================

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const caja =
            new THREE.Mesh(

                new THREE.BoxGeometry(

                    2.5,

                    0.7,

                    1.8

                ),

                paja

            );


        caja.position.set(

            -8 + i * 5.3,

            0.75,

            z + 4

        );


        grupo.add(
            caja
        );

    }


    // =================================================
    // 🪵 PERCHAS
    // =================================================

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const percha =
            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.15,

                    0.15,

                    10,

                    12

                ),

                madera

            );


        percha.rotation.z =
            Math.PI / 2;


        percha.position.set(

            0,

            2 + i * 1.2,

            z + 1 - i * 2

        );


        grupo.add(
            percha
        );

    }


    // =================================================
    // 📍 POSICIÓN FINAL
    // =================================================

    grupo.position.set(

        0,

        0,

        0

    );


    scene3D.add(
        grupo
    );


    console.log(
        "🐔 Gallinero 3D creado correctamente."
    );


    return grupo;

}


// =====================================================
// 🌾 INICIAR ZONA GRANJA
// =====================================================

function iniciarZonaGranja() {

    console.log(
        "🌾 Iniciando Granja..."
    );


    const mundo =
        document.getElementById(
            "mundo3D"
        );


    if (!mundo) {

        console.error(
            "❌ No existe #mundo3D en index.html"
        );

        return;

    }


    // Mostrar mundo

    mundo.style.display =
        "block";


    // Ocultar cinemática

    const cinematico =
        document.getElementById(
            "cinematico"
        );


    if (cinematico) {

        cinematico.style.display =
            "none";

    }


    // =================================================
    // 🌍 ESCENA
    // =================================================

    scene3D =
        new THREE.Scene();


    scene3D.background =
        new THREE.Color(
            0x87ceeb
        );


    // =================================================
    // 📷 CÁMARA
    // =================================================

    camera =
        new THREE.PerspectiveCamera(

            60,

            window.innerWidth /
                window.innerHeight,

            0.1,

            200

        );


    camera.position.set(

        0,

        12,

        32

    );


    // =================================================
    // 🖥️ RENDERER
    // =================================================

    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: false

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );


    renderer.shadowMap.enabled =
        true;


    // Limpiar mundo anterior

    mundo.innerHTML =
        "";


    mundo.appendChild(
        renderer.domElement
    );


    // =================================================
    // 🌱 CREAR MUNDO
    // =================================================

    crearTerreno();

    crearReferenciaVisualGranja();

    crearIluminacion();

    crearGallinero3D();


    // =================================================
    // 👤 CREAR JUGADOR
    // =================================================

    crearPlayer();


    // =================================================
    // 🕐 RELOJ
    // =================================================

    reloj =
        new THREE.Clock();


    // =================================================
    // 🎮 COMENZAR LOOP
    // =================================================

    animarMundo();


    console.log(
        "✅ Granja iniciada correctamente."
    );

}
// =====================================================
// 👤 BLOQUE 3/6 — PERSONAJE Y MOVIMIENTO
// =====================================================


// =====================================================
// 🎞️ ESTADO DE ANIMACIÓN
// =====================================================

let playerFrame = 0;

let playerFrameTimer = 0;

let playerDireccion =
    "abajo";


// =====================================================
// 🧭 DIRECCIONES DEL SPRITESHEET
// =====================================================

const PLAYER_DIRECCIONES = {

    abajo: 0,

    izquierda: 1,

    derecha: 2,

    arriba: 3

};


// =====================================================
// 👤 CREAR PERSONAJE
// =====================================================

function crearPlayer() {

    if (!scene3D) {

        console.error(
            "❌ No existe la escena 3D."
        );

        return;

    }


    if (!jugadorSeleccionado) {

        console.warn(
            "⚠️ No hay personaje seleccionado."
        );

        return;

    }


    const ruta =
        jugadorSeleccionado.spritesheet ||
        PLAYER_SPRITESHEETS[
            jugadorSeleccionado.genero
        ];


    if (!ruta) {

        console.error(
            "❌ No se encontró spritesheet."
        );

        return;

    }


    const loader =
        new THREE.TextureLoader();


    loader.load(

        ruta,

        (textura) => {

            textura.magFilter =
                THREE.NearestFilter;

            textura.minFilter =
                THREE.NearestFilter;


            textura.wrapS =
                THREE.RepeatWrapping;

            textura.wrapT =
                THREE.RepeatWrapping;


            textura.repeat.set(

                1 /
                    PLAYER_SPRITE_CONFIG.columnas,

                1 /
                    PLAYER_SPRITE_CONFIG.filas

            );


            textura.offset.set(

                0,

                1 -
                    1 /
                    PLAYER_SPRITE_CONFIG.filas

            );


            const material =
                new THREE.SpriteMaterial({

                    map: textura,

                    transparent: true

                });


            playerSprite =
                new THREE.Sprite(
                    material
                );


            playerSprite.scale.set(

                4,

                5,

                1

            );


            // =================================================
            // 📍 POSICIÓN INICIAL
            // =================================================

            playerPosition.x =
                WORLD.spawn.x;

            playerPosition.z =
                WORLD.spawn.z;

            playerPosition.y =
                obtenerAlturaTerreno(

                    playerPosition.x,

                    playerPosition.z

                );


            playerSprite.position.set(

                playerPosition.x,

                playerPosition.y +
                    WORLD.playerHeight / 2,

                playerPosition.z

            );


            playerSprite.name =
                "PLAYER";


            scene3D.add(
                playerSprite
            );


            console.log(
                "👤 Personaje creado correctamente."
            );

        },

        undefined,

        (error) => {

            console.error(
                "❌ Error cargando spritesheet:",
                ruta,
                error
            );

        }

    );

}


// =====================================================
// 🎞️ ACTUALIZAR FRAME
// =====================================================

function actualizarFramePlayer() {

    if (
        !playerSprite ||
        !playerSprite.material ||
        !playerSprite.material.map
    ) {

        return;

    }


    const textura =
        playerSprite.material.map;


    const columnas =
        PLAYER_SPRITE_CONFIG.columnas;

    const filas =
        PLAYER_SPRITE_CONFIG.filas;


    const columna =
        playerFrame %
        columnas;


    const fila =
        PLAYER_DIRECCIONES[
            playerDireccion
        ];


    textura.offset.x =
        columna / columnas;


    textura.offset.y =
        1 -
        (
            fila + 1
        ) / filas;


    textura.needsUpdate =
        true;

}


// =====================================================
// 🎞️ ANIMAR PERSONAJE
// =====================================================

function actualizarAnimacionJugador(
    delta,
    direccion
) {

    if (!playerSprite) {

        return;

    }


    if (direccion) {

        playerDireccion =
            direccion;

    }


    playerFrameTimer +=
        delta;


    const intervalo =
        1 /
        PLAYER_SPRITE_CONFIG
            .velocidadAnimacion;


    if (
        playerFrameTimer >=
        intervalo
    ) {

        playerFrameTimer = 0;


        playerFrame++;


        if (
            playerFrame >=
            PLAYER_SPRITE_CONFIG.columnas
        ) {

            playerFrame = 0;

        }


        actualizarFramePlayer();

    }

}


// =====================================================
// 📦 CAJA DEL JUGADOR
// =====================================================

function obtenerCajaJugador(
    posicion
) {

    const ancho =
        1.2;

    const profundidad =
        1.2;


    return new THREE.Box3(

        new THREE.Vector3(

            posicion.x -
                ancho / 2,

            0,

            posicion.z -
                profundidad / 2

        ),

        new THREE.Vector3(

            posicion.x +
                ancho / 2,

            WORLD.playerHeight,

            posicion.z +
                profundidad / 2

        )

    );

}


// =====================================================
// 🚧 COLISIÓN CON ESTRUCTURAS
// =====================================================

function colisionaConEstructura(
    posicion
) {

    const cajaJugador =
        obtenerCajaJugador(
            posicion
        );


    // ================================================
    // 🏠 CASA
    // ================================================

    const cajaCasa =
        obtenerCajaEstructura(
            ESTRUCTURAS.casa
        );


    if (
        cajaJugador.intersectsBox(
            cajaCasa
        )
    ) {

        return true;

    }


    // ================================================
    // 📦 ALMACÉN
    // ================================================

    const cajaAlmacen =
        obtenerCajaEstructura(
            ESTRUCTURAS.almacen
        );


    if (
        cajaJugador.intersectsBox(
            cajaAlmacen
        )
    ) {

        return true;

    }


    // ================================================
    // 🛒 TIENDA
    // ================================================

    const cajaTienda =
        obtenerCajaEstructura(
            ESTRUCTURAS.tienda
        );


    if (
        cajaJugador.intersectsBox(
            cajaTienda
        )
    ) {

        return true;

    }


    // =================================================
    // 🐔 IMPORTANTE:
    // El gallinero NO se bloquea aquí.
    // Tiene su propia entrada.
    // =================================================

    return false;

}


// =====================================================
// 🌍 LÍMITES DEL MAPA
// =====================================================

function estaDentroDeLimites(
    posicion
) {

    return (

        posicion.x >=
            WORLD.limites.minX &&

        posicion.x <=
            WORLD.limites.maxX &&

        posicion.z >=
            WORLD.limites.minZ &&

        posicion.z <=
            WORLD.limites.maxZ

    );

}


// =====================================================
// 🚪 ENTRADA DEL GALLINERO
// =====================================================

function estaEnEntradaGallinero(
    posicion
) {

    const dentroX =

        posicion.x >=
            GALLINERO.entradaMinX &&

        posicion.x <=
            GALLINERO.entradaMaxX;


    const cercaZ =

        Math.abs(

            posicion.z -
            GALLINERO.entradaZ

        ) < 1.8;


    return (
        dentroX &&
        cercaZ
    );

}


// =====================================================
// 🐔 DENTRO DEL GALLINERO
// =====================================================

function estaDentroGallinero(
    posicion
) {

    return (

        posicion.x >=
            GALLINERO.minX &&

        posicion.x <=
            GALLINERO.maxX &&

        posicion.z >=
            GALLINERO.minZ &&

        posicion.z <=
            GALLINERO.maxZ

    );

}


// =====================================================
// 🐔 ACTUALIZAR ESTADO DEL GALLINERO
// =====================================================

function actualizarEstadoGallinero() {

    if (!playerSprite) {

        return;

    }


    const posicion =
        playerSprite.position;


    const estabaDentro =
        dentroGallinero;


    dentroGallinero =
        estaDentroGallinero(
            posicion
        );


    // ================================================
    // 🚪 ENTRAR
    // ================================================

    if (
        dentroGallinero &&
        !estabaDentro
    ) {

        console.log(
            "🐔 Entraste al gallinero."
        );


        mostrarGallinero();

    }


    // ================================================
    // 🚶 SALIR
    // ================================================

    if (
        !dentroGallinero &&
        estabaDentro
    ) {

        console.log(
            "🚶 Saliste del gallinero."
        );

    }

}


// =====================================================
// 🚪 SALIDA DEL CORRAL
// =====================================================

function puedeSalirDelCorral(
    posicion
) {

    // El jugador puede salir por
    // la abertura central.

    if (
        posicion.z <=
        WORLD.corral.minZ
    ) {

        return (

            posicion.x >=
                WORLD.salidaCorral.minX &&

            posicion.x <=
                WORLD.salidaCorral.maxX

        );

    }


    return true;

}


// =====================================================
// 🚶 ACTUALIZAR JUGADOR
// =====================================================

function actualizarJugador(
    delta
) {

    if (!playerSprite) {

        return;

    }


    let x = 0;

    let z = 0;


    // =================================================
    // ⌨️ TECLADO
    // =================================================

    if (
        teclas["w"] ||
        teclas["W"] ||
        teclas["ArrowUp"]
    ) {

        z -= 1;

    }


    if (
        teclas["s"] ||
        teclas["S"] ||
        teclas["ArrowDown"]
    ) {

        z += 1;

    }


    if (
        teclas["a"] ||
        teclas["A"] ||
        teclas["ArrowLeft"]
    ) {

        x -= 1;

    }


    if (
        teclas["d"] ||
        teclas["D"] ||
        teclas["ArrowRight"]
    ) {

        x += 1;

    }


    // =================================================
    // 📱 CONTROLES TÁCTILES
    // =================================================

    if (
        movimientoTouch.arriba
    ) {

        z -= 1;

    }


    if (
        movimientoTouch.abajo
    ) {

        z += 1;

    }


    if (
        movimientoTouch.izquierda
    ) {

        x -= 1;

    }


    if (
        movimientoTouch.derecha
    ) {

        x += 1;

    }


    const movimiento =
        new THREE.Vector3(
            x,
            0,
            z
        );


    const estaMoviendose =
        movimiento.lengthSq() > 0;


    // =================================================
    // 🧍 QUIETO
    // =================================================

    if (!estaMoviendose) {

        return;

    }


    movimiento.normalize();


    const velocidad =
        WORLD.playerSpeed *
        delta;


    const nuevaPosicion =
        new THREE.Vector3(

            playerSprite.position.x +
                movimiento.x *
                velocidad,

            playerSprite.position.y,

            playerSprite.position.z +
                movimiento.z *
                velocidad

        );


    // =================================================
    // 🌍 LIMITES
    // =================================================

    if (
        !estaDentroDeLimites(
            nuevaPosicion
        )
    ) {

        return;

    }


    // =================================================
    // 🚧 ESTRUCTURAS
    // =================================================

    if (
        colisionaConEstructura(
            nuevaPosicion
        )
    ) {

        return;

    }


    // =================================================
    // 🐔 GALLINERO
    // =================================================

    // La entrada queda libre.
    // El jugador puede entrar al área
    // del gallinero.

    // =================================================
    // 📍 ACTUALIZAR POSICIÓN
    // =================================================

    const altura =
        obtenerAlturaTerreno(

            nuevaPosicion.x,

            nuevaPosicion.z

        );


    playerSprite.position.set(

        nuevaPosicion.x,

        altura +
            WORLD.playerHeight / 2,

        nuevaPosicion.z

    );


    playerPosition.x =
        nuevaPosicion.x;

    playerPosition.y =
        altura;

    playerPosition.z =
        nuevaPosicion.z;


    // =================================================
    // 🎞️ DIRECCIÓN
    // =================================================

    let direccion =
        playerDireccion;


    if (
        Math.abs(
            movimiento.x
        ) >
        Math.abs(
            movimiento.z
        )
    ) {

        direccion =
            movimiento.x > 0
                ? "derecha"
                : "izquierda";

    } else {

        direccion =
            movimiento.z > 0
                ? "abajo"
                : "arriba";

    }


    actualizarAnimacionJugador(

        delta,

        direccion

    );


    // =================================================
    // 🐔 ESTADO DEL GALLINERO
    // =================================================

    actualizarEstadoGallinero();

        }
// =====================================================
// 🎥 CÁMARA DEL MUNDO
// =====================================================

function actualizarCamara() {

    if (!camera || !playerSprite) return;

    const objetivo = new THREE.Vector3(
        playerPosition.x,
        playerPosition.y + 1.5,
        playerPosition.z
    );

    // Cámara detrás y arriba del jugador
    const distancia = 12;
    const altura = 9;

    const posicionDeseada = new THREE.Vector3(
        playerPosition.x,
        playerPosition.y + altura,
        playerPosition.z + distancia
    );

    camera.position.lerp(posicionDeseada, 0.08);
    camera.lookAt(objetivo);
}


// =====================================================
// ⌨️ TECLADO
// =====================================================

function configurarTeclado() {

    window.addEventListener("keydown", (evento) => {

        const tecla = evento.key.toLowerCase();

        if (
            tecla === "w" ||
            tecla === "a" ||
            tecla === "s" ||
            tecla === "d" ||
            tecla === "arrowup" ||
            tecla === "arrowdown" ||
            tecla === "arrowleft" ||
            tecla === "arrowright"
        ) {
            evento.preventDefault();
            teclas[tecla] = true;
        }

    });

    window.addEventListener("keyup", (evento) => {

        const tecla = evento.key.toLowerCase();

        teclas[tecla] = false;

    });

}


// =====================================================
// 📱 CONTROLES TÁCTILES
// =====================================================

function configurarControlesTouch() {

    const crearBotonTouch = (id, direccion) => {

        const boton = document.getElementById(id);

        if (!boton) return;

        const activar = (evento) => {

            evento.preventDefault();
            movimientoTouch[direccion] = true;

        };

        const desactivar = (evento) => {

            evento.preventDefault();
            movimientoTouch[direccion] = false;

        };

        boton.addEventListener("touchstart", activar, {
            passive: false
        });

        boton.addEventListener("touchend", desactivar, {
            passive: false
        });

        boton.addEventListener("touchcancel", desactivar, {
            passive: false
        });

        // También permite probar los controles con mouse
        boton.addEventListener("mousedown", activar);

        boton.addEventListener("mouseup", desactivar);

        boton.addEventListener("mouseleave", desactivar);
    };


    crearBotonTouch("btnArriba", "arriba");
    crearBotonTouch("btnAbajo", "abajo");
    crearBotonTouch("btnIzquierda", "izquierda");
    crearBotonTouch("btnDerecha", "derecha");
}


// =====================================================
// 🕹️ CREAR CONTROLES TÁCTILES SI NO EXISTEN
// =====================================================

function crearControlesTouch() {

    if (document.getElementById("controlesTouch")) {
        configurarControlesTouch();
        return;
    }

    const controles = document.createElement("div");

    controles.id = "controlesTouch";

    controles.innerHTML = `
        <div class="touch-fila">
            <button id="btnArriba" class="touch-btn">▲</button>
        </div>

        <div class="touch-fila">
            <button id="btnIzquierda" class="touch-btn">◀</button>
            <button id="btnAbajo" class="touch-btn">▼</button>
            <button id="btnDerecha" class="touch-btn">▶</button>
        </div>
    `;

    document.body.appendChild(controles);

    configurarControlesTouch();
}


// =====================================================
// 🖥️ HUD DEL JUGADOR
// =====================================================

function crearHUD() {

    let hud = document.getElementById("hudJugador");

    if (hud) return;

    hud = document.createElement("div");

    hud.id = "hudJugador";

    hud.innerHTML = `
        <div id="hudNombre">
            🐔 GAMERPRO GAME
        </div>

        <div id="hudZona">
            🌾 Granja
        </div>

        <div id="hudGallinero">
            🐔 Gallinero: cerrado
        </div>
    `;

    document.body.appendChild(hud);
}


// =====================================================
// 📊 ACTUALIZAR HUD
// =====================================================

function actualizarHUD() {

    const zona = document.getElementById("hudZona");
    const gallinero = document.getElementById("hudGallinero");

    if (zona) {

        if (estaDentroGallinero()) {
            zona.textContent = "🐔 Dentro del gallinero";
        } else if (estaDentroCorral()) {
            zona.textContent = "🌾 Corral de la granja";
        } else {
            zona.textContent = "🌳 Granja";
        }

    }

    if (gallinero) {

        if (gallineroAbierto) {
            gallinero.textContent = "🐔 Gallinero: ABIERTO";
        } else {
            gallinero.textContent = "🐔 Gallinero: cerrado";
        }

    }

}


// =====================================================
// 🐔 INDICADOR DE GALLINERO
// =====================================================

function mostrarIndicadorGallinero() {

    let indicador =
        document.getElementById("indicadorGallinero");

    if (!indicador) {

        indicador = document.createElement("div");

        indicador.id = "indicadorGallinero";

        indicador.innerHTML = `
            🐔
            <span>GALLINERO</span>
        `;

        document.body.appendChild(indicador);
    }

    indicador.style.display = "block";
}


// =====================================================
// 🚫 OCULTAR INDICADOR
// =====================================================

function ocultarIndicadorGallinero() {

    const indicador =
        document.getElementById("indicadorGallinero");

    if (indicador) {
        indicador.style.display = "none";
    }

}


// =====================================================
// 🐔 ACTUALIZAR ESTADO DEL GALLINERO
// =====================================================

function actualizarEstadoGallinero() {

    if (!playerSprite) return;

    const dentro = estaDentroGallinero();

    if (dentro) {

        if (!gallineroAbierto) {
            mostrarGallinero();
        }

        mostrarIndicadorGallinero();

    } else {

        ocultarIndicadorGallinero();

    }

    actualizarHUD();
}


// =====================================================
// 🌾 ACTUALIZAR ESTADO DEL CORRAL
// =====================================================

function actualizarEstadoCorral() {

    if (!playerSprite) return;

    const dentro = estaDentroCorral();

    if (dentro) {
        // El jugador está dentro de la zona del corral
        return;
    }

}


// =====================================================
// 🎥 CONFIGURACIÓN INICIAL DE CÁMARA
// =====================================================

function configurarCamaraInicial() {

    if (!camera) return;

    camera.position.set(
        playerPosition.x,
        playerPosition.y + 9,
        playerPosition.z + 12
    );

    camera.lookAt(
        playerPosition.x,
        playerPosition.y + 1.5,
        playerPosition.z
    );

}


// =====================================================
// 📐 RESIZE DEL MUNDO 3D
// =====================================================

function configurarResize() {

    window.addEventListener("resize", () => {

        if (!camera || !renderer) return;

        const contenedor =
            document.getElementById("mundo3D");

        if (!contenedor) return;

        const ancho =
            contenedor.clientWidth ||
            window.innerWidth;

        const alto =
            contenedor.clientHeight ||
            window.innerHeight;

        camera.aspect = ancho / alto;

        camera.updateProjectionMatrix();

        renderer.setSize(
            ancho,
            alto,
            false
        );

    });

}


// =====================================================
// 🖱️ EVITAR SCROLL AL JUGAR
// =====================================================

function bloquearScrollJuego() {

    window.addEventListener(
        "touchmove",
        (evento) => {

            if (
                document.getElementById("mundo3D") &&
                document.getElementById("mundo3D").style.display !== "none"
            ) {
                evento.preventDefault();
            }

        },
        {
            passive: false
        }
    );

}


// =====================================================
// 🚀 CONFIGURACIÓN GENERAL DEL JUEGO
// =====================================================

function configurarControlesJuego() {

    configurarTeclado();

    crearControlesTouch();

    crearHUD();

    configurarCamaraInicial();

    configurarResize();

    bloquearScrollJuego();

}


// =====================================================
// 🐔 MENSAJE DE BIENVENIDA AL GALLINERO
// =====================================================

function mostrarMensajeGallinero() {

    let mensaje =
        document.getElementById("mensajeGallinero");

    if (!mensaje) {

        mensaje = document.createElement("div");

        mensaje.id = "mensajeGallinero";

        document.body.appendChild(mensaje);

    }

    mensaje.textContent =
        "🐔 ¡Entraste al gallinero!";

    mensaje.style.display = "block";

    clearTimeout(
        mostrarMensajeGallinero.timeout
    );

    mostrarMensajeGallinero.timeout =
        setTimeout(() => {

            mensaje.style.display = "none";

        }, 2500);

}


// =====================================================
// 🔄 DETECTAR ENTRADA AL GALLINERO
// =====================================================

let estabaDentroGallinero = false;

function detectarEntradaGallinero() {

    if (!playerSprite) return;

    const dentro =
        estaDentroGallinero();

    if (
        dentro &&
        !estabaDentroGallinero
    ) {

        mostrarMensajeGallinero();

    }

    estabaDentroGallinero = dentro;

}


// =====================================================
// 🧭 ACTUALIZACIÓN GENERAL DEL MUNDO
// =====================================================

function actualizarMundo() {

    actualizarJugador();

    actualizarCamara();

    actualizarEstadoGallinero();

    actualizarEstadoCorral();

    detectarEntradaGallinero();

    actualizarHUD();

}


// =====================================================
// 🐔 ANIMACIÓN DEL GALLINERO
// =====================================================

function animarGallinero() {

    if (!gallineroGrupo) return;

    // Pequeña animación para que el gallinero
    // tenga vida sin mover su estructura.

    const tiempo =
        performance.now() * 0.001;

    gallineroGrupo.rotation.y =
        Math.sin(tiempo * 0.15) * 0.002;

}


// =====================================================
// 🌎 ANIMACIÓN PRINCIPAL
// =====================================================

function animarMundo() {

    requestAnimationFrame(animarMundo);

    if (!scene3D || !camera || !renderer) {
        return;
    }

    const delta =
        reloj ? reloj.getDelta() : 0.016;

    actualizarMundo();

    animarGallinero();

    actualizarAnimacionPlayer(delta);

    renderer.render(
        scene3D,
        camera
    );

        }
// =====================================================
// 🐔 GAMERPRO GAME — BLOQUE 5/6
// 🏠 INTERFAZ DEL GALLINERO
// =====================================================


// =====================================================
// 🐔 CREAR PANEL DEL GALLINERO
// =====================================================

function crearPanelGallinero() {

    let panel =
        document.getElementById("panelGallinero");

    if (panel) return panel;

    panel = document.createElement("div");

    panel.id = "panelGallinero";

    panel.innerHTML = `
        <div class="gallinero-panel-header">
            <div>
                <strong>🐔 GALLINERO</strong>
                <small>GAMERPRO GAME</small>
            </div>

            <button id="cerrarGallinero">
                ✕
            </button>
        </div>

        <div class="gallinero-contenido">

            <div class="gallinero-card">
                <div class="gallinero-icono">
                    🐔
                </div>

                <div>
                    <strong>Mis pollos</strong>
                    <span>
                        Administra tus pollos
                    </span>
                </div>
            </div>

            <div class="gallinero-card">
                <div class="gallinero-icono">
                    🥚
                </div>

                <div>
                    <strong>Huevos</strong>
                    <span>
                        Revisa tus huevos
                    </span>
                </div>
            </div>

            <div class="gallinero-card">
                <div class="gallinero-icono">
                    🧬
                </div>

                <div>
                    <strong>Fusiones</strong>
                    <span>
                        Combina tus pollos
                    </span>
                </div>
            </div>

        </div>

        <div class="gallinero-footer">
            🌾 Tu gallinero está listo
        </div>
    `;

    document.body.appendChild(panel);


    const cerrar =
        document.getElementById("cerrarGallinero");

    if (cerrar) {

        cerrar.addEventListener("click", () => {

            cerrarPanelGallinero();

        });

    }

    return panel;
}


// =====================================================
// 🐔 ABRIR PANEL DEL GALLINERO
// =====================================================

function abrirPanelGallinero() {

    const panel =
        crearPanelGallinero();

    panel.classList.add("visible");

}


// =====================================================
// ❌ CERRAR PANEL DEL GALLINERO
// =====================================================

function cerrarPanelGallinero() {

    const panel =
        document.getElementById("panelGallinero");

    if (!panel) return;

    panel.classList.remove("visible");

}


// =====================================================
// 🐔 BOTÓN PARA ABRIR GALLINERO
// =====================================================

function crearBotonGallinero() {

    let boton =
        document.getElementById("botonAbrirGallinero");

    if (boton) return;

    boton = document.createElement("button");

    boton.id = "botonAbrirGallinero";

    boton.innerHTML = `
        🐔 Gallinero
    `;

    boton.addEventListener("click", () => {

        abrirPanelGallinero();

    });

    document.body.appendChild(boton);

}


// =====================================================
// 🌾 INDICADOR DE ZONA
// =====================================================

function crearIndicadorZona() {

    let indicador =
        document.getElementById("indicadorZona");

    if (indicador) return;

    indicador = document.createElement("div");

    indicador.id = "indicadorZona";

    indicador.innerHTML = `
        <span id="iconoZona">🌾</span>
        <span id="textoZona">Granja</span>
    `;

    document.body.appendChild(indicador);

}


// =====================================================
// 🌾 ACTUALIZAR INDICADOR DE ZONA
// =====================================================

function actualizarIndicadorZona() {

    const texto =
        document.getElementById("textoZona");

    const icono =
        document.getElementById("iconoZona");

    if (!texto || !icono) return;

    if (estaDentroGallinero()) {

        icono.textContent = "🐔";
        texto.textContent = "Gallinero";

    } else if (estaDentroCorral()) {

        icono.textContent = "🌾";
        texto.textContent = "Corral";

    } else {

        icono.textContent = "🌳";
        texto.textContent = "Granja";

    }

}


// =====================================================
// 🎮 CREAR INTERFAZ COMPLETA
// =====================================================

function crearInterfazJuego() {

    crearPanelGallinero();

    crearBotonGallinero();

    crearIndicadorZona();

}


// =====================================================
// 🎨 ESTILOS DINÁMICOS
// =====================================================

function crearEstilosJuego() {

    if (document.getElementById("estilosGamerpro")) {
        return;
    }

    const estilo =
        document.createElement("style");

    estilo.id = "estilosGamerpro";

    estilo.textContent = `

        /* =========================================
           🎮 CONTROLES TÁCTILES
           ========================================= */

        #controlesTouch {

            position: fixed;

            left: 20px;
            bottom: 25px;

            z-index: 9999;

            user-select: none;

            touch-action: none;

        }

        .touch-fila {

            display: flex;

            justify-content: center;

            gap: 8px;

            margin: 6px 0;

        }

        .touch-btn {

            width: 58px;
            height: 58px;

            border: none;

            border-radius: 14px;

            background: rgba(0, 0, 0, 0.65);

            color: white;

            font-size: 25px;

            font-weight: bold;

            box-shadow:
                0 4px 12px rgba(0,0,0,.35);

            touch-action: none;

        }

        .touch-btn:active {

            transform: scale(.92);

        }


        /* =========================================
           📊 HUD
           ========================================= */

        #hudJugador {

            position: fixed;

            top: 15px;
            left: 15px;

            z-index: 9998;

            padding: 12px 16px;

            border-radius: 14px;

            background: rgba(0,0,0,.68);

            color: white;

            font-family: Arial, sans-serif;

            pointer-events: none;

        }

        #hudNombre {

            font-size: 17px;

            font-weight: bold;

        }

        #hudZona {

            margin-top: 4px;

            font-size: 14px;

        }

        #hudGallinero {

            margin-top: 3px;

            font-size: 13px;

            opacity: .9;

        }


        /* =========================================
           🐔 INDICADOR GALLINERO
           ========================================= */

        #indicadorGallinero {

            position: fixed;

            top: 50%;
            left: 50%;

            transform:
                translate(-50%, -50%);

            z-index: 9997;

            padding: 12px 20px;

            border-radius: 18px;

            background: rgba(0,0,0,.75);

            color: white;

            font-family: Arial, sans-serif;

            text-align: center;

            pointer-events: none;

            animation:
                aparecerGallinero .25s ease;

        }

        #indicadorGallinero span {

            display: block;

            margin-top: 4px;

            font-size: 13px;

            font-weight: bold;

        }


        /* =========================================
           🐔 PANEL
           ========================================= */

        #panelGallinero {

            position: fixed;

            top: 50%;
            left: 50%;

            width: min(90vw, 430px);

            max-height: 80vh;

            transform:
                translate(-50%, -50%)
                scale(.9);

            z-index: 10000;

            padding: 18px;

            border-radius: 22px;

            background:
                rgba(20,20,20,.96);

            color: white;

            font-family: Arial, sans-serif;

            opacity: 0;

            visibility: hidden;

            transition:
                .2s ease;

            box-shadow:
                0 15px 50px rgba(0,0,0,.55);

        }

        #panelGallinero.visible {

            opacity: 1;

            visibility: visible;

            transform:
                translate(-50%, -50%)
                scale(1);

        }


        /* =========================================
           HEADER
           ========================================= */

        .gallinero-panel-header {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-bottom: 15px;

        }

        .gallinero-panel-header strong {

            display: block;

            font-size: 20px;

        }

        .gallinero-panel-header small {

            display: block;

            margin-top: 3px;

            opacity: .6;

        }

        #cerrarGallinero {

            width: 38px;
            height: 38px;

            border: none;

            border-radius: 12px;

            background:
                rgba(255,255,255,.1);

            color: white;

            font-size: 20px;

        }


        /* =========================================
           CARDS
           ========================================= */

        .gallinero-card {

            display: flex;

            align-items: center;

            gap: 14px;

            padding: 14px;

            margin: 9px 0;

            border-radius: 16px;

            background:
                rgba(255,255,255,.08);

        }

        .gallinero-card strong {

            display: block;

            font-size: 16px;

        }

        .gallinero-card span {

            display: block;

            margin-top: 3px;

            opacity: .65;

            font-size: 13px;

        }

        .gallinero-icono {

            width: 48px;
            height: 48px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 14px;

            background:
                rgba(255,255,255,.1);

            font-size: 25px;

        }


        /* =========================================
           FOOTER
           ========================================= */

        .gallinero-footer {

            margin-top: 15px;

            padding-top: 12px;

            border-top:
                1px solid rgba(255,255,255,.1);

            font-size: 13px;

            opacity: .65;

            text-align: center;

        }


        /* =========================================
           🐔 BOTÓN
           ========================================= */

        #botonAbrirGallinero {

            position: fixed;

            right: 20px;
            bottom: 25px;

            z-index: 9998;

            border: none;

            border-radius: 15px;

            padding: 13px 17px;

            background:
                rgba(0,0,0,.72);

            color: white;

            font-size: 15px;

            font-weight: bold;

            box-shadow:
                0 5px 15px rgba(0,0,0,.35);

        }

        #botonAbrirGallinero:active {

            transform: scale(.94);

        }


        /* =========================================
           🧭 ZONA
           ========================================= */

        #indicadorZona {

            position: fixed;

            right: 20px;
            top: 20px;

            z-index: 9998;

            padding: 9px 13px;

            border-radius: 13px;

            background:
                rgba(0,0,0,.62);

            color: white;

            font-family: Arial, sans-serif;

            font-size: 14px;

            pointer-events: none;

        }

        #iconoZona {

            margin-right: 5px;

        }


        /* =========================================
           💬 MENSAJE
           ========================================= */

        #mensajeGallinero {

            position: fixed;

            left: 50%;
            bottom: 125px;

            transform:
                translateX(-50%);

            z-index: 10001;

            padding: 11px 18px;

            border-radius: 15px;

            background:
                rgba(0,0,0,.78);

            color: white;

            font-family: Arial, sans-serif;

            font-weight: bold;

            pointer-events: none;

            display: none;

        }


        /* =========================================
           ✨ ANIMACIONES
           ========================================= */

        @keyframes aparecerGallinero {

            from {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    scale(.8);

            }

            to {

                opacity: 1;

                transform:
                    translate(-50%, -50%)
                    scale(1);

            }

        }


        /* =========================================
           📱 MÓVIL
           ========================================= */

        @media (max-width: 600px) {

            #hudJugador {

                top: 8px;
                left: 8px;

                padding: 9px 11px;

            }

            #hudNombre {

                font-size: 14px;

            }

            #hudZona,
            #hudGallinero {

                font-size: 11px;

            }

            #botonAbrirGallinero {

                right: 12px;
                bottom: 25px;

                font-size: 13px;

                padding: 11px 13px;

            }

            #indicadorZona {

                top: 10px;
                right: 10px;

                font-size: 12px;

            }

        }

    `;

    document.head.appendChild(estilo);

}


// =====================================================
// 🔄 ACTUALIZAR INTERFAZ
// =====================================================

function actualizarInterfazJuego() {

    actualizarIndicadorZona();

    actualizarHUD();

}


// =====================================================
// 🚀 INICIALIZAR INTERFAZ
// =====================================================

function iniciarInterfazJuego() {

    crearEstilosJuego();

    crearInterfazJuego();

    actualizarInterfazJuego();

}
// =====================================================
// 🐔 GAMERPRO GAME — BLOQUE 6/6
// 🚀 CONEXIÓN FINAL DEL JUEGO
// =====================================================


// =====================================================
// ▶️ OBTENER BOTÓN PLAY
// =====================================================

function obtenerPlayButton() {

    // ID REAL DEL index.html
    let boton =
        document.getElementById("playButton");

    // Compatibilidad por si existe un botón antiguo
    if (!boton) {
        boton =
            document.getElementById("play");
    }

    return boton;
}


// =====================================================
// ▶️ CONFIGURAR PLAY
// =====================================================

function configurarPlay() {

    const boton = obtenerPlayButton();

    if (!boton) {

        console.warn(
            "⚠️ No se encontró #playButton"
        );

        return;

    }

    // Evitar conectar el botón varias veces
    if (boton.dataset.gamerproConfigurado === "true") {
        return;
    }

    boton.dataset.gamerproConfigurado = "true";

    boton.addEventListener("click", (evento) => {

        evento.preventDefault();

        if (secuenciaIniciada) {
            return;
        }

        iniciarSecuencia();

    });

}


// =====================================================
// 🎬 INICIAR SECUENCIA
// =====================================================

function iniciarSecuencia() {

    if (secuenciaIniciada) {
        return;
    }

    secuenciaIniciada = true;

    console.log(
        "🎬 GAMERPRO GAME — iniciando secuencia"
    );

    const inicio =
        document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "none";
    }

    const seleccion =
        document.getElementById("seleccionPersonaje");

    if (seleccion) {
        seleccion.style.display = "none";
    }

    const gallinero =
        document.getElementById("gallinero");

    if (gallinero) {
        gallinero.style.display = "none";
    }

    // Comenzar desde la primera escena
    mostrarEscena(0);

    let escenaActual = 0;

    const intervalo =
        setInterval(() => {

            escenaActual++;

            if (
                escenaActual < ESCENAS.length
            ) {

                mostrarEscena(
                    escenaActual
                );

            } else {

                clearInterval(intervalo);

                console.log(
                    "🥚 Secuencia terminada"
                );

                setTimeout(() => {

                    revelarHuevo();

                }, 500);

            }

        }, 3000);

}


// =====================================================
// 🥚 REVELAR HUEVO Y CONTINUAR
// =====================================================

function continuarDespuesDelHuevo() {

    setTimeout(() => {

        console.log(
            "🐣 Huevo revelado → selección de personaje"
        );

        mostrarSeleccionPersonaje();

    }, 2500);

}


// =====================================================
// 🥚 ENVOLVER REVELAR HUEVO
// =====================================================
//
// La función original puede mostrar la imagen.
// Aquí hacemos que después continúe el juego.
//

const revelarHuevoOriginal =
    revelarHuevo;

revelarHuevo = function() {

    revelarHuevoOriginal();

    continuarDespuesDelHuevo();

};


// =====================================================
// 👤 MOSTRAR SELECCIÓN DE PERSONAJE
// =====================================================

function mostrarSeleccionPersonaje() {

    const inicio =
        document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "none";
    }

    const cinematico =
        document.getElementById("cinematico");

    if (cinematico) {
        cinematico.style.display = "none";
    }

    const huevo =
        document.getElementById("huevo");

    if (huevo) {
        huevo.style.display = "none";
    }

    const seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );

    if (!seleccion) {

        console.warn(
            "⚠️ No existe #seleccionPersonaje"
        );

        return;

    }

    seleccion.style.display = "flex";

    seleccion.style.position = "fixed";

    seleccion.style.inset = "0";

    seleccion.style.zIndex = "9990";

    console.log(
        "👤 Selección de personaje abierta"
    );

}


// =====================================================
// 👤 SELECCIONAR PERSONAJE
// =====================================================

function seleccionarPersonaje(genero) {

    if (
        genero !== "hombre" &&
        genero !== "mujer"
    ) {

        console.warn(
            "⚠️ Personaje no válido:",
            genero
        );

        return;

    }

    jugadorSeleccionado =
        genero;

    jugador.genero =
        genero;

    if (genero === "hombre") {

        jugador.imagen =
            "hombre.jpg";

        jugador.spritesheet =
            PLAYER_SPRITESHEETS.hombre;

    } else {

        jugador.imagen =
            "mujer.jpg";

        jugador.spritesheet =
            PLAYER_SPRITESHEETS.mujer;

    }

    console.log(
        "👤 Personaje seleccionado:",
        genero
    );

    try {

        localStorage.setItem(
            "gamerpro_personaje",
            genero
        );

    } catch (error) {

        console.warn(
            "⚠️ No se pudo guardar personaje",
            error
        );

    }

    const seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );

    if (seleccion) {
        seleccion.style.display = "none";
    }

    // 🚀 AQUÍ COMIENZA EL MUNDO 3D
    iniciarZonaGranja();

}


// =====================================================
// 💾 CARGAR PERSONAJE GUARDADO
// =====================================================

function cargarPersonajeGuardado() {

    try {

        const guardado =
            localStorage.getItem(
                "gamerpro_personaje"
            );

        if (
            guardado === "hombre" ||
            guardado === "mujer"
        ) {

            jugadorSeleccionado =
                guardado;

            jugador.genero =
                guardado;

            if (
                guardado === "hombre"
            ) {

                jugador.imagen =
                    "hombre.jpg";

                jugador.spritesheet =
                    PLAYER_SPRITESHEETS.hombre;

            } else {

                jugador.imagen =
                    "mujer.jpg";

                jugador.spritesheet =
                    PLAYER_SPRITESHEETS.mujer;

            }

            console.log(
                "💾 Personaje cargado:",
                guardado
            );

        }

    } catch (error) {

        console.warn(
            "⚠️ Error cargando personaje",
            error
        );

    }

}


// =====================================================
// 🌾 INICIAR GRANJA 3D — VERSIÓN FINAL
// =====================================================

function iniciarZonaGranja() {

    console.log(
        "🌾 Iniciando mundo 3D..."
    );

    const mundo =
        document.getElementById("mundo3D");

    if (!mundo) {

        console.error(
            "❌ No existe #mundo3D"
        );

        return;

    }

    // Ocultar pantallas anteriores
    const inicio =
        document.getElementById("inicio");

    if (inicio) {
        inicio.style.display = "none";
    }

    const cinematico =
        document.getElementById("cinematico");

    if (cinematico) {
        cinematico.style.display = "none";
    }

    const seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );

    if (seleccion) {
        seleccion.style.display = "none";
    }

    const gallinero =
        document.getElementById("gallinero");

    if (gallinero) {
        gallinero.style.display = "none";
    }


    // Mostrar mundo
    mundo.style.display = "block";

    mundo.style.position = "fixed";

    mundo.style.inset = "0";

    mundo.style.width = "100vw";

    mundo.style.height = "100vh";

    mundo.style.overflow = "hidden";


    // Limpiar renderer anterior
    mundo.innerHTML = "";


    // =================================================
    // 🌎 ESCENA
    // =================================================

    scene3D =
        new THREE.Scene();

    scene3D.background =
        new THREE.Color(
            0x87ceeb
        );


    // =================================================
    // 🎥 CÁMARA
    // =================================================

    camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
                window.innerHeight,
            0.1,
            500
        );


    // =================================================
    // 🖥️ RENDERER
    // =================================================

    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.shadowMap.enabled =
        true;

    mundo.appendChild(
        renderer.domElement
    );


    // =================================================
    // 🌾 CREAR MUNDO
    // =================================================

    crearTerreno();

    crearReferenciaVisualGranja();

    crearIluminacion();

    crearGallinero3D();

    crearPlayer();


    // =================================================
    // 🎥 CÁMARA INICIAL
    // =================================================

    configurarCamaraInicial();


    // =================================================
    // 🖥️ INTERFAZ
    // =================================================

    iniciarInterfazJuego();

    crearControlesTouch();


    // =================================================
    // ⏱️ RELOJ
    // =================================================

    reloj =
        new THREE.Clock();


    // =================================================
    // 🐔 ESTADO
    // =================================================

    gallineroAbierto =
        false;

    estabaDentroGallinero =
        false;


    console.log(
        "🐔 Gallinero 3D creado"
    );

    console.log(
        "🧍 Jugador creado"
    );

    console.log(
        "🌾 Granja lista"
    );


    // =================================================
    // 🚀 ARRANCAR LOOP
    // =================================================

    animarMundo();

}


// =====================================================
// 🧹 CERRAR INTERFAZ AL VOLVER AL MUNDO
// =====================================================

function cerrarInterfacesJuego() {

    cerrarPanelGallinero();

    const mensaje =
        document.getElementById(
            "mensajeGallinero"
        );

    if (mensaje) {
        mensaje.style.display = "none";
    }

}


// =====================================================
// 🐔 MOSTRAR GALLINERO
// =====================================================
//
// IMPORTANTE:
// No mostramos el div vacío #gallinero encima
// del mundo 3D. Abrimos nuestro panel propio.
//

function mostrarGallinero() {

    gallineroAbierto =
        true;

    crearPanelGallinero();

    console.log(
        "🐔 Gallinero abierto"
    );

}


// =====================================================
// 🐔 OCULTAR GALLINERO
// =====================================================

function ocultarGallinero() {

    gallineroAbierto =
        false;

    cerrarPanelGallinero();

}


// =====================================================
// 📱 EVITAR DOBLE INICIALIZACIÓN
// =====================================================

let gamerproInicializado =
    false;


// =====================================================
// 🚀 INICIALIZACIÓN FINAL
// =====================================================

function inicializarGamerpro() {

    if (gamerproInicializado) {
        return;
    }

    gamerproInicializado =
        true;

    console.log(
        "🐔 GAMERPRO GAME iniciado"
    );


    // Cargar personaje guardado
    cargarPersonajeGuardado();


    // Configurar PLAY
    configurarPlay();


    // Configurar controles
    configurarTeclado();


    // Configurar resize
    configurarResize();


    // Crear estilos solamente
    // cuando sean necesarios
    crearEstilosJuego();


    console.log(
        "✅ GAMERPRO GAME listo"
    );

}


// =====================================================
// 📐 RESIZE EXTRA DEL RENDERER
// =====================================================

window.addEventListener(
    "resize",
    () => {

        if (
            !renderer ||
            !camera
        ) {
            return;
        }

        const mundo =
            document.getElementById(
                "mundo3D"
            );

        if (!mundo) return;

        const ancho =
            mundo.clientWidth ||
            window.innerWidth;

        const alto =
            mundo.clientHeight ||
            window.innerHeight;

        renderer.setSize(
            ancho,
            alto,
            false
        );

        camera.aspect =
            ancho / alto;

        camera.updateProjectionMatrix();

    }
);


// =====================================================
// 🛡️ VISIBILIDAD DE LA PÁGINA
// =====================================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "hidden"
        ) {

            // Soltar todas las teclas
            // para evitar que el jugador
            // siga caminando al volver.

            Object.keys(teclas)
                .forEach((tecla) => {

                    teclas[tecla] =
                        false;

                });

            Object.keys(
                movimientoTouch
            ).forEach((direccion) => {

                movimientoTouch[
                    direccion
                ] = false;

            });

        }

    }
);


// =====================================================
// 🐔 ARRANQUE AUTOMÁTICO
// =====================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarGamerpro
    );

} else {

    inicializarGamerpro();

}


// =====================================================
// ✅ FIN DEL GAME.JS
// =====================================================

console.log(
    "══════════════════════════════════════"
);

console.log(
    "🐔 GAMERPRO GAME — GAME.JS CARGADO"
);

console.log(
    "▶️ PLAY: playButton"
);

console.log(
    "🌾 Mundo: 3D"
);

console.log(
    "🐔 Gallinero: ACTIVADO"
);

console.log(
    "══════════════════════════════════════"
);
