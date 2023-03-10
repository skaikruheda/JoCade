const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
let flappyJoContainer = document.querySelector('.flappy-jo-container');

function gameMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(241, 247, 181)';
    flappyJoContainer.innerHTML = `
        <h1>Flappy Jo</h1>
        <button id="start-btn">Start</button>
        <button id="marketplace-btn">Marketplace</button>
        <button id="setting-btn">Settings</button>
    `;
}

function gameOver() {
    flappyJoContainer.innerHTML = `
        <h1>Game Over</h1>
        <h2 id="score-label">A</h2>
        <button onclick="startGame()">Try Again</button>
        <button onclick="gameMenu()">Home</button>
    `;
}

function startGame() {
    flappyJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="obstacle"></div>
        <div id="gap"></div>
        <div id="player"></div>
    `;

    function endGame() {
        flappyJoContainer.removeEventListener('keydown', jumpHandler);
        clearInterval(alwaysRun);
        setTimeout(gameOver, 50);
        return;
    }

    let obstacle = document.querySelector('#obstacle');
    let gap = document.querySelector('#gap');
    let player = document.querySelector('#player');
    let startTime = 1660;
    let endTime = 1956;
    const animationName = window.getComputedStyle(obstacle).getPropertyValue('animation-name');
    const animation = document.getAnimations().find(anim => anim.animationName === animationName);

    gap.addEventListener('animationiteration', () => {
        let options = [-40, -50, -60, -70];
        let random = Math.floor(Math.random() * 4);
        gap.style.top = `${options[random]}%`;
    });

    const jumpHandler = (event) => {
        if (event.key === ' ' || event.key === 'ArrowUp') {
            jumpAction();
        }
    };

    flappyJoContainer.addEventListener('keydown', jumpHandler);

    document.querySelector('#return-btn').addEventListener('click', () => {
        clearTimeout(alwaysRun);
    });

    setInterval(() => {
        startTime += 2000;
        endTime = startTime + 296;
    }, 2200);

    let alwaysRun = setInterval(() => {
        let currentTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        document.querySelector('#player').style.top = (currentTop + 2) + 'px';

        if (currentTop <= 0 || currentTop >= 475) {
            endGame();
        }

        if (animation.currentTime >= startTime && animation.currentTime <= endTime) {
            if (window.getComputedStyle(gap).getPropertyValue('top') === '-199.195px') {
                if (player.style.top <= '299px' || player.style.top >= '423px') {
                    endGame();
                }
            }
            else if (window.getComputedStyle(gap).getPropertyValue('top') === '-249px') {
                if (player.style.top <= '249px' || player.style.top >= '374px') {
                    endGame();
                }
            }
            else if (window.getComputedStyle(gap).getPropertyValue('top') === '-298.797px') {
                if (player.style.top <= '199px' || player.style.top >= '324px') {
                    endGame();
                }
            }
            else if (window.getComputedStyle(gap).getPropertyValue('top') === '-348.594px') {
                if (player.style.top <= '149px' || player.style.top >= '274px') {
                       endGame();
                }
            }
        }
    }, 10);

    function jumpAction() {
        let currentTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        document.querySelector('#player').style.top = (currentTop - 70) + 'px';
    }
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
}

flappyJoContainer.addEventListener('click', (event) => {
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