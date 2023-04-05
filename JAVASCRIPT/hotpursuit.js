const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
let gameBox = document.querySelector('.game-box');

function gameMenu() {
    gameBox.style.backgroundColor = 'rgb(241, 247, 181)';
    gameBox.innerHTML = `
        <h1>Hot Pursuit</h1>
        <button id="start-btn">Start</button>
        <button id="marketplace-btn">Marketplace</button>
        <button id="customization-btn">Customization</button>
    `;
    document.querySelector('#game-score').textContent = '';
}

function startGame() {
    gameBox.focus();
    gameBox.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="hot-pursuit-game">
            <div id="hot-pursuit-obstacle"></div>
            <div id="hot-pursuit-character"></div>
        </div>
    `;
    document.querySelector('#game-score').style.visibility = 'visible';

    let gameScore = 0;
    let hotPursitGame = document.querySelector('#hot-pursuit-game');
    let hotPursitObstacle = document.querySelector('#hot-pursuit-obstacle');
    let hotPursitCharacter = document.querySelector('#hot-pursuit-character');

    function goLeft() {
        let characterPosition = parseInt(window.getComputedStyle(hotPursitCharacter).getPropertyValue('left'));
        characterPosition -= 100;
        if (characterPosition >= 0) {
            hotPursitCharacter.style.left = characterPosition + 'px';
        }
    }

    function goRight() {
        let characterPosition = parseInt(window.getComputedStyle(hotPursitCharacter).getPropertyValue('left'));
        characterPosition += 100;
        if (characterPosition < 300) {
            hotPursitCharacter.style.left = characterPosition + 'px';
        }
    }

    hotPursitObstacle.addEventListener('animationiteration', function() {
        gameScore += 1;
        let random = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        this.style.left = (random * 100) + 'px';
        document.querySelector('#game-score').textContent = 'Score: ' + (gameScore * 5);
    });

    setInterval(() => {
        let characterLeft = parseInt(window.getComputedStyle(hotPursitCharacter).getPropertyValue('left'));
        let obstacleLeft = parseInt(window.getComputedStyle(hotPursitObstacle).getPropertyValue('left'));
        let obstacleTop = parseInt(window.getComputedStyle(hotPursitObstacle).getPropertyValue('top'));
        if (characterLeft === obstacleLeft && obstacleTop < 500 && obstacleTop > 300) {
            endGame();
            hotPursitObstacle.style.animation = 'none';
        }
    }, 1);

    function gameOver() {
        gameBox.innerHTML = `
            <h1>Game Over</h1>
            <h2 id="earned-points"></h2>
            <button onclick="startGame()">Try Again</button>
            <button onclick="gameMenu()">Home</button>
        `;
        let pointsToJoCoins = gameScore * 5;
        document.querySelector('#earned-points').textContent = 'You earned ' + pointsToJoCoins + ' JOCOINS';
        currentUser.points += pointsToJoCoins;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
    }

    function endGame() {
        setTimeout(gameOver, 50);
        return;
    }

    gameBox.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            goLeft();
        }
        if (event.key === 'ArrowRight') {
            goRight();
        }
    });
}

function shopMenu() {
    gameBox.style.backgroundColor = 'rgb(253, 138, 138)';
    gameBox.innerHTML = `
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
    gameBox.style.backgroundColor = 'rgb(158, 161, 212)';
    gameBox.innerHTML = `
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

gameBox.addEventListener('click', (event) => {
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