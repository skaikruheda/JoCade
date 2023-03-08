const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
let flappyJoContainer = document.querySelector('.flappy-jo-container');
let startButton;

function gameMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(241, 247, 181)';
    flappyJoContainer.innerHTML = `
        <h1>Flappy Jo</h1>
        <button id="start-btn">Start</button>
        <button id="marketplace-btn">Marketplace</button>
        <button id="setting-btn">Settings</button>
    `;
}

function startGame() {
    flappyJoContainer.innerHTML = `
        <div id="block"></div>
        <div id="hole"></div>
        <div id="character"></div>
    `;
}

function shopeMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(253, 138, 138)';
    flappyJoContainer.innerHTML = `
        <h1 id="shop-title">Shop</h1>
        <h2 class="flappy-shop">Character</h2>
        <div class="character-options">
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
        </div>
        <h2 class="flappy-shop">Obstacle</h2>
        <div class="obstacle-options">
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
        </div>
        <h2 class="flappy-shop">Background</h2>
        <div class="background-options">
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
            <div class="character-btn">Red</div>
        </div>
    `;
}

shopeMenu();