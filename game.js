import * as THREE from "three";

const game = document.getElementById("game");

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
    hombre: "./mono_N_boy_spritesheet.png",
    mujer: "./mono_N_girl_spritesheet.png"
};

// =====================================================
// 🌎 ZONAS
// =====================================================

const ZONAS = {

    granja: {
        id: "granja",
        nombre: "Granja",
        imagen: "./Granja.jpg",
        desbloqueada: true
    },

    bosque: {
        id: "bosque",
        nombre: "Bosque",
        imagen: "./Bosque.jpg",
        desbloqueada: false
    },

    pesca: {
        id: "pesca",
        nombre: "Pesca",
        imagen: "./Pesca.jpg",
        desbloqueada: false
    }

};

// =====================================================
// 🎬 ESCENAS
// =====================================================

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

// =====================================================
// ⚡ PRECARGA
// =====================================================

const imagenesPrecargadas = {};

function precargarEscenas() {

    const recursos = [

        ...escenas.map(
            escena => escena.imagen
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

    recursos.forEach(src => {

        const img = new Image();

        img.src = src;
        img.decoding = "async";

        imagenesPrecargadas[src] = img;

    });

}

precargarEscenas();

// =====================================================
// 🎮 ESTADO DE LA SECUENCIA
// =====================================================

let secuenciaIniciada = false;

// =====================================================
// 🥚 RESULTADO ACTUAL
// =====================================================

let resultadoHuevo = null;

// =====================================================
// 🎬 MOSTRAR ESCENA
// =====================================================

function mostrarEscena(indice) {

    const escena = escenas[indice];

    if (!escena) {
        return;
    }

    let cinematico =
        document.getElementById("cinematico");

    if (!cinematico) {

        cinematico =
            document.createElement("div");

        cinematico.id = "cinematico";

        game.appendChild(cinematico);

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

    cinematico.style.display = "block";

    const inicio =
        document.getElementById("inicio");

    const mundo =
        document.getElementById("mundo3D");

    const gallinero =
        document.getElementById("gallinero");

    if (inicio) {
        inicio.style.display = "none";
    }

    if (mundo) {
        mundo.style.display = "none";
    }

    if (gallinero) {
        gallinero.style.display = "none";
    }

}

// =====================================================
// 🥚 REVELAR HUEVO
// =====================================================

function revelarHuevo() {

    const numero =
        Math.random() * 100;

    if (numero < 98) {

        resultadoHuevo = "./10.jpg";

    } else if (numero < 99) {

        resultadoHuevo = "./10.1.jpg";

    } else {

        resultadoHuevo = "./10.3.jpg";

    }

    let cinematico =
        document.getElementById("cinematico");

    if (!cinematico) {

        cinematico =
            document.createElement("div");

        cinematico.id = "cinematico";

        game.appendChild(cinematico);

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

    cinematico.style.display = "block";

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
            document.createElement("div");

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

    // Guardar género
    jugador.genero =
        genero;

    // Imagen del personaje
    jugador.imagen =
        genero === "hombre"
            ? "./hombre.jpg"
            : "./mujer.jpg";

    // Spritesheet
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
                personaje.genero !== "hombre" &&
                personaje.genero !== "mujer"
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

    } catch (error) {

        console.warn(
            "No se pudo cargar el personaje:",
            error
        );

    }

}

cargarPersonajeGuardado();

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
// 🌎 ESTADO DEL MUNDO 3D
// =====================================================

let renderer = null;
let scene3D = null;
let camera = null;
let terrain = null;
let playerSprite = null;
let animationFrame = null;

const reloj =
    new THREE.Clock();

let teclas = {};

const movimientoTouch = {

    arriba: false,
    abajo: false,
    izquierda: false,
    derecha: false

};

const playerPosition =
    new THREE.Vector3(
        0,
        0,
        0
    );

// =====================================================
// 🧍 SPRITESHEET DEL JUGADOR
// =====================================================

const SPRITESHEET = {

    columnas: 4,
    filas: 4,
    velocidad: 10

};

let playerTexture = null;

let playerFrame = 0;

let playerDirection = 0;

let playerAnimationTimer = 0;

// =====================================================
// 🌾 CONFIGURACIÓN DEL MUNDO
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

    limits: {

        minX: -38,

        maxX: 38,

        minZ: -27,

        maxZ: 27

    },

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

const estructuras = [

    // 🏠 CASA
    {

        id: "casa",

        min:
            new THREE.Vector3(
                -30,
                0,
                -24
            ),

        max:
            new THREE.Vector3(
                -12,
                8,
                -10
            ),

        bloqueada: true

    },

    // 📦 ALMACÉN
    {

        id: "almacen",

        min:
            new THREE.Vector3(
                -8,
                0,
                -25
            ),

        max:
            new THREE.Vector3(
                8,
                7,
                -14
            ),

        bloqueada: true

    },

    // 🛒 SHOP
    {

        id: "shop",

        min:
            new THREE.Vector3(
                18,
                0,
                -20
            ),

        max:
            new THREE.Vector3(
                32,
                7,
                -8
            ),

        bloqueada: true

    },

    // 🐔 GALLINERO
    {

        id: "gallinero",

        min:
            new THREE.Vector3(
                -13,
                0,
                9
            ),

        max:
            new THREE.Vector3(
                13,
                7,
                26
            ),

        bloqueada: false

    }

];

// =====================================================
// 📦 CAJAS DE COLISIÓN
// =====================================================

const ESTRUCTURAS =
    estructuras.map(
        estructura => ({

            ...estructura,

            caja:
                new THREE.Box3(
                    estructura.min.clone(),
                    estructura.max.clone()
                )

        })
    );

// =====================================================
// ⛰️ ALTURA DEL TERRENO
// =====================================================

function obtenerAlturaTerreno(
    x,
    z
) {

    const distanciaX =
        x /
        (WORLD.width / 2);

    const distanciaZ =
        z /
        (WORLD.depth / 2);

    return (

        Math.sin(
            distanciaX *
            Math.PI *
            2
        ) *
        0.35

        +

        Math.cos(
            distanciaZ *
            Math.PI *
            2
        ) *
        0.3

    );

}

// =====================================================
// 🌱 CREAR TERRENO
// =====================================================

function crearTerreno() {

    const geometry =
        new THREE.PlaneGeometry(
            WORLD.width,
            WORLD.depth,
            40,
            30
        );

    const posiciones =
        geometry.attributes.position;

    for (
        let i = 0;
        i < posiciones.count;
        i++
    ) {

        const x =
            posiciones.getX(i);

        const z =
            -posiciones.getY(i);

        posiciones.setZ(
            i,
            obtenerAlturaTerreno(
                x,
                z
            )
        );
    }

    geometry.computeVertexNormals();

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x70a84f,
            roughness: 1
        });

    terrain =
        new THREE.Mesh(
            geometry,
            material
        );

    terrain.rotation.x =
        -Math.PI / 2;

    terrain.position.y = 0;

    scene3D.add(
        terrain
    );
}

// =====================================================
// 🌳 REFERENCIA VISUAL DE LA GRANJA
// =====================================================

function crearReferenciaVisualGranja() {

    const grupo =
        new THREE.Group();

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x8b5a2b
        });

    const poste =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.5,
                3,
                0.5
            ),
            material
        );

    poste.position.set(
        15,
        1.5,
        15
    );

    grupo.add(
        poste
    );

    scene3D.add(
        grupo
    );
}

// =====================================================
// 💡 ILUMINACIÓN
// =====================================================

function crearIluminacion() {

    const ambiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x557755,
            2
        );

    scene3D.add(
        ambiente
    );

    const sol =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    sol.position.set(
        20,
        30,
        10
    );

    scene3D.add(
        sol
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
    // 🪵 MATERIALES
    // =================================================

    const madera =
        new THREE.MeshStandardMaterial({
            color: 0x8b5a2b,
            roughness: 0.9
        });

    const maderaOscura =
        new THREE.MeshStandardMaterial({
            color: 0x5c3a21,
            roughness: 1
        });

    const techoMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x7a3030,
            roughness: 1
        });

    const sueloMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc99b5a,
            roughness: 1
        });

    // =================================================
    // 🟫 SUELO
    // =================================================

    const suelo =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                25,
                0.3,
                17
            ),
            sueloMaterial
        );

    suelo.position.set(
        0,
        0.15,
        17.5
    );

    grupo.add(
        suelo
    );

    // =================================================
    // 🪵 PARED TRASERA
    // =================================================

    const paredTrasera =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                26,
                7,
                0.6
            ),
            madera
        );

    paredTrasera.position.set(
        0,
        3.5,
        25.5
    );

    grupo.add(
        paredTrasera
    );

    // =================================================
    // 🪵 PARED IZQUIERDA
    // =================================================

    const paredIzquierda =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.6,
                7,
                17
            ),
            madera
        );

    paredIzquierda.position.set(
        -12.7,
        3.5,
        17.5
    );

    grupo.add(
        paredIzquierda
    );

    // =================================================
    // 🪵 PARED DERECHA
    // =================================================

    const paredDerecha =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.6,
                7,
                17
            ),
            madera
        );

    paredDerecha.position.set(
        12.7,
        3.5,
        17.5
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
                27,
                0.7,
                18
            ),
            techoMaterial
        );

    techo.position.set(
        0,
        7.2,
        17.5
    );

    grupo.add(
        techo
    );

    // =================================================
    // 🚪 ENTRADA
    // =================================================

    const marcoIzquierdo =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.7,
                5,
                0.7
            ),
            maderaOscura
        );

    marcoIzquierdo.position.set(
        -3.5,
        2.5,
        9.1
    );

    grupo.add(
        marcoIzquierdo
    );

    const marcoDerecho =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.7,
                5,
                0.7
            ),
            maderaOscura
        );

    marcoDerecho.position.set(
        3.5,
        2.5,
        9.1
    );

    grupo.add(
        marcoDerecho
    );

    // =================================================
    // 🪵 VIGA DE LA ENTRADA
    // =================================================

    const viga =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                0.7,
                0.7
            ),
            maderaOscura
        );

    viga.position.set(
        0,
        5,
        9.1
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
                    3,
                    1,
                    2
                ),
                maderaOscura
            );

        caja.position.set(
            -8 + i * 5,
            0.8,
            22
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
                maderaOscura
            );

        percha.rotation.z =
            Math.PI / 2;

        percha.position.set(
            0,
            1.5 + i * 1.2,
            14 + i * 2
        );

        grupo.add(
            percha
        );
    }

    scene3D.add(
        grupo
    );

    return grupo;
}

// =====================================================
// 🌾 INICIAR ZONA GRANJA
// =====================================================

function iniciarZonaGranja() {

    const mundo =
        document.getElementById(
            "mundo3D"
        );

    if (!mundo) {

        console.error(
            "❌ No existe el elemento #mundo3D"
        );

        return;
    }

    mundo.style.display =
        "block";

    const inicio =
        document.getElementById(
            "inicio"
        );

    if (inicio) {

        inicio.style.display =
            "none";
    }

    const cinematico =
        document.getElementById(
            "cinematico"
        );

    if (cinematico) {

        cinematico.style.display =
            "none";
    }

    const seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );

    if (seleccion) {

        seleccion.style.display =
            "none";
    }

    // =================================================
    // ♻️ SI EL MUNDO YA EXISTE
    // =================================================

    if (scene3D) {

        mundo.style.display =
            "block";

        return;
    }

    // =================================================
    // 🌎 CREAR ESCENA
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
            300
        );

    camera.position.set(
        0,
        12,
        20
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
            1.5
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    mundo.innerHTML = "";

    mundo.appendChild(
        renderer.domElement
    );

    // =================================================
    // 🌱 CREAR TERRENO
    // =================================================

    crearTerreno();

    // =================================================
    // 🌳 REFERENCIA
    // =================================================

    crearReferenciaVisualGranja();

    // =================================================
    // 💡 LUZ
    // =================================================

    crearIluminacion();

    // =================================================
    // 🐔 GALLINERO
    // =================================================

    crearGallinero3D();

    // =================================================
    // 👤 JUGADOR
    // =================================================

    crearPlayer();

    // =================================================
    // ⏱️ RELOJ
    // =================================================

    reloj.start();

    // =================================================
    // 🎮 INICIAR ANIMACIÓN
    // =================================================

    animarMundo();
}
// =====================================================
// 🧍 CREAR JUGADOR
// =====================================================

function crearPlayer() {

    if (!jugador.genero) {

        console.warn(
            "⚠️ No hay personaje seleccionado."
        );

        return;
    }

    const ruta =
        jugador.spritesheet ||
        PLAYER_SPRITESHEETS[
            jugador.genero
        ];

    const loader =
        new THREE.TextureLoader();

    playerTexture =
        loader.load(

            ruta,

            () => {

                console.log(
                    "✅ Spritesheet cargado:",
                    ruta
                );

                actualizarFramePlayer();

            },

            undefined,

            error => {

                console.error(
                    "❌ No se pudo cargar el spritesheet:",
                    ruta,
                    error
                );

            }

        );

    playerTexture.colorSpace =
        THREE.SRGBColorSpace;

    playerTexture.wrapS =
        THREE.ClampToEdgeWrapping;

    playerTexture.wrapT =
        THREE.ClampToEdgeWrapping;

    playerTexture.magFilter =
        THREE.NearestFilter;

    playerTexture.minFilter =
        THREE.NearestFilter;

    // 4 columnas × 4 filas
    playerTexture.repeat.set(
        0.25,
        0.25
    );

    // Primer frame
    playerTexture.offset.set(
        0,
        0.75
    );

    const material =
        new THREE.SpriteMaterial({

            map: playerTexture,

            transparent: true,

            alphaTest: 0.05,

            depthTest: true,

            depthWrite: false

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

    playerPosition.set(

        WORLD.spawn.x,

        obtenerAlturaTerreno(
            WORLD.spawn.x,
            WORLD.spawn.z
        ) +
        WORLD.playerHeight / 2,

        WORLD.spawn.z

    );

    playerSprite.position.copy(
        playerPosition
    );

    scene3D.add(
        playerSprite
    );

    actualizarFramePlayer();

}

// =====================================================
// 🎞️ ACTUALIZAR FRAME
// =====================================================

function actualizarFramePlayer() {

    if (!playerTexture) {

        return;
    }

    playerTexture.offset.set(

        playerFrame *
        0.25,

        1 -
        (playerDirection + 1) *
        0.25

    );

}

// =====================================================
// 🎞️ ANIMACIÓN DEL JUGADOR
// =====================================================

function actualizarAnimacionJugador(
    delta,
    direccion
) {

    if (!playerTexture) {

        return;
    }

    // =================================================
    // 🧍 QUIETO
    // =================================================

    if (direccion === null) {

        playerFrame = 0;

        playerAnimationTimer = 0;

        actualizarFramePlayer();

        return;
    }

    // =================================================
    // 🚶 CAMINANDO
    // =================================================

    playerAnimationTimer +=
        delta;

    if (
        playerAnimationTimer >=
        1 /
        SPRITESHEET.velocidad
    ) {

        playerAnimationTimer = 0;

        playerFrame++;

        if (
            playerFrame >=
            SPRITESHEET.columnas
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

    return new THREE.Box3(

        new THREE.Vector3(

            posicion.x - 0.7,

            0,

            posicion.z - 0.7

        ),

        new THREE.Vector3(

            posicion.x + 0.7,

            WORLD.playerHeight,

            posicion.z + 0.7

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

    for (
        const estructura
        of ESTRUCTURAS
    ) {

        // El gallinero se maneja
        // con su propia entrada
        if (
            estructura.id ===
            "gallinero"
        ) {

            continue;

        }

        if (
            !estructura.bloqueada
        ) {

            continue;

        }

        if (
            cajaJugador.intersectsBox(
                estructura.caja
            )
        ) {

            return true;

        }

    }

    return false;

}

// =====================================================
// 🌎 LÍMITES DEL MAPA
// =====================================================

function estaDentroDeLimites(
    posicion
) {

    return (

        posicion.x >=
        WORLD.limits.minX &&

        posicion.x <=
        WORLD.limits.maxX &&

        posicion.z >=
        WORLD.limits.minZ &&

        posicion.z <=
        WORLD.limits.maxZ

    );

}

// =====================================================
// 🐔 COMPROBAR SI ESTÁ EN LA ENTRADA
// =====================================================

function estaEnEntradaGallinero(
    posicion
) {

    return (

        posicion.x >=
        GALLINERO.entradaMinX &&

        posicion.x <=
        GALLINERO.entradaMaxX &&

        posicion.z <=
        GALLINERO.entradaZ + 1 &&

        posicion.z >=
        GALLINERO.entradaZ - 1

    );

}

// =====================================================
// 🐔 ¿ESTÁ DENTRO DEL GALLINERO?
// =====================================================

function estaDentroGallinero(
    posicion
) {

    return (

        posicion.x >
        GALLINERO.minX + 1 &&

        posicion.x <
        GALLINERO.maxX - 1 &&

        posicion.z >
        GALLINERO.minZ + 1 &&

        posicion.z <
        GALLINERO.maxZ - 1

    );

}

// =====================================================
// 🐔 CONTROLAR ENTRADA / SALIDA
// =====================================================

function actualizarEstadoGallinero() {

    if (!playerSprite) {

        return;
    }

    const dentro =
        estaDentroGallinero(
            playerPosition
        );

    if (
        dentro &&
        !dentroGallinero
    ) {

        dentroGallinero =
            true;

        console.log(
            "🐔 Entraste al gallinero"
        );

        mostrarGallinero();

    }

    if (
        !dentro &&
        dentroGallinero
    ) {

        dentroGallinero =
            false;

        console.log(
            "🌾 Saliste del gallinero"
        );

    }

}

// =====================================================
// 🐔 SALIDA DEL CORRAL
// =====================================================

function puedeSalirDelCorral(
    posicion
) {

    // Si está fuera del área
    // del corral, puede moverse
    if (
        posicion.z >
        WORLD.corral.minZ
    ) {

        return true;

    }

    // Para salir por la puerta
    return (

        posicion.x >=
        WORLD.salidaCorral.minX &&

        posicion.x <=
        WORLD.salidaCorral.maxX

    );

}

// =====================================================
// 🎮 ACTUALIZAR JUGADOR
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
    // ⌨️ ARRIBA
    // =================================================

    if (

        teclas["w"] ||

        teclas["W"] ||

        teclas["ArrowUp"] ||

        movimientoTouch.arriba

    ) {

        z -= 1;

    }

    // =================================================
    // ⌨️ ABAJO
    // =================================================

    if (

        teclas["s"] ||

        teclas["S"] ||

        teclas["ArrowDown"] ||

        movimientoTouch.abajo

    ) {

        z += 1;

    }

    // =================================================
    // ⌨️ IZQUIERDA
    // =================================================

    if (

        teclas["a"] ||

        teclas["A"] ||

        teclas["ArrowLeft"] ||

        movimientoTouch.izquierda

    ) {

        x -= 1;

    }

    // =================================================
    // ⌨️ DERECHA
    // =================================================

    if (

        teclas["d"] ||

        teclas["D"] ||

        teclas["ArrowRight"] ||

        movimientoTouch.derecha

    ) {

        x += 1;

    }

    // =================================================
    // 🧍 SIN MOVIMIENTO
    // =================================================

    if (
        x === 0 &&
        z === 0
    ) {

        actualizarAnimacionJugador(
            delta,
            null
        );

        return;

    }

    // =================================================
    // 📐 NORMALIZAR
    // =================================================

    const longitud =
        Math.hypot(
            x,
            z
        );

    x /= longitud;

    z /= longitud;

    // =================================================
    // ⚡ VELOCIDAD
    // =================================================

    const velocidad =
        WORLD.playerSpeed *
        delta;

    const nuevaPosicion =
        playerPosition.clone();

    nuevaPosicion.x +=
        x *
        velocidad;

    nuevaPosicion.z +=
        z *
        velocidad;

    // =================================================
    // ⛰️ ALTURA DEL TERRENO
    // =================================================

    nuevaPosicion.y =

        obtenerAlturaTerreno(

            nuevaPosicion.x,

            nuevaPosicion.z

        ) +

        WORLD.playerHeight /
        2;

    // =================================================
    // 🌎 LÍMITES
    // =================================================

    if (
        !estaDentroDeLimites(
            nuevaPosicion
        )
    ) {

        actualizarAnimacionJugador(
            delta,
            null
        );

        return;

    }

    // =================================================
    // 🏠 COLISIONES
    // =================================================

    if (
        colisionaConEstructura(
            nuevaPosicion
        )
    ) {

        actualizarAnimacionJugador(
            delta,
            null
        );

        return;

    }

    // =================================================
    // 🐔 ACTUALIZAR POSICIÓN
    // =================================================

    playerPosition.copy(
        nuevaPosicion
    );

    playerSprite.position.copy(
        playerPosition
    );

    // =================================================
    // 🎞️ DIRECCIÓN
    // =================================================

    if (
        Math.abs(z) >
        Math.abs(x)
    ) {

        playerDirection =
            z > 0
                ? 0
                : 1;

    } else {

        playerDirection =
            x < 0
                ? 2
                : 3;

    }

    // =================================================
    // 🎞️ ANIMACIÓN
    // =================================================

    actualizarAnimacionJugador(

        delta,

        playerDirection

    );

    // =================================================
    // 🐔 ESTADO DEL GALLINERO
    // =================================================

    actualizarEstadoGallinero();

        }
// =====================================================
// 📷 CÁMARA DEL MUNDO
// =====================================================

function actualizarCamara() {

  if (!camera || !playerSprite) return;

  const objetivo = playerSprite.position.clone();

  objetivo.y += 1.5;

  const posicionDeseada = new THREE.Vector3(
    playerSprite.position.x,
    playerSprite.position.y + 12,
    playerSprite.position.z + 14
  );

  // Movimiento suave de cámara
  camera.position.lerp(posicionDeseada, 0.08);

  camera.lookAt(objetivo);
}


// =====================================================
// ⌨️ CONTROLES DE TECLADO
// =====================================================

function configurarTeclado() {

  window.addEventListener("keydown", (evento) => {

    teclas[evento.key] = true;

    // También guardamos la tecla en minúscula
    teclas[evento.key.toLowerCase()] = true;

  });

  window.addEventListener("keyup", (evento) => {

    teclas[evento.key] = false;

    teclas[evento.key.toLowerCase()] = false;

  });

}


// =====================================================
// 📱 CONTROLES MÓVILES
// =====================================================

function crearControlesMoviles() {

  if (!game) return;

  let controles =
    document.getElementById("controlesMoviles");

  // Evitar crear controles duplicados
  if (controles) return;


  controles = document.createElement("div");

  controles.id = "controlesMoviles";

  controles.style.position = "fixed";
  controles.style.left = "20px";
  controles.style.bottom = "20px";
  controles.style.zIndex = "9999";
  controles.style.userSelect = "none";
  controles.style.touchAction = "none";


  controles.innerHTML = `

    <div style="
      display:flex;
      justify-content:center;
      margin-bottom:6px;
    ">
      <button
        id="moveUp"
        style="
          width:65px;
          height:65px;
          font-size:28px;
          border-radius:15px;
          border:2px solid white;
          background:rgba(0,0,0,.55);
          color:white;
          touch-action:none;
        "
      >▲</button>
    </div>


    <div style="
      display:flex;
      gap:6px;
    ">

      <button
        id="moveLeft"
        style="
          width:65px;
          height:65px;
          font-size:28px;
          border-radius:15px;
          border:2px solid white;
          background:rgba(0,0,0,.55);
          color:white;
          touch-action:none;
        "
      >◀</button>


      <button
        id="moveDown"
        style="
          width:65px;
          height:65px;
          font-size:28px;
          border-radius:15px;
          border:2px solid white;
          background:rgba(0,0,0,.55);
          color:white;
          touch-action:none;
        "
      >▼</button>


      <button
        id="moveRight"
        style="
          width:65px;
          height:65px;
          font-size:28px;
          border-radius:15px;
          border:2px solid white;
          background:rgba(0,0,0,.55);
          color:white;
          touch-action:none;
        "
      >▶</button>

    </div>
  `;


  document.body.appendChild(controles);


  // ===================================================
  // 🔘 CONFIGURAR BOTÓN
  // ===================================================

  function configurarBoton(id, direccion) {

    const boton =
      document.getElementById(id);

    if (!boton) return;


    const activar = (evento) => {

      evento.preventDefault();

      movimientoTouch[direccion] = true;

    };


    const desactivar = (evento) => {

      evento.preventDefault();

      movimientoTouch[direccion] = false;

    };


    boton.addEventListener(
      "pointerdown",
      activar
    );

    boton.addEventListener(
      "pointerup",
      desactivar
    );

    boton.addEventListener(
      "pointercancel",
      desactivar
    );

    boton.addEventListener(
      "pointerleave",
      desactivar
    );

  }


  configurarBoton(
    "moveUp",
    "arriba"
  );

  configurarBoton(
    "moveDown",
    "abajo"
  );

  configurarBoton(
    "moveLeft",
    "izquierda"
  );

  configurarBoton(
    "moveRight",
    "derecha"
  );

}


// =====================================================
// 🐔 BOTÓN RÁPIDO DEL GALLINERO
// =====================================================

function crearBotonGallinero() {

  if (!game) return;

  if (
    document.getElementById(
      "botonGallinero"
    )
  ) {
    return;
  }


  const boton =
    document.createElement("button");


  boton.id =
    "botonGallinero";


  boton.textContent =
    "🐔 GALLINERO";


  boton.style.position =
    "fixed";

  boton.style.right =
    "20px";

  boton.style.bottom =
    "20px";

  boton.style.zIndex =
    "9999";

  boton.style.padding =
    "14px 18px";

  boton.style.fontSize =
    "16px";

  boton.style.fontWeight =
    "bold";

  boton.style.borderRadius =
    "14px";

  boton.style.border =
    "2px solid white";

  boton.style.background =
    "rgba(120,70,20,.9)";

  boton.style.color =
    "white";

  boton.style.display =
    "none";


  boton.addEventListener(
    "click",
    () => {

      if (!gallineroAbierto) {

        mostrarGallinero();

      }

    }
  );


  document.body.appendChild(
    boton
  );

}


// =====================================================
// 👁️ ACTUALIZAR BOTÓN DEL GALLINERO
// =====================================================

function actualizarBotonGallinero() {

  const boton =
    document.getElementById(
      "botonGallinero"
    );

  if (!boton) return;


  if (gallineroAbierto) {

    boton.style.display =
      "block";

  } else {

    boton.style.display =
      "none";

  }

}


// =====================================================
// 🧭 ACTUALIZAR INTERFAZ DEL MUNDO
// =====================================================

function actualizarInterfazMundo() {

  actualizarBotonGallinero();

}


// =====================================================
// 🚪 DETECCIÓN EXTRA DE ENTRADA
// =====================================================

function comprobarEntradaGallinero() {

  if (
    !playerSprite
  ) {
    return;
  }


  const posicion =
    playerSprite.position;


  if (
    estaDentroGallinero(
      posicion
    )
  ) {

    if (!gallineroAbierto) {

      mostrarGallinero();

    }

  }

}


// =====================================================
// 🌾 MARCADOR DE ZONA
// =====================================================

function crearMarcadorGallinero() {

  if (!scene3D) return;


  const grupo =
    new THREE.Group();


  const material =
    new THREE.MeshBasicMaterial({

      color: 0xffcc33,

      transparent: true,

      opacity: 0.85

    });


  const geometria =
    new THREE.BoxGeometry(
      26,
      0.15,
      17
    );


  const marcador =
    new THREE.Mesh(
      geometria,
      material
    );


  marcador.position.set(
    0,
    0.12,
    17.5
  );


  grupo.add(
    marcador
  );


  grupo.userData.esMarcadorGallinero =
    true;


  scene3D.add(
    grupo
  );
    // =====================================================
// 🐔 TEXTO 3D SOBRE EL GALLINERO
// =====================================================

function crearEtiquetaGallinero() {

  if (!scene3D) return;


  const canvas =
    document.createElement("canvas");


  canvas.width = 512;

  canvas.height = 128;


  const ctx =
    canvas.getContext("2d");


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.fillStyle =
    "rgba(0,0,0,0.65)";


  ctx.roundRect(
    10,
    10,
    492,
    108,
    25
  );


  ctx.fill();


  ctx.fillStyle =
    "white";


  ctx.font =
    "bold 48px Arial";


  ctx.textAlign =
    "center";


  ctx.textBaseline =
    "middle";


  ctx.fillText(
    "🐔 GALLINERO",
    256,
    64
  );


  const textura =
    new THREE.CanvasTexture(
      canvas
    );


  textura.needsUpdate =
    true;


  const material =
    new THREE.SpriteMaterial({

      map: textura,

      transparent: true

    });


  const etiqueta =
    new THREE.Sprite(
      material
    );


  etiqueta.scale.set(
    8,
    2,
    1
  );


  etiqueta.position.set(
    0,
    9,
    17
  );


  etiqueta.name =
    "EtiquetaGallinero";


  scene3D.add(
    etiqueta
  );

}


// =====================================================
// 🔄 ACTUALIZACIÓN GENERAL DEL MUNDO
// =====================================================

function actualizarMundo(delta) {

  if (!scene3D) return;

  if (!playerSprite) return;


  actualizarJugador(
    delta
  );


  comprobarEntradaGallinero();


  actualizarCamara();


  actualizarInterfazMundo();

}
    // =====================================================
// 🎮 LOOP PRINCIPAL DEL MUNDO
// =====================================================

function animarMundo() {

  animationFrame =
    requestAnimationFrame(
      animarMundo
    );


  if (!reloj) {

    reloj =
      new THREE.Clock();

  }


  const delta =
    Math.min(
      reloj.getDelta(),
      0.05
    );


  actualizarMundo(
    delta
  );


  if (
    renderer &&
    scene3D &&
    camera
  ) {

    renderer.render(
      scene3D,
      camera
    );

  }

}


// =====================================================
// 📐 REDIMENSIONAR PANTALLA
// =====================================================

function ajustarPantalla() {

  if (
    !renderer ||
    !camera
  ) {
    return;
  }


  const ancho =
    window.innerWidth;

  const alto =
    window.innerHeight;


  camera.aspect =
    ancho / alto;


  camera.updateProjectionMatrix();


  renderer.setSize(
    ancho,
    alto
  );

}


// =====================================================
// 🖥️ CONFIGURAR RESIZE
// =====================================================

function configurarResize() {

  window.addEventListener(
    "resize",
    ajustarPantalla
  );

}


// =====================================================
// 🎨 HUD DEL JUEGO
// =====================================================

function crearHUD() {

  let hud =
    document.getElementById(
      "hudJuego"
    );


  if (hud) return;


  hud =
    document.createElement("div");


  hud.id =
    "hudJuego";


  hud.style.position =
    "fixed";

  hud.style.top =
    "15px";

  hud.style.left =
    "15px";

  hud.style.zIndex =
    "9998";

  hud.style.pointerEvents =
    "none";


  hud.innerHTML = `

    <div style="
      background:rgba(0,0,0,.65);
      color:white;
      padding:10px 15px;
      border-radius:12px;
      font-family:Arial,sans-serif;
      font-weight:bold;
    ">

      🌾 GRANJA GAMERPRO

      <div
        id="estadoZona"
        style="
          margin-top:4px;
          font-size:13px;
          font-weight:normal;
        "
      >
        Zona: Granja
      </div>

    </div>

  `;


  document.body.appendChild(
    hud
  );

}


// =====================================================
// 🌾 ACTUALIZAR HUD
// =====================================================

function actualizarHUD() {

  const estado =
    document.getElementById(
      "estadoZona"
    );


  if (!estado) return;


  if (dentroGallinero) {

    estado.textContent =
      "🐔 Zona: Gallinero";

  } else {

    estado.textContent =
      "🌾 Zona: Granja";

  }

}


// =====================================================
// ▶️ CONFIGURAR BOTÓN PLAY
// =====================================================

function configurarPlay() {

  const play =
    document.getElementById(
      "play"
    );


  if (!play) {

    console.warn(
      "⚠️ No se encontró el botón PLAY"
    );

    return;

  }


  play.addEventListener(
    "click",
    iniciarSecuencia
  );

}


// =====================================================
// 🎬 SECUENCIA INICIAL
// =====================================================

function iniciarSecuencia() {

  if (secuenciaIniciada) {

    return;

  }


  secuenciaIniciada =
    true;


  const play =
    document.getElementById(
      "play"
    );


  if (play) {

    play.style.pointerEvents =
      "none";

    play.style.opacity =
      "0.5";

  }


  mostrarEscena(0);


  // Escenas 2.jpg → 9.jpg
  let escenaActual = 0;


  const intervalo =
    setInterval(() => {

      escenaActual++;


      if (
        escenaActual < escenas.length
      ) {

        mostrarEscena(
          escenaActual
        );

      } else {

        clearInterval(
          intervalo
        );


        setTimeout(() => {

          revelarHuevo();

        }, 500);

      }

    }, 3000);

}


// =====================================================
// 🥚 ASEGURAR RESULTADO DEL HUEVO
// =====================================================

function prepararResultadoHuevo() {

  if (
    resultadoHuevo
  ) {

    return resultadoHuevo;

  }


  resultadoHuevo = {

    nombre:
      "🐔 Pollo Noob",

    rareza:
      "Común",

    imagen:
      "./pollo_noob.png"

  };


  return resultadoHuevo;

}


// =====================================================
// 🐔 ABRIR GALLINERO DESDE EL HUD
// =====================================================

function abrirGallineroDesdeHUD() {

  if (!scene3D) {

    console.warn(
      "⚠️ La granja todavía no está cargada."
    );

    return;

  }


  mostrarGallinero();


  actualizarHUD();

}


// =====================================================
// 🔄 ACTUALIZAR ESTADO DE LA INTERFAZ
// =====================================================

function actualizarInterfazCompleta() {

  actualizarInterfazMundo();

  actualizarHUD();

}


// =====================================================
// 🌾 INICIAR CONTROLES DEL MUNDO
// =====================================================

function iniciarControlesMundo() {

  configurarTeclado();

  crearControlesMoviles();

  crearBotonGallinero();

}


// =====================================================
// 🏠 PREPARAR ELEMENTOS DE LA GRANJA
// =====================================================

function prepararGranja() {

  if (!scene3D) return;


  // Marcador visual
  crearMarcadorGallinero();


  // Texto sobre el gallinero
  crearEtiquetaGallinero();


  actualizarInterfazCompleta();

}


// =====================================================
// 🎮 INICIALIZACIÓN GENERAL
// =====================================================

function inicializarJuego() {

  console.log(
    "🎮 GAMERPRO GAME iniciando..."
  );


  prepararResultadoHuevo();


  configurarPlay();


  configurarResize();


  cargarPersonajeGuardado();


  iniciarControlesMundo();


  crearHUD();


  console.log(
    "✅ GAMERPRO GAME listo."
  );

}


// =====================================================
// 🔧 CORRECCIÓN PARA MOSTRAR LA GRANJA
// =====================================================

const iniciarZonaGranjaOriginal =
  iniciarZonaGranja;


// Reemplazamos el arranque por una
// versión que además prepara el HUD.

iniciarZonaGranja =
  function() {

    iniciarZonaGranjaOriginal();


    setTimeout(() => {

      prepararGranja();


      ajustarPantalla();


      actualizarHUD();

    }, 100);

  };


// =====================================================
// 🐔 ACTUALIZACIÓN FINAL DEL ESTADO
// =====================================================

const actualizarEstadoGallineroOriginal =
  actualizarEstadoGallinero;


actualizarEstadoGallinero =
  function() {

    actualizarEstadoGallineroOriginal();


    actualizarHUD();

    actualizarBotonGallinero();

  };


// =====================================================
// 🚀 ARRANCAR TODO
// =====================================================

inicializarJuego();


// =====================================================
// 🛡️ MENSAJE DE DEPURACIÓN
// =====================================================

console.log(
  "===================================="
);

console.log(
  "🐔 GAMERPRO GAME"
);

console.log(
  "🌾 Granja cargada"
);

console.log(
  "🐔 Gallinero preparado"
);

console.log(
  "👤 Selección de personaje activa"
);

console.log(
  "🎮 Controles activos"
);

console.log(
  "===================================="
);
    
    
