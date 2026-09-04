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
    imagen: null,
    spritesheet: null
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

        imagenesPrecargadas[
            escena.imagen
        ] = img;
    });

    [

        "./10.jpg",
        "./10.1.jpg",
        "./10.3.jpg",
        "./11.jpg",

        "./hombre.jpg",
        "./mujer.jpg",

        "./Granja.jpg",

        "./mono_N_boy_spritesheet.png",
        "./mono_N_girl_spritesheet.png"

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

    if (!escena)
        return;

    game.innerHTML = `

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
}

// ================================
// 🥚 RESULTADO DEL HUEVO
// ================================

function revelarHuevo() {

    const numero =
        Math.random() * 100;

    let resultado;

    if (numero < 98) {

        resultado = "./10.jpg";

    } else if (numero < 99) {

        resultado = "./10.1.jpg";

    } else {

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

                <h1>
                    ELIGE TU PERSONAJE
                </h1>

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

                        <strong>
                            🧑 HOMBRE
                        </strong>

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

                        <strong>
                            👩 MUJER
                        </strong>

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

                seleccionarPersonaje(
                    genero
                );
            }
        );
    });
}

// ================================
// 👤 SELECCIONAR PERSONAJE
// ================================

function seleccionarPersonaje(
    genero
) {

    if (genero === "hombre") {

        jugador.genero =
            "hombre";

        jugador.imagen =
            "./hombre.jpg";

        jugador.spritesheet =
            "./mono_N_boy_spritesheet.png";

    } else {

        jugador.genero =
            "mujer";

        jugador.imagen =
            "./mujer.jpg";

        jugador.spritesheet =
            "./mono_N_girl_spritesheet.png";
    }

    jugadorSeleccionado =
        jugador;

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

    if (!datos)
        return;

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

            jugador =
                personaje;

            if (
                personaje.genero ===
                "hombre"
            ) {

                jugador.spritesheet =
                    "./mono_N_boy_spritesheet.png";

            } else {

                jugador.spritesheet =
                    "./mono_N_girl_spritesheet.png";
            }

            jugadorSeleccionado =
                jugador;
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

        mostrarEscena(
            indice
        );

        const intervalo =
            setInterval(() => {

                indice++;

                if (
                    indice <
                    escenas.length
                ) {

                    mostrarEscena(
                        indice
                    );

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

const reloj =
    new THREE.Clock();

let teclas = {};

let movimientoTouch = {

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
// 🎞️ ANIMACIÓN DEL SPRITESHEET
// =====================================================

let playerTexture = null;

let playerFrame = 0;

let playerDirection = 0;

let playerAnimationTimer = 0;

const SPRITESHEET = {

    columnas: 4,
    filas: 4,

    // Fila 0 = frente
    // Fila 1 = espalda
    // Fila 2 = izquierda
    // Fila 3 = derecha

    velocidad: 9
};

// ================================
// 🎞️ CAMBIAR FRAME
// ================================

function actualizarFrameSprite() {

    if (!playerTexture)
        return;

    const columnas =
        SPRITESHEET.columnas;

    const filas =
        SPRITESHEET.filas;

    playerTexture.repeat.set(
        1 / columnas,
        1 / filas
    );

    playerTexture.offset.x =
        playerFrame / columnas;

    playerTexture.offset.y =
        1 -
        (
            playerDirection + 1
        ) / filas;

    playerTexture.needsUpdate =
        true;
}

// ================================
// 🎞️ CAMBIAR DIRECCIÓN
// ================================

function establecerDireccion(
    direccion
) {

    if (
        playerDirection ===
        direccion
    ) {
        return;
    }

    playerDirection =
        direccion;

    playerFrame = 0;

    playerAnimationTimer = 0;

    actualizarFrameSprite();
}

// ================================
// 🎞️ ANIMAR CAMINATA
// ================================

function actualizarAnimacionJugador(
    delta,
    estaMoviendose
) {

    if (!playerTexture)
        return;

    if (!estaMoviendose) {

        playerFrame = 0;

        playerAnimationTimer = 0;

        actualizarFrameSprite();

        return;
    }

    playerAnimationTimer +=
        delta;

    const intervalo =
        1 /
        SPRITESHEET.velocidad;

    if (
        playerAnimationTimer >=
        intervalo
    ) {

        playerAnimationTimer = 0;

        playerFrame =
            (
                playerFrame + 1
            ) % SPRITESHEET.columnas;

        actualizarFrameSprite();
    }
}

// =====================================================
// ⚙️ CONFIGURACIÓN DEL MUNDO
// =====================================================

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

// =====================================================
// 🧱 COLISIONES INVISIBLES
// =====================================================

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
// 🧱 BOX3
// ================================

function crearBox3(
    min,
    max
) {

    return new THREE.Box3(
        min.clone(),
        max.clone()
    );
}

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

    const altura =
        Math.sin(
            distanciaX *
            Math.PI *
            2
        ) *
        0.35 +

        Math.cos(
            distanciaZ *
            Math.PI *
            2
        ) *
        0.3;

    return altura;
}

// =====================================================
// 🧱 CAJA DEL JUGADOR
// =====================================================

function obtenerCajaJugador(
    posicion
) {

    const ancho = 0.7;
    const profundidad = 0.7;
    const altura =
        WORLD.playerHeight;

    return new THREE.Box3(

        new THREE.Vector3(
            posicion.x -
                ancho / 2,

            posicion.y,

            posicion.z -
                profundidad / 2
        ),

        new THREE.Vector3(
            posicion.x +
                ancho / 2,

            posicion.y +
                altura,

            posicion.z +
                profundidad / 2
        )
    );
}

// =====================================================
// 🚧 COLISIONES
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
        of estructuras
    ) {

        if (
            !estructura.bloqueada
        ) {
            continue;
        }

        const caja =
            crearBox3(
                estructura.min,
                estructura.max
            );

        if (
            cajaJugador.intersectsBox(
                caja
            )
        ) {

            return true;
        }
    }

    return false;
}

// =====================================================
// 🚧 LÍMITES
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
// 🚪 SALIDA DEL CORRAL
// =====================================================

function puedeSalirDelCorral(
    posicion
) {

    const dentroCorral = (

        posicion.x >=
            WORLD.corral.minX &&

        posicion.x <=
            WORLD.corral.maxX &&

        posicion.z >=
            WORLD.corral.minZ &&

        posicion.z <=
            WORLD.corral.maxZ
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

// =====================================================
// 🧍 CREAR PLAYER CON SPRITESHEET
// =====================================================

function crearPlayer() {

    const loader =
        new THREE.TextureLoader();

    const ruta =
        jugador.spritesheet ||
        (
            jugador.genero === "mujer"
                ? "./mono_N_girl_spritesheet.png"
                : "./mono_N_boy_spritesheet.png"
        );

    playerTexture =
        loader.load(
            ruta
        );

    playerTexture.colorSpace =
        THREE.SRGBColorSpace;

    // ============================
    // 🎞️ 4×4
    // ============================

    playerTexture.repeat.set(
        1 / SPRITESHEET.columnas,
        1 / SPRITESHEET.filas
    );

    playerTexture.offset.set(
        0,
        1 -
            (
                playerDirection + 1
            ) /
            SPRITESHEET.filas
    );

    // Evita mezclar bordes entre frames
    playerTexture.magFilter =
        THREE.NearestFilter;

    playerTexture.minFilter =
        THREE.NearestFilter;

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

    playerSprite.position.y +=
        2.5;

    scene3D.add(
        playerSprite
    );

    actualizarFrameSprite();
}

// =====================================================
// 🌾 TERRENO
// =====================================================

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

    terrain.receiveShadow =
        true;

    scene3D.add(
        terrain
    );
}

// =====================================================
// 🌾 REFERENCIA VISUAL
// =====================================================

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

    mapa.rotation.x =
        -Math.PI / 2;

    mapa.position.set(
        0,
        0.08,
        -27
    );

    scene3D.add(mapa);
        }
// =====================================================
// 💡 ILUMINACIÓN
// =====================================================

function crearIluminacion() {

    const luzAmbiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x557755,
            1.8
        );

    scene3D.add(luzAmbiente);

    const luzSol =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    luzSol.position.set(
        20,
        35,
        15
    );

    scene3D.add(luzSol);
}


// =====================================================
// 🐔 SPRITES DEL JUGADOR
// =====================================================

const PLAYER_SPRITESHEETS = {

    hombre:
        "./mono_N_boy_spritesheet.png",

    mujer:
        "./mono_N_girl_spritesheet.png"
};

let playerTexture = null;

let playerFrame = 0;

let playerDirection = 0;

let playerAnimationTimer = 0;

const PLAYER_ANIMATION_FPS = 10;


// =====================================================
// 🎞️ ACTUALIZAR FRAME
// =====================================================

function actualizarFramePlayer() {

    if (!playerTexture) {
        return;
    }

    playerTexture.repeat.set(
        0.25,
        0.25
    );

    playerTexture.offset.set(

        playerFrame * 0.25,

        1 -
        (playerDirection + 1) * 0.25
    );
}


// =====================================================
// 🎞️ ANIMACIÓN DEL JUGADOR
// =====================================================

function actualizarAnimacionJugador(
    delta,
    direccion
) {

    const moviendo =
        direccion.lengthSq() > 0;

    if (!moviendo) {

        playerFrame = 0;

        playerAnimationTimer = 0;

        actualizarFramePlayer();

        return;
    }


    // -----------------------------------------
    // DIRECCIONES
    // -----------------------------------------

    if (direccion.z > 0) {

        // Frente
        playerDirection = 0;

    } else if (direccion.z < 0) {

        // Espalda
        playerDirection = 1;

    } else if (direccion.x < 0) {

        // Izquierda
        playerDirection = 2;

    } else if (direccion.x > 0) {

        // Derecha
        playerDirection = 3;
    }


    // -----------------------------------------
    // CAMBIO DE FRAME
    // -----------------------------------------

    playerAnimationTimer += delta;

    const intervalo =
        1 / PLAYER_ANIMATION_FPS;


    if (
        playerAnimationTimer >=
        intervalo
    ) {

        playerAnimationTimer = 0;

        playerFrame =
            (playerFrame + 1) % 4;
    }


    actualizarFramePlayer();
}


// =====================================================
// 🧍 CREAR JUGADOR
// =====================================================

function crearPlayer() {

    if (!jugador.genero) {

        console.warn(
            "No hay género seleccionado."
        );

        return;
    }


    const rutaSprite =
        PLAYER_SPRITESHEETS[
            jugador.genero
        ];


    if (!rutaSprite) {

        console.error(
            "No existe spritesheet para:",
            jugador.genero
        );

        return;
    }


    playerTexture =
        new THREE.TextureLoader()
            .load(rutaSprite);


    playerTexture.colorSpace =
        THREE.SRGBColorSpace;


    playerTexture.wrapS =
        THREE.ClampToEdgeWrapping;

    playerTexture.wrapT =
        THREE.ClampToEdgeWrapping;


    // 4 columnas × 4 filas
    playerTexture.repeat.set(
        0.25,
        0.25
    );


    // Primera animación:
    // frente / frame 0

    playerDirection = 0;

    playerFrame = 0;

    playerTexture.offset.set(
        0,
        0.75
    );


    const material =
        new THREE.SpriteMaterial({

            map: playerTexture,

            transparent: true,

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


    playerPosition.set(
        WORLD.spawn.x,
        0,
        WORLD.spawn.z
    );


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


    scene3D.add(
        playerSprite
    );
}


// =====================================================
// 🌎 TERRENO 3D
// =====================================================

function crearTerreno() {

    const geometry =
        new THREE.PlaneGeometry(
            WORLD.width,
            WORLD.depth,
            40,
            30
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


        const y =
            obtenerAlturaTerreno(
                x,
                z
            );


        posiciones.setY(
            i,
            y
        );
    }


    posiciones.needsUpdate = true;

    geometry.computeVertexNormals();


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x6fa35c,

            roughness: 1,

            metalness: 0
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


// =====================================================
// 🌾 REFERENCIA VISUAL
// =====================================================

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

    mapa.rotation.x =
        -Math.PI / 2;

    mapa.position.set(
        0,
        0.08,
        -27
    );

    scene3D.add(
        mapa
    );
}


// =====================================================
// 🚪 SALIDA DEL CORRAL
// =====================================================

function puedeSalirDelCorral(
    posicion
) {

    const dentroCorral =

        posicion.x >=
            WORLD.corral.minX &&

        posicion.x <=
            WORLD.corral.maxX &&

        posicion.z >=
            WORLD.corral.minZ &&

        posicion.z <=
            WORLD.corral.maxZ;


    if (!dentroCorral) {

        return true;
    }


    // Única salida:
    // parte central inferior

    const estaEnSalida =

        posicion.x >=
            WORLD.salidaCorral.minX &&

        posicion.x <=
            WORLD.salidaCorral.maxX &&

        posicion.z <=
            WORLD.salidaCorral.z;


    return estaEnSalida;
}


// =====================================================
// 📦 CAJA DEL JUGADOR
// =====================================================

function obtenerCajaJugador(
    posicion
) {

    const ancho = 1.1;

    const profundidad = 1.1;


    return new THREE.Box3(

        new THREE.Vector3(

            posicion.x -
            ancho / 2,

            posicion.y,

            posicion.z -
            profundidad / 2
        ),

        new THREE.Vector3(

            posicion.x +
            ancho / 2,

            posicion.y +
            WORLD.playerHeight,

            posicion.z +
            profundidad / 2
        )
    );
}


// =====================================================
// 🏠 COLISIONES
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
            estructura.bloqueada &&
            estructura.caja
        ) {

            if (
                cajaJugador.intersectsBox(
                    estructura.caja
                )
            ) {

                return true;
            }
        }
    }


    return false;
}


// =====================================================
// 🧭 LÍMITES DEL MUNDO
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
// 🎮 DIRECCIÓN DE MOVIMIENTO
// =====================================================

function obtenerDireccionMovimiento() {

    const direccion =
        new THREE.Vector3();


    if (
        teclas["w"] ||
        teclas["arrowup"] ||
        movimientoTouch.arriba
    ) {

        direccion.z += 1;
    }


    if (
        teclas["s"] ||
        teclas["arrowdown"] ||
        movimientoTouch.abajo
    ) {

        direccion.z -= 1;
    }


    if (
        teclas["a"] ||
        teclas["arrowleft"] ||
        movimientoTouch.izquierda
    ) {

        direccion.x -= 1;
    }


    if (
        teclas["d"] ||
        teclas["arrowright"] ||
        movimientoTouch.derecha
    ) {

        direccion.x += 1;
    }


    if (
        direccion.lengthSq() > 0
    ) {

        direccion.normalize();
    }


    return direccion;
}


// =====================================================
// 🏃 ACTUALIZAR JUGADOR
// =====================================================

function actualizarJugador(
    delta
) {

    if (!playerSprite) {
        return;
    }


    const direccion =
        obtenerDireccionMovimiento();


    actualizarAnimacionJugador(
        delta,
        direccion
    );


    if (
        direccion.lengthSq() === 0
    ) {

        return;
    }


    const nuevaPosicion =
        playerPosition.clone();


    nuevaPosicion.x +=
        direccion.x *
        WORLD.playerSpeed *
        delta;


    nuevaPosicion.z +=
        direccion.z *
        WORLD.playerSpeed *
        delta;


    // -----------------------------------------
    // LÍMITES
    // -----------------------------------------

    if (
        !estaDentroDeLimites(
            nuevaPosicion
        )
    ) {

        return;
    }


    // -----------------------------------------
    // SALIDA DEL CORRAL
    // -----------------------------------------

    if (
        !puedeSalirDelCorral(
            nuevaPosicion
        )
    ) {

        return;
    }


    // -----------------------------------------
    // ESTRUCTURAS
    // -----------------------------------------

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
}


// =====================================================
// 🎥 CÁMARA
// =====================================================

function actualizarCamara() {

    if (
        !camera ||
        !playerSprite
    ) {

        return;
    }


    const objetivo =
        new THREE.Vector3(

            playerPosition.x,

            playerPosition.y,

            playerPosition.z
        );


    const posicionCamara =
        new THREE.Vector3(

            playerPosition.x,

            playerPosition.y + 25,

            playerPosition.z + 22
        );


    camera.position.lerp(
        posicionCamara,
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
        (event) => {

            const tecla =
                event.key.toLowerCase();

            teclas[tecla] = true;


            if (
                [
                    "w",
                    "a",
                    "s",
                    "d",
                    "arrowup",
                    "arrowdown",
                    "arrowleft",
                    "arrowright"
                ].includes(tecla)
            ) {

                event.preventDefault();
            }
        }
    );


    window.addEventListener(
        "keyup",
        (event) => {

            const tecla =
                event.key.toLowerCase();

            teclas[tecla] = false;
        }
    );
}


// =====================================================
// 📱 CONTROLES MÓVILES
// =====================================================

function crearControlesMoviles() {

    const contenedor =
        document.createElement(
            "div"
        );


    contenedor.id =
        "controlesMoviles";


    contenedor.innerHTML = `

        <button
            id="moveUp"
            type="button"
        >
            ▲
        </button>

        <button
            id="moveLeft"
            type="button"
        >
            ◀
        </button>

        <button
            id="moveRight"
            type="button"
        >
            ▶
        </button>

        <button
            id="moveDown"
            type="button"
        >
            ▼
        </button>

    `;


    document.body.appendChild(
        contenedor
    );


    const botones = {

        moveUp: "arriba",

        moveDown: "abajo",

        moveLeft: "izquierda",

        moveRight: "derecha"
    };


    for (
        const [id, direccion]
        of Object.entries(botones)
    ) {

        const boton =
            document.getElementById(
                id
            );


        const activar = (
            event
        ) => {

            event.preventDefault();

            movimientoTouch[
                direccion
            ] = true;
        };


        const desactivar = (
            event
        ) => {

            event.preventDefault();

            movimientoTouch[
                direccion
            ] = false;
        };


        boton.addEventListener(
            "touchstart",
            activar,
            {
                passive: false
            }
        );


        boton.addEventListener(
            "touchend",
            desactivar,
            {
                passive: false
            }
        );


        boton.addEventListener(
            "touchcancel",
            desactivar,
            {
                passive: false
            }
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
}


// =====================================================
// 🖥️ HUD
// =====================================================

function crearHUD() {

    const hud =
        document.createElement(
            "div"
        );


    hud.id =
        "hudGranja";


    hud.innerHTML = `

        <div class="hud-titulo">
            🌾 GRANJA
        </div>

        <div class="hud-zona">
            🐔 Gallinero
        </div>

    `;


    document.body.appendChild(
        hud
    );
}


// =====================================================
// 🎞️ ANIMACIÓN PRINCIPAL
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


    if (renderer) {

        renderer.render(
            scene3D,
            camera
        );
    }
}


// =====================================================
// 🌎 INICIAR MUNDO
// =====================================================

function iniciarZonaGranja() {

    const contenedor =
        document.getElementById(
            "mundo3D"
        );


    if (!contenedor) {
        return;
    }


    if (animationFrame) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame = null;
    }


    contenedor.innerHTML = "";


    scene3D =
        new THREE.Scene();


    scene3D.background =
        new THREE.Color(
            0x87b8e8
        );


    camera =
        new THREE.PerspectiveCamera(

            55,

            window.innerWidth /
            window.innerHeight,

            0.1,

            200
        );


    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true
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


    contenedor.appendChild(
        renderer.domElement
    );


    crearTerreno();

    crearReferenciaVisualGranja();

    crearIluminacion();

    crearPlayer();

    crearHUD();

    crearControlesMoviles();

    configurarTeclado();


    reloj.start();

    animarMundo();
}


// =====================================================
// 🐔 GALLINERO
// =====================================================

const NIDOS = [

    { id: 1, x: 10, y: 12 },
    { id: 2, x: 30, y: 12 },
    { id: 3, x: 50, y: 12 },
    { id: 4, x: 70, y: 12 },

    { id: 5, x: 10, y: 32 },
    { id: 6, x: 30, y: 32 },
    { id: 7, x: 50, y: 32 },
    { id: 8, x: 70, y: 32 },

    { id: 9, x: 10, y: 52 },
    { id: 10, x: 30, y: 52 },
    { id: 11, x: 50, y: 52 },
    { id: 12, x: 70, y: 52 },

    { id: 13, x: 10, y: 72 },
    { id: 14, x: 30, y: 72 },
    { id: 15, x: 50, y: 72 },
    { id: 16, x: 70, y: 72 },

    { id: 17, x: 10, y: 92 },
    { id: 18, x: 30, y: 92 },
    { id: 19, x: 50, y: 92 },
    { id: 20, x: 70, y: 92 }
];


let nidoSeleccionado =
    null;


// =====================================================
// 🐔 MOSTRAR GALLINERO
// =====================================================

function mostrarGallinero() {

    const gallinero =
        document.getElementById(
            "gallinero"
        );


    if (!gallinero) {
        return;
    }


    gallinero.innerHTML = `

        <div class="gallinero-fondo">

            <img
                src="./11.jpg"
                alt="Gallinero"
            >

            <div id="nidos"></div>

        </div>
    `;


    crearNidos();
}

// =====================================================
// 🥚 CREAR NIDOS
// =====================================================

function crearNidos() {

    const contenedor =
        document.getElementById(
            "nidos"
        );


    if (!contenedor) {
        return;
    }


    NIDOS.forEach(
        (nido) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.className =
                "nido";


            boton.dataset.id =
                nido.id;


            boton.style.left =
                `${nido.x}%`;


            boton.style.top =
                `${nido.y}%`;


            const guardado =
                localStorage.getItem(
                    `gamerpro_nido_${nido.id}`
                );


            if (guardado) {

                boton.style.boxShadow =
                    `0 0 20px ${guardado}`;
            }


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


// =====================================================
// 🎨 EDITOR DE NIDO
// =====================================================

function abrirEditorNido(id) {

    nidoSeleccionado =
        id;


    const editor =
        document.getElementById(
            "editorNido"
        );


    if (!editor) {
        return;
    }


    editor.classList.add(
        "activo"
    );
}


// =====================================================
// 🎨 CAMBIAR COLOR DEL NIDO
// =====================================================

function cambiarColorNido(color) {

    if (!nidoSeleccionado) {
        return;
    }


    const boton =
        document.querySelector(
            `.nido[data-id="${nidoSeleccionado}"]`
        );


    if (!boton) {
        return;
    }


    boton.style.boxShadow =
        `0 0 20px ${color}`;


    localStorage.setItem(
        `gamerpro_nido_${nidoSeleccionado}`,
        color
    );
}


// =====================================================
// ❌ CERRAR EDITOR
// =====================================================

function cerrarEditorNido() {

    const editor =
        document.getElementById(
            "editorNido"
        );


    if (!editor) {
        return;
    }


    editor.classList.remove(
        "activo"
    );


    nidoSeleccionado =
        null;
}


// =====================================================
// 🚀 INICIALIZACIÓN
// =====================================================

function inicializarJuego() {

    // -----------------------------------------
    // BOTÓN PLAY
    // -----------------------------------------

    const playButton =
        document.getElementById(
            "playButton"
        );


    if (playButton) {

        playButton.addEventListener(
            "click",
            iniciarJuego
        );
    }


    // -----------------------------------------
    // PERSONAJE GUARDADO
    // -----------------------------------------

    cargarPersonajeGuardado();


    // -----------------------------------------
    // GALLINERO
    // -----------------------------------------

    const botonGallinero =
        document.getElementById(
            "botonGallinero"
        );


    if (botonGallinero) {

        botonGallinero.addEventListener(
            "click",
            mostrarGallinero
        );
    }
}


// =====================================================
// 🎮 INICIAR
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    inicializarJuego
);
