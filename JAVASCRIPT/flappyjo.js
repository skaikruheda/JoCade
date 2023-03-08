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
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="block"></div>
        <div id="hole"></div>
        <div id="character"></div>
    `;
}

function shopMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(253, 138, 138)';
    flappyJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <h1 id="menu-title">Shop</h1>
        <h2 class="flappy-shop">Character</h2>
        <div class="game-options">
            <div class="game-btn">Red</div>
            <div class="game-btn">Blue</div>
            <div class="game-btn">Green</div>
            <div class="game-btn">Yellow</div>
        </div>
        <h2 class="flappy-shop">Obstacle</h2>
        <div class="game-options">
            <div class="game-btn">Red</div>
            <div class="game-btn">Blue</div>
            <div class="game-btn">Green</div>
            <div class="game-btn">Yellow</div>
        </div>
        <h2 class="flappy-shop">Background</h2>
        <div class="game-options">
            <div class="game-btn">Red</div>
            <div class="game-btn">Blue</div>
            <div class="game-btn">Green</div>
            <div class="game-btn">Yellow</div>
        </div>
    `;
}

function settingMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(158, 161, 212)';
    flappyJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <h1 id="menu-title">Setting</h1>
        <h2 class="flappy-shop">Difficulty</h2>
        <div class="game-options">
            <div class="game-btn">Easy</div>
            <div class="game-btn">Medium</div>
            <div class="game-btn">Hard</div>
        </div>
        <h2 class="flappy-shop">Sound</h2>
        <div class="game-options">
            <div class="game-btn">On</div>
            <div class="game-btn">Off</div>
        </div>
        <h2 class="flappy-shop">Score Position</h2>
        <div class="game-options">
            <div class="game-btn">Left</div>
            <div class="game-btn">Middle</div>
            <div class="game-btn">Right</div>
        </div>
    `;
    document.querySelector('#return-btn').addEventListener('click', () => {
        gameMenu();
    });
}

window.addEventListener('click', (event) => {
    if (event.target.getAttribute('id') === 'start-btn') {
        startGame();
    }
    else if (event.target.getAttribute('id') === 'marketplace-btn') {
        shopMenu();
    }
    else if (event.target.getAttribute('id') === 'setting-btn') {
        settingMenu();
    }
    else if (event.target.getAttribute('id') === 'return-btn') {
        gameMenu();
    }
});

startGame();