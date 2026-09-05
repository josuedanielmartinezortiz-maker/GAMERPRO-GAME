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

    if (!escena) return;

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
                    ? `<div class="dialogo">
                        ${escena.dialogo}
                       </div>`
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

    if (inicio)
        inicio.style.display = "none";

    if (mundo)
        mundo.style.display = "none";

    if (gallinero)
        gallinero.style.display = "none";
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

        game.appendChild(seleccion);

        seleccion
            .querySelectorAll(
                ".personaje-opcion"
            )
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        seleccionarPersonaje(
                            boton.dataset.genero
                        );

                    }
                );

            });
    }

    const inicio =
        document.getElementById("inicio");

    const cinematico =
        document.getElementById("cinematico");

    if (inicio)
        inicio.style.display = "none";

    if (cinematico)
        cinematico.style.display = "none";

    seleccion.style.display = "flex";
}
// =====================================================
// 👤 SELECCIONAR PERSONAJE
// =====================================================

function seleccionarPersonaje(genero) {

    if (
        genero !== "hombre" &&
        genero !== "mujer"
    ) {
        return;
    }

    jugador.genero = genero;

    jugador.imagen =
        genero === "hombre"
            ? "./hombre.jpg"
            : "./mujer.jpg";

    jugador.spritesheet =
        PLAYER_SPRITESHEETS[genero];

    jugadorSeleccionado = jugador;

    localStorage.setItem(
        "gamerpro_personaje",
        JSON.stringify(jugador)
    );

    const seleccion =
        document.getElementById(
            "seleccionPersonaje"
        );

    if (seleccion) {
        seleccion.remove();
    }

    mostrarGallinero();
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
            JSON.parse(datos);

        if (
            !personaje ||
            (
                personaje.genero !== "hombre" &&
                personaje.genero !== "mujer"
            )
        ) {
            return;
        }

        jugador = personaje;

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
// 🌎 ESTADO DEL MUNDO 3D
// =====================================================

let renderer = null;
let scene3D = null;
let camera = null;
let terrain = null;
let playerSprite = null;
let animationFrame = null;

const reloj = new THREE.Clock();

let teclas = {};

const movimientoTouch = {
    arriba: false,
    abajo: false,
    izquierda: false,
    derecha: false
};

const playerPosition =
    new THREE.Vector3(0, 0, 0);

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
    {
        id: "casa",
        min: new THREE.Vector3(-30, 0, -24),
        max: new THREE.Vector3(-12, 8, -10),
        bloqueada: true
    },

    {
        id: "almacen",
        min: new THREE.Vector3(-8, 0, -25),
        max: new THREE.Vector3(8, 7, -14),
        bloqueada: true
    },

    {
        id: "shop",
        min: new THREE.Vector3(18, 0, -20),
        max: new THREE.Vector3(32, 7, -8),
        bloqueada: true
    },

    {
        id: "gallinero",
        min: new THREE.Vector3(-13, 0, 9),
        max: new THREE.Vector3(13, 7, 26),
        bloqueada: false
    }
];

const ESTRUCTURAS =
    estructuras.map(estructura => ({
        ...estructura,

        caja: new THREE.Box3(
            estructura.min.clone(),
            estructura.max.clone()
        )
    }));
// =====================================================
// ⛰️ ALTURA DEL TERRENO
// =====================================================

function obtenerAlturaTerreno(x, z) {

    const distanciaX =
        x / (WORLD.width / 2);

    const distanciaZ =
        z / (WORLD.depth / 2);

    return (
        Math.sin(
            distanciaX * Math.PI * 2
        ) * 0.35 +

        Math.cos(
            distanciaZ * Math.PI * 2
        ) * 0.3
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

    scene3D.add(terrain);
}
// =====================================================
// 🧍 CREAR JUGADOR
// =====================================================

function crearPlayer() {

    if (!jugador.genero) {
        console.warn(
            "No hay personaje seleccionado."
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
        loader.load(ruta);

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

    playerTexture.repeat.set(
        0.25,
        0.25
    );

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
        new THREE.Sprite(material);

    playerSprite.scale.set(
        4,
        5,
        1
    );

    playerPosition.set(
        WORLD.spawn.x,
        obtenerAlturaTerreno(
            WORLD.spawn.x,
            WORLD.spawn.z
        ) + WORLD.playerHeight / 2,
        WORLD.spawn.z
    );

    playerSprite.position.copy(
        playerPosition
    );

    scene3D.add(
        playerSprite
    );
}
// =====================================================
// 🎞️ FRAME DEL JUGADOR
// =====================================================

function actualizarFramePlayer() {

    if (!playerTexture) {
        return;
    }

    playerTexture.offset.set(
        playerFrame * 0.25,

        1 -
        (playerDirection + 1) * 0.25
    );
}

// =====================================================
// 🎞️ ANIMACIÓN
// =====================================================

function actualizarAnimacionJugador(
    delta,
    direccion
) {

    if (!playerTexture) {
        return;
    }

    if (direccion === null) {

        playerFrame = 0;

        actualizarFramePlayer();

        return;
    }

    playerAnimationTimer +=
        delta;

    if (
        playerAnimationTimer >=
        1 / SPRITESHEET.velocidad
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
// 🚧 COLISIÓN
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
// 🌎 LÍMITES
// =====================================================

function estaDentroDeLimites(
    posicion
) {

    return (
        posicion.x >= WORLD.limits.minX &&
        posicion.x <= WORLD.limits.maxX &&
        posicion.z >= WORLD.limits.minZ &&
        posicion.z <= WORLD.limits.maxZ
    );
}

// =====================================================
// 🐔 SALIDA DEL CORRAL
// =====================================================

function puedeSalirDelCorral(
    posicion
) {

    if (
        posicion.z > WORLD.corral.minZ
    ) {
        return true;
    }

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

function actualizarJugador(delta) {

    if (!playerSprite) {
        return;
    }

    let x = 0;
    let z = 0;

    if (
        teclas["w"] ||
        teclas["ArrowUp"] ||
        movimientoTouch.arriba
    ) {
        z -= 1;
    }

    if (
        teclas["s"] ||
        teclas["ArrowDown"] ||
        movimientoTouch.abajo
    ) {
        z += 1;
    }

    if (
        teclas["a"] ||
        teclas["ArrowLeft"] ||
        movimientoTouch.izquierda
    ) {
        x -= 1;
    }

    if (
        teclas["d"] ||
        teclas["ArrowRight"] ||
        movimientoTouch.derecha
    ) {
        x += 1;
    }

    if (x === 0 && z === 0) {

        actualizarAnimacionJugador(
            delta,
            null
        );

        return;
    }

    const longitud =
        Math.hypot(x, z);

    x /= longitud;
    z /= longitud;

    const velocidad =
        WORLD.playerSpeed * delta;

    const nuevaPosicion =
        playerPosition.clone();

    nuevaPosicion.x +=
        x * velocidad;

    nuevaPosicion.z +=
        z * velocidad;

    nuevaPosicion.y =
        obtenerAlturaTerreno(
            nuevaPosicion.x,
            nuevaPosicion.z
        ) +
        WORLD.playerHeight / 2;

    if (
        !estaDentroDeLimites(
            nuevaPosicion
        )
    ) {
        return;
    }

    if (
        colisionaConEstructura(
            nuevaPosicion
        )
    ) {
        return;
    }

    playerPosition.copy(
        nuevaPosicion
    );

    playerSprite.position.copy(
        playerPosition
    );

    if (Math.abs(z) > Math.abs(x)) {

        playerDirection =
            z > 0 ? 0 : 1;

    } else {

        playerDirection =
            x < 0 ? 2 : 3;
    }

    actualizarAnimacionJugador(
        delta,
        playerDirection
    );
}

// =====================================================
// 📷 CÁMARA
// =====================================================

function actualizarCamara() {

    if (
        !camera ||
        !playerSprite
    ) {
        return;
    }

    const objetivo =
        playerSprite.position.clone();

    objetivo.y += 8;

    camera.position.lerp(
        new THREE.Vector3(
            playerSprite.position.x,
            playerSprite.position.y + 12,
            playerSprite.position.z + 14
        ),
        0.08
    );

    camera.lookAt(
        objetivo
    );
        }
// =====================================================
// ⌨️ TECLADO
// =====================================================

function configurarTeclado() {

    window.addEventListener(
        "keydown",
        evento => {

            teclas[evento.key] =
                true;
        }
    );

    window.addEventListener(
        "keyup",
        evento => {

            teclas[evento.key] =
                false;
        }
    );
}

// =====================================================
// 📱 CONTROLES MÓVILES
// =====================================================

function crearControlesMoviles() {

    let controles =
        document.getElementById(
            "controlesMoviles"
        );

    if (controles) {
        return;
    }

    controles =
        document.createElement(
            "div"
        );

    controles.id =
        "controlesMoviles";

    controles.innerHTML = `

        <button id="moveUp">▲</button>

        <div>
            <button id="moveLeft">◀</button>
            <button id="moveDown">▼</button>
            <button id="moveRight">▶</button>
        </div>
    `;

    game.appendChild(
        controles
    );

    const botones = {

        moveUp: "arriba",
        moveDown: "abajo",
        moveLeft: "izquierda",
        moveRight: "derecha"

    };

    Object.entries(
        botones
    ).forEach(
        ([id, direccion]) => {

            const boton =
                document.getElementById(
                    id
                );

            if (!boton) {
                return;
            }

            const activar =
                evento => {

                    evento.preventDefault();

                    movimientoTouch[
                        direccion
                    ] = true;
                };

            const desactivar =
                evento => {

                    evento.preventDefault();

                    movimientoTouch[
                        direccion
                    ] = false;
                };

            boton.addEventListener(
                "touchstart",
                activar,
                { passive: false }
            );

            boton.addEventListener(
                "touchend",
                desactivar,
                { passive: false }
            );

            boton.addEventListener(
                "touchcancel",
                desactivar,
                { passive: false }
            );

            boton.addEventListener(
                "mousedown",
                activar
            );

            boton.addEventListener(
                "mouseup",
                desactivar
            );

            boton.addEventListener(
                "mouseleave",
                desactivar
            );
        }
    );
        }
// =====================================================
// 🖥️ HUD
// =====================================================

function crearHUD() {

    let hud =
        document.getElementById(
            "hudGranja"
        );

    if (hud) {
        return;
    }

    hud =
        document.createElement(
            "div"
        );

    hud.id =
        "hudGranja";

    hud.innerHTML = `

        <div class="hud-titulo">
            🌾 GRANJA
        </div>

        <button id="abrirGallinero">
            🐔 Gallinero
        </button>
    `;

    game.appendChild(
        hud
    );

    document
        .getElementById(
            "abrirGallinero"
        )
        .addEventListener(
            "click",
            mostrarGallinero
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
// 🌳 REFERENCIA VISUAL
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
// 🌾 INICIAR GRANJA 3D
// =====================================================

function iniciarZonaGranja() {

    const mundo =
        document.getElementById(
            "mundo3D"
        );

    if (!mundo) {
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

    if (scene3D) {
        return;
    }

    scene3D =
        new THREE.Scene();

    scene3D.background =
        new THREE.Color(
            0x87ceeb
        );

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

    crearTerreno();
    crearReferenciaVisualGranja();
    crearIluminacion();
    crearPlayer();
    crearHUD();
    crearControlesMoviles();

    reloj.start();

    animarMundo();
}
// =====================================================
// 🎞️ ANIMACIÓN DEL MUNDO
// =====================================================

function animarMundo() {

    animationFrame =
        requestAnimationFrame(
            animarMundo
        );

    const delta =
        Math.min(
            reloj.getDelta(),
            0.05
        );

    actualizarJugador(
        delta
    );

    actualizarCamara();

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
// 📐 RESIZE
// =====================================================

function configurarResize() {

    window.addEventListener(
        "resize",
        () => {

            if (
                !camera ||
                !renderer
            ) {
                return;
            }

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }
    );
}

// =====================================================
// ▶️ PLAY
// =====================================================

function configurarPlay() {

    const playButton =
        document.getElementById(
            "playButton"
        );

    if (!playButton) {
        return;
    }

    playButton.addEventListener(
        "click",
        iniciarJuego
    );
}

// =====================================================
// 🎬 SECUENCIA PRINCIPAL
// =====================================================

function iniciarJuego() {

    if (secuenciaIniciada) {
        return;
    }

    secuenciaIniciada = true;

    let indice = 0;

    mostrarEscena(
        indice
    );

    const intervalo =
        setInterval(
            () => {

                indice++;

                if (
                    indice <
                    escenas.length
                ) {

                    mostrarEscena(
                        indice
                    );

                    return;
                }

                clearInterval(
                    intervalo
                );

                setTimeout(
                    () => {

                        revelarHuevo();

                        setTimeout(
                            () => {

                                secuenciaIniciada =
                                    false;

                                mostrarSeleccionPersonaje();

                            },
                            3000
                        );

                    },
                    1500
                );
            },
            3000
        );
}

// =====================================================
// 🚀 INICIALIZAR
// =====================================================

function inicializarJuego() {

    configurarPlay();

    configurarTeclado();

    configurarResize();

    cargarPersonajeGuardado();
}

inicializarJuego();
