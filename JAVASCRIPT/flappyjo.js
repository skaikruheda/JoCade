const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
let flappyJoContainer = document.querySelector('.flappy-jo-container');

let customizationValue = new Map([
    ['character', undefined],
    ['obstacle', undefined],
    ['background', undefined]
]);

function gameMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(241, 247, 181)';
    flappyJoContainer.innerHTML = `
        <h1>Flappy Jo</h1>
        <button id="start-btn">Start</button>
        <button id="marketplace-btn">Marketplace</button>
        <button id="customization-btn">Customization</button>
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

    let customizationValueFromLocalStorage = JSON.parse(localStorage.getItem('customizationValue'));
    if (customizationValueFromLocalStorage) {
        if (customizationValueFromLocalStorage[0][1] !== null) {
            player.style.backgroundColor = `${customizationValueFromLocalStorage[0][1]}`;
        }
        if (customizationValueFromLocalStorage[1][1] !== null) {
            obstacle.style.backgroundColor = `${customizationValueFromLocalStorage[1][1]}`;
        }
        if (customizationValueFromLocalStorage[2][1] !== null) {
            flappyJoContainer.style.backgroundColor = `${customizationValueFromLocalStorage[2][1]}`;
            gap.style.backgroundColor = `${customizationValueFromLocalStorage[2][1]}`;
        }
    }

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

    let gameBtn = document.getElementsByClassName('game-btn');
    for (let i = 0; i < gameBtn.length; i++) {
        if (currentUser.items.includes(gameBtn[i].classList[1])) {
            gameBtn[i].style.backgroundColor = 'lightblue';
        }
    }

    document.querySelectorAll('.game-options').forEach((value, index, array) => {
        value.addEventListener('click', (event) => {
            if (event.target.classList.length >= 2) {
                if (event.target.classList[1].includes('red')) {
                    let selectedItem = event.target.classList[1]
                    let alreadyBought = false;
                    for (let i = 0; i < currentUser.items.length; i++) {
                        if (currentUser.items[i] === selectedItem) {
                            alreadyBought = true;
                            break;
                        }
                    }
                    if (alreadyBought) {
                        document.querySelector('#pricing-error').textContent = 'You already bought this!';
                        setTimeout(() => {
                            document.querySelector('#pricing-error').textContent = '(0_0)';
                        }, 1000);   
                    }
                    else {
                        if (currentUser.points < 250) {
                            document.querySelector('#pricing-error').textContent = 'Insufficient Balance';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        } else {
                            currentUser.points -= 250;
                            currentUser.items.push(event.target.classList[1]);
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
                            event.target.style.backgroundColor = 'lightblue';
                            document.querySelector('#pricing-error').textContent = 'Purchased!';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        }
                    }
                }
                else if (event.target.classList[1].includes('blue')) {
                    let selectedItem = event.target.classList[1]
                    let alreadyBought = false;
                    for (let i = 0; i < currentUser.items.length; i++) {
                        if (currentUser.items[i] === selectedItem) {
                            alreadyBought = true;
                            break;
                        }
                    }
                    if (alreadyBought) {
                        document.querySelector('#pricing-error').textContent = 'You already bought this!';
                        setTimeout(() => {
                            document.querySelector('#pricing-error').textContent = '(0_0)';
                        }, 1000);   
                    }
                    else {
                        if (currentUser.points < 500) {
                            document.querySelector('#pricing-error').textContent = 'Insufficient Balance';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        } else {
                            currentUser.points -= 500;
                            currentUser.items.push(event.target.classList[1]);
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
                            event.target.style.backgroundColor = 'lightblue';
                            document.querySelector('#pricing-error').textContent = 'Purchased!';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        }
                    }
                }
                else if (event.target.classList[1].includes('green')) {
                    let selectedItem = event.target.classList[1]
                    let alreadyBought = false;
                    for (let i = 0; i < currentUser.items.length; i++) {
                        if (currentUser.items[i] === selectedItem) {
                            alreadyBought = true;
                            break;
                        }
                    }
                    if (alreadyBought) {
                        document.querySelector('#pricing-error').textContent = 'You already bought this!';
                        setTimeout(() => {
                            document.querySelector('#pricing-error').textContent = '(0_0)';
                        }, 1000);   
                    }
                    else {
                        if (currentUser.points < 750) {
                            document.querySelector('#pricing-error').textContent = 'Insufficient Balance';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        } else {
                            currentUser.points -= 750;
                            currentUser.items.push(event.target.classList[1]);
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
                            event.target.style.backgroundColor = 'lightblue';
                            document.querySelector('#pricing-error').textContent = 'Purchased!';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        }
                    }
                }
                else if (event.target.classList[1].includes('yellow')) {
                    let selectedItem = event.target.classList[1]
                    let alreadyBought = false;
                    for (let i = 0; i < currentUser.items.length; i++) {
                        if (currentUser.items[i] === selectedItem) {
                            alreadyBought = true;
                            break;
                        }
                    }
                    if (alreadyBought) {
                        document.querySelector('#pricing-error').textContent = 'You already bought this!';
                        setTimeout(() => {
                            document.querySelector('#pricing-error').textContent = '(0_0)';
                        }, 1000);   
                    }
                    else {
                        if (currentUser.points < 1000) {
                            document.querySelector('#pricing-error').textContent = 'Insufficient Balance';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        } else {
                            currentUser.points -= 1000;
                            currentUser.items.push(event.target.classList[1]);
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
                            event.target.style.backgroundColor = 'lightblue';
                            document.querySelector('#pricing-error').textContent = 'Purchased!';
                            setTimeout(() => {
                                document.querySelector('#pricing-error').textContent = '(0_0)';
                            }, 1000);
                        }
                    }
                }
            }
        });
    });
}

function customizationMenu() {
    flappyJoContainer.style.backgroundColor = 'rgb(158, 161, 212)';
    flappyJoContainer.innerHTML = `
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
    `;

    document.querySelectorAll('.game-options').forEach((value, index, array) => {
        value.addEventListener('click', (event) => {
            if (event.target.classList.length >= 2) {
                if (currentUser.items.includes(event.target.classList[1])) {
                    customizationValue.set(`${event.target.classList[1].split('-')[1]}`, `${event.target.classList[1].split('-')[0]}`);
                    localStorage.setItem('customizationValue', JSON.stringify(Array.from(customizationValue)));
                }
            }
        });
    });
}

flappyJoContainer.addEventListener('click', (event) => {
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