const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

playButton.addEventListener("click", function () {
    game.innerHTML = `
        <div class="scene">
            <img src="./IMG-20260903-WA2716.jpg" alt="Amanecer en la granja">
            <p class="dialogo">Pío pío...</p>
        </div>
    `;
});
