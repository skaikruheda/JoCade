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
    document.querySelector('#game-score').textContent = '';
}

function startGame() {
    flappyJoContainer.focus();
    flappyJoContainer.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="obstacle"></div>
        <div id="gap"></div>
        <div id="player"></div>
    `;

    document.querySelector('#game-score').style.visibility = 'visible';

    function gameOver() {
        flappyJoContainer.innerHTML = `
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
    let gameScore = 0;
    const animationName = window.getComputedStyle(obstacle).getPropertyValue('animation-name');
    const animation = document.getAnimations().find(anim => anim.animationName === animationName);

    gap.addEventListener('animationiteration', () => {
        let options = [-40, -50, -60, -70];
        let random = Math.floor(Math.random() * 4);
        gap.style.top = `${options[random]}%`;
        gameScore = gameScore + 1;
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
    }, 2020);

    let alwaysRun = setInterval(() => {
        let currentTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        document.querySelector('#player').style.top = (currentTop + 2) + 'px';
        document.querySelector('#game-score').textContent = 'Score: ' + gameScore;

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

    const options = document.querySelectorAll('.game-options');
    options.forEach(option => {
        option.addEventListener('click', event => {
            const { classList } = event.target;
            const [color, level] = classList[1].split('-');
            const prices = { red: 250, blue: 500, green: 750, yellow: 1000 };
            if (color && level && prices[color] <= currentUser.points && !currentUser.items.includes(classList[1])) {
                currentUser.points -= prices[color];
                currentUser.items.push(classList[1]);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                document.querySelector('#game-coin').textContent = `JOCOINS: ${currentUser.points}`;
            } else {
                document.querySelector('#pricing-error').textContent = prices[color] > currentUser.points ? 'Insufficient Balance' : 'You already bought this!';
                setTimeout(() => document.querySelector('#pricing-error').textContent = '(0_0)', 1000);
            }
        });
    });    
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