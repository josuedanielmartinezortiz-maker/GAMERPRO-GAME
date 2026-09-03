const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

playButton.addEventListener("click", function () {
    game.innerHTML = `
        <div class="scene">
            <img src="./amanecer.jpg" alt="Amanecer en la granja">
            <p class="dialogo">Pío pío...</p>
        </div>
    `;
});
