const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

document.querySelector('#game-coin').textContent = 'JOCOINS: ' + currentUser.points;
let flappyJoContainer = document.querySelector('.flappy-jo-container');
let startButton;

function setupGameMenu() {
    flappyJoContainer.innerHTML = `
        <h1>Flappy Jo</h1>
        <button id="start-btn">Start</button>
        <button id="marketplace-btn">Marketplace</button>
        <button id="setting-btn">Settings</button>
    `;
    startButton = document.querySelector('#start-btn');
    startButton.addEventListener('click', startGame);
}

setupGameMenu();

function startGame() {
    flappyJoContainer.innerHTML = `
        <div id="block"></div>
        <div id="hole"></div>
        <div id="character"></div>
    `;
    
    let block = document.querySelector('#block');
    let hole = document.querySelector('#hole');
    let character = document.querySelector('#character');
    let jumping = 0;
    let counter = 0;

    hole.addEventListener('animationiteration', () => {
        const choices = [-40, -50, -60, -70, -80, -90];
        let random = Math.floor(Math.random() * 6);
        hole.style.top = choices[random] + '%';
        counter++;
    });

    setInterval(() => {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        if (jumping === 0) {
            character.style.top = (characterTop + 3) + 'px';
        }
        if (characterTop > 633 || characterTop < 171) {
            character.style.top = 50 + '%';
            counter = 0;
            setupGameMenu();
        }
    }, 10);

    flappyJoContainer.addEventListener('click', jump);

    function jump() {
        jumping = 1;
        let jumpCount = 0;
        let jumpInterval = setInterval(() => {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
            if (characterTop > 6 && jumpCount < 15) {
                character.style.top = (characterTop - 5) + 'px';
            }
            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }
}