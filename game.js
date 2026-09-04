import * as THREE from "three";

const game = document.getElementById("game");

// ================================
// ▶️ HITBOX OFICIAL DEL PLAY
// ================================

const BIENVENIDO_PLAY_HITBOX = {
    id: "play",
    x: 0.284,
    y: 0.515,
    w: 0.267,
    h: 0.194,
    center_x: 0.417,
    center_y: 0.612
};

// ================================
// 👤 JUGADOR
// ================================

let jugadorSeleccionado = null;

let jugador = {
    genero: null,
    imagen: null
};

// ================================
// 🌎 ESTADO DE ZONA
// ================================

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

    [
        "./10.jpg",
        "./10.1.jpg",
        "./10.3.jpg",
        "./11.jpg",
        "./hombre.jpg",
        "./mujer.jpg",
        "./Granja.jpg"
    ].forEach(src => {

        const img = new Image();

        img.src = src;

        img.decoding = "async";

        imagenesPrecargadas[src] = img;
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
// 👤 SELECCIÓN DE PERSONAJE
// ================================

function mostrarSeleccionPersonaje() {

    game.innerHTML = `

        <div id="seleccionPersonaje">

            <div class="selector-panel">

                <h1>ELIGE TU PERSONAJE</h1>

                <p>
                    Selecciona quién quieres usar en tu granja.
                </p>

                <div class="personajes-opciones">

                    <button
                        type="button"
                        class="personaje-opcion"
                        data-genero="hombre">

                        <img
                            src="./hombre.jpg"
                            alt="Personaje hombre"
                        >

                        <strong>🧑 HOMBRE</strong>

                        <small>
                            Granjerito
                        </small>

                    </button>

                    <button
                        type="button"
                        class="personaje-opcion"
                        data-genero="mujer">

                        <img
                            src="./mujer.jpg"
                            alt="Personaje mujer"
                        >

                        <strong>👩 MUJER</strong>

                        <small>
                            Granjerita
                        </small>

                    </button>

                </div>

            </div>

        </div>
    `;

    const opciones =
        document.querySelectorAll(
            ".personaje-opcion"
        );

    opciones.forEach(opcion => {

        opcion.addEventListener(
            "click",
            () => {

                const genero =
                    opcion.dataset.genero;

                seleccionarPersonaje(genero);
            }
        );
    });
}

// ================================
// 👤 SELECCIONAR PERSONAJE
// ================================

function seleccionarPersonaje(genero) {

    if (genero === "hombre") {

        jugador.genero = "hombre";
        jugador.imagen = "./hombre.jpg";

    } else {

        jugador.genero = "mujer";
        jugador.imagen = "./mujer.jpg";
    }

    jugadorSeleccionado = jugador;

    localStorage.setItem(
        "gamerpro_personaje",
        JSON.stringify(jugador)
    );

    iniciarZonaGranja();
}

// ================================
// 💾 CARGAR PERSONAJE
// ================================

function cargarPersonajeGuardado() {

    const datos =
        localStorage.getItem(
            "gamerpro_personaje"
        );

    if (!datos) return;

    try {

        const personaje =
            JSON.parse(datos);

        if (
            personaje &&
            (
                personaje.genero === "hombre" ||
                personaje.genero === "mujer"
            )
        ) {

            jugador = personaje;

            jugadorSeleccionado =
                personaje;

        }

    } catch (error) {

        console.warn(
            "No se pudo cargar el personaje.",
            error
        );
    }
}

cargarPersonajeGuardado();

// ================================
// ▶️ PLAY
// ================================

const playButton =
    document.getElementById(
        "playButton"
    );

playButton.addEventListener(
    "click",
    () => {

        let indice = 0;

        mostrarEscena(indice);

        const intervalo =
            setInterval(() => {

                indice++;

                if (
                    indice < escenas.length
                ) {

                    mostrarEscena(indice);

                } else {

                    clearInterval(
                        intervalo
                    );

                    setTimeout(() => {

                        revelarHuevo();

                        setTimeout(() => {

                            mostrarSeleccionPersonaje();

                        }, 3000);

                    }, 1500);
                }

            }, 3000);
    }
);

// =====================================================
// 🌍 SISTEMA 3D — ZONA GRANJA
// =====================================================

let renderer = null;
let scene3D = null;
let camera = null;

let terrain = null;
let playerSprite = null;

let animationFrame = null;

let reloj = new THREE.Clock();

let teclas = {};

let movimientoTouch = {
    arriba: false,
    abajo: false,
    izquierda: false,
    derecha: false
};

const playerPosition = new THREE.Vector3(
    0,
    0,
    0
);

// ================================
// ⚙️ CONFIGURACIÓN DEL MUNDO
// ================================

const WORLD = {

    width: 80,
    depth: 60,

    terrainHeight: 2,

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

// ================================
// 🧱 COLISIONES INVISIBLES
// ================================

const estructuras = [

    {
        id: "casa",
        min: new THREE.Vector3(
            -30,
            0,
            -24
        ),
        max: new THREE.Vector3(
            -12,
            8,
            -10
        ),
        bloqueada: true
    },

    {
        id: "almacen",
        min: new THREE.Vector3(
            -8,
            0,
            -25
        ),
        max: new THREE.Vector3(
            8,
            7,
            -14
        ),
        bloqueada: true
    },

    {
        id: "shop",
        min: new THREE.Vector3(
            18,
            0,
            -20
        ),
        max: new THREE.Vector3(
            32,
            7,
            -8
        ),
        bloqueada: true
    },

    {
        id: "gallinero",
        min: new THREE.Vector3(
            -13,
            0,
            9
        ),
        max: new THREE.Vector3(
            13,
            7,
            26
        ),
        bloqueada: false
    }
];

// ================================
// 🧱 COLISIÓN DE CAJA
// ================================

function crearBox3(min, max) {

    return new THREE.Box3(
        min.clone(),
        max.clone()
    );
}

// ================================
// ⛰️ ALTURA DEL TERRENO
// ================================

function obtenerAlturaTerreno(x, z) {

    const distanciaX =
        x / (WORLD.width / 2);

    const distanciaZ =
        z / (WORLD.depth / 2);

    const altura =
        Math.sin(distanciaX * Math.PI * 2) *
        0.35 +
        Math.cos(distanciaZ * Math.PI * 2) *
        0.3;

    return altura;
}

// ================================
// 🧱 CAJA DEL JUGADOR
// ================================

function obtenerCajaJugador(
    posicion
) {

    const ancho = 0.7;
    const profundidad = 0.7;
    const altura = WORLD.playerHeight;

    return new THREE.Box3(
        new THREE.Vector3(
            posicion.x - ancho / 2,
            posicion.y,
            posicion.z - profundidad / 2
        ),
        new THREE.Vector3(
            posicion.x + ancho / 2,
            posicion.y + altura,
            posicion.z + profundidad / 2
        )
    );
}

// ================================
// 🚧 COMPROBAR COLISIONES
// ================================

function colisionaConEstructura(
    posicion
) {

    const cajaJugador =
        obtenerCajaJugador(posicion);

    for (
        const estructura
        of estructuras
    ) {

        if (!estructura.bloqueada)
            continue;

        const caja =
            crearBox3(
                estructura.min,
                estructura.max
            );

        if (
            cajaJugador.intersectsBox(caja)
        ) {

            return true;
        }
    }

    return false;
}

// ================================
// 🚧 LÍMITES NATURALES
// ================================

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

// ================================
// 🚪 SALIDA DEL CORRAL
// ================================

function puedeSalirDelCorral(
    posicion
) {

    const dentroCorral = (
        posicion.x >= WORLD.corral.minX &&
        posicion.x <= WORLD.corral.maxX &&
        posicion.z >= WORLD.corral.minZ &&
        posicion.z <= WORLD.corral.maxZ
    );

    if (!dentroCorral) {
        return true;
    }

    const porSalida = (
        posicion.x >=
            WORLD.salidaCorral.minX &&
        posicion.x <=
            WORLD.salidaCorral.maxX &&
        posicion.z <=
            WORLD.salidaCorral.z
    );

    return porSalida;
}

// ================================
// 🧍 CREAR PLAYER SPRITE
// ================================

function crearPlayer() {

    const textura =
        new THREE.TextureLoader()
            .load(jugador.imagen);

    textura.colorSpace =
        THREE.SRGBColorSpace;

    const material =
        new THREE.SpriteMaterial({
            map: textura,
            transparent: true,
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
        ),
        WORLD.spawn.z
    );

    playerSprite.position.copy(
        playerPosition
    );

    playerSprite.position.y += 2.5;

    scene3D.add(
        playerSprite
    );
}

// ================================
// 🌾 CREAR TERRENO
// ================================

function crearTerreno() {

    const segmentosX = 60;
    const segmentosZ = 50;

    const geometry =
        new THREE.PlaneGeometry(
            WORLD.width,
            WORLD.depth,
            segmentosX,
            segmentosZ
        );

    geometry.rotateX(
        -Math.PI / 2
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
            posiciones.getZ(i);

        posiciones.setY(
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
            color: 0x6b8e23,
            roughness: 1
        });

    terrain =
        new THREE.Mesh(
            geometry,
            material
        );

    terrain.receiveShadow = true;

    scene3D.add(
        terrain
    );
}

// ================================
// 🌾 IMAGEN DE LA GRANJA
// ================================

function crearReferenciaVisualGranja() {

    const textura =
        new THREE.TextureLoader()
            .load(
                ZONAS.granja.imagen
            );

    textura.colorSpace =
        THREE.SRGBColorSpace;

    const material =
        new THREE.MeshBasicMaterial({
            map: textura,
            transparent: true,
            depthWrite: false
        });

    const geometry =
        new THREE.PlaneGeometry(
            38,
            22
        );

    const mapa =
        new THREE.Mesh(
            geometry,
            material
        );

    mapa.position.set(
        0,
        9,
        -27
    );

    scene3D.add(
        mapa
    );
}

// ================================
// ☀️ ILUMINACIÓN
// ================================

function crearIluminacion() {

    const ambiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x668855,
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
        15,
        30,
        10
    );

    sol.castShadow = true;

    scene3D.add(
        sol
    );
}

// ================================
// 📷 CÁMARA
// ================================

function actualizarCamara() {

    if (!camera)
        return;

    const objetivo =
        new THREE.Vector3(
            playerPosition.x,
            playerPosition.y + 2,
            playerPosition.z
        );

    camera.position.x +=
        (
            objetivo.x -
            camera.position.x
        ) * 0.08;

    camera.position.z +=
        (
            objetivo.z + 12 -
            camera.position.z
        ) * 0.08;

    camera.position.y +=
        (
            objetivo.y + 16 -
            camera.position.y
        ) * 0.08;

    camera.lookAt(
        objetivo
    );
}

// ================================
// 🚶 DIRECCIÓN
// ================================

function obtenerDireccionMovimiento() {

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

    const direccion =
        new THREE.Vector3(
            x,
            0,
            z
        );

    if (
        direccion.lengthSq() > 0
    ) {

        direccion.normalize();
    }

    return direccion;
}

// ================================
// 🚶 MOVIMIENTO
// ================================

function actualizarJugador(
    delta
) {

    if (!playerSprite)
        return;

    const direccion =
        obtenerDireccionMovimiento();

    if (
        direccion.lengthSq() === 0
    ) {
        return;
    }

    const distancia =
        WORLD.playerSpeed *
        delta;

    const nuevaPosicion =
        playerPosition.clone();

    nuevaPosicion.x +=
        direccion.x *
        distancia;

    nuevaPosicion.z +=
        direccion.z *
        distancia;

    nuevaPosicion.y =
        obtenerAlturaTerreno(
            nuevaPosicion.x,
            nuevaPosicion.z
        );

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

    playerSprite.position.y +=
        2.5;
}

// ================================
// 🎮 TECLADO
// ================================

function configurarTeclado() {

    window.addEventListener(
        "keydown",
        event => {

            teclas[event.key] = true;

            if (
                [
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                    " "
                ].includes(
                    event.key
                )
            ) {
                event.preventDefault();
            }
        }
    );

    window.addEventListener(
        "keyup",
        event => {

            teclas[event.key] = false;
        }
    );
}

configurarTeclado();

// ================================
// 📱 CONTROLES TÁCTILES
// ================================

function configurarControlesMoviles() {

    const controles = [
        [
            "moveUp",
            "arriba"
        ],
        [
            "moveDown",
            "abajo"
        ],
        [
            "moveLeft",
            "izquierda"
        ],
        [
            "moveRight",
            "derecha"
        ]
    ];

    controles.forEach(
        ([id, direccion]) => {

            const boton =
                document.getElementById(id);

            if (!boton)
                return;

            const activar = event => {

                event.preventDefault();

                movimientoTouch[
                    direccion
                ] = true;
            };

            const desactivar = event => {

                event.preventDefault();

                movimientoTouch[
                    direccion
                ] = false;
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
    );
}

// ================================
// 🎮 HUD
// ================================

function crearHUD() {

    const hud =
        document.createElement(
            "div"
        );

    hud.id =
        "hudGranja";

    hud.innerHTML = `
        <strong>🌾 GRANJA</strong>
        <small>
            WASD / Flechas para moverte
        </small>
    `;

    const mundo =
        document.getElementById(
            "mundo3D"
        );

    if (mundo) {
        mundo.appendChild(hud);
    }
}

// ================================
// 📱 CONTROLES HUD
// ================================

function crearControlesMoviles() {

    const controles =
        document.createElement(
            "div"
        );

    controles.id =
        "controlesMoviles";

    controles.innerHTML = `

        <div class="dpad">

            <button
                id="moveUp"
                type="button">
                ▲
            </button>

            <button
                id="moveLeft"
                type="button">
                ◀
            </button>

            <button
                id="moveDown"
                type="button">
                ▼
            </button>

            <button
                id="moveRight"
                type="button">
                ▶
            </button>

        </div>
    `;

    const mundo =
        document.getElementById(
            "mundo3D"
        );

    if (mundo) {
        mundo.appendChild(
            controles
        );
    }

    configurarControlesMoviles();
}

// ================================
// 🎬 BUCLE PRINCIPAL
// ================================

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

    renderer.render(
        scene3D,
        camera
    );
}

// ================================
// 🌾 INICIAR GRANJA
// ================================

function iniciarZonaGranja() {

    if (
        animationFrame
    ) {
        cancelAnimationFrame(
            animationFrame
        );
    }

    game.innerHTML = `

        <div id="mundo3D"></div>
    `;

    const contenedor =
        document.getElementById(
            "mundo3D"
        );

    // ============================
    // 🌎 ESCENA
    // ============================

    scene3D =
        new THREE.Scene();

    scene3D.background =
        new THREE.Color(
            0x87ceeb
        );

    // ============================
    // 📷 CÁMARA
    // ============================

    camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
            window.innerHeight,
            0.1,
            300
        );

    camera.position.set(
        0,
        18,
        30
    );

    // ============================
    // 🖥️ RENDERER
    // ============================

    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference:
                "high-performance"
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

    renderer.shadowMap.enabled =
        true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

    contenedor.appendChild(
        renderer.domElement
    );

    // ============================
    // 🌾 TERRENO
    // ============================

    crearTerreno();

    // ============================
    // 🖼️ REFERENCIA DE GRANJA
    // ============================

    crearReferenciaVisualGranja();

    // ============================
    // ☀️ LUZ
    // ============================

    crearIluminacion();

    // ============================
    // 🧍 PLAYER
    // ============================

    crearPlayer();

    // ============================
    // 🎮 HUD
    // ============================

    crearHUD();

    crearControlesMoviles();

    // ============================
    // 🔄 RESIZE
    // ============================

    window.addEventListener(
        "resize",
        redimensionarMundo
    );

    reloj.start();

    animarMundo();
}

// ================================
// 📐 REDIMENSIONAR
// ================================

function redimensionarMundo() {

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

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.5
        )
    );
}

// =====================================================
// 🐔 GALLINERO — 20 NIDOS
// =====================================================

const GALLINERO_20_VACIO = [

    {
        id: 1,
        x: 0.193,
        y: 0.156,
        w: 0.071,
        h: 0.128
    },

    {
        id: 2,
        x: 0.289,
        y: 0.147,
        w: 0.071,
        h: 0.128
    },

    {
        id: 3,
        x: 0.371,
        y: 0.147,
        w: 0.071,
        h: 0.128
    },

    {
        id: 4,
        x: 0.457,
        y: 0.147,
        w: 0.071,
        h: 0.128
    },

    {
        id: 5,
        x: 0.542,
        y: 0.147,
        w: 0.071,
        h: 0.128
    },

    {
        id: 6,
        x: 0.625,
        y: 0.147,
        w: 0.071,
        h: 0.128
    },

    {
        id: 7,
        x: 0.737,
        y: 0.156,
        w: 0.071,
        h: 0.128
    },

    {
        id: 8,
        x: 0.193,
        y: 0.310,
        w: 0.071,
        h: 0.128
    },

    {
        id: 9,
        x: 0.193,
        y: 0.464,
        w: 0.071,
        h: 0.128
    },

    {
        id: 10,
        x: 0.193,
        y: 0.618,
        w: 0.071,
        h: 0.128
    },

    {
        id: 11,
        x: 0.737,
        y: 0.310,
        w: 0.071,
        h: 0.128
    },

    {
        id: 12,
        x: 0.737,
        y: 0.464,
        w: 0.071,
        h: 0.128
    },

    {
        id: 13,
        x: 0.737,
        y: 0.618,
        w: 0.071,
        h: 0.128
    },

    {
        id: 14,
        x: 0.193,
        y: 0.735,
        w: 0.071,
        h: 0.128
    },

    {
        id: 15,
        x: 0.276,
        y: 0.742,
        w: 0.071,
        h: 0.128
    },

    {
        id: 16,
        x: 0.362,
        y: 0.742,
        w: 0.071,
        h: 0.128
    },

    {
        id: 17,
        x: 0.448,
        y: 0.742,
        w: 0.071,
        h: 0.128
    },

    {
        id: 18,
        x: 0.546,
        y: 0.742,
        w: 0.071,
        h: 0.128
    },

    {
        id: 19,
        x: 0.632,
        y: 0.742,
        w: 0.071,
        h: 0.128
    },

    {
        id: 20,
        x: 0.737,
        y: 0.735,
        w: 0.071,
        h: 0.128
    }
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

    cargarNidosGuardados();
}

// ================================
// 🪹 CREAR NIDOS
// ================================

function crearNidos() {

    const contenedor =
        document.getElementById(
            "nidos"
        );

    if (!contenedor)
        return;

    GALLINERO_20_VACIO.forEach(
        nido => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type = "button";

            boton.className =
                "nido";

            boton.dataset.id =
                nido.id;

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

                    abrirEditorNido(
                        nido.id
                    );

                }
            );

            contenedor.appendChild(
                boton
            );
        }
    );
}

// ================================
// 🎨 EDITOR NIDO
// ================================

let nidoEditando = null;

let colorTemporal = null;

// ================================
// 🪹 ABRIR EDITOR
// ================================

function abrirEditorNido(id) {

    cerrarEditorNido();

    const nido =
        document.querySelector(
            `.nido[data-id="${id}"]`
        );

    if (!nido)
        return;

    nidoEditando = id;

    colorTemporal =
        nido.dataset.color ||
        "#ffffff";

    const editor =
        document.createElement(
            "div"
        );

    editor.id =
        "editorNido";

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

    document.body.appendChild(
        editor
    );

    actualizarPreviewNido();

    const opcionesColor =
        editor.querySelectorAll(
            ".color-option"
        );

    opcionesColor.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    colorTemporal =
                        boton.dataset.color;

                    actualizarPreviewNido();

                }
            );
        }
    );

    document
        .getElementById(
            "guardarEditor"
        )
        .addEventListener(
            "click",
            () => {

                guardarNido(
                    id,
                    colorTemporal
                );

            }
        );

    document
        .getElementById(
            "cancelarEditor"
        )
        .addEventListener(
            "click",
            () => {

                cerrarEditorNido();

            }
        );

    document
        .getElementById(
            "cerrarEditorX"
        )
        .addEventListener(
            "click",
            () => {

                cerrarEditorNido();

            }
        );

    editor.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                editor
            ) {

                cerrarEditorNido();

            }
        }
    );
}

// ================================
// 👁️ PREVIEW
// ================================

function actualizarPreviewNido() {

    const preview =
        document.getElementById(
            "previewNido"
        );

    if (!preview)
        return;

    preview.style.boxShadow = `
        0 0 15px ${colorTemporal},
        0 0 30px ${colorTemporal}
    `;
}

// ================================
// 💾 GUARDAR NIDO
// ================================

function guardarNido(
    id,
    color
) {

    const nido =
        document.querySelector(
            `.nido[data-id="${id}"]`
        );

    if (!nido)
        return;

    nido.dataset.color =
        color;

    nido.style.boxShadow = `
        0 0 12px ${color},
        0 0 25px ${color}
    `;

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
// 💾 CARGAR NIDOS
// ================================

function cargarNidosGuardados() {

    GALLINERO_20_VACIO.forEach(
        nido => {

            const datos =
                localStorage.getItem(
                    `gamerpro_nido_${nido.id}`
                );

            if (!datos)
                return;

            try {

                const configuracion =
                    JSON.parse(
                        datos
                    );

                const elemento =
                    document.querySelector(
                        `.nido[data-id="${nido.id}"]`
                    );

                if (!elemento)
                    return;

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
