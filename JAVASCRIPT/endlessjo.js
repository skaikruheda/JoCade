const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
let endlessJoContainer = document.querySelector('.endlessjo-container');

function gameMenu() {
    endlessJoContainer.style.backgroundColor = 'rgb(241, 247, 181)';
    endlessJoContainer.innerHTML = `
        <h1>Endless Jo</h1>
        <button id="start-btn">Start</button>
        <button id="marketplace-btn">Marketplace</button>
        <button id="customization-btn">Customization</button>
    `;
    document.querySelector('#game-score').textContent = '';
}

function startGame() {
    endlessJoContainer.focus();
    endlessJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
    `;

    document.querySelector('#game-score').style.visibility = 'visible';
}

function shopMenu() {
    endlessJoContainer.style.backgroundColor = 'rgb(253, 138, 138)';
    endlessJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <h1 id="menu-title">Shop</h1>
        <div id="pricing-info">Red - 250, Blue - 500, Green - 750, Yellow - 1000</div>
        <div id="pricing-error">(0_0)</div>
        <h2 class="flappy-shop">Character</h2>
        <div class="game-options">
            <div class="game-btn red-character">Red</div>
            <div class="game-btn blue-character">Blue</div>
            <div class="game-btn green-character">Green</div>
            <div class="game-btn yellow-character">Yellow</div>
        </div>
        <h2 class="flappy-shop">Obstacle</h2>
        <div class="game-options">
            <div class="game-btn red-obstacle">Red</div>
            <div class="game-btn blue-obstacle">Blue</div>
            <div class="game-btn green-obstacle">Green</div>
            <div class="game-btn yellow-obstacle">Yellow</div>
        </div>
        <h2 class="flappy-shop">Background</h2>
        <div class="game-options">
            <div class="game-btn red-background">Red</div>
            <div class="game-btn blue-background">Blue</div>
            <div class="game-btn green-background">Green</div>
            <div class="game-btn yellow-background">Yellow</div>
        </div>
    `;
}

function customizationMenu() {
    endlessJoContainer.style.backgroundColor = 'rgb(158, 161, 212)';
    endlessJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <h1 id="menu-title">Customization</h1>
        <h2 class="flappy-shop">Character</h2>
        <div class="game-options">
            <div class="game-btn red-character">Red</div>
            <div class="game-btn blue-character">Blue</div>
            <div class="game-btn green-character">Green</div>
            <div class="game-btn yellow-character">Yellow</div>
        </div>
        <h2 class="flappy-shop">Obstacle</h2>
        <div class="game-options">
            <div class="game-btn red-obstacle">Red</div>
            <div class="game-btn blue-obstacle">Blue</div>
            <div class="game-btn green-obstacle">Green</div>
            <div class="game-btn yellow-obstacle">Yellow</div>
        </div>
        <h2 class="flappy-shop">Background</h2>
        <div class="game-options">
            <div class="game-btn red-background">Red</div>
            <div class="game-btn blue-background">Blue</div>
            <div class="game-btn green-background">Green</div>
            <div class="game-btn yellow-background">Yellow</div>
        </div>
        <div class="selection-types">
            <div id="player-selection">Player</div>
            <div id="obstacle-selection">Obstacle</div>
            <div id="background-selection">Background</div>
        </div>
    `;
}

endlessJoContainer.addEventListener('click', (event) => {
    if (event.target.getAttribute('id') === 'start-btn') {
        startGame();
    }
    else if (event.target.getAttribute('id') === 'marketplace-btn') {
        shopMenu();
    }
    else if (event.target.getAttribute('id') === 'customization-btn') {
        customizationMenu();
    }
    else if (event.target.getAttribute('id') === 'return-btn') {
        gameMenu();
    }
});