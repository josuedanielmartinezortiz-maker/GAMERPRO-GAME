const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

playButton.addEventListener("click", () => {
    game.innerHTML = `
        <div class="scene">
            <img src="./amanecer.jpg" alt="Amanecer">
            <div class="dialogo">Pío pío...</div>
        </div>
    `;
});
