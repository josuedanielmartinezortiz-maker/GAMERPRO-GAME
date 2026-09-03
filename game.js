const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

playButton.addEventListener("click", () => {
    game.innerHTML = `
        <div class="scene">
            <h2>🌅 AMANECER</h2>
            <p>Pío pío...</p>
        </div>
    `;
});
